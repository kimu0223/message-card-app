/**
 * 贈りことば — SNS動画自動生成スクリプト
 *
 * カード画像 → TikTok/Reels用縦動画 (1080×1920)
 *             X/Twitter用横動画   (1920×1080)
 *
 * 使い方:
 *   node scripts/make-video.mjs
 *   node scripts/make-video.mjs --format tiktok  # 縦のみ
 *   node scripts/make-video.mjs --format x       # 横のみ
 */

import { execSync, spawnSync } from 'child_process'
import { existsSync, mkdirSync, unlinkSync } from 'fs'
import path from 'path'

// ffmpeg-full (drawtext/libfreetype対応) を優先使用
const FFMPEG = existsSync('/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg')
  ? '/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg'
  : 'ffmpeg'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CARDS_DIR = path.join(ROOT, 'screenshots', 'cards')
const DESKTOP = path.join(os.homedir(), 'Desktop')

// フォント
const FONT_BOLD = '/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc'
const FONT_MED  = '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc'

// カード情報（画像ファイル名・シーン・コピー）
const CARDS = [
  {
    file: '01_birthday_pastel_bloom.png',
    scene: '誕生日',
    copy: '大切な人の誕生日に\n気持ちを届けよう',
    en: 'Happy Birthday',
  },
  {
    file: '02_birthday_confetti_night.png',
    scene: '誕生日',
    copy: 'パーティー気分で\nお祝いのメッセージを',
    en: 'Celebrate!',
  },
  {
    file: '03_wedding_botanical_arch.png',
    scene: '結婚・記念日',
    copy: 'ふたりの未来に\n祝福を込めて',
    en: 'Congratulations',
  },
  {
    file: '04_wedding_gold_monogram.png',
    scene: '結婚・記念日',
    copy: '特別な日に\n想いを形に',
    en: 'With Love',
  },
  {
    file: '05_farewell_sunset_horizon.png',
    scene: '退職・送別',
    copy: 'お世話になった人へ\n感謝と餞(はなむけ)を',
    en: 'Best Wishes',
  },
  {
    file: '07_thanks_letterpress.png',
    scene: 'お礼・感謝',
    copy: '言葉では伝えきれない\nありがとうを、カードに',
    en: 'Thank you.',
  },
  {
    file: '09_parents_carnation.png',
    scene: '母の日',
    copy: 'お母さんへ\nいつもありがとう',
    en: "Mother's Day",
  },
  {
    file: '10_parents_compass_map.png',
    scene: '父の日',
    copy: 'お父さんへ\n背中に感謝を',
    en: "Father's Day",
  },
]

const DURATION_PER_CARD = 2.8   // 秒/枚
const FADE_DURATION     = 0.35  // クロスフェード秒
const FPS               = 30

// ─────────────────────────────────────────────
// drawtext ヘルパー（FFmpeg エスケープ対応）
// ─────────────────────────────────────────────
function esc(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/:/g, '\\:')
}

// ─────────────────────────────────────────────
// 1枚のカードクリップを作成 (temp MP4)
// ─────────────────────────────────────────────
function makeClip({ imgPath, copy, scene, en, outPath, w, h, cardW, cardH }) {
  const padX = Math.round((w - cardW) / 2)
  const padY = Math.round(h * 0.08)  // 上8%にカード

  // テキスト設定
  const sceneY     = Math.round(padY - 64)
  const copyY      = Math.round(padY + cardH + 32)
  const taglineY   = Math.round(h - 96)
  const copyLines  = copy.split('\n')

  // フェードイン/アウト (alpha アニメーション)
  const fadeInEnd  = FADE_DURATION
  const fadeOutSt  = DURATION_PER_CARD - FADE_DURATION
  const alphaExpr  = `if(lt(t,${fadeInEnd}),t/${fadeInEnd},if(gt(t,${fadeOutSt}),(${DURATION_PER_CARD}-t)/${FADE_DURATION},1))`

  const bgColor = '#0f0f11'

  const filters = [
    // 背景色
    `color=c=${bgColor.replace('#', '0x')}:size=${w}x${h}:rate=${FPS}[bg]`,
    // カード画像をリサイズ
    `[0:v]scale=${cardW}:${cardH}[card]`,
    // 背景にカードを重ねる
    `[bg][card]overlay=${padX}:${padY}:format=auto[base]`,
    // フェード
    `[base]fade=t=in:st=0:d=${FADE_DURATION},fade=t=out:st=${fadeOutSt}:d=${FADE_DURATION}[faded]`,
    // シーン名
    `[faded]drawtext=fontfile='${esc(FONT_MED)}':text='${esc(scene)}':fontsize=${Math.round(w * 0.038)}:fontcolor=0xaaaaaa:x=(w-text_w)/2:y=${sceneY + 24}[t1]`,
    // コピー1行目
    `[t1]drawtext=fontfile='${esc(FONT_BOLD)}':text='${esc(copyLines[0])}':fontsize=${Math.round(w * 0.052)}:fontcolor=white:x=(w-text_w)/2:y=${copyY}[t2]`,
    // コピー2行目（あれば）
    copyLines[1]
      ? `[t2]drawtext=fontfile='${esc(FONT_BOLD)}':text='${esc(copyLines[1])}':fontsize=${Math.round(w * 0.052)}:fontcolor=white:x=(w-text_w)/2:y=${copyY + Math.round(w * 0.062)}[t3]`
      : null,
    // タグライン
    `[${copyLines[1] ? 't3' : 't2'}]drawtext=fontfile='${esc(FONT_MED)}':text='贈りことば · 登録不要 · 3分で完成':fontsize=${Math.round(w * 0.030)}:fontcolor=0x888888:x=(w-text_w)/2:y=${taglineY}[out]`,
  ].filter(Boolean)

  const cmd = [
    FFMPEG, '-y',
    '-loop', '1', '-t', String(DURATION_PER_CARD), '-i', imgPath,
    '-filter_complex', filters.join(';'),
    '-map', '[out]',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '18',
    '-r', String(FPS), '-pix_fmt', 'yuv420p',
    '-t', String(DURATION_PER_CARD),
    outPath,
  ]

  const result = spawnSync(cmd[0], cmd.slice(1), { stdio: 'pipe' })
  if (result.status !== 0) {
    console.error(result.stderr?.toString().slice(-500))
    throw new Error(`clip failed: ${path.basename(outPath)}`)
  }
}

