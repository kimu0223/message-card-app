'use client'

import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function LPFooter() {
  return (
    <footer
      className="border-t px-8 pb-10 pt-[60px]"
      style={{ borderColor: 'var(--lp-paper-line)', color: 'var(--lp-ink-mute)', fontSize: 13, position: 'relative', zIndex: 2 }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
        <Logo />

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
