import type { Template } from '@/types/template';

// Seed data for free templates (5 types)
// canvasData will be populated properly when Supabase is set up
export const FREE_TEMPLATE_SEEDS: Omit<Template, 'canvasData'>[] = [
  {
    id: 'tpl_birthday_simple',
    slug: 'birthday-simple',
    category: 'birthday',
    style: 'simple',
    name: 'シンプル誕生日',
    thumbnailUrl: '/templates/birthday-simple.jpg',
    isPremium: false,
    tags: ['birthday', 'シンプル', 'ミニマル'],
    sortOrder: 1,
  },
  {
    id: 'tpl_birthday_pop',
    slug: 'birthday-pop',
    category: 'birthday',
    style: 'pop',
    name: 'ポップ誕生日',
    thumbnailUrl: '/templates/birthday-pop.jpg',
    isPremium: false,
    tags: ['birthday', 'ポップ', 'カラフル'],
    sortOrder: 2,
  },
  {
    id: 'tpl_thank_you_elegant',
    slug: 'thank-you-elegant',
    category: 'thank_you',
    style: 'elegant',
    name: 'エレガントお礼',
    thumbnailUrl: '/templates/thank-you-elegant.jpg',
    isPremium: false,
    tags: ['thank_you', 'エレガント', 'フォーマル'],
    sortOrder: 3,
  },
  {
    id: 'tpl_congratulations_cool',
    slug: 'congratulations-cool',
    category: 'congratulations',
    style: 'cool',
    name: 'クールお祝い',
    thumbnailUrl: '/templates/congratulations-cool.jpg',
    isPremium: false,
    tags: ['congratulations', 'クール', 'スタイリッシュ'],
    sortOrder: 4,
  },
  {
    id: 'tpl_seasonal_simple',
    slug: 'seasonal-simple',
    category: 'seasonal',
    style: 'cute',
    name: 'かわいい季節カード',
    thumbnailUrl: '/templates/seasonal-cute.jpg',
    isPremium: false,
    tags: ['seasonal', 'かわいい', '季節'],
    sortOrder: 5,
  },
];

export const TEMPLATE_CATEGORY_LABELS: Record<string, string> = {
  birthday: '誕生日',
  wedding: '結婚',
  anniversary: '記念日',
  thank_you: 'お礼',
  congratulations: 'お祝い',
  seasonal: '季節',
  business: 'ビジネス',
};

export const TEMPLATE_STYLE_LABELS: Record<string, string> = {
  cute: 'かわいい',
  elegant: 'エレガント',
  cool: 'クール',
  simple: 'シンプル',
  pop: 'ポップ',
};
