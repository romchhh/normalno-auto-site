import type { MetadataRoute } from 'next'
import { localePath, locales } from '@/lib/i18n/config'
import { siteConfig } from '@/lib/site'

const staticPaths = ['/', '/partneram', '/privacy'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}${localePath(path, locale)}`,
      lastModified: new Date(),
      changeFrequency: (path === '/privacy' ? 'yearly' : 'weekly') as 'weekly' | 'yearly',
      priority: path === '/' ? 1 : path === '/partneram' ? 0.85 : 0.4,
    })),
  )
}
