import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { safeRedirectPath } from '@/lib/safe-redirect'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // オープンリダイレクト防止: 同一オリジン内の相対パスのみ許可。
      // `//evil.com` や `/\evil.com`（プロトコル相対/バックスラッシュ）を弾く。
      return NextResponse.redirect(`${origin}${safeRedirectPath(next)}`)
    }
  }

  // エラー時はログインにリダイレクト
  return NextResponse.redirect(`${origin}/login?error=auth-failed`)
}
