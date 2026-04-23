import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

const categoryLabel: Record<BlogPost['category'], string> = {
  'how-to': 'ハウツー',
  tips: 'ヒント',
  guide: 'ガイド',
}

const categoryColor: Record<BlogPost['category'], string> = {
  'how-to': 'bg-emerald-100 text-emerald-700',
  tips: 'bg-blue-100 text-blue-700',
  guide: 'bg-violet-100 text-violet-700',
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor[post.category]}`}
        >
          {categoryLabel[post.category]}
        </span>
        <time className="text-xs text-zinc-400" dateTime={post.publishedAt}>
          {post.publishedAt}
        </time>
      </div>

      <h2 className="text-base font-bold leading-snug text-zinc-900 group-hover:text-emerald-600 transition-colors">
        {post.title}
      </h2>

      <p className="text-sm leading-relaxed text-zinc-500 line-clamp-2">{post.description}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
