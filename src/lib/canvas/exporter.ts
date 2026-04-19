import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

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

  // 400px幅に縮小
  const targetWidth = 400
  const scale = targetWidth / canvas.width
  const targetHeight = canvas.height * scale

  const resized = document.createElement('canvas')
  resized.width = targetWidth
  resized.height = targetHeight

  const ctx = resized.getContext('2d')!
  ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight)

  return resized.toDataURL('image/jpeg', 0.85)
}
