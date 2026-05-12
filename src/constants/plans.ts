import type { Plan } from '@/types/user';

export interface PlanConfig {
  id: Plan;
  name: string;
  price: number; // JPY/month, 0 = free
  monthlyCardLimit: number | null;   // null = unlimited
  monthlyAiMessageLimit: number | null;
  monthlyAiDesignLimit: number | null;
  templateLimit: number | null;
  animationsEnabled: boolean;
  premiumTemplates: boolean;
  cardExpiryDays: number | null; // null = 永続（Proのみ）
  features: string[];
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    monthlyCardLimit: 3,
    monthlyAiMessageLimit: 3,
    monthlyAiDesignLimit: 1,
    templateLimit: 5,
    animationsEnabled: false,
    premiumTemplates: false,
    cardExpiryDays: 30,
    features: [
      '基本テンプレート 5種',
      '月3枚まで作成',
      'AIメッセージ 月3回',
      'AIデザイン 月1回',
      'PNG/PDF書き出し',
      '色紙・A4など全サイズ対応',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 980,
    monthlyCardLimit: null,
    monthlyAiMessageLimit: null,
    monthlyAiDesignLimit: null,
    templateLimit: null,
    animationsEnabled: true,
    premiumTemplates: true,
    cardExpiryDays: null,
    features: [
      '全テンプレート使い放題',
      '作成枚数 無制限',
      'AIメッセージ 無制限',
      'AIデザイン 無制限',
      '全アニメーション効果',
      '優先サポート',
    ],
  },
};

export const CREDIT_COSTS = {
  card: 1,
  aiMessage: 1,
  aiDesign: 2,
  premiumTemplate: 1,
} as const;

export const CREDIT_PACKAGES = [
  { credits: 5,  price: 400,  priceId: process.env.STRIPE_PRICE_CREDITS_5 ?? '',  label: undefined },
  { credits: 15, price: 1000, priceId: process.env.STRIPE_PRICE_CREDITS_15 ?? '', label: 'おすすめ' },
  { credits: 30, price: 1800, priceId: process.env.STRIPE_PRICE_CREDITS_30 ?? '', label: 'お得' },
] as const;
