'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, LogIn, Lock } from 'lucide-react'
import Link from 'next/link'
import { Bloom, Sprig, Eucalyptus } from './CardTemplates'
import CanvasStageView from '@/components/card/CanvasStageView'
import DemoCardStage from './demo/DemoCardStage'
import DemoComposing from './demo/DemoComposing'
import { MOOD_OPTIONS, DEFAULT_MOOD_ID, buildTrialRequest } from '@/lib/demo/sceneMapping'
import type { AIDesignMood } from '@/types/ai'
import type { CanvasData } from '@/types/card'

// --- Scene-specific decoration configs（シーン選択UI＋AI失敗時フォールバックの見た目） ---
interface SceneDecor {
  /** sceneMapping.ts の DEMO_SCENES.id と対応（API呼び出しに使用） */
  sceneId: string
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
    sceneId: 'birthday',
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
    sceneId: 'thanks',
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
    sceneId: 'farewell',
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
    sceneId: 'celebration',
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

type DemoError = 'trial_limit_exceeded' | 'generation_failed' | null

// 和モダン chrome palette (tokens). Scene tiles keep their own colorful palettes.
const C = {
  ink: 'var(--lp-ink)',
  inkSoft: 'var(--lp-ink-soft)',
  inkMute: 'var(--lp-ink-mute)',
  accent: 'var(--lp-terracotta)', // 朱 vermilion
  paper: 'var(--lp-cream-soft)',
  line: 'var(--lp-paper-line)',
  glass: 'rgba(255,255,255,0.6)',
} as const

const VARIANT_LABELS = ['案A', '案B', '案C', '案D'] as const

/** ステージに常時表示するシーンのサンプルカード（カード比率）。AI結果と同じ舞台に乗せる。 */
function SampleCard({ tpl, message }: { tpl: SceneDecor; message: string }) {
  return (
    <div style={{
      position: 'relative',
      aspectRatio: '1 / 1.414',
      borderRadius: 16,
      overflow: 'hidden',
      background: tpl.bg,
      boxShadow: '0 18px 50px -22px rgba(20,28,52,0.45), 0 4px 12px -6px rgba(20,28,52,0.25)',
      display: 'flex',
      flexDirection: 'column',
      padding: '34px 28px',
    }}>
      <div style={{ position: 'absolute', inset: 10, border: `1px solid ${tpl.accent}`, opacity: 0.3, borderRadius: 9, pointerEvents: 'none' }} />
      {tpl.decorations}
      <div style={{
        fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: tpl.accent,
        letterSpacing: '0.24em', textTransform: 'uppercase', position: 'relative', zIndex: 1, opacity: 0.85,
      }}>
        &#9829; for you
      </div>
      <div style={{ flex: 1, minHeight: 16 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: tpl.headingFont, fontStyle: 'italic', fontSize: 'clamp(30px, 7vw, 42px)',
          color: tpl.accent, lineHeight: 0.98, marginBottom: 14, letterSpacing: '-0.02em',
        }}>
          {tpl.heading}
        </div>
        <div style={{
          fontFamily: 'var(--font-lp-serif)', fontSize: 15, lineHeight: 1.85, color: tpl.textColor,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontWeight: 500,
        }}>
          {message}
        </div>
      </div>
      {/* bottom ornament */}
      <div style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 14, height: 1, background: tpl.accent, opacity: 0.5 }} />
        <span style={{ width: 5, height: 5, borderRadius: 5, background: tpl.accent }} />
        <span style={{ width: 14, height: 1, background: tpl.accent, opacity: 0.5 }} />
      </div>
    </div>
  )
}

