'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, Loader2, Lock } from 'lucide-react'
import type { Template, TemplateCategory, TemplateStyle } from '@/types/template'

const CATEGORIES: { value: TemplateCategory; label: string; emoji: string }[] = [
  { value: 'birthday', label: '誕生日', emoji: '🎂' },
  { value: 'thank_you', label: 'お礼', emoji: '🙏' },
  { value: 'congratulations', label: 'お祝い', emoji: '🎉' },
  { value: 'anniversary', label: '記念日', emoji: '💍' },
  { value: 'seasonal', label: '季節', emoji: '🌸' },
  { value: 'business', label: 'ビジネス', emoji: '💼' },
]

const STYLES: { value: TemplateStyle | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'cute', label: 'かわいい' },
  { value: 'elegant', label: 'エレガント' },
  { value: 'cool', label: 'クール' },
  { value: 'simple', label: 'シンプル' },
  { value: 'pop', label: 'ポップ' },
]

interface TemplateSelectorProps {
  onSelect: (template: Template) => void
  onBack?: () => void
}

export default function TemplateSelector({ onSelect, onBack }: TemplateSelectorProps) {
  const [step, setStep] = useState<'category' | 'template'>('category')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<TemplateStyle | 'all'>('all')
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedCategory) {
      fetchTemplates(selectedCategory)
    }
  }, [selectedCategory])

  const fetchTemplates = async (category: TemplateCategory) => {
    setIsLoading(true)
    try {
      const url = new URL('/api/templates', window.location.origin)
      url.searchParams.set('category', category)
      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        // canvas_data を camelCase に変換
        const normalized = data.map((t: Record<string, unknown>) => ({
          ...t,
          canvasData: t.canvas_data,
          thumbnailUrl: t.thumbnail_url,
          isPremium: t.is_premium,
          sortOrder: t.sort_order,
        }))
        setTemplates(normalized)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategorySelect = (cat: TemplateCategory) => {
    setSelectedCategory(cat)
    setSelectedStyle('all')
    setStep('template')
  }

  const handleBack = () => {
    setStep('category')
    setSelectedCategory(null)
  }

  const filteredTemplates = selectedStyle === 'all'
    ? templates
    : templates.filter(t => t.style === selectedStyle)

  if (step === 'category') {
    return (
      <div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => handleCategorySelect(cat.value)}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-zinc-200 bg-white p-6 text-center transition hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-sm"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-zinc-700">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const categoryLabel = CATEGORIES.find(c => c.value === selectedCategory)?.label

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          カテゴリに戻る
        </Button>
        <h2 className="font-semibold text-zinc-700">
          {CATEGORIES.find(c => c.value === selectedCategory)?.emoji} {categoryLabel}
        </h2>
      </div>

      {/* スタイルフィルター */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STYLES.map(s => (
          <button
            key={s.value}
            onClick={() => setSelectedStyle(s.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              selectedStyle === s.value
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* テンプレートグリッド */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="py-16 text-center text-zinc-400">
          テンプレートが見つかりませんでした
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filteredTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => !template.isPremium && onSelect(template)}
              className={`group relative overflow-hidden rounded-xl border-2 border-zinc-200 bg-white text-left transition hover:shadow-md ${
                template.isPremium
                  ? 'cursor-not-allowed opacity-75'
                  : 'hover:border-zinc-400 cursor-pointer'
              }`}
            >
              {/* サムネイル */}
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                {template.thumbnailUrl ? (
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                ) : (
                  <TemplateThumbnailFallback template={template} />
                )}
              </div>

              {/* 情報 */}
              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-zinc-700">{template.name}</p>
                  {template.isPremium && (
                    <div className="flex items-center gap-1">
                      <Lock className="h-3 w-3 text-amber-500" />
                      <Badge variant="secondary" className="text-xs">Pro</Badge>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// キャンバスデータからシンプルなプレビューを生成
function TemplateThumbnailFallback({ template }: { template: Template }) {
  const bg = template.canvasData?.background
  const style = bg?.type === 'gradient'
    ? { background: bg.value }
    : { backgroundColor: bg?.value ?? '#f5f5f5' }

  const firstText = template.canvasData?.elements?.find(e => e.type === 'text')

  return (
    <div
      className="flex h-full flex-col items-center justify-center p-4 text-center"
      style={style}
    >
      {firstText && firstText.type === 'text' && (
        <p
          className="text-xs font-medium leading-relaxed"
          style={{ color: firstText.color, fontFamily: firstText.fontFamily }}
        >
          {firstText.text.slice(0, 30)}
          {firstText.text.length > 30 ? '...' : ''}
        </p>
      )}
    </div>
  )
}
