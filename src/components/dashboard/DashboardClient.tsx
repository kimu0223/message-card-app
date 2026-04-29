'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Share2, Edit2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

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
  isAtLimit: boolean
}

const STATUS_LABELS: Record<string, string> = {
  draft: '下書き',
  published: '公開中',
}

// Color palette for card thumbnails without images
const THUMB_COLORS = [
  'linear-gradient(135deg, #E8DDC4 0%, #DDD0B3 100%)',
  'linear-gradient(135deg, rgba(201,123,92,0.25) 0%, rgba(234,223,198,0.6) 100%)',
  'linear-gradient(135deg, rgba(143,166,138,0.25) 0%, rgba(234,223,198,0.6) 100%)',
  'linear-gradient(135deg, rgba(184,146,99,0.25) 0%, rgba(234,223,198,0.6) 100%)',
]

export default function DashboardClient({ cards: initialCards, isAtLimit }: DashboardClientProps) {
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

  const { favorites, rest } = useMemo(() => ({
    favorites: cards.filter(c => c.is_favorite),
    rest: cards.filter(c => !c.is_favorite),
  }), [cards])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {favorites.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13, fontWeight: 600, color: 'var(--lp-ink-mute)' }}>
            <Heart style={{ width: 14, height: 14, fill: 'var(--lp-terracotta)', color: 'var(--lp-terracotta)' }} />
            お気に入り
          </div>
          <CardGrid
            cards={favorites}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
            onShare={handleShare}
            isAtLimit={isAtLimit}
            showNewTile={false}
          />
        </section>
      )}

      <section>
        {favorites.length > 0 && (
          <div style={{ marginBottom: 16, fontSize: 13, fontWeight: 600, color: 'var(--lp-ink-mute)' }}>
            すべてのカード
          </div>
        )}
        <CardGrid
          cards={rest}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
          onShare={handleShare}
          isAtLimit={isAtLimit}
          showNewTile
        />
      </section>
    </div>
  )
}

function CardGrid({
  cards,
  onToggleFavorite,
  onDelete,
  onShare,
  isAtLimit,
  showNewTile,
}: {
  cards: Card[]
  onToggleFavorite: (id: string, current: boolean) => void
  onDelete: (id: string, title: string) => void
  onShare: (id: string, shareId: string | null, status: string) => void
  isAtLimit: boolean
  showNewTile: boolean
}) {
  return (
    <div className="mycards">
      {/* New card tile */}
      {showNewTile && (
        isAtLimit ? (
          <div className="mycard-new" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            <div>
              <div className="mycard-new-plus">+</div>
              <div className="mycard-new-name">上限に達しました</div>
              <div className="mycard-new-desc">プランをアップグレードしてください</div>
            </div>
          </div>
        ) : (
          <Link href="/editor" className="mycard-new" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div>
              <div className="mycard-new-plus">+</div>
              <div className="mycard-new-name">新しいカード</div>
              <div className="mycard-new-desc">テンプレートから簡単作成</div>
            </div>
          </Link>
        )
      )}

      {cards.map((card, i) => (
        <div key={card.id} className="mycard">
          {/* Thumbnail */}
          <Link href={`/editor/${card.id}`} style={{ display: 'block', aspectRatio: '5 / 7', position: 'relative', overflow: 'hidden' }}>
            {card.thumbnail_url ? (
              <img
                src={card.thumbnail_url}
                alt={card.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: THUMB_COLORS[i % THUMB_COLORS.length],
                display: 'grid',
                placeItems: 'center',
              }}>
                <span style={{
                  fontFamily: 'var(--font-lp-display)',
                  fontStyle: 'italic',
                  fontSize: 40,
                  color: 'rgba(43,37,32,0.12)',
                }}>
                  CM
                </span>
              </div>
            )}
            {/* Status badge */}
            <span className="mycard-status" data-s={card.status} style={{ position: 'absolute', top: 10, right: 10 }}>
              {STATUS_LABELS[card.status] ?? card.status}
            </span>
          </Link>

          {/* Meta */}
          <div className="mycard-meta">
            <Link href={`/editor/${card.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="mycard-name">{card.title}</div>
            </Link>
            <div className="mycard-date">
              {formatDistanceToNow(new Date(card.updated_at), { addSuffix: true, locale: ja })}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
              <Link href={`/editor/${card.id}`} className="mycard-action">
                <Edit2 style={{ width: 12, height: 12 }} />
                編集
              </Link>

              <button
                onClick={() => onShare(card.id, card.share_id, card.status)}
                className="mycard-action"
              >
                <Share2 style={{ width: 12, height: 12 }} />
                シェア
              </button>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                <button
                  onClick={() => onToggleFavorite(card.id, card.is_favorite)}
                  className="mycard-action-fav"
                >
                  <Heart
                    style={{
                      width: 15,
                      height: 15,
                      ...(card.is_favorite
                        ? { fill: 'var(--lp-terracotta)', color: 'var(--lp-terracotta)' }
                        : { color: 'var(--lp-ink-mute)' }),
                    }}
                  />
                </button>

                <button
                  onClick={() => onDelete(card.id, card.title)}
                  className="mycard-action-delete"
                >
                  <Trash2 style={{ width: 15, height: 15 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
