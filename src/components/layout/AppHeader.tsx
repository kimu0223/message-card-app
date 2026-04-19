'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, LayoutDashboard, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
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
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* ロゴ */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-zinc-900">
          <span className="text-xl">💌</span>
          <span className="hidden sm:inline">Message Card</span>
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            <LayoutDashboard className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">ダッシュボード</span>
          </Link>

          <Link
            href="/editor"
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            新規作成
          </Link>

          {/* プロフィールメニュー */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-2 rounded-full outline-none ring-2 ring-transparent transition hover:ring-zinc-300" />
              }
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="bg-zinc-200 text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-medium text-zinc-900">{displayName}</p>
                <p className="truncate text-xs text-zinc-500">{user.email}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge variant={profile?.plan === 'pro' ? 'default' : 'secondary'} className="text-xs">
                    {profile?.plan === 'pro' ? 'Pro' : 'Free'}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/billing" className="flex w-full items-center gap-2">
                  プラン・課金
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
