import { absoluteUrl } from './seo'
import { siteConfig } from './site'

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    slogan: siteConfig.seo.slogan,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.descriptionUk,
    knowsAbout: siteConfig.seo.knowsAbout,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(siteConfig.logoSrc),
    },
    image: absoluteUrl(siteConfig.ogImage),
    address: postalAddress(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.email,
        telephone: siteConfig.phone,
        url: siteConfig.telegramBotUrl,
        availableLanguage: ['Ukrainian'],
        areaServed: siteConfig.seo.areaServed,
      },
    ],
    sameAs: [
      siteConfig.telegramChannelUrl,
      siteConfig.telegramBotUrl,
      siteConfig.instagramUrl,
      siteConfig.tiktokUrl,
      siteConfig.mapsUrl,
    ],
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.descriptionUk,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: ['uk'],
    potentialAction: [
      {
        '@type': 'CommunicateAction',
        target: absoluteUrl('/#kontakt'),
        name: 'Залишити заявку',
      },
      {
        '@type': 'CommunicateAction',
        target: siteConfig.telegramBotUrl,
        name: 'Розрахувати оновлення авто в Telegram',
      },
    ],
  }
}

export function buildLocalBusinessJsonLd(homeUrl: string) {
  return {
    '@type': ['FinancialService', 'LocalBusiness'],
    '@id': `${siteConfig.url}/#service`,
    name: `${siteConfig.name} — справедливий лізинг`,
    description: siteConfig.descriptionUk,
    url: homeUrl,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    hasMap: siteConfig.mapsUrl,
    provider: { '@id': `${siteConfig.url}/#organization` },
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHours: siteConfig.businessHours,
    areaServed: siteConfig.seo.areaServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
    serviceType: [
      'Справедливий лізинг автомобілів',
      'Трейд-ін авто',
      'Програма оновлення авто',
      'Фінансовий лізинг',
    ],
    termsOfService: absoluteUrl('/privacy'),
    priceRange: siteConfig.seo.stats.carPriceRange,
    offers: {
      '@type': 'Offer',
      name: 'Оновлення авто через справедливий лізинг',
      description: siteConfig.descriptionUk,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl('/#cta'),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        minPrice: '400',
        maxPrice: '600',
        unitText: 'місяць',
      },
    },
  }
}
