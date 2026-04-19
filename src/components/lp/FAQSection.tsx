'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: '登録なしで使えますか？',
    a: 'はい。「無料で試す」から登録不要でゲストとしてカードを作成できます。保存・シェアをする際にGoogleアカウントでのログインが必要になります。',
  },
  {
    q: '作ったカードはどのように送りますか？',
    a: '完成したカードを公開すると専用URLが発行されます。そのURLをコピーしてLINEやTwitter、メールなどで送るだけです。受け取り側はアプリのインストールや登録は不要です。',
  },
  {
    q: 'AIメッセージ生成はどのように動作しますか？',
    a: 'シーン（誕生日・お礼など）・関係性・トーンなどを選択すると、AIが最適なメッセージを3候補提案します。気に入ったものをワンタップでカードに適用できます。',
  },
  {
    q: '無料プランで作れるカードは何枚ですか？',
    a: '無料プランでは月3枚まで保存できます。ゲスト体験（未登録）では枚数制限なく試すことができます。Proプランでは無制限に作成できます。',
  },
  {
    q: 'カードのデザインはどの程度カスタマイズできますか？',
    a: 'テキストの内容・フォント・サイズ・色・配置、背景色・グラデーション、アニメーションの種類を変更できます。Proプランではさらに多くのテンプレートとプレミアムアニメーションが使用できます。',
  },
  {
    q: '支払い方法は何が使えますか？',
    a: 'クレジットカード（Visa / Mastercard / JCB / American Express）がご利用いただけます。支払いはStripeで安全に処理されます。',
  },
  {
    q: 'いつでもキャンセルできますか？',
    a: 'はい。Proプランはいつでもキャンセル可能です。キャンセル後は次の更新日まで引き続きProの機能をご利用いただけます。',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="scroll-mt-20 bg-zinc-50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">FAQ</p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">よくある質問</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-zinc-800"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.q}</span>
                <ChevronDown className={cn(
                  'h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200',
                  openIndex === i && 'rotate-180'
                )} />
              </button>
              {openIndex === i && (
                <div className="border-t border-zinc-100 px-6 py-4 text-sm leading-relaxed text-zinc-500">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
