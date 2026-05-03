import type { Metadata } from 'next'
import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | CardMagic',
  description:
    'CardMagicのプライバシーポリシーです。お客様の個人情報の取り扱いについてご説明します。',
}

export default function PrivacyPage() {
  return (
    <div
      className="lp-page flex min-h-screen flex-col"
      style={{ fontFamily: 'var(--font-lp-sans)' }}
    >
      <LPHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[800px] px-6 py-16 md:px-8 md:py-20">
          {/* Page Title */}
          <h1
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{
              fontFamily: 'var(--font-lp-serif)',
              color: 'var(--lp-terracotta)',
            }}
          >
            プライバシーポリシー
          </h1>
          <p
            className="mb-12"
            style={{ fontSize: 14, color: 'var(--lp-ink-mute)' }}
          >
            制定日: 2026年5月1日
          </p>

          <div
            className="space-y-10"
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: 'var(--lp-ink-soft)',
            }}
          >
            {/* 前文 */}
            <section>
              <p>
                CardMagic（以下「当サービス」）は、お客様の個人情報の保護を重要な責務と考えております。本プライバシーポリシーは、当サービスがどのような情報を収集し、どのように利用・保護するかについて説明するものです。当サービスをご利用いただくことで、本ポリシーに同意いただいたものとみなします。
              </p>
            </section>

            {/* 1. 収集する情報 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                1. 収集する情報
              </h2>
              <p className="mb-3">
                当サービスでは、以下の情報を収集することがあります。
              </p>
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--lp-ink)' }}>
                (1) お客様から直接ご提供いただく情報
              </h3>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>メールアドレス</li>
                <li>お名前（表示名）</li>
                <li>カードに入力されたメッセージ内容</li>
                <li>アップロードされた画像データ</li>
                <li>お問い合わせ内容</li>
              </ul>
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--lp-ink)' }}>
                (2) 自動的に収集される情報
              </h3>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>IPアドレス</li>
                <li>ブラウザの種類・バージョン</li>
                <li>デバイス情報</li>
                <li>アクセス日時・閲覧ページ</li>
                <li>リファラー（参照元URL）</li>
                <li>サービスの利用状況（カード作成数、閲覧数等）</li>
              </ul>
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--lp-ink)' }}>
                (3) 決済に関する情報
              </h3>
              <p>
                有料プランのご利用時に、決済処理に必要な情報（クレジットカード情報等）はStripe,
                Inc.が直接収集・管理します。当サービスはカード番号等の決済情報を直接保持しません。
              </p>
            </section>

            {/* 2. 利用目的 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                2. 利用目的
              </h2>
              <p className="mb-3">
                収集した情報は、以下の目的で利用します。
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>サービスの提供・運営・改善</li>
                <li>アカウントの作成・認証・管理</li>
                <li>カードの作成・保存・共有機能の提供</li>
                <li>AI機能によるメッセージ提案の生成</li>
                <li>有料プランの決済処理</li>
                <li>お問い合わせへの対応</li>
                <li>サービスに関するお知らせの送信</li>
                <li>不正利用の防止・セキュリティの確保</li>
                <li>利用状況の分析・統計データの作成（個人を特定しない形で）</li>
              </ul>
            </section>

            {/* 3. 第三者提供 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                3. 第三者への情報提供
              </h2>
              <p className="mb-3">
                当サービスは、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。
              </p>
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--lp-ink)' }}>
                (1) サービス運営に必要な外部サービス
              </h3>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  <strong>Stripe, Inc.</strong>
                  （決済処理）— 有料プランの課金処理のため、決済に必要な情報を提供します。
                </li>
                <li>
                  <strong>Google LLC（Gemini AI）</strong>
                  （AI機能）— メッセージ提案を生成するため、入力されたキーワードやコンテキスト情報を送信します。カードの具体的な宛名等は送信しません。
                </li>
                <li>
                  <strong>Supabase Inc.</strong>
                  （データストレージ・認証）— アカウント情報およびカードデータの保管のため利用します。
                </li>
                <li>
                  <strong>Vercel Inc.</strong>
                  （ホスティング）— サービスの配信・運営のため利用します。
                </li>
              </ul>
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--lp-ink)' }}>
                (2) その他の場合
              </h3>
              <ul className="list-disc space-y-1 pl-6">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく開示要求がある場合</li>
                <li>人の生命・身体・財産の保護に必要な場合</li>
              </ul>
            </section>

            {/* 4. Cookieの利用 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                4. Cookie（クッキー）の利用
              </h2>
              <p className="mb-3">
                当サービスでは、以下の目的でCookieを使用しています。
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>ログイン状態の維持（認証セッション）</li>
                <li>お客様の設定・利用状態の保持</li>
                <li>サービスの利用状況の分析</li>
              </ul>
              <p>
                ブラウザの設定によりCookieの受け入れを拒否することができますが、その場合サービスの一部機能が利用できなくなる場合があります。
              </p>
            </section>

            {/* 5. データの保管・安全管理 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                5. データの保管・安全管理
              </h2>
              <p className="mb-3">
                当サービスは、お客様の個人情報を適切に保護するため、以下の措置を講じています。
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>通信の暗号化（SSL/TLS）</li>
                <li>データベースへのアクセス制限</li>
                <li>パスワードのハッシュ化保存</li>
                <li>定期的なセキュリティ監査</li>
                <li>従業員に対する情報管理教育</li>
              </ul>
              <p className="mt-3">
                ただし、インターネット上の通信において完全なセキュリティを保証することは技術的に困難であり、万が一の情報漏洩について当サービスが責任を負う範囲は、当サービスの故意または重大な過失がある場合に限ります。
              </p>
            </section>

            {/* 6. ユーザーの権利 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                6. お客様の権利
              </h2>
              <p className="mb-3">
                お客様は、ご自身の個人情報について以下の権利を有します。
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>開示請求</strong> —
                  当サービスが保有するお客様の個人情報の開示を請求できます。
                </li>
                <li>
                  <strong>訂正請求</strong> —
                  個人情報の内容に誤りがある場合、訂正を請求できます。
                </li>
                <li>
                  <strong>削除請求</strong> —
                  アカウントの削除およびこれに伴う個人情報の削除を請求できます。
                </li>
                <li>
                  <strong>利用停止請求</strong> —
                  個人情報の利用停止を請求できます。
                </li>
              </ul>
              <p className="mt-3">
                上記の権利を行使される場合は、本ポリシー末尾に記載のお問い合わせ先までご連絡ください。ご本人確認のうえ、合理的な期間内に対応いたします。
              </p>
            </section>

            {/* 7. 未成年者のプライバシー */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                7. 未成年者のプライバシー
              </h2>
              <p>
                当サービスは、16歳未満のお子様から意図的に個人情報を収集することはありません。16歳未満の方がサービスをご利用になる場合は、保護者の同意を得たうえでご利用ください。万が一、16歳未満のお子様から保護者の同意なく個人情報が提供されていることが判明した場合、速やかに当該情報を削除いたします。
              </p>
            </section>

            {/* 8. ポリシーの変更 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                8. プライバシーポリシーの変更
              </h2>
              <p>
                当サービスは、法令の改正やサービス内容の変更等に伴い、本ポリシーを変更することがあります。重要な変更がある場合は、サービス内の通知またはメールにてお知らせいたします。変更後のポリシーは、当ページに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            {/* 9. お問い合わせ */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                9. お問い合わせ
              </h2>
              <p>
                本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
              </p>
              <div
                className="mt-4 rounded-lg border p-5"
                style={{
                  borderColor: 'var(--lp-paper-line)',
                  background: 'rgba(244, 236, 220, 0.4)',
                }}
              >
                <p className="font-semibold" style={{ color: 'var(--lp-ink)' }}>
                  CardMagic 運営事務局
                </p>
                <p className="mt-1">
                  メール:{' '}
                  <a
                    href="mailto:privacy@cardmagic.app"
                    className="underline transition-colors hover:text-[var(--lp-terracotta)]"
                  >
                    privacy@cardmagic.app
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <LPFooter />
    </div>
  )
}
