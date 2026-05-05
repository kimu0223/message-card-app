import { brandName } from '@/lib/brand'

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-r-xl border-l-4 border-violet-400 bg-violet-50 px-5 py-3 text-sm italic leading-relaxed text-zinc-700">
      {children}
    </blockquote>
  )
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-relaxed">
      <span className="mt-0.5 text-emerald-500">✓</span>
      <span>{children}</span>
    </li>
  )
}

export default function WeddingMessageContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      {/* 導入文 */}
      <p className="leading-relaxed">
        結婚式のメッセージカードは 新郎新婦やゲストへの祝福を形にする大切なアイテムです。しかし いざ書こうとすると「何を書けばいいの？」「忌み言葉って何？」と手が止まってしまう方も多いのではないでしょうか。
      </p>
      <p className="leading-relaxed">
        この記事では 結婚式のメッセージカードを初めて書く方でも迷わないよう <strong>基本マナー</strong>から<strong>関係別の例文20選</strong> そして<strong>おしゃれなデザインのコツ</strong>までを一本にまとめました。そのままコピーして使えるテンプレートも用意していますので ぜひ最後までご覧ください。
      </p>

      {/* 結婚式メッセージカードとは */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">結婚式メッセージカードとは？ 用途と種類を整理</h2>
        <p className="leading-relaxed">
          結婚式で使われるメッセージカードには 大きく分けて3つの種類があります。それぞれ目的が異なるため 書く内容や文体も変わってきます。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">種類</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">誰が書く？</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">目的</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: '招待状の返信メッセージ', who: 'ゲスト', purpose: '出席の返事とともにお祝いの言葉を添える' },
                { type: 'ゲストへのサンキューカード', who: '新郎新婦', purpose: '列席への感謝とこれからのご挨拶' },
                { type: '芳名帳・ゲストブックへの一言', who: 'ゲスト', purpose: '受付時に記帳しながらお祝いメッセージ' },
              ].map((row) => (
                <tr key={row.type} className="border-b border-zinc-100">
                  <td className="px-4 py-2 font-medium text-zinc-800">{row.type}</td>
                  <td className="px-4 py-2 text-zinc-500">{row.who}</td>
                  <td className="px-4 py-2 text-zinc-500">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-zinc-500">
          どの種類でも共通して守るべきマナーがあります。次のセクションで詳しく見ていきましょう。
        </p>
      </section>

      {/* 書き方の基本マナー */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">結婚式メッセージカードの書き方｜3つの基本マナー</h2>
        <p className="leading-relaxed">
          結婚式のメッセージカードには 日常の手紙とは異なる独自のルールがあります。知らずにマナー違反をしてしまうと 相手に不快な印象を与えてしまうこともあるため しっかり押さえておきましょう。
        </p>

        {/* マナー1：忌み言葉 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">マナー1：忌み言葉・重ね言葉を避ける</h3>
          <p className="leading-relaxed">
            結婚式では 別れや不幸を連想させる「忌み言葉」と 不幸が繰り返されることを暗示する「重ね言葉」を使わないのが鉄則です。うっかり使ってしまいがちな代表例を表にまとめました。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-2 text-left font-semibold text-zinc-700">避ける言葉</th>
                  <th className="px-4 py-2 text-left font-semibold text-zinc-700">理由</th>
                  <th className="px-4 py-2 text-left font-semibold text-zinc-700">言い換え表現</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { avoid: '別れる・離れる', reason: '離婚を連想させる', alt: '旅立つ・新たな道へ進む' },
                  { avoid: '切る・切れる', reason: '縁が切れることを連想', alt: '使用を控える' },
                  { avoid: '終わる・終わり', reason: '終焉を連想させる', alt: '新たな始まり・節目' },
                  { avoid: '戻る・帰る', reason: '出戻りを連想させる', alt: '使用を控える' },
                  { avoid: '忙しい', reason: '心を亡くすと書く', alt: 'ご多用・お忙しい中（漢字を避ける）' },
                  { avoid: '重ね重ね・たびたび', reason: '再婚を連想させる重ね言葉', alt: '心より・本当に' },
                  { avoid: 'ますます・くれぐれも', reason: '同じく重ね言葉', alt: '一層・どうぞ' },
                  { avoid: '4（死）・9（苦）', reason: '忌み数字', alt: '金額や数に使わない' },
                ].map((row) => (
                  <tr key={row.avoid} className="border-b border-zinc-100">
                    <td className="px-4 py-2 font-medium text-red-700">{row.avoid}</td>
                    <td className="px-4 py-2 text-zinc-500">{row.reason}</td>
                    <td className="px-4 py-2 text-emerald-700">{row.alt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* マナー2：句読点 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">マナー2：句読点（、。）を使わない</h3>
          <p className="leading-relaxed">
            意外と知られていないのが 結婚式のメッセージカードでは句読点を使わないというルールです。「、」は区切り 「。」は終わりを意味するため 縁起が悪いとされています。
          </p>
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>ポイント：</strong>句読点の代わりに スペースや改行を使って文章を区切りましょう。読みやすさを保ちながらマナーも守れます。
          </div>
        </div>

        {/* マナー3：筆記用具 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">マナー3：筆記用具と直筆のすすめ</h3>
          <p className="leading-relaxed">
            手書きの場合は 黒または濃紺の万年筆・ボールペン・筆ペンを使用するのが基本です。鉛筆やシャーペンなど消せる筆記具はNGとされています。親しい友人であればカラーペンで華やかにデコレーションするのもOKですが 読みやすさは大切にしましょう。
          </p>
          <p className="leading-relaxed">
            デジタルで作成する場合でも 一部に手書きの一言を添えると温かみがぐっと増します。{brandName}で作成したカードを印刷し 手書きメッセージを追記するのもおすすめです。
          </p>
        </div>
      </section>

      {/* メッセージの構成 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">心に響くメッセージの「3ステップ構成」</h2>
        <p className="leading-relaxed">
          何を書けばいいか分からないときは 次の3ステップで組み立てると自然にまとまります。
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { step: 'STEP 1', title: 'お祝いの言葉', desc: '「ご結婚おめでとうございます」など冒頭で祝福を伝える' },
            { step: 'STEP 2', title: '具体的なエピソード', desc: '相手との思い出や感謝の気持ちを添えてオリジナリティを出す' },
            { step: 'STEP 3', title: '未来への願い', desc: '「お幸せに」「素敵なご家庭を」など明るい未来を祈る言葉で締める' },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-zinc-200 p-4 text-center">
              <p className="mb-1 text-xs font-bold text-violet-500">{item.step}</p>
              <p className="mb-2 text-sm font-bold text-zinc-900">{item.title}</p>
              <p className="text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-zinc-500">
          この3つを意識するだけで 短いメッセージでも気持ちがしっかり伝わる文章になります。
        </p>
      </section>

      {/* 関係別メッセージ例文20選 */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900">【関係別】結婚式メッセージカードの例文20選</h2>
        <p className="leading-relaxed">
          相手との関係性によって 文体やトーンを使い分けることが大切です。ここでは4つのカテゴリに分けて すぐに使える例文をご紹介します。
        </p>

        {/* 友人へ */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">友人・親友へのメッセージ（カジュアル）</h3>
          <p className="text-sm text-zinc-500">親しみのある言葉で 素直に喜びを伝えましょう。</p>
          <div className="space-y-3">
            <Quote>結婚おめでとう！ ○○の幸せそうな顔を見られて本当に嬉しい これからもずっと仲良しでいようね</Quote>
            <Quote>Happy Wedding！ いつも隣で笑ってくれる○○が大好き 二人の新生活が笑顔でいっぱいになりますように</Quote>
            <Quote>ご結婚おめでとう！ ○○と出会えたことは私の人生の宝物 これからは二人の思い出もたくさん作ろうね</Quote>
            <Quote>結婚おめでとう！ 学生時代から夢を語り合った○○が幸せになって 自分のことのように嬉しい 新居に遊びに行かせてね</Quote>
            <Quote>ご結婚おめでとうございます お二人の門出を心からお祝いします 今度ゆっくりお祝いの会をさせてね</Quote>
          </div>
        </div>

        {/* 上司・先輩へ */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">上司・先輩へのメッセージ（フォーマル）</h3>
          <p className="text-sm text-zinc-500">敬意と感謝を込め 品格のある丁寧な表現を心がけましょう。</p>
          <div className="space-y-3">
            <Quote>ご結婚おめでとうございます 日頃より温かくご指導いただき 深く感謝申し上げます お二人のご多幸を心よりお祈りいたします</Quote>
            <Quote>ご結婚の佳き日を心よりお祝い申し上げます ○○さんのもとで学ばせていただけることを誇りに思います お体にお気をつけてお過ごしください</Quote>
            <Quote>この度はご結婚おめでとうございます 公私にわたりお世話になっておりますことに 改めて感謝の気持ちをお伝えいたします 末永いお幸せをお祈りいたします</Quote>
            <Quote>ご結婚おめでとうございます いつも頼りになる先輩のそばで 安心して仕事に打ち込めております お二人の新生活が素晴らしいものとなりますよう願っております</Quote>
            <Quote>ご結婚おめでとうございます ○○さんの温かなお人柄に いつも周囲が元気をもらっています これからのお二人の人生が幸せに満ちたものでありますよう心よりお祈り申し上げます</Quote>
          </div>
        </div>

        {/* 後輩・同僚へ */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">後輩・同僚へのメッセージ（温かく応援）</h3>
          <p className="text-sm text-zinc-500">親しみを持ちつつ 応援する気持ちを込めましょう。</p>
          <div className="space-y-3">
            <Quote>ご結婚おめでとう！ 仕事でもプライベートでも充実した日々を送ってね  二人の門出を心からお祝いします</Quote>
            <Quote>結婚おめでとう！ いつも一生懸命な○○を見ていると元気をもらえます きっと素敵な家庭を築けるよ 応援してます</Quote>
            <Quote>ご結婚おめでとうございます チームの明るいムードメーカーの○○が幸せになって 私も嬉しいです これからも一緒に頑張ろうね</Quote>
            <Quote>結婚おめでとう！ ○○の笑顔がオフィスの癒し パートナーさんもきっと毎日幸せだね 新生活楽しんでね</Quote>
            <Quote>ご結婚おめでとう！ 仕事も家庭も欲張って全部楽しんじゃってください 何かあったらいつでも頼ってね</Quote>
          </div>
        </div>

        {/* 親族へ */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-800">親族・家族へのメッセージ</h3>
          <p className="text-sm text-zinc-500">長年の感謝と これからの絆を大切にした言葉を選びましょう。</p>
          <div className="space-y-3">
            <Quote>ご結婚おめでとうございます 子どもの頃から知っている○○の晴れ姿を見られて 感慨深い気持ちでいっぱいです お二人の幸せを心よりお祈りしています</Quote>
            <Quote>ご結婚おめでとう 小さかった○○がこんなに立派になって 本当に嬉しいです これからも温かい家庭を築いてね 応援しているよ</Quote>
            <Quote>ご結婚おめでとうございます 家族が増えることを心から喜んでいます お二人のこれからの人生が幸せに満ちたものとなりますよう願っております</Quote>
            <Quote>結婚おめでとう いつも明るくて優しい○○ きっと素敵な家庭を作るね 困ったときはいつでも相談してね 家族みんなで応援してるよ</Quote>
            <Quote>ご結婚おめでとうございます 新しいご家族とのご縁を大切にしながら お二人で支え合って歩んでいってください 末永くお幸せに</Quote>
          </div>
        </div>
      </section>

      {/* 英語フレーズ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">おしゃれ度アップ！英語の一言フレーズ集</h2>
        <p className="leading-relaxed">
          メッセージカードに英語のフレーズを添えると ぐっと洗練された印象になります。日本語のメッセージと組み合わせて使うのがおすすめです。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { en: 'Wishing you a lifetime of love and happiness', ja: '二人の愛と幸せが永遠に続きますように' },
            { en: 'Congratulations on your beautiful journey together', ja: '素敵な二人の旅路をお祝いします' },
            { en: 'Here\'s to a wonderful life together', ja: '素晴らしい共同生活に乾杯' },
            { en: 'Love never fails', ja: '愛は決して絶えない' },
          ].map((item) => (
            <div key={item.en} className="rounded-xl border border-violet-100 bg-violet-50 p-4">
              <p className="mb-1 text-sm font-medium text-violet-700">{item.en}</p>
              <p className="text-xs text-zinc-500">{item.ja}</p>
            </div>
          ))}
        </div>
      </section>

      {/* デザインのコツ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">結婚式メッセージカードのデザイン｜5つのコツ</h2>
        <p className="leading-relaxed">
          せっかくのメッセージカード デザインにもこだわると受け取った方の感動がさらに大きくなります。プロのデザイナーでなくても実践できるコツを5つご紹介します。
        </p>
        <ul className="ml-4 list-disc space-y-4 text-sm leading-relaxed">
          <li>
            <strong className="text-zinc-800">カラーは3色以内に絞る：</strong>
            白・ゴールド・ラベンダーなど清楚で上品な配色が人気です。多色使いは散漫な印象になるため メインカラー＋サブカラー＋アクセントの3色に抑えましょう。
          </li>
          <li>
            <strong className="text-zinc-800">フォントは品格で選ぶ：</strong>
            明朝体や細めのゴシック体が格式ある印象を与えます。カジュアルな友人向けなら 手書き風フォントで温かみを演出するのもおすすめです。
          </li>
          <li>
            <strong className="text-zinc-800">余白を大切にする：</strong>
            2024年〜2025年のトレンドは「ミニマルデザイン」。あえて余白を多くとることで 上品さと読みやすさを両立できます。
          </li>
          <li>
            <strong className="text-zinc-800">紙の厚みにこだわる：</strong>
            手に取ったときの「質感」は印象を大きく左右します。印刷する場合は 180kg以上の厚み（官製はがき相当以上）を選ぶと高級感が出ます。
          </li>
          <li>
            <strong className="text-zinc-800">アニメーションは控えめに：</strong>
            デジタルカードの場合 フェードインやゆっくりしたスライドインが上品です。バウンスやフラッシュなど派手な動きは結婚式の雰囲気に合わないため避けましょう。
          </li>
        </ul>
      </section>

      {/* よくある失敗 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">やりがちなNG例と対処法</h2>
        <p className="leading-relaxed">
          結婚式のメッセージカードで よくある失敗パターンを事前に知っておくことで 安心して書くことができます。
        </p>
        <div className="space-y-3">
          {[
            {
              ng: '句読点を入れてしまう',
              fix: 'スペースや改行で代用する。書き終えたら必ず「、」「。」がないかチェック',
            },
            {
              ng: '「ますます」「いよいよ」を使う',
              fix: '「一層」「ついに」など重ならない表現に置き換える',
            },
            {
              ng: 'メッセージが長すぎる',
              fix: '3〜5行（100〜150文字）が読みやすい目安。伝えたい気持ちを厳選して',
            },
            {
              ng: '定型文をそのまま使ってしまう',
              fix: '例文をベースに 二人だけの思い出やエピソードを一文添えるとオリジナルに',
            },
          ].map((item) => (
            <div key={item.ng} className="rounded-xl border border-zinc-200 p-4">
              <p className="mb-1 text-sm font-bold text-red-600">✕ {item.ng}</p>
              <p className="text-sm text-zinc-600">→ {item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* チェックリスト */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">書く前に確認！メッセージカードチェックリスト</h2>
        <p className="leading-relaxed">
          メッセージカードを書き終えたら 投函・手渡しの前にこのリストで最終チェックしましょう。
        </p>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <ul className="space-y-2">
            <CheckItem>忌み言葉・重ね言葉を使っていないか</CheckItem>
            <CheckItem>句読点（、。）が含まれていないか</CheckItem>
            <CheckItem>新郎・新婦の名前の漢字は正しいか</CheckItem>
            <CheckItem>日付や会場名に誤りがないか</CheckItem>
            <CheckItem>文章の長さは3〜5行（100〜150文字）程度か</CheckItem>
            <CheckItem>黒または濃紺のペンを使っているか（手書きの場合）</CheckItem>
            <CheckItem>カードのデザインが結婚式の雰囲気に合っているか</CheckItem>
          </ul>
        </div>
      </section>

      {/* まとめ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">まとめ：マナーを守りつつ 心を込めたメッセージを</h2>
        <p className="leading-relaxed">
          結婚式のメッセージカードは マナーさえ押さえれば とてもシンプルです。大切なのは「形式を守ること」と「自分の言葉を添えること」の二つだけ。
        </p>
        <p className="leading-relaxed">
          今回ご紹介した<strong>忌み言葉一覧</strong>と<strong>3ステップ構成</strong>を参考に あなたらしい温かいメッセージを贈ってみてください。
        </p>
        <p className="leading-relaxed">
          {brandName}なら スマホから3分で美しいデザインのメッセージカードが完成します。テンプレートを選んで例文を入力するだけで プロ級のカードが無料で作れます。
        </p>
      </section>

      {/* おすすめの使い方 */}
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="mb-3 text-base font-bold text-zinc-900">{brandName}での活用アイデア</h2>
        <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-zinc-600">
          <li>上記の例文をコピーして テキスト入力欄にペースト → フォントや色をカスタマイズ</li>
          <li>「Wedding Classic」テンプレートをベースに 文字色をゴールドに変更するだけで高級感アップ</li>
          <li>PNG書き出し → コンビニのネットプリントでハガキサイズに印刷すれば 手渡しカードが完成</li>
          <li>色紙サイズ（272 × 242 mm）で作成し グループでの寄せ書きカードとしても活用可能</li>
        </ul>
      </section>
    </div>
  )
}
