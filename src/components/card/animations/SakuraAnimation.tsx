'use client'
import { useEffect, useRef } from 'react'

interface Props { active: boolean }

export default function SakuraAnimation({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#FFB7C5', '#FFC0CB', '#FF91A4', '#FFAEC9', '#FFD0D8']
    const petals: {
      x: number; y: number; r: number; rot: number; rotSpeed: number
      speed: number; sway: number; swayOffset: number; opacity: number; colorIdx: number
    }[] = []

    for (let i = 0; i < 40; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        speed: Math.random() * 1.5 + 0.5,
        sway: Math.random() * 2 + 1,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.7 + 0.3,
        colorIdx: i % colors.length,
      })
    }

    let animId: number
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.02
      petals.forEach(p => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.fillStyle = colors[p.colorIdx]
        ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        p.y += p.speed
        p.x += Math.sin(t + p.swayOffset) * p.sway
        p.rot += p.rotSpeed

        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}
    />
  )
}
