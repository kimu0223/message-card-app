'use client'

import { useRouter } from 'next/navigation'
import { Sparkles, FileText } from 'lucide-react'
import TemplateSelector from '@/components/editor/TemplateSelector'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-zinc-50">
      {/* ヘッダー */}
      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <span className="font-bold text-zinc-900">CardMagic</span>
          </div>
          <p className="text-sm text-zinc-500">テンプレートを選んでスタート</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 md:text-3xl">
            テンプレートを選んでください
          </h1>
          <p className="mt-2 text-zinc-500">シーンを選ぶと、ぴったりのデザインが表示されます</p>
        </div>

        {/* 白紙から始めるボタン */}
        <div className="mb-8 flex justify-center">
          <Button
            variant="outline"
            className="gap-2 border-dashed border-zinc-300 text-zinc-600 hover:border-zinc-400"
            onClick={handleBlankStart}
          >
            <FileText className="h-4 w-4" />
            白紙から始める
          </Button>
        </div>

        <TemplateSelector onSelect={handleTemplateSelect} />
      </div>
    </div>
  )
}
