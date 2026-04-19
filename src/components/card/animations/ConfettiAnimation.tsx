'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiAnimationProps {
  active: boolean
  duration?: number
}

export default function ConfettiAnimation({ active, duration = 3000 }: ConfettiAnimationProps) {
  useEffect(() => {
    if (!active) return

    const end = Date.now() + duration

    const colors = ['#ff6b9d', '#ffd700', '#00bcd4', '#7c4dff', '#ff5722']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    requestAnimationFrame(frame)
  }, [active, duration])

  return null
}
