'use client'

import { useReveal } from '@/hooks/useReveal'

const features = [
  {
    k: 'templates',
    tag: 'Templates',
    t: '120種類の高品質テンプレート',
    b: 'プロのデザイナーが手がけた、和洋・モダン・クラシックまで。シーンに寄り添う一枚が必ず見つかります。',
  },
  {
    k: 'ai',
    tag: 'AI Assist',
    t: '言葉に迷ったら、AIが手助け',
    b: '「何を書けばいい？」の悩みは要りません。相手・関係性・トーンを伝えるだけで、3つの心響く文案を即座に提案。',
  },
  {
    k: 'anim',
    tag: 'Animation',
    t: '受け取って感動するアニメーション',
    b: '封筒が開く、紙吹雪が舞う、花びらが散る ─ 受け取った瞬間に「わあ」と心が動く演出を選べます。',
  },
  {
    k: 'url',
    tag: 'Share',
    t: 'URL一つで、誰にでも届く',
    b: 'LINE・SNS・メールへURLを送るだけ。インストール不要、アカウント不要で、相手はすぐに開けます。',
  },
]

function FeatureIcon({ kind }: { kind: string }) {
  const stroke = 'currentColor'
  switch (kind) {
    case 'templates':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/>
        </svg>
      )
    case 'ai':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5z"/>
          <path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z"/>
        </svg>
      )
    case 'anim':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12c4-6 14-6 18 0"/><circle cx="6" cy="12" r="1.5" fill={stroke}/>
          <circle cx="12" cy="9" r="1.5" fill={stroke}/><circle cx="18" cy="12" r="1.5" fill={stroke}/>
        </svg>
      )
    case 'url':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 15l6-6"/><path d="M10 5l1-1a4 4 0 015.7 5.7l-1 1"/>
          <path d="M14 19l-1 1a4 4 0 01-5.7-5.7l1-1"/>
        </svg>
      )
    default:
      return null
  }
}

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

export default function FeaturesSection() {
  useReveal()

  return (
    <section className="lp-section" id="features" style={{ background: 'transparent', padding: 'clamp(80px, 11vw, 150px) 0' }}>
      <div className="lp-container">
        <div className="lp-reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span style={kickerStyle}>Features</span>
          <h2 style={h2Style}>心を動かす、4つの仕掛け。</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 24,
            marginTop: 'clamp(48px, 6vw, 72px)',
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.k}
              className="lp-reveal"
              data-delay={(i % 2) + 1}
              style={{
                background: 'rgba(255,255,255,0.74)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: 18,
                boxShadow: '0 22px 50px -28px rgba(26,39,68,0.4)',
                padding: '34px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <span style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 600, fontSize: 42, lineHeight: 1, color: 'var(--lp-terracotta)' }}>
                  {`0${i + 1}`}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--lp-ink-mute)' }}>
                  <FeatureIcon kind={f.k} />
                  <span style={{ fontFamily: 'var(--font-lp-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                    {f.tag}
                  </span>
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-lp-serif)', fontWeight: 600, fontSize: 21, color: 'var(--lp-ink)', margin: '0 0 10px' }}>
                {f.t}
              </h3>
              <p style={{ margin: 0, fontFamily: 'var(--font-lp-sans)', fontSize: 14, lineHeight: 1.85, color: 'var(--lp-ink-soft)' }}>
                {f.b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
