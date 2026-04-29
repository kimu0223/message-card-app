'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/shared/Logo'

export default function LPHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 border-b transition-all duration-200"
      style={{
        backdropFilter: 'blur(14px) saturate(120%)',
        background: scrolled ? 'rgba(244, 236, 220, 0.85)' : 'rgba(244, 236, 220, 0.72)',
        borderColor: 'rgba(43,37,32,0.06)',
      }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-8 py-[18px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm md:flex" style={{ color: 'var(--lp-ink-soft)' }}>
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
            style={{ borderColor: 'rgba(43,37,32,0.18)', color: 'var(--lp-ink)' }}
          >
            ログイン
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center rounded-full px-[18px] py-[10px] text-sm font-medium text-[var(--lp-cream-soft)] transition-transform hover:-translate-y-0.5"
            style={{
              background: 'var(--lp-ink)',
              boxShadow: '0 6px 0 -3px var(--lp-ink), 0 12px 24px -10px rgba(43,37,32,0.5)',
            }}
          >
            無料で試す →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="メニュー"
          style={{ color: 'var(--lp-ink)' }}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t px-8 py-5 md:hidden" style={{ borderColor: 'rgba(43,37,32,0.06)', background: 'var(--lp-cream-soft)' }}>
          <nav className="flex flex-col gap-4 text-sm font-medium" style={{ color: 'var(--lp-ink-soft)' }}>
            <a href="#how" onClick={() => setMobileOpen(false)}>使い方</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>機能</a>
            <a href="#gallery" onClick={() => setMobileOpen(false)}>テンプレート</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>料金</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
            <hr style={{ borderColor: 'rgba(43,37,32,0.08)' }} />
            <Link href="/login" onClick={() => setMobileOpen(false)}>ログイン</Link>
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-[var(--lp-cream-soft)]"
              style={{ background: 'var(--lp-ink)' }}
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
