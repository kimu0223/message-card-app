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

// --- Design Generation (new) ---

export type AIDesignRecipient = 'lover' | 'friend' | 'family' | 'colleague' | 'teacher';
export type AIDesignOccasion = 'birthday' | 'thank_you' | 'congratulations' | 'anniversary' | 'seasonal' | 'other';
export type AIDesignMood = 'warm' | 'elegant' | 'pop' | 'cool' | 'simple' | 'cute';

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
