'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { AIMessageRequest } from '@/types/ai'

export function useAI() {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const generateMessages = async (params: AIMessageRequest): Promise<string[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/ai/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.error === 'limit_exceeded') {
          const msg = '今月のAI生成回数（5回）を使い切りました。Proプランで無制限に使えます。'
          setError(msg)
          toast.error(msg)
          return []
        }
        throw new Error(data.error ?? 'Failed to generate messages')
      }

      const data = await res.json()
      setMessages(data.messages)
      return data.messages
    } catch (e) {
      const msg = 'メッセージの生成に失敗しました'
      setError(msg)
      toast.error(msg)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return { generateMessages, isLoading, error, messages }
}
