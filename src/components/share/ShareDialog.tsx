'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Share2, Loader2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  cardId: string
  shareId?: string | null
  cardTitle: string
  onPublished?: (shareId: string) => void
}

export default function ShareDialog({
  isOpen,
  onClose,
  cardId,
  shareId: initialShareId,
  cardTitle,
  onPublished,
}: ShareDialogProps) {
  const [shareId, setShareId] = useState(initialShareId ?? null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = shareId ? `${window.location.origin}/card/${shareId}` : null

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      const res = await fetch(`/api/cards/${cardId}/publish`, { method: 'POST' })
      if (res.ok) {
        const { shareId: newShareId } = await res.json()
        setShareId(newShareId)
        onPublished?.(newShareId)
        toast.success('カードを公開しました！')
      } else {
        toast.error('公開に失敗しました')
      }
    } finally {
      setIsPublishing(false)
    }
  }

  const handleCopy = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('URLをコピーしました')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    if (!shareUrl) return
    const text = encodeURIComponent(`${cardTitle} を作りました！`)
    const url = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const handleLineShare = () => {
    if (!shareUrl) return
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            カードをシェア
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {!shareId ? (
            <div className="text-center py-4">
              <Badge variant="secondary" className="mb-4">未公開</Badge>
              <p className="mb-4 text-sm text-zinc-500">
                「公開する」ボタンを押すとシェアURLが生成されます
              </p>
              <Button onClick={handlePublish} disabled={isPublishing} className="w-full">
                {isPublishing ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />公開中...</>
                ) : (
                  <>公開してシェアURLを生成</>
                )}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <Badge className="bg-emerald-600 text-xs">公開中</Badge>
                <span className="text-xs text-emerald-700">シェアURLが生成されました</span>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-medium text-zinc-600">シェアURL</p>
                <div className="flex gap-2">
                  <Input readOnly value={shareUrl ?? ''} className="text-xs" />
                  <Button size="sm" variant="outline" onClick={handleCopy} className="shrink-0">
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => shareUrl && window.open(shareUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                公開ページを開く
              </Button>

              <div>
                <p className="mb-2 text-xs font-medium text-zinc-600">SNSでシェア</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleTwitterShare}
                  >
                    X (Twitter)
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-[#06c755] hover:bg-[#05b04a] text-white border-0"
                    onClick={handleLineShare}
                  >
                    LINE
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
