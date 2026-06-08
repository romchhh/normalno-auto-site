import type { Metadata } from 'next'
import { siteConfig } from './site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogTitle?: string
  noIndex?: boolean
}

type ArticleMetaInput = {
  title: string
  description: string
  path: string
  image: string
  imageAlt: string
  publishedTime: string
  category: string
  keywords?: string[]
  ogTitle?: string
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: {
      canonical: path,
      languages: {
        'ru-RU': path,
        'en-US': path,
        'x-default': path,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      alternateLocale: [siteConfig.alternateLocale],
      url,
      siteName: siteConfig.name,
      title: ogTitle ?? title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 900,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export function buildArticleMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  publishedTime,
  category,
  keywords,
  ogTitle,
}: ArticleMetaInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image)
  const pageTitle = `${title} | CardProc`

  return {
    title: pageTitle,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: {
      canonical: path,
      languages: {
        'ru-RU': path,
        'en-US': path,
        'x-default': path,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      alternateLocale: [siteConfig.alternateLocale],
      url,
      siteName: siteConfig.name,
      title: ogTitle ?? pageTitle,
      description,
      publishedTime,
      modifiedTime: publishedTime,
      section: category,
      authors: [siteConfig.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? pageTitle,
      description,
      images: [ogImage],
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildGraphJsonLd(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map(({ '@context': _context, ...node }) => node),
  }
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#service` },
    inLanguage: ['ru', 'en'],
  }
}
