import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Zap, Coins } from 'lucide-react'
import UpgradeButton from '@/components/billing/UpgradeButton'
import ManageSubscriptionButton from '@/components/billing/ManageSubscriptionButton'
import CreditPackButton from '@/components/billing/CreditPackButton'
import { PLANS, CREDIT_PACKAGES } from '@/constants/plans'

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
  const proPriceId = process.env.STRIPE_PRICE_PRO_MONTHLY ?? ''

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

      {/* クレジット残高 */}
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <Coins className="h-6 w-6 text-amber-600" />
        <div>
          <p className="font-semibold text-amber-900">クレジット残高: {profile?.credits ?? 0}</p>
          <p className="text-sm text-amber-700">Free枠を超えた場合にクレジットで利用できます（有効期限なし）</p>
        </div>
      </div>

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
            {PLANS.free.features.map(f => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
          {!isPro && (
            <div className="mt-6 text-center text-sm text-zinc-500">
              今月: {profile?.cards_created_this_month ?? 0}/{PLANS.free.monthlyCardLimit} 枚作成
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
            {PLANS.pro.features.map(f => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-violet-500" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2">
            {isPro ? (
              <>
                <Button variant="outline" className="w-full" disabled>
                  ご利用中
                </Button>
                <ManageSubscriptionButton />
              </>
            ) : (
              <UpgradeButton priceId={proPriceId} />
            )}
          </div>
        </div>
      </div>

      {/* クレジットパック */}
      {!isPro && (
        <div className="mt-12">
          <h2 className="mb-2 text-xl font-bold text-zinc-900">クレジットパック</h2>
          <p className="mb-6 text-sm text-zinc-500">Free枠を超えても、クレジットで追加利用できます。有効期限はありません。</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {CREDIT_PACKAGES.map(pkg => (
              <div key={pkg.credits} className={`relative rounded-xl border-2 p-5 ${pkg.label === 'おすすめ' ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 bg-white'}`}>
                {pkg.label && (
                  <div className="absolute -top-3 left-4 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-white">
                    {pkg.label}
                  </div>
                )}
                <div className="mb-2 text-2xl font-bold text-zinc-900">{pkg.credits} <span className="text-base font-normal text-zinc-500">クレジット</span></div>
                <div className="mb-4 text-lg font-semibold text-zinc-700">¥{pkg.price.toLocaleString()}</div>
                <div className="mb-4 text-xs text-zinc-500">
                  1クレジット = ¥{Math.round(pkg.price / pkg.credits)}
                </div>
                <CreditPackButton priceId={pkg.priceId} label={`¥${pkg.price.toLocaleString()} で購入`} />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            <p className="font-medium mb-2">クレジット消費目安:</p>
            <ul className="space-y-1 text-xs">
              <li>カード作成（Free上限超過時）: 1クレジット/枚</li>
              <li>AIメッセージ生成（Free上限超過時）: 1クレジット/回</li>
              <li>AIデザイン生成（Free上限超過時）: 2クレジット/回</li>
              <li>プレミアムテンプレート利用: 1クレジット/枚</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
