import { brandName } from '@/lib/brand'

export default function CardArrangementContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      {/* 導入文 */}
      <p className="leading-relaxed">
        「メッセージカードを作ってみたけど なんだか物足りない…」そんな経験はありませんか？ 実はフォント・配色・背景の3つを少し変えるだけで カードの印象はガラリと変わります。
      </p>
      <p className="leading-relaxed">
        この記事では デザインの知識がゼロでも実践できるアレンジ方法を7つ厳選してご紹介します。どれも{brandName}の機能だけで完結するので 特別なツールは不要です。
      </p>

      {/* アレンジ1：フォント */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ1：フォントを変えるだけで雰囲気が一変</h2>
        <p className="leading-relaxed">
          フォントはカードの「声のトーン」のようなもの。同じメッセージでも フォントを変えるだけで受け取る印象がまったく異なります。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">フォントの種類</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">印象</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">おすすめシーン</th>
              </tr>
            </thead>
            <tbody>
              {[
                { font: '明朝体', feel: '上品・格式がある', scene: '結婚式・退職祝い・お悔やみ' },
                { font: 'ゴシック体（細め）', feel: 'スタイリッシュ・モダン', scene: '誕生日・記念日・ビジネス' },
                { font: '手書き風フォント', feel: '温かい・親しみやすい', scene: '友人・子ども向け・カジュアル' },
                { font: '丸ゴシック', feel: 'かわいい・柔らかい', scene: '子ども・ポップなカード全般' },
              ].map((row) => (
                <tr key={row.font} className="border-b border-zinc-100">
                  <td className="px-4 py-2 font-medium text-zinc-800">{row.font}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.feel}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.scene}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          <strong>プロのコツ：</strong>タイトルをゴシック体 本文を明朝体にする「フォントミックス」を使うと 読みやすさとデザイン性を両立できます。
        </div>
      </section>

      {/* アレンジ2：配色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ2：配色の黄金ルール「3色以内」</h2>
        <p className="leading-relaxed">
          色使いに迷ったら 「メインカラー」「サブカラー」「アクセントカラー」の3色に絞るのが鉄則です。これだけで統一感のある洗練されたデザインになります。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { scene: '誕生日', colors: 'ピンク + 白 + ゴールド', mood: '華やか・お祝い感' },
            { scene: '結婚式', colors: 'アイボリー + ゴールド + ラベンダー', mood: '上品・清楚' },
            { scene: '退職・感謝', colors: 'ネイビー + シルバー + 白', mood: '落ち着き・信頼感' },
            { scene: 'カジュアル', colors: 'ミント + 白 + コーラルピンク', mood: '爽やか・親しみやすい' },
          ].map((item) => (
            <div key={item.scene} className="rounded-xl border border-zinc-200 p-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                  {item.scene}
                </span>
              </div>
              <p className="mb-1 text-sm font-semibold text-zinc-800">{item.colors}</p>
              <p className="text-xs text-zinc-500">{item.mood}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>やりがちなNG：</strong>カラフルにしたくて5色以上使うと 逆にチープな印象になります。色は「引き算」がポイントです。
        </div>
      </section>

      {/* アレンジ3：グラデーション */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ3：背景グラデーションでリッチ感アップ</h2>
        <p className="leading-relaxed">
          単色の背景をグラデーションに変えるだけで 一気にプロっぽい仕上がりになります。{brandName}の背景設定パネルから簡単に設定できます。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: 'サンセット', from: 'from-orange-100', to: 'to-pink-100', desc: 'オレンジ → ピンク｜誕生日・お祝い' },
            { name: 'オーシャン', from: 'from-sky-100', to: 'to-emerald-50', desc: 'スカイブルー → ミント｜卒業・新生活' },
            { name: 'エレガント', from: 'from-amber-50', to: 'to-white', desc: 'ゴールド → ホワイト｜結婚式・記念日' },
            { name: 'モノクローム', from: 'from-zinc-100', to: 'to-white', desc: 'グレー → ホワイト｜ビジネス・シンプル' },
          ].map((g) => (
            <div
              key={g.name}
              className={`rounded-xl bg-gradient-to-r ${g.from} ${g.to} border border-zinc-100 p-4`}
            >
              <p className="text-sm font-semibold text-zinc-800">{g.name}</p>
              <p className="text-xs text-zinc-500">{g.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          <strong>操作方法：</strong>背景レイヤーを選択 → 右パネルの「背景」→「グラデーション」を選び 開始・終了カラーを設定します。
        </div>
      </section>

      {/* アレンジ4：アニメーション */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ4：アニメーションで「動く」カードに</h2>
        <p className="leading-relaxed">
          {brandName}の最大の特徴は デジタルカードに動きをつけられること。テキストや画像にアニメーションを加えると 開いた瞬間に驚きと感動を届けられます。
        </p>
        <div className="space-y-3">
          {[
            {
              name: 'フェードイン',
              desc: 'ふわっと浮かび上がる定番エフェクト。どんなカードにも合う万能アニメーション。',
              scene: 'すべてのシーン',
            },
            {
              name: 'スライドイン',
              desc: '横や下からスッとスライドして登場。メッセージを強調したいときに効果的。',
              scene: '誕生日・記念日',
            },
            {
              name: 'バウンス',
              desc: '跳ねるように登場するポップなアニメーション。楽しい雰囲気のカードにぴったり。',
              scene: '友人・子ども向け',
            },
            {
              name: 'タイプライター',
              desc: '文字が1文字ずつ表示される演出。感情的なメッセージに映画のような効果を。',
              scene: '恋人・特別な手紙',
            },
          ].map((item) => (
            <div key={item.name} className="rounded-xl border border-zinc-200 p-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-900">{item.name}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">{item.scene}</span>
              </div>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>注意：</strong>アニメーションの付けすぎは逆効果。メインメッセージに1つ 装飾に1つ 合計2〜3種類に留めると上品に仕上がります。
        </div>
      </section>

      {/* アレンジ5：余白 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ5：「余白」を味方につける</h2>
        <p className="leading-relaxed">
          デザイン初心者がやりがちな失敗は 情報を詰め込みすぎること。あえて余白を広くとることで 洗練された印象になり メッセージも読みやすくなります。
        </p>
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed">
          <li>文字の上下左右に最低20%の余白を確保する</li>
          <li>要素と要素の間隔（行間）をゆったりとる</li>
          <li>装飾は最小限にして 文字を主役にする</li>
          <li>背景が寂しいと感じたら 要素を足すのではなく グラデーションで変化をつける</li>
        </ul>
        <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 text-sm text-violet-800">
          <strong>迷ったときの法則：</strong>「足したいと思ったら 引く」— これがデザインの格言です。
        </div>
      </section>

      {/* アレンジ6：写真・イラスト */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ6：写真やイラストを添える</h2>
        <p className="leading-relaxed">
          文字だけのカードに1枚の写真を加えるだけで 視覚的なインパクトが大きく変わります。思い出の写真や お気に入りのイラストを活用しましょう。
        </p>
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed">
          <li>
            <strong className="text-zinc-800">二人の思い出写真：</strong>
            旅行や行事の写真を背景に透かして使うと エモーショナルなカードになります。
          </li>
          <li>
            <strong className="text-zinc-800">花やリボンのイラスト：</strong>
            カードの四隅にワンポイントで添えると 上品な装飾効果が生まれます。
          </li>
          <li>
            <strong className="text-zinc-800">写真の透明度を調整：</strong>
            写真を背景に使う場合は 透明度を30〜50%に下げると その上の文字が読みやすくなります。
          </li>
        </ul>
      </section>

      {/* アレンジ7：テンプレート活用 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">アレンジ7：テンプレートをベースにカスタマイズ</h2>
        <p className="leading-relaxed">
          ゼロからデザインするのが不安な方は {brandName}のテンプレートを活用しましょう。プロがデザインしたテンプレートをベースに フォントや色を少し変えるだけで 自分だけのオリジナルカードが完成します。
        </p>
        <div className="space-y-3">
          {[
            {
              scene: '誕生日',
              template: 'Birthday Balloon',
              tip: 'バルーンイラストにバウンスアニメを追加するだけで 一気に華やかに',
            },
            {
              scene: '結婚式',
              template: 'Wedding Classic',
              tip: '文字色をゴールドに変更 + フェードインアニメで品格アップ',
            },
            {
              scene: '退職・感謝',
              template: 'Thank You Classic',
              tip: '明朝体 + グレー系グラデーションで落ち着いた大人のカードに',
            },
            {
              scene: '記念日',
              template: 'Anniversary Minimal',
              tip: '日付をタイプライターアニメで表示して 特別感を演出',
            },
            {
              scene: '卒業',
              template: 'Graduation Future',
              tip: 'スカイブルー背景 + スライドインで爽やかな門出を表現',
            },
          ].map((item) => (
            <div key={item.scene} className="rounded-xl border border-zinc-200 p-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  {item.scene}
                </span>
                <span className="text-sm font-semibold text-zinc-800">{item.template}</span>
              </div>
              <p className="text-sm text-zinc-500">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* まとめ */}
      <section className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="text-base font-bold text-zinc-900">まとめ：7つのアレンジで「あなたらしさ」をプラス</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          今回ご紹介した7つのアレンジをまとめると 次の通りです：
        </p>
        <ol className="ml-4 list-decimal space-y-1 text-sm text-zinc-600">
          <li>フォントを変える — カードの「声のトーン」を決める</li>
          <li>配色を3色以内に絞る — 統一感と洗練さを出す</li>
          <li>グラデーション背景 — リッチな印象に一瞬で変身</li>
          <li>アニメーションを加える — デジタルならではの感動体験</li>
          <li>余白を活かす — 「引き算」のデザインで上品に</li>
          <li>写真・イラストを添える — 視覚的インパクトを強化</li>
          <li>テンプレートを活用 — プロのデザインを自分流にカスタマイズ</li>
        </ol>
        <p className="text-sm leading-relaxed text-zinc-600">
          すべてを一度に実践する必要はありません。まずは1つだけ試してみて 「おっ いい感じ」と思えたアレンジから取り入れてみてください。
        </p>
      </section>
    </div>
  )
}
