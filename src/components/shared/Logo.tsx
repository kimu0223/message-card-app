import Link from 'next/link'
import { brandName, brandNameEn } from '@/lib/brand'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md'
}

export default function Logo({ href = '/', size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 32 : 36
  const brandFontSize = size === 'sm' ? 17 : 19
  const subFontSize = size === 'sm' ? 7.5 : 8
  const iconFontSize = Math.round(iconSize * 0.54)
  const iconRadius = 3

  const content = (
    <>
      <div
        className="lp-logo-icon"
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: iconRadius,
          fontSize: iconFontSize,
        }}
      >
        贈
      </div>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          lineHeight: 1.05,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: brandFontSize, fontFamily: 'var(--font-lp-serif)', letterSpacing: '0.1em' }}>
          {brandName}
        </span>
        <span
          className="lp-logo-accent"
          style={{
            fontSize: subFontSize,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
          }}
        >
          {brandNameEn}
        </span>
      </span>
    </>
  )

  return (
    <Link href={href} className="lp-logo">
      {content}
    </Link>
  )
}
