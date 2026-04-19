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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* ヘッダー */}
      <DashboardHeader
        plan={profile?.plan}
        usageThisMonth={usageThisMonth}
        freeLimit={freeLimit}
        isAtLimit={isAtLimit}
      />

      {/* カード一覧 */}
      {!cards || cards.length === 0 ? (
        <EmptyState />
      ) : (
        <DashboardClient cards={cards} />
      )}
    </div>
  )
}
