'use client'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface Props { active: boolean }

export default function FireworksAnimation({ active }: Props) {
  useEffect(() => {
    if (!active) return

    const duration = 4000
    const end = Date.now() + duration
    const colors = ['#ff0000', '#ffd700', '#ff69b4', '#00bfff', '#7b68ee', '#32cd32', '#ff4500', '#da70d6']

    const launch = () => {
      confetti({
        particleCount: 25,
        startVelocity: 50,
        spread: 360,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() * 0.3 + 0.05 },
        colors,
        gravity: 0.7,
        scalar: 0.9,
        ticks: 200,
      })
      confetti({
        particleCount: 25,
        startVelocity: 50,
        spread: 360,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() * 0.3 + 0.05 },
        colors,
        gravity: 0.7,
        scalar: 0.9,
        ticks: 200,
      })
      if (Date.now() < end) {
        setTimeout(launch, 500)
      }
    }

    setTimeout(launch, 200)
  }, [active])

  return null
}
