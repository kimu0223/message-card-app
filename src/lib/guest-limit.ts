/**
 * ゲストユーザー（未ログイン）向けAIデザイン生成レート制限
 *
 * Layer 1: Cookie セッション → 1回 / 30日
 * Layer 2: IP アドレス       → 10回 / 日
 *
 * guest_ai_usage テーブルは service_role のみアクセス可（RLSで直接アクセス拒否）
 */

import { createServiceClient } from '@/lib/supabase/server'

export const GUEST_SESSION_LIMIT = 3       // 30日間で3回（体験機会を広げる）
export const GUEST_SESSION_WINDOW_DAYS = 30
export const GUEST_IP_DAILY_LIMIT = 10    // 1日10回（副次制限）

// トップLP「お試しデザイン生成」専用の独立枠（feature='design_trial'）。
// エディタの無料AI生成枠（design_generation）とは別カウントで管理する。
export const GUEST_TRIAL_DESIGN_LIMIT = 2     // 端末あたり30日間で2回
export const GUEST_TRIAL_IP_DAILY_LIMIT = 8   // 1日8回（副次制限）

export interface GuestLimitOptions {
  /** カウント対象の機能。既定は 'design_generation'（エディタの無料AI生成枠） */
  feature?: string
  /** セッション（Cookie）あたりの上限。既定は GUEST_SESSION_LIMIT */
  sessionLimit?: number
  /** IPあたりの日次上限。既定は GUEST_IP_DAILY_LIMIT */
  ipDailyLimit?: number
}

/**
 * Vercel 環境に対応した信頼できるクライアントIPを取得する。
 * x-real-ip（Vercelがセット）を優先し、なければ x-forwarded-for の末尾IPを使用。
 * 末尾IPはインフラ側プロキシが追加するため、クライアント偽装が困難。
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() ??
    'unknown'
  )
}

/**
 * ゲストのレート制限をチェックする。
 * @returns allowed: true なら生成許可、false なら reason に理由が入る
 */
export async function checkGuestLimit(
  sessionId: string,
  ip: string,
  opts: GuestLimitOptions = {},
): Promise<{ allowed: boolean; reason?: 'session' | 'ip' }> {
  const feature = opts.feature ?? 'design_generation'
  const sessionLimit = opts.sessionLimit ?? GUEST_SESSION_LIMIT
  const ipDailyLimit = opts.ipDailyLimit ?? GUEST_IP_DAILY_LIMIT

  const serviceClient = await createServiceClient()

  // Layer 1: セッション制限（30日ウィンドウ）
  const windowStart = new Date()
  windowStart.setDate(windowStart.getDate() - GUEST_SESSION_WINDOW_DAYS)

  const { count: sessionCount } = await serviceClient
    .from('guest_ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('feature', feature)
    .gte('created_at', windowStart.toISOString())

  if ((sessionCount ?? 0) >= sessionLimit) {
    return { allowed: false, reason: 'session' }
  }

  // Layer 2: IP制限（日次）
  const dayStart = new Date()
  dayStart.setHours(0, 0, 0, 0)

  const { count: ipCount } = await serviceClient
    .from('guest_ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('feature', feature)
    .gte('created_at', dayStart.toISOString())

  if ((ipCount ?? 0) >= ipDailyLimit) {
    return { allowed: false, reason: 'ip' }
  }

  return { allowed: true }
}

/**
 * ゲストの使用量をDBに記録する。AI生成成功後に呼び出す。
 */
export async function recordGuestUsage(
  sessionId: string,
  ip: string,
  opts: Pick<GuestLimitOptions, 'feature'> = {},
): Promise<void> {
  const serviceClient = await createServiceClient()
  await serviceClient.from('guest_ai_usage').insert({
    session_id: sessionId,
    ip_address: ip,
    feature: opts.feature ?? 'design_generation',
  })
}
