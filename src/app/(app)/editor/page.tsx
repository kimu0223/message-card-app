'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import TemplateSelector from '@/components/editor/TemplateSelector'
import type { Template } from '@/types/template'
import type { CanvasData } from '@/types/card'

export default function NewEditorPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleTemplateSelect = async (template: Template) => {
    if (isCreating) return
    setIsCreating(true)

    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${template.name}のカード`,
          templateId: template.id,
          canvasData: template.canvasData,
          size: template.canvasData.size,
          animation: template.canvasData.animation?.type ?? 'none',
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        if (err.error === 'limit_exceeded') {
          toast.error('今月の作成上限（3枚）に達しました。Proプランにアップグレードしてください。')
          return
        }
        throw new Error('カードの作成に失敗しました')
      }

      const { id } = await res.json()
      router.push(`/editor/${id}`)
    } catch (e) {
      toast.error('カードの作成に失敗しました。再度お試しください。')
    } finally {
      setIsCreating(false)
    }
  }

  const handleBlankCard = async () => {
    if (isCreating) return
    setIsCreating(true)

    const blankCanvas: CanvasData = {
      version: '1.0',
      size: 'a4_landscape',
      background: { type: 'gradient', value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
      elements: [
        {
          id: 'el_title',
          type: 'text',
          x: 561,
          y: 340,
          width: 600,
          height: 80,
          rotation: 0,
          opacity: 1,
          zIndex: 1,
          text: 'メッセージを入力してください',
          fontFamily: 'Noto Sans JP',
          fontSize: 32,
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: '#374151',
          align: 'center',
          lineHeight: 1.6,
        },
      ],
      animation: null,
    }

    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '新しいカード',
          canvasData: blankCanvas,
          size: 'a4_landscape',
          animation: 'none',
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        if (err.error === 'limit_exceeded') {
          toast.error('今月の作成上限（3枚）に達しました。')
          return
        }
        throw new Error()
      }

      const { id } = await res.json()
      router.push(`/editor/${id}`)
    } catch {
      toast.error('カードの作成に失敗しました。')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">カードを作成</h1>
          <p className="mt-2 text-zinc-500">テンプレートを選ぶか、白紙から始めましょう</p>
        </div>

        {/* 白紙カードボタン */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={handleBlankCard}
            disabled={isCreating}
            className="flex items-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 bg-white px-6 py-4 text-sm font-medium text-zinc-600 transition hover:border-zinc-400 hover:bg-zinc-50 disabled:opacity-50"
          >
            <span className="text-2xl">✏️</span>
            白紙から始める
          </button>
        </div>

        <div className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
          または テンプレートを選ぶ
        </div>

        <TemplateSelector onSelect={handleTemplateSelect} />

        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="rounded-xl bg-white px-8 py-6 text-center shadow-xl">
              <div className="mb-3 text-3xl">✨</div>
              <p className="font-medium text-zinc-700">カードを準備中...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
