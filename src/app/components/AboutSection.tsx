'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './AboutSection.module.css'
import contentStyles from './ContentSection.module.css'

export default function AboutSection() {
  const { t } = useTranslation()
  const items = t('about.items', { returnObjects: true }) as string[]

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('about.heading')}</h2>

        <div className={styles.layout}>
          <div className={styles.content}>
            <ul className={contentStyles.list}>
              {items.map((item) => (
                <li key={item} className={contentStyles.listItem}>
                  <span className={contentStyles.check} aria-hidden="true">✔</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.address}>{t('about.address')}</p>
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
                src="/images/hero-auto.png"
                alt={t('about.heading')}
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
