import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { CARD_SIZES } from '@/types/card'
import type { CanvasData, TextElement, ShapeElement } from '@/types/card'

// ========================================================
// Canvas 2D API による直接レンダリング（html2canvas 不使用）
// html2canvas は aspect-ratio / inset / clamp(vw) で失敗するため
// ========================================================

async function renderCardToCanvas(canvasData: CanvasData, pixelRatio = 2): Promise<HTMLCanvasElement> {
  const size = CARD_SIZES[canvasData.size]
  const w = size.width
  const h = size.height

  const canvas = document.createElement('canvas')
  canvas.width = w * pixelRatio
  canvas.height = h * pixelRatio

  const ctx = canvas.getContext('2d')!
  ctx.scale(pixelRatio, pixelRatio)

  // 背景描画
  const bg = canvasData.background
  if (bg.type === 'gradient') {
    drawGradientBg(ctx, bg.value, w, h)
  } else {
    ctx.fillStyle = bg.value
    ctx.fillRect(0, 0, w, h)
  }

  // 要素を zIndex 順で描画
  const sorted = [...canvasData.elements].sort((a, b) => a.zIndex - b.zIndex)

  // シェイプ先に描画
  for (const el of sorted) {
    if (el.type === 'shape') drawShape(ctx, el as ShapeElement)
  }

  // フォント読み込み待機
  await document.fonts.ready

  // テキストを y 座標順で描画
  const textEls = sorted
    .filter(el => el.type === 'text')
    .sort((a, b) => a.y - b.y) as TextElement[]

  for (const el of textEls) drawText(ctx, el)

  return canvas
}

/** CSS linear-gradient 文字列を Canvas グラデーションに変換して塗りつぶす */
function drawGradientBg(ctx: CanvasRenderingContext2D, value: string, w: number, h: number) {
  const match = value.match(/linear-gradient\(\s*([^,]+?)\s*,\s*(.+)\s*\)/)
  if (!match) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    return
  }

  const anglePart = match[1].trim()
  let angleDeg = 135
  if (anglePart.includes('deg')) {
    angleDeg = parseFloat(anglePart)
  } else if (anglePart === 'to right') {
    angleDeg = 90
  } else if (anglePart === 'to bottom') {
    angleDeg = 180
  } else if (anglePart === 'to left') {
    angleDeg = 270
  } else if (anglePart === 'to top') {
    angleDeg = 0
  }

  // CSS 角度 → Canvas グラデーション開始/終了座標
  const rad = ((angleDeg - 90) * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const len = Math.abs(cos * w) + Math.abs(sin * h)
  const x0 = w / 2 - (cos * len) / 2
  const y0 = h / 2 - (sin * len) / 2
  const x1 = w / 2 + (cos * len) / 2
  const y1 = h / 2 + (sin * len) / 2

  const grad = ctx.createLinearGradient(x0, y0, x1, y1)

  const stopRe = /(#[a-fA-F0-9]{3,8}|rgba?\([^)]+\)|[a-z]+)\s+(\d+(?:\.\d+)?)%/g
  let m: RegExpExecArray | null
  let found = false
  while ((m = stopRe.exec(match[2])) !== null) {
    grad.addColorStop(parseFloat(m[2]) / 100, m[1])
    found = true
  }

  if (!found) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    return
  }

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
}

