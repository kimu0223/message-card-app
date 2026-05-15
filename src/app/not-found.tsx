import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4ECDC] p-8 text-center">
      <p className="text-6xl font-bold text-[#C97B5C]">404</p>
      <h1 className="text-2xl font-bold text-[#2B2520]">ページが見つかりません</h1>
      <p className="text-sm text-[#7B6F65]">
        URLを確認するか、ホームに戻ってください。
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-[#C97B5C] px-6 py-2 text-sm font-medium text-white hover:bg-[#A85F44] transition-colors"
      >
        ホームへ戻る
      </Link>
    </div>
  )
}
