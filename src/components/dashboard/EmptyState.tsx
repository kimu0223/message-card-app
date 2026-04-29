'use client'

import Link from 'next/link'

export default function EmptyState() {
  return (
    <div className="empty-state">
      {/* Wax seal icon */}
      <div
        className="empty-icon"
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #D88468, var(--lp-terracotta) 60%, var(--lp-terracotta-deep) 100%)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--lp-cream-soft)',
          fontFamily: 'var(--font-lp-display)',
          fontStyle: 'italic',
          fontSize: 28,
          boxShadow: 'inset -4px -6px 10px rgba(0,0,0,0.25), inset 3px 3px 5px rgba(255,255,255,0.15), 0 4px 12px -4px rgba(168,95,68,0.5)',
          opacity: 1,
          marginBottom: 20,
        }}
      >
        M
      </div>

      <h3>まだカードがありません</h3>
      <p>
        最初のメッセージカードを作って、大切な人に届けましょう。
        テンプレートを選ぶだけで、すぐに始められます。
      </p>

      <Link
        href="/editor"
        className="btn-magic"
        style={{ width: 'auto', minWidth: 200 }}
      >
        最初のカードを作る &rarr;
      </Link>
    </div>
  )
}
