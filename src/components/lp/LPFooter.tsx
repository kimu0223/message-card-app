'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function LPFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <span>CardMagic</span>
          </Link>

          {/* リンク */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <Link href="/login" className="hover:text-zinc-900 transition-colors">ログイン</Link>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">料金</a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">よくある質問</a>
            <Link href="/blog" className="hover:text-zinc-900 transition-colors">ブログ</Link>
          </nav>

          {/* コピーライト */}
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} CardMagic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
