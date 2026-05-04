'use client'

import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function LPFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-inner">
          <Logo />
          <div className="lp-footer-links">
            <Link href="/login">ログイン</Link>
            <a href="#pricing">料金</a>
            <a href="#faq">FAQ</a>
            <Link href="/blog">ブログ</Link>
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシー</Link>
          </div>
          <div>&copy; 2026 CardMagic. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
