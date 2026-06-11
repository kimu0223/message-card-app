'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, LogIn } from 'lucide-react'
import Link from 'next/link'
import { Bloom, Sprig, Eucalyptus } from './CardTemplates'

// --- Scene-specific decoration configs ---
interface SceneDecor {
  bg: string
  accent: string
  textColor: string
  defaultMsg: string
  heading: string
  headingFont: string
  label: string
  id: string
  decorations: React.ReactNode
}

const DEMO_TEMPLATES: SceneDecor[] = [
  {
    id: 'demo-birthday',
    label: '誕生日',
    bg: 'radial-gradient(ellipse at 50% 80%, #F8C9A8 0%, #FBE0CC 40%, transparent 70%), linear-gradient(135deg, #FBF1E8 0%, #F8E1D0 100%)',
    accent: '#A85F44',
    textColor: '#5A2B1A',
    defaultMsg: 'お誕生日おめでとう！\nいつも笑顔をありがとう。',
    heading: 'Happy Birthday',
    headingFont: 'var(--font-lp-display)',
    decorations: (
      <>
        <div style={{ position: 'absolute', top: -18, right: -10, transform: 'rotate(20deg)' }}>
          <Bloom size={72} color="#E89A82" center="#A85F44" />
        </div>
        <div style={{ position: 'absolute', top: 16, right: 36, transform: 'rotate(-8deg)' }}>
          <Bloom size={42} color="#F2B69B" center="#A85F44" />
        </div>
        <div style={{ position: 'absolute', top: 48, right: 4, transform: 'rotate(15deg)' }}>
          <Bloom size={30} color="#E0AC8B" center="#7A3F2A" />
        </div>
        <div style={{ position: 'absolute', top: 28, right: 60, transform: 'rotate(-30deg)' }}>
          <Sprig scale={0.6} color="#8FA68A" />
        </div>
        {([[16, 120, '#F2B69B'], [32, 148, '#E89A82'], [8, 168, '#F4D6B0']] as const).map(([x, y, c], i) => (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: 5, height: 8, background: c, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', transform: `rotate(${i * 30}deg)`, opacity: 0.7 }} />
        ))}
      </>
    ),
  },
  {
    id: 'demo-thanks',
    label: 'お礼',
    bg: 'radial-gradient(ellipse at 30% 20%, rgba(143,166,138,0.3) 0%, transparent 60%), linear-gradient(135deg, #E8F0E8 0%, #D4E4D4 100%)',
    accent: '#4A6741',
    textColor: '#2A3D26',
    defaultMsg: 'いつもありがとうございます。\n感謝の気持ちを込めて。',
    heading: 'Thank You',
    headingFont: 'var(--font-lp-display)',
    decorations: (
      <>
        <div style={{ position: 'absolute', top: -10, right: -20, transform: 'rotate(-30deg)', opacity: 0.8 }}>
          <Eucalyptus color="#6E8669" />
        </div>
        <div style={{ position: 'absolute', top: 40, left: -16, transform: 'rotate(20deg)', opacity: 0.6 }}>
          <Sprig scale={0.55} color="#8FA68A" rotate={-20} />
        </div>
        <div style={{ position: 'absolute', bottom: 60, right: 10, width: 6, height: 6, borderRadius: '50%', background: '#FFFCF5' }} />
      </>
    ),
  },
  {
    id: 'demo-farewell',
    label: '送別',
    bg: 'radial-gradient(circle at 50% 40%, #FBE6D4 0%, transparent 50%), linear-gradient(180deg, #F8DDC0 0%, #E8917A 60%, #C97B5C 100%)',
    accent: '#FFFAEB',
    textColor: '#FFFAEB',
    defaultMsg: 'お疲れさまでした。\n新しい場所でのご活躍を\n心から応援しています。',
    heading: 'Best Wishes',
    headingFont: 'var(--font-lp-display)',
    decorations: (
      <>
        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, #FFFAEB 0%, #F4C496 80%)', opacity: 0.5 }} />
        <svg viewBox="0 0 220 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '40%' }}>
          <path d="M0 50 L50 30 L110 45 L170 28 L220 42 L220 100 L0 100 Z" fill="#7A4530" opacity="0.5" />
          <path d="M0 70 L40 55 L100 65 L160 52 L220 62 L220 100 L0 100 Z" fill="#5A3322" opacity="0.6" />
        </svg>
      </>
    ),
  },
  {
    id: 'demo-wedding',
    label: '結婚祝い',
    bg: 'radial-gradient(ellipse at 50% 30%, rgba(184,146,99,0.1) 0%, transparent 60%), linear-gradient(135deg, #FDF6F0 0%, #F0E6D8 100%)',
    accent: '#B08D6E',
    textColor: '#4A3728',
    defaultMsg: 'ご結婚おめでとうございます。\n末永くお幸せに。',
    heading: 'Congratulations',
    headingFont: 'var(--font-lp-display)',
    decorations: (
      <>
        <div style={{ position: 'absolute', inset: 12, border: '0.5px solid #B89263', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 16, border: '0.5px solid #B89263', borderRadius: 2, opacity: 0.4, pointerEvents: 'none' }} />
        <svg viewBox="0 0 200 280" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <path d="M 25 240 L 25 110 Q 25 25 100 25 Q 175 25 175 110 L 175 240" fill="none" stroke="#8FA68A" strokeWidth="0.5" opacity="0.4" />
          {[40, 80, 120, 160].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy={25 + Math.abs(cx - 100) * 0.6} r="4" fill="#E89A82" opacity="0.6" />
              <circle cx={cx} cy={25 + Math.abs(cx - 100) * 0.6} r="1.5" fill="#A85F44" opacity="0.6" />
            </g>
          ))}
        </svg>
      </>
    ),
  },
]

