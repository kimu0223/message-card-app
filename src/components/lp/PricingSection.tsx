import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLANS } from '@/constants/plans'

export default function PricingSection() {
  const free = PLANS.free
  const pro = PLANS.pro

  return (
    <section id="pricing" className="scroll-mt-20 bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">Pricing</p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">シンプルな料金プラン</h2>
          <p className="mt-3 text-zinc-500">まずは無料で始めて、必要になったらアップグレード</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Free プラン */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">{free.name}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900">¥0</span>
                <span className="text-sm text-zinc-400">/月</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">登録不要で今すぐ使い始められます</p>
            </div>

            <ul className="mb-8 space-y-3">
              {free.features.map(feat => (
                <li key={feat} className="flex items-center gap-3 text-sm text-zinc-600">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/create" className={cn(buttonVariants({ variant: 'outline', className: 'w-full' }))}>
              無料で試す
            </Link>
          </div>

          {/* Pro プラン */}
          <div className="relative rounded-2xl border-2 border-emerald-400 bg-white p-8 shadow-lg shadow-emerald-100">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white">人気</span>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">{pro.name}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900">¥{pro.price.toLocaleString()}</span>
                <span className="text-sm text-zinc-400">/月</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">作成枚数・AI回数すべて無制限</p>
            </div>

            <ul className="mb-8 space-y-3">
              {pro.features.map(feat => (
                <li key={feat} className="flex items-center gap-3 text-sm text-zinc-700">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/login" className={cn(buttonVariants({ className: 'w-full bg-emerald-500 hover:bg-emerald-600 text-white' }))}>
              Proを始める
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
