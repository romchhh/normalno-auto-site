'use client'

import { useTranslation } from 'react-i18next'
import styles from './ContentSection.module.css'

export default function FairLeasingSection() {
  const { t } = useTranslation()
  const rules = t('fairLeasing.rules', { returnObjects: true }) as string[]

  return (
    <section id="fair-leasing" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('fairLeasing.heading')}</h2>
        <p className={styles.intro}>{t('fairLeasing.intro')}</p>
        <p className={styles.conclusion} style={{ marginTop: 0, marginBottom: 24 }}>
          {t('fairLeasing.rulesLabel')}
        </p>

        <div className={styles.grid}>
          {rules.map((rule) => (
            <article key={rule} className={styles.card}>
              <span className={styles.check} aria-hidden="true">✔</span>
              <p className={styles.cardText}>{rule}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