export default function InstantDemoSection() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [message, setMessage] = useState(DEMO_TEMPLATES[0].defaultMsg)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const tpl = DEMO_TEMPLATES[selectedIdx]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import('canvas-confetti')).default
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [tpl.accent, '#E89A82', '#8FA68A', '#F4D6B0', '#B89263'],
      })
    } catch {
      // canvas-confetti が無い場合は無視
    }
  }, [tpl.accent])

  const handleTemplateSelect = (idx: number) => {
    setSelectedIdx(idx)
    setMessage(DEMO_TEMPLATES[idx].defaultMsg)
    setStep(2)
    setShowConfetti(false)
  }

  const handleMessageConfirm = () => {
    if (message.trim()) {
      setStep(3)
      setShowConfetti(true)
      setTimeout(() => fireConfetti(), 400)
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '80px 16px',
        background: 'linear-gradient(180deg, #FDFCFA 0%, #F5F0EB 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <p style={{
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#A68B6B',
            marginBottom: 12,
            fontFamily: 'var(--font-lp-mono)',
          }}>
            Try it now
          </p>
          <h2 style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 600,
            color: '#2A2118',
            margin: 0,
            lineHeight: 1.3,
          }}>
            30秒でカードを体験
          </h2>
          <p style={{
            fontSize: 14,
            color: '#7A6B5A',
            marginTop: 8,
            lineHeight: 1.6,
          }}>
            登録不要。今すぐ試せます。
          </p>
        </motion.div>

        {/* Step indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}
        >
          {[1, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => { if (s <= step) { setStep(s as 1 | 2 | 3); setShowConfetti(false) } }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                fontSize: 12,
                fontWeight: step === s ? 600 : 400,
                color: step >= s ? '#2A2118' : '#B0A090',
                background: step === s ? '#FFF' : 'transparent',
                boxShadow: step === s ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                cursor: s <= step ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: step >= s ? '#A68B6B' : '#D8CFC4',
                color: '#FFF',
                fontSize: 11,
                display: 'grid',
                placeItems: 'center',
              }}>{s}</span>
              {s === 1 ? 'シーン' : s === 2 ? 'メッセージ' : '完成'}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Template selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ textAlign: 'center', fontSize: 15, color: '#5A4A3A', marginBottom: 16, fontWeight: 500 }}>
                どんなシーンで贈りますか？
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {DEMO_TEMPLATES.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateSelect(i)}
                    style={{
                      background: t.bg,
                      border: selectedIdx === i ? `2px solid ${t.accent}` : '2px solid transparent',
                      borderRadius: 12,
                      padding: '20px 16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      fontFamily: t.headingFont,
                      fontStyle: 'italic',
                      fontSize: 18,
                      color: t.accent,
                      marginBottom: 4,
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {t.heading}
                    </div>
                    <div style={{ fontSize: 13, color: t.textColor, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                      {t.label}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Message input */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ textAlign: 'center', fontSize: 15, color: '#5A4A3A', marginBottom: 16, fontWeight: 500 }}>
                メッセージを入力してください
              </p>
              <div style={{
                background: '#FFF',
                borderRadius: 12,
                padding: 20,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="お誕生日おめでとう！"
                  rows={4}
                  style={{
                    width: '100%',
                    border: '1px solid #E0D8D0',
                    borderRadius: 8,
                    padding: '12px 14px',
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: '#2A2118',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = tpl.accent }}
                  onBlur={e => { e.target.style.borderColor = '#E0D8D0' }}
                />
                <button
                  onClick={handleMessageConfirm}
                  disabled={!message.trim()}
                  style={{
                    marginTop: 12,
                    width: '100%',
                    padding: '10px 0',
                    borderRadius: 8,
                    border: 'none',
                    background: message.trim() ? tpl.accent : '#D8CFC4',
                    color: '#FFF',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: message.trim() ? 'pointer' : 'default',
                    transition: 'background 0.2s',
                  }}
                >
                  プレビューを見る
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Card preview */}
              <div style={{ perspective: 800, maxWidth: 380, margin: '0 auto' }}>
              <motion.div
                initial={{ rotateY: -8, rotateX: 2 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div style={{
                  background: tpl.bg,
                  borderRadius: 16,
                  padding: '32px 28px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Scene-specific SVG decorations */}
                  {tpl.decorations}

                  {/* Tag label */}
                  <div style={{
                    fontFamily: 'var(--font-lp-mono)',
                    fontSize: 9,
                    color: tpl.accent,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase' as const,
                    position: 'relative',
                    zIndex: 1,
                    opacity: 0.8,
                  }}>
                    &#9829; for you
                  </div>

                  <div style={{ flex: 1, minHeight: 20 }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontFamily: tpl.headingFont,
                      fontStyle: 'italic',
                      fontSize: 'clamp(36px, 8vw, 48px)',
                      color: tpl.accent,
                      lineHeight: 0.95,
                      marginBottom: 16,
                      letterSpacing: '-0.02em',
                    }}>
                      {tpl.heading}
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-lp-serif)',
                      fontSize: 16,
                      lineHeight: 1.8,
                      color: tpl.textColor,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontWeight: 500,
                    }}>
                      {message}
                    </div>

                    <div style={{
                      marginTop: 20,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                      <div style={{ width: 28, height: 1, background: tpl.accent, opacity: 0.4 }} />
                      <div style={{
                        fontFamily: 'var(--font-lp-hand)',
                        fontSize: 18,
                        color: tpl.accent,
                        opacity: 0.8,
                        transform: 'rotate(-3deg)',
                      }}>
                        with love
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                style={{ textAlign: 'center', marginTop: 28 }}
              >
                <p style={{ fontSize: 14, color: '#7A6B5A', marginBottom: 16 }}>
                  実際のカードは、もっと華やかなテンプレートで作れます
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <Link
                    href="/create"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 28px',
                      borderRadius: 10,
                      background: '#2A2118',
                      color: '#FFF',
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Sparkles style={{ width: 16, height: 16 }} />
                    本格的にカードを作る
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </Link>
                  <Link
                    href="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 20px',
                      borderRadius: 8,
                      background: 'transparent',
                      border: '1px solid #D8CFC4',
                      color: '#7A6B5A',
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#A68B6B'
                      e.currentTarget.style.color = '#2A2118'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#D8CFC4'
                      e.currentTarget.style.color = '#7A6B5A'
                    }}
                  >
                    <LogIn style={{ width: 14, height: 14 }} />
                    ログインしてもっと本格的に作る
                  </Link>
                  <button
                    onClick={() => { setStep(1); setSelectedIdx(0); setMessage(DEMO_TEMPLATES[0].defaultMsg); setShowConfetti(false) }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#A68B6B',
                      fontSize: 13,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    もう一度試す
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
