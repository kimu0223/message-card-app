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

// COLOR_PALETTES: 各配列は [背景色(60%), メインカラー(30%), アクセントカラー(10%), テキスト色] の順
// 60-30-10ルールを適用: 背景=最も広い面積、メイン=装飾/図形、アクセント=強調ポイント、テキスト=可読性確保
export const COLOR_PALETTES: Record<AIDesignMood, string[][]> = {
  warm: [
    ['#FDF6F0', '#C97B5C', '#E8B86D', '#3D2B1F'],
    ['#FFF8F0', '#B8705A', '#7FA085', '#2C1810'],
    ['#F5EDE4', '#D4856B', '#C4A55A', '#4A3228'],
    ['#FFF5EB', '#A0522D', '#D4A574', '#2F1B14'],
  ],
  elegant: [
    ['#F8F5F0', '#1A1A2E', '#C9A96E', '#1A1A2E'],
    ['#FAF7F2', '#2C2C54', '#D4AF37', '#0F0F1A'],
    ['#1A1A2E', '#C9A96E', '#F5F0EB', '#F5F0EB'],
    ['#12121F', '#B8860B', '#E8DFD0', '#F0ECE4'],
  ],
  pop: [
    ['#FFF9E8', '#FF6B6B', '#4ECDC4', '#2C3E50'],
    ['#F0FFFE', '#E74C3C', '#F1C40F', '#1A1A2E'],
    ['#FFF8F0', '#FF5252', '#00BFA5', '#37474F'],
    ['#F5F0FF', '#FF4081', '#FFD740', '#263238'],
  ],
  cool: [
    ['#F8FFFE', '#2D3436', '#00B894', '#2D3436'],
    ['#F5F7FA', '#1B1B2F', '#00CEC9', '#1B1B2F'],
    ['#232931', '#4ECCA3', '#636E72', '#EEEEEE'],
    ['#F8F9FA', '#2C3A47', '#1B9CFC', '#2C3A47'],
  ],
  simple: [
    ['#FFFFFF', '#1A1A1A', '#C8A96E', '#333333'],
    ['#FAFAFA', '#212121', '#4A90A4', '#2A2A2A'],
    ['#F5F5F5', '#333333', '#B8860B', '#424242'],
    ['#FFFFFF', '#1A1A1A', '#6B8C6B', '#2A2A2A'],
  ],
  cute: [
    ['#FFF5F7', '#FF8FAB', '#A6D1E6', '#5C3D4A'],
    ['#FFF0F5', '#F06292', '#80DEEA', '#4A3040'],
    ['#F8F0FF', '#BA68C8', '#FFB3C1', '#3D2952'],
    ['#FFF8E1', '#FF8A80', '#81D4FA', '#4A3228'],
  ],
};

// --- Occasion-Specific Decoration Hints ---
// 各シーンに対して、装飾の役割と推奨シェイプを定義
export const DECORATION_HINTS: Record<AIDesignOccasion, { shapes: string[]; roles: string[] }> = {
  birthday: {
    shapes: ['star', 'circle', 'rect'],
    roles: ['コーナーに散りばめた紙吹雪風の小さな星', '背景のソフトな円形ボケ', 'タイトル下のアンダーライン用細長い矩形'],
  },
  thank_you: {
    shapes: ['heart', 'circle', 'rect'],
    roles: ['メッセージ周囲のアクセントハート', '背景のやわらかいドット装飾', 'テキストを囲むフレーム用矩形'],
  },
  congratulations: {
    shapes: ['star', 'circle', 'rect'],
    roles: ['祝福を表す大小の星', '華やかさを出す円形装飾', 'バナー風の矩形フレーム'],
  },
  anniversary: {
    shapes: ['heart', 'circle', 'star'],
    roles: ['愛を象徴するメインハート', 'エレガントな円形フレーム', '控えめなキラキラ星'],
  },
  seasonal: {
    shapes: ['circle', 'rect', 'star'],
    roles: ['季節感を出す丸い装飾', '横長の帯デザイン', 'アクセント用の小さな星'],
  },
  other: {
    shapes: ['circle', 'rect'],
    roles: ['ニュートラルな丸形アクセント', 'シンプルなフレーム矩形'],
  },
};

// --- Layout Pattern Descriptions (4 patterns for diversity) ---
export const LAYOUT_PATTERNS = {
  pattern1: {
    name: 'ミニマル・センター',
    description: '余白を最大限活かしたミニマルデザイン。テキストを中央やや上に配置し、装飾は1-2個の控えめなアクセントのみ。',
    elementCount: '装飾0-2個 + テキスト1-2個',
    layoutGuide: 'テキストはキャンバス中央の黄金比ポイント(上から38%付近)に配置。装飾は隅に小さく1つだけ。',
  },
  pattern2: {
    name: 'クラシック・バランス',
    description: '中央対称の伝統的レイアウト。装飾フレームでテキストを囲み、上下左右対称に配置。',
    elementCount: '装飾3-4個 + テキスト2-3個',
    layoutGuide: 'テキストは中央に堂々と配置。四隅または上下に対称的な装飾を配置。フレーム感を出す。',
  },
  pattern3: {
    name: 'アシンメトリック・モダン',
    description: '非対称でダイナミックなレイアウト。三分割法を使い、要素を意図的にオフセット配置。',
    elementCount: '装飾2-3個 + テキスト2-3個',
    layoutGuide: 'テキストを左寄りまたは右寄り(1/3 or 2/3地点)に配置。対角線上に装飾を配置してバランスを取る。',
  },
  pattern4: {
    name: 'デコラティブ・フレーム',
    description: '装飾多めの華やかなデザイン。枠やボーダーを装飾で構成し、中央にテキストを際立たせる。',
    elementCount: '装飾4-6個 + テキスト2-3個',
    layoutGuide: 'テキストは中央に配置し、周囲を装飾で華やかに囲む。コーナー装飾+上下アクセントでフレーム感。',
  },
} as const;
