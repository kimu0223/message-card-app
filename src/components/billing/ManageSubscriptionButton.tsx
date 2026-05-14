'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Settings } from 'lucide-react'
import { toast } from 'sonner'

export default function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleManage = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
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
      onClick={handleManage}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Settings className="mr-2 h-4 w-4" />
      )}
      プランを管理・解約する
    </Button>
  )
}
