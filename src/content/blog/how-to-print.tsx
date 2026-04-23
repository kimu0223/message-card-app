export default function HowToPrintContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      {/* CardMagicからのダウンロード方法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">CardMagicからのダウンロード方法</h2>
        <p className="leading-relaxed">
          CardMagicでカードのデザインが完成したら、画面右上の「ダウンロード」ボタンをクリックします。PNG形式またはPDF形式を選択できます。コンビニ印刷には高品質なPDFがおすすめです。
        </p>
        <ol className="ml-4 list-decimal space-y-2 text-sm leading-relaxed">
          <li>エディタ画面右上の「ダウンロード」をクリック</li>
          <li>ファイル形式を「PDF」または「PNG（高解像度）」から選択</li>
          <li>用紙サイズを確認して「保存」をクリック</li>
          <li>ダウンロードされたファイルをスマートフォンまたはUSBメモリに移す</li>
        </ol>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <strong>ポイント：</strong>
          スマートフォンの場合はメールやクラウドストレージ（iCloud・Googleドライブ）経由でファイルを送ると、コンビニのマルチコピー機から直接印刷できます。
        </div>
      </section>

      {/* コンビニ印刷の手順 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">コンビニ印刷の手順</h2>
        <p className="leading-relaxed">
          主要コンビニのマルチコピー機を使ったネットプリントの手順を紹介します。
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="mb-2 font-semibold text-zinc-900">セブン-イレブン（ネットプリント）</h3>
            <ol className="ml-4 list-decimal space-y-1 text-sm leading-relaxed">
              <li>「ネットプリント」アプリまたはWebサイトにファイルをアップロード</li>
              <li>発行された予約番号（8桁）を控える</li>
              <li>マルチコピー機で「ネットプリント」を選択</li>
              <li>予約番号を入力して印刷</li>
            </ol>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="mb-2 font-semibold text-zinc-900">ファミリーマート（ネットワークプリント）</h3>
            <ol className="ml-4 list-decimal space-y-1 text-sm leading-relaxed">
              <li>「ネットワークプリントサービス」サイトにファイルをアップロード</li>
              <li>ユーザー番号を控える</li>
              <li>Famiポートで「ネットワークプリント」を選択</li>
              <li>ユーザー番号を入力してプリント予約番号を発行</li>
              <li>マルチコピー機で番号を入力して印刷</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 推奨用紙サイズ一覧 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">推奨用紙サイズ一覧</h2>
        <p className="leading-relaxed">
          CardMagicはA4縦・A4横・色紙サイズに対応しています。用途に合わせて選択してください。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">サイズ名</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">CardMagicのサイズ</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">推奨用紙</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2 font-medium text-zinc-800">A4縦</td>
                <td className="px-4 py-2 text-zinc-600">210 × 297 mm</td>
                <td className="px-4 py-2 text-zinc-600">A4普通紙・光沢紙</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2 font-medium text-zinc-800">A4横</td>
                <td className="px-4 py-2 text-zinc-600">297 × 210 mm</td>
                <td className="px-4 py-2 text-zinc-600">A4普通紙・光沢紙（横向き）</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2 font-medium text-zinc-800">色紙</td>
                <td className="px-4 py-2 text-zinc-600">272 × 242 mm</td>
                <td className="px-4 py-2 text-zinc-600">A4用紙に印刷後カット、または専用色紙</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-800">ハガキ</td>
                <td className="px-4 py-2 text-zinc-600">100 × 148 mm</td>
                <td className="px-4 py-2 text-zinc-600">はがき用紙（コンビニ写真印刷対応）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 印刷のコツ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">印刷のコツ</h2>
        <ul className="ml-4 list-disc space-y-3 text-sm leading-relaxed">
          <li>
            <strong className="text-zinc-800">光沢紙を選ぶ：</strong>
            コンビニの写真印刷モードを使うと、光沢紙に鮮やかに印刷できます。発色が良くなり、プレゼントに最適です。
          </li>
          <li>
            <strong className="text-zinc-800">フチなし印刷を選択：</strong>
            背景が端まであるデザインの場合は、フチなし設定で印刷すると仕上がりがきれいになります。
          </li>
          <li>
            <strong className="text-zinc-800">色紙サイズはA4に印刷してカット：</strong>
            色紙サイズのカードはA4用紙に印刷し、切り取り線に沿ってカットするときれいに仕上がります。
          </li>
          <li>
            <strong className="text-zinc-800">印刷前にプレビューを確認：</strong>
            マルチコピー機の画面でプレビューを必ず確認し、余白やはみ出しがないかチェックしましょう。
          </li>
        </ul>
      </section>
    </div>
  )
}
