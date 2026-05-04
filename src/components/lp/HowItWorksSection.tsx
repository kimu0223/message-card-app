'use client'

import { useReveal } from '@/hooks/useReveal'

const steps = [
  { no: '01', title: 'テンプレートを選ぶ', body: '誕生日・お礼・お祝いなど、シーン別の高品質テンプレートから、心に響く一枚を。' },
  { no: '02', title: 'メッセージを編集', body: 'テキスト・フォント・色・サイズを自由にカスタマイズ。あなたらしさを込めて。' },
  { no: '03', title: 'AIにメッセージを提案させる', body: '相手とシーンを伝えると、AIが心を動かすメッセージを3案ご提案します。' },
  { no: '04', title: 'URLで届ける', body: 'URLをコピーしてLINEやSNSへ。アニメーションが、相手の心に届きます。' },
]

export default function HowItWorksSection() {
  useReveal()

  return (
    <section className="lp-section" id="how">
      <div className="lp-container">
        <div className="lp-reveal">
          <span className="lp-eyebrow-v2">How it works</span>
          <h2 className="lp-section-title">
            たった4ステップで、<br />感動が手紙になる。
          </h2>
        </div>

        <div className="lp-steps">
          {steps.map((s, i) => (
            <div key={s.no} className="lp-step lp-reveal" data-delay={i + 1}>
              <div className="lp-step-no">
                <div className="lp-step-num">{i + 1}</div>
                STEP {s.no}
              </div>
              <h3 style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 500, fontSize: 22, color: 'var(--lp-ink)', margin: '0 0 10px' }}>
                {s.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--lp-ink-soft)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
