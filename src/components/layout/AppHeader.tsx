'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, LayoutDashboard, Plus } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import type { User } from '@supabase/supabase-js'

interface AppHeaderProps {
  user: User
  profile: {
    display_name: string | null
    avatar_url: string | null
    plan: string
    credits: number
  } | null
}

export default function AppHeader({ user, profile }: AppHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = profile?.display_name ?? user.email ?? 'ユーザー'
  const avatarUrl = profile?.avatar_url ?? ''
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <header
      className="lp-subnav"
      style={{ zIndex: 50 }}
    >
      <div className="lp-subnav-inner">
        <Logo href="/dashboard" size="sm" />

        {/* Nav */}
        <nav
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            fontSize: 14,
            color: 'var(--lp-ink-soft)',
          }}
        >
          <Link
            href="/dashboard"
            style={{ color: 'var(--lp-ink)', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">マイカード</span>
          </Link>
          <Link
            href="/editor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 18px',
              borderRadius: 999,
              background: 'var(--lp-ink)',
              color: 'var(--lp-cream-soft)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <Plus className="h-4 w-4" />
            新規作成
          </Link>
        </nav>

        {/* Profile */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--lp-terracotta)',
                color: 'var(--lp-cream-soft)',
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-lp-display)',
                fontStyle: 'italic',
                fontSize: 14,
              }}
            >
              {initials}
            </div>
          )}
          <span
            className="hidden sm:inline"
            style={{ fontSize: 13, color: 'var(--lp-ink-soft)' }}
          >
            {displayName}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 6,
              color: 'var(--lp-ink-mute)',
              display: 'flex',
              alignItems: 'center',
            }}
            title="ログアウト"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
