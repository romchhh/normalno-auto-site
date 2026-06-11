'use client'

import { useTranslation } from 'react-i18next'
import styles from './ContentSection.module.css'

export default function FreedomGuaranteeSection() {
  const { t } = useTranslation()
  const items = t('freedom.items', { returnObjects: true }) as string[]

  return (
    <section id="freedom" className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.inner}>
        <h2 className={`${styles.heading} ${styles.headingLight}`}>{t('freedom.heading')}</h2>
        <p className={`${styles.intro} ${styles.introLight}`}>{t('freedom.intro')}</p>

        <div className={`${styles.highlightBox} ${styles.highlightBoxDark}`}>
          <p className={`${styles.highlightTitle} ${styles.highlightTitleLight}`}>
            {t('freedom.highlight')}
          </p>
          <p className={`${styles.intro} ${styles.introLight}`} style={{ marginBottom: 16 }}>
            {t('freedom.helpLabel')}
          </p>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item} className={`${styles.listItem} ${styles.listItemLight}`}>
                <span className={`${styles.check} ${styles.checkLight}`} aria-hidden="true">✔</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
