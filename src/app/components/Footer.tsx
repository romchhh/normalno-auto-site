'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { TelegramIcon, SupportIcon } from './icons/SocialIcons'
import { useContactModal } from './ContactModalProvider'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { key: 'upgrade', hash: 'hero' },
  { key: 'partners', path: '/partneram' },
  { key: 'about', hash: 'about' },
  { key: 'contacts', hash: 'kontakt' },
] as const

export default function Footer() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()
  const year = new Date().getFullYear()

  const contactItems = [
    {
      key: 'telegramChannel' as const,
      href: siteConfig.telegramChannelUrl,
      icon: <TelegramIcon size={20} />,
      iconClass: styles.contactIconTelegram,
    },
    {
      key: 'telegramOperator' as const,
      href: siteConfig.telegramOperatorUrl,
      icon: <TelegramIcon size={20} />,
      iconClass: styles.contactIconTelegram,
    },
    {
      key: 'support247' as const,
      icon: <SupportIcon size={20} />,
      iconClass: styles.contactIconSupport,
      onClick: openContactModal,
    },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <a href={lp('/')} className={styles.brand}>
            <span className={styles.brandBold}>{t('footer.brandBold')}</span>
            <span className={styles.brandRegular}>{t('footer.brandRegular')}</span>
          </a>
          <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
          <p className={styles.legal}>{t('footer.legal')}</p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t('footer.infoHeading')}</h3>
          <nav className={styles.nav} aria-label={t('footer.navLabel')}>
            {NAV_LINKS.map((item) => (
              <a
                key={item.key}
                href={'path' in item ? lp(item.path) : `${lp('/')}#${item.hash}`}
              >
                {t(`footer.${item.key}`)}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t('footer.contactHeading')}</h3>
          <ul className={styles.contacts}>
            {contactItems.map(({ key, icon, iconClass, ...item }) => (
              <li key={key}>
                <span className={`${styles.contactIcon} ${iconClass}`}>{icon}</span>
                {'onClick' in item && item.onClick ? (
                  <button type="button" className={styles.contactLink} onClick={item.onClick}>
                    {t(`footer.${key}`)}
                  </button>
                ) : (
                  <a
                    href={'href' in item ? item.href : '#'}
                    className={styles.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`footer.${key}`)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.col} ${styles.colAbout}`}>
          <h3 className={styles.heading}>{t('footer.aboutHeading')}</h3>
          <p className={styles.aboutText}>{t('footer.aboutText')}</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <a href={lp('/privacy')}>{t('footer.privacy')}</a>
        <span className={styles.credit}>
          {t('footer.developedBy')}{' '}
          <a href="https://telebots.site" target="_blank" rel="noopener noreferrer">
            TeleBots
          </a>
        </span>
      </div>
    </footer>
  )
}
