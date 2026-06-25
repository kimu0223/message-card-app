'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import CTASection from '@/components/lp/CTASection'

export interface GuideTable {
  caption?: string
  headers: string[]
  rows: string[][]
  /** 強調したい列のインデックス（朱でハイライト） */
  highlightCol?: number
}

export interface GuideCard {
  title: string
  body: string
  tag?: string
}

export interface GuideSection {
  id?: string
  heading: string
  lead?: string
  paragraphs?: string[]
  bullets?: string[]
  table?: GuideTable
  cards?: GuideCard[]
}

export interface GuideFaq {
  q: string
  a: string
}

export interface GuideArticleProps {
  eyebrow: string
  title: string
  lede: string
  sections: GuideSection[]
  faq: GuideFaq[]
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-lp-serif)',
  fontWeight: 600,
  color: 'var(--lp-ink)',
  fontSize: 'clamp(24px, 3.4vw, 38px)',
  lineHeight: 1.3,
  letterSpacing: '0.02em',
  margin: 0,
}

/** reveal アニメーションの data-delay を 1→2→3 で循環させる共通ヘルパー */
const stagger = (n: number): 1 | 2 | 3 => (((n % 3) + 1) as 1 | 2 | 3)

export default function GuideArticle({ eyebrow, title, lede, sections, faq }: GuideArticleProps) {
  useReveal()

  // FAQ構造化データ（Google FAQリッチリザルト用）
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <div className="lp-page" style={{ fontFamily: 'var(--font-lp-sans)' }}>
      {/* FAQ構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="lp-section" style={{ padding: 'clamp(72px, 12vw, 130px) 0 clamp(32px, 5vw, 56px)' }}>
        <div className="lp-container" style={{ maxWidth: 860, textAlign: 'center' }}>
          <div className="lp-eyebrow lp-reveal">
            <span>{eyebrow}</span>
          </div>
          <h1
            className="lp-reveal"
            data-delay="1"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              fontWeight: 700,
              color: 'var(--lp-ink)',
              fontSize: 'clamp(30px, 5.2vw, 56px)',
              lineHeight: 1.25,
              letterSpacing: '0.02em',
              margin: '12px 0 0',
            }}
          >
            {title}
          </h1>
          <p
            className="lp-reveal"
            data-delay="2"
            style={{
              margin: '24px auto 0',
              maxWidth: 640,
              color: 'var(--lp-ink-soft)',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.9,
            }}
          >
            {lede}
          </p>
          <div className="lp-reveal" data-delay="3" style={{ marginTop: 36 }}>
            <Link
              href="/create"
              className="inline-flex items-center rounded-full px-7 py-4 text-base font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                background: 'var(--lp-ink)',
                color: 'var(--lp-cream-soft)',
                boxShadow: '0 14px 28px -12px rgba(26,39,68,0.5)',
              }}
            >
              無料でカードを作ってみる →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {sections.map((sec, i) => (
          <section
            key={i}
            id={sec.id}
            className="lp-section"
            style={{ padding: 'clamp(48px, 7vw, 88px) 0' }}
          >
            <div className="lp-container" style={{ maxWidth: 880 }}>
              <h2 className="lp-reveal" style={h2Style}>{sec.heading}</h2>

              {sec.lead && (
                <p
                  className="lp-reveal"
                  data-delay="1"
                  style={{ margin: '18px 0 0', color: 'var(--lp-ink-soft)', fontSize: 17, lineHeight: 1.9 }}
                >
                  {sec.lead}
                </p>
              )}

              {sec.paragraphs?.map((p, pi) => (
                <p
                  key={pi}
                  className="lp-reveal"
                  data-delay={stagger(pi + 1)}
                  style={{ margin: '16px 0 0', color: 'var(--lp-ink-soft)', fontSize: 16, lineHeight: 1.95 }}
                >
                  {p}
                </p>
              ))}

              {sec.bullets && (
                <ul className="lp-guide-bullets lp-reveal" data-delay="1">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi}>
                      <span aria-hidden>—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.table && (
                <div className="lp-guide-table-wrap lp-reveal" data-delay="1">
                  <table className="lp-guide-table">
                    <thead>
                      <tr>
                        {sec.table.headers.map((h, hi) => (
                          <th key={hi}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, ri) => (
                        <tr key={ri} data-alt={ri % 2 === 0 ? '1' : undefined}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              data-col0={ci === 0 ? '1' : undefined}
                              data-highlight={ci === sec.table!.highlightCol ? '1' : undefined}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sec.cards && (
                <div className="lp-guide-cards">
                  {sec.cards.map((c, ci) => (
                    <div key={ci} className="lp-guide-card lp-reveal" data-delay={stagger(ci)}>
                      {c.tag && <span className="lp-guide-card-tag">{c.tag}</span>}
                      <h3 className="lp-guide-card-title">{c.title}</h3>
                      <p className="lp-guide-card-body">{c.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="lp-section" id="faq" style={{ padding: 'clamp(56px, 8vw, 110px) 0' }}>
          <div className="lp-container" style={{ maxWidth: 820 }}>
            <div className="lp-reveal" style={{ textAlign: 'center' }}>
              <div className="lp-eyebrow"><span>FAQ</span></div>
              <h2 style={{ ...h2Style, marginTop: 8 }}>よくあるご質問</h2>
            </div>
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faq.map((it, i) => (
                <details className="lp-faq-item lp-reveal" key={i} data-delay={stagger(i)}>
                  <summary className="lp-faq-q">
                    {it.q}
                    <span className="lp-faq-plus" aria-hidden>+</span>
                  </summary>
                  <div className="lp-faq-a">{it.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </div>
  )
}
