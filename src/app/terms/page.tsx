import type { Metadata } from 'next'
import LPHeader from '@/components/lp/LPHeader'
import LPFooter from '@/components/lp/LPFooter'

export const metadata: Metadata = {
  title: '利用規約 | CardMagic',
  description:
    'CardMagicの利用規約です。サービスのご利用条件について説明します。',
}

export default function TermsPage() {
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
            利用規約
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
                本利用規約（以下「本規約」）は、CardMagic（以下「当サービス」）の利用に関する条件を定めるものです。ユーザーの皆様（以下「ユーザー」）は、本規約に同意のうえ当サービスをご利用ください。
              </p>
            </section>

            {/* 1. サービスの概要 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第1条（サービスの概要）
              </h2>
              <p className="mb-3">
                当サービスは、アニメーション付きメッセージカードをオンラインで作成・共有できるWebアプリケーションです。主な機能は以下の通りです。
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>テンプレートを利用したメッセージカードの作成</li>
                <li>AIによるメッセージ文章の提案</li>
                <li>カードのアニメーション・デザイン編集</li>
                <li>URL共有によるカードの送付</li>
                <li>作成したカードの保存・管理</li>
              </ul>
            </section>

            {/* 2. アカウント */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第2条（アカウント）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  ユーザーは、当サービスの一部機能を利用するためにアカウントを作成する必要があります。
                </li>
                <li>
                  アカウント登録時に提供する情報は正確かつ最新のものでなければなりません。
                </li>
                <li>
                  ユーザーは、自己のアカウント情報（認証情報を含む）を適切に管理する責任を負い、第三者に利用させてはなりません。
                </li>
                <li>
                  アカウントの不正利用が判明した場合、ユーザーは直ちに当サービスに通知するものとします。
                </li>
                <li>
                  当サービスは、本規約に違反するアカウントを事前の通知なく停止または削除できるものとします。
                </li>
              </ol>
            </section>

            {/* 3. 利用料金・プラン */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第3条（利用料金・プラン）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  当サービスには無料プランと有料プランがあります。各プランの内容・料金は、サービス内の料金ページに記載のとおりとします。
                </li>
                <li>
                  有料プランの決済は、Stripe, Inc.の決済システムを通じて処理されます。
                </li>
                <li>
                  有料プランは月額課金制とし、契約期間中の途中解約による日割り返金は行いません。
                </li>
                <li>
                  当サービスは、事前に通知のうえ料金を改定することがあります。改定後の料金は次回更新日から適用されます。
                </li>
                <li>
                  支払いが確認できない場合、当サービスは有料プランの機能を制限または停止することがあります。
                </li>
              </ol>
            </section>

            {/* 4. 知的財産権 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第4条（知的財産権）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  当サービスに含まれるテンプレート、デザイン素材、アニメーション、ソフトウェア、ロゴ等の知的財産権は、当サービスまたはそのライセンサーに帰属します。
                </li>
                <li>
                  ユーザーは、当サービスが提供するテンプレート・素材を、カード作成の目的に限り使用することができます。
                </li>
                <li>
                  テンプレート・素材の再配布、販売、二次利用（カード作成以外の目的での使用）は禁止します。
                </li>
              </ol>
            </section>

            {/* 5. ユーザーコンテンツ */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第5条（ユーザーコンテンツ）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  ユーザーが作成・アップロードしたコンテンツ（メッセージ文、画像等）の著作権は、ユーザーに帰属します。
                </li>
                <li>
                  ユーザーは、当サービスに対し、サービスの提供・運営・改善に必要な範囲で、ユーザーコンテンツを使用・複製・表示する非独占的なライセンスを付与するものとします。
                </li>
                <li>
                  当サービスは、ユーザーコンテンツを本規約に定める目的以外で使用しません。ただし、匿名化・集計されたデータをサービス改善の目的で利用することがあります。
                </li>
                <li>
                  ユーザーは、アップロードするコンテンツが第三者の権利を侵害しないことを保証するものとします。
                </li>
              </ol>
            </section>

            {/* 6. 禁止事項 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第6条（禁止事項）
              </h2>
              <p className="mb-3">
                ユーザーは、当サービスの利用にあたり、以下の行為を行ってはなりません。
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>法令または公序良俗に反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>他のユーザーまたは第三者への嫌がらせ、誹謗中傷、脅迫</li>
                <li>わいせつ、暴力的、差別的なコンテンツの作成・送信</li>
                <li>スパム行為（大量のカードの無差別送信等）</li>
                <li>当サービスのサーバーまたはネットワークへの不正アクセス</li>
                <li>サービスの運営を妨害する行為</li>
                <li>他のユーザーのアカウントへの不正ログイン</li>
                <li>当サービスの機能を利用した商業目的の宣伝・広告（当サービスが許可した場合を除く）</li>
                <li>リバースエンジニアリング、逆コンパイル等の行為</li>
                <li>当サービスのAPIへの不正なアクセスまたは過剰なリクエスト</li>
                <li>その他、当サービスが不適切と判断する行為</li>
              </ul>
            </section>

            {/* 7. サービスの中断・終了 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第7条（サービスの中断・終了）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  当サービスは、以下の場合にサービスの全部または一部を中断することがあります。
                  <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>システムの保守・更新を行う場合</li>
                    <li>天災、停電、通信障害等の不可抗力による場合</li>
                    <li>セキュリティ上の緊急対応が必要な場合</li>
                    <li>その他、運営上やむを得ない事由がある場合</li>
                  </ul>
                </li>
                <li>
                  当サービスは、30日前までに通知のうえ、サービスの全部または一部を終了することができるものとします。
                </li>
                <li>
                  サービス終了時、ユーザーは自身のデータをエクスポートする機会を提供されるものとします。
                </li>
              </ol>
            </section>

            {/* 8. 免責事項 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第8条（免責事項）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  当サービスは、サービスの内容・品質について、明示または黙示を問わず、いかなる保証も行いません。
                </li>
                <li>
                  当サービスは、以下の事項について一切の責任を負いません。
                  <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>サービスの中断・遅延・データの消失</li>
                    <li>AI機能が生成するメッセージ内容の正確性・適切性</li>
                    <li>ユーザー間またはユーザーと第三者間のトラブル</li>
                    <li>共有されたカードの受信者による利用</li>
                    <li>外部サービス（Stripe、Google等）の障害に起因する問題</li>
                  </ul>
                </li>
                <li>
                  当サービスは「現状有姿（as is）」で提供されます。
                </li>
              </ol>
            </section>

            {/* 9. 損害賠償 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第9条（損害賠償の制限）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  当サービスの利用に関連してユーザーに損害が生じた場合、当サービスの故意または重大な過失による場合を除き、当サービスは一切の損害賠償責任を負いません。
                </li>
                <li>
                  当サービスが賠償責任を負う場合であっても、その額は当該ユーザーが過去12ヶ月間に当サービスに支払った利用料金の総額を上限とします。
                </li>
                <li>
                  間接損害、逸失利益、データの喪失に関する損害については、当サービスは責任を負わないものとします。
                </li>
              </ol>
            </section>

            {/* 10. 準拠法・管轄 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第10条（準拠法・管轄裁判所）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>本規約は、日本法に準拠し、日本法に従って解釈されるものとします。</li>
                <li>
                  本規約に関連する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </li>
              </ol>
            </section>

            {/* 11. 規約の変更 */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                第11条（規約の変更）
              </h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  当サービスは、必要に応じて本規約を変更することがあります。
                </li>
                <li>
                  規約を変更する場合、変更内容および変更の効力発生日を、サービス内の通知またはメールにて事前に告知します。
                </li>
                <li>
                  変更後に当サービスの利用を継続した場合、変更後の規約に同意したものとみなします。
                </li>
                <li>
                  変更に同意されない場合、ユーザーはアカウントを削除することでサービスの利用を終了できます。
                </li>
              </ol>
            </section>

            {/* お問い合わせ */}
            <section>
              <h2
                className="mb-4 text-xl font-semibold md:text-2xl"
                style={{ fontFamily: 'var(--font-lp-serif)', color: 'var(--lp-ink)' }}
              >
                お問い合わせ
              </h2>
              <p>
                本規約に関するお問い合わせは、以下までご連絡ください。
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
                    href="mailto:support@cardmagic.app"
                    className="underline transition-colors hover:text-[var(--lp-terracotta)]"
                  >
                    support@cardmagic.app
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
