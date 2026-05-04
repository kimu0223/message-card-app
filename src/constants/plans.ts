import type { Plan } from '@/types/user';

export interface PlanConfig {
  id: Plan;
  name: string;
  price: number; // JPY/month, 0 = free
  monthlyCardLimit: number | null;   // null = unlimited
  templateLimit: number | null;
  aiMonthlyLimit: number | null;
  animationsEnabled: boolean;
  premiumTemplates: boolean;
  credits: number;  // bonus credits on signup
  features: string[];
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    monthlyCardLimit: Number(process.env.FREE_PLAN_MONTHLY_CARDS_LIMIT ?? 5),
    templateLimit: Number(process.env.FREE_PLAN_TEMPLATES_LIMIT ?? 5),
    aiMonthlyLimit: Number(process.env.AI_MESSAGE_FREE_MONTHLY_LIMIT ?? 10),
    animationsEnabled: false,
    premiumTemplates: false,
    credits: 0,
    features: [
      '無料テンプレート5種',
      '月5枚まで作成',
      'AIメッセージ月10回',
      'AIデザイン生成 月5回',
      'PNG/PDF書き出し',
      '色紙・A4など全サイズ対応',
    ],
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    price: 490,
    monthlyCardLimit: 20,
    templateLimit: null,
    aiMonthlyLimit: 50,
    animationsEnabled: true,
    premiumTemplates: true,
    credits: 10,
    features: [
      '全テンプレート使い放題',
      '月20枚まで作成',
      'AIメッセージ月50回',
      'AIデザイン生成 月20回',
      '全アニメーション効果',
      'PNG/PDF書き出し',
      '色紙・A4など全サイズ対応',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 980,
    monthlyCardLimit: null,
    templateLimit: null,
    aiMonthlyLimit: null,
    animationsEnabled: true,
    premiumTemplates: true,
    credits: 50,
    features: [
      '全テンプレート使い放題',
      '作成枚数無制限',
      'AIメッセージ無制限',
      '全アニメーション効果',
      'AIデザイン生成 無制限',
      'AI画像生成',
      '色紙・A4など全サイズ対応',
      '優先サポート',
    ],
  },
};

export const CREDIT_COSTS = {
  premiumCard: 5,
  aiImage: 1,
  aiDesign: 2,
} as const;

export const CREDIT_PACKAGES = [
  { credits: 10,  price: 100, priceId: process.env.STRIPE_PRICE_CREDITS_10 ?? '' },
  { credits: 50,  price: 400, priceId: process.env.STRIPE_PRICE_CREDITS_50 ?? '' },
  { credits: 120, price: 800, label: 'お得', priceId: '' },
] as const;
