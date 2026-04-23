interface FAQItem {
  q: string
  a: string
}

interface KeywordFAQSectionProps {
  items: readonly FAQItem[]
}

export default function KeywordFAQSection({ items }: KeywordFAQSectionProps) {
  return (
    <section id="faq" className="scroll-mt-20 bg-zinc-50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">FAQ</p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">よくある質問</h2>
        </div>

        <dl className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <dt className="flex items-start gap-3 text-base font-bold text-zinc-900">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-600">
                  Q
                </span>
                {item.q}
              </dt>
              <dd className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-extrabold text-zinc-500">
                  A
                </span>
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
