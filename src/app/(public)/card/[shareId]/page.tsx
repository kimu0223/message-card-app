import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PublicCardView from '@/components/share/PublicCardView'
import type { CanvasData } from '@/types/card'

interface Props {
  params: Promise<{ shareId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params
  const supabase = await createClient()

  const { data: card } = await supabase
    .from('cards')
    .select('title, thumbnail_url')
    .eq('share_id', shareId)
    .eq('status', 'published')
    .single()

  if (!card) return { title: 'カードが見つかりません' }

  return {
    title: card.title,
    description: 'Message Card App で作成されたメッセージカードです',
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
    .select('id, title, canvas_data, animation, thumbnail_url')
    .eq('share_id', shareId)
    .eq('status', 'published')
    .single()

  if (!card) notFound()

  return (
    <PublicCardView
      title={card.title}
      canvasData={card.canvas_data as CanvasData}
      shareId={shareId}
    />
  )
}
