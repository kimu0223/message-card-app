'use client'

import { useEffect, useState } from 'react'
import DemoCardStage from './DemoCardStage'

/**
 * AI生成中の「清書中」演出。スピナーの代わりに、結果カードが現れる場所へ
 * 墨/金のシマーが走るスケルトンカードを置き、ステータス文言をサイクルさせて
 * “カードが生まれる”期待を作る。表示専用（fetch には一切関与しない）。
 */
const STATUS = [
  'シーンを読み解いています',
  '配色を選んでいます',
  '黄金比でレイアウトしています',
  '言葉を清書しています',
] as const

export default function DemoComposing() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % STATUS.length), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <DemoCardStage float={false} maxWidth={340}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '1 / 1.414',
            borderRadius: 16,
            overflow: 'hidden',
            background:
              'linear-gradient(180deg, #FAF7EF 0%, #F1ECE0 100%)',
            boxShadow: '0 18px 50px -22px rgba(20,28,52,0.4)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* faint placeholder lines (kicker / title / body / sign) */}
          <div style={{ position: 'absolute', inset: 0, padding: '14% 13%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: '38%', height: 8, borderRadius: 4, background: 'rgba(176,58,46,0.16)' }} />
            <div style={{ width: '78%', height: 20, borderRadius: 5, background: 'rgba(26,39,68,0.13)' }} />
            <div style={{ width: '92%', height: 10, borderRadius: 4, background: 'rgba(26,39,68,0.09)' }} />
            <div style={{ width: '64%', height: 10, borderRadius: 4, background: 'rgba(26,39,68,0.09)' }} />
            <div style={{ width: '34%', height: 9, borderRadius: 4, background: 'rgba(184,153,104,0.28)', marginTop: 6 }} />
          </div>
          {/* shimmer sweep */}
          <div className="lp-shimmer-sweep" />
        </div>
      </DemoCardStage>

      {/* cycling status line */}
      <div style={{ textAlign: 'center', marginTop: 6 }}>
        <p style={{ fontSize: 15, color: 'var(--lp-ink)', fontWeight: 600, fontFamily: 'var(--font-lp-serif)', letterSpacing: '0.04em', margin: 0 }}>
          <span className="lp-pulse-soft" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 7, background: 'var(--lp-terracotta)', marginRight: 10, verticalAlign: 'middle' }} />
          {STATUS[i]}…
        </p>
        <p style={{ marginTop: 8, fontSize: 12.5, color: 'var(--lp-ink-mute)', fontFamily: 'var(--font-lp-sans)' }}>
          本番と同じAIエンジンが、4パターンを生成しています
        </p>
      </div>
    </div>
  )
}
