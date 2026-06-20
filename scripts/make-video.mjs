/**
 * 贈りことば — SNS動画自動生成スクリプト（cinematic v2）
 *
 * カード画像 → TikTok/Reels用縦動画 (1080×1920) / X用横動画 (1920×1080)
 *
 * v2の品質改善:
 *   - 和モダンの背景（紺グラデ + 朱の温かいグロウ + ヴィネット）でブランド統一
 *   - カードがふわっと浮遊（hero の floaty と同じ世界観）+ ソフトな影で立体感
 *   - 明朝（ヒラギノ明朝）+ Didot/イタリックの上質なタイポ、生成り×朱の配色
 *   - ブランドのイントロ + CTAアウトロ付き
 *   - xfade のディゾルブ、preset slow / crf17 / +faststart で高品質エンコード
 *
 * 使い方:
 *   node scripts/make-video.mjs
 *   node scripts/make-video.mjs --format tiktok   # 縦のみ
 *   node scripts/make-video.mjs --format x        # 横のみ
 */

import { spawnSync } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const FFMPEG = existsSync('/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg')
  ? '/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg'
  : 'ffmpeg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CARDS_DIR = path.join(ROOT, 'screenshots', 'cards')
const DESKTOP = path.join(os.homedir(), 'Desktop')

// ── フォント（和モダン: 明朝 + Didot/イタリック） ──────────────────
const FONT_MINCHO = '/System/Library/Fonts/ヒラギノ明朝 ProN.ttc'           // 見出し（明朝）
const FONT_GOTHIC = '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc'        // 小さめの注記
const FONT_GOTHIC_B = '/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc'
const FONT_SERIF_EN = '/System/Library/Fonts/Supplemental/Didot.ttc'         // 英語ディスプレイ
const FONT_ITALIC_EN = '/System/Library/Fonts/Supplemental/Georgia Italic.ttf'

// ── 和モダン パレット ─────────────────────────────────────────────
const COL = {
  cream: '0xF4F0E6',
  creamSoft: '0xFAF7EF',
  ink: '0x1A2744',
  gold: '0xE0C089',
  goldSoft: '0xC9A86A',
  vermilion: '0xC0573F',
  mute: '0x9AA3B8',
}

// ── カード情報 ────────────────────────────────────────────────────
const CARDS = [
  { file: '01_birthday_pastel_bloom.png', scene: 'BIRTHDAY', jp: '誕生日に、花束のかわりを。', en: 'Happy Birthday' },
  { file: '02_birthday_confetti_night.png', scene: 'CELEBRATE', jp: 'おめでとうを、華やかに。', en: 'Cheers, to you' },
  { file: '03_wedding_botanical_arch.png', scene: 'WEDDING', jp: 'ふたりの門出に、祝福を。', en: 'Congratulations' },
  { file: '05_farewell_sunset_horizon.png', scene: 'FAREWELL', jp: '旅立つ人へ、餞(はなむけ)を。', en: 'Best Wishes' },
  { file: '07_thanks_letterpress.png', scene: 'THANK YOU', jp: '言葉にできない、ありがとうを。', en: 'With Gratitude' },
  { file: '08_thanks_sage_painterly.png', scene: 'THANK YOU', jp: '日々の支えに、感謝を込めて。', en: 'To You' },
  { file: '09_parents_carnation.png', scene: 'FOR MOM', jp: 'お母さんへ、いつもありがとう。', en: 'Dearest Mother' },
  { file: '10_parents_compass_map.png', scene: 'FOR DAD', jp: 'お父さんへ、背中に感謝を。', en: 'My Compass' },
]

const FPS = 30
const CARD_DUR = 3.2     // 秒/カード
const INTRO_DUR = 3.4
const OUTRO_DUR = 4.0
const XFADE = 0.6        // ディゾルブ秒

const CARD_ASPECT = 1042 / 720  // 元画像の縦横比

const FORMATS = {
  tiktok: { w: 1080, h: 1920, cardW: 720, glowY: 0.42, label: 'TikTok/Reels (縦 9:16)', suffix: 'tiktok' },
  x: { w: 1920, h: 1080, cardW: 560, glowY: 0.5, label: 'X/Twitter (横 16:9)', suffix: 'x_twitter' },
}

