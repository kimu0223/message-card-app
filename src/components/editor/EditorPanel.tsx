'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Type, Palette, Sparkles, Mail } from 'lucide-react'
import { nanoid } from 'nanoid'
import type { CanvasData, CanvasElement, Background, AnimationConfig, TextElement, AnimationType, CardSize, EnvelopeConfig, EnvelopeStyle } from '@/types/card'
import { CARD_SIZES } from '@/types/card'

const FONTS = [
  { value: 'Noto Sans JP', label: 'Noto Sans' },
  { value: 'Noto Serif JP', label: 'Noto Serif' },
  { value: 'M PLUS Rounded 1c', label: 'M PLUS Rounded' },
  { value: 'Kosugi Maru', label: 'Kosugi Maru' },
  { value: 'Sawarabi Gothic', label: 'Sawarabi Gothic' },
]

const PRESET_COLORS = [
  '#ffffff', '#f8f9fa', '#fff9c4', '#fce4ec', '#e8f5e9',
  '#e3f2fd', '#f3e5f5', '#1a1a1a', '#e91e63', '#2196f3',
]

const ANIMATIONS: { value: AnimationType; label: string; emoji: string }[] = [
  { value: 'none', label: 'なし', emoji: '⬜' },
  { value: 'fade_in', label: 'フェードイン', emoji: '✨' },
  { value: 'slide_up', label: 'スライドアップ', emoji: '⬆️' },
  { value: 'bounce', label: 'バウンス', emoji: '🏀' },
  { value: 'float', label: 'フロート', emoji: '🎈' },
  { value: 'heartbeat', label: 'ハートビート', emoji: '💓' },
  { value: 'confetti', label: 'コンフェッティ', emoji: '🎊' },
  { value: 'fireworks', label: '花火', emoji: '🎆' },
  { value: 'sparkle', label: 'スパークル', emoji: '⭐' },
  { value: 'snow', label: '雪', emoji: '❄️' },
  { value: 'sakura', label: '桜', emoji: '🌸' },
  { value: 'typewriter', label: 'タイプライター', emoji: '⌨️' },
]

const GRADIENT_PRESETS = [
  { label: '桜', value: 'linear-gradient(135deg, #fff9c4 0%, #fce4ec 100%)' },
  { label: '空', value: 'linear-gradient(135deg, #e3f2fd 0%, #e8f5e9 100%)' },
  { label: '夜', value: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)' },
  { label: 'ゴールド', value: 'linear-gradient(135deg, #f8f3ee 0%, #e0c97f 100%)' },
  { label: 'パープル', value: 'linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)' },
  { label: 'サンセット', value: 'linear-gradient(135deg, #ff6b9d 0%, #ffa07a 100%)' },
]

const ENVELOPE_OPTIONS: { value: EnvelopeStyle; label: string; bg: string; accent: string; emoji: string }[] = [
  { value: 'none', label: 'なし', bg: '#f5f5f5', accent: '#999', emoji: '✖' },
  { value: 'classic', label: 'クラシック', bg: '#F4ECDC', accent: '#C97B5C', emoji: '✉' },
  { value: 'kraft', label: 'クラフト', bg: '#C4904A', accent: '#FFFCF5', emoji: '📦' },
  { value: 'floral', label: 'フローラル', bg: '#FFD6E7', accent: '#E0609A', emoji: '🌸' },
  { value: 'navy', label: 'ネイビー', bg: '#1A2D5A', accent: '#C9A96E', emoji: '⚓' },
  { value: 'sakura', label: '桜', bg: '#FFCCE0', accent: '#E8728A', emoji: '🌺' },
]

interface EditorPanelProps {
  canvasData: CanvasData
  selectedElementId: string | null
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void
  onAddElement: (element: CanvasElement) => void
  onSetSize: (size: CardSize) => void
  onSetBackground: (bg: Background) => void
  onSetAnimation: (anim: AnimationConfig | null) => void
  onSetEnvelope?: (env: EnvelopeConfig | undefined) => void
}

