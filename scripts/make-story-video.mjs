/**
 * 贈りことば — ストーリー型SNS動画（縦 1080×1920）
 *
 * 構成（感情フック → 共感 → 解決 → LINE送信 → 開封 → リアクション → CTA）:
 *   泣きフック → 「言えない」共感 → カード作成3ステップ → LINEで送る →
 *   相手が開く → 「泣いちゃった」リアクション → CTA
 *
 * 事前に必要:
 *   node scripts/capture-story.mjs   （LINE/開封モック画面）
 *   screenshots/cards/*.png          （カード画像）
 *
 *   node scripts/make-story-video.mjs
 */
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const FFMPEG = existsSync('/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg')
  ? '/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg' : 'ffmpeg'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CARDS = path.join(ROOT, 'screenshots', 'cards')
const STORY = path.join(ROOT, 'screenshots', 'story')
const DESKTOP = path.join(os.homedir(), 'Desktop')

const FONT_MINCHO = '/System/Library/Fonts/ヒラギノ明朝 ProN.ttc'
const FONT_GOTHIC = '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc'
const FONT_GOTHIC_B = '/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc'
const FONT_ITALIC = '/System/Library/Fonts/Supplemental/Georgia Italic.ttf'

const COL = { cream:'0xF4F0E6', creamSoft:'0xFAF7EF', ink:'0x1A2744', gold:'0xE0C089', vermilion:'0xC0573F', mute:'0x9AA3B8' }

const W = 1080, H = 1920, FPS = 30, XFADE = 0.55
const CARD_ASPECT = 1042 / 720

function esc(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/:/g,'\\:').replace(/%/g,'\\%') }
function run(args, label){
  const r = spawnSync(args[0], args.slice(1), { stdio:'pipe' })
  if (r.status !== 0){ console.error(`\n  ✗ ${label}:\n`+(r.stderr?.toString().slice(-1200)??'')); throw new Error(label) }
}
function dt({ font, text, size, color, y, x='(w-text_w)/2', shadow=true, alpha=1 }){
  const p = [`fontfile='${esc(font)}'`,`text='${esc(text)}'`,`fontsize=${size}`,`fontcolor=${color}`,`x=${x}`,`y=${y}`,`alpha=${alpha}`]
  if (shadow) p.push('shadowcolor=black@0.5','shadowx=0','shadowy=3')
  return `drawtext=${p.join(':')}`
}
// 複数行テキスト → 中央に積む drawtext 群（chain ラベルを返す）
function multiline({ lines, size, color, font, topY, lh=1.5, startLabel, idBase }){
  let last = startLabel, parts = []
  lines.forEach((ln, i) => {
    const out = `[${idBase}${i}]`
    parts.push(`${last}${dt({ font, text: ln, size, color, y: Math.round(topY + i*size*lh) })}${out}`)
    last = out
  })
  return { parts, last }
}

// 紺背景PNG（一度だけ）
function buildBg(out){
  run([FFMPEG,'-y','-f','lavfi','-i',
    `gradients=s=${W}x${H}:c0=0x101A36:c1=0x243156:c2=0x0A1028:nb_colors=3:x0=${W/2}:y0=0:x1=${W/2}:y1=${H}:type=linear`,
    '-filter_complex','[0:v]gblur=sigma=3,vignette=PI/4.4[bg]','-map','[bg]','-frames:v','1',out],'背景')
}
// ソフト影PNG
function buildShadow(cardW, cardH, margin, out){
  const sw=cardW+margin*2, sh=cardH+margin*2
  run([FFMPEG,'-y','-f','lavfi','-i',`color=c=black@0.0:s=${sw}x${sh}`,
    '-filter_complex',`color=c=0x05070F@0.62:s=${cardW}x${cardH}[s];[0][s]overlay=${margin}:${margin}:format=auto,boxblur=${Math.round(margin*0.7)}:2[o]`,
    '-map','[o]','-frames:v','1',out],'影')
}

function encode(extraInputs, filter, outLabel, dur, out){
  run([FFMPEG,'-y',...extraInputs,'-filter_complex',filter,'-map',outLabel,'-r',String(FPS),'-t',String(dur),
    '-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p',out],path.basename(out))
}

// フルフレーム画像クリップ（モック画面）＋キャプション
function clipImage({ img, dur, caps=[], out, fadeIn=false, fadeOut=false }){
  let last='[0:v]', parts=[`[0:v]scale=${W}:${H},setsar=1[bg0]`]; last='[bg0]'
  caps.forEach((c,i)=>{ const o=`[c${i}]`; parts.push(`${last}${dt(c)}${o}`); last=o })
  let fadeChain=''
  if (fadeIn||fadeOut){
    const f=[]; if(fadeIn) f.push('fade=t=in:st=0:d=0.6'); if(fadeOut) f.push(`fade=t=out:st=${(dur-0.6).toFixed(2)}:d=0.6`)
    parts.push(`${last}${f.join(',')}[out]`); last='[out]'
  } else { parts[parts.length-1]=parts[parts.length-1].replace(/\[c\d+\]$/,'[out]'); last='[out]' }
  encode(['-loop','1','-t',String(dur),'-i',img], parts.join(';'), last, dur, out)
}