// ── ヘルパー ──────────────────────────────────────────────────────
function esc(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/:/g, '\\:').replace(/%/g, '\\%')
}
function run(args, label) {
  const r = spawnSync(args[0], args.slice(1), { stdio: 'pipe' })
  if (r.status !== 0) {
    console.error(`\n  ✗ ${label} 失敗:\n` + (r.stderr?.toString().slice(-1200) ?? ''))
    throw new Error(label)
  }
}
function drawtext({ font, text, size, color, x, y, alpha = 1, spacing = 0, shadow = true }) {
  const parts = [
    `fontfile='${esc(font)}'`,
    `text='${esc(text)}'`,
    `fontsize=${size}`,
    `fontcolor=${color}`,
    `x=${x}`,
    `y=${y}`,
    spacing ? `expansion=none` : null,
    `alpha=${alpha}`,
  ].filter(Boolean)
  if (spacing) parts.push(`tabsize=4`)
  // letter spacing emulation via fontconfig not available → use shadow for legibility
  if (shadow) parts.push(`shadowcolor=black@0.45`, `shadowx=0`, `shadowy=2`)
  return `drawtext=${parts.join(':')}`
}

// ── 背景PNG（紺の奥行きグラデ + ヴィネット）を1枚生成 ──────────────
// 3ストップで中央にわずかな明かり（heroの夜空→地平の温度感）を出す。
function buildBackground(fmt, outPath) {
  const { w, h } = fmt
  const cx = Math.round(w / 2)
  const args = [
    FFMPEG, '-y',
    '-f', 'lavfi', '-i',
      `gradients=s=${w}x${h}:c0=0x101A36:c1=0x243156:c2=0x0A1028:nb_colors=3:x0=${cx}:y0=0:x1=${cx}:y1=${h}:type=linear`,
    '-filter_complex', `[0:v]gblur=sigma=3,vignette=PI/4.4[bg]`,
    '-map', '[bg]', '-frames:v', '1', outPath,
  ]
  run(args, '背景生成')
}

// ── ソフトシャドウPNGを1枚生成（カードサイズ + 余白をぼかす） ───────
function buildShadow(cardW, cardH, margin, outPath) {
  const sw = cardW + margin * 2
  const sh = cardH + margin * 2
  const args = [
    FFMPEG, '-y',
    '-f', 'lavfi', '-i', `color=c=black@0.0:s=${sw}x${sh}`,
    '-filter_complex',
      `color=c=0x05070F@0.62:s=${cardW}x${cardH}[s];` +
      `[0][s]overlay=${margin}:${margin}:format=auto,boxblur=${Math.round(margin * 0.7)}:2[o]`,
    '-map', '[o]', '-frames:v', '1', outPath,
  ]
  run(args, '影生成')
}

