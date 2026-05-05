import { SupabaseClient } from '@supabase/supabase-js';
import { CreditTransactionType } from '@/types/user';

interface DeductResult {
  success: boolean;
  remainingCredits: number;
}

interface AddResult {
  success: boolean;
  newBalance: number;
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
  });

  if (error || data === -1) {
    return { success: false, remainingCredits: -1 };
  }

  const remainingCredits = data as number;

  // Record the transaction
  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount: -amount,
    type: 'consume' satisfies CreditTransactionType,
    description,
    stripe_payment_intent_id: null,
  });

  return { success: true, remainingCredits };
}

/**
 * Atomically adds credits to a user's balance.
 */
export async function addCredits(
  supabase: SupabaseClient,
  userId: string,
  amount: number,
  description: string,
  paymentIntentId?: string
): Promise<AddResult> {
  const { data, error } = await supabase.rpc('add_credits', {
    p_user_id: userId,
    p_amount: amount,
  });

  if (error || data === -1) {
    return { success: false, newBalance: -1 };
  }

  const newBalance = data as number;

  // Determine transaction type based on whether there's a payment
  const type: CreditTransactionType = paymentIntentId ? 'purchase' : 'bonus';

  // Record the transaction
  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount,
    type,
    description,
    stripe_payment_intent_id: paymentIntentId ?? null,
  });

  return { success: true, newBalance };
}
