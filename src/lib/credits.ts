import { SupabaseClient } from '@supabase/supabase-js'
import { CreditTransactionType } from '@/types/user'

interface DeductResult {
  success: boolean
  remainingCredits: number
}

interface AddResult {
  success: boolean
  newBalance: number
}

/**
 * Atomically deducts credits from a user's balance.
 * Fails gracefully if the user has insufficient credits.
 */
export async function deductCredits(
  supabase: SupabaseClient,
  userId: string,
  amount: number,
  description: string
): Promise<DeductResult> {
  const { data, error } = await supabase.rpc('deduct_credits', {
    p_user_id: userId,
    p_amount: amount,
  })

  if (error || data === -1) {
    return { success: false, remainingCredits: -1 }
  }

  const remainingCredits = data as number

  // Record the transaction
  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount: -amount,
    type: 'consume' satisfies CreditTransactionType,
    description,
    stripe_payment_intent_id: null,
  })

  return { success: true, remainingCredits }
}

interface AddCreditsOptions {
  paymentIntentId?: string
  transactionType?: Extract<CreditTransactionType, 'purchase' | 'refund' | 'bonus'>
}

/**
 * Atomically adds credits to a user's balance and records the transaction.
 */
export async function addCredits(
  supabase: SupabaseClient,
  userId: string,
  amount: number,
  description: string,
  options: AddCreditsOptions = {}
): Promise<AddResult> {
  const type = options.transactionType ?? (options.paymentIntentId ? 'purchase' : 'bonus')
  const { data, error } = await supabase.rpc('add_credits', {
    p_user_id: userId,
    p_amount: amount,
    p_type: type,
    p_description: description,
    p_stripe_payment_intent_id: options.paymentIntentId ?? null,
  })

  if (error || data === -1) {
    return { success: false, newBalance: -1 }
  }

  return { success: true, newBalance: data as number }
}
