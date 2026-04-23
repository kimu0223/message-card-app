export default function CardArrangementContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      {/* フォントを変えてみる */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">1. フォントを変えてみる</h2>
        <p className="leading-relaxed">
          フォントはカードの雰囲気を大きく左右します。CardMagicでは複数のフォントから選べるので、テキストを選択してフォントパネルから変更してみましょう。
        </p>
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed">
          <li><strong className="text-zinc-800">明朝体：</strong>落ち着いた大人の雰囲気。結婚式・退職祝いに</li>
          <li><strong className="text-zinc-800">ゴシック体（細め）：</strong>シンプルでスタイリッシュ。誕生日・記念日に</li>
          <li><strong className="text-zinc-800">手書き風：</strong>温かみのある印象。子どもへのカードや友人へのメッセージに</li>
          <li><strong className="text-zinc-800">明朝体＋ゴシック混在：</strong>タイトルをゴシック、本文を明朝にすると読みやすく締まった印象になります</li>
        </ul>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          <strong>操作方法：</strong>テキストレイヤーをクリック → 右パネルの「フォント」ドロップダウンを変更
        </div>
      </section>

      {/* 背景グラデーション */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">2. 背景グラデーションで雰囲気を変える</h2>
        <p className="leading-relaxed">
          単色背景をグラデーションに変えるだけで、グッとリッチな印象になります。CardMagicの背景設定パネルから簡単に変更できます。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: '誕生日向け', from: 'from-pink-100', to: 'to-violet-100', desc: 'ピンク → パープル' },
            { name: '結婚式向け', from: 'from-amber-50', to: 'to-white', desc: 'ゴールド → ホワイト' },
            { name: '退職・卒業向け', from: 'from-sky-100', to: 'to-emerald-100', desc: 'ブルー → グリーン' },
            { name: 'シンプル', from: 'from-zinc-50', to: 'to-white', desc: 'グレー → ホワイト' },
          ].map((g) => (
            <div
              key={g.name}
              className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${g.from} ${g.to} border border-zinc-100 p-4`}
            >
              <div>
                <p className="text-sm font-semibold text-zinc-800">{g.name}</p>
                <p className="text-xs text-zinc-500">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          <strong>操作方法：</strong>背景レイヤーを選択 → 右パネルの「背景」→「グラデーション」を選択し、開始・終了カラーを設定
        </div>
      </section>

      {/* アニメーションで動きをつける */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">3. アニメーションで動きをつける</h2>
        <p className="leading-relaxed">
          CardMagicの最大の特徴がアニメーション機能です。テキストや画像に動きをつけることで、相手に驚きと感動を届けられます。
        </p>
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed">
          <li><strong className="text-zinc-800">フェードイン：</strong>ふわっと現れる定番アニメ。どんなカードにも合う</li>
          <li><strong className="text-zinc-800">スライドイン：</strong>横や下からスライドして登場。メッセージを強調したいときに</li>
          <li><strong className="text-zinc-800">バウンス：</strong>跳ねるような動き。明るい誕生日カードに最適</li>
          <li><strong className="text-zinc-800">タイプライター：</strong>文字が1文字ずつ表示される演出。感情的なメッセージに効果的</li>
        </ul>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          <strong>操作方法：</strong>レイヤーを選択 → 右パネルの「アニメーション」タブ → アニメーションの種類と速度を設定
        </div>
      </section>

      {/* シーン別おすすめテンプレート */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">4. シーン別おすすめテンプレート</h2>
        <p className="leading-relaxed">
          CardMagicにはシーン別のテンプレートが用意されています。ベースとして使い、フォントや色を少し変えるだけで個性的なカードになります。
        </p>
        <div className="space-y-3">
          {[
            {
              scene: '誕生日',
              template: 'Birthday Balloon',
              tip: 'バルーンのイラストにバウンスアニメを追加すると一気に華やかになります',
            },
            {
              scene: '記念日',
              template: 'Anniversary Minimal',
              tip: 'シンプルなテンプレートに2人の思い出の日付をタイプライターアニメで表示',
            },
            {
              scene: '退職',
              template: 'Thank You Classic',
              tip: '落ち着いた明朝体＋グレー系グラデーションで品格のあるカードに',
            },
            {
              scene: '卒業',
              template: 'Graduation Future',
              tip: 'スカイブルーのグラデーション＋スライドインアニメで爽やかな演出',
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
        <h2 className="text-base font-bold text-zinc-900">まとめ</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          フォント・背景グラデーション・アニメーションの3つを組み合わせるだけで、デザイン未経験でも本格的なカードが作れます。まずはテンプレートを選んで、1つずつ変えながら自分好みに仕上げてみましょう。
        </p>
      </section>
    </div>
  )
}
