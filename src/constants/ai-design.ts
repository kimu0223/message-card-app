import type { AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai';

// --- Smart mood pre-selection based on recipient x occasion ---

export const MOOD_PRESELECTION_MAP: Record<AIDesignRecipient, Record<AIDesignOccasion, AIDesignMood>> = {
  lover: {
    birthday: 'elegant', thank_you: 'warm', congratulations: 'pop', anniversary: 'romantic',
    seasonal: 'warm', other: 'warm', graduation: 'romantic', farewell: 'romantic',
    get_well: 'warm', christmas: 'romantic', new_year: 'elegant', valentines: 'romantic',
    new_baby: 'warm', wedding: 'elegant', housewarming: 'warm',
  },
  friend: {
    birthday: 'pop', thank_you: 'warm', congratulations: 'festive', anniversary: 'cute',
    seasonal: 'cute', other: 'simple', graduation: 'festive', farewell: 'warm',
    get_well: 'cute', christmas: 'festive', new_year: 'cute', valentines: 'cute',
    new_baby: 'cute', wedding: 'floral', housewarming: 'warm',
  },
  family: {
    birthday: 'warm', thank_you: 'warm', congratulations: 'warm', anniversary: 'elegant',
    seasonal: 'natural', other: 'simple', graduation: 'festive', farewell: 'warm',
    get_well: 'natural', christmas: 'warm', new_year: 'natural', valentines: 'warm',
    new_baby: 'cute', wedding: 'floral', housewarming: 'warm',
  },
  colleague: {
    birthday: 'simple', thank_you: 'simple', congratulations: 'cool', anniversary: 'cool',
    seasonal: 'simple', other: 'simple', graduation: 'cool', farewell: 'elegant',
    get_well: 'simple', christmas: 'simple', new_year: 'elegant', valentines: 'simple',
    new_baby: 'simple', wedding: 'elegant', housewarming: 'simple',
  },
  teacher: {
    birthday: 'elegant', thank_you: 'elegant', congratulations: 'elegant', anniversary: 'elegant',
    seasonal: 'simple', other: 'elegant', graduation: 'elegant', farewell: 'floral',
    get_well: 'natural', christmas: 'elegant', new_year: 'elegant', valentines: 'simple',
    new_baby: 'warm', wedding: 'elegant', housewarming: 'simple',
  },
  boss: {
    birthday: 'elegant', thank_you: 'elegant', congratulations: 'simple', anniversary: 'elegant',
    seasonal: 'simple', other: 'simple', graduation: 'cool', farewell: 'elegant',
    get_well: 'simple', christmas: 'simple', new_year: 'elegant', valentines: 'simple',
    new_baby: 'warm', wedding: 'elegant', housewarming: 'simple',
  },
  sibling: {
    birthday: 'pop', thank_you: 'warm', congratulations: 'pop', anniversary: 'warm',
    seasonal: 'cute', other: 'warm', graduation: 'festive', farewell: 'warm',
    get_well: 'cute', christmas: 'festive', new_year: 'natural', valentines: 'cute',
    new_baby: 'cute', wedding: 'floral', housewarming: 'warm',
  },
  grandparent: {
    birthday: 'warm', thank_you: 'elegant', congratulations: 'warm', anniversary: 'elegant',
    seasonal: 'natural', other: 'warm', graduation: 'elegant', farewell: 'warm',
    get_well: 'natural', christmas: 'warm', new_year: 'natural', valentines: 'warm',
    new_baby: 'natural', wedding: 'floral', housewarming: 'warm',
  },
  child: {
    birthday: 'pop', thank_you: 'cute', congratulations: 'festive', anniversary: 'cute',
    seasonal: 'cute', other: 'pop', graduation: 'festive', farewell: 'warm',
    get_well: 'cute', christmas: 'festive', new_year: 'cute', valentines: 'cute',
    new_baby: 'cute', wedding: 'floral', housewarming: 'pop',
  },
  client: {
    birthday: 'simple', thank_you: 'elegant', congratulations: 'cool', anniversary: 'elegant',
    seasonal: 'simple', other: 'simple', graduation: 'cool', farewell: 'elegant',
    get_well: 'simple', christmas: 'elegant', new_year: 'elegant', valentines: 'simple',
    new_baby: 'simple', wedding: 'elegant', housewarming: 'simple',
  },
};

// --- UI Option Definitions ---

export const RECIPIENT_OPTIONS: { value: AIDesignRecipient; label: string; emoji: string }[] = [
  { value: 'lover',       label: '恋人・パートナー', emoji: '💕' },
  { value: 'friend',      label: '友人',             emoji: '🤝' },
  { value: 'family',      label: '家族',             emoji: '👨‍👩‍👧' },
  { value: 'sibling',     label: '兄弟・姉妹',       emoji: '👫' },
  { value: 'grandparent', label: '祖父母',           emoji: '👴' },
  { value: 'child',       label: '子供へ',           emoji: '🧒' },
  { value: 'colleague',   label: '同僚',             emoji: '💼' },
  { value: 'boss',        label: '上司',             emoji: '👔' },
  { value: 'teacher',     label: '先生・恩師',       emoji: '🎓' },
  { value: 'client',      label: '取引先',           emoji: '🤝' },
];

export const OCCASION_OPTIONS: { value: AIDesignOccasion; label: string; emoji: string }[] = [
  { value: 'birthday',        label: '誕生日',           emoji: '🎂' },
  { value: 'thank_you',       label: 'ありがとう',       emoji: '🙏' },
  { value: 'congratulations', label: 'お祝い',           emoji: '🎉' },
  { value: 'anniversary',     label: '記念日',           emoji: '💍' },
  { value: 'graduation',      label: '卒業・入学',       emoji: '🎓' },
  { value: 'wedding',         label: '結婚・入籍',       emoji: '💒' },
  { value: 'new_baby',        label: '出産・誕生',       emoji: '👶' },
  { value: 'farewell',        label: '退職・送別',       emoji: '🌅' },
  { value: 'get_well',        label: '快気・応援',       emoji: '🌿' },
  { value: 'valentines',      label: 'バレンタイン',     emoji: '💝' },
  { value: 'christmas',       label: 'クリスマス',       emoji: '🎄' },
  { value: 'new_year',        label: '年賀・お正月',     emoji: '🎍' },
  { value: 'housewarming',    label: '引越し祝い',       emoji: '🏠' },
  { value: 'seasonal',        label: '季節のご挨拶',     emoji: '🌸' },
  { value: 'other',           label: 'その他',           emoji: '✉️' },
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
  {
    value: 'floral',
    label: 'フローラル',
    description: '花いっぱいの華やかなデザイン',
    colors: ['#FFF0F5', '#E8728A', '#8FA68A'],
  },
  {
    value: 'festive',
    label: 'フェスティブ',
    description: 'お祝い感あふれる賑やかなデザイン',
    colors: ['#FFF9E8', '#FF8C00', '#E63946'],
  },
  {
    value: 'romantic',
    label: 'ロマンティック',
    description: '深みのある愛情あふれるデザイン',
    colors: ['#1A0A10', '#8B1C3A', '#C9A96E'],
  },
  {
    value: 'natural',
    label: 'ナチュラル',
    description: 'アースカラーのオーガニックなデザイン',
    colors: ['#F2EDE4', '#8B7355', '#6E8669'],
  },
];

// --- Design Generation: Font & Color Palette Guidance ---

export const FONT_GUIDANCE: Record<AIDesignMood, { primary: string; accent: string }> = {
  warm:     { primary: 'Noto Serif JP',       accent: 'M PLUS Rounded 1c' },
  elegant:  { primary: 'Noto Serif JP',       accent: 'Noto Sans JP' },
  pop:      { primary: 'M PLUS Rounded 1c',   accent: 'Kosugi Maru' },
  cool:     { primary: 'Noto Sans JP',         accent: 'Sawarabi Gothic' },
  simple:   { primary: 'Noto Sans JP',         accent: 'Noto Serif JP' },
  cute:     { primary: 'M PLUS Rounded 1c',   accent: 'Kosugi Maru' },
  floral:   { primary: 'Noto Serif JP',       accent: 'M PLUS Rounded 1c' },
  festive:  { primary: 'M PLUS Rounded 1c',   accent: 'Kosugi Maru' },
  romantic: { primary: 'Noto Serif JP',       accent: 'Noto Serif JP' },
  natural:  { primary: 'Noto Serif JP',       accent: 'Noto Sans JP' },
};

// COLOR_PALETTES: 各配列は [背景色(60%), メインカラー(30%), アクセントカラー(10%), テキスト色] の順
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
  floral: [
    // 水彩パステル: 淡いローズ × セージグリーン（英国庭園風）
    ['#FEFAF9', '#D4748A', '#7A9E7E', '#3D1A25'],
    // ラベンダー × ピーチ（春の庭園）
    ['#FAF0FF', '#B56EC4', '#E8A87C', '#3D1250'],
    // アイボリー × ブラッシュピンク（水彩スケッチ風）
    ['#FFFBF5', '#E8A0B0', '#B5C9A0', '#4A2030'],
    // ブルーベール × コーラル（透明感あふれる水彩）
    ['#F5F8FF', '#9AB0E8', '#E8907A', '#1A2555'],
  ],
  festive: [
    ['#FFFCF0', '#FF8C00', '#E63946', '#2B2520'],
    ['#FFF9F0', '#F77F00', '#D62839', '#1A1210'],
    ['#FEF9EC', '#FCBF49', '#D62839', '#2B2520'],
    ['#FFFDE8', '#FFB703', '#E63946', '#1A1A2E'],
  ],
  romantic: [
    ['#1A0A10', '#8B1C3A', '#C9A96E', '#F5EBD7'],
    ['#120610', '#7B1535', '#B89263', '#F0E6D0'],
    ['#120818', '#7A2060', '#C9A96E', '#EDE3CE'],
    ['#150A12', '#6B1430', '#D4AF37', '#FFFCF5'],
  ],
  natural: [
    ['#F2EDE4', '#8B7355', '#6E8669', '#2B2520'],
    ['#EDE8DE', '#7A6448', '#5C7A52', '#2B2520'],
    ['#F5F0E8', '#967C5C', '#74906A', '#2B2520'],
    ['#EDE5D8', '#8C7060', '#5A7A60', '#3D2B1F'],
  ],
};

