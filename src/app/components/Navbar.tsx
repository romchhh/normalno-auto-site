'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { stripLocalePrefix } from '@/lib/i18n/config'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { TelegramIcon } from './icons/SocialIcons'
import SiteLogo from './SiteLogo'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const lp = useLocalizedPath()
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = stripLocalePrefix(pathname) === '/'
  const hash = (id: string) => (isHome ? `#${id}` : `${lp('/')}#${id}`)
  const partnersPath = lp('/partneram')
  const isPartnersActive = stripLocalePrefix(pathname) === '/partneram'

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={styles.navShell}>
        <nav className={styles.nav} aria-label={t('footer.navLabel')}>
          <a href={lp('/')} className={styles.brand} aria-label={siteConfig.name}>
            <SiteLogo priority className={styles.logo} />
          </a>

          <div className={styles.center}>
            <a href={hash('hero')}>{t('nav.upgrade')}</a>
            <a href={partnersPath} className={isPartnersActive ? styles.activeLink : ''}>
              {t('nav.partners')}
            </a>
            <a href={hash('about')}>{t('nav.about')}</a>
            <a href={hash('kontakt')}>{t('nav.contacts')}</a>
          </div>

          <div className={styles.actions}>
            <a
              href={siteConfig.telegramChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.telegramBtn}
              aria-label={t('nav.telegram')}
            >
              <TelegramIcon />
            </a>

            <a
              href={siteConfig.telegramBotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cta} ${styles.ctaDesktop}`}
            >
              {t('nav.cta')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </a>

            <div className={styles.mobileRight}>
              <a
                href={siteConfig.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.telegramBtn} ${styles.telegramBtnMobile}`}
                aria-label={t('nav.cta')}
              >
                <TelegramIcon />
              </a>
              <button className={styles.hamburger} onClick={() => setMenuOpen(true)} aria-label={t('nav.openMenu')}>
                <span/><span/><span/>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <div className={styles.drawerHeader}>
          <a
            href={lp('/')}
            className={styles.drawerBrand}
            aria-label={siteConfig.name}
            onClick={() => setMenuOpen(false)}
          >
            <SiteLogo className={styles.drawerLogo} />
          </a>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label={t('nav.closeMenu')}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 4 L24 24 M24 4 L4 24"/>
            </svg>
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label={t('footer.navLabel')}>
          <a href={hash('hero')} onClick={() => setMenuOpen(false)}>{t('nav.upgrade')}</a>
          <a href={partnersPath} onClick={() => setMenuOpen(false)}>{t('nav.partners')}</a>
          <a href={hash('about')} onClick={() => setMenuOpen(false)}>{t('nav.about')}</a>
          <a href={hash('kontakt')} onClick={() => setMenuOpen(false)}>{t('nav.contacts')}</a>
        </nav>

        <a
          href={siteConfig.telegramBotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.drawerCta}
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.cta')}
        </a>
      </div>
    </>
  )
}
