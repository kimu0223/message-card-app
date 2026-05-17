'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CARD_TEMPLATES, CARD_SCENES } from '@/components/lp/CardTemplates'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'

/**
 * SNS素材用スクリーンショットページ
 * 各テンプレートを大きいサイズで表示してスクリーンショット撮影に使う
 * URL: /card-gallery
 * URL: /card-gallery?i=3  (index直接指定)
 */
export default function CardGalleryPage() {
  return (
    <Suspense>
      <CardGalleryContent />
    </Suspense>
  )
}

function CardGalleryContent() {
  const searchParams = useSearchParams()
  const initialIndex = Number(searchParams.get('i') ?? 0)
  const [index, setIndex] = useState(initialIndex)
  const [mode, setMode] = useState<'single' | 'grid'>('single')

  useEffect(() => {
    const i = Number(searchParams.get('i') ?? 0)
    setIndex(i)
  }, [searchParams])

  const template = CARD_TEMPLATES[index]
  const Comp = template.Comp
  const sceneDef = CARD_SCENES.find(s => s.id === template.scene)

  return (
    <div style={{ minHeight: '100vh', background: '#18181b', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* コントロール */}
      <div style={{ width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #3f3f46' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setMode('single')}
            style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: mode === 'single' ? '#a3e635' : '#3f3f46',
              color: mode === 'single' ? '#18181b' : '#a1a1aa',
              fontWeight: 600, fontSize: 13,
            }}
          >
            1枚ずつ
          </button>
          <button
            onClick={() => setMode('grid')}
            style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: mode === 'grid' ? '#a3e635' : '#3f3f46',
              color: mode === 'grid' ? '#18181b' : '#a1a1aa',
              fontWeight: 600, fontSize: 13,
            }}
          >
            グリッド
          </button>
        </div>

        <span style={{ color: '#71717a', fontSize: 13 }}>
          SNS素材用 — スクリーンショットして使用
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#71717a', fontSize: 13 }}>
          <Download size={14} />
          <span>Cmd+Shift+4 でスクリーンショット</span>
        </div>
      </div>

      {mode === 'single' ? (
        /* ─── シングルビュー ─── */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 24 }}>
          {/* カード */}
          <div
            data-testid="card-display"
            style={{
              width: 360,
              height: 520,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
          >
            <Comp />
          </div>

          {/* ラベル */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#f4f4f5', fontWeight: 700, fontSize: 18 }}>{template.title}</p>
            <p style={{ margin: '4px 0 0', color: '#71717a', fontSize: 14 }}>{sceneDef?.label} · {template.id}</p>
          </div>

          {/* ナビゲーション */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={index === 0}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: index === 0 ? 'default' : 'pointer',
                background: index === 0 ? '#27272a' : '#3f3f46',
                color: index === 0 ? '#52525b' : '#f4f4f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <span style={{ color: '#a1a1aa', fontSize: 13, minWidth: 60, textAlign: 'center' }}>
              {index + 1} / {CARD_TEMPLATES.length}
            </span>

            <button
              onClick={() => setIndex(i => Math.min(CARD_TEMPLATES.length - 1, i + 1))}
              disabled={index === CARD_TEMPLATES.length - 1}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: index === CARD_TEMPLATES.length - 1 ? 'default' : 'pointer',
                background: index === CARD_TEMPLATES.length - 1 ? '#27272a' : '#3f3f46',
                color: index === CARD_TEMPLATES.length - 1 ? '#52525b' : '#f4f4f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* サムネイルナビ */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
            {CARD_TEMPLATES.map((t, i) => {
              const T = t.Comp
              return (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  style={{
                    width: 52, height: 76, borderRadius: 6, overflow: 'hidden', padding: 0,
                    border: i === index ? '2px solid #a3e635' : '2px solid transparent',
                    cursor: 'pointer', flexShrink: 0,
                    boxShadow: i === index ? '0 0 12px rgba(163,230,53,0.4)' : 'none',
                  }}
                >
                  <T />
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        /* ─── グリッドビュー ─── */
        <div style={{ padding: '32px 24px', maxWidth: 1100, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
            {CARD_TEMPLATES.map(t => {
              const T = t.Comp
              const scene = CARD_SCENES.find(s => s.id === t.scene)
              return (
                <div key={t.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{
                    aspectRatio: '220 / 320', borderRadius: 12, overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}>
                    <T />
                  </div>
                  <p style={{ margin: 0, color: '#f4f4f5', fontSize: 12, fontWeight: 600 }}>{t.title}</p>
                  <p style={{ margin: 0, color: '#71717a', fontSize: 11 }}>{scene?.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 使い方ヒント */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #27272a', width: '100%', display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { key: '1枚撮影', val: 'Cmd+Shift+4 → ドラッグでカード範囲を選択' },
          { key: 'Mac全画面', val: 'Cmd+Shift+3' },
          { key: 'iPhone', val: 'サイドボタン+音量Up同時押し' },
          { key: '動画', val: 'Cmd+Shift+5 → 画面収録' },
        ].map(h => (
          <div key={h.key} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: '#a3e635', fontSize: 11, fontWeight: 700, background: '#1a2e05', padding: '2px 8px', borderRadius: 4 }}>{h.key}</span>
            <span style={{ color: '#71717a', fontSize: 11 }}>{h.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
