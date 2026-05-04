'use client'

import React from 'react'

// ---- Shared SVG primitives ----

const Sprig = ({ rotate = 0, scale = 1, color = '#6E8669' }: { rotate?: number; scale?: number; color?: string }) => (
  <svg viewBox="0 0 60 120" style={{ overflow: 'visible' }} width={50 * scale} height={100 * scale}>
    <g transform={`rotate(${rotate} 30 60)`}>
      <path d="M30 110 Q 30 60 30 10" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      {[18, 32, 48, 64, 82].map((y, i) => {
        const side = i % 2 === 0 ? -1 : 1
        return (
          <g key={i} transform={`translate(30, ${y})`}>
            <path d={`M0 0 Q ${side * 10} -3 ${side * 14} -10 Q ${side * 8} -2 0 0 Z`} fill={color} opacity="0.9" />
            <path d={`M0 0 Q ${side * 10} -3 ${side * 14} -10`} fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
          </g>
        )
      })}
      <circle cx="28" cy="14" r="1.8" fill={color} />
      <circle cx="32" cy="11" r="1.5" fill={color} opacity="0.7" />
    </g>
  </svg>
)

const Eucalyptus = ({ rotate = 0, color = '#8FA68A' }: { rotate?: number; color?: string }) => (
  <svg viewBox="0 0 80 140" style={{ overflow: 'visible' }} width="80" height="140">
    <g transform={`rotate(${rotate} 40 70)`}>
      <path d="M40 130 Q 38 70 40 12" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      {([
        [40, 20, -1, 1.0], [40, 32, 1, 1.1], [40, 44, -1, 1.15], [40, 58, 1, 1.2],
        [40, 72, -1, 1.15], [40, 86, 1, 1.1], [40, 100, -1, 1.0], [40, 114, 1, 0.9],
      ] as const).map(([cx, cy, side, s], i) => (
        <ellipse key={i} cx={cx + side * 8 * s} cy={cy} rx={6 * s} ry={4 * s}
                 fill={color} opacity={0.85} transform={`rotate(${side * 30} ${cx} ${cy})`} />
      ))}
    </g>
  </svg>
)

const Bloom = ({ size = 42, color = '#E89A82', center = '#A85F44' }: { size?: number; color?: string; center?: string }) => (
  <svg viewBox="0 0 60 60" width={size} height={size}>
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45) * (Math.PI / 180)
      const x = 30 + Math.cos(angle) * 14
      const y = 30 + Math.sin(angle) * 14
      return <ellipse key={`o${i}`} cx={x} cy={y} rx="8" ry="11" fill={color} opacity="0.85" transform={`rotate(${i * 45} ${x} ${y})`} />
    })}
    {Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 60 + 20) * (Math.PI / 180)
      const x = 30 + Math.cos(angle) * 7
      const y = 30 + Math.sin(angle) * 7
      return <ellipse key={`i${i}`} cx={x} cy={y} rx="5" ry="7.5" fill={color} opacity="1" transform={`rotate(${i * 60 + 30} ${x} ${y})`} />
    })}
    <circle cx="30" cy="30" r="4.5" fill={center} />
    <circle cx="30" cy="30" r="2" fill="#FFFCF5" opacity="0.5" />
  </svg>
)