export default function EditorPanel({
  canvasData,
  selectedElementId,
  onUpdateElement,
  onAddElement,
  onSetSize,
  onSetBackground,
  onSetAnimation,
  onSetEnvelope,
}: EditorPanelProps) {
  const [bgType, setBgType] = useState<'color' | 'gradient'>(
    canvasData.background.type === 'gradient' ? 'gradient' : 'color'
  )
  const [senderName, setSenderName] = useState(canvasData.envelope?.senderName ?? '')

  const selectedElement = selectedElementId
    ? canvasData.elements.find(el => el.id === selectedElementId)
    : null
  const selectedText = selectedElement?.type === 'text' ? selectedElement as TextElement : null

  const currentEnvelopeStyle = canvasData.envelope?.style ?? 'none'

  const handleAddText = () => {
    const newEl: TextElement = {
      id: nanoid(),
      type: 'text',
      x: 200, y: 200, width: 400, height: 60,
      rotation: 0, opacity: 1,
      zIndex: canvasData.elements.length + 1,
      text: 'テキストを入力',
      fontFamily: 'Noto Sans JP',
      fontSize: 32,
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: '#1a1a1a',
      align: 'center',
      lineHeight: 1.5,
    }
    onAddElement(newEl)
  }

  const handleEnvelopeSelect = (style: EnvelopeStyle) => {
    if (!onSetEnvelope) return
    if (style === 'none') {
      onSetEnvelope(undefined)
    } else {
      onSetEnvelope({ style, senderName: senderName || undefined })
    }
  }

  const handleSenderNameChange = (name: string) => {
    setSenderName(name)
    if (!onSetEnvelope) return
    if (currentEnvelopeStyle !== 'none') {
      onSetEnvelope({ style: currentEnvelopeStyle, senderName: name || undefined })
    }
  }

  return (
    <div className="p-3">
      <Tabs defaultValue="text">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="text" className="text-xs px-1">
            <Type className="mr-1 h-3.5 w-3.5" /><span className="hidden sm:inline">テキスト</span><span className="sm:hidden">文字</span>
          </TabsTrigger>
          <TabsTrigger value="background" className="text-xs px-1">
            <Palette className="mr-1 h-3.5 w-3.5" /><span className="hidden sm:inline">背景</span><span className="sm:hidden">背景</span>
          </TabsTrigger>
          <TabsTrigger value="animation" className="text-xs px-1">
            <Sparkles className="mr-1 h-3.5 w-3.5" /><span className="hidden sm:inline">アニメ</span><span className="sm:hidden">動き</span>
          </TabsTrigger>
          <TabsTrigger value="envelope" className="text-xs px-1">
            <Mail className="mr-1 h-3.5 w-3.5" /><span className="hidden sm:inline">封筒</span><span className="sm:hidden">封筒</span>
          </TabsTrigger>
        </TabsList>

        {/* テキストタブ */}
        <TabsContent value="text" className="space-y-4 pt-3">
          <Button onClick={handleAddText} variant="outline" size="sm" className="w-full">
            <Type className="mr-2 h-4 w-4" />テキストを追加
          </Button>

          {selectedText ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-zinc-500">テキスト内容</Label>
                <Textarea
                  value={selectedText.text}
                  onChange={e => onUpdateElement(selectedText.id, { text: e.target.value })}
                  className="mt-1 text-sm"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-xs text-zinc-500">フォント</Label>
                <Select
                  value={selectedText.fontFamily}
                  onValueChange={v => v && onUpdateElement(selectedText.id, { fontFamily: v })}
                >
                  <SelectTrigger className="mt-1 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map(f => (
                      <SelectItem key={f.value} value={f.value} className="text-xs">{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-zinc-500">フォントサイズ</Label>
                  <span className="text-xs text-zinc-700">{selectedText.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={selectedText.fontSize}
                  onChange={e => onUpdateElement(selectedText.id, { fontSize: Number(e.target.value) })}
                  className="mt-1 w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={selectedText.fontWeight === 'bold' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 flex-1 text-xs font-bold"
                  onClick={() => onUpdateElement(selectedText.id, {
                    fontWeight: selectedText.fontWeight === 'bold' ? 'normal' : 'bold'
                  })}
                >
                  太字
                </Button>
                <Button
                  variant={selectedText.fontStyle === 'italic' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 flex-1 text-xs italic"
                  onClick={() => onUpdateElement(selectedText.id, {
                    fontStyle: selectedText.fontStyle === 'italic' ? 'normal' : 'italic'
                  })}
                >
                  斜体
                </Button>
              </div>

              <div className="flex gap-2">
                {(['left', 'center', 'right'] as const).map(align => (
                  <Button
                    key={align}
                    variant={selectedText.align === align ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 flex-1 text-xs"
                    onClick={() => onUpdateElement(selectedText.id, { align })}
                  >
                    {align === 'left' ? '左' : align === 'center' ? '中' : '右'}
                  </Button>
                ))}
              </div>

              <div>
                <Label className="text-xs text-zinc-500">文字色</Label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedText.color}
                    onChange={e => onUpdateElement(selectedText.id, { color: e.target.value })}
                    className="h-8 w-10 cursor-pointer rounded border"
                  />
                  <Input
                    value={selectedText.color}
                    onChange={e => onUpdateElement(selectedText.id, { color: e.target.value })}
                    className="h-8 flex-1 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="py-4 text-center text-xs text-zinc-400">
              テキストを選択すると<br />編集できます
            </p>
          )}
        </TabsContent>

        {/* 背景タブ */}
        <TabsContent value="background" className="space-y-4 pt-3">
          <div>
            <Label className="text-xs text-zinc-500">カードサイズ</Label>
            <Select
              value={canvasData.size}
              onValueChange={(v) => v && onSetSize(v as CardSize)}
            >
              <SelectTrigger className="mt-1 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(CARD_SIZES) as [CardSize, (typeof CARD_SIZES)[CardSize]][]).map(([key, config]) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant={bgType === 'color' ? 'default' : 'outline'} size="sm" className="flex-1 text-xs" onClick={() => setBgType('color')}>
              単色
            </Button>
            <Button variant={bgType === 'gradient' ? 'default' : 'outline'} size="sm" className="flex-1 text-xs" onClick={() => setBgType('gradient')}>
              グラデ
            </Button>
          </div>

          {bgType === 'color' ? (
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1.5">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => onSetBackground({ type: 'color', value: color })}
                    className="h-8 w-full rounded border border-zinc-200 transition hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={canvasData.background.type === 'color' ? canvasData.background.value : '#ffffff'}
                  onChange={e => onSetBackground({ type: 'color', value: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded border"
                />
                <span className="text-xs text-zinc-500">カスタムカラー</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {GRADIENT_PRESETS.map(g => (
                <button
                  key={g.label}
                  onClick={() => onSetBackground({ type: 'gradient', value: g.value })}
                  className="flex h-10 items-center justify-center rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 transition hover:scale-105"
                  style={{ background: g.value }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
        </TabsContent>

        {/* アニメーションタブ */}
        <TabsContent value="animation" className="space-y-1.5 pt-3">
          <p className="text-xs text-zinc-400 mb-2">シェア時に再生されます</p>
          <div className="grid grid-cols-2 gap-1.5">
            {ANIMATIONS.map(anim => {
              const currentType = canvasData.animation?.type ?? 'none'
              const isSelected = currentType === anim.value
              return (
                <button
                  key={anim.value}
                  onClick={() => {
                    if (anim.value === 'none') {
                      onSetAnimation(null)
                    } else {
                      onSetAnimation({ type: anim.value, duration: 2000, delay: 0, loop: false })
                    }
                  }}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs transition ${
                    isSelected ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span className="text-base">{anim.emoji}</span>
                  <span className="font-medium">{anim.label}</span>
                  {isSelected && <span className="ml-auto text-[10px] opacity-70">✓</span>}
                </button>
              )
            })}
          </div>
        </TabsContent>

        {/* 封筒タブ */}
        <TabsContent value="envelope" className="space-y-4 pt-3">
          <div>
            <p className="text-xs text-zinc-500 mb-3">
              デジタルでシェアするとき、封筒を開封する演出を追加できます（印刷時は不要）
            </p>
            <Label className="text-xs font-medium text-zinc-700">封筒スタイル</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {ENVELOPE_OPTIONS.map(opt => {
                const isSelected = currentEnvelopeStyle === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleEnvelopeSelect(opt.value)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                      isSelected
                        ? 'border-zinc-900 shadow-md ring-1 ring-zinc-900'
                        : 'border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
                    }`}
                  >
                    <div
                      className="w-10 h-7 rounded-md flex items-center justify-center text-sm shadow-sm"
                      style={{ background: opt.bg, color: opt.accent }}
                    >
                      {opt.emoji}
                    </div>
                    <span className="text-xs font-medium text-zinc-700">{opt.label}</span>
                    {isSelected && (
                      <span className="text-[10px] text-zinc-500">選択中</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {currentEnvelopeStyle !== 'none' && (
            <div>
              <Label className="text-xs text-zinc-500">差出人（任意）</Label>
              <Input
                value={senderName}
                onChange={e => handleSenderNameChange(e.target.value)}
                placeholder="あなたの名前"
                className="mt-1 h-8 text-xs"
              />
              <p className="mt-1 text-[10px] text-zinc-400">封筒に表示されます</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
