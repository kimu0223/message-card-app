import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import EditorPageClient from '@/components/editor/EditorPageClient'

interface Props {
  params: Promise<{ cardId: string }>
}

export default async function EditorPage({ params }: Props) {
  const { cardId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: card } = await supabase
    .from('cards')
    .select('id, title, canvas_data, size, animation, status, share_id, is_favorite')
    .eq('id', cardId)
    .eq('user_id', user.id)
    .single()

  if (!card) notFound()

  return (
    <EditorPageClient
      card={{
        id: card.id,
        title: card.title,
        canvasData: card.canvas_data,
        status: card.status,
        shareId: card.share_id,
        isFavorite: card.is_favorite,
      }}
    />
  )
}
