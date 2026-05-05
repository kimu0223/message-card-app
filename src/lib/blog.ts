export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string // 'YYYY-MM-DD'
  category: 'tips' | 'how-to' | 'guide'
  tags: string[]
  externalLinks?: { title: string; url: string; description: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-print',
    title: 'メッセージカードをコンビニで印刷する方法｜セブン・ファミマ・ローソン対応',
    description: '自作メッセージカードをコンビニのマルチコピー機で印刷する全手順を写真付きで解説。セブン・ファミマ・ローソン別の操作方法、用紙選び、きれいに仕上げるコツまでこれ一本で完結します。',
    publishedAt: '2026-05-04',
    category: 'how-to',
    tags: ['印刷', 'コンビニ', 'PDF', 'ネットプリント', 'セブンイレブン', 'ファミマ', '自作'],
    externalLinks: [
      {
        title: 'セブン-イレブン マルチコピー',
        url: 'https://www.sej.co.jp/services/copy.html',
        description: '写真印刷・ネットプリントに対応',
      },
      {
        title: 'ファミリーマート プリント',
        url: 'https://www.family.co.jp/services/print.html',
        description: 'ネットワークプリントで手軽に印刷',
      },
      {
        title: 'ローソン マルチコピー機',
        url: 'https://www.lawson.co.jp/service/others/multicopy/',
        description: 'ネットワークプリントで手軽に印刷',
      },
    ],
  },
  {
    slug: 'card-arrangement',
    title: 'メッセージカードのおしゃれなアレンジ術7選｜デザイン初心者でもOK',
    description:
      'デザインセンスがなくても大丈夫。フォント・配色・グラデーション・アニメーションを組み合わせて、プロ級のメッセージカードに仕上げるアレンジ方法を7つ紹介します。',
    publishedAt: '2026-05-04',
    category: 'tips',
    tags: ['デザイン', 'アレンジ', 'テンプレート', 'おしゃれ', '手作り', '配色', 'フォント'],
  },
  {
    slug: 'birthday-message',
    title: '誕生日メッセージ例文30選｜友達・恋人・上司に届く感動の一言',
    description:
      '誕生日メッセージに使える例文を相手別に30個厳選。友達・恋人・上司・子ども向けのテンプレートから、心に響く書き方の3つのコツ、LINEやカードで使い分けるポイントまで徹底解説。',
    publishedAt: '2026-05-04',
    category: 'guide',
    tags: ['誕生日', 'メッセージ', '例文', '友達', '恋人', '上司', '感動'],
  },
  {
    slug: 'wedding-message',
    title: '結婚式メッセージカードの書き方完全ガイド｜マナー・例文・デザイン',
    description: '結婚式のメッセージカードに使える例文20選と書き方マナーを徹底解説。忌み言葉一覧・句読点ルール・関係別テンプレート・おしゃれなデザインのコツまで、これ一本で迷わず書けます。',
    publishedAt: '2026-05-03',
    category: 'guide',
    tags: ['結婚式', 'メッセージカード', '書き方', '例文', 'マナー', '忌み言葉', 'デザイン'],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
