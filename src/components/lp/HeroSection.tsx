import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function HeroSection() {
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
          デザインセンスがなくても、
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            3分で感動的なカードを。
          </span>
        </h1>

        {/* サブテキスト */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-500 md:text-xl">
          誕生日・記念日・お礼など、あらゆるシーンで使えるアニメーション付き
          メッセージカードをAIとテンプレートで簡単作成。URLひとつで相手に届けましょう。
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

        {/* ヒーロービジュアル */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/80">
          <div className="flex h-8 items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-zinc-400">cardmagic.app/create/editor</span>
          </div>
          <div className="flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-12 md:p-20">
            <div className="w-full max-w-sm rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 p-8 text-center shadow-lg">
              <p className="mb-2 text-4xl">🎂</p>
              <p className="text-xl font-bold text-white">Happy Birthday!</p>
              <p className="mt-2 text-sm text-white/80">
                あなたの誕生日をお祝いして<br />心から嬉しいです
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
