/**
 * 贈りことば — ストーリー動画用モック画面キャプチャ
 * story-assets.html の各シーン(#scene-*)を 1080×1920 PNG で保存する。
 *
 *   node scripts/capture-story.mjs
 */
import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HTML = pathToFileURL(path.join(__dirname, 'story-assets.html')).href
const OUT = path.resolve(__dirname, '..', 'screenshots', 'story')

const SCENES = ['scene-reveal', 'scene-chat', 'scene-reply']

async function main() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  console.log('読み込み:', HTML)
  await page.goto(HTML, { waitUntil: 'networkidle' })
  // フォント＆画像の確実な反映を待つ
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)

  for (const id of SCENES) {
    const el = page.locator(`#${id}`)
    const out = path.join(OUT, `${id}.png`)
    await el.screenshot({ path: out })
    console.log('✓', `${id}.png`)
  }
  await browser.close()
  console.log(`\n完了! ${SCENES.length}枚を ${OUT} に保存しました`)
}
main().catch(e => { console.error('エラー:', e.message); process.exit(1) })
