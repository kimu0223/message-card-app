import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { getStripeClient } from '@/lib/stripe/client'
import { CREDIT_PACKAGES } from '@/constants/plans'
import { addCredits } from '@/lib/credits'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const stripe = getStripeClient()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const metadata = session.metadata ?? {}

        // クレジットパック購入完了
        if (metadata.type === 'credit_pack' && metadata.user_id) {
          const pkg = CREDIT_PACKAGES.find(p => p.priceId === metadata.price_id)
          if (pkg) {
            const paymentIntentId = typeof session.payment_intent === 'string'
              ? session.payment_intent
              : undefined

            const { success } = await addCredits(
              supabase,
              metadata.user_id,
              pkg.credits,
              `クレジットパック購入（${pkg.credits}クレジット）`,
              {
                paymentIntentId,
                transactionType: 'purchase',
              }
            )

            if (!success) {
              throw new Error(`Failed to add credits for checkout session ${session.id}`)
            }
          }
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        const isActive = ['active', 'trialing'].includes(subscription.status)

        await supabase.from('profiles').update({
          plan: isActive ? 'pro' : 'free',
          updated_at: new Date().toISOString(),
        }).eq('id', profile.id)

        const periodEnd = (subscription as unknown as Record<string, unknown>).current_period_end as number | undefined
        await supabase.from('subscriptions').upsert({
          user_id: profile.id,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'stripe_subscription_id' })

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        await supabase.from('profiles').update({
          plan: 'free',
          updated_at: new Date().toISOString(),
        }).eq('id', profile.id)

        break
      }
    }
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
