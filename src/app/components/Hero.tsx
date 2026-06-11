'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="/images/hero-auto.jpg"
          alt={t('seo.heroImageAlt')}
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.body}>
        <div className={styles.mainRow}>
          <div className={styles.textBlock}>
            <div className={styles.heroCenter}>
              <h1 className={styles.headline}>
                {t('hero.headline')}
              </h1>

              <p className={styles.lead}>{t('hero.description')}</p>
            </div>
          </div>

          <a
            href={siteConfig.telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>{t('hero.cardLabel')}</p>
              <p className={styles.cardHighlight}>{t('hero.cardHighlight')}</p>
              <p className={styles.cardSub}>{t('hero.cardSub')}</p>
            </div>
            <div className={styles.cardArrow}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
