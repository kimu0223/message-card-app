'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Loader2, Sparkles, X, Check, Palette, MessageSquare } from 'lucide-react'
import { useAI } from '@/hooks/useAI'
import AIDesignWizard from './ai-design/AIDesignWizard'
import type { AIMessageRequest } from '@/types/ai'
import type { CanvasData } from '@/types/card'

interface AIAssistPanelProps {
  isOpen: boolean
  onClose: () => void
  onApplyMessage: (message: string) => void
  onApplyDesign?: (canvasData: CanvasData) => void
}

export default function AIAssistPanel({ isOpen, onClose, onApplyMessage, onApplyDesign }: AIAssistPanelProps) {
  const [activeTab, setActiveTab] = useState<'message' | 'design'>('message')
  const [occasion, setOccasion] = useState('birthday')
  const [relationship, setRelationship] = useState('友人')
  const [tone, setTone] = useState('warm')
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [keywords, setKeywords] = useState('')
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null)

  const { generateMessages, isLoading, messages } = useAI()

  const handleGenerate = async () => {
    const params: AIMessageRequest = {
      occasion,
      relationship,
      tone,
      length,
      keywords: keywords ? keywords.split(/[,、]/).map(k => k.trim()).filter(Boolean) : undefined,
    }
    setAppliedIndex(null)
    await generateMessages(params)
  }

  const handleApply = (msg: string, index: number) => {
    onApplyMessage(msg)
    setAppliedIndex(index)
  }

  if (!isOpen) return null

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-100 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-zinc-800">AIアシスト</h3>
        </div>
        <button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">
          <X className="h-4 w-4 text-zinc-500" />
        </button>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-zinc-100">
        <button
          onClick={() => setActiveTab('message')}
          className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'message'
              ? 'border-b-2 border-violet-500 text-violet-700'
              : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          メッセージ
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'design'
              ? 'border-b-2 border-violet-500 text-violet-700'
              : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          <Palette className="h-3.5 w-3.5" />
          デザイン
        </button>
      </div>

      {/* Design tab */}
      {activeTab === 'design' ? (
        <AIDesignWizard
          onComplete={(canvasData) => {
            onApplyDesign?.(canvasData)
          }}
          onClose={onClose}
        />
      ) : (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <Label className="text-xs font-medium text-zinc-600">シチュエーション</Label>
          <Select value={occasion} onValueChange={(v) => v && setOccasion(v)}>
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birthday">🎂 誕生日</SelectItem>
              <SelectItem value="thank_you">🙏 お礼</SelectItem>
              <SelectItem value="congratulations">🎉 お祝い</SelectItem>
              <SelectItem value="anniversary">💍 記念日</SelectItem>
              <SelectItem value="seasonal">🌸 季節の挨拶</SelectItem>
              <SelectItem value="business">💼 ビジネス</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-zinc-600">相手との関係</Label>
          <Select value={relationship} onValueChange={(v) => v && setRelationship(v)}>
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="友人">友人</SelectItem>
              <SelectItem value="恋人">恋人</SelectItem>
              <SelectItem value="家族">家族</SelectItem>
              <SelectItem value="同僚">同僚</SelectItem>
              <SelectItem value="上司">上司</SelectItem>
              <SelectItem value="後輩">後輩</SelectItem>
              <SelectItem value="恩師">恩師</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-zinc-600">トーン</Label>
          <Select value={tone} onValueChange={(v) => v && setTone(v)}>
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warm">温かい</SelectItem>
              <SelectItem value="bright">明るい</SelectItem>
              <SelectItem value="formal">フォーマル</SelectItem>
              <SelectItem value="casual">カジュアル</SelectItem>
              <SelectItem value="emotional">感動的</SelectItem>
              <SelectItem value="humorous">ユーモラス</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-zinc-600">長さ</Label>
          <div className="mt-1 flex gap-2">
            {(['short', 'medium', 'long'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLength(l)}
                className={`flex-1 rounded py-1 text-xs font-medium transition ${
                  length === l ? 'bg-violet-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {l === 'short' ? '短め' : l === 'medium' ? '普通' : '長め'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs font-medium text-zinc-600">
            キーワード <span className="text-zinc-400">(任意)</span>
          </Label>
          <Input
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            placeholder="例: 元気、笑顔、感謝"
            className="mt-1 h-8 text-xs"
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full bg-violet-600 hover:bg-violet-700" size="sm">
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />生成中...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" />メッセージを生成</>
          )}
        </Button>

        {messages.length > 0 && (
          <div className="space-y-2">
            <Separator />
            <p className="text-xs font-medium text-zinc-600">生成されたメッセージ</p>
            {messages.map((msg, i) => (
              <div key={i} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                <p className="mb-2 text-xs leading-relaxed text-zinc-700 whitespace-pre-wrap">{msg}</p>
                <Button
                  size="sm"
                  variant={appliedIndex === i ? 'default' : 'outline'}
                  className="h-7 w-full text-xs"
                  onClick={() => handleApply(msg, i)}
                >
                  {appliedIndex === i ? <><Check className="mr-1 h-3 w-3" />適用済み</> : 'このメッセージを使う'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  )
}
