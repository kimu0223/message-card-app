'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import { CARD_TEMPLATES, CARD_SCENES, type CardScene } from './CardTemplates'

type SceneId = CardScene['id']


export default function GallerySection() {
  useReveal()
  const [activeScene, setActiveScene] = useState<SceneId>('all')

  const filteredCards =
    activeScene === 'all'
      ? CARD_TEMPLATES
      : CARD_TEMPLATES.filter((c) => c.scene === activeScene)

  return (
    <section className="lp-section" id="gallery">
      <div className="lp-container">
        <div className="lp-reveal">
          <span className="lp-eyebrow-v2">Templates &middot; 全120種類</span>
          <h2 className="lp-section-title">どんな想いも、ぴったりの一枚に。</h2>
          <p className="lp-section-lede">
            プロのデザイナーが手がけた、シーン別の高品質テンプレート。<br/>
            選ぶだけで、すぐにあなたらしい一通が完成します。
          </p>
        </div>

        <div className="lp-gallery-tabs lp-reveal" data-delay="2">
          {CARD_SCENES.map(s => (
            <button
              key={s.id}
              className="lp-gallery-tab"
              data-active={activeScene === s.id}
              onClick={() => setActiveScene(s.id)}
            >
              <span className="glyph">{s.glyph}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div className="lp-gallery-grid">
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
                    <p style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--lp-ink)', margin: 0 }}>
                      {c.title}
                    </p>
                    <span style={{ fontFamily: 'var(--font-lp-mono)', fontSize: 11, color: 'var(--lp-ink-mute)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2, display: 'inline-block' }}>
                      {CARD_SCENES.find(s => s.id === c.scene)?.label ?? ''}
                    </span>
                  </div>
                  <Link href={`/create?templateId=${c.id}`} className="lp-btn lp-btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }}>
                    使う &rarr;
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="lp-reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/create" className="lp-btn lp-btn-ghost">
            すべてのテンプレートを見る（120種類）
          </Link>
        </div>
      </div>
    </section>
  )
}
