'use client'

import { useReveal } from '@/hooks/useReveal'

const steps = [
  { no: '01', title: 'テンプレートを選ぶ', body: '誕生日・お礼・お祝いなど、シーン別の高品質テンプレートから、心に響く一枚を。' },
  { no: '02', title: 'メッセージを編集', body: 'テキスト・フォント・色・サイズを自由にカスタマイズ。あなたらしさを込めて。' },
  { no: '03', title: '言葉を添える（困ったらAIに相談）', body: '自分の言葉で書いても、AIに提案してもらっても。相手に届く言葉を添えましょう。' },
  { no: '04', title: 'URLで届ける', body: 'URLをコピーしてLINEやSNSへ。アニメーションが、相手の心に届きます。' },
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

export default function HowItWorksSection() {
  useReveal()

  return (
    <section className="lp-section" id="how" style={{ background: 'transparent', padding: 'clamp(80px, 11vw, 150px) 0' }}>
      <div className="lp-container">
        <div className="lp-reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span style={kickerStyle}>How it works</span>
          <h2 style={h2Style}>
            たった4ステップで、<br />感動が手紙になる。
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 22,
            marginTop: 'clamp(48px, 6vw, 72px)',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.no}
              className="lp-reveal"
              data-delay={i + 1}
              style={{
                background: 'rgba(255,255,255,0.74)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: 18,
                boxShadow: '0 22px 50px -28px rgba(26,39,68,0.4)',
                padding: '32px 28px 30px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 600, fontSize: 40, lineHeight: 1, color: 'var(--lp-terracotta)' }}>
                  {s.no}
                </span>
                <span style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--lp-ink-mute)' }}>
                  Step
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 600, fontSize: 20, color: 'var(--lp-ink)', margin: '0 0 10px' }}>
                {s.title}
              </h3>
              <p style={{ margin: 0, fontFamily: 'var(--font-lp-sans)', fontSize: 14, lineHeight: 1.85, color: 'var(--lp-ink-soft)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
