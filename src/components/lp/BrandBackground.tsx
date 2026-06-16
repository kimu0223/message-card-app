/**
 * Fixed washi ink-wash ambience for the LP light region. The base gradient
 * lives on `.lp-page`; this adds two softly-parallaxing colour blobs (navy +
 * vermilion) so the lower world has depth and never reads as flat/blank.
 * Sits at z-index 0, behind all content and the dark hero panel.
 */
export default function BrandBackground() {
  return (
    <div className="lp-brand-bg" aria-hidden="true">
      <div
        className="blob"
        style={{
          top: '18%',
          left: '10%',
          width: '52vw',
          height: '52vw',
          background: 'radial-gradient(circle, rgba(26,39,68,0.12), transparent 62%)',
          transform: 'translateY(calc(var(--sy) * 0.035px))',
        }}
      />
      <div
        className="blob"
        style={{
          top: '56%',
          right: '6%',
          width: '42vw',
          height: '42vw',
          background: 'radial-gradient(circle, rgba(176,58,46,0.10), transparent 62%)',
          transform: 'translateY(calc(var(--sy) * -0.05px))',
        }}
      />
    </div>
  )
}
