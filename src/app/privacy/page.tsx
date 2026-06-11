import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import PrivacyPage from '../components/PrivacyPage'
import Footer from '../components/Footer'
import JsonLdScript from '../components/seo/JsonLdScript'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.pages.privacy.title,
  description: siteConfig.pages.privacy.description,
  path: '/privacy',
  locale: 'uk',
  ogTitle: siteConfig.pages.privacy.ogTitle,
  ogDescription: siteConfig.pages.privacy.description,
  keywords: [`політика конфіденційності ${siteConfig.name}`, 'персональні дані', 'GDPR Україна'],
})

export default function Privacy() {
  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: 'Політика конфіденційності', path: '/privacy' },
    ],
    'uk',
  )

  const webPage = buildWebPageJsonLd({
    title: siteConfig.pages.privacy.title,
    description: siteConfig.pages.privacy.description,
    path: '/privacy',
    locale: 'uk',
  })

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage])} />
      <Navbar />
      <main>
        <PrivacyPage />
      </main>
      <Footer />
    </>
  )
}