// --- Occasion-Specific Decoration Hints ---
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
    shapes: ['circle', 'circle', 'rect'],
    roles: [
      '花びら風の淡い大円: opacity 0.08-0.15の円を右上と左下コーナーに大きめ(width:200-300px)で配置',
      '中サイズの重ね円: opacity 0.2-0.35の円を大円の内側にずらして重ね、水彩の滲み感を演出',
      '細いセパレーター矩形: テキストとの境界に細長い矩形(height:2-4px)でエレガントに分割',
    ],
  },
  other: {
    shapes: ['circle', 'rect'],
    roles: ['ニュートラルな丸形アクセント', 'シンプルなフレーム矩形'],
  },
  graduation: {
    shapes: ['star', 'circle', 'rect'],
    roles: ['卒業を祝う輝く星', '旅立ちを表す円形モチーフ', '学位記風の矩形フレーム'],
  },
  farewell: {
    shapes: ['circle', 'rect', 'star'],
    roles: ['夕日をイメージした大きな円', '地平線を表す横長矩形', '感謝を表す輝く星'],
  },
  get_well: {
    shapes: ['circle', 'heart', 'star'],
    roles: ['回復を願う優しい円形', '応援の気持ちを込めたハート', '希望の光を表す星'],
  },
  christmas: {
    shapes: ['star', 'circle', 'rect'],
    roles: ['クリスマスを彩る星飾り', '雪のような丸い飾り', 'プレゼントボックス風矩形'],
  },
  new_year: {
    shapes: ['circle', 'rect', 'star'],
    roles: ['門松をイメージした装飾', '初日の出のような円形', '新年の輝きを表す星'],
  },
  valentines: {
    shapes: ['heart', 'circle', 'star'],
    roles: [
      '愛を象徴するメインハート: 中央やや上にopacity 0.6-0.8で配置',
      '花びら風の淡い円: opacity 0.1-0.2の大きめ円を3-4個重ねてふわっとした背景感',
      '散りばめた小さな星: コーナー周辺にopacity 0.4-0.6でアクセント',
    ],
  },
  new_baby: {
    shapes: ['circle', 'star', 'heart'],
    roles: ['やわらかい円形の泡模様', '新たな命を祝う小さな星', '愛情を込めたハート'],
  },
  wedding: {
    shapes: ['circle', 'heart', 'rect'],
    roles: [
      'リースを模した円形の重なり: 大中小の円をopacity 0.12-0.25で重ねてフラワーリング感を出す',
      '愛を象徴するハート: コーナーまたは中央にopacity 0.5-0.7で配置',
      '格式ある細いボーダー矩形: キャンバス全体を囲む細枠（strokeWidthのみ）',
    ],
  },
  housewarming: {
    shapes: ['rect', 'circle', 'star'],
    roles: ['家の形を模した矩形', '温かみのある円形', '新生活を祝う星'],
  },
};

// --- Layout Pattern Descriptions (4 patterns for diversity) ---
// floralの装飾ヒントは DECORATION_HINTS の seasonal と thank_you にも反映される
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
