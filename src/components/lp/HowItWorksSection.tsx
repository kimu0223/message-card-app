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
    <section className="relative py-[110px]" id="how" style={{ position: 'relative', zIndex: 2 }}>
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="lp-reveal">
          <span
            className="inline-flex items-center gap-[10px]"
            style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 14, letterSpacing: '0.04em', color: 'var(--lp-terracotta)' }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--lp-terracotta)', opacity: 0.6, display: 'inline-block' }} />
            How it works
          </span>
          <h2
            className="mt-[14px] mb-[18px]"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.25,
              letterSpacing: '0.01em',
              color: 'var(--lp-ink)',
              textWrap: 'balance',
            }}
          >
            たった4ステップで、<br />感動が手紙になる。
          </h2>
        </div>

        <div className="hiw-grid mt-[60px] grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.no}
              className="hiw-step lp-reveal relative rounded-[22px] border p-7 transition-transform duration-[400ms] hover:-translate-y-1"
              data-delay={i + 1}
              style={{
                background: 'var(--lp-paper)',
                borderColor: 'var(--lp-paper-line)',
                boxShadow: 'var(--lp-shadow-soft)',
              }}
            >
              <div className="mb-4 inline-flex items-center gap-[10px]" style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', color: 'var(--lp-terracotta)', fontSize: 14 }}>
                <div
                  className="grid h-7 w-7 place-items-center rounded-full text-sm"
                  style={{ background: 'var(--lp-terracotta)', color: 'var(--lp-cream-soft)', fontFamily: 'var(--font-lp-display)', fontStyle: 'normal' }}
                >
                  {i + 1}
                </div>
                STEP {s.no}
              </div>
              <h3 className="mb-[10px]" style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 500, fontSize: 22, color: 'var(--lp-ink)' }}>
                {s.title}
              </h3>
              <p className="m-0 text-sm leading-[1.85]" style={{ color: 'var(--lp-ink-soft)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
