import Link from 'next/link'

interface LogoProps {
  href?: string
  size?: 'sm' | 'md'
}

export default function Logo({ href = '/', size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 30 : 32
  const fontSize = size === 'sm' ? 22 : 24
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
        M
      </div>
      <span style={{ fontWeight: 400, fontSize }}>
        Card<em className="lp-logo-accent">Magic</em>
      </span>
    </>
  )

  return (
    <Link href={href} className="lp-logo">
      {content}
    </Link>
  )
}
