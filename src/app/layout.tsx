import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import JsonLd from './components/JsonLd'
import { siteConfig } from '@/lib/site'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.titleRu,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.descriptionRu,
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    languages: {
      'ru-RU': '/',
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: [siteConfig.alternateLocale],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
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
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
    images: [siteConfig.ogImage],
  },
  category: 'finance',
  icons: {
    icon: siteConfig.ogImage,
    apple: siteConfig.ogImage,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <head>
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information" />
        <JsonLd />
      </head>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
