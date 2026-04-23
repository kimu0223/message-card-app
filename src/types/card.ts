export type CardSize = 'a4_landscape' | 'a4_portrait' | 'square' | 'instagram' | 'line_stamp' | 'shikishi';

export type CardStatus = 'draft' | 'published' | 'archived';

export type AnimationType =
  | 'confetti'
  | 'fade_in'
  | 'slide_up'
  | 'bounce'
  | 'sparkle'
  | 'none';

export type BackgroundType = 'color' | 'gradient' | 'image';

export interface Background {
  type: BackgroundType;
  value: string; // hex color, CSS gradient, or image URL
}

export type ElementType = 'text' | 'image' | 'shape' | 'sticker';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  color: string;
  align: 'left' | 'center' | 'right';
  lineHeight: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  borderRadius: number;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rect' | 'circle' | 'heart' | 'star';
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface StickerElement extends BaseElement {
  type: 'sticker';
  src: string;
}

export type CanvasElement = TextElement | ImageElement | ShapeElement | StickerElement;

export interface AnimationConfig {
  type: AnimationType;
  duration: number;    // ms
  delay: number;       // ms
  loop: boolean;
}

export interface CanvasData {
  version: string;
  size: CardSize;
  background: Background;
  elements: CanvasElement[];
  animation: AnimationConfig | null;
}

export interface CardSizeConfig {
  width: number;   // px at 96dpi
  height: number;
  label: string;
}

export const CARD_SIZES: Record<CardSize, CardSizeConfig> = {
  a4_landscape: { width: 1123, height: 794, label: 'A4 横' },
  a4_portrait:  { width: 794, height: 1123, label: 'A4 縦' },
  square:        { width: 800, height: 800, label: '正方形' },
  instagram:     { width: 1080, height: 1080, label: 'Instagram' },
  line_stamp:    { width: 370, height: 320, label: 'LINEスタンプ' },
  shikishi:      { width: 915, height: 1028, label: '色紙' },
};
