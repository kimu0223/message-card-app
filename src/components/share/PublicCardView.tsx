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

  // zIndexでソート（エディタのレイヤー順を尊重）
  const sortedElements = [...canvasData.elements].sort((a, b) => a.zIndex - b.zIndex)

  // typewriter アニメーション用: テキスト要素のみカウント
  let textIdx = 0

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
              style={{ aspectRatio: `${sizeConfig.width} / ${sizeConfig.height}`, ...backgroundStyle }}
            >
              {templateDef && (
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                  <templateDef.Comp />
                </div>
              )}
              {sortedElements.map((el) => {
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
                      crossOrigin="anonymous"
                      style={{
                        position: 'absolute',
                        left: `${(imgEl.x - imgEl.width / 2) / sizeConfig.width * 100}%`,
                        top: `${(imgEl.y - imgEl.height / 2) / sizeConfig.height * 100}%`,
                        width: `${imgEl.width / sizeConfig.width * 100}%`,
                        height: `${imgEl.height / sizeConfig.height * 100}%`,
                        objectFit: 'cover',
                        borderRadius: `${imgEl.borderRadius}px`,
                        opacity: imgEl.opacity ?? 1,
                        transform: imgEl.rotation ? `rotate(${imgEl.rotation}deg)` : undefined,
                        zIndex: imgEl.zIndex,
                        pointerEvents: 'none',
                      }}
                    />
                  )
                }
                if (el.type === 'text') {
                  const txtEl = el as TextElement
                  const currentTextIdx = textIdx++
                  return (
                    <p
                      key={txtEl.id}
                      className="mb-3 whitespace-pre-wrap"
                      style={{
                        position: 'absolute',
                        left: `${(txtEl.x - txtEl.width / 2) / sizeConfig.width * 100}%`,
                        top: `${(txtEl.y - txtEl.height / 2) / sizeConfig.height * 100}%`,
                        width: `${txtEl.width / sizeConfig.width * 100}%`,
                        fontFamily: txtEl.fontFamily,
                        fontSize: `clamp(12px, ${txtEl.fontSize * 0.045}vw, ${txtEl.fontSize * 0.6}px)`,
                        fontWeight: txtEl.fontWeight,
                        fontStyle: txtEl.fontStyle,
                        color: txtEl.color,
                        lineHeight: txtEl.lineHeight,
                        textAlign: txtEl.align,
                        zIndex: txtEl.zIndex,
                        pointerEvents: 'none',
                      }}
                    >
                      {animType === 'typewriter'
                        ? <TypewriterText text={txtEl.text} startDelay={currentTextIdx * 800} speed={40} />
                        : txtEl.text}
                    </p>
                  )
                }
                return null
              })}
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
