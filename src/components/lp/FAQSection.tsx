'use client'

import { useReveal } from '@/hooks/useReveal'

const items = [
  { q: '登録なしで使えますか？', a: 'はい、メールアドレスや会員登録は不要で、すぐに無料プランを試せます。気に入った機能があれば、必要に応じて有料プランへアップグレードできます。' },
  { q: '作ったカードはどのように送りますか？', a: '完成すると、専用のURLが発行されます。LINEやメール、SNSなどお好きな方法でURLを送るだけで、相手はインストール不要・登録不要で開封できます。' },
  { q: 'AIメッセージ生成はどのように動作しますか？', a: '相手との関係性（家族・恋人・友人・同僚など）、シーン、伝えたい気持ち、希望のトーンを入力するだけで、AIが3つの文案を即座にご提案します。そのまま使うことも、編集することも可能です。' },
  { q: '無料プランで作れるカードは何枚ですか？', a: '無料プランでは月5枚まで作成できます。それ以上必要な場合は、Standardプラン（月20枚）またはProプラン（無制限）をご利用ください。' },
  { q: 'カードのデザインはどの程度カスタマイズできますか？', a: 'テキスト・フォント・色・サイズ・背景・アニメーションなど、細部まで自由にカスタマイズ可能です。Proプランでは、AIによるオリジナル画像生成・デザイン提案もご利用いただけます。' },
  { q: '支払い方法は何が使えますか？', a: 'クレジットカード（Visa, Mastercard, JCB, AMEX）に対応しています。決済はStripeを通じて行われ、安全に処理されます。' },
  { q: 'いつでもキャンセルできますか？', a: 'はい、有料プランはいつでも解約可能です。日割り計算は行いませんが、解約後も次回更新日まで全機能をご利用いただけます。' },
]

export default function FAQSection() {
  useReveal()

  return (
    <section className="relative py-[110px]" id="faq" style={{ position: 'relative', zIndex: 2 }}>
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="lp-reveal">
          <span
            className="inline-flex items-center gap-[10px]"
            style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 14, letterSpacing: '0.04em', color: 'var(--lp-terracotta)' }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--lp-terracotta)', opacity: 0.6, display: 'inline-block' }} />
            FAQ
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
            よくあるご質問
          </h2>
        </div>

        <div className="mt-11 flex max-w-[820px] flex-col gap-3">
          {items.map((it, i) => (
            <details
              key={i}
              className="lp-reveal group overflow-hidden rounded-[14px] border transition-shadow open:shadow-[var(--lp-shadow-soft)]"
              data-delay={(i % 3) + 1}
              style={{ background: 'var(--lp-paper)', borderColor: 'var(--lp-paper-line)' }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 px-[26px] py-[22px] [&::-webkit-details-marker]:hidden"
                style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 500, fontSize: 17, color: 'var(--lp-ink)' }}
              >
                {it.q}
                <span
                  className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full transition-transform duration-300 group-open:rotate-45"
                  style={{ background: 'var(--lp-cream-deep)', color: 'var(--lp-terracotta)', fontFamily: 'var(--font-lp-display)', fontSize: 18 }}
                >
                  +
                </span>
              </summary>
              <div className="px-[26px] pb-6 text-[15px] leading-[1.85]" style={{ color: 'var(--lp-ink-soft)' }}>
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
