export type AIFeature = 'message_generation' | 'design_suggestion' | 'image_generation';

export interface AIMessageRequest {
  occasion: string;       // 'birthday', 'wedding', etc.
  relationship: string;   // '友人', '同僚', '恋人', etc.
  tone: string;           // 'warm', 'formal', 'funny', etc.
  keywords?: string[];
  length: 'short' | 'medium' | 'long';
}

export interface AIMessageResponse {
  messages: string[];   // 3 candidates
  creditsUsed: number;
}

export interface AIDesignRequest {
  occasion: string;
  style: string;
  colorPreference?: string;
}

export interface AIDesignResponse {
  suggestions: {
    backgroundColors: string[];
    fontFamily: string;
    accentColor: string;
  }[];
  creditsUsed: number;
}

export interface AIImageRequest {
  prompt: string;
  style: 'watercolor' | 'illustration' | 'photo' | 'minimal';
  size: '512x512' | '1024x1024';
}

export interface AIImageResponse {
  imageUrl: string;
  creditsUsed: number;
}

export interface AIUsageLog {
  id: string;
  userId: string;
  feature: AIFeature;
  tokensUsed: number;
  creditsConsumed: number;
  createdAt: string;
}
