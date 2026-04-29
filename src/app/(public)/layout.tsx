export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--lp-cream)',
        color: 'var(--lp-ink)',
        fontFamily: 'var(--font-lp-sans)',
      }}
    >
      {children}
    </div>
  )
}