// ── 1カードのクリップ ─────────────────────────────────────────────
function makeCardClip({ card, fmt, bgPng, shadowPng, margin, idx, outPath }) {
  const { w, h, cardW } = fmt
  const vertical = w < h
  const cardH = Math.round(cardW * CARD_ASPECT)
  const period = 4.5 + (idx % 3) * 0.6
  const phase = (idx % 4) * 0.7

  // ---- レイアウト（縦=カード上・テキスト下／横=カード左・テキスト右） ----
  let cardX, cardY, textX, sceneY, enY, jpY, ruleY, ruleX, tagX, tagY
  let sceneSize, enSize, jpSize, tagSize, ruleW
  if (vertical) {
    cardX = Math.round((w - cardW) / 2)
    cardY = Math.round(h * 0.105)
    textX = '(w-text_w)/2'
    sceneSize = Math.round(w * 0.028)
    enSize = Math.round(w * 0.050)
    jpSize = Math.round(w * 0.047)
    tagSize = Math.round(w * 0.026)
    ruleW = Math.round(w * 0.065)
    sceneY = Math.round(h * 0.062)
    enY = cardY + cardH + Math.round(h * 0.028)
    jpY = enY + enSize + Math.round(h * 0.012)
    ruleY = jpY + jpSize + Math.round(h * 0.018)
    ruleX = `(iw-${ruleW})/2`
    tagX = '(w-text_w)/2'
    tagY = Math.round(h - h * 0.055)
  } else {
    cardX = Math.round(w * 0.085)
    cardY = Math.round((h - cardH) / 2)
    const rightStart = cardX + cardW + Math.round(w * 0.055)
    textX = `${rightStart}+((w-${rightStart})-text_w)/2`
    sceneSize = Math.round(w * 0.0165)
    enSize = Math.round(w * 0.034)
    jpSize = Math.round(w * 0.030)
    tagSize = Math.round(w * 0.0155)
    ruleW = Math.round(w * 0.04)
    sceneY = Math.round(h * 0.30)
    enY = Math.round(h * 0.36)
    jpY = Math.round(h * 0.47)
    ruleY = Math.round(h * 0.56)
    ruleX = `${rightStart}+((iw-${rightStart})-${ruleW})/2`
    tagX = `${rightStart}+((w-${rightStart})-text_w)/2`
    tagY = Math.round(h * 0.66)
  }

  const shX = cardX - margin
  const shY = cardY - margin + 22
  const floatY = `${cardY}+14*sin(2*PI*(t+${phase})/${period})`
  const sceneSpaced = card.scene.split('').join(' ')

  const filters = [
    `[2:v]scale=${cardW}:${cardH},setsar=1[card]`,
    `[0:v][1:v]overlay=${shX}:${shY}:format=auto[bgs]`,
    `[bgs][card]overlay=${cardX}:'${floatY}':format=auto[base]`,
    `[base]${drawtext({ font: FONT_GOTHIC, text: sceneSpaced, size: sceneSize, color: COL.gold, x: textX, y: sceneY })}[t0]`,
    `[t0]${drawtext({ font: FONT_ITALIC_EN, text: card.en, size: enSize, color: COL.creamSoft, x: textX, y: enY })}[t1]`,
    `[t1]${drawtext({ font: FONT_MINCHO, text: card.jp, size: jpSize, color: COL.cream, x: textX, y: jpY })}[t2]`,
    `[t2]drawbox=x=${ruleX}:y=${ruleY}:w=${ruleW}:h=2:color=${COL.vermilion}:t=fill[t3]`,
    `[t3]${drawtext({ font: FONT_GOTHIC, text: '贈りことば · 登録不要・3分で完成', size: tagSize, color: COL.mute, x: tagX, y: tagY })}[out]`,
  ]

  const args = [
    FFMPEG, '-y',
    '-loop', '1', '-t', String(CARD_DUR), '-i', bgPng,
    '-loop', '1', '-t', String(CARD_DUR), '-i', shadowPng,
    '-loop', '1', '-t', String(CARD_DUR), '-i', path.join(CARDS_DIR, card.file),
    '-filter_complex', filters.join(';'),
    '-map', '[out]', '-r', String(FPS), '-t', String(CARD_DUR),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p',
    outPath,
  ]
  run(args, `カード ${card.scene}`)
}

