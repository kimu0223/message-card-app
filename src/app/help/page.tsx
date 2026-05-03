import { Metadata } from 'next'
import Link from 'next/link'
import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'

export const metadata: Metadata = {
  title: 'ヘルプセンター | CardMagic',
  description:
    'CardMagicの使い方、よくある質問、トラブルシューティングなど。カードの作成・共有・料金についてお答えします。',
}

const faqData = [
  {
    category: 'はじめに',
    categoryEn: 'Getting Started',
    items: [
      {
        question: 'カードの作り方を教えてください',
        answer:
          'ログイン後、「カードを作る」ボタンをクリックします。テンプレートを選択し、メッセージや写真を追加してカスタマイズできます。完成したら「保存」を押すだけで、共有用のURLが自動生成されます。',
      },
      {
        question: 'テンプレートの選び方がわかりません',
        answer:
          'テンプレート一覧では、誕生日・お祝い・感謝・季節のイベントなどカテゴリ別に表示されます。プレビューをクリックするとアニメーション付きで確認できます。無料プランでは基本テンプレート、プレミアムプランでは全テンプレートをご利用いただけます。',
      },
      {
        question: 'AIメッセージ生成の使い方',
        answer:
          'エディタ画面で「AIで文章を作成」ボタンをクリックし、相手との関係性やシーン（誕生日、感謝など）を選択します。AIが最適なメッセージ候補を複数提案しますので、お好みのものを選んで編集してください。プレミアムプランでご利用いただけます。',
      },
    ],
  },
  {
    category: '共有・送信',
    categoryEn: 'Sharing',
    items: [
      {
        question: 'カードのURLはどうやって共有しますか？',
        answer:
          'カード保存後に表示される共有URLをコピーして、LINE・メール・SNSなどお好きな方法で相手に送ってください。URLを開くだけでアニメーション付きカードが表示されます。受け取る側のアカウント登録は不要です。',
      },
      {
        question: 'カードの閲覧期限はありますか？',
        answer:
          '無料プランで作成したカードは公開後30日間閲覧可能です。プレミアムプランでは無期限でカードを保存・閲覧できます。期限が近づくとメールでお知らせします。',
      },
      {
        question: 'SNSでシェアできますか？',
        answer:
          'はい、共有画面からLINE・X（Twitter）・Facebook・Instagramへ直接シェアできます。OGP画像が自動生成されるため、SNS上でもカードのプレビューが美しく表示されます。',
      },
    ],
  },
  {
    category: 'アカウント・料金',
    categoryEn: 'Account & Billing',
    items: [
      {
        question: '無料プランとプレミアムプランの違いは？',
        answer:
          '無料プランは月3枚まで基本テンプレートでカード作成が可能です。プレミアムプラン（月額980円）では、カード作成無制限・全テンプレート利用・AI文章生成・カード無期限保存など全機能をご利用いただけます。',
      },
      {
        question: '解約はどうすればいいですか？',
        answer:
          'ダッシュボードの「設定」→「プラン管理」から、いつでもワンクリックで解約できます。解約後も現在の請求期間終了まではプレミアム機能をご利用いただけます。解約後のデータ削除はありません。',
      },
      {
        question: '支払い方法は何がありますか？',
        answer:
          'クレジットカード（Visa / Mastercard / JCB / American Express）に対応しています。決済はStripeにより安全に処理されます。カード情報は当社サーバーに保存されません。',
      },
    ],
  },
  {
    category: 'トラブルシューティング',
    categoryEn: 'Troubleshooting',
    items: [
      {
        question: 'カードが表示されません',
        answer:
          'ブラウザのキャッシュをクリアするか、別のブラウザでお試しください。また、JavaScriptが有効になっていることをご確認ください。それでも解決しない場合は、お使いのブラウザ名とバージョンを添えてお問い合わせください。',
      },
      {
        question: 'ログインできません',
        answer:
          'Googleアカウントでのログインに問題がある場合は、ブラウザのCookieとポップアップが許可されていることをご確認ください。シークレットモードでの利用や、ブラウザの拡張機能を一時的に無効にすることもお試しください。',
      },
      {
        question: '編集内容が保存されません',
        answer:
          'インターネット接続が安定していることをご確認ください。一時的なネットワークエラーの場合、数秒後に自動リトライされます。問題が続く場合は、ブラウザを更新してから再度お試しください。編集内容は一時的にローカルに保存されるため、通常はデータが失われることはありません。',
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div
      className="lp-page flex min-h-screen flex-col"
      style={{ fontFamily: 'var(--font-lp-sans)' }}
    >
      <LPHeader />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="px-6 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-20"
          style={{ background: 'var(--lp-cream-soft)' }}
        >
          <h1
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              color: 'var(--lp-ink)',
            }}
          >
            ヘルプ
            <span style={{ color: 'var(--lp-terracotta)' }}>センター</span>
          </h1>
          <p
            className="mx-auto mb-8 max-w-md text-sm leading-relaxed md:text-base"
            style={{ color: 'var(--lp-ink-soft)' }}
          >
            CardMagicの使い方やよくある質問をまとめました。
            <br />
            お探しの情報を見つけてください。
          </p>

          {/* Search (visual only) */}
          <div className="mx-auto max-w-[480px]">
            <div
              className="flex items-center gap-3 rounded-xl border px-5 py-3"
              style={{
                borderColor: 'var(--lp-paper-line)',
                background: 'white',
                boxShadow: '0 2px 12px rgba(43,37,32,0.06)',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--lp-ink-mute)', flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="キーワードで検索..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--lp-ink-mute)]"
                style={{ color: 'var(--lp-ink)' }}
                readOnly
              />
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <div className="mx-auto max-w-[960px] px-6 py-12 md:px-8 md:py-16">
          {faqData.map((section) => (
            <section key={section.category} className="lp-reveal mb-12 last:mb-0">
              <div className="mb-6 flex items-baseline gap-3">
                <h2
                  className="text-xl font-bold md:text-2xl"
                  style={{
                    fontFamily: 'var(--font-lp-serif)',
                    color: 'var(--lp-ink)',
                  }}
                >
                  {section.category}
                </h2>
                <span
                  className="text-xs"
                  style={{ color: 'var(--lp-ink-mute)' }}
                >
                  {section.categoryEn}
                </span>
              </div>

              <div
                className="divide-y rounded-2xl border"
                style={{
                  borderColor: 'var(--lp-paper-line)',
                  background: 'white',
                  boxShadow: '0 2px 12px rgba(43,37,32,0.04)',
                }}
              >
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group"
                    style={{ borderColor: 'var(--lp-paper-line)' }}
                  >
                    <summary
                      className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-medium transition-colors hover:text-[var(--lp-terracotta)] md:text-base"
                      style={{ color: 'var(--lp-ink)', listStyle: 'none' }}
                    >
                      <span>{item.question}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 transition-transform group-open:rotate-180"
                        style={{ color: 'var(--lp-ink-mute)' }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--lp-ink-soft)' }}
                    >
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          {/* CTA: Contact */}
          <section
            className="mt-16 rounded-2xl px-8 py-10 text-center"
            style={{
              background: 'var(--lp-cream-soft)',
              border: '1px solid var(--lp-paper-line)',
            }}
          >
            <h3
              className="mb-3 text-lg font-bold md:text-xl"
              style={{
                fontFamily: 'var(--font-lp-serif)',
                color: 'var(--lp-ink)',
              }}
            >
              お探しの答えが見つからない場合
            </h3>
            <p
              className="mb-6 text-sm"
              style={{ color: 'var(--lp-ink-soft)' }}
            >
              お気軽にお問い合わせください。2営業日以内にご返信いたします。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{
                background: 'var(--lp-terracotta)',
                color: 'white',
                boxShadow: '0 4px 14px rgba(201,123,92,0.3)',
              }}
            >
              お問い合わせ
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </section>
        </div>
      </main>

      <LPFooter />
    </div>
  )
}
