'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ChevronLeft, Eye, Share2, Download, Sparkles,
  ZoomIn, ZoomOut, Check, Heart
} from 'lucide-react'
import CardCanvas from '@/components/card/CardCanvas'
import EditorPanel from '@/components/editor/EditorPanel'
import AIAssistPanel from '@/components/editor/AIAssistPanel'
import CardPreview from '@/components/card/CardPreview'
import ShareDialog from '@/components/share/ShareDialog'
import ExportPanel from '@/components/share/ExportPanel'
import { useEditorStore } from '@/store/editorStore'
import type { CanvasData, CanvasElement, Background, AnimationConfig, TextElement } from '@/types/card'

interface EditorPageClientProps {
  card: {
    id: string
    title: string
    canvasData: CanvasData
    status: string
    shareId: string | null
    isFavorite: boolean
  }
}

export default function EditorPageClient({ card }: EditorPageClientProps) {
  const router = useRouter()
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [isFavorite, setIsFavorite] = useState(card.isFavorite)
  const [showPreview, setShowPreview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [currentShareId, setCurrentShareId] = useState(card.shareId)
  const [isSavedIndicator, setIsSavedIndicator] = useState(false)

  const {
    title, setTitle,
    canvasData, setCanvasData, initFromCard,
    selectedElementId, setSelectedElementId,
    zoom, setZoom,
    showAIPanel, toggleAIPanel,
    isSaving, setIsSaving, setLastSavedAt,
    updateElement, addElement, setSize, setBackground, setAnimation,
  } = useEditorStore()

  // 初期化
  useEffect(() => {
    initFromCard({ id: card.id, title: card.title, canvasData: card.canvasData })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 自動保存 (debounce 2秒)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerSave = useCallback((data: CanvasData, t: string) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true)
      try {
        const res = await fetch(`/api/cards/${card.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: t, canvasData: data }),
        })
        if (res.ok) {
          setLastSavedAt(new Date())
          setIsSavedIndicator(true)
          setTimeout(() => setIsSavedIndicator(false), 2000)
        }
      } finally {
        setIsSaving(false)
      }
    }, 2000)
  }, [card.id, setIsSaving, setLastSavedAt])

  // canvasData / title の変更で自動保存
  useEffect(() => {
    if (canvasData && title) {
      triggerSave(canvasData, title)
    }
    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current) }
  }, [canvasData, title, triggerSave])

  const handleElementChange = (id: string, updates: Partial<CanvasElement>) => {
    updateElement(id, updates)
  }

  const handleApplyAIMessage = (message: string) => {
    if (selectedElementId) {
      updateElement(selectedElementId, { text: message } as Partial<TextElement>)
    } else {
      // 最初のtextエレメントに適用、なければ追加
      const firstText = canvasData?.elements.find(e => e.type === 'text')
      if (firstText) {
        updateElement(firstText.id, { text: message } as Partial<TextElement>)
      }
    }
    toast.success('メッセージを適用しました')
  }

  const handleApplyAIDesign = (newCanvasData: CanvasData) => {
    setCanvasData(newCanvasData)
    toggleAIPanel()
    toast.success('AIデザインを適用しました')
  }

  const handleToggleFavorite = async () => {
    const newVal = !isFavorite
    setIsFavorite(newVal)
    await fetch(`/api/cards/${card.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: newVal }),
    })
  }

  if (!canvasData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-zinc-400">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-zinc-100">
      {/* エディタツールバー */}
      <div className="flex h-12 items-center border-b border-zinc-200 bg-white px-4 gap-3">
        {/* 戻るボタン */}
        <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">戻る</span>
        </Button>

        {/* タイトル編集 */}
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="h-8 w-48 border-none bg-transparent text-sm font-medium shadow-none focus-visible:ring-0"
          placeholder="カードタイトル"
        />

        {/* 保存インジケーター */}
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          {isSaving ? (
            <span>保存中...</span>
          ) : isSavedIndicator ? (
            <span className="flex items-center gap-1 text-emerald-600">
              <Check className="h-3 w-3" /> 保存済み
            </span>
          ) : null}
        </div>

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

          {/* AI */}
          <Button variant={showAIPanel ? 'default' : 'outline'} size="sm" className="gap-1.5" onClick={toggleAIPanel}>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </Button>

          {/* お気に入り */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleToggleFavorite}>
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-zinc-400'}`} />
          </Button>

          {/* プレビュー */}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowPreview(true)}>
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">プレビュー</span>
          </Button>

          {/* シェア */}
          <Button size="sm" className="gap-1.5" onClick={() => setShowShare(true)}>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">シェア</span>
          </Button>
        </div>
      </div>

      {/* メインエリア */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左パネル: エディタ設定 */}
        <div className="w-64 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white">
          <EditorPanel
            canvasData={canvasData}
            selectedElementId={selectedElementId}
            onUpdateElement={(id, updates) => updateElement(id, updates)}
            onAddElement={addElement}
            onSetSize={setSize}
            onSetBackground={setBackground}
            onSetAnimation={setAnimation}
          />
        </div>

        {/* キャンバスエリア */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto bg-zinc-200 p-8" ref={canvasContainerRef} id="card-canvas-container">
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

        {/* 右パネル: AIアシスト */}
        {showAIPanel && (
          <div className="w-72 shrink-0 overflow-y-auto border-l border-zinc-200 bg-white">
            <AIAssistPanel
              isOpen={showAIPanel}
              onClose={toggleAIPanel}
              onApplyMessage={handleApplyAIMessage}
              onApplyDesign={handleApplyAIDesign}
            />
          </div>
        )}
      </div>

      {/* モーダル類 */}
      {showPreview && (
        <CardPreview
          canvasData={canvasData}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onShare={() => { setShowPreview(false); setShowShare(true) }}
          onDownload={() => setShowExport(true)}
        />
      )}

      {showShare && (
        <ShareDialog
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          cardId={card.id}
          shareId={currentShareId}
          cardTitle={title}
          onPublished={(sid) => setCurrentShareId(sid)}
        />
      )}

      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 font-semibold">エクスポート</h3>
            <ExportPanel targetElementId="card-canvas-export" filename={title} />
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowExport(false)}>
              閉じる
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