// テキストビート（紺背景＋中央コピー）
function clipText({ bg, dur, lines, size, sub, subSize, out, color=COL.cream }){
  const topY = Math.round(H*0.40 - (lines.length-1)*size*0.75)
  const ml = multiline({ lines, size, color, font:FONT_MINCHO, topY, startLabel:'[0:v]', idBase:'L' })
  let parts=[...ml.parts], last=ml.last
  if (sub){ parts.push(`${last}${dt({ font:FONT_GOTHIC, text:sub, size:subSize, color:COL.mute, y:Math.round(topY+lines.length*size*1.5+30) })}[s]`); last='[s]' }
  parts.push(`${last}fade=t=in:st=0:d=0.5,fade=t=out:st=${(dur-0.5).toFixed(2)}:d=0.5[out]`)
  encode(['-loop','1','-t',String(dur),'-i',bg], parts.join(';'), '[out]', dur, out)
}

// カード作成ステップ（浮遊カード＋キャプション）
function clipCard({ bg, shadow, cardFile, margin, dur, step, desc, idx, out }){
  const cardW=520, cardH=Math.round(cardW*CARD_ASPECT)
  const cardX=Math.round((W-cardW)/2), cardY=Math.round(H*0.275)
  const shX=cardX-margin, shY=cardY-margin+22
  const floatY=`${cardY}+13*sin(2*PI*(t+${(idx%3)*0.6})/4.6)`
  const stepY=Math.round(H*0.155), descY=cardY+cardH+Math.round(H*0.05), tagY=Math.round(H-H*0.06)
  const parts=[
    `[0:v]copy[bg0]`,
    `[bg0][1:v]overlay=${shX}:${shY}:format=auto[bgs]`,
    `[bgs][2:v]overlay=${cardX}:'${floatY}':format=auto[base]`,
    `[base]${dt({ font:FONT_GOTHIC_B, text:step, size:50, color:COL.gold, y:stepY })}[t0]`,
    `[t0]${dt({ font:FONT_MINCHO, text:desc, size:46, color:COL.cream, y:descY })}[t1]`,
    `[t1]${dt({ font:FONT_GOTHIC, text:'贈りことば · 登録不要・3分で完成', size:28, color:COL.mute, y:tagY })}[out]`,
  ]
  encode(['-loop','1','-t',String(dur),'-i',bg,'-loop','1','-t',String(dur),'-i',shadow,'-loop','1','-t',String(dur),'-i',path.join(CARDS,cardFile)],
    parts.join(';'), '[out]', dur, out)
}

// CTA
function clipCTA({ bg, dur, out }){
  const cy=Math.round(H/2)
  const pillW=820, pillH=110, pillX=Math.round((W-pillW)/2), pillY=cy+150, urlSize=38
  const parts=[
    `[0:v]${dt({ font:FONT_ITALIC, text:'Start now', size:54, color:COL.gold, y:cy-260 })}[o0]`,
    `[o0]${dt({ font:FONT_MINCHO, text:'あなたの想い、', size:78, color:COL.cream, y:cy-170 })}[o1]`,
    `[o1]${dt({ font:FONT_MINCHO, text:'3分でカードに。', size:78, color:COL.cream, y:cy-70 })}[o2]`,
    `[o2]${dt({ font:FONT_GOTHIC, text:'登録不要 · クレジットカード不要', size:34, color:COL.mute, y:cy+60 })}[o3]`,
    `[o3]drawbox=x=${pillX}:y=${pillY}:w=${pillW}:h=${pillH}:color=${COL.creamSoft}:t=fill[o4]`,
    `[o4]${dt({ font:FONT_GOTHIC_B, text:'message-card-app.vercel.app', size:urlSize, color:COL.ink, y:pillY+Math.round((pillH-urlSize)/2)-2, shadow:false })}[o5]`,
    `[o5]fade=t=in:st=0:d=0.6,fade=t=out:st=${(dur-0.7).toFixed(2)}:d=0.7[out]`,
  ]
  encode(['-loop','1','-t',String(dur),'-i',bg], parts.join(';'), '[out]', dur, out)
}

