import type { Viewport } from 'next'
import './globals.css'
import Providers from './components/Providers'
import { buildRootMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export const metadata = buildRootMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/futura-pt" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
