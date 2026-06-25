import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

/**
 * LP共通の「インク塗りピル」CTAボタン。
 * ヘッダー（デスクトップ/モバイル/ドロワー）と追従CTAバーで重複していた
 * インライン styles をここに集約する（見た目は従来と完全に同一）。
 *
 * - `size='md'`: デスクトップヘッダー相当（px-[18px] py-[10px] text-sm）
 * - `size='sm'`: モバイルヘッダー相当（px-4 py-2 text-xs）
 * 上記でカバーできない差分（ドロワー/追従バーの padding・font-weight・
 * justify・shadow・hover・flex-1 など）は `className` / `style` で個別上書きする。
 */

type CtaButtonProps = {
  href: string
  children: ReactNode
  size?: 'sm' | 'md'
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

// インク塗りピルの共通見た目（背景・文字色）。size に依らず固定。
const FILL_STYLE: CSSProperties = {
  // ink fill reads on both the light hero top and the scrolled cream bar
  background: 'var(--lp-ink)',
  color: 'var(--lp-cream-soft)',
}

const SIZE_CLASS: Record<NonNullable<CtaButtonProps['size']>, string> = {
  md: 'px-[18px] py-[10px] text-sm',
  sm: 'px-4 py-2 text-xs',
}

export default function CtaButton({
  href,
  children,
  size = 'md',
  className = '',
  style,
  onClick,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center rounded-full font-medium ${SIZE_CLASS[size]} ${className}`}
      style={{ ...FILL_STYLE, ...style }}
    >
      {children}
    </Link>
  )
}
