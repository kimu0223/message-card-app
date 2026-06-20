'use client'

import type { ReactNode } from 'react'

/**
 * デモの常設「カードステージ」。
 * スポットライト＋台座の影＋微3Dチルト＆ゆらぎ浮遊でカードを“舞台”に乗せる。
 * 中身（サンプルカード / AI結果 / 清書中スケルトン）は children で受け取る、表示専用コンポーネント。
 * ヒーローの飛翔カードが「ここに着地した」連続性を作るのが狙い。
 */
export default function DemoCardStage({
  children,
  maxWidth = 340,
  float = true,
}: {
  children: ReactNode
  /** カード幅の上限 */
  maxWidth?: number
  /** ゆらぎ浮遊＋チルトを有効にするか（清書中は false で静止） */
  float?: boolean
}) {
  return (
    <div
      style={{
        position: 'relative',
        perspective: 1100,
        padding: '14px 0 30px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* spotlight glow behind the card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '6%',
          left: '50%',
          width: 'min(560px, 92%)',
          height: '78%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(184,153,104,0.22) 0%, rgba(176,58,46,0.06) 38%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth, transformStyle: 'preserve-3d' }}>
        {/* card body — tilts back slightly and floats */}
        <div
          className={float ? 'lp-stage-float' : undefined}
          style={{
            transform: float ? undefined : 'rotateX(7deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>

        {/* pedestal shadow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -22,
            width: '72%',
            height: 26,
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(20,28,52,0.30) 0%, rgba(20,28,52,0.10) 45%, transparent 72%)',
            filter: 'blur(5px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
