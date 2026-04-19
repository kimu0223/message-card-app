'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Edit2, Trash2, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface Card {
  id: string
  title: string
  status: string
  animation: string
  size: string
  share_id: string | null
  is_favorite: boolean
  created_at: string
  updated_at: string
  thumbnail_url: string | null
}

interface DashboardClientProps {
  cards: Card[]
}

const STATUS_LABELS: Record<string, string> = {
  draft: '下書き',
  published: '公開中',
}

export default function DashboardClient({ cards: initialCards }: DashboardClientProps) {
  const router = useRouter()
  const [cards, setCards] = useState(initialCards)

  // ゲストデータの復元
  useEffect(() => {
    const intent = localStorage.getItem('postLoginIntent')
    const guestState = localStorage.getItem('guestEditorState')

    if (intent === 'restore_guest_card' && guestState) {
      localStorage.removeItem('postLoginIntent')
      localStorage.removeItem('guestEditorState')

      try {
        const { canvasData, title } = JSON.parse(guestState)
        fetch('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title ?? '無題のカード',
            canvasData,
            size: canvasData?.size ?? 'a4_landscape',
            animation: 'none',
          }),
        })
          .then(res => res.json())
          .then(({ id }) => {
            if (id) {
              toast.success('ゲスト作業を保存しました！編集を続けましょう')
              router.push(`/editor/${id}`)
            }
          })
          .catch(() => {
            toast.error('ゲストデータの復元に失敗しました')
          })
      } catch {
        toast.error('ゲストデータの読み込みに失敗しました')
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleFavorite = async (id: string, current: boolean) => {
    await fetch(`/api/cards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: !current }),
    })
    setCards(prev => prev.map(c => c.id === id ? { ...c, is_favorite: !current } : c))
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除しますか？`)) return
    const res = await fetch(`/api/cards/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setCards(prev => prev.filter(c => c.id !== id))
      toast.success('カードを削除しました')
    } else {
      toast.error('削除に失敗しました')
    }
  }

  const handleShare = async (id: string, shareId: string | null, status: string) => {
    if (shareId && status === 'published') {
      const url = `${window.location.origin}/card/${shareId}`
      await navigator.clipboard.writeText(url)
      toast.success('URLをコピーしました')
      return
    }
    const res = await fetch(`/api/cards/${id}/publish`, { method: 'POST' })
    if (res.ok) {
      const { shareId: newShareId } = await res.json()
      setCards(prev => prev.map(c => c.id === id ? { ...c, share_id: newShareId, status: 'published' } : c))
      const url = `${window.location.origin}/card/${newShareId}`
      await navigator.clipboard.writeText(url)
      toast.success('公開しました！URLをコピーしました')
    } else {
      toast.error('公開に失敗しました')
    }
  }

  const favorites = cards.filter(c => c.is_favorite)
  const rest = cards.filter(c => !c.is_favorite)

  return (
    <div className="space-y-8">
      {favorites.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-500">
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
            お気に入り
          </h2>
          <CardGrid cards={favorites} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} onShare={handleShare} />
        </section>
      )}
      <section>
        {favorites.length > 0 && (
          <h2 className="mb-4 text-sm font-semibold text-zinc-500">すべてのカード</h2>
        )}
        <CardGrid cards={rest} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} onShare={handleShare} />
      </section>
    </div>
  )
}

function CardGrid({
  cards,
  onToggleFavorite,
  onDelete,
  onShare,
}: {
  cards: Card[]
  onToggleFavorite: (id: string, current: boolean) => void
  onDelete: (id: string, title: string) => void
  onShare: (id: string, shareId: string | null, status: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map(card => (
        <div key={card.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
          <Link href={`/editor/${card.id}`} className="block aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200">
            {card.thumbnail_url ? (
              <img src={card.thumbnail_url} alt={card.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl">💌</div>
            )}
          </Link>

          <div className="flex flex-1 flex-col p-3">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/editor/${card.id}`} className="min-w-0">
                <h3 className="truncate text-sm font-medium text-zinc-800 hover:text-zinc-600">
                  {card.title}
                </h3>
              </Link>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {STATUS_LABELS[card.status] ?? card.status}
              </Badge>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(card.updated_at), { addSuffix: true, locale: ja })}
            </div>

            <div className="mt-3 flex items-center gap-1">
              <Link href={`/editor/${card.id}`} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-7 px-2 text-xs')}>
                <Edit2 className="mr-1 h-3 w-3" />
                編集
              </Link>

              <button
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-7 px-2 text-xs')}
                onClick={() => onShare(card.id, card.share_id, card.status)}
              >
                <Share2 className="mr-1 h-3 w-3" />
                シェア
              </button>

              <button onClick={() => onToggleFavorite(card.id, card.is_favorite)} className="ml-auto rounded p-1 transition hover:bg-zinc-100">
                <Heart className={`h-4 w-4 ${card.is_favorite ? 'fill-pink-500 text-pink-500' : 'text-zinc-300'}`} />
              </button>

              <button onClick={() => onDelete(card.id, card.title)} className="rounded p-1 text-zinc-300 transition hover:bg-red-50 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
