import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { safeRedirectPath } from '@/lib/safe-redirect';

const PROTECTED_ROUTES = ['/dashboard', '/editor', '/settings', '/billing'];
const AUTH_ROUTES = ['/login'];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getSession() はCookieからセッションを読み取るだけでネットワーク呼び出しなし
  // getUser() はSupabaseへHTTP呼び出しが発生し、Vercelの10秒制限でタイムアウトする
  //
  // 注意: getSession() のセッションはJWT未検証のため認可の「正本」ではない。
  // ここでのチェックはあくまでUX用のリダイレクト。実データの保護は
  // (app)/layout.tsx と各 API Route の getUser()（サーバー再検証）が担う。
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;
  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    // 既ログインで /login に来た場合、next（同一オリジンの相対パス）があればそこへ。
    // 料金CTA（/login?next=/billing）からの購入導線が /dashboard で行き止まりにならないようにする。
    redirectUrl.pathname = safeRedirectPath(request.nextUrl.searchParams.get('next'));
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/dashboard/:path*', '/editor/:path*', '/billing/:path*', '/settings/:path*', '/login'],
};
