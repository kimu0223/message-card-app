import { describe, it, expect } from 'vitest'
import { validateDesignBody } from '../_validate'

const validBody = {
  recipient: 'friend',
  occasion: 'birthday',
  mood: 'warm',
  size: 'a4_portrait',
  messageText: 'おめでとう',
}

async function statusOf(res: Awaited<ReturnType<typeof validateDesignBody>>): Promise<number | null> {
  return res ? res.status : null
}

describe('validateDesignBody', () => {
  it('正常な body は null（合格）', async () => {
    expect(validateDesignBody(validBody)).toBeNull()
  })

  it('size 省略は許可', async () => {
    const { size, ...noSize } = validBody
    void size
    expect(validateDesignBody(noSize)).toBeNull()
  })

  it('body が非オブジェクトは 400', async () => {
    expect(await statusOf(validateDesignBody(null))).toBe(400)
    expect(await statusOf(validateDesignBody('x'))).toBe(400)
    expect(await statusOf(validateDesignBody([validBody]))).toBe(400)
  })

  it('不正な recipient / occasion / mood は 400', async () => {
    expect(await statusOf(validateDesignBody({ ...validBody, recipient: 'alien' }))).toBe(400)
    expect(await statusOf(validateDesignBody({ ...validBody, occasion: 'meeting' }))).toBe(400)
    expect(await statusOf(validateDesignBody({ ...validBody, mood: 'angry' }))).toBe(400)
  })

  it('messageText が非文字列は 400（数値ですり抜けない）', async () => {
    expect(await statusOf(validateDesignBody({ ...validBody, messageText: 123 }))).toBe(400)
    expect(await statusOf(validateDesignBody({ ...validBody, messageText: {} }))).toBe(400)
  })

  it('messageText 500文字超は 400、500ちょうどは合格', async () => {
    expect(await statusOf(validateDesignBody({ ...validBody, messageText: 'あ'.repeat(501) }))).toBe(400)
    expect(validateDesignBody({ ...validBody, messageText: 'あ'.repeat(500) })).toBeNull()
  })

  it('不正な size は 400', async () => {
    expect(await statusOf(validateDesignBody({ ...validBody, size: 'huge' }))).toBe(400)
  })
})
