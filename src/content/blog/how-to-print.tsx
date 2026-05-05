import { brandName } from '@/lib/brand'

function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl border border-zinc-200 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
        {step}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-zinc-900">{title}</p>
        <div className="text-sm leading-relaxed text-zinc-600">{children}</div>
      </div>
    </div>
  )
}

export default function HowToPrintContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      {/* 導入文 */}
      <p className="leading-relaxed">
        {brandName}で作ったメッセージカードは デジタルで送るだけでなく 紙に印刷して手渡しすることもできます。コンビニのマルチコピー機を使えば 自宅にプリンターがなくても 高品質なカードが手軽に完成します。
      </p>
      <p className="leading-relaxed">
        この記事では カードのダウンロードから コンビニ別の印刷手順 きれいに仕上げるコツまでを 初めての方にもわかりやすく解説します。
      </p>

      {/* ダウンロード方法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">STEP1：{brandName}からカードをダウンロードする</h2>
        <p className="leading-relaxed">
          まずは{brandName}で完成したカードを画像ファイルとして書き出します。印刷用途では PDF形式がおすすめですが PNG（高解像度）でも十分きれいに印刷できます。
        </p>
        <div className="space-y-3">
          <StepCard step={1} title="エディタ画面右上の「ダウンロード」をクリック">
            カードデザインの編集が終わったら 画面右上のダウンロードボタンを押します。
          </StepCard>
          <StepCard step={2} title="ファイル形式を選択する">
            <strong>PDF</strong>：印刷用に最適。文字がくっきり出る。<br />
            <strong>PNG（高解像度）</strong>：写真印刷モードで使いたい場合に。
          </StepCard>
          <StepCard step={3} title="用紙サイズを確認して「保存」">
            カードのサイズ（A4 / ハガキ / 色紙）を確認し 保存をクリックします。
          </StepCard>
          <StepCard step={4} title="スマホまたはUSBに転送する">
            ダウンロードしたファイルを コンビニで使えるようにスマホやUSBメモリに移します。
          </StepCard>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <strong>スマホの場合：</strong>iCloud・Googleドライブなどのクラウドストレージ経由でファイルを送ると コンビニのアプリから直接印刷登録できて便利です。
        </div>
      </section>

      {/* コンビニ別印刷手順 */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900">STEP2：コンビニ別の印刷手順</h2>
        <p className="leading-relaxed">
          主要3社のコンビニそれぞれのネットプリント手順をまとめました。どのコンビニも スマホで事前に登録 → 店舗のマルチコピー機で印刷 という流れは共通です。
        </p>

        {/* セブンイレブン */}
        <div className="rounded-xl border border-zinc-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-zinc-900">🏪 セブン-イレブン（ネットプリント）</h3>
          <div className="mb-3 space-y-2">
            <StepCard step={1} title="「かんたんnetprint」アプリをインストール">
              App Store / Google Playから無料でダウンロードできます。会員登録不要で使えます。
            </StepCard>
            <StepCard step={2} title="アプリにファイルをアップロード">
              保存したPDFまたはPNGファイルを選択し 用紙サイズと印刷設定を選びます。
            </StepCard>
            <StepCard step={3} title="予約番号（8桁）またはQRコードを取得">
              登録完了後に表示される予約番号を控えるか QRコードをスクリーンショットします。
            </StepCard>
            <StepCard step={4} title="マルチコピー機で「ネットプリント」を選択">
              メニューから「ネットプリント」を選び 予約番号を入力するか QRコードをかざして印刷します。
            </StepCard>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500">
            料金目安：普通紙 白黒20円/カラー60円 写真用紙（L判）40円 はがき60円
          </div>
        </div>

        {/* ファミマ */}
        <div className="rounded-xl border border-zinc-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-zinc-900">🏪 ファミリーマート（ネットワークプリント）</h3>
          <div className="mb-3 space-y-2">
            <StepCard step={1} title="「ネットワークプリント」サイトまたはアプリに登録">
              ユーザー登録（無料）後 ファイルをアップロードします。
            </StepCard>
            <StepCard step={2} title="ユーザー番号を控える">
              登録完了後に発行されるユーザー番号（10桁）を控えます。
            </StepCard>
            <StepCard step={3} title="マルチコピー機で「ネットワークプリント」を選択">
              マルチコピー機のメニューから「ネットワークプリント」を選択します。
            </StepCard>
            <StepCard step={4} title="ユーザー番号を入力して印刷">
              番号を入力するとファイル一覧が表示されるので 印刷するファイルを選んで実行します。
            </StepCard>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500">
            料金目安：普通紙 白黒20円/カラー60円 写真用紙（L判）30円 はがき60円
          </div>
        </div>

        {/* ローソン */}
        <div className="rounded-xl border border-zinc-200 p-5">
          <h3 className="mb-3 text-lg font-semibold text-zinc-900">🏪 ローソン（ネットワークプリント）</h3>
          <div className="mb-3 space-y-2">
            <StepCard step={1} title="「ネットワークプリント」にファイルを登録">
              ファミリーマートと同じ「ネットワークプリント」サービスを使用します。
            </StepCard>
            <StepCard step={2} title="ユーザー番号を取得">
              ファミマと共通のユーザー番号でOK。一度登録すれば どちらの店舗でも印刷できます。
            </StepCard>
            <StepCard step={3} title="マルチコピー機で印刷">
              操作手順はファミマとほぼ同じです。「ネットワークプリント」を選び 番号を入力して印刷します。
            </StepCard>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500">
            料金目安：普通紙 白黒20円/カラー60円 写真用紙（L判）30円 はがき60円
          </div>
        </div>
      </section>

      {/* USBメモリでの印刷 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">ネットが不安な方へ：USBメモリで直接印刷も可能</h2>
        <p className="leading-relaxed">
          ネットプリントに抵抗がある場合は USBメモリにファイルを保存してコンビニに持ち込む方法もあります。すべてのコンビニのマルチコピー機がUSBメモリ対応です。
        </p>
        <ol className="ml-4 list-decimal space-y-2 text-sm leading-relaxed">
          <li>パソコンでUSBメモリにPDF/PNGファイルをコピーする</li>
          <li>コンビニのマルチコピー機にUSBメモリを差し込む</li>
          <li>「文書印刷」または「写真印刷」を選択</li>
          <li>ファイルを選んで用紙サイズ・印刷設定を確認して印刷</li>
        </ol>
      </section>

      {/* 用紙サイズ一覧 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">用途別おすすめ用紙サイズ</h2>
        <p className="leading-relaxed">
          {brandName}は複数の用紙サイズに対応しています。印刷する前にカードのサイズと  コンビニで選ぶ用紙を確認しておきましょう。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">{brandName}のサイズ</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">寸法</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">コンビニでの用紙</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">おすすめ用途</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: 'ハガキ', dim: '100 × 148 mm', paper: 'はがき用紙 / 写真L判', use: '手渡しカード・招待状返信' },
                { size: 'A4縦', dim: '210 × 297 mm', paper: 'A4普通紙 / 光沢紙', use: '大きめのメッセージカード' },
                { size: 'A4横', dim: '297 × 210 mm', paper: 'A4普通紙（横向き）', use: '二つ折りカードの展開図' },
                { size: '色紙', dim: '272 × 242 mm', paper: 'A4に印刷後カット', use: '寄せ書き・グループカード' },
              ].map((row) => (
                <tr key={row.size} className="border-b border-zinc-100">
                  <td className="px-4 py-2 font-medium text-zinc-800">{row.size}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.dim}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.paper}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* きれいに仕上げるコツ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">きれいに仕上げる5つのコツ</h2>
        <p className="leading-relaxed">
          コンビニ印刷でも ちょっとした工夫で仕上がりが大きく変わります。以下の5つのポイントを押さえておきましょう。
        </p>
        <ul className="ml-4 list-disc space-y-3 text-sm leading-relaxed">
          <li>
            <strong className="text-zinc-800">写真用紙（光沢紙）を選ぶ：</strong>
            普通紙よりも発色が良く カードらしい高級感が出ます。特にイラストや写真が入ったデザインにおすすめです。料金は1枚30〜40円程度で大きな差はありません。
          </li>
          <li>
            <strong className="text-zinc-800">フチなし印刷を設定する：</strong>
            背景が端まであるデザインの場合 フチなし設定にすると白い余白が出ず きれいに仕上がります。マルチコピー機の設定画面で確認しましょう。
          </li>
          <li>
            <strong className="text-zinc-800">印刷プレビューで必ず確認：</strong>
            印刷ボタンを押す前に プレビュー画面で文字が切れていないか 余白のバランスが良いかを確認します。1枚分の料金を無駄にしないためにも大切なステップです。
          </li>
          <li>
            <strong className="text-zinc-800">コーナーパンチで角を丸くする：</strong>
            印刷後にコーナーパンチで角を丸くカットすると 既製品のカードのような仕上がりになります。100均で購入できます。
          </li>
          <li>
            <strong className="text-zinc-800">デザインに余白（塗り足し）を入れておく：</strong>
            コンビニのコピー機は若干の印刷ズレが発生することがあります。デザインの端ギリギリに文字を配置せず 上下左右に5mm程度の余白を設けておくと安心です。
          </li>
        </ul>
      </section>

      {/* よくある質問 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">よくある質問（FAQ）</h2>
        <div className="space-y-3">
          {[
            {
              q: 'PDF と PNG どちらで印刷すべき？',
              a: '文字がメインのカードは PDF がおすすめ（文字がくっきり出る）。写真や複雑なイラストが多いデザインは PNG（高解像度）で書き出すと色味が安定します。',
            },
            {
              q: '印刷代はいくらかかる？',
              a: '普通紙カラーで1枚約60円 写真用紙（L判）で30〜40円が目安です。はがきサイズは60円前後です。',
            },
            {
              q: '自宅プリンターとコンビニ どちらがきれい？',
              a: 'コンビニの業務用マルチコピー機は家庭用プリンターよりも高精細な印刷が可能です。特に光沢紙を使った写真モードでは 市販品と遜色ない仕上がりになります。',
            },
            {
              q: 'スマホだけで全部できる？',
              a: `はい。${brandName}のカード作成からダウンロード ネットプリントへの登録 コンビニでの印刷まで すべてスマホだけで完結します。`,
            },
            {
              q: '色紙サイズはどうやって印刷する？',
              a: `色紙サイズ（272 × 242mm）はA4用紙に印刷してからカッターで切り取ります。${brandName}で書き出す際に切り取りガイド付きのPDFを選択すると便利です。`,
            },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-zinc-200 p-4">
              <p className="mb-1 text-sm font-bold text-zinc-900">Q. {item.q}</p>
              <p className="text-sm text-zinc-600">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* まとめ */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">まとめ：3ステップで簡単印刷</h2>
        <p className="leading-relaxed">
          メッセージカードの印刷は たった3ステップで完了します。
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { num: '01', title: 'ダウンロード', desc: `${brandName}からPDF/PNGを保存` },
            { num: '02', title: 'アップロード', desc: 'ネットプリントアプリに登録' },
            { num: '03', title: '印刷', desc: 'コンビニのマルチコピー機で出力' },
          ].map((item) => (
            <div key={item.num} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p className="mb-1 text-2xl font-bold text-emerald-500">{item.num}</p>
              <p className="mb-1 text-sm font-bold text-zinc-900">{item.title}</p>
              <p className="text-xs text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-zinc-500">
          デジタルで送る手軽さも良いですが 紙のカードには手渡しならではの温かみがあります。大切な人への特別な一枚を ぜひコンビニ印刷で形にしてみてください。
        </p>
      </section>
    </div>
  )
}
