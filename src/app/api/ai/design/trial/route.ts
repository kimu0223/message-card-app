import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateDesignVariants } from '@/lib/gemini/design'
import {
  checkGuestLimit,
  recordGuestUsage,
  getClientIP,
  GUEST_TRIAL_DESIGN_LIMIT,
  GUEST_TRIAL_IP_DAILY_LIMIT,
} from '@/lib/guest-limit'
import { validateDesignBody } from '../_validate'
import type { AIDesignGenerateRequest } from '@/types/ai'

/**
 * トップLP「お試しデザイン生成」専用エンドポイント。
 *
 * - 認証状態に関わらずゲスト扱い（マーケ用デモのため）。
 * - 既存の __Host-gst Cookie を再利用しつつ feature='design_trial' で
 *   エディタの無料AI生成枠（design_generation）とは別カウントにする。
 * - 端末あたり GUEST_TRIAL_DESIGN_LIMIT 回（+ IP日次ガード）まで。
 */
const GUEST_COOKIE_NAME = '__Host-gst'
const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30日
const TRIAL_FEATURE = 'design_trial'
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const rawCookie = cookieStore.get(GUEST_COOKIE_NAME)?.value
  const existingSession = rawCookie && UUID_REGEX.test(rawCookie) ? rawCookie : undefined
  const sessionId = existingSession ?? crypto.randomUUID()
  const ip = getClientIP(request)

  const { allowed, reason } = await checkGuestLimit(sessionId, ip, {
    feature: TRIAL_FEATURE,
    sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
    ipDailyLimit: GUEST_TRIAL_IP_DAILY_LIMIT,
  })
  if (!allowed) {
    return NextResponse.json(
      { error: 'trial_limit_exceeded', reason },
      { status: 429 },
    )
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

    // 成功時のみ使用量を記録
    await recordGuestUsage(sessionId, ip, { feature: TRIAL_FEATURE })

    const response = NextResponse.json(result)
    if (!existingSession) {
      response.cookies.set(GUEST_COOKIE_NAME, sessionId, {
        httpOnly: true,
        secure: true,        // __Host- プレフィックスに必須
        sameSite: 'strict',
        maxAge: GUEST_COOKIE_MAX_AGE,
        path: '/',           // __Host- プレフィックスに必須
      })
    }
    return response
  } catch (error) {
    console.error('AI design trial generation error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
