'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ *
 * Font tokens (wired globally via :root)
 * ------------------------------------------------------------------ */
const SANS = 'var(--font-lp-sans)'
const SERIF = 'var(--font-lp-serif)'
const ITAL = 'var(--font-lp-display)'

/* ------------------------------------------------------------------ *
 * Template data
 * ------------------------------------------------------------------ */
type Template = {
  kicker: string
  title: string
  msg: string
  sign: string
  bg: string
  ink: string
  accent: string
}

const TEMPLATES: readonly Template[] = [
  {
    kicker: '♥ for you',
    title: 'Happy Birthday,',
    msg: 'あなたの一年が、たくさんの花で満ちますように。',
    sign: 'with love, Hana',
    bg: '#fbeef0',
    ink: '#7a4a55',
    accent: '#d98a98',
  },
  {
    kicker: '✦ ✦ ✦',
    title: 'Cheers, to you.',
    msg: '一年ぶんの「ありがとう」と、これからの「楽しみ」に乾杯。',
    sign: 'est. today',
    bg: '#1d2436',
    ink: '#f0e9da',
    accent: '#e0b94e',
  },
  {
    kicker: '~ Forever ~',
    title: 'ご結婚おめでとう',
    msg: 'おふたりの未来が、あたたかな光で満ちますように。',
    sign: 'M & K · 05.04',
    bg: '#eef2ea',
    ink: '#3f5742',
    accent: '#8aa676',
  },
  {
    kicker: 'M&K · est. 2016',
    title: '— ten years —',
    msg: 'これまでの十年に乾杯。そして、これからの毎日に。',
    sign: 'anniversary',
    bg: '#161616',
    ink: '#e8dcc0',
    accent: '#c2a35a',
  },
  {
    kicker: '❀ farewell',
    title: 'Thank you,',
    msg: '長い間、本当にお疲れさまでした。陽だまりのような日々を。',
    sign: 'for everything',
    bg: '#fcefe2',
    ink: '#8a5034',
    accent: '#e0935a',
  },
  {
    kicker: 'Bon Voyage',
    title: '新しい門出に、',
    msg: '花束を。またどこかで、お会いしましょう。',
    sign: 'with thanks',
    bg: '#f3eef6',
    ink: '#5f4a6b',
    accent: '#b58ec9',
  },
  {
    kicker: '♥ MERCI · N°07',
    title: 'thank you.',
    msg: '言葉では伝えきれない感謝を、このカードに込めて。',
    sign: 'with gratitude',
    bg: '#f4efe4',
    ink: '#3a3b34',
    accent: '#9a3b3b',
  },
  {
    kicker: 'merci. N°08',
    title: 'To you,',
    msg: 'いつも支えてくださるあなたへ、感謝を込めて。',
    sign: 'with love',
    bg: '#e9eee6',
    ink: '#4a5848',
    accent: '#7f9472',
  },
]

/* ------------------------------------------------------------------ *
 * CardPreview
 * ------------------------------------------------------------------ */
type CardPreviewProps = { t: Template; w?: number }

function CardPreview({ t, w = 230 }: CardPreviewProps) {
  const fw = w
  const sizing = { width: w, height: Math.round(w * 1.4) }
  return (
    <div
      style={{
        ...sizing,
        borderRadius: 14,
        overflow: 'hidden',
        background: t.bg,
        color: t.ink,
        position: 'relative',
        boxShadow:
          '0 26px 60px -22px rgba(20,28,52,0.5), 0 4px 12px -6px rgba(20,28,52,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 10,
          border: `1px solid ${t.accent}`,
          opacity: 0.34,
          borderRadius: 8,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `${fw * 0.13}px ${fw * 0.12}px`,
          gap: fw * 0.05,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: Math.max(7, fw * 0.04),
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: t.accent,
            fontWeight: 600,
          }}
        >
          {t.kicker}
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: fw * 0.115,
            lineHeight: 1.15,
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          {t.title}
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: fw * 0.052,
            lineHeight: 1.75,
            opacity: 0.82,
          }}
        >
          {t.msg}
        </div>
        <div
          style={{
            fontFamily: ITAL,
            fontStyle: 'italic',
            fontSize: fw * 0.058,
            opacity: 0.7,
            marginTop: fw * 0.02,
          }}
        >
          {t.sign}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: fw * 0.06,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ width: fw * 0.05, height: 1, background: t.accent, opacity: 0.5 }} />
        <span style={{ width: 5, height: 5, borderRadius: 5, background: t.accent }} />
        <span style={{ width: fw * 0.05, height: 1, background: t.accent, opacity: 0.5 }} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Tunnel card slots
 * ------------------------------------------------------------------ */
