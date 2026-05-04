import type { AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai';

// --- Smart mood pre-selection based on recipient x occasion ---

export const MOOD_PRESELECTION_MAP: Record<AIDesignRecipient, Record<AIDesignOccasion, AIDesignMood>> = {
  lover: {
    birthday: 'elegant',
    thank_you: 'warm',
    congratulations: 'pop',
    anniversary: 'elegant',
    seasonal: 'warm',
    other: 'warm',
  },
  friend: {
    birthday: 'pop',
    thank_you: 'warm',
    congratulations: 'pop',
    anniversary: 'cute',
    seasonal: 'cute',
    other: 'simple',
  },
  family: {
    birthday: 'warm',
    thank_you: 'warm',
    congratulations: 'warm',
    anniversary: 'elegant',
    seasonal: 'warm',
    other: 'simple',
  },
  colleague: {
    birthday: 'simple',
    thank_you: 'simple',
    congratulations: 'cool',
    anniversary: 'cool',
    seasonal: 'simple',
    other: 'simple',
  },
  teacher: {
    birthday: 'elegant',
    thank_you: 'elegant',
    congratulations: 'elegant',
    anniversary: 'elegant',
    seasonal: 'simple',
    other: 'elegant',
  },
};

// --- UI Option Definitions ---

export const RECIPIENT_OPTIONS: { value: AIDesignRecipient; label: string; emoji: string }[] = [
  { value: 'lover', label: '恋人・パートナー', emoji: '💕' },
  { value: 'friend', label: '友人', emoji: '🤝' },
  { value: 'family', label: '家族', emoji: '👨‍👩‍👧' },
  { value: 'colleague', label: '同僚・上司', emoji: '💼' },
  { value: 'teacher', label: '先生・恩師', emoji: '🎓' },
];

export const OCCASION_OPTIONS: { value: AIDesignOccasion; label: string; emoji: string }[] = [
  { value: 'birthday', label: '誕生日', emoji: '🎂' },
  { value: 'thank_you', label: 'ありがとう', emoji: '🙏' },
  { value: 'congratulations', label: 'お祝い', emoji: '🎉' },
  { value: 'anniversary', label: '記念日', emoji: '💍' },
  { value: 'seasonal', label: '季節のご挨拶', emoji: '🌸' },
  { value: 'other', label: 'その他', emoji: '✉️' },
];

export const MOOD_OPTIONS: { value: AIDesignMood; label: string; description: string; colors: string[] }[] = [
  {
    value: 'warm',
    label: 'あたたかい',
    description: '優しい色合いで心温まるデザイン',
    colors: ['#F4E4D4', '#C97B5C', '#6B8C6B'],
  },
  {
    value: 'elegant',
    label: 'エレガント',
    description: '上品で洗練されたデザイン',
    colors: ['#1A1A2E', '#C9A96E', '#F5F0EB'],
  },
  {
    value: 'pop',
    label: 'ポップ',
    description: 'カラフルで元気なデザイン',
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
  },
  {
    value: 'cool',
    label: 'クール',
    description: 'スタイリッシュでモダンなデザイン',
    colors: ['#2D3436', '#636E72', '#00B894'],
  },
  {
    value: 'simple',
    label: 'シンプル',
    description: 'ミニマルで読みやすいデザイン',
    colors: ['#FAFAFA', '#333333', '#E0E0E0'],
  },
  {
    value: 'cute',
    label: 'かわいい',
    description: 'やわらかく愛らしいデザイン',
    colors: ['#FFE4EC', '#FF8FAB', '#A6D1E6'],
  },
];

// --- Design Generation: Font & Color Palette Guidance ---

export const FONT_GUIDANCE: Record<AIDesignMood, { primary: string; accent: string }> = {
  warm: { primary: 'Noto Serif JP', accent: 'M PLUS Rounded 1c' },
  elegant: { primary: 'Noto Serif JP', accent: 'Noto Sans JP' },
  pop: { primary: 'M PLUS Rounded 1c', accent: 'Kosugi Maru' },
  cool: { primary: 'Noto Sans JP', accent: 'Sawarabi Gothic' },
  simple: { primary: 'Noto Sans JP', accent: 'Noto Serif JP' },
  cute: { primary: 'M PLUS Rounded 1c', accent: 'Kosugi Maru' },
};

export const COLOR_PALETTES: Record<AIDesignMood, string[][]> = {
  warm: [
    ['#FDF6F0', '#C97B5C', '#6B8C6B', '#4A3728'],
    ['#FFF8F0', '#E8A87C', '#85A392', '#3D2C2E'],
    ['#F9F1E7', '#D4856B', '#7FA085', '#5C4033'],
    ['#FFF5EB', '#B5651D', '#8FBC8F', '#2F1B14'],
  ],
  elegant: [
    ['#1A1A2E', '#C9A96E', '#F5F0EB', '#4A4A6A'],
    ['#0F0F1A', '#D4AF37', '#FAF7F2', '#2C2C54'],
    ['#1E1E30', '#B8860B', '#FFFFF0', '#3B3B5C'],
    ['#12121F', '#DAA520', '#F8F4E8', '#2E2E4A'],
  ],
  pop: [
    ['#FF6B6B', '#4ECDC4', '#FFE66D', '#2C3E50'],
    ['#E74C3C', '#3498DB', '#F1C40F', '#2C3E50'],
    ['#FF5252', '#00BFA5', '#FFD740', '#37474F'],
    ['#FF4081', '#536DFE', '#FFAB40', '#263238'],
  ],
  cool: [
    ['#2D3436', '#636E72', '#00B894', '#DFE6E9'],
    ['#1B1B2F', '#4A4A6A', '#00CEC9', '#E0E0E0'],
    ['#232931', '#4ECCA3', '#393E46', '#EEEEEE'],
    ['#2C3A47', '#1B9CFC', '#3B3B98', '#F8F9FA'],
  ],
  simple: [
    ['#FFFFFF', '#333333', '#E0E0E0', '#757575'],
    ['#FAFAFA', '#212121', '#EEEEEE', '#616161'],
    ['#F5F5F5', '#424242', '#E8E8E8', '#9E9E9E'],
    ['#FFFFFF', '#1A1A1A', '#F0F0F0', '#808080'],
  ],
  cute: [
    ['#FFE4EC', '#FF8FAB', '#A6D1E6', '#FFC3A0'],
    ['#FFF0F5', '#FF69B4', '#87CEEB', '#FFDAB9'],
    ['#FFE8F0', '#F48FB1', '#81D4FA', '#FFE0B2'],
    ['#FFF5F7', '#EC407A', '#4FC3F7', '#FFCC80'],
  ],
};

// --- Occasion-Specific Decoration Hints ---

export const DECORATION_HINTS: Record<AIDesignOccasion, string[]> = {
  birthday: ['star', 'circle', 'heart'],
  thank_you: ['heart', 'circle'],
  congratulations: ['star', 'circle'],
  anniversary: ['heart', 'star'],
  seasonal: ['circle', 'star'],
  other: ['circle'],
};