/** ShapeElement を Canvas 2D API で描画 */
function drawShape(ctx: CanvasRenderingContext2D, el: ShapeElement) {
  ctx.save()
  ctx.globalAlpha = el.opacity ?? 1

  if (el.rotation) {
    ctx.translate(el.x, el.y)
    ctx.rotate((el.rotation * Math.PI) / 180)
    ctx.translate(-el.x, -el.y)
  }

  ctx.fillStyle = el.fill
  const hasStroke = el.stroke && el.stroke !== 'transparent' && (el.strokeWidth ?? 0) > 0
  if (hasStroke) {
    ctx.strokeStyle = el.stroke
    ctx.lineWidth = el.strokeWidth
  }

  ctx.beginPath()

  if (el.shapeType === 'rect') {
    const rx = el.x - el.width / 2
    const ry = el.y - el.height / 2
    if (ctx.roundRect) {
      ctx.roundRect(rx, ry, el.width, el.height, 3)
    } else {
      ctx.rect(rx, ry, el.width, el.height)
    }
  } else if (el.shapeType === 'circle') {
    ctx.ellipse(el.x, el.y, el.width / 2, el.height / 2, 0, 0, Math.PI * 2)
  } else if (el.shapeType === 'heart') {
    const w = el.width, hh = el.height, cx = el.x, cy = el.y
    ctx.moveTo(cx, cy + hh * 0.35)
    ctx.bezierCurveTo(cx - w * 0.6, cy - hh * 0.05, cx - w * 0.65, cy - hh * 0.45, cx, cy - hh * 0.28)
    ctx.bezierCurveTo(cx + w * 0.65, cy - hh * 0.45, cx + w * 0.6, cy - hh * 0.05, cx, cy + hh * 0.35)
    ctx.closePath()
  } else if (el.shapeType === 'star') {
    const r = Math.min(el.width, el.height) * 0.5
    const ir = r * 0.4
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI / 5) - Math.PI / 2
      const rd = i % 2 === 0 ? r : ir
      const px = el.x + Math.cos(a) * rd
      const py = el.y + Math.sin(a) * rd
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  }

  ctx.fill()
  if (hasStroke) ctx.stroke()
  ctx.restore()
}

/** TextElement を Canvas 2D API で描画 */
function drawText(ctx: CanvasRenderingContext2D, el: TextElement) {
  ctx.save()
  ctx.globalAlpha = el.opacity ?? 1
  ctx.fillStyle = el.color

  const italic = el.fontStyle === 'italic' ? 'italic ' : ''
  const weight = el.fontWeight ?? 'normal'
  ctx.font = `${italic}${weight} ${el.fontSize}px "${el.fontFamily}", sans-serif`
  ctx.textAlign = (el.align ?? 'center') as CanvasTextAlign
  ctx.textBaseline = 'top'

  // x,y は要素の CENTER 座標
  let x: number
  if (el.align === 'left') x = el.x - el.width / 2
  else if (el.align === 'right') x = el.x + el.width / 2
  else x = el.x // center

  const lineH = el.fontSize * (el.lineHeight ?? 1.4)
  const lines = el.text.split('\n')
  const totalH = lineH * lines.length
  let startY = el.y - totalH / 2

  for (const line of lines) {
    ctx.fillText(line, x, startY)
    startY += lineH
  }

  ctx.restore()
}

// ========================================================
// 公開 API: CanvasData から PNG / PDF を直接生成
// ========================================================

/** CanvasData を PNG でダウンロード */
export async function exportCardToPNG(canvasData: CanvasData, filename = 'card'): Promise<void> {
  const canvas = await renderCardToCanvas(canvasData, 2)
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

/** CanvasData を PDF でダウンロード */
export async function exportCardToPDF(canvasData: CanvasData, filename = 'card'): Promise<void> {
  const canvas = await renderCardToCanvas(canvasData, 2)
  const imgData = canvas.toDataURL('image/png')
  const displayW = canvas.width / 2
  const displayH = canvas.height / 2
  const pdf = new jsPDF({
    orientation: displayW > displayH ? 'landscape' : 'portrait',
    unit: 'px',
    format: [displayW, displayH],
  })
  pdf.addImage(imgData, 'PNG', 0, 0, displayW, displayH)
  pdf.save(`${filename}.pdf`)
}

// ========================================================
// 旧 API: html2canvas ベース（generateThumbnail 用に維持）
// ========================================================

export async function exportToPNG(elementId: string, filename = 'card'): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
  })

  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export async function exportToPDF(elementId: string, filename = 'card'): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width / 2, canvas.height / 2],
  })

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
  pdf.save(`${filename}.pdf`)
}

export async function generateThumbnail(elementId: string): Promise<string> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scale: 1,
  })

  const targetWidth = 400
  const scale = targetWidth / canvas.width
  const targetHeight = canvas.height * scale

  const resized = document.createElement('canvas')
  resized.width = targetWidth
  resized.height = targetHeight

  const rctx = resized.getContext('2d')!
  rctx.drawImage(canvas, 0, 0, targetWidth, targetHeight)

  return resized.toDataURL('image/jpeg', 0.85)
}
