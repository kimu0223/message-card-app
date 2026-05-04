'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, FileText, Sparkles } from 'lucide-react'
import TemplateSelector from '@/components/editor/TemplateSelector'
import AIDesignWizard from '@/components/editor/ai-design/AIDesignWizard'
import Logo from '@/components/shared/Logo'
import type { Template } from '@/types/template'
import type { CanvasData } from '@/types/card'

const GUEST_STORAGE_KEY = 'guestEditorState'

const BLANK_CANVAS_DATA = {
  version: '1.0',
  size: 'a4_landscape' as const,
  background: { type: 'gradient' as const, value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  elements: [
    {
      id: 'default-text',
      type: 'text' as const,
      x: 0.5,
      y: 0.5,
      text: 'ここにメッセージを入力',
      fontSize: 24,
      fontFamily: 'sans-serif',
      fontWeight: 'normal' as const,
      color: '#ffffff',
      align: 'center' as const,
      zIndex: 1,
    },
  ],
  animation: null,
}

export default function CreatePage() {
  const router = useRouter()
  const [showAIWizard, setShowAIWizard] = useState(false)

  const handleAIDesignComplete = (canvasData: CanvasData) => {
    try {
      localStorage.setItem(
        GUEST_STORAGE_KEY,
        JSON.stringify({ canvasData, title: 'AIデザインカード' })
      )
    } catch {
      // ignore
    }
    setShowAIWizard(false)
    router.push('/create/editor')
  }

  const handleTemplateSelect = (template: Template) => {
    try {
      localStorage.setItem(
        GUEST_STORAGE_KEY,
        JSON.stringify({ canvasData: template.canvasData, title: template.name })
      )
    } catch {
      // ストレージエラーは無視
    }
    router.push('/create/editor')
  }

  const handleBlankStart = () => {
    try {
      localStorage.setItem(
        GUEST_STORAGE_KEY,
        JSON.stringify({ canvasData: BLANK_CANVAS_DATA, title: '無題のカード' })
      )
    } catch {
      // ストレージエラーは無視
    }
    router.push('/create/editor')
  }

  return (
    <div>
      {/* ─── Subnav ─── */}
      <nav className="lp-subnav">
        <div className="lp-subnav-inner">
          {/* Back */}
          <Link href="/" className="lp-subnav-back">
            <ChevronLeft style={{ width: 18, height: 18 }} />
            戻る
          </Link>

          <Logo />

          {/* Meta */}
          <span className="lp-subnav-meta">登録不要 &middot; 3分で完成</span>
        </div>
      </nav>

      {/* ─── Main content ─── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 2rem 4rem' }}>
        {/* Hero */}
        <div className="create-hero">
          <div className="lp-eyebrow">
            <span>Step 1 of 4 &mdash; Choose</span>
          </div>
          <h1 className="create-title">どんなシーンで贈りますか？</h1>
          <p className="create-lede">
            シーンを選ぶと、ぴったりのテンプレートが表示されます。
            <br />
            もちろん白紙からオリジナルを作ることもできます。
          </p>
        </div>

        {/* AI Design button */}
        <button
          className="create-blank"
          onClick={() => setShowAIWizard(true)}
          style={{ marginBottom: 12, borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.04)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(139,92,246,0.1)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles style={{ width: 22, height: 22, color: '#7c3aed' }} />
            </div>
            <div>
              <h4
                style={{
                  margin: 0,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#7c3aed',
                }}
              >
                AIにデザインしてもらう
              </h4>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '0.85rem',
                  color: 'var(--lp-ink-mute)',
                  lineHeight: 1.5,
                }}
              >
                3つの質問に答えるだけで、プロ品質のデザインを生成
              </p>
            </div>
          </div>
          <span className="lp-ghost-btn" style={{ flexShrink: 0, color: '#7c3aed' }}>
            試す &rarr;
          </span>
        </button>

        {/* Blank canvas */}
        <button className="create-blank" onClick={handleBlankStart}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'var(--lp-cream-deep)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <FileText style={{ width: 22, height: 22, color: 'var(--lp-ink-soft)' }} />
            </div>
            <div>
              <h4
                style={{
                  margin: 0,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--lp-ink)',
                }}
              >
                白紙から始める
              </h4>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '0.85rem',
                  color: 'var(--lp-ink-mute)',
                  lineHeight: 1.5,
                }}
              >
                テンプレートを使わず、自由にデザインできます
              </p>
            </div>
          </div>
          <span className="lp-ghost-btn" style={{ flexShrink: 0 }}>
            始める &rarr;
          </span>
        </button>

        {/* Template selector */}
        <TemplateSelector onSelect={handleTemplateSelect} />
      </div>

      {/* AI Design Wizard Modal */}
      {showAIWizard && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)',
            padding: 16,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              height: '85vh',
              borderRadius: 16,
              overflow: 'hidden',
              background: 'white',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
            }}
          >
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