const ConfettiBit = ({ x, y, rot, c, kind = 'rect' }: { x: number; y: number; rot: number; c: string; kind?: string }) => {
  if (kind === 'circle') return <circle cx={x} cy={y} r="2.5" fill={c} />
  if (kind === 'line') return <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke={c} strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${rot} ${x} ${y})`} />
  if (kind === 'tri') return <polygon points={`${x},${y - 4} ${x - 3.5},${y + 3} ${x + 3.5},${y + 3}`} fill={c} transform={`rotate(${rot} ${x} ${y})`} />
  return <rect x={x - 1.5} y={y - 5} width="3" height="10" fill={c} transform={`rotate(${rot} ${x} ${y})`} />
}

// ---- 1) Birthday Pastel Bloom ----
const CardBirthdayPastel = () => (
  <div style={{ background: '#FBF1E8', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#5A2B1A', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', left: '-20%', right: '-20%', height: '75%',
          background: 'radial-gradient(ellipse at 50% 80%, #F8C9A8 0%, #FBE0CC 50%, transparent 75%)' }} />
        <div style={{ position: 'absolute', top: -22, right: -14, transform: 'rotate(20deg)' }}>
          <Bloom size={88} color="#E89A82" center="#A85F44" />
        </div>
        <div style={{ position: 'absolute', top: 18, right: 38, transform: 'rotate(-8deg)' }}>
          <Bloom size={50} color="#F2B69B" center="#A85F44" />
        </div>
        <div style={{ position: 'absolute', top: 58, right: 8, transform: 'rotate(15deg)' }}>
          <Bloom size={36} color="#E0AC8B" center="#7A3F2A" />
        </div>
        <div style={{ position: 'absolute', top: 36, right: 70, transform: 'rotate(-30deg)' }}>
          <Sprig scale={0.7} color="#8FA68A" />
        </div>
        <div style={{ position: 'absolute', top: 0, right: 90, transform: 'rotate(45deg)' }}>
          <Sprig scale={0.5} color="#6E8669" />
        </div>
        {([[20, 130, '#F2B69B'], [38, 158, '#E89A82'], [12, 178, '#F4D6B0']] as const).map(([x, y, c], i) => (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: 6, height: 9, background: c, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', transform: `rotate(${i * 30}deg)` }} />
        ))}
      </div>
      <div style={{ position: 'relative', padding: '26px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: '#A85F44', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          &#9829; for you
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 56, lineHeight: 0.9, color: '#A85F44', letterSpacing: '-0.02em' }}>
            Happy<br/>Birthday,
          </div>
          <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 17, fontWeight: 500, lineHeight: 1.5, color: '#5A2B1A', marginTop: 14, paddingLeft: 2 }}>
            あなたの一年が、<br/>たくさんの花で満ちますように。
          </div>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 1, background: '#A85F44', opacity: 0.4 }} />
            <div style={{ fontFamily: 'var(--font-lp-hand)', color: '#A85F44', fontSize: 18, transform: 'rotate(-3deg)' }}>with love, Hana</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ---- 2) Birthday Confetti Night ----
const CardBirthdayConfetti = () => {
  const palette = ['#E8C9B4', '#C97B5C', '#8FA68A', '#E0B377', '#F4ECDC']
  const kinds = ['rect', 'circle', 'line', 'tri']
  return (
    <div style={{ background: 'linear-gradient(180deg, #1F1B17 0%, #2B2520 60%, #3D332C 100%)', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <div style={{ padding: 0, color: '#F4ECDC', position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: '-20%', left: '30%', width: '70%', height: '70%',
          background: 'radial-gradient(ellipse, rgba(232,201,180,0.18) 0%, transparent 60%)' }} />
        <svg viewBox="0 0 220 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: 28 }).map((_, i) => {
            const x = ((i * 71) % 200) + 10
            const y = ((i * 53) % 180) + 20
            const rot = (i * 47) % 360
            const c = palette[i % palette.length]
            const k = kinds[i % kinds.length]
            return <ConfettiBit key={i} x={x} y={y} rot={rot} c={c} kind={k} />
          })}
          <path d="M 10 80 Q 110 30 210 90" fill="none" stroke="#E0B377" strokeWidth="0.8" opacity="0.5" strokeDasharray="1 4" />
        </svg>
        {([[40, 60], [180, 50], [25, 130], [195, 110]] as const).map(([x, y], i) => (
          <div key={i} style={{ position: 'absolute', left: x, top: y, color: '#E0B377', fontSize: 10, fontFamily: 'var(--font-lp-display)' }}>&#10022;</div>
        ))}
        <div style={{ position: 'relative', padding: '26px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 9, fontFamily: 'var(--font-lp-mono)', color: '#E0B377', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ width: 18, height: 1, background: '#E0B377' }} /> est. today
          </div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 52, lineHeight: 0.92, color: '#F4ECDC', letterSpacing: '-0.02em' }}>
              Cheers,<br/><span style={{ color: '#E0B377' }}>to you.</span>
            </div>
            <div style={{ width: 38, height: 1, background: '#E0B377', margin: '16px 0 14px' }} />
            <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 14, fontWeight: 400, color: 'rgba(244,236,220,0.78)', lineHeight: 1.85 }}>
              一年ぶんの「ありがとう」と、<br/>これからの「楽しみ」に乾杯。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- 3) Wedding Botanical Arch ----
const CardWeddingBotanical = () => (
  <div style={{ background: '#F0EDE2', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#2B3D28', position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 220 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M 30 280 L 30 130 Q 30 30 110 30 Q 190 30 190 130 L 190 280" fill="none" stroke="#8FA68A" strokeWidth="0.6" opacity="0.5" />
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17
          let x: number, y: number, angle: number
          if (t < 0.2) { x = 30; y = 280 - t * 5 * 150; angle = 0 }
          else if (t > 0.8) { x = 190; y = 280 - (1 - t) * 5 * 150; angle = 180 }
          else {
            const arch = (t - 0.2) / 0.6
            const rad = arch * Math.PI
            x = 110 - Math.cos(rad) * 80
            y = 130 - Math.sin(rad) * 100
            angle = -90 + arch * 180
          }
          const flip = t < 0.5 ? 1 : -1
          return (
            <g key={i} transform={`translate(${x},${y}) rotate(${angle + 90 * flip})`}>
              <ellipse cx="0" cy="-8" rx="10" ry="4" fill="#8FA68A" opacity="0.85" />
              <ellipse cx="0" cy="-20" rx="8" ry="3.5" fill="#6E8669" opacity="0.85" transform="rotate(-15)" />
              <ellipse cx="0" cy="-10" rx="9" ry="3.8" fill="#A6B89F" opacity="0.7" transform="rotate(20)" />
            </g>
          )
        })}
        {([[60, 78], [160, 78], [110, 30], [78, 50], [142, 50]] as const).map(([cx, cy], i) => (
          <g key={`f${i}`}>
            <circle cx={cx} cy={cy} r="5" fill="#E89A82" opacity="0.85" />
            <circle cx={cx} cy={cy} r="2" fill="#A85F44" />
          </g>
        ))}
        {([[45, 110], [175, 110], [70, 55], [150, 55], [110, 22]] as const).map(([cx, cy], i) => (
          <g key={`b${i}`}>
            <circle cx={cx} cy={cy} r="1" fill="#FFFCF5" stroke="#B89263" strokeWidth="0.4" />
            <circle cx={cx + 4} cy={cy + 3} r="0.8" fill="#FFFCF5" stroke="#B89263" strokeWidth="0.4" />
            <circle cx={cx - 3} cy={cy + 4} r="0.8" fill="#FFFCF5" stroke="#B89263" strokeWidth="0.4" />
          </g>
        ))}
      </svg>
      <div style={{ position: 'relative', padding: '0 28px 30px', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 13, color: '#6E8669', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
          ~ Forever ~
        </div>
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 24, fontWeight: 500, lineHeight: 1.35, color: '#2B2520', marginTop: 12 }}>
          ご結婚<br/>おめでとうございます
        </div>
        <div style={{ width: 24, height: 0.5, background: '#6E8669', margin: '14px 0' }} />
        <div style={{ fontSize: 12, lineHeight: 1.95, color: '#4A5B40', maxWidth: 200 }}>
          おふたりの未来が、<br/>あたたかな光で満ちますように。
        </div>
        <div style={{ marginTop: 16, fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 14, color: '#6E8669', letterSpacing: '0.1em' }}>
          M &amp; K &nbsp;&middot;&nbsp; 05.04.2026
        </div>
      </div>
    </div>
  </div>
)

// ---- 4) Anniversary Gold Foil Monogram ----
const CardWeddingGold = () => (
  <div style={{ background: 'linear-gradient(155deg, #FFFCF5 0%, #F5EBD7 100%)', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#2B2520', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 14, border: '0.5px solid #B89263', borderRadius: 4 }} />
      <div style={{ position: 'absolute', inset: 18, border: '0.5px solid #B89263', borderRadius: 2, opacity: 0.5 }} />
      {([
        { top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
      ] as const).map((pos, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', ...pos }}>
          <path d="M2 2 L 16 2 L 16 4 M 2 2 L 2 16 L 4 16" fill="none" stroke="#B89263" strokeWidth="0.8" />
          <circle cx="2" cy="2" r="1" fill="#B89263" />
        </svg>
      ))}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-58%)', textAlign: 'center' }}>
        <div style={{ width: 92, height: 92, borderRadius: '50%', border: '1.5px solid #B89263',
          display: 'grid', placeItems: 'center', margin: '0 auto', position: 'relative',
          background: 'radial-gradient(circle, rgba(184,146,99,0.08) 0%, transparent 70%)' }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '0.5px dashed rgba(184,146,99,0.6)' }} />
          <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 36, color: '#B89263', lineHeight: 1, letterSpacing: '-0.02em' }}>M&amp;K</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
          <div style={{ width: 18, height: 0.5, background: '#B89263' }} />
          <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 14, color: '#B89263', letterSpacing: '0.16em' }}>est. 2016</div>
          <div style={{ width: 18, height: 0.5, background: '#B89263' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 15, color: '#B89263', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
          &mdash; ten years &mdash;
        </div>
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 19, fontWeight: 500, lineHeight: 1.4 }}>
          結婚10周年、<br/>記念日に。
        </div>
        <div style={{ fontSize: 11, marginTop: 8, color: '#7B6F65', lineHeight: 1.8 }}>
          これまでの十年に乾杯。<br/>そして、これからの毎日に。
        </div>
      </div>
    </div>
  </div>
)

// ---- 5) Farewell Sunset Horizon ----
const CardRetirementSunset = () => (
  <div style={{ background: 'linear-gradient(180deg, #F8DDC0 0%, #F2BC97 30%, #E8917A 55%, #C97B5C 80%, #8B5238 100%)', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#3D2418', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 110, height: 110, borderRadius: '50%',
        background: 'radial-gradient(circle, #FBE6D4 0%, #F4C496 55%, transparent 75%)',
        filter: 'blur(0.5px)' }} />
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 70, height: 70, borderRadius: '50%',
        background: 'radial-gradient(circle, #FFFAEB 0%, #F4C496 80%)' }} />
      <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, height: 0.5, background: 'rgba(61,36,24,0.3)' }} />
      <svg viewBox="0 0 220 200" preserveAspectRatio="none" style={{ position: 'absolute', top: '30%', left: 0, right: 0, width: '100%', height: '60%' }}>
        <path d="M0 80 L 30 50 L 60 70 L 90 40 L 130 65 L 170 35 L 200 60 L 220 50 L 220 200 L 0 200 Z" fill="#9C5B40" opacity="0.6" />
        <path d="M0 100 L 40 75 L 80 95 L 120 70 L 160 92 L 200 75 L 220 90 L 220 200 L 0 200 Z" fill="#7A4530" opacity="0.75" />
        <path d="M0 130 L 50 110 L 110 125 L 170 108 L 220 122 L 220 200 L 0 200 Z" fill="#5A3322" opacity="0.85" />
      </svg>
      <svg viewBox="0 0 100 30" style={{ position: 'absolute', top: '20%', left: '12%', width: 90 }}>
        <path d="M5 12 q 3 -5 6 0 q 3 -5 6 0" fill="none" stroke="#3D2418" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M28 6 q 3 -5 6 0 q 3 -5 6 0" fill="none" stroke="#3D2418" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M55 14 q 2.5 -4 5 0 q 2.5 -4 5 0" fill="none" stroke="#3D2418" strokeWidth="0.7" strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', top: 18, left: 18, fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: '#3D2418', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'rgba(255,252,245,0.5)', padding: '3px 8px', borderRadius: 2 }}>
        &#10047; farewell
      </div>
      <div style={{ position: 'relative', padding: '0 24px 28px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 36, lineHeight: 0.95, color: '#FFFAEB', letterSpacing: '-0.01em', textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
          Thank you,<br/><span style={{ color: '#FBE6D4' }}>for everything.</span>
        </div>
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 18, fontWeight: 500, marginTop: 14, lineHeight: 1.4, color: '#FFFAEB' }}>
          長い間、<br/>本当にお疲れさまでした。
        </div>
        <div style={{ marginTop: 12, fontSize: 11, lineHeight: 1.85, color: 'rgba(255,250,235,0.85)' }}>
          これからの日々が、<br/>陽だまりのようにあたたかく。
        </div>
      </div>
    </div>
  </div>
)

// ---- 6) Farewell Bouquet ----
const CardRetirementBouquet = () => (
  <div style={{ background: '#EFE8D5', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#2B2520', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'repeating-linear-gradient(45deg, #B89263 0 4px, transparent 4px 8px)', opacity: 0.4 }} />
      <svg viewBox="0 0 200 240" style={{ position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)', width: '82%', maxWidth: 200, overflow: 'visible' }}>
        <path d="M 60 200 L 100 240 L 140 200 L 130 130 L 70 130 Z" fill="#FFFCF5" stroke="#B89263" strokeWidth="0.8" />
        <path d="M 70 130 Q 100 145 130 130" fill="none" stroke="#B89263" strokeWidth="0.6" opacity="0.6" />
        <path d="M 100 130 Q 95 90 80 60" fill="none" stroke="#6E8669" strokeWidth="1.2" />
        <path d="M 100 130 Q 100 80 100 50" fill="none" stroke="#6E8669" strokeWidth="1.2" />
        <path d="M 100 130 Q 105 90 120 60" fill="none" stroke="#6E8669" strokeWidth="1.2" />
        <path d="M 100 130 Q 90 100 70 80" fill="none" stroke="#6E8669" strokeWidth="0.9" opacity="0.7" />
        <path d="M 100 130 Q 110 100 130 80" fill="none" stroke="#6E8669" strokeWidth="0.9" opacity="0.7" />
        <ellipse cx="88" cy="100" rx="7" ry="3" fill="#8FA68A" transform="rotate(-30 88 100)" />
        <ellipse cx="112" cy="100" rx="7" ry="3" fill="#8FA68A" transform="rotate(30 112 100)" />
        <ellipse cx="78" cy="92" rx="6" ry="2.5" fill="#A6B89F" transform="rotate(-50 78 92)" />
        <ellipse cx="122" cy="92" rx="6" ry="2.5" fill="#A6B89F" transform="rotate(50 122 92)" />
        {/* Flowers rendered as SVG circles since Bloom is a React component */}
        {([[80, 60, 18, '#E89A82', '#A85F44'], [82, 50, 21, '#C97B5C', '#7A3F2A'], [118, 60, 17, '#F4C496', '#A85F44'], [70, 80, 14, '#F2D5C0', '#A85F44'], [130, 80, 14, '#E0AC8B', '#7A3F2A']] as const).map(([fx, fy, fr, fc, fcc], i) => (
          <g key={i}>
            {Array.from({ length: 8 }).map((_, j) => {
              const a = (j * 45) * Math.PI / 180
              return <ellipse key={j} cx={fx + Math.cos(a) * fr * 0.5} cy={fy + Math.sin(a) * fr * 0.5} rx={fr * 0.3} ry={fr * 0.42} fill={fc} opacity="0.85" transform={`rotate(${j * 45} ${fx + Math.cos(a) * fr * 0.5} ${fy + Math.sin(a) * fr * 0.5})`} />
            })}
            <circle cx={fx} cy={fy} r={fr * 0.18} fill={fcc} />
          </g>
        ))}
        <path d="M 90 198 Q 80 210 75 222 L 78 222 Q 88 212 96 202 Z" fill="#B89263" />
        <path d="M 110 198 Q 120 210 125 222 L 122 222 Q 112 212 104 202 Z" fill="#B89263" />
        <ellipse cx="100" cy="200" rx="10" ry="4" fill="#A07852" />
      </svg>
      <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1, color: '#A85F44' }}>Bon Voyage</div>
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 18, fontWeight: 500, marginTop: 6, lineHeight: 1.35 }}>新しい門出に、<br/>花束を。</div>
        <div style={{ marginTop: 10, fontSize: 11, lineHeight: 1.85, color: '#7B6F65' }}>
          いつもありがとうございました。<br/>またどこかで、お会いしましょう。
        </div>
      </div>
    </div>
  </div>
)

// ---- 7) Thank You Letterpress ----
const CardThanksLetterpress = () => (
  <div style={{ background: '#FFFCF5', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#2B2520', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(43,37,32,0.12)', borderRadius: 2, boxShadow: 'inset 0 0 0 0.5px rgba(43,37,32,0.06)' }} />
      <div style={{ position: 'absolute', top: 18, right: 18, width: 56, height: 64, borderRadius: 4,
        border: '1.5px dashed #A85F44', display: 'grid', placeItems: 'center', transform: 'rotate(6deg)', padding: 4,
        fontFamily: 'var(--font-lp-mono)', fontSize: 7, color: '#A85F44', letterSpacing: '0.08em', textAlign: 'center',
        background: 'rgba(255,252,245,0.4)' }}>
        <div>
          <div style={{ fontSize: 18, fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', lineHeight: 1, marginBottom: 3 }}>&#9829;</div>
          MERCI<br/>1ST CLASS
        </div>
      </div>
      <svg viewBox="0 0 200 260" style={{ position: 'absolute', top: '40%', left: 28, right: 28, width: 'calc(100% - 56px)', height: 80 }}>
        <path d="M0 50 Q 50 20 100 50 T 200 50" fill="none" stroke="#C97B5C" strokeWidth="0.5" opacity="0.4" />
        <path d="M0 60 Q 50 30 100 60 T 200 60" fill="none" stroke="#C97B5C" strokeWidth="0.5" opacity="0.3" />
      </svg>
      <div style={{ position: 'absolute', top: 28, left: 28, fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: '#7B6F65', letterSpacing: '0.22em' }}>
        WITH GRATITUDE
      </div>
      <div style={{ position: 'absolute', top: 46, left: 28, fontFamily: 'var(--font-lp-mono)', fontSize: 8, color: '#A85F44', letterSpacing: '0.15em' }}>
        EST. TODAY &middot; N&deg; 07
      </div>
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', textAlign: 'center', padding: '0 28px' }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 80, lineHeight: 0.85, color: '#2B2520', letterSpacing: '-0.04em' }}>
          thank<br/><span style={{ color: '#A85F44' }}>you.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, padding: '0 28px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 0.5, background: '#2B2520', opacity: 0.5 }} />
          <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', color: '#A85F44', fontSize: 13 }}>&middot; &#10022; &middot;</div>
          <div style={{ flex: 1, height: 0.5, background: '#2B2520', opacity: 0.5 }} />
        </div>
        <div style={{ marginTop: 10, fontFamily: 'var(--font-lp-serif)', fontSize: 13, fontWeight: 500, lineHeight: 1.6 }}>
          言葉では伝えきれない感謝を、<br/>このカードに込めて。
        </div>
      </div>
    </div>
  </div>
)

// ---- 8) Thank You Sage ----
const CardThanksSage = () => (
  <div style={{ background: '#E2E6D7', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#2B3D28', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 40%, #8FA68A 0%, #6E8669 70%)', filter: 'blur(2px)' }} />
      <div style={{ position: 'absolute', top: 30, right: 30, width: 100, height: 100, borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 30%, #A6B89F 0%, transparent 70%)', opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: 90, right: 110, width: 6, height: 6, borderRadius: '50%', background: '#FFFCF5' }} />
      <div style={{ position: 'absolute', top: 30, left: -10, transform: 'rotate(-30deg)', opacity: 0.7 }}>
        <Eucalyptus color="#6E8669" />
      </div>
      <div style={{ position: 'absolute', top: 50, right: 50, fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', color: '#FFFCF5', fontSize: 28, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
        merci.
      </div>
      <div style={{ position: 'absolute', top: 84, right: 50, fontFamily: 'var(--font-lp-mono)', fontSize: 8, color: 'rgba(255,252,245,0.7)', letterSpacing: '0.2em' }}>
        N&deg; 08
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: 28, right: 28 }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 38, lineHeight: 0.95, color: '#2B3D28' }}>
          To you, with<br/>gratitude.
        </div>
        <div style={{ width: 28, height: 0.5, background: '#6E8669', margin: '14px 0' }} />
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 16, fontWeight: 500, lineHeight: 1.55, color: '#2B3D28' }}>
          いつも支えてくださる<br/>あなたへ、感謝を込めて。
        </div>
        <div style={{ marginTop: 12, fontFamily: 'var(--font-lp-hand)', color: '#6E8669', fontSize: 18, transform: 'rotate(-2deg)', display: 'inline-block' }}>
          &mdash; with love
        </div>
      </div>
    </div>
  </div>
)

// ---- 9) Mother's Day ----
const CardMothersDay = () => (
  <div style={{ background: 'linear-gradient(170deg, #FFEFEC 0%, #F8D2CD 50%, #ECA8A4 100%)', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#5A2538', position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 200px 140px at 80% 10%, rgba(255,255,255,0.5), transparent 60%)' }} />
      <svg viewBox="0 0 220 200" style={{ position: 'absolute', top: -10, left: -10, right: -10, width: 'calc(100% + 20px)', height: 200 }}>
        <path d="M50 200 Q 55 130 65 60" fill="none" stroke="#8FA68A" strokeWidth="1" />
        <path d="M120 200 Q 115 120 105 50" fill="none" stroke="#8FA68A" strokeWidth="1" />
        <path d="M180 200 Q 178 130 170 70" fill="none" stroke="#8FA68A" strokeWidth="1" />
        <ellipse cx="58" cy="120" rx="9" ry="3.5" fill="#8FA68A" transform="rotate(-40 58 120)" opacity="0.85" />
        <ellipse cx="113" cy="110" rx="10" ry="4" fill="#6E8669" transform="rotate(35 113 110)" opacity="0.85" />
        <ellipse cx="177" cy="125" rx="8" ry="3" fill="#8FA68A" transform="rotate(-25 177 125)" opacity="0.85" />
        <g transform="translate(105, 50)">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30) * Math.PI / 180
            return <ellipse key={i} cx={Math.cos(a) * 16} cy={Math.sin(a) * 16} rx="11" ry="6" fill="#E27A8A" opacity="0.75" transform={`rotate(${i * 30} ${Math.cos(a) * 16} ${Math.sin(a) * 16})`} />
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 + 22) * Math.PI / 180
            return <ellipse key={`m${i}`} cx={Math.cos(a) * 9} cy={Math.sin(a) * 9} rx="7" ry="4" fill="#C75566" opacity="0.85" transform={`rotate(${i * 45} ${Math.cos(a) * 9} ${Math.sin(a) * 9})`} />
          })}
          <circle cx="0" cy="0" r="4" fill="#9A2D40" />
        </g>
        <g transform="translate(65, 65) scale(0.75)">
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i * 36) * Math.PI / 180
            return <ellipse key={i} cx={Math.cos(a) * 14} cy={Math.sin(a) * 14} rx="10" ry="5" fill="#F4A8A8" opacity="0.8" transform={`rotate(${i * 36} ${Math.cos(a) * 14} ${Math.sin(a) * 14})`} />
          })}
          <circle cx="0" cy="0" r="4" fill="#C75566" />
        </g>
        <g transform="translate(170, 70) scale(0.65)">
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i * 36) * Math.PI / 180
            return <ellipse key={i} cx={Math.cos(a) * 14} cy={Math.sin(a) * 14} rx="10" ry="5" fill="#E89AAB" opacity="0.8" transform={`rotate(${i * 36} ${Math.cos(a) * 14} ${Math.sin(a) * 14})`} />
          })}
          <circle cx="0" cy="0" r="4" fill="#9A3F55" />
        </g>
        {([[35, 90, '#F4A8A8'], [200, 95, '#E89AAB'], [85, 110, '#F4C0BB']] as const).map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <circle r="4" fill={c} />
            <circle r="1.5" fill="#9A3F55" />
          </g>
        ))}
      </svg>
      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
        <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: '#9A3F55', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
          &#9829; for mom &middot; 母の日
        </div>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 38, lineHeight: 0.95, color: '#9A3F55', letterSpacing: '-0.02em' }}>
          Dearest<br/>Mother,
        </div>
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 17, fontWeight: 500, marginTop: 12, lineHeight: 1.5, color: '#5A2538' }}>
          いつも、ありがとう。<br/>あなたが、私の宝物です。
        </div>
        <div style={{ marginTop: 12, fontFamily: 'var(--font-lp-hand)', color: '#9A3F55', fontSize: 18, transform: 'rotate(-2deg)', display: 'inline-block' }}>
          &#9825; from Yui
        </div>
      </div>
    </div>
  </div>
)

// ---- 10) Father's Day ----
const CardFathersDay = () => (
  <div style={{ background: 'linear-gradient(165deg, #1A2738 0%, #1F2D3D 50%, #2C3E50 100%)', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <div style={{ padding: 0, color: '#F4ECDC', position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 220 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[60, 80, 100, 120, 140].map((r, i) => (
          <ellipse key={i} cx="160" cy="80" rx={r} ry={r * 0.7} fill="none" stroke="#B89263" strokeWidth="0.3" opacity="0.25" />
        ))}
        <path d="M 30 250 Q 80 200 110 220 T 180 180" fill="none" stroke="#E0B377" strokeWidth="0.6" strokeDasharray="1 4" opacity="0.7" />
        <circle cx="30" cy="250" r="2" fill="#E0B377" />
        <circle cx="110" cy="220" r="2" fill="#E0B377" />
        <path d="M180 180 L 175 186 L 178 186 L 178 192 L 182 192 L 182 186 L 185 186 Z" fill="#C97B5C" />
      </svg>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: 26, right: 24, width: 78 }}>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#B89263" strokeWidth="1" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#E0B377" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#B89263" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#B89263" strokeWidth="0.5" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = i * 15 * Math.PI / 180
          const r1 = i % 6 === 0 ? 38 : 41
          const r2 = 44
          return <line key={i}
            x1={50 + Math.cos(angle) * r1} y1={50 + Math.sin(angle) * r1}
            x2={50 + Math.cos(angle) * r2} y2={50 + Math.sin(angle) * r2}
            stroke="#B89263" strokeWidth={i % 6 === 0 ? 1 : 0.5} />
        })}
        {(['N', 'E', 'S', 'W'] as const).map((t, i) => {
          const positions = [[50, 14], [84, 52], [50, 90], [16, 52]] as const
          const [x, y] = positions[i]
          return <text key={i} x={x} y={y} fontFamily="serif" fontSize="8" fill="#E0B377" textAnchor="middle" dominantBaseline="middle" fontStyle="italic">{t}</text>
        })}
        <polygon points="50,18 53,50 50,52 47,50" fill="#C97B5C" />
        <polygon points="50,82 53,50 50,48 47,50" fill="#F4ECDC" opacity="0.7" />
        <circle cx="50" cy="50" r="3" fill="#E0B377" />
        <circle cx="50" cy="50" r="1.2" fill="#1F2D3D" />
      </svg>
      <div style={{ position: 'absolute', top: 132, left: 26, right: 26, height: 0.5, background: '#B89263', opacity: 0.5 }} />
      <svg viewBox="0 0 60 30" style={{ position: 'absolute', top: 142, left: 26, width: 60, opacity: 0.65 }}>
        <path d="M2 20 Q 10 8 22 14 Q 32 18 40 8 Q 48 4 58 14" fill="none" stroke="#B89263" strokeWidth="0.6" />
        <path d="M2 26 Q 14 18 28 22 Q 40 26 58 18" fill="none" stroke="#B89263" strokeWidth="0.4" opacity="0.7" />
      </svg>
      <div style={{ position: 'absolute', top: 28, left: 24 }}>
        <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: 9, color: '#E0B377', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
          &middot; For Father &middot;
        </div>
        <div style={{ fontFamily: 'var(--font-lp-mono)', fontSize: 8, color: 'rgba(244,236,220,0.55)', letterSpacing: '0.18em', marginTop: 4 }}>
          06.21.2026 &middot; N&deg; 10
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
        <div style={{ fontFamily: 'var(--font-lp-display)', fontStyle: 'italic', fontSize: 36, lineHeight: 0.95, color: '#F4ECDC', letterSpacing: '-0.02em' }}>
          To my <span style={{ color: '#E0B377' }}>compass</span>,<br/>my guide.
        </div>
        <div style={{ width: 24, height: 0.5, background: '#E0B377', margin: '14px 0' }} />
        <div style={{ fontFamily: 'var(--font-lp-serif)', fontSize: 17, fontWeight: 500, lineHeight: 1.55, color: '#F4ECDC' }}>
          お父さんの背中が、<br/>いつも私の道しるべでした。
        </div>
        <div style={{ marginTop: 10, fontSize: 11, lineHeight: 1.85, color: 'rgba(244,236,220,0.65)' }}>
          ありがとう、そして、<br/>これからもよろしく。
        </div>
      </div>
    </div>
  </div>
)

// ---- Registry ----

type SceneId = 'all' | 'birthday' | 'wedding' | 'farewell' | 'thanks' | 'parents'

export interface CardTemplate {
  id: string
  scene: Exclude<SceneId, 'all'>
  title: string
  Comp: React.ComponentType
}

export const CARD_TEMPLATES: CardTemplate[] = [
  { id: 'bday-1',  scene: 'birthday', title: 'Pastel Bloom',      Comp: CardBirthdayPastel },
  { id: 'bday-2',  scene: 'birthday', title: 'Confetti Night',    Comp: CardBirthdayConfetti },
  { id: 'wed-1',   scene: 'wedding',  title: 'Botanical Arch',    Comp: CardWeddingBotanical },
  { id: 'wed-2',   scene: 'wedding',  title: 'Gold Monogram',     Comp: CardWeddingGold },
  { id: 'ret-1',   scene: 'farewell', title: 'Sunset Horizon',    Comp: CardRetirementSunset },
  { id: 'ret-2',   scene: 'farewell', title: 'Spring Bouquet',    Comp: CardRetirementBouquet },
  { id: 'thx-1',   scene: 'thanks',   title: 'Letterpress',       Comp: CardThanksLetterpress },
  { id: 'thx-2',   scene: 'thanks',   title: 'Sage Painterly',    Comp: CardThanksSage },
  { id: 'mom-1',   scene: 'parents',  title: 'Carnation',         Comp: CardMothersDay },
  { id: 'dad-1',   scene: 'parents',  title: 'Compass & Map',     Comp: CardFathersDay },
]

export interface CardScene {
  id: SceneId
  label: string
  glyph: string
}

export const CARD_SCENES: CardScene[] = [
  { id: 'all',      label: 'すべて',         glyph: '✦' },
  { id: 'birthday', label: '誕生日',         glyph: '🎂' },
  { id: 'wedding',  label: '結婚・記念日',    glyph: '💍' },
  { id: 'farewell', label: '退職・送別',      glyph: '🌅' },
  { id: 'thanks',   label: 'お礼・感謝',      glyph: '✉︎' },
  { id: 'parents',  label: '母の日・父の日',   glyph: '❀' },
]
