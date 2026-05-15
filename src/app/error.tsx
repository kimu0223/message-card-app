'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4ECDC] p-8 text-center">
      <p className="text-5xl">😓</p>
      <h1 className="text-2xl font-bold text-[#2B2520]">エラーが発生しました</h1>
      <p className="text-sm text-[#7B6F65]">
        予期しない問題が起きました。もう一度お試しください。
      </p>
      <Button onClick={reset} className="mt-2">
        再試行
      </Button>
    </div>
  )
}
