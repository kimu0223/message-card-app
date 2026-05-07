/**
 * ゲストユーザー（未ログイン）向けAIデザイン生成レート制限
 *
 * Layer 1: Cookie セッション → 1回 / 30日
 * Layer 2: IP アドレス       → 10回 / 日
 *
 * guest_ai_usage テーブルは service_role のみアクセス可（RLSで直接アクセス拒否）
 */

import { createServiceClient } from '@/lib/supabase/server'

export const GUEST_SESSION_LIMIT = 1       // 30日間で1回
export const GUEST_SESSION_WINDOW_DAYS = 30
export const GUEST_IP_DAILY_LIMIT = 10    // 1日10回（副次制限）

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
): Promise<{ allowed: boolean; reason?: 'session' | 'ip' }> {
  const serviceClient = await createServiceClient()

  // Layer 1: セッション制限（30日ウィンドウ）
  const windowStart = new Date()
  windowStart.setDate(windowStart.getDate() - GUEST_SESSION_WINDOW_DAYS)

  const { count: sessionCount } = await serviceClient
    .from('guest_ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('feature', 'design_generation')
    .gte('created_at', windowStart.toISOString())

  if ((sessionCount ?? 0) >= GUEST_SESSION_LIMIT) {
    return { allowed: false, reason: 'session' }
  }

  // Layer 2: IP制限（日次）
  const dayStart = new Date()
  dayStart.setHours(0, 0, 0, 0)

  const { count: ipCount } = await serviceClient
    .from('guest_ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('feature', 'design_generation')
    .gte('created_at', dayStart.toISOString())

  if ((ipCount ?? 0) >= GUEST_IP_DAILY_LIMIT) {
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
): Promise<void> {
  const serviceClient = await createServiceClient()
  await serviceClient.from('guest_ai_usage').insert({
    session_id: sessionId,
    ip_address: ip,
    feature: 'design_generation',
  })
}
