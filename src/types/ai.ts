import type { CardSize, CanvasData } from './card';

export type AIFeature = 'message_generation' | 'design_generation' | 'design_refine' | 'image_generation';

// --- Message Generation (existing) ---

export interface AIMessageRequest {
  occasion: string;
  relationship: string;
  tone: string;
  keywords?: string[];
  length: 'short' | 'medium' | 'long';
}

export interface AIMessageResponse {
  messages: string[];
  creditsUsed: number;
}

// --- Design Generation ---

export type AIDesignRecipient =
  | 'lover'       // 恋人・パートナー
  | 'friend'      // 友人
  | 'family'      // 家族
  | 'colleague'   // 同僚
  | 'teacher'     // 先生
  | 'boss'        // 上司
  | 'sibling'     // 兄弟・姉妹
  | 'grandparent' // 祖父母
  | 'child'       // 子供へ
  | 'client';     // 取引先・クライアント

export type AIDesignOccasion =
  | 'birthday'        // 誕生日
  | 'thank_you'       // ありがとう
  | 'congratulations' // お祝い
  | 'anniversary'     // 記念日
  | 'seasonal'        // 季節のご挨拶
  | 'other'           // その他
  | 'graduation'      // 卒業・入学
  | 'farewell'        // 退職・送別
  | 'get_well'        // 快気祝い・応援
  | 'christmas'       // クリスマス
  | 'new_year'        // 年賀・お正月
  | 'valentines'      // バレンタイン・ホワイトデー
  | 'new_baby'        // 出産・誕生
  | 'wedding'         // 結婚・入籍
  | 'housewarming';   // 引越し・新居

export type AIDesignMood =
  | 'warm'      // あたたかい
  | 'elegant'   // エレガント
  | 'pop'       // ポップ
  | 'cool'      // クール
  | 'simple'    // シンプル
  | 'cute'      // かわいい
  | 'floral'    // フローラル
  | 'festive'   // フェスティブ
  | 'romantic'  // ロマンティック
  | 'natural';  // ナチュラル

export interface AIDesignGenerateRequest {
  recipient: AIDesignRecipient;
  occasion: AIDesignOccasion;
  mood: AIDesignMood;
  size?: CardSize;
  messageText?: string;
}

export interface AIDesignRefinement {
  baseVariant: CanvasData;
  colorTemperature?: 'warmer' | 'neutral' | 'cooler';
  decorationDensity?: 'sparse' | 'medium' | 'dense';
  size?: CardSize;
}

export interface AIDesignGenerateResponse {
  variants: CanvasData[];
  creditsUsed: number;
}

export interface AIDesignRefineResponse {
  variant: CanvasData;
  creditsUsed: number;
}

// --- Image Generation (future) ---

export interface AIImageRequest {
  prompt: string;
  style: 'watercolor' | 'illustration' | 'photo' | 'minimal';
  size: '512x512' | '1024x1024';
}

export interface AIImageResponse {
  imageUrl: string;
  creditsUsed: number;
}

// --- Usage Logging ---

export interface AIUsageLog {
  id: string;
  userId: string;
  feature: AIFeature;
  tokensUsed: number;
  creditsConsumed: number;
  createdAt: string;
}
