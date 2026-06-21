'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/shared/Logo'

export default function LPHeader() {
  // scrolled past the dark hero top → solid cream bar with ink text.
  // at the very top (<=40px) → transparent bar with light text over the dark hero.
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // The transparent light-text treatment only makes sense over the homepage's
  // dark depth hero. Every other (lp) route is light at the top, so there the
  // header is always the solid cream bar (light text would be invisible).
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Solid bar (cream bg) once scrolled past the hero top; transparent while
  // sitting over the homepage hero. Only the BACKGROUND depends on this.
  const solid = !isHome || scrolled || mobileOpen

  // The depth-inkwash hero is LIGHT (cream) at the top where the header sits,
  // so the wordmark/nav must stay ink — cream text would vanish on the cream
  // hero top. Ink also reads fine on the scrolled cream bar, so it's constant.
  const fg = 'var(--lp-ink)'
  const fgSoft = 'var(--lp-ink-soft)'

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: solid ? 'blur(14px) saturate(120%)' : 'none',
        background: solid ? 'rgba(250, 247, 239, 0.85)' : 'transparent',
        borderBottom: solid
          ? '1px solid var(--lp-paper-line)'
          : '1px solid transparent',
        color: fg,
      }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-8 py-[18px]">
        {/* The hero top is light, so the wordmark keeps its default ink color. */}
        <Logo />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 text-sm md:flex"
          style={{ color: fgSoft, fontFamily: 'var(--font-lp-sans)' }}
        >
          <a href="#how" className="transition-colors hover:text-[var(--lp-terracotta)]">使い方</a>
          <a href="#features" className="transition-colors hover:text-[var(--lp-terracotta)]">機能</a>
          <a href="#gallery" className="transition-colors hover:text-[var(--lp-terracotta)]">テンプレート</a>
          <a href="#pricing" className="transition-colors hover:text-[var(--lp-terracotta)]">料金</a>
          <a href="#faq" className="transition-colors hover:text-[var(--lp-terracotta)]">FAQ</a>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-[10px] md:flex">
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border px-[18px] py-[10px] text-sm font-medium transition-colors"
            style={{
              borderColor: 'var(--lp-paper-line)',
              color: fg,
            }}
          >
            ログイン
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center rounded-full px-[18px] py-[10px] text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              // ink fill reads on both the light hero top and the scrolled cream bar
              background: 'var(--lp-ink)',
              color: 'var(--lp-cream-soft)',
              boxShadow: '0 12px 24px -10px rgba(26,39,68,0.45)',
            }}
          >
            無料で試す →
          </Link>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/create"
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-medium"
            style={{
              background: 'var(--lp-ink)',
              color: 'var(--lp-cream-soft)',
            }}
          >
            無料で試す →
          </Link>
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="メニュー"
            aria-expanded={mobileOpen}
            style={{ color: fg }}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — cream panel, ink text */}
      {mobileOpen && (
        <div
          className="border-t px-8 py-5 md:hidden"
          style={{ borderColor: 'var(--lp-paper-line)', background: 'var(--lp-cream-soft)' }}
        >
          <nav
            className="flex flex-col gap-4 text-sm font-medium"
            style={{ color: 'var(--lp-ink-soft)', fontFamily: 'var(--font-lp-sans)' }}
          >
            <a href="#how" onClick={() => setMobileOpen(false)}>使い方</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>機能</a>
            <a href="#gallery" onClick={() => setMobileOpen(false)}>テンプレート</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>料金</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
            <hr style={{ borderColor: 'var(--lp-paper-line)' }} />
            <Link href="/login" style={{ color: 'var(--lp-ink)' }} onClick={() => setMobileOpen(false)}>ログイン</Link>
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
              style={{ background: 'var(--lp-ink)', color: 'var(--lp-cream-soft)' }}
              onClick={() => setMobileOpen(false)}
            >
              無料で試す →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
