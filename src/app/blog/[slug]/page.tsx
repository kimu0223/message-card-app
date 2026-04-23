import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { blogPosts, getPostBySlug } from '@/lib/blog'
import BlogArticleLayout from '@/components/blog/BlogArticleLayout'
import HowToPrintContent from '@/content/blog/how-to-print'
import CardArrangementContent from '@/content/blog/card-arrangement'
import BirthdayMessageContent from '@/content/blog/birthday-message'
import WeddingMessageContent from '@/content/blog/wedding-message'

const contentMap: Record<string, React.ComponentType> = {
  'how-to-print': HowToPrintContent,
  'card-arrangement': CardArrangementContent,
  'birthday-message': BirthdayMessageContent,
  'wedding-message': WeddingMessageContent,
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | CardMagic`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const ContentComponent = contentMap[params.slug]
  if (!ContentComponent) notFound()

  return (
    <BlogArticleLayout post={post}>
      <ContentComponent />
    </BlogArticleLayout>
  )
}
