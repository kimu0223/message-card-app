import type { NextResponse } from 'next/server'
import type { cookies } from 'next/headers'

/**
 * ゲスト識別用 Cookie（__Host- プレフィックス: https + httpOnly + path=/ 必須）。
 * /api/ai/design と /api/ai/design/trial で共用する。
 */
export const GUEST_COOKIE_NAME = '__Host-gst'
export const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30日
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type CookieStore = Awaited<ReturnType<typeof cookies>>

/**
 * Cookie からゲストセッションIDを解決する。無ければ新規UUIDを発行。
 *
 * 注意: Cookie を保存しないクライアントは毎回新規 sessionId になるため、
 * セッション（端末）単位の上限は回避され得る。これは「IP日次ガード」が
 * 実質的な乱用防止の主軸である前提の割り切り（マーケ用デモの公開エンドポイント）。
 */
export function resolveGuestSession(cookieStore: CookieStore): {
  sessionId: string
  isNew: boolean
} {
  const raw = cookieStore.get(GUEST_COOKIE_NAME)?.value
  const existing = raw && UUID_REGEX.test(raw) ? raw : undefined
  return existing
    ? { sessionId: existing, isNew: false }
    : { sessionId: crypto.randomUUID(), isNew: true }
}

/** 新規セッション時にレスポンスへ Cookie をセットする。 */
export function setGuestCookie(response: NextResponse, sessionId: string): void {
  response.cookies.set(GUEST_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,        // __Host- プレフィックスに必須
    sameSite: 'strict',
    maxAge: GUEST_COOKIE_MAX_AGE,
    path: '/',           // __Host- プレフィックスに必須
  })
}
