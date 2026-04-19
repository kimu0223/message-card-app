import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppHeader from '@/components/layout/AppHeader'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url, plan, credits')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader user={user} profile={profile} />
      <main>{children}</main>
    </div>
  )
}
