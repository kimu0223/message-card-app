/**
 * 贈りことば — カードテンプレート自動スクリーンショット
 *
 * 使い方:
 *   node scripts/capture-cards.mjs
 *   node scripts/capture-cards.mjs --url http://localhost:3000  # ローカル
 *   node scripts/capture-cards.mjs --out ./my-assets           # 出力先変更
 */

import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// --- オプション解析 ---
const args = process.argv.slice(2)
const getArg = (key) => {
  const i = args.indexOf(key)
  return i !== -1 ? args[i + 1] : null
}

const BASE_URL = getArg('--url') ?? 'https://message-card-app.vercel.app'
const OUT_DIR  = path.resolve(__dirname, '..', getArg('--out') ?? 'screenshots/cards')

const TEMPLATES = [
  { id: 'bday-1',  index: 0,  label: 'birthday_pastel_bloom' },
  { id: 'bday-2',  index: 1,  label: 'birthday_confetti_night' },
  { id: 'wed-1',   index: 2,  label: 'wedding_botanical_arch' },
  { id: 'wed-2',   index: 3,  label: 'wedding_gold_monogram' },
  { id: 'ret-1',   index: 4,  label: 'farewell_sunset_horizon' },
  { id: 'ret-2',   index: 5,  label: 'farewell_spring_bouquet' },
  { id: 'thx-1',   index: 6,  label: 'thanks_letterpress' },
  { id: 'thx-2',   index: 7,  label: 'thanks_sage_painterly' },
  { id: 'mom-1',   index: 8,  label: 'parents_carnation' },
  { id: 'dad-1',   index: 9,  label: 'parents_compass_map' },
]

async function main() {
  console.log(`\n贈りことば カード自動キャプチャ`)
  console.log(`URL: ${BASE_URL}/card-gallery`)
  console.log(`出力先: ${OUT_DIR}\n`)

  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true })
    console.log(`ディレクトリを作成しました: ${OUT_DIR}`)
  }

  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 900, height: 800 },
    deviceScaleFactor: 2,  // Retina品質
  })
  const page = await ctx.newPage()

  console.log('ページを読み込み中...')
  await page.goto(`${BASE_URL}/card-gallery`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  // 全テンプレートをURLパラメータで切り替えてキャプチャ
  for (const tmpl of TEMPLATES) {
    await page.goto(`${BASE_URL}/card-gallery?i=${tmpl.index}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const card = page.locator('[data-testid="card-display"]').first()
    const outPath = path.join(OUT_DIR, `${String(tmpl.index + 1).padStart(2, '0')}_${tmpl.label}.png`)
    await card.screenshot({ path: outPath })
    console.log(`✓ ${tmpl.label}`)
  }

  // グリッド全体もキャプチャ
  await page.goto(`${BASE_URL}/card-gallery`, { waitUntil: 'networkidle' })
  const gridBtn = page.locator('button', { hasText: 'グリッド' })
  await gridBtn.click()
  await page.waitForTimeout(500)
  const gridPath = path.join(OUT_DIR, '00_all_templates_grid.png')
  await page.screenshot({ path: gridPath, fullPage: true })
  console.log(`✓ グリッド全体`)

  await browser.close()

  console.log(`\n完了! ${TEMPLATES.length + 1}枚を保存しました`)
  console.log(`場所: ${OUT_DIR}`)
}

main().catch(err => {
  console.error('エラー:', err.message)
  process.exit(1)
})
