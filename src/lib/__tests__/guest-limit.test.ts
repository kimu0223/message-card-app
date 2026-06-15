import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Supabase service client のモック ──────────────────────────────
// count クエリ（select(...).eq().eq().gte()）は countQueue から順に返す。
// insert(...).select('id').single() は予約IDを返す（insertError で失敗を再現）。
// delete().eq('id', ...) は deleteMock に記録。
let countQueue: Array<number | null> = []
let insertError: unknown = null
const eqCalls: Array<[string, unknown]> = []
const insertMock = vi.fn()
const deleteMock = vi.fn()
let reservationCounter = 0

vi.mock('@/lib/supabase/server', () => {
  const makeCountChain = () => {
    const chain = {
      select: () => chain,
      eq: (k: string, v: unknown) => { eqCalls.push([k, v]); return chain },
      gte: () => chain,
      then: (resolve: (r: { count: number | null }) => unknown) =>
        resolve({ count: countQueue.shift() ?? 0 }),
    }
    return chain
  }
  return {
    createServiceClient: vi.fn(async () => ({
      from: () => ({
        select: () => makeCountChain(),
        insert: (payload: unknown) => {
          insertMock(payload)
          const result = insertError
            ? { data: null, error: insertError }
            : { data: { id: `res-${++reservationCounter}` }, error: null }
          return {
            select: () => ({ single: () => Promise.resolve(result) }),
            then: (resolve: (r: { error: unknown }) => unknown) => resolve({ error: insertError }),
          }
        },
        delete: () => ({
          eq: (k: string, v: unknown) => { deleteMock(k, v); return Promise.resolve({ error: null }) },
        }),
      }),
    })),
  }
})

import {
  checkGuestLimit,
  recordGuestUsage,
  reserveGuestUsage,
  releaseGuestReservation,
  getClientIP,
  GUEST_SESSION_LIMIT,
  GUEST_IP_DAILY_LIMIT,
  GUEST_TRIAL_DESIGN_LIMIT,
} from '@/lib/guest-limit'

beforeEach(() => {
  countQueue = []
  eqCalls.length = 0
  insertError = null
  insertMock.mockClear()
  deleteMock.mockClear()
  reservationCounter = 0
})

describe('checkGuestLimit', () => {
  it('両方とも上限未満なら allowed=true', async () => {
    countQueue = [0, 0]
    expect((await checkGuestLimit('sid', '1.1.1.1')).allowed).toBe(true)
  })

  it('セッション上限到達で reason=session', async () => {
    countQueue = [GUEST_SESSION_LIMIT]
    expect(await checkGuestLimit('sid', '1.1.1.1')).toEqual({ allowed: false, reason: 'session' })
  })

  it('IP上限到達で reason=ip', async () => {
    countQueue = [0, GUEST_IP_DAILY_LIMIT]
    expect(await checkGuestLimit('sid', '1.1.1.1')).toEqual({ allowed: false, reason: 'ip' })
  })

  it('既定では feature=design_generation（後方互換）', async () => {
    countQueue = [0, 0]
    await checkGuestLimit('sid', '1.1.1.1')
    expect(eqCalls).toContainEqual(['feature', 'design_generation'])
    expect(eqCalls).not.toContainEqual(['feature', 'design_trial'])
  })
})

describe('reserveGuestUsage (TOCTOU対策)', () => {
  it('予約INSERT後、自分を含むCOUNTが上限以内なら allowed=true + reservationId', async () => {
    // 予約後の自分を含むcount=1（上限2以内）
    countQueue = [1, 1]
    const res = await reserveGuestUsage('sid', '1.1.1.1', {
      feature: 'design_trial',
      sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
      ipDailyLimit: 8,
    })
    expect(res.allowed).toBe(true)
    expect(res.reservationId).toMatch(/^res-/)
    expect(insertMock).toHaveBeenCalledWith(expect.objectContaining({ feature: 'design_trial' }))
  })

  it('予約後COUNTが上限超過なら allowed=false + 予約をrelease', async () => {
    // 上限2に対し、自分を含めcount=3 → 超過
    countQueue = [GUEST_TRIAL_DESIGN_LIMIT + 1]
    const res = await reserveGuestUsage('sid', '1.1.1.1', {
      feature: 'design_trial',
      sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
    })
    expect(res).toMatchObject({ allowed: false, reason: 'session' })
    expect(deleteMock).toHaveBeenCalledWith('id', expect.stringMatching(/^res-/))
  })

  it('上限ちょうど（count==limit）は許可される（> 判定）', async () => {
    countQueue = [GUEST_TRIAL_DESIGN_LIMIT, 0]
    const res = await reserveGuestUsage('sid', '1.1.1.1', {
      feature: 'design_trial',
      sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
      ipDailyLimit: 8,
    })
    expect(res.allowed).toBe(true)
  })

  it('IP上限超過で reason=ip + release', async () => {
    countQueue = [1, 99]
    const res = await reserveGuestUsage('sid', '1.1.1.1', { feature: 'design_trial', sessionLimit: 2, ipDailyLimit: 8 })
    expect(res).toMatchObject({ allowed: false, reason: 'ip' })
    expect(deleteMock).toHaveBeenCalled()
  })

  it('予約INSERTが失敗したら安全側で拒否（reason=error）', async () => {
    insertError = { message: 'insert failed' }
    const res = await reserveGuestUsage('sid', '1.1.1.1', { feature: 'design_trial', sessionLimit: 2 })
    expect(res).toEqual({ allowed: false, reason: 'error' })
  })
})

describe('releaseGuestReservation', () => {
  it('指定IDの行を削除する', async () => {
    await releaseGuestReservation('res-42')
    expect(deleteMock).toHaveBeenCalledWith('id', 'res-42')
  })
})

describe('recordGuestUsage', () => {
  it('既定では feature=design_generation で記録', async () => {
    await recordGuestUsage('sid', '1.1.1.1')
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ session_id: 'sid', ip_address: '1.1.1.1', feature: 'design_generation' }),
    )
  })

  it('feature オプションで design_trial を記録', async () => {
    await recordGuestUsage('sid', '1.1.1.1', { feature: 'design_trial' })
    expect(insertMock).toHaveBeenCalledWith(expect.objectContaining({ feature: 'design_trial' }))
  })
})

describe('getClientIP', () => {
  it('x-real-ip を最優先', () => {
    const req = new Request('https://x', { headers: { 'x-real-ip': '9.9.9.9', 'x-forwarded-for': '1.1.1.1, 2.2.2.2' } })
    expect(getClientIP(req)).toBe('9.9.9.9')
  })

  it('x-real-ip 無しなら x-forwarded-for の末尾IP', () => {
    const req = new Request('https://x', { headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' } })
    expect(getClientIP(req)).toBe('2.2.2.2')
  })

  it('どちらも無ければ unknown', () => {
    expect(getClientIP(new Request('https://x'))).toBe('unknown')
  })
})
