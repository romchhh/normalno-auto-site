'use client'

import { useTranslation } from 'react-i18next'
import styles from './FreedomGuaranteeSection.module.css'

const BADGE_VARIANTS = ['badgeOrange', 'badgeDark', 'badgeLight'] as const

export default function FreedomGuaranteeSection() {
  const { t } = useTranslation()
  const items = t('freedom.items', { returnObjects: true }) as string[]
  const descriptions = t('freedom.itemDescriptions', { returnObjects: true }) as string[]

  return (
    <section id="freedom" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('freedom.heading')}</h2>
        <p className={styles.intro}>{t('freedom.intro')}</p>

        <div className={styles.subsection}>
          <p className={styles.highlightTitle}>{t('freedom.highlight')}</p>
          <p className={styles.helpLabel}>{t('freedom.helpLabel')}</p>

          <div className={styles.grid}>
            {items.map((item, index) => (
              <article
                key={item}
                className={`${styles.card} ${index === 0 ? styles.cardFeatured : ''}`}
              >
                <span
                  className={`${styles.badge} ${styles[BADGE_VARIANTS[index]]}`}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className={styles.cardTitle}>{item}</h3>
                <p className={styles.cardDesc}>{descriptions[index]}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
