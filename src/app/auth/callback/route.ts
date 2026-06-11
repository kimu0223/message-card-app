import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // next パラメータのパスが / で始まることを確認（オープンリダイレクト防止）
      const redirectPath = next.startsWith('/') ? next : '/dashboard'
      return NextResponse.redirect(`${origin}${redirectPath}`)
    }
  }

  // エラー時はログインにリダイレクト
  return NextResponse.redirect(`${origin}/login?error=auth-failed`)
}
