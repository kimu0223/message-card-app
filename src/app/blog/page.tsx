import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

export const metadata: Metadata = {
  title: 'ブログ | CardMagic',
  description: 'メッセージカードのデザインや文章のヒント、使い方ガイドをお届けします。',
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold text-zinc-900 sm:text-4xl">
          メッセージカード ブログ
        </h1>
        <p className="text-base text-zinc-500">
          デザインや文章のヒント、使い方ガイドをお届けします
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
