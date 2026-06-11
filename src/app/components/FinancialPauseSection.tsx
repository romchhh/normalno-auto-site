'use client'

import { useTranslation } from 'react-i18next'
import styles from './ContentSection.module.css'

export default function FinancialPauseSection() {
  const { t } = useTranslation()
  const items = t('pause.items', { returnObjects: true }) as string[]

  return (
    <section id="pause" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('pause.heading')}</h2>
        <p className={styles.intro}>{t('pause.intro')}</p>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.check} aria-hidden="true">✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