function concat(clips, durs, out){
  const inputs=clips.flatMap(c=>['-i',c]); const parts=[]; let last='[0:v]', acc=durs[0]
  for(let i=1;i<clips.length;i++){
    const offset=acc-XFADE; const label=i===clips.length-1?'[vout]':`[v${i}]`
    parts.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${offset.toFixed(3)}${label}`)
    last=label; acc=offset+durs[i]
  }
  run([FFMPEG,'-y',...inputs,'-filter_complex',parts.join(';'),'-map','[vout]',
    '-c:v','libx264','-preset','slow','-crf','17','-pix_fmt','yuv420p','-movflags','+faststart',out],'連結')
}

async function main(){
  for (const f of ['scene-reveal.png','scene-chat.png','scene-reply.png'])
    if(!existsSync(path.join(STORY,f))){ console.error(`  ${f} がありません。先に capture-story.mjs を実行してください。`); process.exit(1) }

  const tmp=path.join(ROOT,'screenshots','.tmp_story'); mkdirSync(tmp,{recursive:true})
  const bg=path.join(tmp,'bg.png'); buildBg(bg)
  const margin=Math.round(520*0.14); const shadow=path.join(tmp,'shadow.png'); buildShadow(520,Math.round(520*CARD_ASPECT),margin,shadow)

  const reveal=path.join(STORY,'scene-reveal.png'), chat=path.join(STORY,'scene-chat.png'), reply=path.join(STORY,'scene-reply.png')
  const clips=[], durs=[]
  const add=(p,d)=>{ clips.push(p); durs.push(d) }
  const T=(n)=>path.join(tmp,`${n}.mp4`)

  console.log('\n▶ ストーリー動画を生成中…')

  // 1. 泣きフック
  process.stdout.write('  [1] フック ... ')
  clipImage({ img:reveal, dur:3.8, fadeIn:true, out:T('01_hook'), caps:[
    { font:FONT_MINCHO, text:'このLINE一通で、', size:62, color:COL.cream, y:120 },
    { font:FONT_MINCHO, text:'母が泣きました。', size:62, color:COL.cream, y:200 },
    { font:FONT_GOTHIC, text:'――最後まで、見てほしい。', size:34, color:COL.gold, y:H-150 },
  ]}); add(T('01_hook'),3.8); console.log('✓')

  // 2-3. 共感
  process.stdout.write('  [2] 共感① ... ')
  clipText({ bg, dur:3.0, lines:['「ありがとう」は、','面と向かうと','言えない。'], size:74, out:T('02_beat1') }); add(T('02_beat1'),3.0); console.log('✓')
  process.stdout.write('  [3] 共感② ... ')
  clipText({ bg, dur:2.6, lines:['だから、','カードにしてみた。'], size:78, sub:'スマホで、3分。', subSize:38, out:T('03_beat2') }); add(T('03_beat2'),2.6); console.log('✓')

  // 4-6. 作成3ステップ
  const steps=[
    { f:'01_birthday_pastel_bloom.png', step:'STEP 1', desc:'贈るシーンを選ぶ' },
    { f:'07_thanks_letterpress.png',    step:'STEP 2', desc:'言葉はAIが手伝ってくれる' },
    { f:'09_parents_carnation.png',     step:'STEP 3', desc:'3分で、こんな一枚が完成' },
  ]
  steps.forEach((s,i)=>{ process.stdout.write(`  [${4+i}] ${s.step} ... `)
    clipCard({ bg, shadow, cardFile:s.f, margin, dur:3.0, step:s.step, desc:s.desc, idx:i, out:T(`0${4+i}_step`) }); add(T(`0${4+i}_step`),3.0); console.log('✓') })

  // 7. LINEで送る
  process.stdout.write('  [7] LINE送信 ... ')
  clipImage({ img:chat, dur:4.2, out:T('07_send'), caps:[
    { font:FONT_GOTHIC_B, text:'あとは、LINEで送るだけ。', size:50, color:COL.cream, y:120 },
    { font:FONT_GOTHIC, text:'インストール不要で相手はすぐ開ける', size:30, color:COL.mute, y:H-130 },
  ]}); add(T('07_send'),4.2); console.log('✓')

  // 8. 開く
  process.stdout.write('  [8] 開封 ... ')
  clipImage({ img:reveal, dur:3.8, out:T('08_open'), caps:[
    { font:FONT_GOTHIC_B, text:'タップすると…', size:50, color:COL.cream, y:120 },
    { font:FONT_MINCHO, text:'そっと、手紙が開く。', size:48, color:COL.gold, y:H-150 },
  ]}); add(T('08_open'),3.8); console.log('✓')

  // 9. リアクション
  process.stdout.write('  [9] リアクション ... ')
  clipImage({ img:reply, dur:4.4, out:T('09_react'), caps:[
    { font:FONT_MINCHO, text:'そして――', size:56, color:COL.cream, y:130 },
    { font:FONT_GOTHIC, text:'想いは、ちゃんと届く。', size:38, color:COL.gold, y:H-140 },
  ]}); add(T('09_react'),4.4); console.log('✓')

  // 10. CTA
  process.stdout.write('  [10] CTA ... ')
  clipCTA({ bg, dur:4.0, out:T('10_cta') }); add(T('10_cta'),4.0); console.log('✓')

  process.stdout.write(`  連結 (${clips.length}クリップ) ... `)
  const outFile=path.join(DESKTOP,`okurikotoba_story_${Date.now()}.mp4`)
  concat(clips,durs,outFile); console.log('✓')
  console.log(`  保存先: ${outFile}`)
  rmSync(tmp,{recursive:true,force:true})
  console.log('\n完了! デスクトップを確認してください。')
}
main().catch(e=>{ console.error('\nエラー:',e.message); process.exit(1) })
