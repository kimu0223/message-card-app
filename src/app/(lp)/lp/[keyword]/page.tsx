import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KeywordHeroSection from '@/components/lp/KeywordHeroSection'
import KeywordFAQSection from '@/components/lp/KeywordFAQSection'
import HowItWorksSection from '@/components/lp/HowItWorksSection'
import PricingSection from '@/components/lp/PricingSection'
import CTASection from '@/components/lp/CTASection'

// キーワード別LPデータ
const LP_KEYWORDS = [
  {
    keyword: 'tegami',
    title: '手紙をデジタルカードに変える | CardMagic',
    heroTitle: '気持ちを届ける\n手紙をデジタルで。',
    heroSubtext:
      '手書きの温かさをデジタルで表現。アニメーション付きメッセージカードで、大切な人に想いを伝えましょう。',
    faqItems: [
      {
        q: '手紙とデジタルカードの違いは？',
        a: 'デジタルカードはLINEやSNSで瞬時に届けられ、アニメーション効果で感動を演出できます。手紙の温かみをデジタルで表現した新しい形です。',
      },
      {
        q: '手紙の文章をAIで考えてもらえますか？',
        a: 'はい！AIアシスタントが相手との関係や伝えたいことをもとに、心のこもった文章を提案します。',
      },
      {
        q: 'スマホから送れますか？',
        a: 'URLをコピーしてLINEやメールで送るだけ。相手はアプリ不要でブラウザから閲覧できます。',
      },
    ],
    canonicalPath: '/lp/tegami',
    metaDescription:
      '手紙の温かみをデジタルで。アニメーション付きメッセージカードをAIで簡単作成。LINEやSNSで送れます。',
  },
  {
    keyword: 'birthday-tegami',
    title: '誕生日の手紙・メッセージカード | CardMagic',
    heroTitle: '誕生日の想いを\nアニメーションで届けよう。',
    heroSubtext:
      '誕生日の手紙を感動的なデジタルカードに。AIがメッセージを提案し、3分で完成。LINEで送れます。',
    faqItems: [
      {
        q: '誕生日メッセージを何と書けばいいかわかりません',
        a: 'AIアシスタントが誕生日にぴったりのメッセージを提案します。相手との関係を選ぶだけでOKです。',
      },
      {
        q: 'バースデーアニメーション（コンフェッティ等）は無料ですか？',
        a: 'Standardプラン以上でご利用いただけます。まず無料で試してみてください。',
      },
      {
        q: '前日でも間に合いますか？',
        a: '作成から送信まで3分。URLを送ればすぐに届きます。当日でも大丈夫です！',
      },
    ],
    canonicalPath: '/lp/birthday-tegami',
    metaDescription:
      '誕生日の手紙をアニメーション付きデジタルカードで。AIがメッセージ提案。3分作成、LINEで送れます。',
  },
  {
    keyword: 'kinenbi-tegami',
    title: '記念日の手紙・メッセージカード | CardMagic',
    heroTitle: '記念日の特別な想いを\nカードに込めて。',
    heroSubtext:
      '結婚記念日・交際記念日など、大切な記念日に贈るアニメーション付きカード。AIで感動的なメッセージを作成。',
    faqItems: [
      {
        q: '記念日メッセージの例文を教えてください',
        a: 'AIが記念日の種類に合わせた例文を提案します。結婚記念日・交際記念日など選択するだけ。',
      },
      {
        q: '毎年使い回せますか？',
        a: 'カードをコピーして日付と文章を変更するだけ。毎年の記念日に活用いただけます。',
      },
      {
        q: '写真を入れることはできますか？',
        a: '写真をアップロードしてカードに配置できます。二人の思い出写真と一緒に贈りましょう。',
      },
    ],
    canonicalPath: '/lp/kinenbi-tegami',
    metaDescription:
      '記念日の手紙をデジタルカードで。AIが感動的なメッセージを提案。アニメーション付きで特別な一日を演出。',
  },
  {
    keyword: 'kekkonshiki-shoutaijo',
    title: '結婚式 招待状をデジタルで | CardMagic',
    heroTitle: '結婚式の招待状を\nデジタルで美しく。',
    heroSubtext:
      '紙の招待状に加えてデジタル版も。アニメーション付きウェディングカードでゲストに特別感を演出。',
    faqItems: [
      {
        q: 'デジタル招待状は失礼にあたりませんか？',
        a: '近年はデジタル招待状も広く受け入れられています。紙の招待状と併用するケースが多いです。',
      },
      {
        q: '出欠確認はできますか？',
        a: '現在は閲覧専用です。出欠確認は別途フォームサービスをご利用ください。',
      },
      {
        q: '式場のホームページに掲載できますか？',
        a: 'URLを共有するだけなので、どこからでもリンクできます。',
      },
    ],
    canonicalPath: '/lp/kekkonshiki-shoutaijo',
    metaDescription:
      '結婚式の招待状をデジタルカードで。アニメーション付きウェディングカードをAIで簡単作成。',
  },
  {
    keyword: 'kekkonshiki-message',
    title: '結婚式 メッセージカード | CardMagic',
    heroTitle: '結婚式に贈る\n祝福のメッセージ。',
    heroSubtext:
      '新郎新婦へのお祝いメッセージをアニメーション付きカードで。AIが心温まるウェディングメッセージを提案。',
    faqItems: [
      {
        q: '結婚式のメッセージで気をつけることは？',
        a: '忌み言葉（「終わる」「壊れる」など）を避け、前向きな表現を使いましょう。AIが適切な言葉を提案します。',
      },
      {
        q: '二次会でも使えますか？',
        a: 'もちろんです。二次会の余興としてスクリーンに映すことも可能です。',
      },
      {
        q: '色紙（寄せ書き）の代わりになりますか？',
        a: '色紙サイズにも対応しています。デジタル寄せ書きとしてご活用ください。',
      },
    ],
    canonicalPath: '/lp/kekkonshiki-message',
    metaDescription:
      '結婚式のメッセージカードをアニメーション付きで。AIが祝福メッセージを提案。色紙サイズにも対応。',
  },
  {
    keyword: 'oiwai-message',
    title: 'お祝い メッセージカード | CardMagic',
    heroTitle: 'お祝いの気持ちを\n心のこもったカードで。',
    heroSubtext:
      '昇進・開業・出産など、あらゆるお祝いシーンに対応。AIがシーンに合ったメッセージを提案します。',
    faqItems: [
      {
        q: 'どんなお祝いシーンに使えますか？',
        a: '昇進・栄転・開業・出産・新築・入学など、あらゆるお祝いに対応したテンプレートがあります。',
      },
      {
        q: '複数人でメッセージを送れますか？',
        a: '現在は一人ずつの作成です。色紙機能でまとめる場合はご連絡ください。',
      },
      {
        q: 'プレゼントと一緒に送れますか？',
        a: 'URLをメッセージに添えてAmazonギフト等と一緒に送るとより喜ばれます。',
      },
    ],
    canonicalPath: '/lp/oiwai-message',
    metaDescription:
      'お祝いメッセージカードをAIで簡単作成。昇進・出産・開業などあらゆるシーンに対応。アニメーション付き。',
  },
  {
    keyword: 'taishoku-message',
    title: '退職 メッセージカード | 感謝を伝える | CardMagic',
    heroTitle: 'お世話になった方へ\n退職のお礼を伝えよう。',
    heroSubtext:
      'お世話になった上司・同僚への退職メッセージをアニメーション付きカードで。AIが感謝の言葉を提案します。',
    faqItems: [
      {
        q: '退職メッセージで気をつけることは？',
        a: '相手のこれからを応援する前向きな言葉を心がけましょう。AIが適切な表現を提案します。',
      },
      {
        q: '色紙の寄せ書きの代わりになりますか？',
        a: '色紙サイズにも対応しています。デジタル寄せ書きとして職場でも使えます。',
      },
      {
        q: 'プリントして渡せますか？',
        a: 'PNG/PDFでダウンロードしてコンビニ印刷できます。印刷方法はブログ記事も参照ください。',
      },
    ],
    canonicalPath: '/lp/taishoku-message',
    metaDescription:
      '退職メッセージカードをAIで作成。感謝の気持ちをアニメーション付きカードで伝えましょう。色紙サイズ対応。',
  },
  {
    keyword: 'sotsugyou-message',
    title: '卒業 メッセージカード | CardMagic',
    heroTitle: '卒業おめでとう。\n新しい旅立ちを祝福しよう。',
    heroSubtext:
      '卒業する友人・恩師・生徒へのメッセージをアニメーション付きカードで。AIが心温まる言葉を提案します。',
    faqItems: [
      {
        q: '先生へのメッセージも作れますか？',
        a: 'もちろんです。AIが先生への感謝の言葉を提案します。在校生から先生へのメッセージに最適です。',
      },
      {
        q: '複数人にまとめて送れますか？',
        a: '同じカードのURLをクラス全員に送ることができます。',
      },
      {
        q: '色紙（寄せ書き）にも使えますか？',
        a: '色紙サイズにも対応しています。クラスからのメッセージカードとしてご活用ください。',
      },
    ],
    canonicalPath: '/lp/sotsugyou-message',
    metaDescription:
      '卒業メッセージカードをAIで簡単作成。友人・先生・生徒へのお祝いメッセージ。アニメーション付きで感動を。',
  },
] as const

