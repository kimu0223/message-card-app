'use client'

import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import { brandName } from '@/lib/brand'

export default function LPFooter() {
  return (
    <footer
      // モバイルの追従CTAバー(~64px)に最下部の操作要素が隠れないよう余白を確保
      className="lp-footer pb-24 md:pb-0"
      style={{
        borderTop: '1px solid var(--lp-paper-line)',
        color: 'var(--lp-ink-mute)',
        fontFamily: 'var(--font-lp-sans)',
        fontSize: 13,
      }}
    >
      <div className="lp-container">
        <div className="lp-footer-inner">
          <Logo />
          <div className="lp-footer-links" style={{ color: 'var(--lp-ink-soft)' }}>
            <Link href="/login">ログイン</Link>
            <a href="#pricing">料金</a>
            <a href="#faq">FAQ</a>
            <Link href="/blog">ブログ</Link>
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシー</Link>
          </div>
          <div style={{ color: 'var(--lp-ink-mute)' }}>&copy; 2026 {brandName}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
