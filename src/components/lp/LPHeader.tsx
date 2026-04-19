'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Sparkles, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LPHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-shadow duration-200',
      scrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm' : 'bg-transparent'
    )}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900">
          <Sparkles className="h-5 w-5 text-emerald-500" />
          <span>CardMagic</span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
          <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">使い方</a>
          <a href="#features" className="hover:text-zinc-900 transition-colors">機能</a>
          <a href="#pricing" className="hover:text-zinc-900 transition-colors">料金</a>
          <a href="#faq" className="hover:text-zinc-900 transition-colors">よくある質問</a>
        </nav>

        {/* CTAボタン */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
            ログイン
          </Link>
          <Link href="/create" className={cn(buttonVariants({ size: 'sm', className: 'bg-emerald-500 hover:bg-emerald-600 text-white' }))}>
            無料で試す
          </Link>
        </div>

        {/* モバイルメニュー */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="メニュー"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* モバイルドロワー */}
      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-zinc-600">
            <a href="#how-it-works" onClick={() => setMobileOpen(false)}>使い方</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>機能</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>料金</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>よくある質問</a>
            <hr className="border-zinc-100" />
            <Link href="/login" className="text-zinc-600">ログイン</Link>
            <Link href="/create" className={cn(buttonVariants({ size: 'sm', className: 'bg-emerald-500 hover:bg-emerald-600 text-white w-full text-center' }))}>
              無料で試す
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
