function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-r-xl border-l-4 border-pink-400 bg-pink-50 px-5 py-3 text-sm italic leading-relaxed text-zinc-700">
      {children}
    </blockquote>
  )
}

import { brandName } from '@/lib/brand'

export default function BirthdayMessageContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      {/* 導入文 */}
      <p className="leading-relaxed">
        大切な人の誕生日に 心のこもったメッセージを贈りたい。でも いざ書こうとすると「ありきたりな言葉になってしまう」「感動してもらえるか不安」と悩む方は多いはず。
      </p>
      <p className="leading-relaxed">
        この記事では 友達・恋人・上司・子どもの4カテゴリ別に <strong>すぐに使える誕生日メッセージの例文を30選</strong>ご紹介します。さらに 定型文で終わらない<strong>感動メッセージの書き方の3つのコツ</strong>も解説しますので ぜひ最後までお読みください。
      </p>

      {/* 感動メッセージの書き方 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">心に響く誕生日メッセージの書き方｜3つのコツ</h2>
        <p className="leading-relaxed">
          例文をそのまま使うこともできますが 一手間加えるだけで「自分だけに向けられたメッセージだ」と感じてもらえます。次の3つのコツを意識してみてください。
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              num: '01',
              title: '具体的なエピソードを添える',
              desc: '「あの時○○してくれて嬉しかった」など 二人だけの思い出を一文入れるだけで特別感が格段に上がります',
            },
            {
              num: '02',
              title: '相手の魅力を言葉にする',
              desc: '「いつも笑顔の○○」「真っ直ぐなところが好き」など 相手の性格や行動を具体的に褒めましょう',
            },
            {
              num: '03',
              title: '未来のことを一言添える',
              desc: '「これからも一緒に○○しよう」「来年も隣で笑っていようね」と ポジティブな未来の一言で締めると温かい余韻が残ります',
            },
          ].map((item) => (
            <div key={item.num} className="rounded-xl border border-zinc-200 p-4">
              <p className="mb-1 text-2xl font-bold text-pink-400">{item.num}</p>
              <p className="mb-2 text-sm font-bold text-zinc-900">{item.title}</p>
              <p className="text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 友達への例文 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">【友達・親友へ】絆が深まるメッセージ8選</h2>
        <p className="text-sm text-zinc-500">
          気取らない素直な言葉で 日頃の感謝と「これからもよろしく」の気持ちを伝えましょう。
        </p>
        <div className="space-y-3">
          <Quote>誕生日おめでとう！ いつも話を聞いてくれてありがとう ○○のおかげで毎日が楽しいよ これからもずっと最高の友達でいようね</Quote>
          <Quote>Happy Birthday！ 出会ってからもう○年 楽しいことも大変なことも一緒に乗り越えてきたね 私にとってかけがえのない存在です 生まれてきてくれてありがとう</Quote>
          <Quote>お誕生日おめでとう！ また一緒にご飯行こうね 今年も○○らしく元気に笑っていてください 応援してるよ</Quote>
          <Quote>誕生日おめでとう！ ○○と過ごす時間はいつも笑いが絶えなくて 本当に大切な存在 これからもたくさん思い出つくろうね</Quote>
          <Quote>Happy Birthday！ いつも明るい○○に元気をもらってます 今日は主役なんだから思いっきり楽しんで！ 素敵な一年になりますように</Quote>
          <Quote>お誕生日おめでとう！ 長い付き合いだけど いつも変わらずそばにいてくれてありがとう 来年も再来年もこうして祝わせてね</Quote>
          <Quote>誕生日おめでとう！ 夢に向かって頑張る○○の姿 いつも刺激をもらってるよ 今年も最高の一年にしよう 何かあったらいつでも連絡してね</Quote>
          <Quote>Happy Birthday！ ○○の笑顔が大好き 友達になれて本当によかった これからも一緒にたくさん笑おうね</Quote>
        </div>
      </section>

      {/* 恋人への例文 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">【恋人・パートナーへ】愛情が伝わるメッセージ8選</h2>
        <p className="text-sm text-zinc-500">
          「いつもありがとう」の感謝と 相手の存在そのものを肯定する言葉が喜ばれます。
        </p>
        <div className="space-y-3">
          <Quote>お誕生日おめでとう いつも私のことを大切にしてくれてありがとう ○○の優しさに毎日救われています これからも隣でずっと笑顔を見せてね</Quote>
          <Quote>Happy Birthday！ ○○と過ごす時間が 何よりも幸せです 去年より今年 今年より来年 もっともっと好きになってるよ</Quote>
          <Quote>誕生日おめでとう 仕事に真っ直ぐ取り組む○○の姿 本当にかっこよくて尊敬してる 無理しすぎないでね これからも一番近くで応援させてください</Quote>
          <Quote>お誕生日おめでとう ○○が生まれてきてくれたこの日は 私にとっても特別な日 一緒に歳を重ねていけることが幸せです</Quote>
          <Quote>Happy Birthday！ たくさん笑わせてくれてありがとう 落ち込んだ時に支えてくれてありがとう ○○がいるから毎日が輝いてる 大好きだよ</Quote>
          <Quote>誕生日おめでとう 出会えた奇跡に感謝してます ○○の夢を 一番近くで応援できることが私の幸せ 素敵な一年にしようね</Quote>
          <Quote>お誕生日おめでとうございます あなたがいてくれるだけで 毎日が特別になる ○○と出会えて本当によかった これからもよろしくね</Quote>
          <Quote>Happy Birthday！ 今日は思い切りお祝いさせてね ○○がいてくれる日常が愛おしい これからも二人でたくさんの思い出をつくろう</Quote>
        </div>
      </section>

      {/* 上司・先輩への例文 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">【上司・先輩へ】敬意と感謝が伝わるメッセージ7選</h2>
        <p className="text-sm text-zinc-500">
          丁寧な言葉遣いで 日頃のご指導への感謝と今後の健康・活躍を祈る言葉を添えるのがポイントです。
        </p>
        <div className="space-y-3">
          <Quote>お誕生日おめでとうございます 日頃より温かくご指導いただき 心より感謝申し上げます ○○さんのもとで働けることを誇りに思っております これからもご健康でご活躍されますようお祈りいたします</Quote>
          <Quote>お誕生日おめでとうございます いつも丁寧にご指導くださりありがとうございます ○○さんの仕事に向き合う姿勢を お手本にさせていただいております 素晴らしい一年になりますように</Quote>
          <Quote>お誕生日 心よりお祝い申し上げます ○○さんの的確なアドバイスにいつも助けられております 今後ともどうぞよろしくお願いいたします</Quote>
          <Quote>お誕生日おめでとうございます ○○さんの温かなお人柄に いつも周囲が明るくなっています ますますのご活躍とご健康をお祈りしております</Quote>
          <Quote>誕生日おめでとうございます 先輩のような存在が身近にいてくれることが 毎日の大きな励みになっています これからもよろしくお願いします</Quote>
          <Quote>お誕生日おめでとうございます いつも温かいアドバイスをいただき本当にありがとうございます どうかお体ご自愛ください 今年が○○さんにとって素晴らしい一年になりますように</Quote>
          <Quote>お誕生日おめでとうございます 入社以来ずっとお世話になっております ○○さんから学んだことは私の財産です 今後ともご指導ご鞭撻のほどよろしくお願いいたします</Quote>
        </div>
      </section>

      {/* 子どもへの例文 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">【子どもへ】成長を喜ぶ温かいメッセージ7選</h2>
        <p className="text-sm text-zinc-500">
          シンプルで温かい言葉を選び 年齢に合った表現で「生まれてきてくれてありがとう」を伝えましょう。
        </p>
        <div className="space-y-3">
          <Quote>お誕生日おめでとう！ ○○ちゃんが生まれてきてくれて パパとママはとっても幸せだよ 大好き！</Quote>
          <Quote>誕生日おめでとう！ 今日で○歳になったね 毎日すくすく大きくなっていく姿が嬉しいよ これからもたくさん笑おうね</Quote>
          <Quote>Happy Birthday！ いつもニコニコ笑顔の○○が家族みんなの元気の源だよ 今年もたくさん遊ぼうね</Quote>
          <Quote>お誕生日おめでとう！ ○○は優しくて頑張り屋さんで パパもママもとても誇りに思っているよ 今年もたくさんの夢を見つけてね</Quote>
          <Quote>誕生日おめでとう！ ○○が毎日元気でいてくれることが 何よりの幸せです これからも思い切り挑戦してね いつでも応援してるよ</Quote>
          <Quote>Happy Birthday！ 大好きな○○へ 生まれてきてくれて本当にありがとう これからも一緒にいっぱい楽しもうね</Quote>
          <Quote>お誕生日おめでとう！ ○○のことが大好きだよ 困ったことがあったらいつでもパパやママに相談してね ずっとずっと味方だよ</Quote>
        </div>
      </section>

      {/* LINEとカードの使い分け */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">LINE・SNS vs メッセージカード｜使い分けのポイント</h2>
        <p className="leading-relaxed">
          誕生日メッセージは LINEやSNSで送る場合と メッセージカードで贈る場合で 書き方のポイントが少し異なります。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">項目</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">LINE・SNS</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">メッセージカード</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: '文字数', line: '1〜3行（短く気軽に）', card: '3〜8行（じっくり丁寧に）' },
                { item: 'トーン', line: 'カジュアル・絵文字OK', card: 'やや丁寧・絵文字は控えめ' },
                { item: 'タイミング', line: '当日の朝〜夜', card: '当日または事前に手渡し' },
                { item: '特別感', line: '手軽だが埋もれやすい', card: '形に残るので感動が大きい' },
                { item: 'おすすめ相手', line: '友達・同僚・知人', card: '恋人・家族・上司・特別な友人' },
              ].map((row) => (
                <tr key={row.item} className="border-b border-zinc-100">
                  <td className="px-4 py-2 font-medium text-zinc-800">{row.item}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.line}</td>
                  <td className="px-4 py-2 text-zinc-600">{row.card}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-pink-100 bg-pink-50 p-4 text-sm text-pink-800">
          <strong>おすすめ：</strong>LINEで「おめでとう！」を送った後に {brandName}で作ったデジタルカードのリンクを添えると サプライズ感がアップします。
        </div>
      </section>

      {/* 避けたい言葉 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">誕生日メッセージで避けたい言葉・表現</h2>
        <p className="leading-relaxed">
          お祝いの場なので ネガティブな印象を与えかねない表現には注意しましょう。
        </p>
        <div className="space-y-3">
          {[
            {
              ng: '年齢をネガティブに触れる（「もうおばさんだね」など）',
              fix: '年齢に触れるなら「素敵な○代のスタート」のようにポジティブに',
            },
            {
              ng: '容姿に関するからかい',
              fix: '褒める場合は内面（性格・行動）にフォーカスすると安全',
            },
            {
              ng: '自分の話が多すぎる',
              fix: 'あくまで主役は相手。「あなたのおかげで」と相手目線を意識',
            },
            {
              ng: 'コピペ感丸出しの定型文',
              fix: '例文をベースに 名前やエピソードを1つ入れるだけでオリジナルに',
            },
          ].map((item) => (
            <div key={item.ng} className="rounded-xl border border-zinc-200 p-4">
              <p className="mb-1 text-sm font-bold text-red-600">✕ {item.ng}</p>
              <p className="text-sm text-zinc-600">→ {item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* まとめ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">まとめ：大切なのは「あなたのために書いた」という気持ち</h2>
        <p className="leading-relaxed">
          誕生日メッセージで一番大切なのは 完璧な文章ではなく 「あなたのことを想って書いた」という気持ちそのものです。
        </p>
        <p className="leading-relaxed">
          今回ご紹介した例文を参考に 名前やエピソードを1つ添えるだけで 世界に一つだけのオリジナルメッセージが完成します。
        </p>
        <p className="leading-relaxed">
          {brandName}なら そのメッセージを美しいデザインのカードに仕上げて スマホから簡単に贈ることができます。テンプレートを選び メッセージを入力するだけ。3分で感動的なバースデーカードが完成します。
        </p>
      </section>

      {/* サービスの使い方 */}
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="mb-3 text-base font-bold text-zinc-900">{brandName}での使い方</h2>
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-zinc-600">
          <li>上記の例文をコピーして テキスト入力欄にペースト → 名前やエピソードを書き換え</li>
          <li>「Birthday Balloon」テンプレートにバウンスアニメを追加すると華やかに</li>
          <li>フォントを手書き風に変えると 温かみのあるカードに</li>
          <li>完成したカードのURLをLINEやSNSで共有するだけでプレゼントできます</li>
        </ul>
      </section>
    </div>
  )
}
