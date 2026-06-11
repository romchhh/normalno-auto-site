import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const staticPaths = ['/', '/partneram', '/privacy'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    lastModified: new Date(),
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