/** AI失敗時に表示する従来のハードコードプリセットプレビュー（安全網）。 */
function PresetPreview({ tpl, message }: { tpl: SceneDecor; message: string }) {
  return (
    <div style={{ perspective: 800, maxWidth: 380, margin: '0 auto' }}>
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
        {tpl.decorations}
        <div style={{
          fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: tpl.accent,
          letterSpacing: '0.22em', textTransform: 'uppercase', position: 'relative', zIndex: 1, opacity: 0.8,
        }}>
          &#9829; for you
        </div>
        <div style={{ flex: 1, minHeight: 20 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: tpl.headingFont, fontStyle: 'italic', fontSize: 'clamp(36px, 8vw, 48px)',
            color: tpl.accent, lineHeight: 0.95, marginBottom: 16, letterSpacing: '-0.02em',
          }}>
            {tpl.heading}
          </div>
          <div style={{
            fontFamily: 'var(--font-lp-serif)', fontSize: 16, lineHeight: 1.8, color: tpl.textColor,
            whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontWeight: 500,
          }}>
            {message}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InstantDemoSection() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [message, setMessage] = useState(DEMO_TEMPLATES[0].defaultMsg)
  const [mood, setMood] = useState<AIDesignMood>(DEFAULT_MOOD_ID)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // AI生成の状態
  const [isGenerating, setIsGenerating] = useState(false)
  const [variants, setVariants] = useState<CanvasData[] | null>(null)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [error, setError] = useState<DemoError>(null)

  const tpl = DEMO_TEMPLATES[selectedIdx]
  const hasResult = !isGenerating && !error && !!variants && variants.length > 0

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

  const resetResult = () => {
    setVariants(null)
    setSelectedVariant(0)
    setError(null)
  }

  const handleTemplateSelect = (idx: number) => {
    setSelectedIdx(idx)
    setMessage(DEMO_TEMPLATES[idx].defaultMsg)
    setStep(2)
    resetResult()
  }

  const handleGenerate = useCallback(async () => {
    if (!message.trim() || isGenerating) return
    setStep(3)
    setIsGenerating(true)
    setError(null)
    setVariants(null)

    try {
      const res = await fetch('/api/ai/design/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildTrialRequest(tpl.sceneId, mood, message)),
      })

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error === 'trial_limit_exceeded' ? 'trial_limit_exceeded' : 'generation_failed')
        return
      }
      if (!res.ok) {
        setError('generation_failed')
        return
      }

      const data = await res.json()
      const vs: CanvasData[] = Array.isArray(data?.variants) ? data.variants : []
      if (vs.length === 0) {
        setError('generation_failed')
        return
      }
      setVariants(vs)
      setSelectedVariant(0)
      setTimeout(() => fireConfetti(), 400)
    } catch {
      setError('generation_failed')
    } finally {
      setIsGenerating(false)
    }
  }, [message, mood, tpl.sceneId, isGenerating, fireConfetti])

  const handleRetry = () => {
    setStep(1)
    setSelectedIdx(0)
    setMessage(DEMO_TEMPLATES[0].defaultMsg)
    setMood(DEFAULT_MOOD_ID)
    resetResult()
  }

  // --- ステージに乗せる中身を決定（清書中 / 上限 / 失敗 / 結果 / サンプル） ---
  let stageArea: React.ReactNode
  if (isGenerating) {
    stageArea = <DemoComposing />
  } else if (error === 'trial_limit_exceeded') {
    stageArea = (
      <div style={{
        background: C.glass, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.7)', borderRadius: 18, padding: '32px 24px', textAlign: 'center',
        boxShadow: '0 22px 50px -28px rgba(20,28,52,0.4)', maxWidth: 420, margin: '0 auto',
      }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(176,58,46,0.10)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
          <Lock style={{ width: 24, height: 24, color: C.accent }} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 20, fontWeight: 600, color: C.ink, margin: '0 0 8px' }}>
          お試し回数の上限に達しました
        </h3>
        <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.7, marginBottom: 24, fontFamily: 'var(--font-lp-sans)' }}>
          無料登録すると、AIデザイン生成を続けて使えます。<br />
          保存・共有・もっと多くのテンプレートも解放されます。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <Link href="/login" style={ctaPrimaryStyle}>
            <Sparkles style={{ width: 16, height: 16 }} />
            無料登録して続ける
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>
    )
  } else if (error === 'generation_failed') {
    stageArea = (
      <div>
        <PresetPreview tpl={tpl} message={message} />
        <p style={{ textAlign: 'center', fontSize: 13, color: C.inkMute, marginTop: 16, fontFamily: 'var(--font-lp-sans)' }}>
          AI生成が混み合っています。プレビューを表示しました。
        </p>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button onClick={() => { setStep(2); resetResult() }} style={linkButtonStyle}>
            もう一度生成する
          </button>
        </div>
      </div>
    )
  } else if (hasResult && variants) {
    stageArea = (
      <DemoCardStage maxWidth={340}>
        <motion.div
          key={selectedVariant}
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 18px 50px -18px rgba(20,28,52,0.5)' }}
        >
          <CanvasStageView canvasData={variants[selectedVariant]} />
        </motion.div>
      </DemoCardStage>
    )
  } else {
    // step 1 & 2 — 選択中シーンのサンプルカードを常時表示
    stageArea = (
      <DemoCardStage maxWidth={332}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <SampleCard tpl={tpl} message={message} />
          </motion.div>
        </AnimatePresence>
      </DemoCardStage>
    )
  }

  const showControls = !isGenerating && error !== 'trial_limit_exceeded'

  return (
    <section
      id="demo"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px,8vw,110px) 16px',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 2,
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        {/* Header — continuity with the hero cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 26 }}
        >
          <p style={{
            fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 600,
            color: C.accent, marginBottom: 14, fontFamily: 'var(--font-lp-sans)',
          }}>
            Your turn · あなたの番
          </p>
          <h2 style={{
            fontFamily: 'var(--font-lp-serif)',
            fontSize: 'clamp(27px, 4vw, 44px)',
            fontWeight: 600, color: C.ink, margin: 0, lineHeight: 1.3, letterSpacing: '0.02em',
          }}>
            さっきのカードを、<br />あなたの言葉で。
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.4vw,16px)', color: C.inkSoft, marginTop: 14, lineHeight: 1.85, maxWidth: 480, marginInline: 'auto' }}>
            登録不要。シーンとムードを選ぶだけで、<strong style={{ color: C.ink, fontWeight: 600 }}>本番と同じAIエンジン</strong>がこの場でデザインを生成します。
          </p>
        </motion.div>

        {/* ATELIER — washi stage frame: the card always rests here */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            position: 'relative',
            borderRadius: 26,
            padding: 'clamp(20px,4vw,34px) clamp(16px,4vw,30px) clamp(22px,4vw,30px)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(250,247,239,0.58) 100%)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 30px 70px -34px rgba(20,28,52,0.42), inset 0 1px 0 rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            overflow: 'hidden',
          }}
        >
          {/* faint top vignette — residue of the hero's dark sky */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 90, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(13,20,48,0.06), transparent)',
          }} />

          {/* THE STAGE */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {stageArea}
          </div>

          {/* CONTROLS below the stage */}
          {showControls && (
            <div style={{ position: 'relative', zIndex: 1, marginTop: 6 }}>
              {/* Step indicators */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '6px 0 22px' }}>
                {[1, 2, 3].map(s => (
                  <button
                    key={s}
                    onClick={() => { if (s <= step) { setStep(s as 1 | 2 | 3); if (s < 3) resetResult() } }}
                    className="lp-demo-soft"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                      borderRadius: 999, border: 'none', fontSize: 12, fontFamily: 'var(--font-lp-sans)',
                      fontWeight: step === s ? 600 : 400,
                      color: step >= s ? C.ink : C.inkMute,
                      background: step === s ? 'rgba(255,255,255,0.85)' : 'transparent',
                      boxShadow: step === s ? '0 2px 10px -4px rgba(20,28,52,0.25)' : 'none',
                      cursor: s <= step ? 'pointer' : 'default',
                    }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: step >= s ? C.accent : 'rgba(26,39,68,0.18)',
                      color: C.paper, fontSize: 11, display: 'grid', placeItems: 'center',
                    }}>{s}</span>
                    {s === 1 ? 'シーン' : s === 2 ? 'メッセージ' : '生成'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Scene selection — mini greeting-card tiles */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{ textAlign: 'center', fontSize: 14, color: C.inkSoft, marginBottom: 16, fontWeight: 500, fontFamily: 'var(--font-lp-sans)' }}>
                      どんなシーンで贈りますか？
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                      {DEMO_TEMPLATES.map((t, i) => (
                        <button
                          key={t.id}
                          onClick={() => handleTemplateSelect(i)}
                          className="lp-demo-tile"
                          style={{
                            background: t.bg,
                            border: selectedIdx === i ? `2px solid ${t.accent}` : '2px solid rgba(255,255,255,0.5)',
                            borderRadius: 14, padding: 0, cursor: 'pointer',
                            textAlign: 'left', position: 'relative', overflow: 'hidden',
                            height: 104, boxShadow: '0 8px 22px -14px rgba(20,28,52,0.4)',
                          }}
                        >
                          <span style={{ position: 'absolute', inset: 7, border: `1px solid ${t.accent}`, opacity: 0.28, borderRadius: 8, pointerEvents: 'none' }} />
                          <span style={{
                            position: 'absolute', left: 14, top: 12,
                            fontFamily: 'var(--font-lp-mono)', fontSize: 8, letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: t.accent, opacity: 0.8,
                          }}>♥ for you</span>
                          <span style={{
                            position: 'absolute', left: 14, bottom: 30,
                            fontFamily: t.headingFont, fontStyle: 'italic', fontSize: 21,
                            color: t.accent, lineHeight: 1,
                          }}>{t.heading}</span>
                          <span style={{
                            position: 'absolute', left: 14, bottom: 12, fontSize: 12.5,
                            color: t.textColor, fontWeight: 600, fontFamily: 'var(--font-lp-sans)',
                          }}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Message + mood */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <p style={{ fontSize: 13, color: C.inkSoft, marginBottom: 8, fontWeight: 600, fontFamily: 'var(--font-lp-sans)' }}>
                        メッセージ
                      </p>
                      {/* letter-paper surface */}
                      <div style={{
                        borderRadius: 12, padding: 4,
                        background: 'repeating-linear-gradient(180deg, #FBF8F1, #FBF8F1 27px, rgba(26,39,68,0.07) 28px)',
                        border: '1px solid rgba(184,153,104,0.35)',
                        boxShadow: 'inset 0 1px 6px rgba(20,28,52,0.05)',
                      }}>
                        <textarea
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="お誕生日おめでとう！"
                          rows={4}
                          maxLength={500}
                          style={{
                            width: '100%', border: 'none', borderRadius: 9, padding: '8px 12px',
                            fontSize: 15.5, lineHeight: '28px', color: C.ink, resize: 'none',
                            fontFamily: 'var(--font-lp-serif)', outline: 'none', background: 'transparent',
                          }}
                        />
                      </div>

                      <p style={{ fontSize: 13, color: C.inkSoft, margin: '18px 0 8px', fontWeight: 600, fontFamily: 'var(--font-lp-sans)' }}>
                        ムード（雰囲気）
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {MOOD_OPTIONS.map(m => (
                          <button
                            key={m.id}
                            onClick={() => setMood(m.id)}
                            className="lp-demo-soft"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                              borderRadius: 999, fontSize: 13, fontWeight: mood === m.id ? 600 : 400, fontFamily: 'var(--font-lp-sans)',
                              border: mood === m.id ? '1.5px solid var(--lp-terracotta)' : `1.5px solid ${C.line}`,
                              background: mood === m.id ? 'rgba(176,58,46,0.08)' : 'rgba(255,255,255,0.65)',
                              color: mood === m.id ? C.ink : C.inkSoft,
                              boxShadow: mood === m.id ? '0 0 0 3px rgba(176,58,46,0.10)' : 'none',
                              cursor: 'pointer',
                            }}
                          >
                            <span>{m.emoji}</span>{m.label}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleGenerate}
                        disabled={!message.trim()}
                        className="lp-demo-soft"
                        style={{
                          marginTop: 22, width: '100%', padding: '15px 0', borderRadius: 999, border: 'none',
                          background: message.trim() ? C.accent : 'rgba(26,39,68,0.25)', color: 'var(--lp-cream-soft)',
                          fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-lp-sans)', cursor: message.trim() ? 'pointer' : 'default',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          boxShadow: message.trim() ? '0 14px 34px -10px rgba(176,58,46,0.55)' : 'none',
                        }}
                      >
                        <Sparkles style={{ width: 16, height: 16 }} />
                        AIでデザインを生成する
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: result controls (variant switch + CTA) */}
                {step === 3 && hasResult && variants && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Variant switcher */}
                    {variants.length > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 4 }}>
                        {variants.map((v, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedVariant(i)}
                            aria-label={`デザイン${VARIANT_LABELS[i] ?? i + 1}`}
                            className="lp-demo-soft"
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            }}
                          >
                            <span style={{
                              width: 50, borderRadius: 8, overflow: 'hidden', lineHeight: 0,
                              border: selectedVariant === i ? '2px solid var(--lp-terracotta)' : `2px solid ${C.line}`,
                              boxShadow: selectedVariant === i ? '0 0 0 3px rgba(176,58,46,0.12)' : 'none',
                            }}>
                              <CanvasStageView canvasData={v} animate={false} />
                            </span>
                            <span style={{
                              fontSize: 11, fontFamily: 'var(--font-lp-sans)',
                              fontWeight: selectedVariant === i ? 600 : 400,
                              color: selectedVariant === i ? C.ink : C.inkMute,
                            }}>{VARIANT_LABELS[i] ?? `案${i + 1}`}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <p style={{ textAlign: 'center', fontSize: 13, color: C.inkMute, marginTop: 16, fontFamily: 'var(--font-lp-sans)' }}>
                      ✨ これは本番と同じAIエンジンで生成したデザインです
                    </p>

                    {/* CTA */}
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                        <Link href="/create" style={ctaPrimaryBigStyle}>
                          <Sparkles style={{ width: 18, height: 18 }} />
                          このデザインで本格的に作る
                          <ArrowRight style={{ width: 18, height: 18 }} />
                        </Link>
                        <Link href="/login" style={ctaSecondaryStyle}>
                          <LogIn style={{ width: 14, height: 14 }} />
                          ログインして保存・共有する
                        </Link>
                        <button onClick={handleRetry} style={linkButtonStyle}>
                          別のシーンで試す
                        </button>
                      </div>
                      <p style={{ fontSize: 12, color: C.inkMute, marginTop: 14, fontFamily: 'var(--font-lp-sans)', letterSpacing: '0.03em' }}>
                        登録不要 · 3分で完成 · クレジットカード不要
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

const ctaPrimaryStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999,
  background: 'var(--lp-ink)', color: 'var(--lp-cream-soft)', fontSize: 14, fontWeight: 600,
  fontFamily: 'var(--font-lp-sans)', textDecoration: 'none',
  boxShadow: '0 12px 34px -10px rgba(20,28,52,0.5)',
}

const ctaPrimaryBigStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 32px', borderRadius: 999,
  background: 'var(--lp-terracotta)', color: 'var(--lp-cream-soft)', fontSize: 15.5, fontWeight: 700,
  fontFamily: 'var(--font-lp-sans)', textDecoration: 'none', letterSpacing: '0.02em',
  boxShadow: '0 16px 38px -12px rgba(176,58,46,0.6)',
}

const ctaSecondaryStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', borderRadius: 999,
  background: 'transparent', border: '1px solid var(--lp-paper-line)', color: 'var(--lp-ink-soft)',
  fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-lp-sans)', textDecoration: 'none',
}

const linkButtonStyle: React.CSSProperties = {
  background: 'none', border: 'none', color: 'var(--lp-ink-mute)', fontSize: 13, cursor: 'pointer',
  textDecoration: 'underline', fontFamily: 'var(--font-lp-sans)',
}
