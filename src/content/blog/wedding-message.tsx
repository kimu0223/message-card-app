function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-r-xl border-l-4 border-violet-400 bg-violet-50 px-5 py-3 text-sm italic leading-relaxed text-zinc-700">
      {children}
    </blockquote>
  )
}

export default function WeddingMessageContent() {
  return (
    <div className="space-y-10 text-zinc-700">
      <p className="leading-relaxed">
        結婚式のメッセージカードは、新郎新婦への祝福を伝える大切なアイテムです。ただし、いくつかの注意事項を守らないと失礼になってしまうことも。書き方のポイントと例文、デザインのコツをまとめました。
      </p>

      {/* 忌み言葉・重ね言葉一覧 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">忌み言葉・重ね言葉一覧</h2>
        <p className="leading-relaxed">
          結婚式では縁起が悪いとされる「忌み言葉」と、不幸が重なることを連想させる「重ね言葉」を避けるのがマナーです。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">避ける言葉</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">理由</th>
                <th className="px-4 py-2 text-left font-semibold text-zinc-700">代替表現</th>
              </tr>
            </thead>
            <tbody>
              {[
                { avoid: '別れる・離れる', reason: '別離を連想', alt: '旅立つ・新生活を始める' },
                { avoid: '切る・切れる', reason: '縁が切れることを連想', alt: '（使用を控える）' },
                { avoid: '終わる・終わり', reason: '終焉を連想', alt: '節目・新たな始まり' },
                { avoid: '戻る・帰る', reason: '婚家を出ることを連想', alt: '（使用を控える）' },
                { avoid: '重ね重ね・たびたび', reason: '不幸が重なることを連想', alt: '心より・本当に' },
                { avoid: 'ますます・くれぐれも', reason: '重ね言葉', alt: '一層・どうぞ' },
                { avoid: '死ぬ・死亡', reason: '不吉', alt: '（使用を控える）' },
                { avoid: '苦しい（9）・死（4）', reason: '忌み数字との組み合わせ', alt: '金額や数は別の表現で' },
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
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>注意：</strong>句読点（、。）は「区切り」「終わり」を連想させるため、メッセージカードでは使わないのが一般的です。スペースや改行で区切りましょう。
        </div>
      </section>

      {/* 新郎新婦への例文 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">新郎新婦へのメッセージ例文</h2>
        <p className="text-sm text-zinc-500">忌み言葉を使わず、祝福の気持ちを素直に伝えましょう。</p>
        <div className="space-y-3">
          <Quote>ご結婚おめでとうございます お二人の新しい門出を心よりお祝い申し上げます どうぞお幸せに</Quote>
          <Quote>ご結婚おめでとうございます 笑顔あふれる温かいご家庭を築かれますよう 心よりお祈り申し上げます</Quote>
          <Quote>Happy Wedding！ 二人の笑顔が末永く続きますように これからも仲良くね</Quote>
          <Quote>ご結婚おめでとうございます お二人のこれからの人生が 幸せと喜びに満ちたものになりますよう願っています</Quote>
          <Quote>ご結婚おめでとうございます 素敵なパートナーと出会えたことが本当に嬉しいです お二人の未来に幸多からんことを</Quote>
        </div>
      </section>

      {/* 職場関係者への例文 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">職場関係者への例文</h2>
        <p className="text-sm text-zinc-500">改まった言葉遣いで、礼儀正しく祝福の気持ちを伝えます。</p>
        <div className="space-y-3">
          <Quote>ご結婚おめでとうございます 日頃より温かくご指導いただいておりますお二人のご多幸を心よりお祈り申し上げます</Quote>
          <Quote>ご結婚おめでとうございます 公私ともにお力添えいただいていることに深く感謝申し上げます お二人の新生活のご多幸をお祈りいたします</Quote>
          <Quote>ご結婚の佳き日をお祝い申し上げます お二人のお幸せが末永く続きますよう 心よりお祈りいたします</Quote>
        </div>
      </section>

      {/* デザインのコツ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">デザインのコツ</h2>
        <p className="leading-relaxed">
          結婚式のメッセージカードは、華やかさと上品さのバランスが大切です。CardMagicでは色紙サイズにも対応しているので、グループでの寄せ書きにも活用できます。
        </p>
        <ul className="ml-4 list-disc space-y-3 text-sm leading-relaxed">
          <li>
            <strong className="text-zinc-800">カラー：</strong>
            白・ゴールド・ラベンダーなど清楚な色合いを基調に。派手な色は避けましょう。
          </li>
          <li>
            <strong className="text-zinc-800">フォント：</strong>
            明朝体や細めのゴシック体が品格のある印象を与えます。手書き風フォントは親しい関係の方へのカードに向いています。
          </li>
          <li>
            <strong className="text-zinc-800">アニメーション：</strong>
            フェードインやスローなスライドインが上品な印象です。バウンスなど派手な動きは避けましょう。
          </li>
          <li>
            <strong className="text-zinc-800">色紙サイズ対応：</strong>
            CardMagicの色紙サイズ（272 × 242 mm）で作成し、A4用紙に印刷してカットすれば、寄せ書き用の色紙として活用できます。
          </li>
        </ul>
        <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 text-sm text-violet-800">
          <strong>おすすめテンプレート：</strong>「Wedding Classic」または「Anniversary Minimal」をベースに、文字色をゴールド系に変更するだけで品格のあるカードになります。
        </div>
      </section>
    </div>
  )
}
