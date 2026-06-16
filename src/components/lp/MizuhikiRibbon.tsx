'use client'

import { useEffect, useRef } from 'react'

/**
 * 水引 (mizuhiki) — a single gold→vermilion→navy thread that draws itself in as
 * you scroll through the light lower region. Scoped to its relatively-positioned
 * parent (it fills it and measures the parent's rect), so it never crosses the
 * dark hero or any copy. Decorative only.
 */
export default function MizuhikiRibbon() {
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const scope = svgRef.current?.parentElement
    if (!path || !scope) return
    let raf = 0
    const upd = () => {
      const rect = scope.getBoundingClientRect()
      const vh = window.innerHeight
      const denom = rect.height - vh * 0.4 || 1
      const p = Math.min(1, Math.max(0, (vh * 0.6 - rect.top) / denom))
      path.style.strokeDashoffset = String(1 - p)
      raf = requestAnimationFrame(upd)
    }
    raf = requestAnimationFrame(upd)
    return () => cancelAnimationFrame(raf)
  }, [])

  const d =
    'M50 0 C 80 90, 20 180, 50 270 C 80 360, 16 450, 50 540 C 82 630, 22 720, 50 810 C 76 900, 40 960, 50 1000'

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="mizuhiki" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--lp-gold)" />
          <stop offset="0.5" stopColor="var(--lp-terracotta)" />
          <stop offset="1" stopColor="var(--lp-ink)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="var(--lp-ink)" strokeOpacity="0.07" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      <path
        ref={pathRef}
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1}
        d={d}
        fill="none"
        stroke="url(#mizuhiki)"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  )
}
