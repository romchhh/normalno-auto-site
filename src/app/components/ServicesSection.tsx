'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useContactModal } from './ContactModalProvider'
import styles from './ServicesSection.module.css'

const PROCESSING_ITEMS = ['api', 'cloaking', 'invoice'] as const
const FINTECH_ITEMS = ['revolut', 'wise', 'airwallex', 'other'] as const
const JURISDICTIONS = ['gb', 'hk', 'cy', 'pl', 'ee', 'cz'] as const

const FINTECH_LOGOS = [
  { key: 'revolut', src: '/images/logos/revolut.png', alt: 'Revolut' },
  { key: 'wise', src: '/images/logos/wise.png', alt: 'Wise' },
  { key: 'airwallex', src: '/images/logos/airwallex.png', alt: 'Airwallex' },
] as const

export default function ServicesSection() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('services.heading')}</h2>

        <div className={styles.grid}>
          <div className={styles.topRow}>
          {/* Complex solutions */}
          <article className={styles.card}>
            <h3 className={styles.title}>{t('services.complex.title')}</h3>
            <p className={styles.desc}>{t('services.complex.desc')}</p>
            <div className={styles.cardFooter}>
              <a href="#kontakt" className={styles.more}>
                {t('services.more')}
                <span className={styles.moreArrow} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6 H10 M7 3 L10 6 L7 9" />
                  </svg>
                </span>
              </a>
              <div className={styles.flags} aria-label={t('services.complex.jurisdictionsLabel')}>
                {JURISDICTIONS.map((code) => (
                  <span key={code} className={styles.flag} title={t(`services.complex.flags.${code}`)}>
                    {t(`services.complex.flags.${code}`)}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Payment processing */}
          <article className={styles.card}>
            <h3 className={styles.title}>{t('services.processing.title')}</h3>
            <p className={styles.rate}>
              <strong>{t('services.processing.rate')}</strong>
              {t('services.processing.rateSuffix')}
            </p>
            <ul className={styles.list}>
              {PROCESSING_ITEMS.map((key) => (
                <li key={key}>{t(`services.processing.items.${key}`)}</li>
              ))}
            </ul>
            <a href="#kontakt" className={styles.more}>
              {t('services.more')}
              <span className={styles.moreArrow} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6 H10 M7 3 L10 6 L7 9" />
                </svg>
              </span>
            </a>
          </article>
          </div>

          <div className={styles.bottomRow}>
          {/* Fintech accounts */}
          <article className={styles.card}>
            <h3 className={styles.title}>{t('services.fintech.title')}</h3>
            <ul className={styles.list}>
              {FINTECH_ITEMS.map((key) => (
                <li key={key}>{t(`services.fintech.items.${key}`)}</li>
              ))}
            </ul>
            <div className={styles.cardFooter}>
              <a href="#kontakt" className={styles.more}>
                {t('services.more')}
                <span className={styles.moreArrow} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6 H10 M7 3 L10 6 L7 9" />
                  </svg>
                </span>
              </a>
              <div className={styles.fintechLogos}>
                {FINTECH_LOGOS.map(({ key, src, alt }) => (
                  <Image
                    key={key}
                    src={src}
                    alt={alt}
                    width={key === 'revolut' ? 44 : 52}
                    height={key === 'revolut' ? 44 : 52}
                    className={`${styles.fintechLogo} ${key === 'revolut' ? styles.fintechLogoRevolut : ''}`}
                  />
                ))}
              </div>
            </div>
          </article>

          {/* Support */}
          <article className={`${styles.card} ${styles.cardSupport}`}>
            <h3 className={styles.title}>{t('services.support.title')}</h3>
            <p className={styles.desc}>{t('services.support.desc')}</p>
            <button type="button" className={styles.cta} onClick={openContactModal}>
              {t('services.support.cta')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </button>
            <div className={styles.telegramBg} aria-hidden="true">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 L11 13 M22 2 L15 22 L11 13 L2 9 Z" />
              </svg>
            </div>
          </article>
          </div>
        </div>
      </div>
    </section>
  )
}
