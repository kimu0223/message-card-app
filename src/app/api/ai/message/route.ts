import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateCardMessages } from '@/lib/gemini/message'
import type { AIMessageRequest } from '@/types/ai'

const FREE_LIMIT = parseInt(process.env.AI_MESSAGE_FREE_MONTHLY_LIMIT ?? '5')

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // プラン確認
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan === 'pro'

  // Freeプランの月次制限チェック
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
      return NextResponse.json({ error: 'limit_exceeded' }, { status: 429 })
    }
  }

  const body = await request.json() as AIMessageRequest
  const { occasion, relationship, tone, length, keywords } = body

  if (!occasion || !relationship || !tone || !length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const result = await generateCardMessages({ occasion, relationship, tone, length, keywords })

    // 使用ログ記録
    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature: 'message_generate',
      tokens_used: 0,
      credits_consumed: 0,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI message generation error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
