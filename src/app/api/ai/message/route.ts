import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateCardMessages } from '@/lib/gemini/message'
import { PLANS, CREDIT_COSTS } from '@/constants/plans'
import { deductCredits } from '@/lib/credits'
import type { AIMessageRequest } from '@/types/ai'

const FREE_LIMIT = PLANS.free.monthlyAiMessageLimit!

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan === 'pro'

  // Freeプランの月次制限チェック
  let needsCreditDeduction = false
  if (!isPro) {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from('ai_usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('feature', 'message_generate')
      .gte('created_at', startOfMonth.toISOString())

    if ((count ?? 0) >= FREE_LIMIT) {
      // Free上限超過 → クレジット残高チェック（消費はAI成功後）
      const credits = profile?.credits ?? 0
      if (credits < CREDIT_COSTS.aiMessage) {
        return NextResponse.json({ error: 'limit_exceeded', needCredits: CREDIT_COSTS.aiMessage }, { status: 429 })
      }
      needsCreditDeduction = true
    }
  }

  const body = await request.json() as AIMessageRequest
  const { occasion, relationship, tone, length, keywords } = body

  if (!occasion || !relationship || !tone || !length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const result = await generateCardMessages({ occasion, relationship, tone, length, keywords })

    // AI成功後にクレジット消費
    if (needsCreditDeduction) {
      const { success } = await deductCredits(supabase, user.id, CREDIT_COSTS.aiMessage, 'AIメッセージ生成（Free上限超過）')
      if (!success) {
        return NextResponse.json({ error: 'limit_exceeded', needCredits: CREDIT_COSTS.aiMessage }, { status: 429 })
      }
    }

    // 使用ログ記録
    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature: 'message_generate',
      tokens_used: 0,
      credits_consumed: needsCreditDeduction ? CREDIT_COSTS.aiMessage : 0,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI message generation error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
