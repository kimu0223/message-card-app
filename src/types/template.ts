import type { CardSize, CanvasData } from './card';

export type TemplateCategory =
  | 'birthday'
  | 'wedding'
  | 'anniversary'
  | 'thank_you'
  | 'congratulations'
  | 'seasonal'
  | 'business';

export type TemplateStyle = 'cute' | 'elegant' | 'cool' | 'simple' | 'pop';

export interface Template {
  id: string;
  slug: string;
  category: TemplateCategory;
  style: TemplateStyle;
  name: string;
  thumbnailUrl: string;
  isPremium: boolean;
  canvasData: CanvasData;
  tags: string[];
  sortOrder: number;
}

export interface TemplateFilter {
  category?: TemplateCategory;
  style?: TemplateStyle;
  isPremium?: boolean;
}
