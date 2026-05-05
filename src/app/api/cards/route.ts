import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PLANS, CREDIT_COSTS } from '@/constants/plans'
import { deductCredits, addCredits } from '@/lib/credits'

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

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits, cards_created_this_month, monthly_reset_at')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'
  const freeLimit = PLANS.free.monthlyCardLimit!

  // 月リセットチェック
  let usedThisMonth = profile?.cards_created_this_month ?? 0
  if (plan === 'free') {
    const resetAt = profile?.monthly_reset_at ? new Date(profile.monthly_reset_at) : new Date()
    const now = new Date()

    if (now >= resetAt) {
      usedThisMonth = 0
      await supabase.from('profiles').update({
        cards_created_this_month: 0,
        monthly_reset_at: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      }).eq('id', user.id)
    } else if (usedThisMonth >= freeLimit) {
      // Free上限到達 → クレジット消費を試行
      const { success } = await deductCredits(supabase, user.id, CREDIT_COSTS.card, 'カード作成（Free上限超過）')
      if (!success) {
        return NextResponse.json({ error: 'limit_exceeded', needCredits: CREDIT_COSTS.card }, { status: 403 })
      }
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

  if (error) {
    // カード作成失敗時、クレジットを消費していた場合は返金
    if (plan === 'free' && usedThisMonth >= freeLimit) {
      await addCredits(supabase, user.id, CREDIT_COSTS.card, 'カード作成失敗による返金')
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 月次カウントをインクリメント（Freeプランのみ）
  if (plan === 'free') {
    await supabase
      .from('profiles')
      .update({ cards_created_this_month: usedThisMonth + 1 })
      .eq('id', user.id)
  }

  return NextResponse.json(card, { status: 201 })
}