// ── イントロ ──────────────────────────────────────────────────────
function makeIntro({ fmt, bgPng, outPath }) {
  const { w, h } = fmt
  const cy = Math.round(h / 2)
  const hankoSize = Math.round(w * (fmt.w === 1080 ? 0.13 : 0.085))
  const hankoY = cy - Math.round(w * (fmt.w === 1080 ? 0.21 : 0.13))
  const brandSize = Math.round(w * (fmt.w === 1080 ? 0.072 : 0.044))
  const brandY = cy - Math.round(w * (fmt.w === 1080 ? 0.03 : 0.018))
  const tagSize = Math.round(w * (fmt.w === 1080 ? 0.036 : 0.022))
  const tagY = brandY + Math.round(w * (fmt.w === 1080 ? 0.10 : 0.062))
  const enSize = Math.round(w * (fmt.w === 1080 ? 0.030 : 0.019))
  const enY = tagY + Math.round(w * (fmt.w === 1080 ? 0.075 : 0.046))
  const fadeOut = INTRO_DUR - 0.6

  const filters = [
    // 朱の印「贈」枠
    `[0:v]drawbox=x=(iw-${hankoSize})/2:y=${hankoY}:w=${hankoSize}:h=${hankoSize}:color=${COL.vermilion}:t=fill[hk]`,
    `[hk]${drawtext({ font: FONT_MINCHO, text: '贈', size: Math.round(hankoSize * 0.62), color: COL.creamSoft, x: '(w-text_w)/2', y: hankoY + Math.round(hankoSize * 0.17), shadow: false })}[hk2]`,
    `[hk2]${drawtext({ font: FONT_MINCHO, text: '贈りことば', size: brandSize, color: COL.cream, x: '(w-text_w)/2', y: brandY })}[b1]`,
    `[b1]${drawtext({ font: FONT_MINCHO, text: '心がふるえる、一通の手紙を。', size: tagSize, color: COL.creamSoft, x: '(w-text_w)/2', y: tagY })}[b2]`,
    `[b2]${drawtext({ font: FONT_ITALIC_EN, text: 'Open the moment.', size: enSize, color: COL.gold, x: '(w-text_w)/2', y: enY })}[txt]`,
    `[txt]fade=t=in:st=0:d=0.8,fade=t=out:st=${fadeOut}:d=0.6[out]`,
  ]
  const args = [
    FFMPEG, '-y', '-loop', '1', '-t', String(INTRO_DUR), '-i', bgPng,
    '-filter_complex', filters.join(';'),
    '-map', '[out]', '-r', String(FPS), '-t', String(INTRO_DUR),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', outPath,
  ]
  run(args, 'イントロ')
}

// ── アウトロ（CTA） ───────────────────────────────────────────────
function makeOutro({ fmt, bgPng, outPath }) {
  const { w, h } = fmt
  const cy = Math.round(h / 2)
  const enSize = Math.round(w * (fmt.w === 1080 ? 0.034 : 0.021))
  const enY = cy - Math.round(w * (fmt.w === 1080 ? 0.15 : 0.092))
  const h1Size = Math.round(w * (fmt.w === 1080 ? 0.064 : 0.040))
  const h1Y = cy - Math.round(w * (fmt.w === 1080 ? 0.07 : 0.043))
  const h2Y = h1Y + Math.round(w * (fmt.w === 1080 ? 0.085 : 0.052))
  const noteSize = Math.round(w * (fmt.w === 1080 ? 0.032 : 0.020))
  const noteY = h2Y + Math.round(w * (fmt.w === 1080 ? 0.10 : 0.062))
  // CTAピル
  const pillW = Math.round(w * (fmt.w === 1080 ? 0.78 : 0.42))
  const pillH = Math.round(w * (fmt.w === 1080 ? 0.10 : 0.062))
  const pillX = Math.round((w - pillW) / 2)
  const pillY = noteY + Math.round(w * (fmt.w === 1080 ? 0.06 : 0.04))
  const urlSize = Math.round(w * (fmt.w === 1080 ? 0.034 : 0.021))
  const urlY = pillY + Math.round((pillH - urlSize) / 2) - 2

  const filters = [
    `[0:v]${drawtext({ font: FONT_ITALIC_EN, text: 'Start now', size: enSize, color: COL.gold, x: '(w-text_w)/2', y: enY })}[o0]`,
    `[o0]${drawtext({ font: FONT_MINCHO, text: 'あなたの想い、', size: h1Size, color: COL.cream, x: '(w-text_w)/2', y: h1Y })}[o1]`,
    `[o1]${drawtext({ font: FONT_MINCHO, text: '3分でカードに。', size: h1Size, color: COL.cream, x: '(w-text_w)/2', y: h2Y })}[o2]`,
    `[o2]${drawtext({ font: FONT_GOTHIC, text: '登録不要 · クレジットカード不要', size: noteSize, color: COL.mute, x: '(w-text_w)/2', y: noteY })}[o3]`,
    // CTAピル（生成り）+ URL（紺）
    `[o3]drawbox=x=${pillX}:y=${pillY}:w=${pillW}:h=${pillH}:color=${COL.creamSoft}:t=fill[o4]`,
    `[o4]${drawtext({ font: FONT_GOTHIC_B, text: 'message-card-app.vercel.app', size: urlSize, color: COL.ink, x: '(w-text_w)/2', y: urlY, shadow: false })}[txt]`,
    `[txt]fade=t=in:st=0:d=0.6,fade=t=out:st=${OUTRO_DUR - 0.7}:d=0.7[out]`,
  ]
  const args = [
    FFMPEG, '-y', '-loop', '1', '-t', String(OUTRO_DUR), '-i', bgPng,
    '-filter_complex', filters.join(';'),
    '-map', '[out]', '-r', String(FPS), '-t', String(OUTRO_DUR),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', outPath,
  ]
  run(args, 'アウトロ')
}

