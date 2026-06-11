'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './ContentSection.module.css'
import pageStyles from './PartnersPage.module.css'

export default function PartnersPage() {
  const { t } = useTranslation()
  const audience = t('partners.audience', { returnObjects: true }) as string[]
  const benefits = t('partners.benefits', { returnObjects: true }) as string[]

  return (
    <main className={pageStyles.main}>
      <section className={`${styles.section} ${pageStyles.hero}`}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>{t('partners.heading')}</h1>

          <p className={styles.conclusion} style={{ marginTop: 0, marginBottom: 24 }}>
            {t('partners.forLabel')}
          </p>
          <div className={styles.grid}>
            {audience.map((item) => (
              <article key={item} className={styles.card}>
                <span className={styles.check} aria-hidden="true">•</span>
                <p className={styles.cardText}>{item}</p>
              </article>
            ))}
          </div>

          <h2 className={pageStyles.subheading}>УТП</h2>
          <ul className={styles.list} style={{ marginTop: 16 }}>
            {benefits.map((item) => (
              <li key={item} className={styles.listItem}>
                <span className={styles.check} aria-hidden="true">✔</span>
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.ctaRow}>
            <a
              href={siteConfig.telegramOperatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              {t('partners.cta')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
