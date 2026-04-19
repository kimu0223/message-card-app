'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

interface Props {
  plan: string | undefined
  usageThisMonth: number
  freeLimit: number
  isAtLimit: boolean
}

export default function DashboardHeader({ plan, usageThisMonth, freeLimit, isAtLimit }: Props) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">マイカード</h1>
        <p className="mt-1 text-sm text-zinc-500">
          作成したメッセージカードを管理できます
        </p>
      </div>
      <div className="flex items-center gap-3">
        {plan === 'free' && (
          <div className="text-right text-xs text-zinc-500">
            <span className="font-medium text-zinc-700">{usageThisMonth}</span>/{freeLimit} 枚/月
            {isAtLimit && (
              <p className="text-amber-600 font-medium">上限に達しました</p>
            )}
          </div>
        )}
        {isAtLimit ? (
          <span className={cn(buttonVariants({ size: 'sm' }), 'opacity-50 pointer-events-none')}>
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </span>
        ) : (
          <Link href="/editor" className={cn(buttonVariants({ size: 'sm' }))}>
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </Link>
        )}
      </div>
    </div>
  )
}
