'use client'

import Link from 'next/link'

export default function LPFooter() {
  return (
    <footer
      className="border-t px-8 pb-10 pt-[60px]"
      style={{ borderColor: 'var(--lp-paper-line)', color: 'var(--lp-ink-mute)', fontSize: 13, position: 'relative', zIndex: 2 }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px]" style={{ fontFamily: 'var(--font-lp-display)', fontSize: 24, color: 'var(--lp-ink)' }}>
          <div
            className="grid place-items-center"
            style={{
              width: 32, height: 32,
              background: 'var(--lp-ink)',
              color: 'var(--lp-cream-soft)',
              borderRadius: 8,
              fontFamily: 'var(--font-lp-display)',
              fontStyle: 'italic',
              fontSize: 18,
              transform: 'rotate(-6deg)',
              boxShadow: '0 2px 0 -1px var(--lp-ink), 2px 2px 0 0 var(--lp-terracotta)',
            }}
          >
            M
          </div>
          <span style={{ fontWeight: 400 }}>
            Card<em style={{ fontStyle: 'italic', color: 'var(--lp-terracotta)', fontFamily: 'var(--font-lp-display)' }}>Magic</em>
          </span>
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap gap-[22px]">
          <Link href="/login" className="transition-colors hover:text-[var(--lp-terracotta)]">ログイン</Link>
          <a href="#pricing" className="transition-colors hover:text-[var(--lp-terracotta)]">料金</a>
          <a href="#faq" className="transition-colors hover:text-[var(--lp-terracotta)]">FAQ</a>
          <Link href="/blog" className="transition-colors hover:text-[var(--lp-terracotta)]">ブログ</Link>
        </nav>

        <div>&copy; 2026 CardMagic. All rights reserved.</div>
      </div>
    </footer>
  )
}
