'use client'

import Link from 'next/link'
import CtaButton from '@/components/lp/CtaButton'
import { useScrolledPast } from '@/hooks/useScrolledPast'

/**
 * モバイル専用の追従CTAバー。
 * ヒーローを抜けたあたり（scrollY > 600）で画面下部に固定表示し、
 * 「最下部まで行かないと作成に進めない」動線の弱さを解消する。
 * ヘッダー(z-50)より下、本文より上の z-40。`prefers-reduced-motion` では
 * トランジションを抑制する。
 */
export default function MobileStickyCTA() {
  const visible = useScrolledPast(600)

  return (
    <div
      // 非表示時は inert でフォーカス順とアクセシビリティツリーから除外する
      inert={!visible}
      className="fixed inset-x-0 bottom-0 z-40 md:hidden motion-safe:transition-all motion-safe:duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'rgba(250, 247, 239, 0.92)',
        backdropFilter: 'blur(12px) saturate(120%)',
        borderTop: '1px solid var(--lp-paper-line)',
        boxShadow: 'var(--lp-shadow-soft)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/login"
          className="shrink-0 text-sm font-medium"
          style={{ color: 'var(--lp-ink-soft)' }}
        >
          ログイン
        </Link>
        <CtaButton
          href="/create"
          size="md"
          className="flex-1 justify-center"
          // 追従バーのみ font-semibold・padding px-5 py-3。size='md' の text-sm を
          // 活かしつつ、weight と padding を style で上書きして従来の見た目を維持する。
          style={{
            fontWeight: 600,
            paddingInline: '1.25rem',
            paddingBlock: '0.75rem',
            boxShadow: '0 12px 24px -10px rgba(26,39,68,0.45)',
          }}
        >
          無料でカードを作る →
        </CtaButton>
      </div>
    </div>
  )
}
