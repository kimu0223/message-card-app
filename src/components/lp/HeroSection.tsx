'use client'

import Link from 'next/link'
import HeroEnvelope from './HeroEnvelope'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10 pb-12 lg:py-[70px] lg:pb-[80px]" style={{ position: 'relative', zIndex: 2 }}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-[60px]">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-[10px] rounded-full border px-[14px] py-[7px] pl-[8px] text-[13px]"
            style={{
              background: 'var(--lp-paper)',
              borderColor: 'var(--lp-paper-line)',
              color: 'var(--lp-ink-soft)',
              boxShadow: 'var(--lp-shadow-soft)',
            }}
          >
            <span
              className="grid h-[18px] w-[18px] place-items-center rounded-full text-[11px]"
              style={{ background: 'var(--lp-terracotta)', color: 'var(--lp-cream-soft)' }}
            >
              ✦
            </span>
            AI搭載・登録不要で今すぐ体験
          </span>

          {/* Title */}
          <h1
            className="mt-[22px] mb-[26px]"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              fontWeight: 500,
              fontSize: 'clamp(40px, 5.6vw, 78px)',
              lineHeight: 1.18,
              letterSpacing: '0.005em',
              color: 'var(--lp-ink)',
              textWrap: 'balance',
            }}
          >
            <span style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', color: 'var(--lp-terracotta)', display: 'inline-block' }}>
              Open
            </span>{' '}
            the moment.<br />
            <span className="relative inline-block">
              心がふるえる
              <span
                className="pointer-events-none absolute"
                style={{
                  left: -4, right: -4, bottom: -2,
                  height: 14,
                  background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 20' preserveAspectRatio='none'><path d='M2 14 Q 50 4 100 11 T 198 8' fill='none' stroke='%23C97B5C' stroke-width='3' stroke-linecap='round' opacity='0.85'/></svg>") no-repeat`,
                  backgroundSize: '100% 100%',
                  zIndex: -1,
                }}
              />
            </span>
            、<br />
            一通の手紙を。
          </h1>

          {/* Lede */}
          <p
            className="mx-auto mb-8 max-w-[540px] lg:mx-0"
            style={{ fontSize: 17, lineHeight: 1.95, color: 'var(--lp-ink-soft)' }}
          >
            誕生日・記念日・お礼。すべての特別な日に、<br />
            アニメーション付きのメッセージカードをAIとテンプレートで。<br />
            URLひとつで、相手の手元に届きます。
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-[14px] lg:justify-start">
            <Link
              href="/create"
              className="lp-cta-shimmer inline-flex items-center gap-[10px] rounded-full px-[22px] py-[14px] text-[15px] font-medium tracking-wide text-[var(--lp-cream-soft)] transition-transform hover:-translate-y-0.5"
              style={{
                background: 'var(--lp-ink)',
                boxShadow: '0 6px 0 -3px var(--lp-ink), 0 12px 24px -10px rgba(43,37,32,0.5)',
              }}
            >
              無料でカードを作る →
            </Link>
            <a
              href="#gallery"
              className="inline-flex items-center gap-[10px] rounded-full border px-[22px] py-[14px] text-[15px] font-medium tracking-wide transition-colors"
              style={{ borderColor: 'rgba(43,37,32,0.18)', color: 'var(--lp-ink)' }}
            >
              テンプレートを見る
            </a>
          </div>

          {/* Meta */}
          <div className="mt-[22px] flex items-center justify-center gap-2 text-[13px] lg:justify-start" style={{ color: 'var(--lp-ink-mute)' }}>
            <span className="h-[6px] w-[6px] rounded-full" style={{ background: 'var(--lp-sage)' }} />
            クレジットカード不要 · 3分で完成 · 登録なしOK
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-9 lg:justify-start">
            {[
              { num: '120+', label: 'templates' },
              { num: '38万通', label: 'cards sent' },
              { num: '4.8★', label: 'user rating' },
            ].map(s => (
              <div key={s.label} className="flex flex-col gap-[2px]">
                <span style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 32, color: 'var(--lp-ink)' }}>
                  {s.num}
                </span>
                <span className="text-[12px] uppercase tracking-widest" style={{ color: 'var(--lp-ink-mute)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: envelope animation */}
        <div className="relative mx-auto max-w-[400px] py-5 pb-[60px] lg:max-w-none">
          <HeroEnvelope />

          {/* Floating paper bits */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="lp-paper-bit" style={{ top: '10%', left: '0%', '--c': 'var(--lp-terracotta)', '--w': '10px', '--h': '14px', '--r': '20deg', '--dur': '6s' } as React.CSSProperties} />
            <div className="lp-paper-bit" style={{ top: '85%', left: '8%', '--c': 'var(--lp-sage)', '--w': '14px', '--h': '18px', '--r': '-12deg', '--dur': '8s', '--delay': '1.2s' } as React.CSSProperties} />
            <div className="lp-paper-bit" style={{ top: '30%', right: '-2%', '--c': 'var(--lp-gold)', '--w': '12px', '--h': '16px', '--r': '30deg', '--dur': '7s', '--delay': '0.4s' } as React.CSSProperties} />
            <div className="lp-paper-bit" style={{ top: '75%', right: '5%', '--c': 'var(--lp-terracotta)', '--w': '8px', '--h': '10px', '--r': '-18deg', '--dur': '9s', '--delay': '2s' } as React.CSSProperties} />
          </div>
        </div>
      </div>
    </section>
  )
}
