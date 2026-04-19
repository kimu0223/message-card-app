'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Share2, Download } from 'lucide-react'
import { CARD_SIZES } from '@/types/card'
import type { CanvasData, TextElement } from '@/types/card'
import ConfettiAnimation from '@/components/card/animations/ConfettiAnimation'

interface CardPreviewProps {
  canvasData: CanvasData
  isOpen: boolean
  onClose: () => void
  onShare?: () => void
  onDownload?: () => void
}

export default function CardPreview({ canvasData, isOpen, onClose, onShare, onDownload }: CardPreviewProps) {
  const [confettiActive, setConfettiActive] = useState(false)

  useEffect(() => {
    if (isOpen && canvasData.animation?.type === 'confetti') {
      const t = setTimeout(() => setConfettiActive(true), 400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setConfettiActive(false), 0)
    return () => clearTimeout(t)
  }, [isOpen, canvasData.animation])

  const type = canvasData.animation?.type
  const getMotionProps = () => {
    if (type === 'slide_up') return {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
    }
    if (type === 'bounce') return {
      initial: { scale: 0.7, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.6 },
    }
    // fade_in and default
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8 },
    }
  }

  const motionProps = getMotionProps()
  const bg = canvasData.background
  const backgroundStyle: React.CSSProperties =
    bg.type === 'gradient' ? { background: bg.value } : { backgroundColor: bg.value }

  const sizeConfig = CARD_SIZES[canvasData.size]
  const aspectRatio = sizeConfig.width / sizeConfig.height

  const sortedTextElements = canvasData.elements
    .filter(el => el.type === 'text')
    .sort((a, b) => a.zIndex - b.zIndex) as TextElement[]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-6"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <ConfettiAnimation active={confettiActive} />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={motionProps.transition}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{ width: '100%', maxWidth: 600, aspectRatio, ...backgroundStyle }}
          >
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              {sortedTextElements.map(el => (
                <p
                  key={el.id}
                  className="mb-4 whitespace-pre-wrap"
                  style={{
                    fontFamily: el.fontFamily,
                    fontSize: `clamp(12px, ${el.fontSize * 0.04}vw, ${el.fontSize * 0.6}px)`,
                    fontWeight: el.fontWeight,
                    fontStyle: el.fontStyle,
                    color: el.color,
                    lineHeight: el.lineHeight,
                    textAlign: el.align,
                    opacity: el.opacity,
                  }}
                >
                  {el.text}
                </p>
              ))}
            </div>
          </motion.div>

          <div className="mt-6 flex gap-3">
            {onShare && (
              <Button
                variant="outline"
                onClick={onShare}
                className="bg-transparent text-white border-white/30 hover:bg-white/10"
              >
                <Share2 className="mr-2 h-4 w-4" />
                シェア
              </Button>
            )}
            {onDownload && (
              <Button onClick={onDownload}>
                <Download className="mr-2 h-4 w-4" />
                ダウンロード
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
