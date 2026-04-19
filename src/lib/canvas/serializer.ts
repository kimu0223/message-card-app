import { nanoid } from 'nanoid'
import type { CanvasData, CardSize, TextElement } from '@/types/card'

export function canvasDataToJSON(data: CanvasData): string {
  return JSON.stringify(data)
}

export function jsonToCanvasData(json: string): CanvasData {
  return JSON.parse(json) as CanvasData
}

export function createDefaultTextElement(overrides?: Partial<TextElement>): TextElement {
  return {
    id: nanoid(),
    type: 'text',
    x: 400,
    y: 300,
    width: 400,
    height: 60,
    rotation: 0,
    opacity: 1,
    zIndex: 1,
    text: 'テキストを入力',
    fontFamily: 'Noto Sans JP',
    fontSize: 32,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#1a1a1a',
    align: 'center',
    lineHeight: 1.5,
    ...overrides,
  }
}

export function createDefaultCanvasData(size: CardSize = 'a4_landscape'): CanvasData {
  return {
    version: '1.0',
    size,
    background: { type: 'color', value: '#ffffff' },
    elements: [],
    animation: null,
  }
}
