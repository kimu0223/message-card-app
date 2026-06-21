'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

const plans = [
  {
    name: 'Free',
    price: '¥0',
    unit: '/月',
    desc: '登録不要で、今すぐ使い始められます。',
    featured: false,
    feats: ['基本テンプレート 5種', '月3枚まで作成', 'AIメッセージ 月3回', 'AIデザイン 月1回', 'PNG / PDF 書き出し'],
    cta: '無料で試す',
    href: '/create',
  },
  {
    name: 'クレジットパック',
    price: '¥1,000',
    unit: '/15cr',
    desc: '必要な時だけ追加。有効期限なし。',
    featured: true,
    feats: ['15クレジット（おすすめ）', '5クレジット ¥400〜', 'カード作成 +1クレジット', 'AIメッセージ +1クレジット', 'AIデザイン +2クレジット', 'プレミアムテンプレート +1クレジット'],
    cta: 'クレジットを購入',
    href: '/login?next=/billing',
  },
  {
    name: 'Pro',
    price: '¥980',
    unit: '/月',
    desc: '枚数・AI・テンプレートすべて無制限に。',
    featured: false,
    feats: ['全テンプレート使い放題', '作成枚数 無制限', 'AIメッセージ 無制限', 'AIデザイン 無制限', '全アニメーション効果', '優先サポート'],
    cta: 'Proを始める',
    href: '/login?next=/billing',
  },
]

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

export default function PricingSection() {
  useReveal()

  return (
    <section className="lp-section" id="pricing" style={{ background: 'transparent', padding: 'clamp(80px, 11vw, 150px) 0' }}>
      <div className="lp-container">
        <div className="lp-reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span style={kickerStyle}>Pricing</span>
          <h2 style={h2Style}>シンプルな料金体系。</h2>
          <p style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 16, lineHeight: 1.8, color: 'var(--lp-ink-soft)', margin: 0 }}>
            まずは無料で。足りなくなったらクレジットを追加。ヘビーユーザーにはProがお得。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 22,
            marginTop: 'clamp(48px, 6vw, 72px)',
            alignItems: 'start',
          }}
        >
          {plans.map((p, i) => {
            const featured = p.featured
            return (
              <div
                key={p.name}
                className="lp-reveal"
                data-delay={i + 1}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 18,
                  padding: '34px 30px',
                  background: featured ? 'var(--lp-ink)' : 'rgba(255,255,255,0.74)',
                  color: featured ? 'var(--lp-cream-soft)' : 'var(--lp-ink)',
                  backdropFilter: featured ? undefined : 'blur(8px)',
                  border: featured ? '1px solid var(--lp-ink)' : '1px solid rgba(255,255,255,0.7)',
                  boxShadow: featured
                    ? '0 34px 64px -26px rgba(26,39,68,0.6)'
                    : '0 22px 50px -28px rgba(26,39,68,0.4)',
                  transform: featured ? 'translateY(-10px)' : undefined,
                }}
              >
                {featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: -8,
                      background: 'var(--lp-terracotta)',
                      color: 'var(--lp-cream-soft)',
                      fontFamily: 'var(--font-lp-sans)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      padding: '6px 14px',
                      borderRadius: '6px 0 0 6px',
                      boxShadow: '0 4px 0 -2px var(--lp-terracotta-deep)',
                    }}
                  >
                    おすすめ
                  </div>
                )}

                <h3 style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 600, fontSize: 22, margin: '0 0 6px' }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 40, fontWeight: 600, margin: '12px 0' }}>
                  {p.price}
                  <span style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 14, fontWeight: 400, marginLeft: 4, color: featured ? 'rgba(250,247,239,0.7)' : 'var(--lp-ink-mute)' }}>
                    {p.unit}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 13, lineHeight: 1.7, color: featured ? 'rgba(250,247,239,0.72)' : 'var(--lp-ink-mute)', marginBottom: 24, minHeight: 36 }}>
                  {p.desc}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                  {p.feats.map(f => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        gap: 10,
                        fontFamily: 'var(--font-lp-sans)',
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: featured ? 'rgba(250,247,239,0.88)' : 'var(--lp-ink-soft)',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          flexShrink: 0,
                          color: featured ? 'var(--lp-gold)' : 'var(--lp-terracotta)',
                          fontSize: 13,
                          lineHeight: 1.6,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 22px',
                    borderRadius: 999,
                    fontFamily: 'var(--font-lp-sans)',
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: 'none',
                    transition: 'transform .2s ease, background .2s ease',
                    background: featured ? 'var(--lp-cream-soft)' : 'transparent',
                    color: featured ? 'var(--lp-ink)' : 'var(--lp-ink)',
                    border: featured ? '1px solid var(--lp-cream-soft)' : '1px solid var(--lp-paper-line)',
                  }}
                >
                  {p.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
