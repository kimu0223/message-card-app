'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const DEMO_TEMPLATES = [
  {
    id: 'demo-birthday',
    label: '誕生日',
    bg: 'linear-gradient(135deg, #FBF1E8 0%, #F8E1D0 100%)',
    accent: '#A85F44',
    textColor: '#5A2B1A',
    defaultMsg: 'お誕生日おめでとう！\nいつも笑顔をありがとう。',
    heading: 'Happy Birthday',
    headingFont: 'var(--font-lp-display)',
  },
  {
    id: 'demo-thanks',
    label: 'お礼',
    bg: 'linear-gradient(135deg, #E8F0E8 0%, #D4E4D4 100%)',
    accent: '#4A6741',
    textColor: '#2A3D26',
    defaultMsg: 'いつもありがとうございます。\n感謝の気持ちを込めて。',
    heading: 'Thank You',
    headingFont: 'var(--font-lp-display)',
  },
  {
    id: 'demo-farewell',
    label: '送別',
    bg: 'linear-gradient(135deg, #E8E0F0 0%, #D0C4E0 100%)',
    accent: '#6B5B8A',
    textColor: '#3A2D50',
    defaultMsg: 'お疲れさまでした。\n新しい場所でのご活躍を\n心から応援しています。',
    heading: 'Best Wishes',
    headingFont: 'var(--font-lp-display)',
  },
  {
    id: 'demo-wedding',
    label: '結婚祝い',
    bg: 'linear-gradient(135deg, #FDF6F0 0%, #F0E6D8 100%)',
    accent: '#B08D6E',
    textColor: '#4A3728',
    defaultMsg: 'ご結婚おめでとうございます。\n末永くお幸せに。',
    heading: 'Congratulations',
    headingFont: 'var(--font-lp-display)',
  },
]

export default function InstantDemoSection() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [message, setMessage] = useState(DEMO_TEMPLATES[0].defaultMsg)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const tpl = DEMO_TEMPLATES[selectedIdx]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleTemplateSelect = (idx: number) => {
    setSelectedIdx(idx)
    setMessage(DEMO_TEMPLATES[idx].defaultMsg)
    setStep(2)
  }

  const handleMessageConfirm = () => {
    if (message.trim()) setStep(3)
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
              onClick={() => { if (s <= step) setStep(s as 1 | 2 | 3) }}
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
                    }}
                  >
                    <div style={{
                      fontFamily: t.headingFont,
                      fontStyle: 'italic',
                      fontSize: 18,
                      color: t.accent,
                      marginBottom: 4,
                    }}>
                      {t.heading}
                    </div>
                    <div style={{ fontSize: 13, color: t.textColor, fontWeight: 500 }}>
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
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 280,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Decorative dots */}
                  <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 4 }}>
                    {[0.3, 0.5, 0.7].map((o, i) => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: tpl.accent, opacity: o }} />
                    ))}
                  </div>

                  <div style={{
                    fontFamily: tpl.headingFont,
                    fontStyle: 'italic',
                    fontSize: 'clamp(28px, 6vw, 36px)',
                    color: tpl.accent,
                    lineHeight: 1.1,
                    marginBottom: 20,
                  }}>
                    {tpl.heading}
                  </div>

                  <div style={{ flex: 1 }} />

                  <div style={{
                    fontFamily: 'var(--font-lp-serif)',
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: tpl.textColor,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {message}
                  </div>

                  <div style={{
                    marginTop: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <div style={{ width: 24, height: 1, background: tpl.accent, opacity: 0.4 }} />
                    <div style={{
                      fontFamily: 'var(--font-lp-hand)',
                      fontSize: 14,
                      color: tpl.accent,
                      opacity: 0.8,
                    }}>
                      from you
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                style={{ textAlign: 'center', marginTop: 28 }}
              >
                <p style={{ fontSize: 14, color: '#7A6B5A', marginBottom: 16 }}>
                  もっとカスタマイズして、相手に届けましょう
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
                  <button
                    onClick={() => { setStep(1); setSelectedIdx(0); setMessage(DEMO_TEMPLATES[0].defaultMsg) }}
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
