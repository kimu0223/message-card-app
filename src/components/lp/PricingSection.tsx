'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

const plans = [
  {
    name: 'Free',
    price: '¥0',
    desc: '登録不要で、今すぐ使い始められます。',
    featured: false,
    feats: ['基本テンプレート 5種', '月3枚まで作成', 'AIメッセージ 月3回', 'AIデザイン 月1回', 'PNG / PDF 書き出し'],
    cta: '無料で試す',
    href: '/create',
  },
  {
    name: 'クレジットパック',
    price: '¥1,000',
    desc: '必要な時だけ追加。有効期限なし。',
    featured: true,
    feats: ['15クレジット（おすすめ）', '5クレジット ¥400〜', 'カード作成 +1クレジット', 'AIメッセージ +1クレジット', 'AIデザイン +2クレジット', 'プレミアムテンプレート +1クレジット'],
    cta: 'クレジットを購入',
    href: '/login',
  },
  {
    name: 'Pro',
    price: '¥980',
    desc: '枚数・AI・テンプレートすべて無制限に。',
    featured: false,
    feats: ['全テンプレート使い放題', '作成枚数 無制限', 'AIメッセージ 無制限', 'AIデザイン 無制限', '全アニメーション効果', '優先サポート'],
    cta: 'Proを始める',
    href: '/login',
  },
]

export default function PricingSection() {
  useReveal()

  return (
    <section className="lp-section" id="pricing">
      <div className="lp-container">
        <div className="lp-reveal">
          <span className="lp-eyebrow-v2">Pricing</span>
          <h2 className="lp-section-title">シンプルな料金体系。</h2>
          <p className="lp-section-lede">まずは無料で。足りなくなったらクレジットを追加。ヘビーユーザーにはProがお得。</p>
        </div>

        <div className="lp-pricing">
          {plans.map((p, i) => (
            <div key={p.name} className={`lp-plan lp-reveal ${p.featured ? 'featured' : ''}`} data-delay={i + 1}>
              {p.featured && <div className="lp-plan-ribbon">おすすめ</div>}

              <h3 style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 26, margin: '0 0 6px' }}>
                {p.name}
              </h3>
              <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 40, fontWeight: 500, margin: '12px 0' }}>
                {p.price}
                <span style={{ fontSize: 14, fontWeight: 400, marginLeft: 4, color: p.featured ? 'rgba(255,252,245,0.7)' : 'var(--lp-ink-mute)' }}>
                  {p.name === 'Pro' ? '/月' : p.name === 'クレジットパック' ? '/15cr' : '/月'}
                </span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: p.featured ? 'rgba(255,252,245,0.7)' : 'var(--lp-ink-mute)', marginBottom: 24, minHeight: 36 }}>
                {p.desc}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 28 }}>
                {p.feats.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.5, color: p.featured ? 'rgba(255,252,245,0.85)' : 'var(--lp-ink-soft)' }}>
                    <span className="lp-plan-check" style={p.featured ? { background: 'transparent' } : undefined}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className={`lp-btn ${p.featured ? 'lp-btn-terracotta' : 'lp-btn-ghost'}`}
                style={{ justifyContent: 'center' }}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
