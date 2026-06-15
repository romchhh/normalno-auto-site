'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './AboutSection.module.css'
import contentStyles from './ContentSection.module.css'

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function AboutSection() {
  const { t } = useTranslation()
  const items = t('about.items', { returnObjects: true }) as string[]

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <h2 className={styles.heading}>{t('about.heading')}</h2>
            <ul className={contentStyles.list}>
              {items.map((item) => (
                <li key={item} className={contentStyles.listItem}>
                  <span className={contentStyles.check} aria-hidden="true">✔</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.address}
            >
              <span className={styles.pin} aria-hidden="true">
                <MapPinIcon />
              </span>
              {siteConfig.address.formatted}
            </a>
            <a
              href={siteConfig.telegramBotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={contentStyles.ctaPrimary}
            >
              {t('about.cta')}
              <span className={contentStyles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </a>
          </div>

          <div className={styles.images}>
            <div className={styles.imgWrap}>
              <Image
                src="/images/image.png"
                alt={t('about.imageAlt')}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.img}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
