import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.pages.home.title,
    short_name: siteConfig.name,
    description: siteConfig.pages.home.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0A2540',
    theme_color: siteConfig.themeColor,
    lang: 'uk',
    dir: 'ltr',
    categories: ['finance', 'business', 'automotive'],
    icons: [
      {
        src: siteConfig.ogImage,
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  }
}
