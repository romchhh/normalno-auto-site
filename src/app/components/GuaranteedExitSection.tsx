'use client'

import { useTranslation } from 'react-i18next'
import styles from './ContentSection.module.css'

export default function GuaranteedExitSection() {
  const { t } = useTranslation()
  const options = t('exit.options', { returnObjects: true }) as string[]

  return (
    <section id="exit" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('exit.heading')}</h2>
        <p className={styles.intro}>{t('exit.intro')}</p>

        <div className={styles.grid}>
          {options.map((option) => (
            <article key={option} className={styles.card}>
              <span className={styles.check} aria-hidden="true">✔</span>
              <p className={styles.cardText}>{option}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
