import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateDesignVariants } from '@/lib/gemini/design'
import {
  reserveGuestUsage,
  releaseGuestReservation,
  getClientIP,
  GUEST_TRIAL_DESIGN_LIMIT,
  GUEST_TRIAL_IP_DAILY_LIMIT,
} from '@/lib/guest-limit'
import { validateDesignBody } from '../_validate'
import { resolveGuestSession, setGuestCookie } from '../_guest-session'
import type { AIDesignGenerateRequest } from '@/types/ai'

/**
 * トップLP「お試しデザイン生成」専用エンドポイント。
 *
 * - 認証状態に関わらずゲスト扱い（マーケ用デモのため）。
 * - 既存の __Host-gst Cookie を再利用しつつ feature='design_trial' で
 *   エディタの無料AI生成枠（design_generation）とは別カウントにする。
 * - 端末あたり GUEST_TRIAL_DESIGN_LIMIT 回（+ IP日次ガード）まで。
 * - 並行リクエストでの上限超過を防ぐため reserveGuestUsage（先INSERT→COUNT）で原子的に予約する。
 */
const TRIAL_FEATURE = 'design_trial'

export async function POST(request: Request) {
  // 1. ボディ検証を先に行い、不正リクエストで無駄なDB往復・予約を発生させない
  let body: AIDesignGenerateRequest
  try {
    body = (await request.json()) as AIDesignGenerateRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const validationError = validateDesignBody(body)
  if (validationError) return validationError

  // 2. ゲストセッション解決 + 利用枠の原子的予約
  const cookieStore = await cookies()
  const { sessionId, isNew } = resolveGuestSession(cookieStore)
  const ip = getClientIP(request)

  const { allowed, reason, reservationId } = await reserveGuestUsage(sessionId, ip, {
    feature: TRIAL_FEATURE,
    sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
    ipDailyLimit: GUEST_TRIAL_IP_DAILY_LIMIT,
  })
  if (!allowed) {
    return NextResponse.json({ error: 'trial_limit_exceeded', reason }, { status: 429 })
  }

  // 3. AI生成（失敗時は予約を取り消して枠を返す）
  try {
    const result = await generateDesignVariants(body)
    const response = NextResponse.json(result)
    if (isNew) setGuestCookie(response, sessionId)
    return response
  } catch (error) {
    console.error('AI design trial generation error:', error)
    if (reservationId) await releaseGuestReservation(reservationId)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
