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
    <section className="lp-section" id="faq">
      <div className="lp-container">
        <div className="lp-reveal">
          <span className="lp-eyebrow-v2">FAQ</span>
          <h2 className="lp-section-title">よくあるご質問</h2>
        </div>

        <div className="lp-faq-list">
          {items.map((it, i) => (
            <details className="lp-faq-item lp-reveal" key={i} data-delay={(i % 3) + 1}>
              <summary className="lp-faq-q">
                {it.q}
                <span className="lp-faq-plus">+</span>
              </summary>
              <div className="lp-faq-a">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
