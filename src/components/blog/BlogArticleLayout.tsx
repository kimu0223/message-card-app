import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

interface BlogArticleLayoutProps {
  post: BlogPost
  children: React.ReactNode
}

export default function BlogArticleLayout({ post, children }: BlogArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* パンくずリスト */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-400">
        <Link href="/" className="hover:text-zinc-700 transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-zinc-700 transition-colors">
          ブログ
        </Link>
        <span>/</span>
        <span className="text-zinc-600">{post.title}</span>
      </nav>

      {/* 記事ヘッダー */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <time className="text-sm text-zinc-400" dateTime={post.publishedAt}>
            {post.publishedAt}
          </time>
        </div>
        <h1 className="mb-4 text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">
          {post.title}
        </h1>
        <p className="text-base leading-relaxed text-zinc-500">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 本文 */}
      <div className="mb-12">{children}</div>

      {/* 関連リンク */}
      {post.externalLinks && post.externalLinks.length > 0 && (
        <section className="mb-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="mb-4 text-base font-bold text-zinc-900">関連リンク</h2>
          <ul className="flex flex-col gap-3">
            {post.externalLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-0.5"
                >
                  <span className="text-sm font-medium text-emerald-600 group-hover:underline">
                    {link.title}
                  </span>
                  <span className="text-xs text-zinc-500">{link.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-2xl bg-emerald-50 px-6 py-8 text-center">
        <p className="mb-1 text-sm font-medium text-emerald-600">さっそく試してみよう</p>
        <h2 className="mb-4 text-xl font-bold text-zinc-900">CardMagicでカードを作ってみる</h2>
        <p className="mb-6 text-sm text-zinc-500">
          無料で始められます。デザインセンスがなくても3分で感動的なカードが完成します。
        </p>
        <Link
          href="/create"
          className="inline-block rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-colors"
        >
          無料でカードを作る
        </Link>
      </section>
    </div>
  )
}
