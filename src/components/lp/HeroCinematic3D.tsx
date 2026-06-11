'use client'

import { useRef, useEffect, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroCinematicCSS = dynamic(() => import('./HeroCinematic'), { ssr: false })

// --- 3D Envelope Mesh ---
function EnvelopeMesh({ progressRef }: { progressRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const flapRef = useRef<THREE.Mesh>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const sealRef = useRef<THREE.Mesh>(null)

  const envelopeColor = useMemo(() => new THREE.Color('#E8D5C0'), [])
  const envelopeInside = useMemo(() => new THREE.Color('#F5EBD7'), [])
  const cardColor = useMemo(() => new THREE.Color('#FFFCF5'), [])
  const sealColor = useMemo(() => new THREE.Color('#A85F44'), [])
  const accentColor = useMemo(() => new THREE.Color('#E89A82'), [])

  const flapGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      -1.35, 0, 0,
      1.35, 0, 0,
      0.6, 0, 1.2,
      -0.6, 0, 1.2,
    ])
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3])
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geom.setIndex(new THREE.BufferAttribute(indices, 1))
    geom.computeVertexNormals()
    return geom
  }, [])

  useEffect(() => {
    return () => { flapGeometry.dispose() }
  }, [flapGeometry])

  useFrame(() => {
    if (!groupRef.current) return
    const progress = progressRef.current ?? 0
    const seg = (a: number, b: number) => Math.max(0, Math.min(1, (progress - a) / (b - a)))

    const flapOpen = seg(0.08, 0.30)
    const sealAnim = seg(0.08, 0.26)
    const cardRise = seg(0.22, 0.55)
    const envFade = seg(0.45, 0.65)

    groupRef.current.rotation.y = Math.sin(progress * 0.5) * 0.05
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.03
    const s = 1 - envFade * 0.3
    groupRef.current.scale.set(s, s, s)

    if (flapRef.current) flapRef.current.rotation.x = -flapOpen * Math.PI * 0.95
    if (cardRef.current) {
      cardRef.current.position.y = cardRise * 1.8
      cardRef.current.position.z = cardRise * 0.3
      cardRef.current.rotation.z = -cardRise * 0.02
    }
    if (sealRef.current) {
      sealRef.current.rotation.z = sealAnim * Math.PI * 4
      sealRef.current.position.y = sealAnim * 1.5
      const sealScale = Math.max(0, 1 - sealAnim)
      sealRef.current.scale.set(sealScale, sealScale, sealScale)
    }
  })

  const cardRise = 0 // static position; actual animation in useFrame

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <RoundedBox args={[2.8, 0.15, 2]} radius={0.04} position={[0, 0, 0]}>
        <meshStandardMaterial color={envelopeColor} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[2.7, 0.02, 1.9]} radius={0.02} position={[0, -0.08, 0]}>
        <meshStandardMaterial color={envelopeInside} roughness={0.9} />
      </RoundedBox>
      <mesh ref={cardRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[2.5, 0.03, 1.7]} />
        <meshStandardMaterial color={cardColor} roughness={0.4} metalness={0.05} />
      </mesh>
      <Text
        position={[0, 0.14 + cardRise * 1.8, -0.2]}
        fontSize={0.2}
        color="#A85F44"
        font="/fonts/dm-serif-display-italic.woff2"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        For You,
      </Text>
      <mesh position={[0.9, 0.14, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} />
      </mesh>
      <mesh position={[1.0, 0.14, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} opacity={0.7} transparent />
      </mesh>
      <group position={[0, 0.075, -1]}>
        <mesh ref={flapRef} geometry={flapGeometry}>
          <meshStandardMaterial color={envelopeColor} side={THREE.DoubleSide} roughness={0.85} />
        </mesh>
      </group>
      <mesh ref={sealRef} position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
        <meshStandardMaterial color={sealColor} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0.5]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[2.7, 0.01]} />
        <meshStandardMaterial color={envelopeColor} opacity={0.3} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// --- Floating Particles ---
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 40

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 8)
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geom
  }, [])

  useEffect(() => {
    return () => { geometry.dispose() }
  }, [geometry])

  useFrame((_, delta) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.15
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.03} color="#E89A82" transparent opacity={0.4} />
    </points>
  )
}

// --- Camera Controller ---
function CameraController({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera } = useThree()
  useFrame(() => {
    const progress = progressRef.current ?? 0
    const landProgress = Math.max(0, Math.min(1, (progress - 0.5) / 0.3))
    camera.position.x = THREE.MathUtils.lerp(0, -0.5, landProgress)
    camera.position.y = THREE.MathUtils.lerp(2, 1.5, landProgress)
    camera.position.z = THREE.MathUtils.lerp(3.5, 4, landProgress)
    camera.lookAt(0, landProgress * 0.5, 0)
  })
  return null
}

// --- Scene ---
function Scene3D({ progressRef }: { progressRef: React.RefObject<number> }) {
  return (
    <>
      <CameraController progressRef={progressRef} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-2, 3, -2]} intensity={0.3} color="#E8D5C0" />
      <Environment preset="studio" environmentIntensity={0.3} />
      <EnvelopeMesh progressRef={progressRef} />
      <Particles />
    </>
  )
}

