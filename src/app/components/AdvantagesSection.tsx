'use client'

import { useTranslation } from 'react-i18next'
import styles from './AdvantagesSection.module.css'

const ITEMS = ['uptime', 'accounts', 'tax', 'crm', 'niches', 'withdrawals'] as const

function Icon({ type }: { type: typeof ITEMS[number] }) {
  const icons: Record<typeof ITEMS[number], React.ReactNode> = {
    uptime: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7 V12 L15 14" />
      </svg>
    ),
    accounts: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2 L20 6 V12 C20 16.4 16.8 20.2 12 21 C7.2 20.2 4 16.4 4 12 V6 Z" />
        <path d="M9 12 L11 14 L15 10" />
      </svg>
    ),
    tax: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 4 L20 4 L18 20 L6 20 L4 4 L10 4" />
        <path d="M9 9 H15 M9 13 H15 M9 17 H12" />
      </svg>
    ),
    crm: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 16 V11 M12 16 V8 M17 16 V13" />
      </svg>
    ),
    niches: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7 V5 C8 3.9 8.9 3 10 3 H14 C15.1 3 16 3.9 16 5 V7" />
        <path d="M3 12 H21" />
      </svg>
    ),
    withdrawals: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 V14" />
        <path d="M8 10 L12 14 L16 10" />
        <path d="M5 17 C5 19 8 21 12 21 C16 21 19 19 19 17" />
      </svg>
    ),
  }

  return <span className={styles.iconBox}>{icons[type]}</span>
}

export default function AdvantagesSection() {
  const { t } = useTranslation()

  return (
    <section id="advantages" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('advantages.heading')}</h2>

        <div className={styles.blocks}>
          {ITEMS.map((key) => (
            <article key={key} className={styles.block}>
              <Icon type={key} />
              <div className={styles.blockContent}>
                <h3 className={styles.title}>{t(`advantages.${key}.title`)}</h3>
                <p className={styles.desc}>{t(`advantages.${key}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
