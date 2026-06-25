import type { Metadata } from 'next'
import { brandName, withBrandName } from '@/lib/brand'

/** ガイド系SEOページ共通のメタデータを生成する。
 *  title はブランド名なしの素の文言を渡す（<title> には withBrandName で付与される）。
 *  openGraph.title は従来どおりブランド名なしの title を使用する。
 */
export function buildGuideMetadata(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
  /** OGP用の短縮説明文。省略時は description を流用する */
  ogDescription?: string
}): Metadata {
  const { title, description, path, keywords, ogDescription } = opts
  return {
    title: withBrandName(title),
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: ogDescription ?? description,
      type: 'website',
      locale: 'ja_JP',
      url: path,
      siteName: brandName,
    },
    twitter: { card: 'summary_large_image' },
  }
}
