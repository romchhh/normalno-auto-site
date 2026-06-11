'use client'

import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './HowWeWorkSection.module.css'

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const

function HorizontalArrow() {
  return (
    <span className={styles.arrowHorizontal} aria-hidden="true">
      <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10 H78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={styles.arrowLine} />
        <path d="M70 4 L94 10 L70 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowHead} />
      </svg>
    </span>
  )
}

function VerticalArrow() {
  return (
    <span className={styles.arrowVertical} aria-hidden="true">
      <svg viewBox="0 0 20 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2 V78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={styles.arrowLine} />
        <path d="M4 70 L10 94 L16 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowHead} />
      </svg>
    </span>
  )
}

export default function HowWeWorkSection() {
  const { t } = useTranslation()

  return (
    <section id="how-we-work" className={`${styles.section} ${styles.sectionBlurEdge}`}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('howWeWork.heading')}</h2>

        <div className={styles.steps}>
          <div className={styles.numbersTrack} aria-hidden="true">
            {STEPS.map((key, index) => (
              <Fragment key={`track-${key}`}>
                <div className={styles.trackNumber}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {index < STEPS.length - 1 && <HorizontalArrow />}
              </Fragment>
            ))}
          </div>

          <div className={styles.contentTrack}>
            {STEPS.map((key, index) => (
              <article key={key} className={styles.step}>
                <div className={styles.numberCol}>
                  <span className={`${styles.number} ${styles.numberMobile}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < STEPS.length - 1 && <VerticalArrow />}
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{t(`howWeWork.${key}.title`)}</h3>
                  <p className={styles.desc}>{t(`howWeWork.${key}.desc`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
