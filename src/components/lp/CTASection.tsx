'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

export default function CTASection() {
  useReveal()

  return (
    <div className="lp-container">
      <div className="lp-cta-bottom lp-reveal">
        <div className="lp-wax" style={{ margin: '0 auto 24px', position: 'relative' }}>M</div>
        <h2 style={{
          fontFamily: 'var(--font-lp-serif)',
          fontWeight: 500,
          fontSize: 'clamp(32px, 4.4vw, 56px)',
          lineHeight: 1.25,
          position: 'relative',
        }}>
          あなたの想い、<br />3分でカードに。
        </h2>
        <p style={{ position: 'relative', color: 'rgba(255,252,245,0.75)', margin: '16px 0 32px' }}>
          登録不要 &middot; クレジットカード不要 &middot; いつでもキャンセル可能
        </p>
        <Link href="/create" className="lp-btn lp-btn-primary" style={{ position: 'relative' }}>
          無料でカードを作る &rarr;
        </Link>
      </div>
    </div>
  )
}
