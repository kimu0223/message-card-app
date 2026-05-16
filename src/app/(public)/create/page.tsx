'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, FileText, Sparkles } from 'lucide-react'
import AIDesignWizard from '@/components/editor/ai-design/AIDesignWizard'
import Logo from '@/components/shared/Logo'
import { CARD_TEMPLATES, CARD_SCENES } from '@/components/lp/CardTemplates'
import type { CanvasData } from '@/types/card'
import { analytics } from '@/lib/analytics'

const GUEST_STORAGE_KEY = 'guestEditorState'

const BLANK_CANVAS_DATA: CanvasData = {
  version: '1.0',
  size: 'a4_landscape',
  background: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  elements: [
    {
      id: 'default-text',
      type: 'text',
      x: 0.5,
      y: 0.5,
      width: 400,
      height: 60,
      rotation: 0,
      opacity: 1,
      text: 'ここにメッセージを入力',
      fontSize: 24,
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: '#ffffff',
      align: 'center',
      lineHeight: 1.5,
      zIndex: 1,
    },
  ],
  animation: null,
}

export default function CreatePage() {
  return (
    <Suspense>
      <CreatePageContent />
    </Suspense>
  )
}

function CreatePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateIdParam = searchParams.get('templateId')
  const [showAIWizard, setShowAIWizard] = useState(false)
  const [activeScene, setActiveScene] = useState<string>('all')

  // LP の「使う →」から直接テンプレートが指定された場合は即エディタへ
  useEffect(() => {
    if (templateIdParam) {
      const template = CARD_TEMPLATES.find(t => t.id === templateIdParam)
      if (template) {
        const canvasData: CanvasData = {
          version: '1.0',
          size: 'a4_portrait',
          background: { type: 'color', value: '#ffffff' },
          elements: [],
          animation: null,
          templateId: templateIdParam,
        }
        try {
          localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify({ canvasData, title: template.title }))
        } catch { /* ignore */ }
        router.push('/create/editor')
      }
    }
  }, [templateIdParam, router])

  const handleAIDesignComplete = (canvasData: CanvasData) => {
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify({ canvasData, title: 'AIデザインカード', source: 'ai' }))
    } catch { /* ignore */ }
    setShowAIWizard(false)
    router.push('/create/editor')
  }

  const handleLPTemplateSelect = (templateId: string) => {
    const template = CARD_TEMPLATES.find(t => t.id === templateId)
    if (!template) return
    analytics.templateSelected(templateId, template.scene ?? 'unknown')
    const canvasData: CanvasData = {
      version: '1.0',
      size: 'a4_portrait',
      background: { type: 'color', value: '#ffffff' },
      elements: [],
      animation: null,
      templateId,
    }
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify({ canvasData, title: template.title, source: 'template' }))
    } catch { /* ignore */ }
    router.push('/create/editor')
  }

  const handleBlankStart = () => {
    analytics.blankStarted()
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify({ canvasData: BLANK_CANVAS_DATA, title: '無題のカード', source: 'blank' }))
    } catch { /* ignore */ }
    router.push('/create/editor')
  }

  const filteredTemplates = activeScene === 'all'
    ? CARD_TEMPLATES
    : CARD_TEMPLATES.filter(t => t.scene === activeScene)

  return (
    <div>
      {/* ─── Subnav ─── */}
      <nav className="lp-subnav">
        <div className="lp-subnav-inner">
          <Link href="/" className="lp-subnav-back">
            <ChevronLeft style={{ width: 18, height: 18 }} />
            戻る
          </Link>
          <Logo />
          <span className="lp-subnav-meta">登録不要 &middot; 3分で完成</span>
        </div>
      </nav>

      {/* ─── Main content ─── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1rem 3rem' }} className="sm:px-8">
        {/* Hero */}
        <div className="create-hero">
          <div className="lp-eyebrow">
            <span>Step 1 of 4 &mdash; Choose</span>
          </div>
          <h1 className="create-title">どんなシーンで贈りますか？</h1>
          <p className="create-lede">
            テンプレートを選ぶか、AIにデザインしてもらいましょう。
            <br />
            もちろん白紙からオリジナルを作ることもできます。
          </p>
        </div>

        {/* AI Design button */}
        <button
          className="create-blank"
          onClick={() => { analytics.aiWizardOpened(); setShowAIWizard(true) }}
          style={{ marginBottom: 12, borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.04)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Sparkles style={{ width: 22, height: 22, color: '#7c3aed' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#7c3aed' }}>
                AIにデザインしてもらう
              </h4>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--lp-ink-mute)', lineHeight: 1.5 }}>
                3つの質問に答えるだけで、プロ品質のデザインを生成
              </p>
            </div>
          </div>
          <span className="lp-ghost-btn" style={{ flexShrink: 0, color: '#7c3aed' }}>試す &rarr;</span>
        </button>

        {/* Blank canvas */}
        <button className="create-blank" onClick={handleBlankStart} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--lp-cream-deep)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <FileText style={{ width: 22, height: 22, color: 'var(--lp-ink-soft)' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--lp-ink)' }}>
                白紙から始める
              </h4>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--lp-ink-mute)', lineHeight: 1.5 }}>
                テンプレートを使わず、自由にデザインできます
              </p>
            </div>
          </div>
          <span className="lp-ghost-btn" style={{ flexShrink: 0 }}>始める &rarr;</span>
        </button>

        {/* ─── LP Template Grid ─── */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: '0.95rem', color: 'var(--lp-ink)' }}>
            テンプレートから選ぶ
          </p>
          {/* Scene filter tabs */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4, WebkitOverflowScrolling: 'touch' as const }}>
            {CARD_SCENES.map(scene => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene.id)}
                className="lp-gallery-tab"
                data-active={activeScene === scene.id}
                style={{ fontSize: 13, flexShrink: 0 }}
              >
                <span>{scene.glyph}</span> {scene.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3">
          {filteredTemplates.map(template => {
            const Comp = template.Comp
            const sceneDef = CARD_SCENES.find(s => s.id === template.scene)
            return (
              <button
                key={template.id}
                onClick={() => handleLPTemplateSelect(template.id)}
                style={{
                  background: 'none',
                  border: '2px solid transparent',
                  borderRadius: 12,
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--lp-ink)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ aspectRatio: '220 / 320', overflow: 'hidden', borderRadius: 10, position: 'relative' }}>
                  <Comp />
                </div>
                <div style={{ padding: '8px 4px 4px' }}>
                  <p style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--lp-ink)',
                    fontFamily: 'var(--font-lp-display)',
                    fontStyle: 'italic',
                  }}>
                    {template.title}
                  </p>
                  {sceneDef && (
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--lp-ink-mute)' }}>
                      {sceneDef.label}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* AI Design Wizard Modal */}
      {showAIWizard && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', padding: 16 }}>
          <div style={{ width: '100%', maxWidth: 420, height: '90vh', maxHeight: '90vh', borderRadius: 16, overflow: 'hidden', background: 'white', boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}>
            <AIDesignWizard
              onComplete={handleAIDesignComplete}
              onClose={() => setShowAIWizard(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
