'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, type TargetAndTransition } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Share2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { CARD_SIZES } from '@/types/card'
import type { CanvasData, TextElement, ShapeElement, ImageElement, CanvasElement } from '@/types/card'
import ConfettiAnimation from '@/components/card/animations/ConfettiAnimation'
import SnowAnimation from '@/components/card/animations/SnowAnimation'
import SakuraAnimation from '@/components/card/animations/SakuraAnimation'
import FireworksAnimation from '@/components/card/animations/FireworksAnimation'
import EnvelopeReveal from '@/components/share/EnvelopeReveal'
import { CARD_TEMPLATES } from '@/components/lp/CardTemplates'

interface PublicCardViewProps {
  title: string
  canvasData: CanvasData
  shareId: string
}

function CardShapesLayer({ elements, canvasW, canvasH }: {
  elements: CanvasElement[]
  canvasW: number
  canvasH: number
}) {
  const shapes = elements
    .filter(el => el.type === 'shape')
    .sort((a, b) => a.zIndex - b.zIndex) as ShapeElement[]
  if (shapes.length === 0) return null
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}
      viewBox={`0 0 ${canvasW} ${canvasH}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {shapes.map(el => {
        const t = el.rotation ? `rotate(${el.rotation} ${el.x} ${el.y})` : undefined
        const st = el.stroke === 'transparent' ? 'none' : el.stroke
        if (el.shapeType === 'rect') return (
          <rect key={el.id} x={el.x - el.width / 2} y={el.y - el.height / 2}
            width={el.width} height={el.height} rx={3}
            fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
        )
        if (el.shapeType === 'circle') return (
          <ellipse key={el.id} cx={el.x} cy={el.y}
            rx={el.width / 2} ry={el.height / 2}
            fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
        )
        if (el.shapeType === 'heart') {
          const w = el.width, h = el.height, cx = el.x, cy = el.y
          const d = `M${cx},${cy + h * 0.35} C${cx - w * 0.6},${cy - h * 0.05} ${cx - w * 0.65},${cy - h * 0.45} ${cx},${cy - h * 0.28} C${cx + w * 0.65},${cy - h * 0.45} ${cx + w * 0.6},${cy - h * 0.05} ${cx},${cy + h * 0.35} Z`
          return <path key={el.id} d={d} fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
        }
        if (el.shapeType === 'star') {
          const r = Math.min(el.width, el.height) * 0.5
          const ir = r * 0.4
          const pts = Array.from({ length: 10 }, (_, i) => {
            const a = (i * Math.PI / 5) - Math.PI / 2
            const rad = i % 2 === 0 ? r : ir
            return `${el.x + Math.cos(a) * rad},${el.y + Math.sin(a) * rad}`
          }).join(' ')
          return <polygon key={el.id} points={pts} fill={el.fill} stroke={st} strokeWidth={el.strokeWidth} opacity={el.opacity} transform={t} />
        }
        return null
      })}
    </svg>
  )
}

function TypewriterText({ text, startDelay = 0, speed = 45 }: { text: string; startDelay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current >= text.length) { clearInterval(interval); return }
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, startDelay, speed])

  return <>{displayed}</>
}

export default function PublicCardView({ title, canvasData, shareId }: PublicCardViewProps) {
  const envelopeStyle = canvasData.envelope?.style
  const hasEnvelope = !!envelopeStyle && envelopeStyle !== 'none'

  const [envelopeOpened, setEnvelopeOpened] = useState(!hasEnvelope)
  const [confettiActive, setConfettiActive] = useState(false)
  const [snowActive, setSnowActive] = useState(false)
  const [sakuraActive, setSakuraActive] = useState(false)
  const [fireworksActive, setFireworksActive] = useState(false)

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

  const getMotionProps = () => {
    if (!envelopeOpened) return { initial: { opacity: 0 }, animate: { opacity: 0 }, transition: { duration: 0 } }

    switch (animType) {
      case 'slide_up':
        return { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } }
      case 'bounce':
        return { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.6 } }
      case 'float':
        return {
          initial: { opacity: 0, y: 0 },
          animate: { opacity: 1, y: [0, -10, 0, -10, 0] } as TargetAndTransition,
          transition: { opacity: { duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } },
        }
      case 'heartbeat':
        return {
          initial: { opacity: 0, scale: 1 },
          animate: { opacity: 1, scale: [1, 1.04, 1, 1.04, 1] } as TargetAndTransition,
          transition: { opacity: { duration: 0.5 }, scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } },
        }
      case 'typewriter':
        return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.9 } }
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

  const sortedTextElements = canvasData.elements
    .filter(el => el.type === 'text')
    .sort((a, b) => a.y - b.y) as TextElement[]

  const imageElements = canvasData.elements
    .filter(el => el.type === 'image')
    .sort((a, b) => a.zIndex - b.zIndex) as ImageElement[]

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

      {/* カード本体 */}
      {envelopeOpened && (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-3 sm:p-6">
          <ConfettiAnimation active={confettiActive} />
          <SnowAnimation active={snowActive} />
          <SakuraAnimation active={sakuraActive} />
          <FireworksAnimation active={fireworksActive} />

          <div className="w-full max-w-sm sm:max-w-2xl">
            <motion.div
              initial={motionProps.initial}
              animate={motionProps.animate}
              transition={motionProps.transition}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ aspectRatio: '4/3', ...backgroundStyle }}
            >
              {templateDef && (
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                  <templateDef.Comp />
                </div>
              )}
              <CardShapesLayer elements={canvasData.elements} canvasW={sizeConfig.width} canvasH={sizeConfig.height} />
              {/* 画像要素 */}
              {imageElements.map(el => (
                <img
                  key={el.id}
                  src={el.src}
                  alt=""
                  crossOrigin="anonymous"
                  style={{
                    position: 'absolute',
                    left: `${(el.x - el.width / 2) / sizeConfig.width * 100}%`,
                    top: `${(el.y - el.height / 2) / sizeConfig.height * 100}%`,
                    width: `${el.width / sizeConfig.width * 100}%`,
                    height: `${el.height / sizeConfig.height * 100}%`,
                    objectFit: 'cover',
                    borderRadius: el.borderRadius,
                    opacity: el.opacity,
                    transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
                    zIndex: el.zIndex,
                    pointerEvents: 'none',
                  }}
                />
              ))}
              <div
                className="flex h-full flex-col items-center justify-center p-5 sm:p-10 text-center"
                style={{ position: 'relative', zIndex: 1 }}
              >
                {sortedTextElements.map((el, idx) => (
                  <p
                    key={el.id}
                    className="mb-3 whitespace-pre-wrap"
                    style={{
                      fontFamily: el.fontFamily,
                      fontSize: `clamp(12px, ${el.fontSize * 0.045}vw, ${el.fontSize * 0.6}px)`,
                      fontWeight: el.fontWeight,
                      fontStyle: el.fontStyle,
                      color: el.color,
                      lineHeight: el.lineHeight,
                      textAlign: el.align,
                    }}
                  >
                    {animType === 'typewriter'
                      ? <TypewriterText text={el.text} startDelay={idx * 800} speed={40} />
                      : el.text}
                  </p>
                ))}
              </div>
            </motion.div>

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
        </div>
      )}
    </>
  )
}
