'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface CreditPackButtonProps {
  priceId: string
  label: string
}

export default function CreditPackButton({ priceId, label }: CreditPackButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    if (!priceId) {
      toast.error('クレジットパックの設定が見つかりません。')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, type: 'credit_pack' }),
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
      onClick={handlePurchase}
      disabled={isLoading}
      className="w-full"
      variant="outline"
      size="sm"
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}
