function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-r-xl border-l-4 border-emerald-400 bg-emerald-50 px-5 py-3 text-sm italic leading-relaxed text-zinc-700">
      {children}
    </blockquote>
  )
}

export default function BirthdayMessageContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      <p className="leading-relaxed">
        誕生日メッセージは相手との関係性やシーンによって適切な文体が変わります。ここでは彼女・彼氏、友人、上司・先輩、子ども別に、すぐ使える例文を30個紹介します。CardMagicにコピーしてアレンジしてみてください。
      </p>

      {/* 彼女・彼氏 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">彼女・彼氏への誕生日メッセージ</h2>
        <p className="text-sm text-zinc-500">気持ちを素直に伝える言葉が一番響きます。</p>
        <div className="space-y-3">
          <Quote>お誕生日おめでとう。あなたのそばにいられることが、毎日の喜びです。これからもずっと一緒にいようね。</Quote>
          <Quote>Happy Birthday！君と過ごした日々は、全部かけがえのない宝物。今日も最高の一日になりますように。</Quote>
          <Quote>誕生日おめでとう。去年より今年、今年より来年、もっともっと好きになってる。これからもよろしくね。</Quote>
          <Quote>お誕生日おめでとうございます。あなたがいてくれるだけで、毎日が特別になります。大好きだよ。</Quote>
          <Quote>Happy Birthday！一緒に歳を重ねられること、本当に幸せだと思ってる。今日は思い切り祝わせてね！</Quote>
        </div>
      </section>

      {/* 友人 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">友人への誕生日メッセージ</h2>
        <p className="text-sm text-zinc-500">仲の良さが伝わる、気軽で温かい言葉を選びましょう。</p>
        <div className="space-y-3">
          <Quote>誕生日おめでとう！また一緒にご飯食べに行こうね。今年もあなたらしく、元気に過ごしてください。</Quote>
          <Quote>Happy Birthday！いつも笑わせてくれてありがとう。あなたがいると毎日楽しい。今日は思いっきり楽しんで！</Quote>
          <Quote>お誕生日おめでとう。長い付き合いだけど、いつも変わらずいてくれて嬉しいよ。これからもよろしくね！</Quote>
          <Quote>誕生日おめでとう！今年もたくさん一緒に笑おう。いつでも応援してるよ！</Quote>
          <Quote>Happy Birthday！この一年も素敵なことがたくさんありますように。大切な友達でいてくれてありがとう。</Quote>
        </div>
      </section>

      {/* 上司・先輩 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">上司・先輩への誕生日メッセージ</h2>
        <p className="text-sm text-zinc-500">敬意と感謝を込めた、丁寧な言葉遣いが基本です。</p>
        <div className="space-y-3">
          <Quote>お誕生日おめでとうございます。日頃より温かくご指導いただき、ありがとうございます。今後ともどうぞよろしくお願いいたします。</Quote>
          <Quote>お誕生日、心よりお祝い申し上げます。○○さんのもとで働けることを誇りに思います。お体に気をつけてお過ごしください。</Quote>
          <Quote>お誕生日おめでとうございます。いつも丁寧にご指導いただき感謝しております。これからもご健康でご活躍されることをお祈りいたします。</Quote>
          <Quote>誕生日おめでとうございます。先輩のような存在が身近にいてくれることが、毎日の励みになっています。これからもよろしくお願いします。</Quote>
          <Quote>お誕生日おめでとうございます。今後もご指導ご鞭撻のほどよろしくお願いいたします。素晴らしい一年になりますよう心よりお祈り申し上げます。</Quote>
        </div>
      </section>

      {/* 子ども */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">子どもへの誕生日メッセージ</h2>
        <p className="text-sm text-zinc-500">シンプルで温かく、年齢に合わせた言葉を選びましょう。</p>
        <div className="space-y-3">
          <Quote>お誕生日おめでとう！○○ちゃんが生まれてきてくれて、パパとママはとっても幸せだよ。大好き！</Quote>
          <Quote>誕生日おめでとう！今日で○歳になったね。これからもすくすく元気に大きくなってね。いつも応援してるよ。</Quote>
          <Quote>Happy Birthday！毎日笑顔でいてくれてありがとう。あなたの笑顔が家族みんなの元気の源です。</Quote>
          <Quote>お誕生日おめでとう！今年もたくさんの夢を持って、思い切り挑戦してね。いつでも応援してるよ！</Quote>
          <Quote>誕生日おめでとう！○○のことが大好きだよ。これからも一緒にたくさん楽しもうね。</Quote>
        </div>
      </section>

      {/* 使い方のヒント */}
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="mb-3 text-base font-bold text-zinc-900">CardMagicでの使い方</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          上記の例文はそのまま使っても、一部を書き換えてもOKです。CardMagicのテキスト入力欄にコピー&amp;ペーストして、フォントやアニメーションをカスタマイズすれば、世界に一つだけのカードが完成します。
        </p>
      </section>
    </div>
  )
}
