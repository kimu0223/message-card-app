import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('cards')
    .select('id, title, status, animation, size, share_id, is_favorite, created_at, updated_at, thumbnail_url')
    .eq('user_id', user.id)
    .neq('status', 'archived')
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Free プランの月次制限チェック
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, cards_created_this_month, monthly_reset_at')
    .eq('id', user.id)
    .single()

  const freeLimit = parseInt(process.env.FREE_PLAN_MONTHLY_CARDS_LIMIT ?? '3')

  if (profile?.plan === 'free') {
    const resetAt = profile.monthly_reset_at ? new Date(profile.monthly_reset_at) : new Date()
    const now = new Date()

    // 月リセット
    if (now >= resetAt) {
      await supabase.from('profiles').update({
        cards_created_this_month: 0,
        monthly_reset_at: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      }).eq('id', user.id)
    } else if ((profile.cards_created_this_month ?? 0) >= freeLimit) {
      return NextResponse.json({ error: 'limit_exceeded' }, { status: 403 })
    }
  }

  const body = await request.json()
  const { title, templateId, canvasData, size, animation } = body

  if (!canvasData) {
    return NextResponse.json({ error: 'canvasData is required' }, { status: 400 })
  }

  const { data: card, error } = await supabase
    .from('cards')
    .insert({
      user_id: user.id,
      template_id: templateId ?? null,
      title: title ?? '無題のカード',
      canvas_data: canvasData,
      size: size ?? 'a4_landscape',
      animation: animation ?? 'none',
    })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // 月次カウントをインクリメント
  await supabase
    .from('profiles')
    .update({ cards_created_this_month: (profile?.cards_created_this_month ?? 0) + 1 })
    .eq('id', user.id)

  return NextResponse.json(card, { status: 201 })
}
