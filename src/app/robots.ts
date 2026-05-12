import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://message-card-app.vercel.app'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/card/', '/api/', '/dashboard/', '/editor/', '/billing/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
