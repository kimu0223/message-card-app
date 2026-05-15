'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type TargetAndTransition } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Share2, FileImage, FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { CARD_SIZES } from '@/types/card'
import type { CanvasData, TextElement, ShapeElement, ImageElement, CanvasElement } from '@/types/card'
import ConfettiAnimation from '@/components/card/animations/ConfettiAnimation'
import SnowAnimation from '@/components/card/animations/SnowAnimation'
import SakuraAnimation from '@/components/card/animations/SakuraAnimation'
import FireworksAnimation from '@/components/card/animations/FireworksAnimation'
import { CARD_TEMPLATES } from '@/components/lp/CardTemplates'
import { exportCardToPNG, exportCardToPDF } from '@/lib/canvas/exporter'

function renderShapeSVG(el: ShapeElement, canvasW: number, canvasH: number) {
  const t = el.rotation ? `rotate(${el.rotation} ${el.x} ${el.y})` : undefined
  const st = el.stroke === 'transparent' ? 'none' : el.stroke
  let svgChild: React.ReactNode = null
  if (el.shapeType === 'rect') {
    svgChild = (
      <rect x={el.x - el.width / 2} y={el.y - el.height / 2}
        width={el.width} height={el.height} rx={3}
        fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
    )
  } else if (el.shapeType === 'circle') {
    svgChild = (
      <ellipse cx={el.x} cy={el.y}
        rx={el.width / 2} ry={el.height / 2}
        fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
    )
  } else if (el.shapeType === 'heart') {
    const w = el.width, h = el.height, cx = el.x, cy = el.y
    const d = `M${cx},${cy + h * 0.35} C${cx - w * 0.6},${cy - h * 0.05} ${cx - w * 0.65},${cy - h * 0.45} ${cx},${cy - h * 0.28} C${cx + w * 0.65},${cy - h * 0.45} ${cx + w * 0.6},${cy - h * 0.05} ${cx},${cy + h * 0.35} Z`
    svgChild = <path d={d} fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
  } else if (el.shapeType === 'star') {
    const r = Math.min(el.width, el.height) * 0.5
    const ir = r * 0.4
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (i * Math.PI / 5) - Math.PI / 2
      const rad = i % 2 === 0 ? r : ir
      return `${el.x + Math.cos(a) * rad},${el.y + Math.sin(a) * rad}`
    }).join(' ')
    svgChild = <polygon points={pts} fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
  }
  if (!svgChild) return null
  return (
    <svg
      key={el.id}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: el.zIndex }}
      viewBox={`0 0 ${canvasW} ${canvasH}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {svgChild}
    </svg>
  )
}

interface CardPreviewProps {
  canvasData: CanvasData
  isOpen: boolean
  onClose: () => void
  onShare?: () => void
  filename?: string
}

export default function CardPreview({ canvasData, isOpen, onClose, onShare, filename = 'card' }: CardPreviewProps) {
  const [confettiActive, setConfettiActive] = useState(false)
  const [snowActive, setSnowActive] = useState(false)
  const [sakuraActive, setSakuraActive] = useState(false)
  const [fireworksActive, setFireworksActive] = useState(false)
  const [dlState, setDlState] = useState<'png' | 'pdf' | null>(null)

  const animType = canvasData.animation?.type

  useEffect(() => {
    if (!isOpen) {
      setConfettiActive(false)
      setSnowActive(false)
      setSakuraActive(false)
      setFireworksActive(false)
      return
    }

    const t1 = setTimeout(() => {
      if (animType === 'confetti') setConfettiActive(true)
      if (animType === 'snow') setSnowActive(true)
      if (animType === 'sakura') setSakuraActive(true)
      if (animType === 'fireworks') setFireworksActive(true)
    }, 400)

    return () => clearTimeout(t1)
  }, [isOpen, animType])

  const handleDownloadPNG = async () => {
    setDlState('png')
    try {
      await exportCardToPNG(canvasData, filename)
      toast.success('PNG でダウンロードしました')
    } catch {
      toast.error('ダウンロードに失敗しました')
    } finally {
      setDlState(null)
    }
  }

  const handleDownloadPDF = async () => {
    setDlState('pdf')
    try {
      await exportCardToPDF(canvasData, filename)
      toast.success('PDF でダウンロードしました')
    } catch {
      toast.error('ダウンロードに失敗しました')
    } finally {
      setDlState(null)
    }
  }

  const getMotionProps = () => {
    switch (animType) {
      case 'slide_up':
        return { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } }
      case 'bounce':
        return { initial: { scale: 0.7, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.6 } }
      case 'float':
        return {
          initial: { opacity: 0, y: 0 },
          animate: { opacity: 1, y: [0, -10, 0, -10, 0] } as TargetAndTransition,
          transition: { opacity: { duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } },
        }
      case 'heartbeat':
        return {
          initial: { opacity: 0, scale: 1 },
          animate: { opacity: 1, scale: [1, 1.04, 1, 1.04, 1] } as TargetAndTransition,
          transition: { opacity: { duration: 0.5 }, scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } },
        }
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } }
    }
  }

  const motionProps = getMotionProps()
  const bg = canvasData.background
  const sizeConfig = CARD_SIZES[canvasData.size]
  const templateDef = canvasData.templateId
    ? CARD_TEMPLATES.find(t => t.id === canvasData.templateId)
    : null
  const backgroundStyle: React.CSSProperties = templateDef
    ? {}
    : bg.type === 'gradient' ? { background: bg.value } : { backgroundColor: bg.value }
  const aspectRatio = sizeConfig.width / sizeConfig.height

  // zIndexでソート（エディタのレイヤー順を尊重）
  const sortedElements = [...canvasData.elements].sort((a, b) => a.zIndex - b.zIndex)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 sm:p-6"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <ConfettiAnimation active={confettiActive} />
          <SnowAnimation active={snowActive} />
          <SakuraAnimation active={sakuraActive} />
          <FireworksAnimation active={fireworksActive} />

          <button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={motionProps.transition}
            className="relative overflow-hidden rounded-2xl shadow-2xl w-full"
            style={{ maxWidth: 560, aspectRatio }}
          >
            <div
              style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...backgroundStyle }}
            >
              {templateDef && (
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                  <templateDef.Comp />
                </div>
              )}
              {sortedElements.map(el => {
                if (el.type === 'shape') {
                  return renderShapeSVG(el as ShapeElement, sizeConfig.width, sizeConfig.height)
                }
                if (el.type === 'image') {
                  const imgEl = el as ImageElement
                  return (
                    <img
                      key={imgEl.id}
                      src={imgEl.src}
                      alt=""
                      style={{
                        position: 'absolute',
                        left: `${(imgEl.x - imgEl.width / 2) / sizeConfig.width * 100}%`,
                        top: `${(imgEl.y - imgEl.height / 2) / sizeConfig.height * 100}%`,
                        width: `${imgEl.width / sizeConfig.width * 100}%`,
                        height: `${imgEl.height / sizeConfig.height * 100}%`,
                        borderRadius: `${imgEl.borderRadius}px`,
                        opacity: imgEl.opacity ?? 1,
                        objectFit: 'cover',
                        transform: imgEl.rotation ? `rotate(${imgEl.rotation}deg)` : undefined,
                        zIndex: imgEl.zIndex,
                        pointerEvents: 'none',
                      }}
                    />
                  )
                }
                if (el.type === 'text') {
                  const txtEl = el as TextElement
                  return (
                    <p
                      key={txtEl.id}
                      className="mb-4 whitespace-pre-wrap"
                      style={{
                        position: 'absolute',
                        left: `${(txtEl.x - txtEl.width / 2) / sizeConfig.width * 100}%`,
                        top: `${(txtEl.y - txtEl.height / 2) / sizeConfig.height * 100}%`,
                        width: `${txtEl.width / sizeConfig.width * 100}%`,
                        fontFamily: txtEl.fontFamily,
                        fontSize: `clamp(12px, ${txtEl.fontSize * 0.04}vw, ${txtEl.fontSize * 0.6}px)`,
                        fontWeight: txtEl.fontWeight,
                        fontStyle: txtEl.fontStyle,
                        color: txtEl.color,
                        lineHeight: txtEl.lineHeight,
                        textAlign: txtEl.align,
                        opacity: txtEl.opacity,
                        zIndex: txtEl.zIndex,
                        pointerEvents: 'none',
                      }}
                    >
                      {txtEl.text}
                    </p>
                  )
                }
                return null
              })}
            </div>
          </motion.div>

          <div className="mt-4 sm:mt-6 flex gap-3">
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
            <Button
              variant="outline"
              onClick={handleDownloadPNG}
              disabled={dlState !== null}
              className="bg-transparent text-white border-white/30 hover:bg-white/10"
            >
              {dlState === 'png'
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : <FileImage className="mr-2 h-4 w-4" />}
              PNG
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={dlState !== null}
            >
              {dlState === 'pdf'
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : <FileText className="mr-2 h-4 w-4" />}
              PDF
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
