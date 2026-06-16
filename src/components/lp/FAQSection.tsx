'use client'

import { useReveal } from '@/hooks/useReveal'

const items = [
  { q: '登録なしで使えますか？', a: 'はい、メールアドレスや会員登録は不要で、すぐに無料プランを試せます。気に入った機能があれば、クレジットパックを購入するか、Proプランにアップグレードできます。' },
  { q: '作ったカードはどのように送りますか？', a: '完成すると、専用のURLが発行されます。LINEやメール、SNSなどお好きな方法でURLを送るだけで、相手はインストール不要・登録不要で開封できます。' },
  { q: 'AIメッセージ生成はどのように動作しますか？', a: '相手との関係性（家族・恋人・友人・同僚など）、シーン、伝えたい気持ち、希望のトーンを入力するだけで、AIが3つの文案を即座にご提案します。そのまま使うことも、編集することも可能です。' },
  { q: '無料プランで作れるカードは何枚ですか？', a: '無料プランでは月3枚まで作成できます。それ以上必要な場合は、クレジットパックを購入して追加利用するか、Proプラン（月額980円・無制限）をご利用ください。' },
  { q: 'クレジットとは何ですか？', a: 'Free枠を超えて利用する際に消費するポイントです。カード作成1枚=1クレジット、AIメッセージ1回=1クレジット、AIデザイン1回=2クレジット。有効期限はありません。' },
  { q: '支払い方法は何が使えますか？', a: 'クレジットカード（Visa, Mastercard, JCB, AMEX）に対応しています。決済はStripeを通じて行われ、安全に処理されます。' },
  { q: 'いつでもキャンセルできますか？', a: 'はい、Proプランはいつでも解約可能です。日割り計算は行いませんが、解約後も次回更新日まで全機能をご利用いただけます。クレジットパックは買い切りなので解約不要です。' },
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
  margin: '16px 0 0',
}

export default function FAQSection() {
  useReveal()

  return (
    <section className="lp-section" id="faq" style={{ background: 'transparent', padding: 'clamp(80px, 11vw, 150px) 0' }}>
      <div className="lp-container">
        <div className="lp-reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span style={kickerStyle}>FAQ</span>
          <h2 style={h2Style}>よくあるご質問</h2>
        </div>

        <div style={{ marginTop: 'clamp(40px, 5vw, 56px)', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
          {items.map((it, i) => (
            <details
              className="lp-faq-item lp-reveal"
              key={i}
              data-delay={(i % 3) + 1}
              style={{
                background: 'rgba(255,255,255,0.74)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.65)',
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              <summary
                className="lp-faq-q"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '20px 24px',
                  cursor: 'pointer',
                  listStyle: 'none',
                  fontFamily: 'var(--font-lp-serif)',
                  fontWeight: 600,
                  fontSize: 16.5,
                  color: 'var(--lp-ink)',
                }}
              >
                {it.q}
                <span
                  className="lp-faq-plus"
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    border: '1px solid var(--lp-paper-line)',
                    color: 'var(--lp-terracotta)',
                    fontFamily: 'var(--font-lp-sans)',
                    fontSize: 18,
                    lineHeight: 1,
                    transition: 'transform .3s',
                  }}
                >
                  +
                </span>
              </summary>
              <div
                className="lp-faq-a"
                style={{
                  padding: '0 24px 22px',
                  fontFamily: 'var(--font-lp-sans)',
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: 'var(--lp-ink-soft)',
                }}
              >
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
