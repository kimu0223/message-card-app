'use client'

import { useReveal } from '@/hooks/useReveal'

const features = [
  {
    k: 'templates',
    t: '120種類の高品質テンプレート',
    b: 'プロのデザイナーが手がけた、和洋・モダン・クラシックまで。シーンに寄り添う一枚が必ず見つかります。',
  },
  {
    k: 'ai',
    t: 'AI文章アシスト',
    b: '「何を書けばいい？」の悩みは要りません。相手・関係性・トーンを伝えるだけで、3つの心響く文案を即座に提案。',
  },
  {
    k: 'anim',
    t: '受け取って感動するアニメーション',
    b: '封筒が開く、紙吹雪が舞う、花びらが散る ─ 受け取った瞬間に「わあ」と心が動く演出を選べます。',
  },
  {
    k: 'url',
    t: 'URL一つで、誰にでも届く',
    b: 'LINE・SNS・メールへURLを送るだけ。インストール不要、アカウント不要で、相手はすぐに開けます。',
  },
]

function FeatureIcon({ kind }: { kind: string }) {
  const stroke = 'currentColor'
  switch (kind) {
    case 'templates':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/>
        </svg>
      )
    case 'ai':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5z"/>
          <path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z"/>
        </svg>
      )
    case 'anim':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12c4-6 14-6 18 0"/><circle cx="6" cy="12" r="1.5" fill={stroke}/>
          <circle cx="12" cy="9" r="1.5" fill={stroke}/><circle cx="18" cy="12" r="1.5" fill={stroke}/>
        </svg>
      )
    case 'url':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 15l6-6"/><path d="M10 5l1-1a4 4 0 015.7 5.7l-1 1"/>
          <path d="M14 19l-1 1a4 4 0 01-5.7-5.7l1-1"/>
        </svg>
      )
    default:
      return null
  }
}

export default function FeaturesSection() {
  useReveal()

  return (
    <section className="relative py-[110px]" id="features" style={{ position: 'relative', zIndex: 2 }}>
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="lp-reveal">
          <span
            className="inline-flex items-center gap-[10px]"
            style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 14, letterSpacing: '0.04em', color: 'var(--lp-terracotta)' }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--lp-terracotta)', opacity: 0.6, display: 'inline-block' }} />
            Features
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
            心を動かす、4つの仕掛け。
          </h2>
        </div>

        <div className="mt-[60px] grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.k}
              className="lp-reveal grid gap-[22px] rounded-[22px] border p-9"
              data-delay={(i % 2) + 1}
              style={{
                gridTemplateColumns: '56px 1fr',
                alignItems: 'start',
                background: 'var(--lp-paper)',
                borderColor: 'var(--lp-paper-line)',
                boxShadow: 'var(--lp-shadow-soft)',
              }}
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-[14px]"
                style={{ background: 'var(--lp-cream-deep)', color: 'var(--lp-terracotta)' }}
              >
                <FeatureIcon kind={f.k} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 500, fontSize: 22, margin: '4px 0 10px' }}>
                  {f.t}
                </h3>
                <p className="m-0 text-sm leading-[1.85]" style={{ color: 'var(--lp-ink-soft)' }}>
                  {f.b}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
