import { NextResponse } from 'next/server'
import type { AIDesignGenerateRequest, AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai'
import type { CardSize } from '@/types/card'

export const VALID_RECIPIENTS: AIDesignRecipient[] = ['lover', 'friend', 'family', 'colleague', 'teacher']
export const VALID_OCCASIONS: AIDesignOccasion[] = ['birthday', 'thank_you', 'congratulations', 'anniversary', 'seasonal', 'other']
export const VALID_MOODS: AIDesignMood[] = ['warm', 'elegant', 'pop', 'cool', 'simple', 'cute']
export const VALID_SIZES: CardSize[] = ['a4_landscape', 'a4_portrait', 'square', 'instagram', 'line_stamp', 'shikishi']

/**
 * リクエストボディのバリデーション（ゲスト・ログイン・お試し共通）。問題なければ null を返す。
 * 認証なしの公開エンドポイント（/trial）にも任意の body が届くため、型ガードを厳格に行う。
 */
export function validateDesignBody(body: unknown): NextResponse | null {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { recipient, occasion, mood, size, messageText } = body as Partial<AIDesignGenerateRequest>

  if (typeof recipient !== 'string' || !VALID_RECIPIENTS.includes(recipient as never)) {
    return NextResponse.json({ error: 'Invalid recipient' }, { status: 400 })
  }
  if (typeof occasion !== 'string' || !VALID_OCCASIONS.includes(occasion as never)) {
    return NextResponse.json({ error: 'Invalid occasion' }, { status: 400 })
  }
  if (typeof mood !== 'string' || !VALID_MOODS.includes(mood as never)) {
    return NextResponse.json({ error: 'Invalid mood' }, { status: 400 })
  }
  if (size !== undefined && (typeof size !== 'string' || !VALID_SIZES.includes(size as never))) {
    return NextResponse.json({ error: 'Invalid size' }, { status: 400 })
  }
  if (messageText !== undefined && typeof messageText !== 'string') {
    return NextResponse.json({ error: 'Invalid messageText' }, { status: 400 })
  }
  if (typeof messageText === 'string' && messageText.length > 500) {
    return NextResponse.json({ error: 'Message text too long' }, { status: 400 })
  }
  return null
}