// ── xfade で全クリップを連結 ──────────────────────────────────────
function concat(clips, durations, outPath) {
  const inputs = clips.flatMap(c => ['-i', c])
  const parts = []
  let last = '[0:v]'
  let acc = durations[0]
  for (let i = 1; i < clips.length; i++) {
    const offset = acc - XFADE
    const label = i === clips.length - 1 ? '[vout]' : `[v${i}]`
    parts.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${offset.toFixed(3)}${label}`)
    last = label
    acc = offset + XFADE + durations[i] - XFADE  // 次の基準＝今回終了から重なり分を引く
    acc = offset + durations[i]
  }
  const args = [
    FFMPEG, '-y', ...inputs,
    '-filter_complex', parts.join(';'),
    '-map', '[vout]',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outPath,
  ]
  run(args, '連結')
}

// ── メイン ────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const formatArg = args[args.indexOf('--format') + 1] ?? 'both'
  const targets = formatArg === 'both' ? ['tiktok', 'x'] : [formatArg]

  if (!existsSync(path.join(CARDS_DIR, CARDS[0].file))) {
    console.error('  エラー: カード画像が見つかりません。先に capture-cards.mjs を実行してください。')
    process.exit(1)
  }

  const tmp = path.join(ROOT, 'screenshots', '.tmp_clips')
  mkdirSync(tmp, { recursive: true })

  for (const key of targets) {
    const fmt = FORMATS[key]
    console.log(`\n▶ ${fmt.label}`)
    const cardH = Math.round(fmt.cardW * CARD_ASPECT)
    const margin = Math.round(fmt.cardW * 0.14)

    const bgPng = path.join(tmp, `bg_${key}.png`)
    const shadowPng = path.join(tmp, `shadow_${key}.png`)
    process.stdout.write('  背景・影を生成 ... ')
    buildBackground(fmt, bgPng)
    buildShadow(fmt.cardW, cardH, margin, shadowPng)
    console.log('✓')

    const clips = []
    const durs = []

    const introPath = path.join(tmp, `${key}_intro.mp4`)
    process.stdout.write('  イントロ ... ')
    makeIntro({ fmt, bgPng, outPath: introPath })
    clips.push(introPath); durs.push(INTRO_DUR); console.log('✓')

    for (let i = 0; i < CARDS.length; i++) {
      const card = CARDS[i]
      if (!existsSync(path.join(CARDS_DIR, card.file))) { console.warn(`  スキップ: ${card.file}`); continue }
      const cp = path.join(tmp, `${key}_card_${i}.mp4`)
      process.stdout.write(`  [${i + 1}/${CARDS.length}] ${card.scene} ... `)
      makeCardClip({ card, fmt, bgPng, shadowPng, margin, idx: i, outPath: cp })
      clips.push(cp); durs.push(CARD_DUR); console.log('✓')
    }

    const outroPath = path.join(tmp, `${key}_outro.mp4`)
    process.stdout.write('  アウトロ ... ')
    makeOutro({ fmt, bgPng, outPath: outroPath })
    clips.push(outroPath); durs.push(OUTRO_DUR); console.log('✓')

    process.stdout.write(`  連結 (${clips.length}クリップ) ... `)
    const outFile = path.join(DESKTOP, `okurikotoba_${fmt.suffix}_${Date.now()}.mp4`)
    concat(clips, durs, outFile)
    console.log('✓')
    console.log(`  保存先: ${outFile}`)
  }

  rmSync(tmp, { recursive: true, force: true })
  console.log('\n完了! デスクトップを確認してください。')
}

main().catch(err => { console.error('\nエラー:', err.message); process.exit(1) })
