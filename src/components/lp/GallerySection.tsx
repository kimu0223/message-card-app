'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import { CARD_TEMPLATES, CARD_SCENES, type CardScene } from './CardTemplates'

type SceneId = CardScene['id']

const kickerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-lp-sans)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.4em',
  textTransform: 'uppercase',
  color: 'var(--lp-terracotta)',
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-lp-serif)',
  fontWeight: 600,
  color: 'var(--lp-ink)',
  fontSize: 'clamp(28px, 4vw, 46px)',
  lineHeight: 1.25,
  letterSpacing: '0.02em',
  margin: '16px 0 14px',
}

export default function GallerySection() {
  useReveal()
  const [activeScene, setActiveScene] = useState<SceneId>('all')

  const filteredCards =
    activeScene === 'all'
      ? CARD_TEMPLATES
      : CARD_TEMPLATES.filter((c) => c.scene === activeScene)

  return (
    <section className="lp-section" id="gallery" style={{ background: 'transparent', padding: 'clamp(80px, 11vw, 150px) 0' }}>
      <div className="lp-container">
        <div className="lp-reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span style={kickerStyle}>Templates &middot; 全120種類</span>
          <h2 style={h2Style}>どんな想いも、ぴったりの一枚に。</h2>
          <p style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 16, lineHeight: 1.8, color: 'var(--lp-ink-soft)', margin: 0 }}>
            プロのデザイナーが手がけた、シーン別の高品質テンプレート。<br/>
            選ぶだけで、すぐにあなたらしい一通が完成します。
          </p>
        </div>

        {/* Filter pills */}
        <div
          className="lp-reveal"
          data-delay="2"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, margin: 'clamp(32px,4vw,48px) 0 clamp(36px,5vw,52px)' }}
        >
          {CARD_SCENES.map(s => {
            const active = activeScene === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActiveScene(s.id)}
                aria-pressed={active}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 18px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-lp-sans)',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all .25s ease',
                  background: active ? 'var(--lp-ink)' : 'rgba(255,255,255,0.4)',
                  color: active ? 'var(--lp-cream-soft)' : 'var(--lp-ink-soft)',
                  border: active ? '1px solid var(--lp-ink)' : '1px solid var(--lp-paper-line)',
                }}
              >
                <span style={{ fontSize: 16 }}>{s.glyph}</span>
                {s.label}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 28 }}>
          {filteredCards.map((c, i) => {
            const Comp = c.Comp
            return (
              <div key={c.id} className="lp-reveal" data-delay={(i % 4) + 1}>
                <Link href={`/create?templateId=${c.id}`} className="lp-card block" style={{ textDecoration: 'none' }}>
                  <div className="lp-card-inner" style={{ padding: 0 }}>
                    <Comp />
                  </div>
                </Link>
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 600, fontSize: 16, color: 'var(--lp-ink)', margin: 0 }}>
                      {c.title}
                    </p>
                    <span style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 11, fontWeight: 600, color: 'var(--lp-ink-mute)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2, display: 'inline-block' }}>
                      {CARD_SCENES.find(s => s.id === c.scene)?.label ?? ''}
                    </span>
                  </div>
                  <Link
                    href={`/create?templateId=${c.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 14px',
                      fontFamily: 'var(--font-lp-sans)',
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 999,
                      textDecoration: 'none',
                      color: 'var(--lp-ink)',
                      border: '1px solid var(--lp-paper-line)',
                      background: 'transparent',
                    }}
                  >
                    使う &rarr;
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="lp-reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <Link
            href="/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              borderRadius: 999,
              fontFamily: 'var(--font-lp-sans)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              color: 'var(--lp-ink)',
              border: '1px solid var(--lp-paper-line)',
              background: 'transparent',
            }}
          >
            すべてのテンプレートを見る（120種類）
          </Link>
        </div>
      </div>
    </section>
  )
}
