import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F0E6] p-8 text-center">
      <p className="text-6xl font-bold text-[#B03A2E]" style={{ fontFamily: 'var(--font-lp-serif)' }}>404</p>
      <h1 className="text-2xl font-bold text-[#1A2744]" style={{ fontFamily: 'var(--font-lp-serif)' }}>ページが見つかりません</h1>
      <p className="text-sm" style={{ color: 'rgba(26,39,68,0.62)' }}>
        URLを確認するか、ホームに戻ってください。
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[#1A2744] px-6 py-2 text-sm font-medium text-[#FAF7EF] transition-colors hover:bg-[#26345A]"
      >
        ホームへ戻る
      </Link>
    </div>
  )
}
