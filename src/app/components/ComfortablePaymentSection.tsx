'use client'

import { useTranslation } from 'react-i18next'
import styles from './ContentSection.module.css'

export default function ComfortablePaymentSection() {
  const { t } = useTranslation()
  const tools = t('payment.tools', { returnObjects: true }) as string[]

  return (
    <section id="payment" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('payment.heading')}</h2>
        <p className={styles.intro}>{t('payment.intro')}</p>

        <ul className={styles.list}>
          {tools.map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.check} aria-hidden="true">✔</span>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.resultBox}>
          <p className={styles.resultLabel}>{t('payment.resultLabel')}</p>
          <p className={styles.resultText}>{t('payment.result')}</p>
        </div>
      </div>
    </section>
  )
}
