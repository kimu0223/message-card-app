'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EnvelopeStyle } from '@/types/card'

interface EnvelopeRevealProps {
  style: EnvelopeStyle
  senderName?: string
  onOpen: () => void
}

const ENVELOPE_STYLES: Record<EnvelopeStyle, {
  bg: string
  flapBg: string
  bodyBg: string
  textColor: string
  accentColor: string
  glowColor: string
  seal: string
}> = {
  none: {
    bg: '#f5f5f5', flapBg: '#e0e0e0', bodyBg: '#f0f0f0',
    textColor: '#333', accentColor: '#666', glowColor: '#666', seal: '✦',
  },
  classic: {
    bg: 'linear-gradient(160deg, #FFF8F0 0%, #F4ECDC 100%)',
    flapBg: '#EDE3CE',
    bodyBg: '#F4ECDC',
    textColor: '#2B2520',
    accentColor: '#C97B5C',
    glowColor: '#C97B5C',
    seal: '✦',
  },
  kraft: {
    bg: 'linear-gradient(160deg, #D4A96A 0%, #B8864E 100%)',
    flapBg: '#9A6838',
    bodyBg: '#C4904A',
    textColor: '#FFFCF5',
    accentColor: '#FFFCF5',
    glowColor: '#D4A96A',
    seal: '✤',
  },
  floral: {
    bg: 'linear-gradient(160deg, #FFF0F5 0%, #FFD6E7 100%)',
    flapBg: '#FFADD0',
    bodyBg: '#FFE4F0',
    textColor: '#8B2252',
    accentColor: '#E0609A',
    glowColor: '#FF91A4',
    seal: '✿',
  },
  navy: {
    bg: 'linear-gradient(160deg, #1F3566 0%, #0F1E3D 100%)',
    flapBg: '#0B1730',
    bodyBg: '#1A2D5A',
    textColor: '#F0E6C8',
    accentColor: '#C9A96E',
    glowColor: '#C9A96E',
    seal: '★',
  },
  sakura: {
    bg: 'linear-gradient(160deg, #FFF5F8 0%, #FFCCE0 100%)',
    flapBg: '#FFB7C5',
    bodyBg: '#FFE0EC',
    textColor: '#6B2738',
    accentColor: '#E8728A',
    glowColor: '#FFB7C5',
    seal: '✾',
  },
}

export default function EnvelopeReveal({ style, senderName, onOpen }: EnvelopeRevealProps) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle')
  const [showHint, setShowHint] = useState(false)
  const cfg = ENVELOPE_STYLES[style]

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1800)
    return () => clearTimeout(t)
  }, [])

  const handleTap = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => {
      setPhase('done')
      onOpen()
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111827',
        zIndex: 50,
        cursor: phase === 'idle' ? 'pointer' : 'default',
        padding: '1.5rem',
        userSelect: 'none',
      }}
      onClick={handleTap}
    >
      {/* 背景グロー */}
      <div style={{
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        maxWidth: 500,
        maxHeight: 500,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${cfg.glowColor}25, transparent 70%)`,
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* 封筒ステージ */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 340,
        perspective: '1000px',
      }}>
        {/* 封筒本体 */}
        <motion.div
          animate={phase === 'opening' ? { y: 16, scale: 0.97 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            width: '100%',
            aspectRatio: '1.618 / 1',
            background: cfg.bg,
            borderRadius: 14,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 左下三角（封筒底面） */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0 110px 170px',
            borderColor: `transparent transparent ${cfg.flapBg} transparent`,
            opacity: 0.65,
          }} />
          {/* 右下三角 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '110px 170px 0 0',
            borderColor: `transparent ${cfg.flapBg} transparent transparent`,
            opacity: 0.65,
          }} />

          {/* 差出人 */}
          {senderName && (
            <div style={{
              position: 'absolute',
              bottom: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-lp-hand)',
              fontSize: 15,
              color: cfg.textColor,
              opacity: 0.75,
              whiteSpace: 'nowrap',
              zIndex: 2,
            }}>
              — from {senderName}
            </div>
          )}

          {/* 封筒アイコン中央 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            fontSize: 36,
            opacity: 0.2,
            color: cfg.textColor,
            zIndex: 1,
          }}>
            ✉
          </div>
        </motion.div>

        {/* 封筒フラップ（3D開封アニメーション） */}
        <motion.div
          initial={{ rotateX: 0, originY: 0 }}
          animate={phase === 'opening' ? { rotateX: -175 } : { rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '58%',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: 3,
          }}
        >
          {/* フラップ表面 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'polygon(0 0, 100% 0, 50% 88%)',
            background: cfg.flapBg,
            backfaceVisibility: 'hidden',
          }} />
          {/* フラップ裏面（開いたとき見える） */}
          <div style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'polygon(0 0, 100% 0, 50% 88%)',
            background: cfg.bodyBg,
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }} />

          {/* ワックスシール */}
          <motion.div
            animate={phase === 'opening' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: cfg.accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 2px 10px ${cfg.accentColor}80`,
              color: 'white',
              fontSize: 15,
              fontFamily: 'serif',
              zIndex: 4,
            }}
          >
            {cfg.seal}
          </motion.div>
        </motion.div>

        {/* カードが飛び出すアニメーション */}
        <AnimatePresence>
          {phase === 'opening' && (
            <motion.div
              initial={{ y: 0, opacity: 0, scale: 0.9 }}
              animate={{ y: -140, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                position: 'absolute',
                top: '15%',
                left: '8%',
                right: '8%',
                height: '72%',
                background: 'white',
                borderRadius: 10,
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div style={{ fontSize: 28, opacity: 0.25 }}>💌</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* タップヒント */}
      <AnimatePresence>
        {showHint && phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: 36,
              color: 'rgba(255,255,255,0.55)',
              fontSize: 13,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 22 }}
            >
              👆
            </motion.div>
            <span>タップして開く</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
