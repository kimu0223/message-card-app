'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface TiltStyle {
  transform: string
  boxShadow: string
  transition: string
}

interface UseCardTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function useCardTilt<T extends HTMLElement>(options: UseCardTiltOptions = {}) {
  const { maxTilt = 10, perspective = 1000, scale = 1.02, speed = 400 } = options
  const ref = useRef<T>(null)
  const [style, setStyle] = useState<TiltStyle>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
    transition: `transform ${speed}ms ease-out, box-shadow ${speed}ms ease-out`,
  })
  const rafRef = useRef<number | null>(null)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (prefersReduced.current || !ref.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rotateY = ((clientX - centerX) / (rect.width / 2)) * maxTilt
      const rotateX = -((clientY - centerY) / (rect.height / 2)) * maxTilt

      const shadowX = rotateY * 1.5
      const shadowY = 12 + rotateX * -1
      const shadowBlur = 40 + Math.abs(rotateX) + Math.abs(rotateY)

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`,
        boxShadow: `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${shadowBlur.toFixed(0)}px rgba(0,0,0,0.3)`,
        transition: `transform 100ms ease-out, box-shadow 100ms ease-out`,
      })
    })
  }, [maxTilt, perspective, scale])

  const handleReset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
      transition: `transform ${speed}ms ease-out, box-shadow ${speed}ms ease-out`,
    })
  }, [perspective, speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onMouseLeave = () => handleReset()
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onTouchEnd = () => handleReset()

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleMove, handleReset])

  return { ref, tiltStyle: style }
}
