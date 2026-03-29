export const STRIPE_PRICES = {
  proMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? '',
  credits10:  process.env.STRIPE_PRICE_CREDITS_10 ?? '',
  credits50:  process.env.STRIPE_PRICE_CREDITS_50 ?? '',
} as const;
