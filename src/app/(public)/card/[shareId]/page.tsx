import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PublicCardView from '@/components/share/PublicCardView'
import type { CanvasData } from '@/types/card'

// generateMetadata + page の両方で Supabase を使うため動的レンダリングに固定
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ shareId: string }>
}

function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false
  return new Date(expiresAt) <= new Date()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params
  const supabase = await createClient()

  const { data: card } = await supabase
    .from('cards')
    .select('title, thumbnail_url, expires_at')
    .eq('share_id', shareId)
    .eq('status', 'published')
    .single()

  if (!card || isExpired(card.expires_at)) {
    return {
      title: 'カードが見つかりません',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: card.title,
    description: 'Message Card App で作成されたメッセージカードです',
    robots: { index: false, follow: false },
    openGraph: {
      title: card.title,
      description: 'Message Card App で作成されたメッセージカードです',
      images: card.thumbnail_url ? [card.thumbnail_url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: card.title,
      images: card.thumbnail_url ? [card.thumbnail_url] : [],
    },
  }
}

export default async function PublicCardPage({ params }: Props) {
  const { shareId } = await params
  const supabase = await createClient()

  const { data: card } = await supabase
    .from('cards')
    .select('id, title, canvas_data, animation, thumbnail_url, expires_at')
    .eq('share_id', shareId)
    .eq('status', 'published')
    .single()

  if (!card) notFound()

  if (isExpired(card.expires_at)) {
    return <ExpiredCardPage />
  }

  // 閲覧数をインクリメント（失敗しても表示に影響しない）
  void supabase.rpc('increment_card_view', { card_id: card.id })

  return (
    <PublicCardView
      title={card.title}
      canvasData={card.canvas_data as CanvasData}
      shareId={shareId}
    />
  )
}

function ExpiredCardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-6 text-center">
      <div className="max-w-sm">
        <p className="text-4xl mb-4">📭</p>
        <h1 className="text-xl font-bold text-white mb-2">
          このカードは有効期限が切れました
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          Proプランにアップグレードすると、永続的に公開できます。
        </p>
        <a
          href="/"
          className="inline-block rounded-lg bg-white px-6 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
        >
          自分もカードを作る
        </a>
      </div>
    </div>
  )
}
