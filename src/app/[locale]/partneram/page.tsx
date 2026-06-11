import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import PartnersPage from '../../components/PartnersPage'
import Footer from '../../components/Footer'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { buildPartnersJsonLd } from '@/lib/partners-schema'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props): Metadata {
  const locale = isValidLocale(params.locale) ? params.locale : 'uk'

  return buildPageMetadata({
    title: siteConfig.pages.partners.title,
    description: siteConfig.pages.partners.description,
    path: '/partneram',
    locale,
    ogTitle: siteConfig.pages.partners.ogTitle,
    ogDescription: siteConfig.pages.partners.description,
    keywords: [...siteConfig.keywords, ...siteConfig.keywordsPartners],
  })
}

export default function Partners({ params }: Props) {
  const locale = (isValidLocale(params.locale) ? params.locale : 'uk') as Locale

  return (
    <>
      <JsonLdScript data={buildPartnersJsonLd(locale)} />
      <Navbar />
      <PartnersPage />
      <Footer />
    </>
  )
}
