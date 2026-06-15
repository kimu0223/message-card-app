import { NextResponse } from 'next/server'
import type { AIDesignGenerateRequest, AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai'
import type { CardSize } from '@/types/card'

export const VALID_RECIPIENTS: AIDesignRecipient[] = ['lover', 'friend', 'family', 'colleague', 'teacher']
export const VALID_OCCASIONS: AIDesignOccasion[] = ['birthday', 'thank_you', 'congratulations', 'anniversary', 'seasonal', 'other']
export const VALID_MOODS: AIDesignMood[] = ['warm', 'elegant', 'pop', 'cool', 'simple', 'cute']
export const VALID_SIZES: CardSize[] = ['a4_landscape', 'a4_portrait', 'square', 'instagram', 'line_stamp', 'shikishi']

/** リクエストボディのバリデーション（ゲスト・ログイン・お試し共通）。問題なければ null を返す。 */
export function validateDesignBody(body: AIDesignGenerateRequest): NextResponse | null {
  const { recipient, occasion, mood, size, messageText } = body

  if (!VALID_RECIPIENTS.includes(recipient)) {
    return NextResponse.json({ error: 'Invalid recipient' }, { status: 400 })
  }
  if (!VALID_OCCASIONS.includes(occasion)) {
    return NextResponse.json({ error: 'Invalid occasion' }, { status: 400 })
  }
  if (!VALID_MOODS.includes(mood)) {
    return NextResponse.json({ error: 'Invalid mood' }, { status: 400 })
  }
  if (size && !VALID_SIZES.includes(size)) {
    return NextResponse.json({ error: 'Invalid size' }, { status: 400 })
  }
  if (messageText && messageText.length > 500) {
    return NextResponse.json({ error: 'Message text too long' }, { status: 400 })
  }
  return null
}
