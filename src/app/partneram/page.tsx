import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import PartnersPage from '../components/PartnersPage'
import Footer from '../components/Footer'
import JsonLdScript from '../components/seo/JsonLdScript'
import { buildPartnersJsonLd } from '@/lib/partners-schema'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.pages.partners.title,
  description: siteConfig.pages.partners.description,
  path: '/partneram',
  locale: 'uk',
  ogTitle: siteConfig.pages.partners.ogTitle,
  ogDescription: siteConfig.pages.partners.description,
  ogImage: siteConfig.ogImagePartners,
  ogImageAlt: siteConfig.ogImagePartnersAlt,
  keywords: [...siteConfig.keywords, ...siteConfig.keywordsPartners],
})

export default function Partners() {
  return (
    <>
      <JsonLdScript data={buildPartnersJsonLd('uk')} />
      <Navbar />
      <PartnersPage />
      <Footer />
    </>
  )
}
