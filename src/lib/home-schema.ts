import uk from '@/locales/uk.json'
import { localePath, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const HOW_WE_WORK_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  }
}

export function buildHomeJsonLd(locale: Locale) {
  const copy = uk
  const homePath = localePath('/', locale)
  const homeUrl = absoluteUrl(homePath)
  const faqItems = copy.seo.faq

  const graph: Record<string, unknown>[] = [
    {
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
        url: absoluteUrl(siteConfig.ogImage),
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
      },
      image: absoluteUrl(siteConfig.ogImage),
      address: postalAddress(),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: siteConfig.email,
          telephone: siteConfig.phone,
          url: siteConfig.telegramOperatorUrl,
          availableLanguage: ['Ukrainian'],
          areaServed: siteConfig.seo.areaServed,
        },
      ],
      sameAs: [siteConfig.telegramChannelUrl, siteConfig.telegramOperatorUrl, siteConfig.telegramBotUrl],
    },
    {
      '@type': ['FinancialService', 'LocalBusiness'],
      '@id': `${siteConfig.url}/#service`,
      name: `${siteConfig.name} — справедливий лізинг`,
      description: siteConfig.descriptionUk,
      url: homeUrl,
      image: absoluteUrl(siteConfig.ogImage),
      provider: { '@id': `${siteConfig.url}/#organization` },
      address: postalAddress(),
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
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
      termsOfService: absoluteUrl(localePath('/privacy', locale)),
      priceRange: siteConfig.seo.stats.carPriceRange,
      offers: {
        '@type': 'Offer',
        name: 'Оновлення авто через справедливий лізинг',
        description: siteConfig.descriptionUk,
        availability: 'https://schema.org/InStock',
        url: absoluteUrl(`${homePath}#cta`),
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'USD',
          minPrice: '400',
          maxPrice: '600',
          unitText: 'місяць',
        },
      },
    },
    {
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
          target: absoluteUrl(`${homePath}#kontakt`),
          name: 'Залишити заявку',
        },
        {
          '@type': 'CommunicateAction',
          target: siteConfig.telegramBotUrl,
          name: 'Розрахувати оновлення авто в Telegram',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${homeUrl}#webpage`,
      url: homeUrl,
      name: siteConfig.pages.home.title,
      description: siteConfig.pages.home.description,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${siteConfig.url}/#service` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl(siteConfig.ogImage),
      },
      inLanguage: locale,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '#faq-heading', '#seo-bottom-title'],
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${homeUrl}#how-to`,
      name: copy.howWeWork.heading,
      description: `Як ${siteConfig.name} допомагає оновити автомобіль: оцінка, підбір, аванс та пересадка на авто класом вище.`,
      totalTime: 'P3D',
      step: HOW_WE_WORK_STEPS.map((key, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: copy.howWeWork[key].title,
        text: copy.howWeWork[key].desc,
        url: absoluteUrl(`${homePath}#how-we-work`),
      })),
    },
  ]

  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${homeUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
