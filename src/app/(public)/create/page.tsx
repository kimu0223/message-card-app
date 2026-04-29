'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, FileText } from 'lucide-react'
import TemplateSelector from '@/components/editor/TemplateSelector'
import Logo from '@/components/shared/Logo'
import type { Template } from '@/types/template'

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
    </div>
  )
}
