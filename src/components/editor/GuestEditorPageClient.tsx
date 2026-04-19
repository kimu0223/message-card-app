'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ChevronLeft, Eye, Share2, Sparkles,
  ZoomIn, ZoomOut, CloudOff,
} from 'lucide-react'
import CardCanvas from '@/components/card/CardCanvas'
import EditorPanel from '@/components/editor/EditorPanel'
import CardPreview from '@/components/card/CardPreview'
import LoginPromptModal from '@/components/auth/LoginPromptModal'
import { useEditorStore } from '@/store/editorStore'
import type { CanvasData, CanvasElement } from '@/types/card'

const GUEST_STORAGE_KEY = 'guestEditorState'

export default function GuestEditorPageClient() {
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)
  const [loginPromptReason, setLoginPromptReason] = useState<'save' | 'share' | 'ai' | null>(null)

  const {
    title, setTitle,
    canvasData, initFromCard,
    selectedElementId, setSelectedElementId,
    zoom, setZoom,
    showAIPanel, toggleAIPanel,
    updateElement, addElement, setBackground, setAnimation,
  } = useEditorStore()

  // localStorageから初期化
  useEffect(() => {
    try {
      const raw = localStorage.getItem(GUEST_STORAGE_KEY)
      if (raw) {
        const { canvasData: savedData, title: savedTitle } = JSON.parse(raw)
        initFromCard({ id: '__guest__', title: savedTitle ?? '無題のカード', canvasData: savedData })
      } else {
        // localStorageになければデフォルト状態で起動（/create未経由で直アクセスされた場合）
        initFromCard({
          id: '__guest__',
          title: '無題のカード',
          canvasData: {
            version: '1.0',
            size: 'a4_landscape',
            background: { type: 'color', value: '#ffffff' },
            elements: [],
            animation: null,
          },
        })
      }
    } catch {
      // パース失敗時はデフォルト
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // canvasData/titleが変わったらlocalStorageに保存
  const saveToLocal = useCallback((data: CanvasData, t: string) => {
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify({ canvasData: data, title: t }))
    } catch {
      // ストレージ満杯などは無視
    }
  }, [])

  useEffect(() => {
    if (canvasData && title) {
      saveToLocal(canvasData, title)
    }
  }, [canvasData, title, saveToLocal])

  const handleElementChange = (id: string, updates: Partial<CanvasElement>) => {
    updateElement(id, updates)
  }

  const handleAIButtonClick = () => {
    setLoginPromptReason('ai')
  }

  if (!canvasData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-zinc-400">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-100">
      {/* ゲストバナー */}
      <div className="flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 py-2 px-4 text-xs text-amber-700">
        <CloudOff className="h-3.5 w-3.5 shrink-0" />
        <span>ゲストモードです。データはこのブラウザのみに保存されます。</span>
        <button
          className="ml-1 font-semibold underline hover:no-underline"
          onClick={() => setLoginPromptReason('save')}
        >
          ログインして保存
        </button>
      </div>

      {/* エディタツールバー */}
      <div className="flex h-12 items-center border-b border-zinc-200 bg-white px-4 gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push('/create')} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">テンプレート</span>
        </Button>

        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="h-8 w-48 border-none bg-transparent text-sm font-medium shadow-none focus-visible:ring-0"
          placeholder="カードタイトル"
        />

        <div className="ml-auto flex items-center gap-2">
          {/* ズーム */}
          <div className="hidden items-center gap-1 sm:flex">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}>
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="min-w-[3rem] text-center text-xs text-zinc-500">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* AI（ログイン促進） */}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleAIButtonClick}>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </Button>

          {/* プレビュー */}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowPreview(true)}>
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">プレビュー</span>
          </Button>

          {/* シェア（ログイン促進） */}
          <Button size="sm" className="gap-1.5" onClick={() => setLoginPromptReason('share')}>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">シェア</span>
          </Button>
        </div>
      </div>

      {/* メインエリア */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左パネル */}
        <div className="w-64 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white">
          <EditorPanel
            canvasData={canvasData}
            selectedElementId={selectedElementId}
            onUpdateElement={(id, updates) => updateElement(id, updates)}
            onAddElement={addElement}
            onSetBackground={setBackground}
            onSetAnimation={setAnimation}
          />
        </div>

        {/* キャンバスエリア */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto bg-zinc-200 p-8">
          <div id="card-canvas-export">
            <CardCanvas
              canvasData={canvasData}
              selectedElementId={selectedElementId}
              zoom={zoom}
              onElementSelect={setSelectedElementId}
              onElementChange={handleElementChange}
            />
          </div>
        </div>

        {/* AIパネル代替: ログイン促進バナー */}
        {showAIPanel && (
          <div className="w-72 shrink-0 border-l border-zinc-200 bg-white p-6 flex flex-col items-center justify-center text-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Sparkles className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-zinc-800">AIメッセージ生成</h3>
            <p className="text-sm text-zinc-500">
              ログインするとAIがシーンに合わせた
              メッセージを提案してくれます。
            </p>
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => setLoginPromptReason('ai')}
            >
              ログインして使用
            </Button>
            <button onClick={toggleAIPanel} className="text-xs text-zinc-400 hover:text-zinc-600">
              閉じる
            </button>
          </div>
        )}
      </div>

      {/* プレビューモーダル */}
      {showPreview && (
        <CardPreview
          canvasData={canvasData}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onShare={() => { setShowPreview(false); setLoginPromptReason('share') }}
          onDownload={() => setShowPreview(false)}
        />
      )}

      {/* ログイン促進モーダル */}
      {loginPromptReason && (
        <LoginPromptModal
          isOpen={true}
          onClose={() => setLoginPromptReason(null)}
          reason={loginPromptReason}
        />
      )}
    </div>
  )
}
