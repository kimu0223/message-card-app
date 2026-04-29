'use client'

import Link from 'next/link'

interface Props {
  isAtLimit: boolean
  cardCount: number
}

export default function DashboardHeader({ isAtLimit, cardCount }: Props) {
  return (
    <div className="dash-greeting" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
      <div className="dash-greeting-text">
        <span className="scribble-h" style={{ fontSize: 14 }}>
          &mdash; Welcome back &mdash;
        </span>
        <h1>今日は、誰に届けますか?</h1>
        <p>
          {cardCount > 0
            ? `${cardCount} 枚のカードがあります`
            : 'まだカードがありません。最初の一枚を作りましょう'}
        </p>
      </div>

      {isAtLimit ? (
        <span className="dash-cta" aria-disabled="true">
          上限に達しました
        </span>
      ) : (
        <Link href="/editor" className="dash-cta">
          新しいカードを作る &rarr;
        </Link>
      )}
    </div>
  )
}
