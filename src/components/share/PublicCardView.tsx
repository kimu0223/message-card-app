'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Share2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { CanvasData, TextElement } from '@/types/card'
import ConfettiAnimation from '@/components/card/animations/ConfettiAnimation'

interface PublicCardViewProps {
  title: string
  canvasData: CanvasData
  shareId: string
}

export default function PublicCardView({ title, canvasData, shareId }: PublicCardViewProps) {
  const [confettiActive, setConfettiActive] = useState(false)

  useEffect(() => {
    if (canvasData.animation?.type === 'confetti') {
      const timer = setTimeout(() => setConfettiActive(true), 300)
      return () => clearTimeout(timer)
    }
  }, [canvasData.animation])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('URLをコピーしました')
    }
  }

  const type = canvasData.animation?.type
  const getMotionProps = () => {
    if (type === 'slide_up') return { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } }
    if (type === 'bounce') return { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.6 } }
    return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1 } }
  }

  const motionProps = getMotionProps()
  const bg = canvasData.background
  const backgroundStyle: React.CSSProperties =
    bg.type === 'gradient' ? { background: bg.value } : { backgroundColor: bg.value }

  const sortedTextElements = canvasData.elements
    .filter(el => el.type === 'text')
    .sort((a, b) => a.zIndex - b.zIndex) as TextElement[]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-6">
      <ConfettiAnimation active={confettiActive} />

      <div className="w-full max-w-3xl">
        <motion.div
          initial={motionProps.initial}
          animate={motionProps.animate}
          transition={motionProps.transition}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{ aspectRatio: '4/3', ...backgroundStyle }}
        >
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            {sortedTextElements.map(el => (
              <p
                key={el.id}
                className="mb-4 whitespace-pre-wrap"
                style={{
                  fontFamily: el.fontFamily,
                  fontSize: `clamp(14px, ${el.fontSize * 0.05}vw, ${el.fontSize}px)`,
                  fontWeight: el.fontWeight,
                  fontStyle: el.fontStyle,
                  color: el.color,
                  lineHeight: el.lineHeight,
                  textAlign: el.align,
                }}
              >
                {el.text}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition">💌 Message Card App</Link>
            で作成
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-transparent text-white border-zinc-600 hover:bg-zinc-800"
            >
              <Share2 className="mr-2 h-4 w-4" />
              シェア
            </Button>
            <Link href="/editor" className={cn(buttonVariants({ size: 'sm' }), 'gap-2')}>
              <ExternalLink className="h-4 w-4" />
              自分も作る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
