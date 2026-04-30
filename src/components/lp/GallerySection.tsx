'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

/* ─── Scene filter definitions ─── */
const SCENES = [
  { id: 'all', label: 'すべて', glyph: '✦' },
  { id: 'birthday', label: '誕生日', glyph: '🎂' },
  { id: 'wedding', label: '結婚・記念日', glyph: '💍' },
  { id: 'farewell', label: '退職・送別', glyph: '🌅' },
  { id: 'thanks', label: 'お礼・感謝', glyph: '✉︎' },
  { id: 'parents', label: '母の日・父の日', glyph: '❀' },
] as const

type SceneId = (typeof SCENES)[number]['id']

/* ─── Card data ─── */
interface CardEntry {
  id: string
  title: string
  scene: SceneId
  render: () => React.ReactNode
}

const CARDS: CardEntry[] = [
  {
    id: 'birthday-pastel',
    title: 'Birthday Pastel',
    scene: 'birthday',
    render: () => (
      <div
        style={{
          background: 'linear-gradient(135deg, #FBE6D4 0%, #F5BFA4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Layered circles */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 280 360"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="200" cy="80" r="60" fill="rgba(255,255,255,0.25)" />
          <circle cx="60" cy="280" r="45" fill="rgba(255,255,255,0.2)" />
          <circle cx="240" cy="300" r="30" fill="rgba(255,255,255,0.15)" />
          <circle cx="140" cy="180" r="80" fill="rgba(255,255,255,0.1)" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '2.4rem',
            color: '#6B3A2A',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Happy
        </span>
        <span
          style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: '1rem',
            color: '#6B3A2A',
            marginTop: '0.25rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          お誕生日おめでとう
        </span>
      </div>
    ),
  },
  {
    id: 'birthday-confetti',
    title: 'Birthday Confetti',
    scene: 'birthday',
    render: () => (
      <div
        style={{
          background: 'linear-gradient(160deg, #2B2520 0%, #3D332C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Confetti rectangles */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 280 360"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="40" y="50" width="8" height="16" rx="2" fill="#E8B87E" transform="rotate(25 44 58)" />
          <rect x="200" y="40" width="6" height="14" rx="2" fill="#C97B5C" transform="rotate(-15 203 47)" />
          <rect x="100" y="30" width="7" height="12" rx="2" fill="#88A88A" transform="rotate(40 103 36)" />
          <rect x="230" y="120" width="8" height="14" rx="2" fill="#E8B87E" transform="rotate(60 234 127)" />
          <rect x="50" y="140" width="6" height="10" rx="2" fill="#D4A88A" transform="rotate(-30 53 145)" />
          <rect x="160" y="280" width="8" height="16" rx="2" fill="#C97B5C" transform="rotate(20 164 288)" />
          <rect x="60" y="300" width="7" height="12" rx="2" fill="#88A88A" transform="rotate(-45 63 306)" />
          <rect x="220" y="260" width="6" height="14" rx="2" fill="#E8B87E" transform="rotate(35 223 267)" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '1.8rem',
            fontStyle: 'italic',
            color: '#F5E6D0',
            position: 'relative',
            zIndex: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Cheers, to you.
        </span>
      </div>
    ),
  },
  {
    id: 'wedding-botanical',
    title: 'Wedding Botanical',
    scene: 'wedding',
    render: () => (
      <div
        style={{
          background: '#F0EDE2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Botanical arch */}
        <svg
          style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)' }}
          width="180"
          height="200"
          viewBox="0 0 180 200"
          fill="none"
        >
          <path
            d="M30 180 Q30 40 90 30 Q150 40 150 180"
            stroke="#6B8C6B"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Leaves along the arch */}
          <ellipse cx="45" cy="100" rx="8" ry="14" fill="#88A88A" transform="rotate(-20 45 100)" />
          <ellipse cx="38" cy="130" rx="7" ry="12" fill="#7A9E7A" transform="rotate(-30 38 130)" />
          <ellipse cx="50" cy="70" rx="6" ry="11" fill="#9AB89A" transform="rotate(-10 50 70)" />
          <ellipse cx="135" cy="100" rx="8" ry="14" fill="#88A88A" transform="rotate(20 135 100)" />
          <ellipse cx="142" cy="130" rx="7" ry="12" fill="#7A9E7A" transform="rotate(30 142 130)" />
          <ellipse cx="130" cy="70" rx="6" ry="11" fill="#9AB89A" transform="rotate(10 130 70)" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: '0.95rem',
            color: '#3D4A3D',
            position: 'relative',
            zIndex: 1,
            marginTop: '2.5rem',
            letterSpacing: '0.05em',
          }}
        >
          ご結婚おめでとうございます
        </span>
      </div>
    ),
  },
  {
    id: 'wedding-gold',
    title: 'Wedding Gold',
    scene: 'wedding',
    render: () => (
      <div
        style={{
          background: '#FFFCF5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold monogram circle */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fontFamily="var(--font-lp-display)"
            fontSize="22"
            fill="#C9A96E"
          >
            M&amp;K
          </text>
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-hand)',
            fontSize: '1.2rem',
            color: '#8A7A5A',
            marginTop: '0.75rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          10 years together
        </span>
      </div>
    ),
  },
  {
    id: 'farewell-sunset',
    title: 'Retirement Sunset',
    scene: 'farewell',
    render: () => (
      <div
        style={{
          background: 'linear-gradient(180deg, #F4D6B0 0%, #C97B5C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Sun and birds */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 280 360"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="140" cy="200" r="40" fill="rgba(255,255,255,0.3)" />
          <circle cx="140" cy="200" r="30" fill="rgba(255,255,255,0.2)" />
          {/* Birds */}
          <path d="M80 100 Q85 95 90 100" stroke="rgba(80,40,20,0.5)" strokeWidth="1.5" fill="none" />
          <path d="M100 90 Q105 85 110 90" stroke="rgba(80,40,20,0.5)" strokeWidth="1.5" fill="none" />
          <path d="M170 110 Q175 105 180 110" stroke="rgba(80,40,20,0.5)" strokeWidth="1.5" fill="none" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: '#4A2A1A',
            position: 'relative',
            zIndex: 1,
            marginTop: '3rem',
          }}
        >
          Thank you,
        </span>
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: '#4A2A1A',
            position: 'relative',
            zIndex: 1,
          }}
        >
          for everything.
        </span>
      </div>
    ),
  },
  {
    id: 'farewell-bouquet',
    title: 'Retirement Bouquet',
    scene: 'farewell',
    render: () => (
      <div
        style={{
          background: '#EFEAD9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Bouquet SVG */}
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          {/* Stems */}
          <line x1="60" y1="80" x2="50" y2="130" stroke="#6B8C6B" strokeWidth="1.5" />
          <line x1="60" y1="80" x2="60" y2="135" stroke="#6B8C6B" strokeWidth="1.5" />
          <line x1="60" y1="80" x2="70" y2="130" stroke="#6B8C6B" strokeWidth="1.5" />
          {/* Flowers */}
          <circle cx="45" cy="55" r="14" fill="#E8B4B8" />
          <circle cx="75" cy="50" r="12" fill="#F5D5A0" />
          <circle cx="60" cy="35" r="13" fill="#D4A0A0" />
          <circle cx="50" cy="70" r="10" fill="#C9D4B8" />
          <circle cx="72" cy="68" r="11" fill="#E8C8A0" />
          {/* Leaves */}
          <ellipse cx="35" cy="90" rx="6" ry="12" fill="#88A88A" transform="rotate(-20 35 90)" />
          <ellipse cx="85" cy="88" rx="6" ry="12" fill="#88A88A" transform="rotate(20 85 88)" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '1.6rem',
            fontStyle: 'italic',
            color: '#5A4A3A',
            marginTop: '0.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Bon Voyage
        </span>
      </div>
    ),
  },
  {
    id: 'thanks-letterpress',
    title: 'Thank You Letterpress',
    scene: 'thanks',
    render: () => (
      <div
        style={{
          background: '#FFFCF5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '2.2rem',
            color: '#2B2520',
            letterSpacing: '-0.03em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          thank you.
        </span>
        {/* Minimalist divider */}
        <svg width="80" height="10" viewBox="0 0 80 10" style={{ marginTop: '0.75rem' }}>
          <line x1="0" y1="5" x2="30" y2="5" stroke="#2B2520" strokeWidth="0.75" />
          <circle cx="40" cy="5" r="2" fill="#2B2520" />
          <line x1="50" y1="5" x2="80" y2="5" stroke="#2B2520" strokeWidth="0.75" />
        </svg>
      </div>
    ),
  },
  {
    id: 'thanks-sage',
    title: 'Thank You Sage',
    scene: 'thanks',
    render: () => (
      <div
        style={{
          background: '#DEE5D8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Sage circle */}
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="55" r="48" stroke="#5A7A5A" strokeWidth="1" fill="rgba(255,255,255,0.3)" />
          <text
            x="55"
            y="52"
            textAnchor="middle"
            fontFamily="var(--font-lp-hand)"
            fontSize="26"
            fill="#3D5A3D"
          >
            merci
          </text>
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: '0.85rem',
            color: '#3D5A3D',
            marginTop: '0.75rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          あなたへ、感謝の気持ちを
        </span>
      </div>
    ),
  },
  {
    id: 'parents-mother',
    title: "Mother's Day",
    scene: 'parents',
    render: () => (
      <div
        style={{
          background: 'linear-gradient(160deg, #FBE0E5 0%, #F5C5CE 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Flower */}
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <ellipse cx="45" cy="30" rx="10" ry="14" fill="#E88A9A" />
          <ellipse cx="30" cy="42" rx="10" ry="14" fill="#E88A9A" transform="rotate(-30 30 42)" />
          <ellipse cx="60" cy="42" rx="10" ry="14" fill="#E88A9A" transform="rotate(30 60 42)" />
          <ellipse cx="35" cy="55" rx="10" ry="14" fill="#E88A9A" transform="rotate(-60 35 55)" />
          <ellipse cx="55" cy="55" rx="10" ry="14" fill="#E88A9A" transform="rotate(60 55 55)" />
          <circle cx="45" cy="45" r="8" fill="#F5D0D8" />
          {/* Stem */}
          <line x1="45" y1="58" x2="45" y2="85" stroke="#6B8C6B" strokeWidth="2" />
          <ellipse cx="38" cy="72" rx="5" ry="9" fill="#88A88A" transform="rotate(-20 38 72)" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-hand)',
            fontSize: '1.4rem',
            color: '#7A3A4A',
            marginTop: '0.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          For Mom,
        </span>
        <span
          style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: '0.8rem',
            color: '#7A3A4A',
            marginTop: '0.25rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          お母さんいつもありがとう
        </span>
      </div>
    ),
  },
  {
    id: 'parents-father',
    title: "Father's Day",
    scene: 'parents',
    render: () => (
      <div
        style={{
          background: '#1F2D3D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Compass */}
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          {/* Dashed circles */}
          <circle
            cx="55"
            cy="55"
            r="45"
            stroke="rgba(200,180,140,0.3)"
            strokeWidth="0.75"
            strokeDasharray="4 4"
            fill="none"
          />
          <circle
            cx="55"
            cy="55"
            r="35"
            stroke="rgba(200,180,140,0.4)"
            strokeWidth="0.75"
            strokeDasharray="3 3"
            fill="none"
          />
          {/* Compass lines */}
          <line x1="55" y1="15" x2="55" y2="95" stroke="rgba(200,180,140,0.5)" strokeWidth="0.5" />
          <line x1="15" y1="55" x2="95" y2="55" stroke="rgba(200,180,140,0.5)" strokeWidth="0.5" />
          {/* Compass needle */}
          <polygon points="55,25 52,55 58,55" fill="#C9A96E" opacity="0.8" />
          <polygon points="55,85 52,55 58,55" fill="rgba(200,180,140,0.3)" />
          <circle cx="55" cy="55" r="3" fill="#C9A96E" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-lp-display)',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            color: '#C9B88C',
            marginTop: '0.75rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          To my compass.
        </span>
      </div>
    ),
  },
]

/* ─── Scene label map ─── */
/* ─── Main Component ─── */
export default function GallerySection() {
  useReveal()
  const [activeScene, setActiveScene] = useState<SceneId>('all')

  const filteredCards =
    activeScene === 'all'
      ? CARDS
      : CARDS.filter((c) => c.scene === activeScene)

  return (
    <section
      id="gallery"
      className="lp-reveal"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* ─── Section Header ─── */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              width: '2rem',
              height: '1px',
              background: 'var(--lp-ink-mute)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-lp-display)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'var(--lp-ink-soft)',
              letterSpacing: '0.02em',
            }}
          >
            Templates &middot; 全120種類
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 600,
            color: 'var(--lp-ink)',
            marginBottom: '1rem',
            lineHeight: 1.4,
          }}
        >
          どんな想いも、ぴったりの一枚に。
        </h2>

        {/* Lede */}
        <p
          style={{
            fontFamily: 'var(--font-lp-sans)',
            fontSize: '0.95rem',
            color: 'var(--lp-ink-soft)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          誕生日、結婚祝い、退職、感謝——
          <br />
          シーンに合わせた120種類のテンプレートから選ぶだけ。
          <br />
          メッセージを入れれば、あなただけのカードが完成します。
        </p>
      </div>

      {/* ─── Scene Tabs ─── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          padding: '0.75rem 1rem',
          background: 'var(--lp-paper)',
          borderRadius: '9999px',
          width: 'fit-content',
          margin: '0 auto 2.5rem',
        }}
      >
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-lp-sans)',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              background: activeScene === scene.id ? 'var(--lp-ink)' : 'transparent',
              color: activeScene === scene.id ? 'var(--lp-cream)' : 'var(--lp-ink-soft)',
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>{scene.glyph}</span>
            {scene.label}
          </button>
        ))}
      </div>

      {/* ─── Card Grid ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
        }}
      >
        {filteredCards.map((card) => (
          <div key={card.id} className="lp-reveal">
            <Link href={`/create?template=${card.id}`} className="lp-card block" style={{ textDecoration: 'none' }}>
              <div className="lp-card-inner">
                {card.render()}
              </div>
            </Link>

            {/* Card info */}
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-lp-display)',
                    fontStyle: 'italic',
                    fontSize: 16,
                    color: 'var(--lp-ink)',
                    margin: 0,
                  }}
                >
                  {card.title}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-lp-mono)',
                    fontSize: 11,
                    color: 'var(--lp-ink-mute)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: 2,
                    display: 'inline-block',
                  }}
                >
                  {SCENES.find(s => s.id === card.scene)?.label ?? ''}
                </span>
              </div>
              <Link href={`/create?template=${card.id}`} className="lp-card-use-btn">
                使う →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ─── CTA Button ─── */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="lp-ghost-btn">
          すべてのテンプレートを見る（120種類）
        </button>
      </div>
    </section>
  )
}