type Slot = { x: number; y: number; z: number; w: number; k: number }

const SLOTS: readonly Slot[] = [
  { x: -44, y: -24, z: -1500, w: 148, k: 2.0 },
  { x: 46, y: -28, z: -1750, w: 142, k: 2.2 },
  { x: -50, y: 26, z: -1300, w: 158, k: 1.85 },
  { x: 48, y: 28, z: -1600, w: 148, k: 2.1 },
  { x: -36, y: 4, z: -2200, w: 128, k: 2.6 },
  { x: 38, y: 6, z: -2050, w: 130, k: 2.5 },
  { x: -56, y: -46, z: -2500, w: 116, k: 2.9 },
  { x: 58, y: 48, z: -2650, w: 113, k: 3.05 },
]

/* ------------------------------------------------------------------ *
 * Reveal-on-scroll hook (for ArrivalLine)
 * ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, shown }
}

/* ------------------------------------------------------------------ *
 * HeroDepthInkwash
 * ------------------------------------------------------------------ */
export default function HeroDepthInkwash() {
  return (
    <section id="top" style={{ height: '190vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          perspective: '1000px',
          perspectiveOrigin: '50% 46%',
        }}
      >
        {/* Dark space panel — fades to transparent at the bottom so the page never goes blank */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, #0d1430 0%, #141d3a 30%, #1f2747 52%, #34325a 72%, rgba(120,110,120,0.4) 88%, rgba(246,243,234,0) 100%)',
          }}
        />

        {/* Star dust */}
        {Array.from({ length: 46 }).map((_, i) => {
          const left = (i * 53) % 100
          const top = (i * 37) % 100
          const size = (i % 3) + 1
          const depth = -0.02 - (i % 5) * 0.01
          const opacity = 0.25 + ((i * 17) % 50) / 100
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                borderRadius: size,
                background: 'rgba(246,243,234,0.9)',
                opacity,
                transform: `translateY(calc(var(--sy) * ${depth}px))`,
              }}
            />
          )
        })}

        {/* Warm horizon glow */}
        <div
          style={{
            position: 'absolute',
            left: '52%',
            top: '70%',
            transform: 'translate(-50%, -50%)',
            width: 'min(900px, 120vw)',
            height: '46vh',
            background:
              'radial-gradient(ellipse at center, rgba(199,143,116,0.38) 0%, rgba(199,143,116,0) 68%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Tunnel cards */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            zIndex: 1,
          }}
        >
          {SLOTS.map((s, i) => {
            const t = TEMPLATES[i % TEMPLATES.length]
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%,-50%) translate3d(${s.x}vw, ${s.y}vh, calc(${s.z}px + var(--sy) * ${s.k}px))`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{ animation: 'lp-floaty 7s ease-in-out infinite' }}>
                  <CardPreview t={t} w={s.w} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Soft dark glow behind the title (contrast guarantee) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '48%',
            width: 'min(760px, 86vw)',
            height: '62vh',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse at center, rgba(8,12,28,0.78) 0%, rgba(8,12,28,0.5) 42%, rgba(8,12,28,0) 72%)',
            // keep a floor so the bright tunnel cards sweeping toward the viewer
            // never wash out the title before it has faded out.
            opacity: 'max(0.5, calc(1 - var(--sy) / 560))',
          }}
        />

        {/* Center title block */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            pointerEvents: 'none',
            opacity: 'calc(1 - var(--sy) / 520)',
          }}
        >
          {/* Kicker row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              pointerEvents: 'auto',
            }}
          >
            <span style={{ width: 36, height: 1, background: 'var(--lp-gold)', opacity: 0.8 }} />
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#e6cda6',
              }}
            >
              YOU&apos;VE GOT MAIL · N° 001
            </span>
            <span style={{ width: 36, height: 1, background: 'var(--lp-gold)', opacity: 0.8 }} />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              color: 'var(--lp-cream)',
              lineHeight: 1.2,
              letterSpacing: '0.03em',
              textShadow: '0 6px 36px rgba(0,0,0,0.6)',
              margin: '20px 0 0',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: ITAL,
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 'clamp(24px, 3vw, 38px)',
                color: '#e6cda6',
                marginBottom: 10,
                letterSpacing: '0.01em',
              }}
            >
              Open the moment.
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(38px, 6vw, 76px)' }}>
              心がふるえる、
              <br />
              一通の手紙を。
            </span>
          </h1>

          {/* Sub copy */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.9,
              color: 'rgba(244,240,230,0.88)',
              whiteSpace: 'pre-line',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
              maxWidth: 480,
              marginTop: 24,
            }}
          >
            {'テンプレートを選んで、言葉を添えるだけ。\n3分で届く、アニメーション付きメッセージカード。'}
          </p>

          {/* CTA row */}
          <div
            style={{
              marginTop: 34,
              pointerEvents: 'auto',
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/create"
              style={{
                background: 'var(--lp-cream)',
                color: 'var(--lp-ink)',
                padding: '15px 28px',
                borderRadius: 999,
                fontWeight: 600,
                fontFamily: SANS,
                textDecoration: 'none',
                boxShadow: '0 12px 34px -10px rgba(0,0,0,0.5)',
              }}
            >
              無料でカードを作る →
            </Link>
            <a
              href="#gallery"
              style={{
                color: 'var(--lp-cream)',
                border: '1px solid rgba(244,240,230,0.62)',
                background: 'rgba(255,255,255,0.06)',
                padding: '15px 24px',
                borderRadius: 999,
                fontFamily: SANS,
                textDecoration: 'none',
              }}
            >
              テンプレートを見る
            </a>
          </div>

          {/* Note line */}
          <div
            style={{
              marginTop: 18,
              fontFamily: SANS,
              fontSize: 12.5,
              color: 'rgba(244,240,230,0.62)',
              letterSpacing: '0.04em',
            }}
          >
            クレジットカード不要 · 3分で完成 · 登録なしでOK
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 'calc(1 - var(--sy) / 300)',
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: '0.3em',
              color: 'rgba(244,240,230,0.72)',
            }}
          >
            SCROLL TO TRAVEL
          </span>
          <span
            style={{
              width: 1,
              height: 34,
              background:
                'linear-gradient(to bottom, rgba(244,240,230,0.72), rgba(244,240,230,0))',
            }}
          />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * ArrivalLine — the calm beat between hero and content
 * ------------------------------------------------------------------ */
export function ArrivalLine() {
  const { ref, shown } = useReveal<HTMLDivElement>()

  const revealStyle: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 1s ease, transform 1s ease',
  }

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        padding:
          'clamp(70px, 11vw, 140px) clamp(20px, 5vw, 80px) clamp(20px, 4vw, 60px)',
        textAlign: 'center',
      }}
    >
      <div ref={ref} style={{ maxWidth: 680, margin: '0 auto', ...revealStyle }}>
        {/* Vermilion ornament */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 24,
          }}
        >
          <span style={{ width: 40, height: 1, background: 'var(--lp-terracotta)', opacity: 0.7 }} />
          <span
            style={{ width: 7, height: 7, borderRadius: 7, background: 'var(--lp-terracotta)' }}
          />
          <span style={{ width: 40, height: 1, background: 'var(--lp-terracotta)', opacity: 0.7 }} />
        </div>

        <p
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(22px, 3.2vw, 34px)',
            fontWeight: 600,
            lineHeight: 1.7,
            color: 'var(--lp-ink)',
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          言葉にしきれない想いも、
          <br />
          一枚のカードなら、そっと手渡せる。
        </p>
      </div>
    </section>
  )
}
