'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface ViralCTAProps {
  shareUrl: string
}

export default function ViralCTA({ shareUrl }: ViralCTAProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 5000)
    return () => clearTimeout(t)
  }, [])

  if (dismissed) return null

  const xShareText = encodeURIComponent('素敵なカードをもらいました\n')
  const xShareUrl = `https://x.com/intent/tweet?text=${xShareText}&url=${encodeURIComponent(shareUrl)}`
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            padding: '0 12px 12px',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            maxWidth: 440,
            margin: '0 auto',
            position: 'relative',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderRadius: 16,
            padding: '16px 18px',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
            pointerEvents: 'auto',
          }}>
            {/* Close button */}
            <button
              onClick={() => setDismissed(true)}
              style={{
                position: 'absolute',
                top: 10,
                right: 14,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
                padding: 4,
              }}
              aria-label="閉じる"
            >
              <X style={{ width: 16, height: 16 }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8D5C4 0%, #D4B896 100%)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}>
                <Sparkles style={{ width: 18, height: 18, color: '#6B5B4A' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#2A2118' }}>
                  あなたも3分でカードが作れます
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#7A6B5A' }}>
                  登録不要・無料で体験
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <Link
                href="/create"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 0',
                  borderRadius: 10,
                  background: '#2A2118',
                  color: '#FFF',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                カードを作る
              </Link>
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: '1px solid #E0D8D0',
                  background: '#FFF',
                  textDecoration: 'none',
                  fontSize: 16,
                }}
                aria-label="Xでシェア"
              >
                𝕏
              </a>
              <a
                href={lineShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: '1px solid #E0D8D0',
                  background: '#06C755',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontSize: 11,
                  fontWeight: 700,
                }}
                aria-label="LINEでシェア"
              >
                LINE
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
