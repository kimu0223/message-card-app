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
    title: 'メッセージカードをコンビニで印刷する方法',
    description: 'CardMagicで作ったカードをPNG・PDFに書き出してコンビニで印刷する手順を解説します。',
    publishedAt: '2026-04-22',
    category: 'how-to',
    tags: ['印刷', 'コンビニ', 'PDF'],
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
    ],
  },
  {
    slug: 'card-arrangement',
    title: 'メッセージカードのアレンジ7選 ― もっと素敵に仕上げるコツ',
    description:
      'フォント・色・アニメーションの組み合わせ方など、デザインセンスがなくても試せるアレンジ方法を紹介。',
    publishedAt: '2026-04-22',
    category: 'tips',
    tags: ['デザイン', 'アレンジ', 'テンプレート'],
  },
  {
    slug: 'birthday-message',
    title: '誕生日メッセージの例文集 ― 相手別・シーン別30選',
    description:
      '彼女・彼氏・友人・上司など、相手別に使える誕生日メッセージの例文を30個紹介します。',
    publishedAt: '2026-04-22',
    category: 'guide',
    tags: ['誕生日', 'メッセージ', '例文'],
  },
  {
    slug: 'wedding-message',
    title: '結婚式のメッセージカード ― 書き方と注意点',
    description: '結婚式に贈るメッセージカードの書き方、忌み言葉の避け方、デザインのコツを解説。',
    publishedAt: '2026-04-22',
    category: 'guide',
    tags: ['結婚式', 'メッセージ', '注意点'],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
