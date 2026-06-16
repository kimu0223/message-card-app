'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

export default function CTASection() {
  useReveal()

  return (
    <div className="lp-container">
      <div
        className="lp-reveal"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 28,
          margin: '60px 0',
          padding: 'clamp(64px, 9vw, 100px) clamp(28px, 6vw, 64px)',
          textAlign: 'center',
          background: 'linear-gradient(150deg, var(--lp-ink) 0%, var(--lp-ink2) 55%, #34406b 100%)',
          color: 'var(--lp-cream-soft)',
        }}
      >
        {/* soft gold radial glow blob */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,153,104,0.42), transparent 65%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-35%',
            left: '-12%',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(176,58,46,0.28), transparent 65%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />

        <div className="lp-wax" style={{ margin: '0 auto 24px', position: 'relative' }}>贈</div>

        <h2
          style={{
            position: 'relative',
            fontFamily: 'var(--font-lp-serif)',
            fontWeight: 600,
            fontSize: 'clamp(30px, 4.4vw, 52px)',
            lineHeight: 1.25,
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          あなたの想い、<br />3分でカードに。
        </h2>
        <p
          style={{
            position: 'relative',
            fontFamily: 'var(--font-lp-sans)',
            fontSize: 15,
            color: 'rgba(250,247,239,0.78)',
            margin: '16px 0 32px',
          }}
        >
          登録不要 &middot; クレジットカード不要 &middot; いつでもキャンセル可能
        </p>
        <Link
          href="/create"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '15px 30px',
            borderRadius: 999,
            background: 'var(--lp-cream-soft)',
            color: 'var(--lp-ink)',
            fontFamily: 'var(--font-lp-sans)',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 16px 32px -14px rgba(0,0,0,0.45)',
          }}
        >
          無料でカードを作る &rarr;
        </Link>
      </div>
    </div>
  )
}
