import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const staticPaths = ['/', '/partneram', '/privacy'] as const

const lastModifiedByPath: Record<(typeof staticPaths)[number], string> = {
  '/': '2026-06-11',
  '/partneram': '2026-06-11',
  '/privacy': '2026-06-01',
}

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    lastModified: lastModifiedByPath[path],
    changeFrequency: (path === '/privacy' ? 'yearly' : 'weekly') as 'weekly' | 'yearly',
    priority: path === '/' ? 1 : path === '/partneram' ? 0.9 : 0.3,
    alternates: {
      languages: {
        'uk-UA': `${siteConfig.url}${path === '/' ? '' : path}`,
        'x-default': `${siteConfig.url}${path === '/' ? '' : path}`,
      },
    },
  }))
}
