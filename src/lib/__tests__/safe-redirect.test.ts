import { describe, it, expect } from 'vitest'
import { isSafeRelativePath, safeRedirectPath } from '@/lib/safe-redirect'

describe('isSafeRelativePath', () => {
  it('同一オリジンの相対パスを許可する', () => {
    expect(isSafeRelativePath('/billing')).toBe(true)
    expect(isSafeRelativePath('/dashboard/settings')).toBe(true)
    expect(isSafeRelativePath('/')).toBe(true)
  })

  it('プロトコル相対 // を弾く', () => {
    expect(isSafeRelativePath('//evil.com')).toBe(false)
    expect(isSafeRelativePath('//evil.com/path')).toBe(false)
  })

  it('バックスラッシュ /\\ を弾く', () => {
    expect(isSafeRelativePath('/\\evil.com')).toBe(false)
  })

  it('絶対URL・非相対を弾く', () => {
    expect(isSafeRelativePath('https://evil.com')).toBe(false)
    expect(isSafeRelativePath('evil.com')).toBe(false)
    expect(isSafeRelativePath('javascript:alert(1)')).toBe(false)
  })

  it('null/undefined/空文字を弾く', () => {
    expect(isSafeRelativePath(null)).toBe(false)
    expect(isSafeRelativePath(undefined)).toBe(false)
    expect(isSafeRelativePath('')).toBe(false)
  })
})

describe('safeRedirectPath', () => {
  it('安全なパスはそのまま返す', () => {
    expect(safeRedirectPath('/billing')).toBe('/billing')
  })

  it('危険・未指定はデフォルトにフォールバック', () => {
    expect(safeRedirectPath('//evil.com')).toBe('/dashboard')
    expect(safeRedirectPath(null)).toBe('/dashboard')
    expect(safeRedirectPath(undefined)).toBe('/dashboard')
  })

  it('フォールバックを上書きできる', () => {
    expect(safeRedirectPath(null, '/login')).toBe('/login')
    expect(safeRedirectPath('//evil.com', '/')).toBe('/')
  })
})
