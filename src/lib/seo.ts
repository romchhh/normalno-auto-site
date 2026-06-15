import type { Metadata } from 'next'
import { localeOgLocale, localePath, type Locale } from './i18n/config'
import { siteConfig } from './site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  locale: Locale
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

const googleBot = {
  index: true,
  follow: true,
  'max-image-preview': 'large' as const,
  'max-snippet': -1,
  'max-video-preview': -1,
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

function buildHreflang(path: string, locale: Locale) {
  const canonical = localePath(path, locale)
  return {
    canonical,
    languages: {
      'uk-UA': localePath(path, 'uk'),
      'x-default': localePath(path, 'uk'),
    },
  }
}

function ogImageMimeType(src: string) {
  if (src.endsWith('.webp')) return 'image/webp'
  if (src.endsWith('.svg')) return 'image/svg+xml'
  if (src.endsWith('.png')) return 'image/png'
  return 'image/jpeg'
}

function buildOgImages(image?: string, alt?: string) {
  const src = image ?? siteConfig.ogImage
  const url = src.startsWith('http') ? src : absoluteUrl(src)

  return [
    {
      url,
      width: siteConfig.ogImageWidth,
      height: siteConfig.ogImageHeight,
      alt: alt ?? siteConfig.ogImageAlt,
      type: ogImageMimeType(src),
    },
  ]
}

function buildSharedMeta({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  path,
  locale,
  noIndex = false,
  type = 'website',
}: {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  path: string
  locale: Locale
  noIndex?: boolean
  type?: 'website' | 'article'
}) {
  const localizedPath = localePath(path, locale)
  const url = absoluteUrl(localizedPath)
  const ogLocale = localeOgLocale(locale)
  const images = buildOgImages(ogImage, ogImageAlt)
  const resolvedOgTitle = ogTitle ?? title
  const resolvedOgDescription = ogDescription ?? description

  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    category: 'finance',
    alternates: noIndex ? undefined : buildHreflang(path, locale),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot },
    other: {
      'content-language': locale,
      'geo.region': 'UA-30',
      'geo.placename': siteConfig.address.locality,
      'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
      'business:contact_data:street_address': siteConfig.address.street,
      'business:contact_data:locality': siteConfig.address.locality,
      'business:contact_data:country_name': siteConfig.address.countryName,
      'business:contact_data:email': siteConfig.email,
      'business:contact_data:phone_number': siteConfig.phone,
      'business:contact_data:website': siteConfig.url,
    },
    openGraph: {
      type,
      locale: ogLocale,
      url,
      siteName: siteConfig.name,
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images,
      countryName: siteConfig.address.countryName,
      emails: [siteConfig.email],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: images.map((image) => image.url),
    },
  }
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  noIndex = false,
  type = 'website',
}: PageMetaInput): Metadata {
  const shared = buildSharedMeta({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogImageAlt,
    path,
    locale,
    noIndex,
    type,
  })

  return {
    metadataBase: new URL(siteConfig.url),
    ...shared,
    title: { absolute: title },
    openGraph: {
      ...shared.openGraph,
      type,
    },
  }
}

export function buildRootMetadata(): Metadata {
  const homePath = localePath('/', 'uk')
  const images = buildOgImages()

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: homePath,
      languages: {
        'uk-UA': homePath,
        'x-default': homePath,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot,
    },
    category: 'finance',
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: absoluteUrl(homePath),
      siteName: siteConfig.name,
      title: siteConfig.pages.home.ogTitle,
      description: siteConfig.pages.home.description,
      images,
      countryName: siteConfig.address.countryName,
      emails: [siteConfig.email],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.pages.home.ogTitle,
      description: siteConfig.pages.home.description,
      images: images.map((image) => image.url),
    },
    icons: {
      icon: siteConfig.iconSrc,
      shortcut: siteConfig.iconSrc,
      apple: siteConfig.iconSrc,
    },
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: 'default',
    },
    other: {
      'content-language': siteConfig.language,
      'geo.region': 'UA-30',
      'geo.placename': siteConfig.address.locality,
      'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
      'business:contact_data:street_address': siteConfig.address.street,
      'business:contact_data:locality': siteConfig.address.locality,
      'business:contact_data:country_name': siteConfig.address.countryName,
      'business:contact_data:email': siteConfig.email,
      'business:contact_data:phone_number': siteConfig.phone,
      'business:contact_data:website': siteConfig.url,
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  }
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(item.path, locale)),
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
  locale,
  dateModified,
}: {
  title: string
  description: string
  path: string
  locale: Locale
  dateModified?: string
}) {
  const localizedPath = localePath(path, locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(localizedPath)}#webpage`,
    url: absoluteUrl(localizedPath),
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#service` },
    inLanguage: locale,
    ...(dateModified ? { dateModified } : {}),
  }
}

