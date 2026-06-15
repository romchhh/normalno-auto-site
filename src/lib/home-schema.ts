import uk from '@/locales/uk.json'
import { localePath, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'
import {
  buildLocalBusinessJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from './site-schema'

const HOW_WE_WORK_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export function buildHomeJsonLd(locale: Locale) {
  const copy = uk
  const homePath = localePath('/', locale)
  const homeUrl = absoluteUrl(homePath)
  const faqItems = copy.seo.faq

  const graph: Record<string, unknown>[] = [
    {
      ...buildOrganizationJsonLd(),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Послуги Нормально авто',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Оновлення авто через справедливий лізинг',
              description: siteConfig.descriptionUk,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Партнерська програма для автосалонів',
              description: siteConfig.pages.partners.description,
              url: absoluteUrl(localePath('/partneram', locale)),
            },
          },
        ],
      },
    },
    buildLocalBusinessJsonLd(homeUrl),
    buildWebSiteJsonLd(),
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
        cssSelector: ['h1', '.heroUtpText', '#faq-heading', '#seo-bottom-title'],
      },
      breadcrumb: { '@id': `${homeUrl}#breadcrumb` },
      ...(faqItems.length > 0 ? { mainEntity: { '@id': `${homeUrl}#faq` } } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${homeUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: siteConfig.name,
          item: homeUrl,
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${homeUrl}#how-to`,
      name: copy.howWeWork.heading,
      description: `Як ${siteConfig.name} допомагає оновити автомобіль: оцінка, підбір, аванс та пересадка на авто класом вище.`,
      totalTime: 'P15M',
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
