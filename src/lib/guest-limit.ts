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
  const { error } = await serviceClient.from('guest_ai_usage').insert({
    session_id: sessionId,
    ip_address: ip,
    feature: opts.feature ?? 'design_generation',
  })
  if (error) console.error('recordGuestUsage insert failed:', error)
}

/**
 * ゲストの利用枠を「予約」する（TOCTOU競合対策）。
 *
 * checkGuestLimit→（生成）→recordGuestUsage の2段構えだと、並行リクエストが
 * 全員「上限未満」を読んでから一斉に生成でき、上限を超過してしまう（コスト直結）。
 * これを防ぐため「先にINSERT（予約）→自分の行を含めてCOUNT」する。
 * 並行リクエストは互いの予約を数えるため、上限を超えた分だけが弾かれる。
 *
 * AI生成は allowed=true（予約成功）後にのみ実行すること。生成に失敗したら
 * releaseGuestReservation(reservationId) で予約を取り消し、枠を返す。
 */
export async function reserveGuestUsage(
  sessionId: string,
  ip: string,
  opts: GuestLimitOptions = {},
): Promise<{ allowed: boolean; reason?: 'session' | 'ip' | 'error'; reservationId?: string }> {
  const feature = opts.feature ?? 'design_generation'
  const sessionLimit = opts.sessionLimit ?? GUEST_SESSION_LIMIT
  const ipDailyLimit = opts.ipDailyLimit ?? GUEST_IP_DAILY_LIMIT

  const serviceClient = await createServiceClient()

  // 1. 予約INSERT（自分の枠を先に確保）
  const { data: inserted, error: insertError } = await serviceClient
    .from('guest_ai_usage')
    .insert({ session_id: sessionId, ip_address: ip, feature })
    .select('id')
    .single()

  if (insertError || !inserted) {
    // 記録できないなら安全側に倒して拒否（無料生成し放題を防ぐ）
    console.error('reserveGuestUsage insert failed:', insertError)
    return { allowed: false, reason: 'error' }
  }

  const reservationId = (inserted as { id: string }).id

  // 2. 自分の予約を含めてCOUNT（> 判定: 上限を超えた予約だけ弾く）
  const windowStart = new Date()
  windowStart.setDate(windowStart.getDate() - GUEST_SESSION_WINDOW_DAYS)

  const { count: sessionCount } = await serviceClient
    .from('guest_ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('feature', feature)
    .gte('created_at', windowStart.toISOString())

  if ((sessionCount ?? 0) > sessionLimit) {
    await releaseGuestReservation(reservationId)
    return { allowed: false, reason: 'session' }
  }

  const dayStart = new Date()
  dayStart.setHours(0, 0, 0, 0)

  const { count: ipCount } = await serviceClient
    .from('guest_ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('feature', feature)
    .gte('created_at', dayStart.toISOString())

  if ((ipCount ?? 0) > ipDailyLimit) {
    await releaseGuestReservation(reservationId)
    return { allowed: false, reason: 'ip' }
  }

  return { allowed: true, reservationId }
}

/**
 * reserveGuestUsage で確保した予約を取り消す（AI生成失敗時に枠を返す）。
 */
export async function releaseGuestReservation(reservationId: string): Promise<void> {
  const serviceClient = await createServiceClient()
  const { error } = await serviceClient
    .from('guest_ai_usage')
    .delete()
    .eq('id', reservationId)
  if (error) console.error('releaseGuestReservation delete failed:', error)
}
