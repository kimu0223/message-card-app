/**
 * トップLP「お試しデザイン生成」のシーン・ムード定義と、
 * 本物のAI生成API（/api/ai/design/trial）に渡すリクエストの組み立て。
 *
 * occasion / mood は API 側バリデーション（src/app/api/ai/design/_validate.ts の
 * VALID_OCCASIONS / VALID_MOODS）が許可する値のみに限定する。
 */
import type { AIDesignGenerateRequest, AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai'
import type { CardSize } from '@/types/card'

export interface DemoScene {
  id: string
  label: string
  emoji: string
  occasion: AIDesignOccasion
  recipient: AIDesignRecipient
  defaultMessage: string
}

export interface MoodOption {
  id: AIDesignMood
  label: string
  emoji: string
}

/** デモのカードサイズ（縦長カード）。 */
export const DEMO_CARD_SIZE: CardSize = 'a4_portrait'

/** お試し生成のシーン（occasion は VALID_OCCASIONS の範囲内）。 */
export const DEMO_SCENES: DemoScene[] = [
  {
    id: 'birthday',
    label: '誕生日',
    emoji: '🎂',
    occasion: 'birthday',
    recipient: 'friend',
    defaultMessage: 'お誕生日おめでとう！\nいつも笑顔をありがとう。',
  },
  {
    id: 'thanks',
    label: 'お礼',
    emoji: '💐',
    occasion: 'thank_you',
    recipient: 'friend',
    defaultMessage: 'いつも本当にありがとう。\n感謝の気持ちを込めて。',
  },
  {
    id: 'celebration',
    label: 'お祝い',
    emoji: '🎉',
    occasion: 'congratulations',
    recipient: 'friend',
    defaultMessage: 'おめでとう！\n新しい門出を心から祝福します。',
  },
  {
    id: 'farewell',
    label: '送別',
    emoji: '🌸',
    occasion: 'other',
    recipient: 'colleague',
    defaultMessage: '今までお世話になりました。\n新天地でのご活躍を祈っています。',
  },
]

/** お試し生成で選べるムード（VALID_MOODS の範囲内）。 */
export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'warm', label: 'あたたかい', emoji: '🧡' },
  { id: 'elegant', label: 'エレガント', emoji: '✨' },
  { id: 'cute', label: 'かわいい', emoji: '🎀' },
  { id: 'pop', label: 'ポップ', emoji: '🎈' },
  { id: 'cool', label: 'クール', emoji: '🌙' },
  { id: 'simple', label: 'シンプル', emoji: '🍃' },
]

export const DEFAULT_SCENE_ID = DEMO_SCENES[0].id
export const DEFAULT_MOOD_ID: AIDesignMood = MOOD_OPTIONS[0].id

export function getScene(sceneId: string): DemoScene {
  return DEMO_SCENES.find(s => s.id === sceneId) ?? DEMO_SCENES[0]
}

/**
 * シーン・ムード・メッセージから、お試し生成APIへ送るリクエストを組み立てる。
 * 不明なシーン/ムードは安全なデフォルトにフォールバックする（不正値を送らない）。
 */
export function buildTrialRequest(
  sceneId: string,
  mood: AIDesignMood,
  messageText: string,
): AIDesignGenerateRequest {
  const scene = getScene(sceneId)
  const validMood = MOOD_OPTIONS.some(m => m.id === mood) ? mood : DEFAULT_MOOD_ID
  const trimmed = messageText.trim()
  return {
    recipient: scene.recipient,
    occasion: scene.occasion,
    mood: validMood,
    size: DEMO_CARD_SIZE,
    messageText: trimmed.length > 0 ? trimmed.slice(0, 500) : scene.defaultMessage,
  }
}