// --- Reveal layer (extracted to avoid re-renders from progress ref) ---
function RevealLayer({ progressRef }: { progressRef: React.RefObject<number> }) {
  const revealRef = useRef<HTMLDivElement>(null)
  const titleENRef = useRef<HTMLSpanElement>(null)
  const titleJP1Ref = useRef<HTMLSpanElement>(null)
  const titleJP2Ref = useRef<HTMLSpanElement>(null)
  const ledeRef = useRef<HTMLParagraphElement>(null)
  const ctaRowRef = useRef<HTMLDivElement>(null)
  const metaRowRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rafRef = { current: 0 }
    const apply = () => {
      const p = progressRef.current ?? 0
      const seg = (a: number, b: number) => Math.max(0, Math.min(1, (p - a) / (b - a)))
      const cardLand = seg(0.50, 0.68)
      const titleEN = seg(0.62, 0.74)
      const titleJP1 = seg(0.70, 0.82)
      const titleJP2 = seg(0.78, 0.90)
      const lede = seg(0.84, 0.94)
      const cta = seg(0.90, 1.00)

      if (canvasWrapRef.current) {
        canvasWrapRef.current.style.opacity = String(1 - seg(0.55, 0.70))
        canvasWrapRef.current.style.pointerEvents = p > 0.6 ? 'none' : 'auto'
      }
      if (scrollCueRef.current) scrollCueRef.current.style.opacity = String(1 - Math.min(1, p * 6))
      if (revealRef.current) {
        revealRef.current.style.opacity = String(cardLand)
        revealRef.current.style.pointerEvents = p > 0.5 ? 'auto' : 'none'
      }
      if (titleENRef.current) {
        titleENRef.current.style.opacity = String(titleEN)
        titleENRef.current.style.transform = `translateY(${(1 - titleEN) * 26}px)`
      }
      if (titleJP1Ref.current) {
        titleJP1Ref.current.style.opacity = String(titleJP1)
        titleJP1Ref.current.style.transform = `translateY(${(1 - titleJP1) * 30}px)`
      }
      if (titleJP2Ref.current) {
        titleJP2Ref.current.style.opacity = String(titleJP2)
        titleJP2Ref.current.style.transform = `translateY(${(1 - titleJP2) * 30}px)`
      }
      if (ledeRef.current) {
        ledeRef.current.style.opacity = String(lede)
        ledeRef.current.style.transform = `translateY(${(1 - lede) * 18}px)`
      }
      if (ctaRowRef.current) {
        ctaRowRef.current.style.opacity = String(cta)
        ctaRowRef.current.style.transform = `translateY(${(1 - cta) * 16}px)`
      }
      if (metaRowRef.current) metaRowRef.current.style.opacity = String(cta)
      if (progressBarRef.current) progressBarRef.current.style.height = `${p * 100}%`
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [progressRef])

  return (
    <>
      <div ref={canvasWrapRef} style={{ position: 'absolute', inset: 0, zIndex: 2, transition: 'opacity 0.3s' }} />
      <div ref={scrollCueRef} className="hero-scroll-cue" style={{ zIndex: 10 }}>
        <span className="hero-scroll-label">Scroll to open</span>
        <span className="hero-scroll-arrow">&darr;</span>
      </div>
      <div ref={revealRef} className="hero-reveal">
        <div className="hero-copy">
          <h1 className="hero-h1">
            <span ref={titleENRef} className="hero-h1-en">Open the moment.</span>
            <span ref={titleJP1Ref} className="hero-h1-jp1">心がふるえる、</span>
            <span ref={titleJP2Ref} className="hero-h1-jp2">一通の手紙を。</span>
          </h1>
          <p ref={ledeRef} className="hero-p">
            テンプレートを選んで、言葉を添えるだけ。<br className="break-md" />
            3分で届く、アニメーション付きメッセージカード。
          </p>
          <div ref={ctaRowRef} className="hero-cta-row">
            <Link href="/create" className="lp-btn lp-btn-primary">無料でカードを作る &rarr;</Link>
            <a href="#gallery" className="lp-btn lp-btn-ghost">テンプレートを見る</a>
          </div>
          <div ref={metaRowRef} className="hero-meta-row">
            <span>クレジットカード不要</span>
            <span aria-hidden>&middot;</span>
            <span>3分で完成</span>
            <span aria-hidden>&middot;</span>
            <span>登録なしOK</span>
          </div>
        </div>
      </div>
      <div className="hero-progress">
        <div ref={progressBarRef} className="hero-progress-bar" />
      </div>
    </>
  )
}

// --- Main Component ---
export default function HeroCinematic3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)
  const [mounted, setMounted] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      progressRef.current = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!webglSupported) {
    return <HeroCinematicCSS />
  }

  return (
    <section ref={sectionRef} className="hero-cinematic" style={{ height: '320vh' }}>
      <div className="hero-pin">
        <div className="hero-backdrop" />
        <div className="hero-vignette" />

        <div className="hero-glints">
          {([
            [12, 18, 0], [86, 22, 1.2], [8, 78, 2.4],
            [92, 70, 0.6], [22, 88, 1.8], [78, 12, 3.0],
          ] as const).map(([x, y, d], i) => (
            <span key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />
          ))}
        </div>

        {mounted && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 2, 3.5], fov: 45 }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <Scene3D progressRef={progressRef} />
              </Suspense>
            </Canvas>
          </div>
        )}

        <RevealLayer progressRef={progressRef} />
      </div>
    </section>
  )
}

export { StatStrip } from './HeroCinematic'
