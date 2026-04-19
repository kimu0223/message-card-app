import { Palette, Sparkles, Play, Share2 } from 'lucide-react'

const FEATURES = [
  {
    icon: Palette,
    color: 'bg-violet-100 text-violet-600',
    title: '豊富なテンプレート',
    desc: 'プロデザイナーが作成した高品質テンプレートをシーン別に用意。選ぶだけで即プロ仕上がり。',
  },
  {
    icon: Sparkles,
    color: 'bg-blue-100 text-blue-600',
    title: 'AI文章アシスト',
    desc: '相手・関係性・トーンを選ぶとAIが最適なメッセージを提案。「何を書けばいい？」の悩みが消える。',
  },
  {
    icon: Play,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'アニメーション演出',
    desc: '紙吹雪・フェードイン・スライドアップなど、受け取った側がわあっと感動する演出を追加できます。',
  },
  {
    icon: Share2,
    color: 'bg-rose-100 text-rose-600',
    title: 'ワンURLシェア',
    desc: 'LINEやSNSへURLをコピーするだけで送信完了。インストール・ログイン不要で誰でも受け取れます。',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-zinc-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">Features</p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">
            感動を届ける、4つの機能
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${f.color}`}>
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-zinc-800">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
