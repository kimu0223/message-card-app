/**
 * オープンリダイレクト防止のための、安全な「同一オリジン相対パス」判定。
 *
 * ログイン後の `next` パラメータなど、ユーザー入力由来のリダイレクト先に使う。
 * 先頭が `/` の相対パスのみ許可し、`//evil.com`（プロトコル相対）や
 * `/\evil.com`（バックスラッシュ）といった外部オリジンへ飛ばすトリックを弾く。
 *
 * 注意: `searchParams.get()` は percent-decode 済みの値を返すため、ここには
 * デコード後の文字列を渡すこと（`%2F%2F` → `//` などは呼び出し側で解決済み）。
 */
export function isSafeRelativePath(path: string | null | undefined): path is string {
  return (
    !!path &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.startsWith('/\\')
  )
}

/**
 * `next` を検証し、安全なら返し、危険/未指定ならフォールバックを返す。
 */
export function safeRedirectPath(
  path: string | null | undefined,
  fallback = '/dashboard'
): string {
  return isSafeRelativePath(path) ? path : fallback
}
