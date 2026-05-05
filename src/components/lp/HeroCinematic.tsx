'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

function CardContent() {
  return (
    <div className="env-card-inner">
      <svg viewBox="0 0 100 100" className="env-card-bloom" preserveAspectRatio="xMaxYMin meet">
        <g transform="translate(76, 14)">
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i * 36) * Math.PI / 180
            const x = Math.cos(a) * 10, y = Math.sin(a) * 10
            return <ellipse key={i} cx={x} cy={y} rx="6.5" ry="9.5" fill="#E89A82" opacity="0.85" transform={`rotate(${i * 36} ${x} ${y})`} />
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * 60 + 30) * Math.PI / 180
            const x = Math.cos(a) * 5, y = Math.sin(a) * 5
            return <ellipse key={`m${i}`} cx={x} cy={y} rx="4.5" ry="6.5" fill="#C97B5C" opacity="0.95" transform={`rotate(${i * 60 + 30} ${x} ${y})`} />
          })}
          <circle cx="0" cy="0" r="3.2" fill="#A85F44" />
        </g>
        <path d="M 60 26 Q 66 36 70 46" fill="none" stroke="#8FA68A" strokeWidth="0.7" />
        <ellipse cx="62" cy="32" rx="4" ry="1.6" fill="#8FA68A" transform="rotate(-30 62 32)" />
        <ellipse cx="68" cy="40" rx="4" ry="1.6" fill="#8FA68A" transform="rotate(30 68 40)" />
      </svg>
      <div className="env-card-tag">YOU&apos;VE GOT MAIL &middot; N&deg; 001</div>
      <div className="env-card-en">For You,</div>
      <div className="env-card-jp">心からの<br/>一通を。</div>
      <div className="env-card-divider"><span/><b/><span/></div>
      <div className="env-card-body">
        大切なあの人へ。<br/>
        言葉では伝えきれない想いを、<br/>
        このカードに込めて。
      </div>
      <div className="env-card-sign">&mdash; with love</div>
    </div>
  )
}

