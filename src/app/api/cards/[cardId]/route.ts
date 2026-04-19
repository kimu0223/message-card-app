import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = Promise<{ cardId: string }>

export async function GET(_: Request, { params }: { params: Params }) {
  const { cardId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', cardId)
    .eq('user_id', user.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { cardId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, canvasData, animation, isFavorite } = body

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (title !== undefined) updates.title = title
  if (canvasData !== undefined) updates.canvas_data = canvasData
  if (animation !== undefined) updates.animation = animation
  if (isFavorite !== undefined) updates.is_favorite = isFavorite

  const { data, error } = await supabase
    .from('cards')
    .update(updates)
    .eq('id', cardId)
    .eq('user_id', user.id)
    .select('id')
    .single()

  if (error || !data) return NextResponse.json({ error: 'Update failed' }, { status: 500 })

  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  const { cardId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('cards')
    .update({ status: 'archived' })
    .eq('id', cardId)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })

  return NextResponse.json({ success: true })
}
