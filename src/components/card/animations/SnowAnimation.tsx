'use client'
import { useEffect, useRef } from 'react'

interface Props { active: boolean }

export default function SnowAnimation({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const flakes: { x: number; y: number; r: number; d: number; opacity: number }[] = []
    for (let i = 0; i < 80; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        d: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.6 + 0.3,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      flakes.forEach(f => {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`
        ctx.fill()
        f.y += f.d
        f.x += Math.sin(f.y / 30) * 0.5
        if (f.y > canvas.height) { f.y = -10; f.x = Math.random() * canvas.width }
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
