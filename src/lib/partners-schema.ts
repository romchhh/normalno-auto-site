import { localePath, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

export function buildPartnersJsonLd(locale: Locale) {
  const path = localePath('/partneram', locale)
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: siteConfig.pages.partners.title,
        description: siteConfig.pages.partners.description,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: { '@id': `${siteConfig.url}/#service` },
        inLanguage: locale,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: siteConfig.name,
            item: absoluteUrl(localePath('/', locale)),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Партнерам',
            item: url,
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'Партнерська програма фінансового лізингу',
        description: siteConfig.pages.partners.description,
        provider: { '@id': `${siteConfig.url}/#organization` },
        areaServed: siteConfig.seo.areaServed,
        offers: {
          '@type': 'Offer',
          name: 'Винагорода 3% від вартості авто',
          description: 'Партнерам виплачується 3% від вартості автомобіля за залученого клієнта.',
          url,
        },
      },
    ],
  }
}
