import type { Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import { buildRootMetadata } from '@/lib/seo'
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

export const metadata = buildRootMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="uk-UA" href={`${siteConfig.url}/uk`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteConfig.url}/uk`} />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information" />
      </head>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
