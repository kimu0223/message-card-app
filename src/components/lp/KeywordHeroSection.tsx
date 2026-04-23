'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KeywordHeroSectionProps {
  title: string
  subtext: string
}

export default function KeywordHeroSection({ title, subtext }: KeywordHeroSectionProps) {
  // \n を改行として表示するために split して span 配列に変換
  const titleLines = title.split('\n')

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-zinc-50 px-6 pb-24 pt-20 md:pt-28">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* バッジ */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
          <Sparkles className="h-4 w-4" />
          AI搭載・登録不要で今すぐ体験
        </div>

        {/* キャッチコピー */}
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
          {titleLines.map((line, index) => (
            <span key={index}>
              {index === titleLines.length - 1 ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  {line}
                </span>
              ) : (
                <>
                  {line}
                  <br />
                </>
              )}
            </span>
          ))}
        </h1>

        {/* サブテキスト */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-500 md:text-xl">
          {subtext}
        </p>

        {/* CTAボタン */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'gap-2 bg-emerald-500 px-8 text-base hover:bg-emerald-600 text-white'
            )}
          >
            無料でカードを作る
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg', className: 'px-8 text-base' }))}
          >
            ログイン / 新規登録
          </Link>
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          クレジットカード不要 · 登録なしで今すぐ試せます
        </p>
      </div>
    </section>
  )
}