// ─────────────────────────────────────────────
// クリップ群をxfadeで結合
// ─────────────────────────────────────────────
function concatClips(clips, outPath) {
  if (clips.length === 1) {
    execSync(`cp "${clips[0]}" "${outPath}"`)
    return
  }

  // ffmpeg xfade チェーン構築
  const inputs = clips.flatMap(c => ['-i', c])
  let filterParts = []
  let lastLabel = '[0:v]'

  for (let i = 1; i < clips.length; i++) {
    const offset = (DURATION_PER_CARD - FADE_DURATION) * i - FADE_DURATION * (i - 1)
    const outLabel = i === clips.length - 1 ? '[vout]' : `[v${i}]`
    filterParts.push(
      `${lastLabel}[${i}:v]xfade=transition=fade:duration=${FADE_DURATION}:offset=${offset.toFixed(3)}${outLabel}`
    )
    lastLabel = `[v${i}]`
  }

  const cmd = [
    FFMPEG, '-y',
    ...inputs,
    '-filter_complex', filterParts.join(';'),
    '-map', '[vout]',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '18',
    '-pix_fmt', 'yuv420p',
    outPath,
  ]
  const result = spawnSync(cmd[0], cmd.slice(1), { stdio: 'pipe' })
  if (result.status !== 0) {
    console.error(result.stderr?.toString().slice(-1000))
    throw new Error('concat failed')
  }
}

// ─────────────────────────────────────────────
// フォーマット設定
// ─────────────────────────────────────────────
const FORMATS = {
  tiktok: {
    w: 1080, h: 1920,
    cardW: 810, cardH: 1170,
    label: 'TikTok/Reels (縦 9:16)',
    suffix: 'tiktok',
  },
  x: {
    w: 1920, h: 1080,
    cardW: 630, cardH: 910,
    label: 'X/Twitter (横 16:9)',
    suffix: 'x_twitter',
  },
}

// ─────────────────────────────────────────────
// メイン
// ─────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const formatArg = args[args.indexOf('--format') + 1] ?? 'both'

  const targets = formatArg === 'both'
    ? ['tiktok', 'x']
    : [formatArg]

  const tmpDir = path.join(ROOT, 'screenshots', '.tmp_clips')
  mkdirSync(tmpDir, { recursive: true })

  for (const fmt of targets) {
    const { w, h, cardW, cardH, label, suffix } = FORMATS[fmt]
    console.log(`\n▶ ${label}`)

    const clips = []

    // カードクリップを生成
    for (let i = 0; i < CARDS.length; i++) {
      const card = CARDS[i]
      const imgPath = path.join(CARDS_DIR, card.file)
      if (!existsSync(imgPath)) {
        console.warn(`  スキップ (ファイルなし): ${card.file}`)
        continue
      }
      const clipPath = path.join(tmpDir, `${fmt}_${i}.mp4`)
      process.stdout.write(`  [${i + 1}/${CARDS.length}] ${card.scene} ... `)
      makeClip({ imgPath, ...card, outPath: clipPath, w, h, cardW, cardH })
      clips.push(clipPath)
      console.log('✓')
    }

    if (clips.length === 0) {
      console.error('  エラー: キャプチャ画像が見つかりません。先に capture-cards.mjs を実行してください。')
      continue
    }

    // 動画を結合
    process.stdout.write(`  クリップを結合中 (${clips.length}枚) ... `)
    const outFile = path.join(DESKTOP, `okurikotoba_${suffix}_${Date.now()}.mp4`)
    concatClips(clips, outFile)
    console.log('✓')
    console.log(`  保存先: ${outFile}`)

    // 一時ファイルを削除
    clips.forEach(c => { try { unlinkSync(c) } catch {} })
  }

  // tmpディレクトリ削除
  try { execSync(`rmdir "${tmpDir}" 2>/dev/null`) } catch {}

  console.log('\n完了! デスクトップを確認してください。')
}

main().catch(err => {
  console.error('\nエラー:', err.message)
  process.exit(1)
})
