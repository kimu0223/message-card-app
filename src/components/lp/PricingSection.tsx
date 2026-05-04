'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

const plans = [
  {
    name: 'Free',
    price: '¥0',
    desc: '登録不要で、今すぐ使い始められます。',
    featured: false,
    feats: ['無料テンプレート 5種', '月5枚まで作成', 'AIメッセージ 月10回', 'PNG / PDF 書き出し', '色紙・A4など全サイズ対応'],
    cta: '無料で試す',
  },
  {
    name: 'Standard',
    price: '¥490',
    desc: '月20枚・AIも充実のスタンダード。',
    featured: true,
    feats: ['全テンプレート使い放題', '月20枚まで作成', 'AIメッセージ 月50回', '全アニメーション効果', 'PNG / PDF 書き出し', '色紙・A4など全サイズ対応'],
    cta: 'Standardを始める',
  },
  {
    name: 'Pro',
    price: '¥980',
    desc: '枚数・AI・画像生成すべて無制限に。',
    featured: false,
    feats: ['全テンプレート使い放題', '作成枚数 無制限', 'AIメッセージ 無制限', '全アニメーション効果', 'AI画像生成・デザイン提案', '優先サポート'],
    cta: 'Proを始める',
  },
]

export default function PricingSection() {
  useReveal()

  return (
    <section className="lp-section" id="pricing">
      <div className="lp-container">
        <div className="lp-reveal">
          <span className="lp-eyebrow-v2">Pricing</span>
          <h2 className="lp-section-title">シンプルな、3つのプラン。</h2>
          <p className="lp-section-lede">まずは無料で。気に入ったらアップグレード。いつでもキャンセル可能です。</p>
        </div>

        <div className="lp-pricing">
          {plans.map((p, i) => (
            <div key={p.name} className={`lp-plan lp-reveal ${p.featured ? 'featured' : ''}`} data-delay={i + 1}>
              {p.featured && <div className="lp-plan-ribbon">人気No.1</div>}

              <h3 style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 26, margin: '0 0 6px' }}>
                {p.name}
              </h3>
              <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 40, fontWeight: 500, margin: '12px 0' }}>
                {p.price}
                <span style={{ fontSize: 14, fontWeight: 400, marginLeft: 4, color: p.featured ? 'rgba(255,252,245,0.7)' : 'var(--lp-ink-mute)' }}>/月</span>
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
                href={p.name === 'Free' ? '/create' : '/login'}
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
