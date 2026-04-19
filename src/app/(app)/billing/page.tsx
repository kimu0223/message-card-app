import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap } from 'lucide-react'
import UpgradeButton from '@/components/billing/UpgradeButton'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits, cards_created_this_month, monthly_reset_at')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan === 'pro'

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold text-zinc-900">プラン・課金</h1>
      <p className="mb-10 text-zinc-500">プランを選択して、より多くのカードを作成しましょう</p>

      {/* 現在のプラン */}
      {isPro && (
        <div className="mb-8 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 p-5">
          <Zap className="h-6 w-6 text-violet-600" />
          <div>
            <p className="font-semibold text-violet-900">現在 Pro プランをご利用中です</p>
            <p className="text-sm text-violet-700">すべての機能が無制限でご利用いただけます</p>
          </div>
        </div>
      )}

      {/* プランカード */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Free */}
        <div className={`rounded-2xl border-2 p-6 ${!isPro ? 'border-zinc-900 bg-white' : 'border-zinc-200 bg-white'}`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">Free</h2>
            {!isPro && <Badge variant="default">現在のプラン</Badge>}
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-zinc-900">¥0</span>
            <span className="text-zinc-500">/月</span>
          </div>
          <ul className="space-y-3 text-sm text-zinc-600">
            {[
              'メッセージカード 月3枚まで',
              '5種類のテンプレート',
              'AIメッセージ生成 月5回',
              'PNG/PDFダウンロード',
              'シェアURL生成',
            ].map(f => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
          {!isPro && (
            <div className="mt-6 text-center text-sm text-zinc-500">
              今月: {profile?.cards_created_this_month ?? 0}/3 枚作成
            </div>
          )}
        </div>

        {/* Pro */}
        <div className={`rounded-2xl border-2 p-6 ${isPro ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-indigo-50' : 'border-violet-200 bg-white'}`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-violet-900">Pro</h2>
            <Badge className="bg-violet-600">おすすめ</Badge>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-violet-900">¥980</span>
            <span className="text-zinc-500">/月</span>
          </div>
          <ul className="space-y-3 text-sm text-zinc-600">
            {[
              'メッセージカード 無制限',
              'すべてのテンプレート（プレミアム含む）',
              'AIメッセージ生成 無制限',
              'AIデザイン提案',
              'PNG/PDF高画質ダウンロード',
              'カスタムアニメーション',
              '優先サポート',
            ].map(f => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-violet-500" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {isPro ? (
              <Button variant="outline" className="w-full" disabled>
                ご利用中
              </Button>
            ) : (
              <UpgradeButton />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
