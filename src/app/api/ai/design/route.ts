import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateDesignVariants } from '@/lib/gemini/design'
import { PLANS, CREDIT_COSTS } from '@/constants/plans'
import { deductCredits } from '@/lib/credits'
import { checkGuestLimit, recordGuestUsage, getClientIP } from '@/lib/guest-limit'
import type { AIDesignGenerateRequest, AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai'
import type { CardSize } from '@/types/card'

const FREE_LIMIT = PLANS.free.monthlyAiDesignLimit!

// 管理者ユーザーID（カンマ区切り）: レート制限・クレジット消費を完全スキップ
const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS ?? '')
  .split(',').map(s => s.trim()).filter(Boolean)

const VALID_RECIPIENTS: AIDesignRecipient[] = ['lover', 'friend', 'family', 'colleague', 'teacher']
const VALID_OCCASIONS: AIDesignOccasion[] = ['birthday', 'thank_you', 'congratulations', 'anniversary', 'seasonal', 'other']
const VALID_MOODS: AIDesignMood[] = ['warm', 'elegant', 'pop', 'cool', 'simple', 'cute']
const VALID_SIZES: CardSize[] = ['a4_landscape', 'a4_portrait', 'square', 'instagram', 'line_stamp', 'shikishi']

const GUEST_COOKIE_NAME = '__Host-gst'
const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30日

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // ─── ゲストユーザーのレート制限 ───
  if (!user) {
    const cookieStore = await cookies()
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const rawCookie = cookieStore.get(GUEST_COOKIE_NAME)?.value
    const existingSession = rawCookie && UUID_REGEX.test(rawCookie) ? rawCookie : undefined
    const guestSessionId = existingSession ?? crypto.randomUUID()
    const ip = getClientIP(request)

    const { allowed, reason } = await checkGuestLimit(guestSessionId, ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'guest_limit_exceeded', reason },
        { status: 429 },
      )
    }

    // リクエストボディを検証
    let body: AIDesignGenerateRequest
    try {
      body = (await request.json()) as AIDesignGenerateRequest
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const validationError = validateBody(body)
    if (validationError) return validationError

    try {
      const result = await generateDesignVariants(body)

      // 使用量を記録
      await recordGuestUsage(guestSessionId, ip)

      // レスポンスにセッションCookieをセット
      const response = NextResponse.json(result)
      if (!existingSession) {
        response.cookies.set(GUEST_COOKIE_NAME, guestSessionId, {
          httpOnly: true,
          secure: true,        // __Host- プレフィックスに必須
          sameSite: 'strict',
          maxAge: GUEST_COOKIE_MAX_AGE,
          path: '/',           // __Host- プレフィックスに必須
        })
      }
      return response
    } catch (error) {
      console.error('AI design generation error (guest):', error)
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
    const validationError = validateBody(body)
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

  const validationError = validateBody(body)
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

// リクエストボディのバリデーション（ゲスト・ログイン共通）
function validateBody(body: AIDesignGenerateRequest): NextResponse | null {
  const { recipient, occasion, mood, size, messageText } = body

  if (!VALID_RECIPIENTS.includes(recipient)) {
    return NextResponse.json({ error: 'Invalid recipient' }, { status: 400 })
  }
  if (!VALID_OCCASIONS.includes(occasion)) {
    return NextResponse.json({ error: 'Invalid occasion' }, { status: 400 })
  }
  if (!VALID_MOODS.includes(mood)) {
    return NextResponse.json({ error: 'Invalid mood' }, { status: 400 })
  }
  if (size && !VALID_SIZES.includes(size)) {
    return NextResponse.json({ error: 'Invalid size' }, { status: 400 })
  }
  if (messageText && messageText.length > 500) {
    return NextResponse.json({ error: 'Message text too long' }, { status: 400 })
  }
  return null
}
