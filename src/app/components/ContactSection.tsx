'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { InstagramIcon, TelegramIcon, TikTokIcon } from './icons/SocialIcons'
import ContactForm from './ContactForm'
import styles from './ContactSection.module.css'

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    key: 'telegramOperator' as const,
    href: siteConfig.telegramBotUrl,
    icon: TelegramIcon,
    iconClass: styles.socialIconTelegram,
  },
  {
    key: 'telegramChannel' as const,
    href: siteConfig.telegramChannelUrl,
    icon: TelegramIcon,
    iconClass: styles.socialIconTelegram,
  },
  {
    key: 'instagram' as const,
    href: siteConfig.instagramUrl,
    icon: InstagramIcon,
    iconClass: styles.socialIconInstagram,
  },
  {
    key: 'tiktok' as const,
    href: siteConfig.tiktokUrl,
    icon: TikTokIcon,
    iconClass: styles.socialIconTiktok,
  },
] as const

export default function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="kontakt" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.card} ${styles.left}`}>
          <h2 className={styles.heading}>{t('contact.heading')}</h2>

          <div className={styles.contacts}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('contact.addressLabel')}</span>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactValue}
              >
                <span className={styles.valueIcon} aria-hidden="true">
                  <MapPinIcon />
                </span>
                {siteConfig.address.formatted}
              </a>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('contact.emailLabel')}</span>
              <a href={`mailto:${siteConfig.email}`} className={styles.contactValue}>
                <span className={styles.valueIcon} aria-hidden="true">
                  <MailIcon />
                </span>
                {siteConfig.email}
              </a>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('contact.phoneLabel')}</span>
              <a href={`tel:${siteConfig.phone}`} className={styles.contactValue}>
                <span className={styles.valueIcon} aria-hidden="true">
                  <PhoneIcon />
                </span>
                {siteConfig.phone}
              </a>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('contact.socialLabel')}</span>
              <ul className={styles.socialList}>
                {SOCIAL_LINKS.map(({ key, href, icon: Icon, iconClass }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      <span className={`${styles.socialIcon} ${iconClass}`}>
                        <Icon size={20} />
                      </span>
                      {t(`footer.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.right}`}>
          <p className={styles.subheading}>{t('contact.subheading')}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
