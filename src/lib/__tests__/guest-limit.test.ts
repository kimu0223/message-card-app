import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Supabase service client のモック ──────────────────────────────
// checkGuestLimit は「セッション件数 → IP件数」の順に最大2回 count クエリを発行する。
// countQueue から順に取り出して返す。eq('feature', ...) などのフィルタは eqCalls に記録。
let countQueue: Array<number | null> = []
const eqCalls: Array<[string, unknown]> = []
const insertMock = vi.fn()

vi.mock('@/lib/supabase/server', () => {
  const makeChain = () => {
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
        select: () => makeChain(),
        insert: (payload: unknown) => { insertMock(payload); return Promise.resolve({ error: null }) },
      }),
    })),
  }
})

import {
  checkGuestLimit,
  recordGuestUsage,
  GUEST_SESSION_LIMIT,
  GUEST_IP_DAILY_LIMIT,
  GUEST_TRIAL_DESIGN_LIMIT,
} from '@/lib/guest-limit'

beforeEach(() => {
  countQueue = []
  eqCalls.length = 0
  insertMock.mockClear()
})

describe('checkGuestLimit', () => {
  it('両方とも上限未満なら allowed=true', async () => {
    countQueue = [0, 0]
    const res = await checkGuestLimit('sid', '1.1.1.1')
    expect(res.allowed).toBe(true)
  })

  it('セッション上限到達で allowed=false / reason=session', async () => {
    countQueue = [GUEST_SESSION_LIMIT]
    const res = await checkGuestLimit('sid', '1.1.1.1')
    expect(res).toEqual({ allowed: false, reason: 'session' })
  })

  it('IP上限到達で allowed=false / reason=ip', async () => {
    countQueue = [0, GUEST_IP_DAILY_LIMIT]
    const res = await checkGuestLimit('sid', '1.1.1.1')
    expect(res).toEqual({ allowed: false, reason: 'ip' })
  })

  it('既定では feature=design_generation でカウントする（後方互換）', async () => {
    countQueue = [0, 0]
    await checkGuestLimit('sid', '1.1.1.1')
    expect(eqCalls).toContainEqual(['feature', 'design_generation'])
    expect(eqCalls).not.toContainEqual(['feature', 'design_trial'])
  })

  it('feature/sessionLimit オプションで独立枠を判定できる', async () => {
    // trial 上限ちょうどに達していればブロック
    countQueue = [GUEST_TRIAL_DESIGN_LIMIT]
    const res = await checkGuestLimit('sid', '1.1.1.1', {
      feature: 'design_trial',
      sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
    })
    expect(res).toEqual({ allowed: false, reason: 'session' })
    expect(eqCalls).toContainEqual(['feature', 'design_trial'])
  })

  it('trial 枠が上限未満なら許可される', async () => {
    countQueue = [GUEST_TRIAL_DESIGN_LIMIT - 1, 0]
    const res = await checkGuestLimit('sid', '1.1.1.1', {
      feature: 'design_trial',
      sessionLimit: GUEST_TRIAL_DESIGN_LIMIT,
      ipDailyLimit: 8,
    })
    expect(res.allowed).toBe(true)
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
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ feature: 'design_trial' }),
    )
  })
})
