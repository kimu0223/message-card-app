import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://message-card-app.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lpKeywords = [
    'tegami',
    'birthday-tegami',
    'kinenbi-tegami',
    'kekkonshiki-shoutaijo',
    'kekkonshiki-message',
    'oiwai-message',
    'taishoku-message',
    'sotsugyou-message',
  ]

  const blogSlugs = [
    'how-to-print',
    'card-arrangement',
    'birthday-message',
    'wedding-message',
  ]

  const lpPages = lpKeywords.map((keyword) => ({
    url: `${baseUrl}/lp/${keyword}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...lpPages,
    ...blogPages,
  ]
}
