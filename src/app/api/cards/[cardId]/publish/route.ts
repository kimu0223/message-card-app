import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'

type Params = Promise<{ cardId: string }>

export async function POST(_: Request, { params }: { params: Params }) {
  const { cardId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 既存カードを取得
  const { data: card, error: fetchError } = await supabase
    .from('cards')
    .select('id, status, share_id')
    .eq('id', cardId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !card) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // 既に公開済みなら既存のshare_idを返す
  if (card.status === 'published' && card.share_id) {
    return NextResponse.json({ shareId: card.share_id })
  }

  const shareId = nanoid(10)

  const { error } = await supabase
    .from('cards')
    .update({
      status: 'published',
      share_id: shareId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', cardId)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: 'Publish failed' }, { status: 500 })

  return NextResponse.json({ shareId })
}
