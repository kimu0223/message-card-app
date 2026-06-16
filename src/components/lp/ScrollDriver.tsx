'use client'

import { useEffect } from 'react'

/**
 * Publishes window scrollY as a CSS variable (--sy, in px) on :root via a
 * single rAF loop. Every parallax layer on the LP reads var(--sy) so all
 * motion stays in sync and cheap. Mount once near the top of the page.
 */
export default function ScrollDriver() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const tick = () => {
      root.style.setProperty('--sy', String(window.scrollY || window.pageYOffset || 0))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return null
}
