'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './CtaSection.module.css'

const CAR_CARDS = [
  { title: 'Лізинг нових авто', bg: '#fff7ed', image: '/images/autos/new-car.webp' },
  { title: 'Лізинг авто з пробігом', bg: '#ffedd5', active: true, image: '/images/autos/car-in-use.webp' },
  { title: 'Лізинг електромобілів', bg: '#fff7ed', image: '/images/autos/e-cars.webp' },
  { title: 'Лізинг причепів та трейлерів', bg: '#fff7ed', image: '/images/autos/trailers.webp' },
  { title: 'Лізинг комерційних авто', bg: '#fff7ed', image: '/images/autos/commercial.webp' },
  { title: 'Лізинг мікроавтобусів', bg: '#fff7ed', image: '/images/autos/micro-bus.webp' },
] as const

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12 L12 2 M5 2 H12 V9" />
    </svg>
  )
}

export default function CtaSection() {
  const { t } = useTranslation()

  return (
    <section id="cta" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h2 className={styles.heading}>{t('cta.heading')}</h2>
            <p className={styles.description}>{t('cta.description')}</p>

            <div className={styles.actions}>
              <a
                href={siteConfig.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                {t('cta.primary')}
              </a>
              <a
                href={siteConfig.telegramChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                {t('cta.secondary')}
              </a>
            </div>
          </div>

          <div className={styles.decor}>
            {CAR_CARDS.map((item) => (
              <a
                key={item.title}
                href={siteConfig.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.decorTile} ${'active' in item && item.active ? styles.decorTileActive : ''}`}
                style={{ backgroundColor: item.bg }}
                aria-label={`${item.title} — розрахувати в Telegram`}
              >
                <div className={styles.decorImageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 900px) 30vw, 160px"
                    className={styles.decorImage}
                  />
                </div>
                <div className={styles.decorFooter}>
                  <span className={styles.decorLabel}>{item.title}</span>
                  <span className={styles.decorArrow}>
                    <ArrowIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
