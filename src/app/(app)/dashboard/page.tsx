import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/dashboard/DashboardClient'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import EmptyState from '@/components/dashboard/EmptyState'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: cards }, { data: profile }] = await Promise.all([
    supabase
      .from('cards')
      .select('id, title, status, animation, size, share_id, is_favorite, created_at, updated_at, thumbnail_url')
      .eq('user_id', user.id)
      .neq('status', 'archived')
      .order('updated_at', { ascending: false }),
    supabase
      .from('profiles')
      .select('plan, credits, cards_created_this_month')
      .eq('id', user.id)
      .single(),
  ])

  const freeLimit = parseInt(process.env.FREE_PLAN_MONTHLY_CARDS_LIMIT ?? '3')
  const usageThisMonth = profile?.cards_created_this_month ?? 0
  const isAtLimit = profile?.plan === 'free' && usageThisMonth >= freeLimit
  const plan = profile?.plan ?? 'free'
  const credits = profile?.credits ?? 0
  const cardCount = cards?.length ?? 0
  const usagePercent = freeLimit > 0 ? Math.min(100, Math.round((usageThisMonth / freeLimit) * 100)) : 0

  return (
    <div className="dash-hero">
      {/* Greeting */}
      <DashboardHeader
        isAtLimit={isAtLimit}
        cardCount={cardCount}
      />

      {/* Stats */}
      <div className="dash-stats">
        {/* Plan */}
        <div className="dash-stat featured">
          <span className="dash-stat-label">Plan</span>
          <span className="dash-stat-value">{plan === 'pro' ? 'Pro' : plan === 'standard' ? 'Std' : 'Free'}</span>
          <span className="dash-stat-foot">
            {plan === 'free' ? 'アップグレードで無制限に' : '全機能をご利用中'}
          </span>
        </div>

        {/* Monthly usage */}
        <div className="dash-stat">
          <span className="dash-stat-label">今月の作成枚数</span>
          <span className="dash-stat-value">
            {usageThisMonth}
            {plan === 'free' && (
              <span style={{ fontSize: 14, fontFamily: 'var(--font-lp-sans)', color: 'var(--lp-ink-mute)', marginLeft: 4 }}>
                / {freeLimit}
              </span>
            )}
          </span>
          {plan === 'free' && (
            <div className="dash-stat-bar">
              <div className="dash-stat-bar-fill" style={{ width: `${usagePercent}%` }} />
            </div>
          )}
          <span className="dash-stat-foot">
            {isAtLimit ? '上限に達しました' : `残り ${freeLimit - usageThisMonth} 枚`}
          </span>
        </div>

        {/* AI credits */}
        <div className="dash-stat">
          <span className="dash-stat-label">AI利用</span>
          <span className="dash-stat-value">{credits}</span>
          <span className="dash-stat-foot">クレジット残高</span>
        </div>
      </div>

      {/* Section heading */}
      <div className="app-section-h">
        <h2>マイカード</h2>
        <span style={{ fontSize: 13, color: 'var(--lp-ink-mute)' }}>最新の更新順</span>
      </div>

      {/* Card list */}
      {!cards || cards.length === 0 ? (
        <EmptyState />
      ) : (
        <DashboardClient cards={cards} isAtLimit={isAtLimit} />
      )}
    </div>
  )
}