type LPKeyword = (typeof LP_KEYWORDS)[number]['keyword']

function findKeywordData(keyword: string) {
  return LP_KEYWORDS.find((item) => item.keyword === keyword) ?? null
}

// 静的パラメータ生成（8キーワード全て）
export function generateStaticParams() {
  return LP_KEYWORDS.map((item) => ({ keyword: item.keyword }))
}

// SEO メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ keyword: string }>
}): Promise<Metadata> {
  const { keyword } = await params
  const data = findKeywordData(keyword)

  if (!data) {
    return {
      title: 'Not Found | CardMagic',
    }
  }

  return {
    title: data.title,
    description: data.metaDescription,
    alternates: {
      canonical: data.canonicalPath,
    },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: data.canonicalPath,
      siteName: 'CardMagic',
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.metaDescription,
    },
  }
}

// ページコンポーネント
export default async function KeywordLPPage({
  params,
}: {
  params: Promise<{ keyword: string }>
}) {
  const { keyword } = await params
  const data = findKeywordData(keyword)

  if (!data) {
    notFound()
  }

  return (
    <>
      <KeywordHeroSection title={data.heroTitle} subtext={data.heroSubtext} />
      <HowItWorksSection />
      <PricingSection />
      <KeywordFAQSection items={data.faqItems} />
      <CTASection />
    </>
  )
}
