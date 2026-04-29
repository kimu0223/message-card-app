'use client'

import { useState, useEffect } from 'react'

const CONFETTI_COLORS = ['#C97B5C', '#8FA68A', '#B89263', '#E8A989', '#6E8669']
const INITIAL_DELAY = 900
const LOOP_INTERVAL = 4500

export default function HeroEnvelope() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), INITIAL_DELAY)
    const loop = setInterval(() => {
      setOpen(o => !o)
    }, LOOP_INTERVAL)
    return () => { clearTimeout(t1); clearInterval(loop) }
  }, [])

  return (
    <div
      className="envelope-stage"
      onMouseEnter={() => setOpen(true)}
      onClick={() => setOpen(o => !o)}
    >
      {/* Floating glints */}
      <div className="lp-glint" style={{ top: '12%', left: '18%', animationDelay: '0s' }} />
      <div className="lp-glint" style={{ top: '26%', right: '14%', animationDelay: '1.2s' }} />
      <div className="lp-glint" style={{ bottom: '20%', left: '10%', animationDelay: '2.4s' }} />

      {/* The card that pops out */}
      <div className={`floating-card ${open ? 'is-out' : ''}`}>
        <div className="floating-card-inner">
          <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--lp-terracotta)' }}>
            YOU&apos;VE GOT MAIL
          </div>
          <div style={{ marginTop: 6, fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 30, color: 'var(--lp-terracotta)', lineHeight: 1 }}>
            For You,
          </div>
          <div style={{ marginTop: 8, fontFamily: 'var(--font-lp-serif)', fontSize: 22, fontWeight: 500, color: 'var(--lp-ink)', lineHeight: 1.3 }}>
            お誕生日<br />おめでとう
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '14px 0 12px' }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(43,37,32,0.2)' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--lp-terracotta)' }} />
            <span style={{ flex: 1, height: 1, background: 'rgba(43,37,32,0.2)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 12, lineHeight: 1.85, color: 'var(--lp-ink-soft)' }}>
            素敵な一年になりますように。<br />
            たくさんの幸せが訪れますように。
          </div>
          <div style={{ marginTop: 'auto', fontFamily: 'var(--font-lp-hand)', fontSize: 18, color: 'var(--lp-terracotta)', transform: 'rotate(-2deg)', alignSelf: 'flex-end' }}>
            — from CardMagic
          </div>
          {/* Confetti */}
          <div className="fc-confetti" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{
                '--cx': `${(i * 37) % 100}%`,
                '--cy': `${(i * 53) % 100}%`,
                '--cc': CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                '--cd': `${0.4 + (i * 0.07)}s`,
              } as React.CSSProperties} />
            ))}
          </div>
        </div>
      </div>

      {/* Envelope back */}
      <div className={`env-back ${open ? 'open' : ''}`}>
        <div className="env-stamp">
          <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 12, color: 'var(--lp-terracotta-deep)' }}>CM</div>
        </div>
        <div className="env-address">
          <div className="env-addr-line" />
          <div className="env-addr-line short" />
          <div className="env-addr-line" />
        </div>
        <div className="env-postmark">
          <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
            <div style={{ fontSize: 8, letterSpacing: '0.15em', fontFamily: 'var(--font-lp-mono)' }}>CARDMAGIC</div>
            <div style={{ fontSize: 7, marginTop: 2, fontFamily: 'var(--font-lp-mono)' }}>{new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, ' · ')}</div>
          </div>
        </div>
      </div>

      {/* Envelope flap */}
      <div className={`env-flap ${open ? 'open' : ''}`} />

      {/* Wax seal */}
      <div className={`env-wax ${open ? 'open' : ''}`}>
        <div className="env-wax-inner">M</div>
      </div>

      {/* Hint */}
      <div className="env-hint">
        <span className="env-hint-dot" />
        ホバーやタップで開く
      </div>
    </div>
  )
}
