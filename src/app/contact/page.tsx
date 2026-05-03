'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'

const categories = [
  '一般的なお問い合わせ',
  '不具合の報告',
  '料金・プランについて',
  '機能のリクエスト',
  'その他',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // No actual API call yet — just show success
    setSubmitted(true)
  }

  const inputStyles: React.CSSProperties = {
    borderColor: 'var(--lp-paper-line)',
    color: 'var(--lp-ink)',
    background: 'white',
  }

  const inputClasses =
    'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--lp-terracotta)] focus:ring-1 focus:ring-[var(--lp-terracotta)]'

  return (
    <div
      className="lp-page flex min-h-screen flex-col"
      style={{ fontFamily: 'var(--font-lp-sans)' }}
    >
      <LPHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[800px] px-6 py-16 md:px-8 md:py-20">
          {/* Page Title */}
          <div className="mb-10 text-center">
            <h1
              className="mb-3 text-3xl font-bold md:text-4xl"
              style={{
                fontFamily: 'var(--font-lp-serif)',
                color: 'var(--lp-ink)',
              }}
            >
              お問い合わせ
              <span style={{ color: 'var(--lp-terracotta)' }}>.</span>
            </h1>
            <p
              className="text-sm leading-relaxed md:text-base"
              style={{ color: 'var(--lp-ink-soft)' }}
            >
              ご質問・ご要望がございましたら、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px]">
            {/* Form */}
            <div>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center rounded-2xl px-6 py-14 text-center"
                  style={{
                    background: 'rgba(107,140,107,0.08)',
                    border: '1px solid rgba(107,140,107,0.2)',
                  }}
                >
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: 'rgba(107,140,107,0.15)' }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--lp-sage)' }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2
                    className="mb-2 text-lg font-bold"
                    style={{
                      fontFamily: 'var(--font-lp-serif)',
                      color: 'var(--lp-ink)',
                    }}
                  >
                    送信が完了しました
                  </h2>
                  <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: 'var(--lp-ink-soft)' }}
                  >
                    お問い合わせありがとうございます。
                    <br />
                    2営業日以内にご返信いたします。
                  </p>
                  <Link
                    href="/help"
                    className="text-sm font-medium transition-colors hover:underline"
                    style={{ color: 'var(--lp-terracotta)' }}
                  >
                    ヘルプセンターに戻る
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      お名前 <span style={{ color: 'var(--lp-terracotta)' }}>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="山田 太郎"
                      className={inputClasses}
                      style={inputStyles}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      メールアドレス <span style={{ color: 'var(--lp-terracotta)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClasses}
                      style={inputStyles}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      カテゴリ <span style={{ color: 'var(--lp-terracotta)' }}>*</span>
                    </label>
                    <select
                      id="category"
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className={inputClasses}
                      style={inputStyles}
                    >
                      <option value="" disabled>
                        選択してください
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      お問い合わせ内容 <span style={{ color: 'var(--lp-terracotta)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="お問い合わせ内容をご記入ください..."
                      className={`${inputClasses} resize-y`}
                      style={inputStyles}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-xl px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                    style={{
                      background: 'var(--lp-terracotta)',
                      boxShadow: '0 4px 14px rgba(201,123,92,0.3)',
                    }}
                  >
                    送信する
                  </button>
                </form>
              )}
            </div>

            {/* Side Info Panel */}
            <aside
              className="h-fit rounded-2xl border px-6 py-7"
              style={{
                borderColor: 'var(--lp-paper-line)',
                background: 'var(--lp-cream-soft)',
              }}
            >
              <h3
                className="mb-5 text-sm font-bold"
                style={{
                  fontFamily: 'var(--font-lp-serif)',
                  color: 'var(--lp-ink)',
                }}
              >
                お問い合わせ情報
              </h3>

              <div className="space-y-5">
                {/* Business Hours */}
                <div className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--lp-terracotta)' }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: 'var(--lp-ink-mute)' }}
                    >
                      営業時間
                    </p>
                    <p
                      className="mt-0.5 text-sm"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      平日 10:00 - 18:00
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--lp-terracotta)' }}
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: 'var(--lp-ink-mute)' }}
                    >
                      メール
                    </p>
                    <p
                      className="mt-0.5 text-sm"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      support@cardmagic.jp
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--lp-terracotta)' }}
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: 'var(--lp-ink-mute)' }}
                    >
                      返信目安
                    </p>
                    <p
                      className="mt-0.5 text-sm"
                      style={{ color: 'var(--lp-ink)' }}
                    >
                      2営業日以内
                    </p>
                  </div>
                </div>
              </div>

              <hr
                className="my-5"
                style={{ borderColor: 'var(--lp-paper-line)' }}
              />

              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--lp-ink-mute)' }}
              >
                よくある質問は
                <Link
                  href="/help"
                  className="ml-1 font-medium transition-colors hover:underline"
                  style={{ color: 'var(--lp-terracotta)' }}
                >
                  ヘルプセンター
                </Link>
                もご覧ください。
              </p>
            </aside>
          </div>
        </div>
      </main>

      <LPFooter />
    </div>
  )
}
