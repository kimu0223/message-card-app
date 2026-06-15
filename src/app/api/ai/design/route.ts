import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateDesignVariants } from '@/lib/gemini/design'
import { PLANS, CREDIT_COSTS } from '@/constants/plans'
import { deductCredits } from '@/lib/credits'
import { reserveGuestUsage, releaseGuestReservation, getClientIP } from '@/lib/guest-limit'
import { validateDesignBody } from './_validate'
import { resolveGuestSession, setGuestCookie } from './_guest-session'
import type { AIDesignGenerateRequest } from '@/types/ai'

const FREE_LIMIT = PLANS.free.monthlyAiDesignLimit!

// 管理者ユーザーID（カンマ区切り）: レート制限・クレジット消費を完全スキップ
const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS ?? '')
  .split(',').map(s => s.trim()).filter(Boolean)

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // ─── ゲストユーザーのレート制限 ───
  if (!user) {
    // ボディ検証を先に行い、不正リクエストで無駄な予約を発生させない
    let body: AIDesignGenerateRequest
    try {
      body = (await request.json()) as AIDesignGenerateRequest
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const validationError = validateDesignBody(body)
    if (validationError) return validationError

    const cookieStore = await cookies()
    const { sessionId, isNew } = resolveGuestSession(cookieStore)
    const ip = getClientIP(request)

    // 利用枠を原子的に予約（並行リクエストでの上限超過を防ぐ）
    const { allowed, reason, reservationId } = await reserveGuestUsage(sessionId, ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'guest_limit_exceeded', reason },
        { status: 429 },
      )
    }

    try {
      const result = await generateDesignVariants(body)
      const response = NextResponse.json(result)
      if (isNew) setGuestCookie(response, sessionId)
      return response
    } catch (error) {
      console.error('AI design generation error (guest):', error)
      if (reservationId) await releaseGuestReservation(reservationId)
      return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
    }
  }

  // ─── ログイン済みユーザーの使用量・クレジット管理 ───
  // 管理者は制限なし
  if (ADMIN_USER_IDS.includes(user.id)) {
    let body: AIDesignGenerateRequest
    try {
      body = (await request.json()) as AIDesignGenerateRequest
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const validationError = validateDesignBody(body)
    if (validationError) return validationError

    try {
      const result = await generateDesignVariants(body)
      return NextResponse.json(result)
    } catch (error) {
      console.error('AI design generation error (admin):', error)
      return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
    }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan === 'pro'
  let needsCreditDeduction = false

  if (!isPro) {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from('ai_usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('feature', 'design_generation')
      .gte('created_at', startOfMonth.toISOString())

    if ((count ?? 0) >= FREE_LIMIT) {
      const credits = profile?.credits ?? 0
      if (credits < CREDIT_COSTS.aiDesign) {
        return NextResponse.json(
          { error: 'limit_exceeded', needCredits: CREDIT_COSTS.aiDesign },
          { status: 429 },
        )
      }
      needsCreditDeduction = true
    }
  }

  let body: AIDesignGenerateRequest
  try {
    body = (await request.json()) as AIDesignGenerateRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const validationError = validateDesignBody(body)
  if (validationError) return validationError

  try {
    const result = await generateDesignVariants(body)

    if (needsCreditDeduction) {
      const { success } = await deductCredits(supabase, user.id, CREDIT_COSTS.aiDesign, 'AIデザイン生成（Free上限超過）')
      if (!success) {
        return NextResponse.json(
          { error: 'limit_exceeded', needCredits: CREDIT_COSTS.aiDesign },
          { status: 429 },
        )
      }
    }

    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature: 'design_generation',
      tokens_used: 0,
      credits_consumed: needsCreditDeduction ? CREDIT_COSTS.aiDesign : 0,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI design generation error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
