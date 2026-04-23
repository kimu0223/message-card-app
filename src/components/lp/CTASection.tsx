'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-emerald-500 to-teal-400 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          今すぐ無料で試してみましょう
        </h2>
        <p className="mb-8 text-lg text-emerald-100">
          登録不要。3分でプロ品質のメッセージカードが完成します。
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'gap-2 bg-white px-8 text-base font-semibold text-emerald-600 hover:bg-emerald-50'
            )}
          >
            無料でカードを作る
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-emerald-200">クレジットカード不要 · いつでもキャンセル可能</p>
      </div>
    </section>
  )
}
