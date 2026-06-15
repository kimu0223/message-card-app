import { describe, it, expect } from 'vitest'
import {
  DEMO_SCENES,
  MOOD_OPTIONS,
  DEFAULT_MOOD_ID,
  getScene,
  buildTrialRequest,
} from '@/lib/demo/sceneMapping'

// API側バリデーション（_validate.ts）が許可する値。ここを逸脱したら生成APIが400を返す。
const VALID_RECIPIENTS = ['lover', 'friend', 'family', 'colleague', 'teacher']
const VALID_OCCASIONS = ['birthday', 'thank_you', 'congratulations', 'anniversary', 'seasonal', 'other']
const VALID_MOODS = ['warm', 'elegant', 'pop', 'cool', 'simple', 'cute']

describe('sceneMapping', () => {
  it('全シーンの occasion / recipient が API バリデーション範囲内', () => {
    for (const scene of DEMO_SCENES) {
      expect(VALID_OCCASIONS).toContain(scene.occasion)
      expect(VALID_RECIPIENTS).toContain(scene.recipient)
    }
  })

  it('全ムードが API バリデーション範囲内', () => {
    for (const m of MOOD_OPTIONS) {
      expect(VALID_MOODS).toContain(m.id)
    }
  })

  it('getScene は既知IDのシーンを返す', () => {
    expect(getScene('thanks').id).toBe('thanks')
    expect(getScene('farewell').occasion).toBe('other')
  })

  it('getScene は未知IDで先頭シーンにフォールバック', () => {
    expect(getScene('does-not-exist').id).toBe(DEMO_SCENES[0].id)
  })

  describe('buildTrialRequest', () => {
    it('各シーン×各ムードで常に有効なリクエストを生成する', () => {
      for (const scene of DEMO_SCENES) {
        for (const m of MOOD_OPTIONS) {
          const req = buildTrialRequest(scene.id, m.id, 'テストメッセージ')
          expect(VALID_RECIPIENTS).toContain(req.recipient)
          expect(VALID_OCCASIONS).toContain(req.occasion)
          expect(VALID_MOODS).toContain(req.mood)
          expect(req.size).toBe('a4_portrait')
          expect(req.messageText).toBe('テストメッセージ')
        }
      }
    })

    it('不正なムードは既定ムードにフォールバックする', () => {
      // @ts-expect-error わざと不正な値を渡す
      const req = buildTrialRequest('birthday', 'invalid-mood', 'hi')
      expect(req.mood).toBe(DEFAULT_MOOD_ID)
    })

    it('未知シーンでも有効なリクエストになる', () => {
      const req = buildTrialRequest('unknown', 'warm', 'hi')
      expect(VALID_OCCASIONS).toContain(req.occasion)
      expect(VALID_RECIPIENTS).toContain(req.recipient)
    })

    it('空メッセージはシーンの既定メッセージで補完される', () => {
      const req = buildTrialRequest('birthday', 'warm', '   ')
      expect(req.messageText).toBe(getScene('birthday').defaultMessage)
      expect(req.messageText!.length).toBeGreaterThan(0)
    })

    it('500文字超のメッセージは500文字に丸める', () => {
      const long = 'あ'.repeat(800)
      const req = buildTrialRequest('birthday', 'warm', long)
      expect(req.messageText!.length).toBe(500)
    })
  })
})
