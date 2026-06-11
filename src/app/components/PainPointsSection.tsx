'use client'

import { useTranslation } from 'react-i18next'
import styles from './PainPointsSection.module.css'

export default function PainPointsSection() {
  const { t } = useTranslation()
  const items = t('painPoints.items', { returnObjects: true }) as string[]

  return (
    <section id="pain-points" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('painPoints.heading')}</h2>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.bullet} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 7.5 L5.5 10.5 L11.5 3.5" />
                </svg>
              </span>
              <span className={styles.listText}>{item}</span>
            </li>
          ))}
        </ul>

        <p className={styles.conclusion}>{t('painPoints.conclusion')}</p>
      </div>
    </section>
  )
}
