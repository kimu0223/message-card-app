'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

export default function CTASection() {
  useReveal()

  return (
    <div className="mx-auto max-w-[1240px] px-8" style={{ position: 'relative', zIndex: 2 }}>
      <div
        className="lp-reveal relative overflow-hidden rounded-[32px] px-10 py-[100px] text-center"
        style={{ background: 'var(--lp-ink)', color: 'var(--lp-cream-soft)', margin: '60px 0' }}
      >
        {/* Background gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 15% 20%, rgba(201,123,92,0.35), transparent 40%), radial-gradient(circle at 85% 80%, rgba(143,166,138,0.3), transparent 40%)',
          }}
        />

        {/* Wax seal */}
        <div
          className="relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #D88468, var(--lp-terracotta) 60%, var(--lp-terracotta-deep) 100%)',
            color: 'var(--lp-cream-soft)',
            fontFamily: 'var(--font-lp-display)',
            fontStyle: 'italic',
            fontSize: 22,
            boxShadow: 'inset -6px -8px 14px rgba(0,0,0,0.25), inset 4px 4px 6px rgba(255,255,255,0.18), 0 6px 14px -6px rgba(168,95,68,0.5)',
            transform: 'rotate(-8deg)',
          }}
        >
          M
          <span className="absolute inset-[6px] rounded-full border border-dashed" style={{ borderColor: 'rgba(255,252,245,0.35)' }} />
        </div>

        <h2
          className="relative mx-auto mb-4"
          style={{
            fontFamily: 'var(--font-lp-serif)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4.4vw, 56px)',
            lineHeight: 1.25,
          }}
        >
          あなたの想い、<br />3分でカードに。
        </h2>
        <p className="relative mx-auto mb-8 text-base" style={{ color: 'rgba(255,252,245,0.75)' }}>
          登録不要 · クレジットカード不要 · いつでもキャンセル可能
        </p>
        <Link
          href="/create"
          className="relative inline-flex items-center gap-[10px] rounded-full px-[22px] py-[14px] text-[15px] font-medium tracking-wide transition-transform hover:-translate-y-0.5"
          style={{
            background: 'var(--lp-terracotta)',
            color: 'var(--lp-cream-soft)',
            boxShadow: '0 6px 0 -3px var(--lp-terracotta-deep)',
          }}
        >
          無料でカードを作る →
        </Link>
      </div>
    </div>
  )
}
