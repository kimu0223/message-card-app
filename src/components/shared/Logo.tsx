import Link from 'next/link'
import { brandName, brandNameEn } from '@/lib/brand'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md'
}

export default function Logo({ href = '/', size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 30 : 32
  const brandFontSize = size === 'sm' ? 18 : 20
  const subFontSize = size === 'sm' ? 10 : 11
  const iconFontSize = size === 'sm' ? 16 : 18
  const iconRadius = size === 'sm' ? 7 : 8

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
        O
      </div>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          lineHeight: 1.05,
        }}
      >
        <span style={{ fontWeight: 500, fontSize: brandFontSize, fontFamily: 'var(--font-lp-serif)' }}>
          {brandName}
        </span>
        <span
          className="lp-logo-accent"
          style={{
            fontSize: subFontSize,
            letterSpacing: '0.12em',
            textTransform: 'none',
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
