'use client'

import Link from 'next/link'
import Logo from '@/components/shared/Logo'

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.4L9 4H4z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLINE() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 5.81 2 10.5c0 4.08 3.42 7.5 8.05 8.32.31.07.74.21.85.48.1.25.06.63.03.88l-.14.82c-.04.25-.2.98.86.53s5.72-3.37 7.81-5.77C21.36 13.66 22 12.13 22 10.5 22 5.81 17.52 2 12 2z" />
    </svg>
  )
}

export default function LPFooter() {
  return (
    <footer
      className="border-t px-6 pb-8 pt-14 md:px-8 md:pb-10 md:pt-[60px]"
      style={{
        borderColor: 'var(--lp-paper-line)',
        color: 'var(--lp-ink-mute)',
        fontSize: 13,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8 md:text-left">
        {/* Column 1: Logo + Tagline */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Logo />
          <p
            className="leading-relaxed opacity-80"
            style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 14 }}
          >
            心ふるえる、一通の手紙を。
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <nav className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* Group: サービス */}
          <div className="flex flex-col gap-3">
            <h4
              className="mb-1 text-sm font-semibold"
              style={{ fontFamily: 'var(--font-lp-display)', color: 'var(--lp-ink-soft)' }}
            >
              サービス
            </h4>
            <a href="#how" className="transition-colors hover:text-[var(--lp-terracotta)]">
              使い方
            </a>
            <a href="#gallery" className="transition-colors hover:text-[var(--lp-terracotta)]">
              テンプレート
            </a>
            <a href="#pricing" className="transition-colors hover:text-[var(--lp-terracotta)]">
              料金
            </a>
            <a href="#faq" className="transition-colors hover:text-[var(--lp-terracotta)]">
              FAQ
            </a>
          </div>

          {/* Group: サポート */}
          <div className="flex flex-col gap-3">
            <h4
              className="mb-1 text-sm font-semibold"
              style={{ fontFamily: 'var(--font-lp-display)', color: 'var(--lp-ink-soft)' }}
            >
              サポート
            </h4>
            <Link href="/help" className="transition-colors hover:text-[var(--lp-terracotta)]">
              ヘルプセンター
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[var(--lp-terracotta)]">
              お問い合わせ
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-[var(--lp-terracotta)]">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--lp-terracotta)]">
              利用規約
            </Link>
          </div>
        </nav>

        {/* Column 3: SNS Icons */}
        <div className="flex flex-col items-center gap-4 md:items-end">
          <h4
            className="text-sm font-semibold"
            style={{ fontFamily: 'var(--font-lp-display)', color: 'var(--lp-ink-soft)' }}
          >
            フォローする
          </h4>
          <div className="flex items-center gap-5">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="transition-colors hover:text-[var(--lp-terracotta)]"
            >
              <IconX />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-[var(--lp-terracotta)]"
            >
              <IconInstagram />
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE"
              className="transition-colors hover:text-[var(--lp-terracotta)]"
            >
              <IconLINE />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mx-auto mt-10 flex max-w-[1240px] flex-col items-center justify-between gap-2 border-t pt-6 text-xs md:flex-row"
        style={{ borderColor: 'var(--lp-paper-line)', opacity: 0.7 }}
      >
        <div>&copy; 2026 CardMagic. All rights reserved.</div>
        <div style={{ fontFamily: 'var(--font-lp-serif)' }}>Made with heart in Tokyo</div>
      </div>
    </footer>
  )
}
