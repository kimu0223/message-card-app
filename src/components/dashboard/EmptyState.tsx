'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-20">
      <div className="mb-4 text-6xl">💌</div>
      <h2 className="mb-2 text-lg font-semibold text-zinc-700">カードがまだありません</h2>
      <p className="mb-6 text-sm text-zinc-500">最初のメッセージカードを作ってみましょう</p>
      <Link href="/editor" className={cn(buttonVariants())}>
        <Plus className="mr-2 h-4 w-4" />
        最初のカードを作る
      </Link>
    </div>
  )
}
