import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import PrivacyPage from '../../components/PrivacyPage'
import Footer from '../../components/Footer'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props): Metadata {
  const locale = (isValidLocale(params.locale) ? params.locale : 'uk') as Locale

  return buildPageMetadata({
    title: siteConfig.pages.privacy.title,
    description: siteConfig.pages.privacy.description,
    path: '/privacy',
    locale,
    ogTitle: siteConfig.pages.privacy.ogTitle,
    ogDescription: siteConfig.pages.privacy.description,
    keywords: [`політика конфіденційності ${siteConfig.name}`, 'персональні дані', 'GDPR Україна'],
  })
}

export default function Privacy({ params }: Props) {
  const locale = (isValidLocale(params.locale) ? params.locale : 'uk') as Locale

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: 'Політика конфіденційності', path: '/privacy' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: siteConfig.pages.privacy.title,
    description: siteConfig.pages.privacy.description,
    path: '/privacy',
    locale,
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
