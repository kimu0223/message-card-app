'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface UpgradeButtonProps {
  priceId: string
  label?: string
  className?: string
}

export default function UpgradeButton({ priceId, label = 'Pro にアップグレード', className }: UpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!priceId) {
      toast.error('料金プランの設定が見つかりません。')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      if (url) window.location.href = url
    } catch {
      toast.error('エラーが発生しました。再度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={isLoading}
      className={className ?? 'w-full bg-violet-600 hover:bg-violet-700'}
      size="lg"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Zap className="mr-2 h-4 w-4" />
      )}
      {label}
    </Button>
  )
}
