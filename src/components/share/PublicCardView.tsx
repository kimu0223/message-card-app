'use client'

import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Share2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { CanvasData } from '@/types/card'
import ConfettiAnimation from '@/components/card/animations/ConfettiAnimation'
import SnowAnimation from '@/components/card/animations/SnowAnimation'
import SakuraAnimation from '@/components/card/animations/SakuraAnimation'
import FireworksAnimation from '@/components/card/animations/FireworksAnimation'
import EnvelopeReveal from '@/components/share/EnvelopeReveal'
import ViralCTA from '@/components/share/ViralCTA'
import { useCardTilt } from '@/hooks/useCardTilt'
import CanvasStageView from '@/components/card/CanvasStageView'

const PublicCardView3D = lazy(() => import('@/components/share/PublicCardView3D'))

interface PublicCardViewProps {
  title: string
  canvasData: CanvasData
  shareId: string
}

export default function PublicCardView({ title, canvasData, shareId }: PublicCardViewProps) {
  const envelopeStyle = canvasData.envelope?.style
  const hasEnvelope = !!envelopeStyle && envelopeStyle !== 'none'
  const is3D = canvasData.displayMode === '3d'

  const [envelopeOpened, setEnvelopeOpened] = useState(!hasEnvelope)
  const [confettiActive, setConfettiActive] = useState(false)
  const [snowActive, setSnowActive] = useState(false)
  const [sakuraActive, setSakuraActive] = useState(false)
  const [fireworksActive, setFireworksActive] = useState(false)
  const [show3D, setShow3D] = useState(is3D)
  const handle3DFallback = useCallback(() => setShow3D(false), [])

  const animType = canvasData.animation?.type

  useEffect(() => {
    if (!envelopeOpened) return
    const delay = hasEnvelope ? 700 : 300

    if (animType === 'confetti') {
      const t = setTimeout(() => setConfettiActive(true), delay)
      return () => clearTimeout(t)
    }
    if (animType === 'snow') {
      const t = setTimeout(() => setSnowActive(true), delay)
      return () => clearTimeout(t)
    }
    if (animType === 'sakura') {
      const t = setTimeout(() => setSakuraActive(true), delay)
      return () => clearTimeout(t)
    }
    if (animType === 'fireworks') {
      const t = setTimeout(() => setFireworksActive(true), delay)
      return () => clearTimeout(t)
    }
  }, [envelopeOpened, animType, hasEnvelope])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('URLをコピーしました')
    }
  }

  const { ref: tiltRef, tiltStyle } = useCardTilt<HTMLDivElement>({ maxTilt: 8, scale: 1.01 })

  return (
    <>
      {/* 封筒開封演出 */}
      {!envelopeOpened && hasEnvelope && (
        <EnvelopeReveal
          style={envelopeStyle}
          senderName={canvasData.envelope?.senderName}
          onOpen={() => setEnvelopeOpened(true)}
        />
      )}

      {/* 3D カード表示 (Pro) */}
      {envelopeOpened && show3D && (
        <Suspense fallback={null}>
          <PublicCardView3D canvasData={canvasData} onFallback={handle3DFallback} />
        </Suspense>
      )}

      {/* カード本体 */}
      {envelopeOpened && (
        <div className={cn(
          "flex min-h-screen flex-col items-center justify-center p-3 sm:p-6",
          show3D ? "bg-transparent relative z-10" : "bg-zinc-900"
        )}>
          <ConfettiAnimation active={confettiActive} />
          <SnowAnimation active={snowActive} />
          <SakuraAnimation active={sakuraActive} />
          <FireworksAnimation active={fireworksActive} />

          <div className="w-full max-w-sm sm:max-w-2xl">
            <div
              ref={tiltRef}
              style={{
                ...tiltStyle,
                willChange: 'transform',
                borderRadius: 16,
              }}
            >
            <CanvasStageView canvasData={canvasData} animate={envelopeOpened} />
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-zinc-400 text-center sm:text-left">
                <Link href="/" className="hover:text-white transition">💌 贈りことば</Link>
                &nbsp;で作成
              </p>
              <div className="flex gap-2 justify-center sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex-1 sm:flex-none bg-transparent text-white border-zinc-600 hover:bg-zinc-800"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  シェア
                </Button>
                <Link href="/create" className={cn(buttonVariants({ size: 'sm' }), 'flex-1 sm:flex-none gap-2')}>
                  <ExternalLink className="h-4 w-4" />
                  自分も作る
                </Link>
              </div>
            </div>
          </div>

          <ViralCTA shareUrl={typeof window !== 'undefined' ? window.location.href : `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/card/${shareId}`} />
        </div>
      )}
    </>
  )
}
