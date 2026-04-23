export type Plan = 'free' | 'standard' | 'pro';

export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  plan: Plan;
  credits: number;
  stripeCustomerId: string | null;
  cardsCreatedThisMonth: number;
  monthlyResetAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: string;
}

export type CreditTransactionType = 'purchase' | 'consume' | 'refund' | 'bonus';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: CreditTransactionType;
  description: string;
  stripePaymentIntentId: string | null;
  createdAt: string;
}
