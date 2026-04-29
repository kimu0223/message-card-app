'use client'

// ビルド時の静的プリレンダリングで Supabase クライアント初期化エラーが起きるため動的レンダリングに固定
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      toast.error('ログインに失敗しました。再度お試しください。')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-screen" style={{ fontFamily: 'var(--font-lp-sans)' }}>
      {/* Left: Form */}
      <div className="login-form">
        <div className="login-form-inner">
          <div style={{ marginBottom: 48 }}>
            <Logo />
          </div>

          <p className="login-eyebrow">&mdash; Welcome back &mdash;</p>

          <h1 className="login-title">またここで、あの一通を。</h1>

          <p className="login-lede">
            ログインすると、作成したカードの保存・管理や
            <br />
            プレミアムテンプレートをご利用いただけます。
          </p>

          <button
            className="btn-google"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} />
            ) : (
              <svg width="20" height="20" aria-hidden="true" viewBox="0 0 488 512">
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
            )}
            Google でログイン
          </button>

          <div className="login-foot">
            <p>
              アカウントなしでも{' '}
              <Link href="/create">登録なしで試す</Link>
            </p>
            <p style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <a href="/terms">利用規約</a>
              <a href="/privacy">プライバシーポリシー</a>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Art Panel */}
      <div className="login-art">
        <div className="login-stack">
          {/* Card 1 — pastel birthday */}
          <div className="stack-card">
            <div style={{ background: 'linear-gradient(135deg, #FBE6D4 0%, #F5BFA4 100%)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 280 360" fill="none" preserveAspectRatio="xMidYMid slice">
                <circle cx="200" cy="80" r="60" fill="rgba(255,255,255,0.25)" />
                <circle cx="60" cy="280" r="45" fill="rgba(255,255,255,0.2)" />
                <circle cx="240" cy="300" r="30" fill="rgba(255,255,255,0.15)" />
              </svg>
              <span style={{ fontFamily: 'var(--font-lp-display)', fontSize: '2.2rem', color: '#6B3A2A', position: 'relative', zIndex: 1 }}>Happy</span>
              <span style={{ fontFamily: 'var(--font-lp-serif)', fontSize: '0.9rem', color: '#6B3A2A', marginTop: '0.2rem', position: 'relative', zIndex: 1 }}>Birthday</span>
            </div>
          </div>

          {/* Card 2 — botanical */}
          <div className="stack-card">
            <div style={{ background: '#F0EDE2', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <svg style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)' }} width="160" height="180" viewBox="0 0 180 200" fill="none">
                <path d="M30 180 Q30 40 90 30 Q150 40 150 180" stroke="#6B8C6B" strokeWidth="1.5" fill="none" />
                <ellipse cx="45" cy="100" rx="8" ry="14" fill="#88A88A" transform="rotate(-20 45 100)" />
                <ellipse cx="38" cy="130" rx="7" ry="12" fill="#7A9E7A" transform="rotate(-30 38 130)" />
                <ellipse cx="135" cy="100" rx="8" ry="14" fill="#88A88A" transform="rotate(20 135 100)" />
                <ellipse cx="142" cy="130" rx="7" ry="12" fill="#7A9E7A" transform="rotate(30 142 130)" />
              </svg>
              <span style={{ fontFamily: 'var(--font-lp-serif)', fontSize: '0.85rem', color: '#3D4A3D', position: 'relative', zIndex: 1, marginTop: '2.5rem', letterSpacing: '0.05em' }}>Congratulations</span>
            </div>
          </div>

          {/* Card 3 — dark elegant */}
          <div className="stack-card">
            <div style={{ background: 'linear-gradient(160deg, #2B2520 0%, #3D332C 100%)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 280 360" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect x="40" y="50" width="8" height="16" rx="2" fill="#E8B87E" transform="rotate(25 44 58)" />
                <rect x="200" y="40" width="6" height="14" rx="2" fill="#C97B5C" transform="rotate(-15 203 47)" />
                <rect x="100" y="30" width="7" height="12" rx="2" fill="#88A88A" transform="rotate(40 103 36)" />
                <rect x="230" y="120" width="8" height="14" rx="2" fill="#E8B87E" transform="rotate(60 234 127)" />
                <rect x="160" y="280" width="8" height="16" rx="2" fill="#C97B5C" transform="rotate(20 164 288)" />
              </svg>
              <span style={{ fontFamily: 'var(--font-lp-display)', fontSize: '1.6rem', fontStyle: 'italic', color: '#F5E6D0', position: 'relative', zIndex: 1, letterSpacing: '-0.02em' }}>Thank you.</span>
            </div>
          </div>
        </div>

        {/* Art quote */}
        <div className="login-art-quote">
          <span className="scribble">&ldquo;Words are, of course, the most powerful drug&rdquo;</span>
          言葉はいつだって、いちばんの贈り物。
        </div>
      </div>
    </div>
  )
}
