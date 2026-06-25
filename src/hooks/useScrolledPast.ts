'use client'

import { useEffect, useState } from 'react'

/**
 * 縦スクロール量が threshold(px) を超えたかどうかを返す共通フック。
 * マウント時に一度評価し、その後は passive な scroll リスナーで追従する。
 * LPHeader（しきい値40）や MobileStickyCTA（しきい値600）で共有する。
 */
export function useScrolledPast(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
