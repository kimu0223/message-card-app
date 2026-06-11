'use client'

import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { CanvasData } from '@/types/card'
import { CARD_SIZES } from '@/types/card'
import { CARD_TEMPLATES } from '@/components/lp/CardTemplates'
import type { TextElement, ImageElement } from '@/types/card'

interface PublicCardView3DProps {
  canvasData: CanvasData
  onFallback: () => void
}

// Palette at module level to avoid recreation
const PARTICLE_PALETTE = [
  new THREE.Color('#E89A82'),
  new THREE.Color('#F4D6B0'),
  new THREE.Color('#8FA68A'),
  new THREE.Color('#B89263'),
  new THREE.Color('#FFFCF5'),
]

// --- Floating particles around the card ---
function CardParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 60

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      const c = PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return geom
  }, [])

  useEffect(() => {
    return () => { geometry.dispose() }
  }, [geometry])

  useFrame(({ clock }, delta) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    const t = clock.elapsedTime
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.08
      arr[i * 3] += Math.sin(t + i) * delta * 0.02
      if (arr[i * 3 + 1] > 2.5) arr[i * 3 + 1] = -2.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} />
    </points>
  )
}

// --- Card 3D Mesh with HTML content ---
function Card3D({ canvasData }: { canvasData: CanvasData }) {
  const cardRef = useRef<THREE.Group>(null)
  const sizeConfig = CARD_SIZES[canvasData.size]
  const aspectRatio = sizeConfig.width / sizeConfig.height
  const cardHeight = 2.2
  const cardWidth = cardHeight * aspectRatio

  useFrame(({ clock }) => {
    if (!cardRef.current) return
    const t = clock.elapsedTime
    cardRef.current.rotation.y = Math.sin(t * 0.5) * 0.08
    cardRef.current.position.y = Math.sin(t * 0.8) * 0.06
  })

  const bg = canvasData.background
  const templateDef = canvasData.templateId
    ? CARD_TEMPLATES.find(t => t.id === canvasData.templateId)
    : null

  const backgroundStyle: React.CSSProperties = templateDef
    ? {}
    : bg.type === 'gradient' ? { background: bg.value } : { backgroundColor: bg.value }

  const sortedElements = useMemo(
    () => [...canvasData.elements].sort((a, b) => a.zIndex - b.zIndex),
    [canvasData.elements]
  )

  return (
    <group ref={cardRef}>
      <RoundedBox args={[cardWidth, cardHeight, 0.04]} radius={0.03} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FFFCF5" roughness={0.3} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[cardWidth + 0.02, cardHeight + 0.02, 0.02]} radius={0.03} position={[0, 0, -0.02]}>
        <meshStandardMaterial color="#E8D5C0" roughness={0.8} />
      </RoundedBox>

      <Html
        transform
        position={[0, 0, 0.025]}
        style={{
          width: `${Math.round(cardWidth * 120)}px`,
          height: `${Math.round(cardHeight * 120)}px`,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 8,
          position: 'relative',
          ...backgroundStyle,
        }}>
          {templateDef && (
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <templateDef.Comp />
            </div>
          )}
          {sortedElements.map(el => {
            if (el.type === 'text') {
              const txtEl = el as TextElement
              return (
                <p key={txtEl.id} style={{
                  position: 'absolute',
                  left: `${(txtEl.x - txtEl.width / 2) / sizeConfig.width * 100}%`,
                  top: `${(txtEl.y - txtEl.height / 2) / sizeConfig.height * 100}%`,
                  width: `${txtEl.width / sizeConfig.width * 100}%`,
                  fontFamily: txtEl.fontFamily,
                  fontSize: `${txtEl.fontSize * 0.35}px`,
                  fontWeight: txtEl.fontWeight,
                  fontStyle: txtEl.fontStyle,
                  color: txtEl.color,
                  lineHeight: txtEl.lineHeight,
                  textAlign: txtEl.align,
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                  zIndex: txtEl.zIndex,
                }}>
                  {txtEl.text}
                </p>
              )
            }
            if (el.type === 'image') {
              const imgEl = el as ImageElement
              return (
                <img key={imgEl.id} src={imgEl.src} alt=""
                  style={{
                    position: 'absolute',
                    left: `${(imgEl.x - imgEl.width / 2) / sizeConfig.width * 100}%`,
                    top: `${(imgEl.y - imgEl.height / 2) / sizeConfig.height * 100}%`,
                    width: `${imgEl.width / sizeConfig.width * 100}%`,
                    height: `${imgEl.height / sizeConfig.height * 100}%`,
                    objectFit: 'cover',
                    borderRadius: imgEl.borderRadius,
                    opacity: imgEl.opacity,
                    zIndex: imgEl.zIndex,
                  }}
                />
              )
            }
            return null
          })}
        </div>
      </Html>
    </group>
  )
}

// --- Scene ---
function Scene({ canvasData }: { canvasData: CanvasData }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#E8D5C0" />
      <pointLight position={[0, 2, 2]} intensity={0.4} color="#F4D6B0" />
      <Environment preset="studio" environmentIntensity={0.2} />
      <Card3D canvasData={canvasData} />
      <CardParticles />
    </>
  )
}

// --- Main Component ---
export default function PublicCardView3D({ canvasData, onFallback }: PublicCardView3DProps) {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) {
        setWebglSupported(false)
        onFallback()
      }
    } catch {
      setWebglSupported(false)
      onFallback()
    }
  }, [onFallback])

  if (!webglSupported) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% 40%, #1a1a2e 0%, #0d0d1a 100%)',
      zIndex: 0,
    }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0.3, 3.5], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Scene canvasData={canvasData} />
        </Suspense>
      </Canvas>
    </div>
  )
}
