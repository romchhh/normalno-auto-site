'use client'

import { useTranslation } from 'react-i18next'
import styles from './HeroUtpSection.module.css'

const HIGHLIGHTS = ['price', 'payment', 'exit'] as const

export default function HeroUtpSection() {
  const { t } = useTranslation()

  return (
    <section className={styles.section} aria-label={t('hero.utpAria')}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <p className={styles.text}>{t('hero.badge')}</p>

          <div className={styles.highlights}>
            {HIGHLIGHTS.map((key) => (
              <div key={key} className={styles.highlight}>
                <span className={styles.highlightValue}>{t(`hero.highlights.${key}.value`)}</span>
                <span className={styles.highlightLabel}>{t(`hero.highlights.${key}.label`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
