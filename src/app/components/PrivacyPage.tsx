'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './PrivacyPage.module.css'

type PrivacySection = {
  title: string
  body: string
}

export default function PrivacyPage() {
  const { t } = useTranslation()
  const sections = t('privacy.sections', { returnObjects: true }) as PrivacySection[]

  return (
    <div className={styles.page}>
      <article className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('privacy.title')}</h1>
          <p className={styles.updated}>{t('privacy.updated')}</p>
        </header>

        <div className={styles.sections}>
          {sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.paragraphs}>
                <p>{section.body}</p>
                {section.title.includes('Контакт') && (
                  <p>
                    <a href={`mailto:${siteConfig.email}`} className={styles.contactLink}>
                      {siteConfig.email}
                    </a>
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