export default function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)))
      setProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const seg = useCallback((a: number, b: number) =>
    Math.max(0, Math.min(1, (progress - a) / (b - a))),
  [progress])

  const flap = seg(0.08, 0.30)
  const wax = seg(0.08, 0.26)
  const card = seg(0.22, 0.55)
  const envFade = seg(0.45, 0.65)
  const cardLand = seg(0.50, 0.68)

  const titleEN  = seg(0.62, 0.74)
  const titleJP1 = seg(0.70, 0.82)
  const titleJP2 = seg(0.78, 0.90)
  const lede     = seg(0.84, 0.94)
  const cta      = seg(0.90, 1.00)

  return (
    <section
      ref={sectionRef}
      className="hero-cinematic"
      style={{ height: '320vh' }}
    >
      <div className="hero-pin">
        <div className="hero-backdrop" />
        <div className="hero-vignette" />

        <div className="hero-glints">
          {([
            [12, 18, 0], [86, 22, 1.2], [8, 78, 2.4],
            [92, 70, 0.6], [22, 88, 1.8], [78, 12, 3.0],
          ] as const).map(([x, y, d], i) => (
            <span key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />
          ))}
        </div>

        {/* Envelope stage */}
        <div
          className="env-stage"
          style={{
            opacity: mounted ? 1 - envFade : 0,
            transform: `
              scale(${(mounted ? 1 : 0.88) * (1 - cardLand * 0.10)})
              translateY(${cardLand * -4}vh)
            `,
            transition: mounted ? 'none' : 'opacity .9s ease, transform 1.1s cubic-bezier(.2,.8,.2,1)',
            pointerEvents: progress > 0.6 ? 'none' : 'auto',
          }}
        >
          <div className="env-shadow-hero" style={{ opacity: 0.7 - envFade * 0.7 }} />

          <div className="env-pocket">
            <div className="env-grain" />
            <div className="env-addr-hero">
              <div className="env-addr-line-hero" style={{ width: '62%' }} />
              <div className="env-addr-line-hero" style={{ width: '78%' }} />
              <div className="env-addr-line-hero" style={{ width: '44%' }} />
            </div>
            <div className="env-postmark-hero">
              <div>
                <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: '0.85em', letterSpacing: '0.18em' }}>CARDMAGIC</div>
                <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: '0.72em', marginTop: 3, opacity: 0.85 }}>2026 &middot; 05 &middot; 05</div>
                <div style={{ marginTop: 3, fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: '0.95em' }}>&#9829; par avion</div>
              </div>
            </div>
            <div className="env-stamp-hero">
              <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: '1.6em', color: 'var(--lp-terracotta-deep)', lineHeight: 0.9 }}>CM</div>
              <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: '0.5em', letterSpacing: '0.18em', marginTop: 3, color: 'var(--lp-terracotta-deep)' }}>1ST CLASS</div>
              <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: '0.5em', letterSpacing: '0.1em', marginTop: 1, color: 'var(--lp-terracotta)' }}>&yen;84</div>
            </div>
            <div className="env-v" />
          </div>

          {/* Card emerging */}
          <div
            className="env-card-hero env-card--inside"
            style={{
              transform: `translateY(${-card * 78}%) rotate(${-card * 1.5}deg) scale(${1 + card * 0.04})`,
              opacity: 0.18 + card * 0.82,
              boxShadow: card > 0.1
                ? `0 ${20 + card * 30}px ${40 + card * 30}px -${15 - card * 5}px rgba(43,37,32,${0.25 + card * 0.2})`
                : '0 0 0 transparent',
            }}
          >
            <CardContent />
          </div>

          {/* Flap */}
          <div className="env-flap-hero" style={{ transform: `rotateX(${flap * 178}deg) translateZ(0.1px)` }}>
            <div className="env-flap-inside" style={{ opacity: flap > 0.3 ? 1 : 0 }} />
          </div>

          {/* Wax seal */}
          <div
            className="env-wax-hero"
            style={{
              transform: `translate(-50%, calc(-50% + ${wax * -32}vh)) rotate(${-8 + wax * 320}deg) scale(${1 - wax * 0.5})`,
              opacity: 1 - wax * wax,
            }}
          >
            <div className="env-wax-disc">M</div>
          </div>

          <div className="hero-scroll-cue" style={{ opacity: 1 - Math.min(1, progress * 6) }}>
            <span className="hero-scroll-label">Scroll to open</span>
            <span className="hero-scroll-arrow">&darr;</span>
          </div>
        </div>

        {/* Reveal layer */}
        <div
          className="hero-reveal"
          style={{
            opacity: cardLand,
            pointerEvents: progress > 0.5 ? 'auto' : 'none',
          }}
        >
          <div
            className="hero-final-card"
            style={{
              opacity: cardLand,
              transform: `translateY(${(1 - cardLand) * 40}px) scale(${0.94 + cardLand * 0.06})`,
            }}
          >
            <div className="env-card-hero env-card--final">
              <CardContent />
            </div>
          </div>

          <div className="hero-copy">
            <h1 className="hero-h1">
              <span className="hero-h1-en"
                    style={{ opacity: titleEN, transform: `translateY(${(1 - titleEN) * 26}px)` }}>
                Open the moment.
              </span>
              <span className="hero-h1-jp1"
                    style={{ opacity: titleJP1, transform: `translateY(${(1 - titleJP1) * 30}px)` }}>
                心がふるえる、
              </span>
              <span className="hero-h1-jp2"
                    style={{ opacity: titleJP2, transform: `translateY(${(1 - titleJP2) * 30}px)` }}>
                一通の手紙を。
              </span>
            </h1>

            <p className="hero-p"
               style={{ opacity: lede, transform: `translateY(${(1 - lede) * 18}px)` }}>
              テンプレートを選んで、言葉を添えるだけ。<br className="break-md" />
              3分で届く、アニメーション付きメッセージカード。
            </p>

            <div className="hero-cta-row"
                 style={{ opacity: cta, transform: `translateY(${(1 - cta) * 16}px)` }}>
              <Link href="/create" className="lp-btn lp-btn-primary">
                無料でカードを作る &rarr;
              </Link>
              <a href="#gallery" className="lp-btn lp-btn-ghost">
                テンプレートを見る
              </a>
            </div>

            <div className="hero-meta-row" style={{ opacity: cta }}>
              <span>クレジットカード不要</span>
              <span aria-hidden>&middot;</span>
              <span>3分で完成</span>
              <span aria-hidden>&middot;</span>
              <span>登録なしOK</span>
            </div>
          </div>
        </div>

        <div className="hero-progress">
          <div className="hero-progress-bar" style={{ height: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  )
}

export function StatStrip() {
  return (
    <section className="stat-strip">
      <div className="lp-container">
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 32, flexWrap: 'wrap' }}>
          {[
            { num: '120+', label: 'templates' },
            { num: '38万通', label: 'cards sent' },
            { num: '4.8★', label: 'user rating' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
