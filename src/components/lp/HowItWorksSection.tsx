const STEPS = [
  {
    num: '01',
    emoji: '🎨',
    title: 'テンプレートを選ぶ',
    desc: '誕生日・お礼・お祝いなど目的別テンプレートが揃っています。好みのスタイルを選ぶだけ。',
  },
  {
    num: '02',
    emoji: '✏️',
    title: 'メッセージを編集',
    desc: 'テキストを自由に編集。フォント・色・サイズも簡単に変更できます。',
  },
  {
    num: '03',
    emoji: '✨',
    title: 'AIにメッセージを提案させる',
    desc: '相手やシーンを伝えると、AIが心に響くメッセージ候補を3つ提案。そのまま使えます。',
  },
  {
    num: '04',
    emoji: '📲',
    title: 'URLで届ける',
    desc: '完成したらURLをコピーしてLINE・SNSで送るだけ。アニメーション付きで届きます。',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">How it works</p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">たった4ステップで完成</h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* コネクターライン */}
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 md:block" />

          {STEPS.map((step) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {/* ステップ番号バブル */}
              <div className="relative z-10 mb-4 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-emerald-200 bg-white shadow-md">
                <span className="text-2xl leading-none">{step.emoji}</span>
                <span className="mt-0.5 text-[10px] font-bold text-emerald-500">{step.num}</span>
              </div>

              <h3 className="mb-2 text-base font-bold text-zinc-800">{step.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
