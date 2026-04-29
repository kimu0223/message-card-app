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
    <section className="relative py-[110px]" id="pricing" style={{ position: 'relative', zIndex: 2 }}>
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="lp-reveal">
          <span
            className="inline-flex items-center gap-[10px]"
            style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 14, letterSpacing: '0.04em', color: 'var(--lp-terracotta)' }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--lp-terracotta)', opacity: 0.6, display: 'inline-block' }} />
            Pricing
          </span>
          <h2
            className="mt-[14px] mb-[18px]"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.25,
              color: 'var(--lp-ink)',
            }}
          >
            シンプルな、3つのプラン。
          </h2>
          <p className="max-w-[620px] text-[17px] leading-[1.85]" style={{ color: 'var(--lp-ink-soft)' }}>
            まずは無料で。気に入ったらアップグレード。いつでもキャンセル可能です。
          </p>
        </div>

        <div className="mt-[60px] grid gap-[22px] md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`lp-reveal relative flex flex-col rounded-[22px] border p-8 ${p.featured ? '-translate-y-3' : ''}`}
              data-delay={i + 1}
              style={{
                background: p.featured ? 'var(--lp-ink)' : 'var(--lp-paper)',
                borderColor: p.featured ? 'var(--lp-ink)' : 'var(--lp-paper-line)',
                boxShadow: p.featured ? '0 30px 60px -28px rgba(43,37,32,0.6)' : 'var(--lp-shadow-soft)',
                color: p.featured ? 'var(--lp-cream-soft)' : 'var(--lp-ink)',
              }}
            >
              {p.featured && (
                <div
                  className="absolute right-[-8px] top-5 rounded-l-md px-[14px] py-[6px]"
                  style={{
                    background: 'var(--lp-terracotta)',
                    color: 'var(--lp-cream-soft)',
                    fontFamily: 'var(--font-lp-display)',
                    fontStyle: 'italic',
                    fontSize: 13,
                    boxShadow: '0 4px 0 -2px var(--lp-terracotta-deep)',
                  }}
                >
                  人気No.1
                </div>
              )}

              <h3 style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 26, margin: '0 0 6px' }}>
                {p.name}
              </h3>
              <div className="my-3" style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 40, fontWeight: 500 }}>
                {p.price}
                <span className="ml-1 text-sm font-normal" style={{ color: p.featured ? 'rgba(255,252,245,0.7)' : 'var(--lp-ink-mute)' }}>/月</span>
              </div>
              <div className="mb-6 min-h-9 text-[13px] leading-[1.7]" style={{ color: p.featured ? 'rgba(255,252,245,0.7)' : 'var(--lp-ink-mute)' }}>
                {p.desc}
              </div>

              <ul className="mb-7 flex flex-1 flex-col gap-[10px] p-0" style={{ listStyle: 'none' }}>
                {p.feats.map(f => (
                  <li key={f} className="flex gap-[10px] text-sm leading-[1.5]" style={{ color: p.featured ? 'rgba(255,252,245,0.85)' : 'var(--lp-ink-soft)' }}>
                    <span
                      className="mt-0.5 grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full text-[11px]"
                      style={{
                        background: p.featured ? 'transparent' : 'var(--lp-cream-deep)',
                        color: 'var(--lp-terracotta)',
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={p.name === 'Free' ? '/create' : '/login'}
                className="inline-flex items-center justify-center rounded-full border px-[22px] py-[14px] text-[15px] font-medium tracking-wide transition-transform hover:-translate-y-0.5"
                style={p.featured
                  ? {
                    background: 'var(--lp-terracotta)',
                    color: 'var(--lp-cream-soft)',
                    borderColor: 'transparent',
                    boxShadow: '0 6px 0 -3px var(--lp-terracotta-deep), 0 12px 24px -10px rgba(168,95,68,0.45)',
                  }
                  : {
                    background: 'transparent',
                    color: 'var(--lp-ink)',
                    borderColor: 'rgba(43,37,32,0.18)',
                  }
                }
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
