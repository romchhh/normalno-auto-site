'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './PartnersPage.module.css'

function AudienceIcon({ index }: { index: number }) {
  const props = {
    width: 44,
    height: 44,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (index) {
    case 1:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    case 2:
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 3:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 4:
      return (
        <svg {...props}>
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
          <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
        </svg>
      )
  }
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12 L12 2 M5 2 H12 V9" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 7.5 L5.5 10.5 L11.5 3.5" />
    </svg>
  )
}

export default function PartnersPage() {
  const { t } = useTranslation()
  const audience = t('partners.audience', { returnObjects: true }) as string[]
  const benefits = t('partners.benefits', { returnObjects: true }) as string[]

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeading}>{t('partners.heading')}</h1>
            <p className={styles.heroIntro}>{t('partners.intro')}</p>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.commissionCard}>
              <span className={styles.commissionValue}>{t('partners.commissionValue')}</span>
              <span className={styles.commissionLabel}>{t('partners.commissionLabel')}</span>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src="/images/autos/car-in-use.webp"
                alt=""
                fill
                sizes="(max-width: 900px) 80vw, 360px"
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.audienceSection} aria-labelledby="partners-audience-title">
        <div className={styles.inner}>
          <h2 id="partners-audience-title" className={styles.sectionHeading}>
            {t('partners.audienceTitle')}
          </h2>
          <div className={styles.audienceGrid}>
            {audience.map((item, index) => (
              <article key={item} className={styles.audienceCard}>
                <span className={styles.audienceIcon} aria-hidden="true">
                  <AudienceIcon index={index} />
                </span>
                <p className={styles.audienceText}>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection} aria-labelledby="partners-benefits-title">
        <div className={styles.inner}>
          <h2 id="partners-benefits-title" className={styles.sectionHeading}>
            {t('partners.benefitsTitle')}
          </h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((item) => (
              <article key={item} className={styles.benefitCard}>
                <span className={styles.benefitCheck} aria-hidden="true">
                  <CheckIcon />
                </span>
                <p className={styles.benefitText}>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="partners-cta-title">
        <div className={styles.inner}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2 id="partners-cta-title" className={styles.ctaHeading}>
                {t('partners.ctaTitle')}
              </h2>
              <p className={styles.ctaDescription}>{t('partners.ctaDescription')}</p>
              <div className={styles.ctaActions}>
                <a
                  href={siteConfig.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                >
                  {t('partners.cta')}
                  <span className={styles.ctaArrow} aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </a>
                <a
                  href={siteConfig.telegramChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondary}
                >
                  {t('partners.ctaSecondary')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
