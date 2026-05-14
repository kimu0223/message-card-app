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
    .select('id, title, status, animation, size, share_id, is_favorite, created_at, updated_at, thumbnail_url, view_count')
    .eq('user_id', user.id)
    .neq('status', 'archived')
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

// 管理者ユーザーID: カード作成制限・クレジット消費を完全スキップ
const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS ?? '')
  .split(',').map(s => s.trim()).filter(Boolean)

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, templateId, canvasData, size, animation } = body

  if (!canvasData) {
    return NextResponse.json({ error: 'canvasData is required' }, { status: 400 })
  }

  // 管理者は制限なし
  if (ADMIN_USER_IDS.includes(user.id)) {
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
    return NextResponse.json(card, { status: 201 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits, cards_created_this_month, monthly_reset_at')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'
  const freeLimit = PLANS.free.monthlyCardLimit!
  let totalCreditsCharged = 0
  let totalCreditsRequired = 0
  let overFreeLimit = false
  let isPremiumTemplate = false

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
      overFreeLimit = true
      totalCreditsRequired += CREDIT_COSTS.card
    }

    if (templateId) {
      const { data: template, error: templateError } = await supabase
        .from('templates')
        .select('is_premium')
        .eq('id', templateId)
        .maybeSingle()

      if (templateError) {
        return NextResponse.json({ error: templateError.message }, { status: 500 })
      }

      if (!template) {
        return NextResponse.json({ error: 'Invalid templateId' }, { status: 400 })
      }

      isPremiumTemplate = Boolean(template.is_premium)
      if (isPremiumTemplate) {
        totalCreditsRequired += CREDIT_COSTS.premiumTemplate
      }
    }

    if (totalCreditsRequired > 0) {
      const chargeReasons = [
        overFreeLimit ? 'カード作成（Free上限超過）' : null,
        isPremiumTemplate ? 'プレミアムテンプレート利用' : null,
      ].filter(Boolean)

      const { success } = await deductCredits(
        supabase,
        user.id,
        totalCreditsRequired,
        chargeReasons.join(' + ')
      )

      if (!success) {
        return NextResponse.json({ error: 'limit_exceeded', needCredits: totalCreditsRequired }, { status: 403 })
      }

      totalCreditsCharged = totalCreditsRequired
    }
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
    if (totalCreditsCharged > 0) {
      await addCredits(supabase, user.id, totalCreditsCharged, 'カード作成失敗による返金', {
        transactionType: 'refund',
      })
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
