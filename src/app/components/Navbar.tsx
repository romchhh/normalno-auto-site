'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { useContactModal } from './ContactModalProvider'
import { TelegramIcon } from './icons/SocialIcons'
import LangSwitcher from './LangSwitcher'
import styles from './Navbar.module.css'

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'
  const hash = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isDark = !isHome || !transparent || scrolled

  return (
    <>
      <nav className={`${styles.nav} ${isDark ? styles.solid : styles.transparent} ${isDark ? styles.navDark : styles.navLight}`}>
        <a href="/" className={styles.brand}>Card<span>Proc</span></a>

        <div className={styles.center}>
          <a href={hash('specialists')}>{t('nav.about')}</a>
          <a href={hash('services')}>{t('nav.services')}</a>
          <a href={hash('clients')}>{t('nav.clients')}</a>
          <a href="/blog" className={pathname === '/blog' ? styles.activeLink : ''}>{t('nav.blog')}</a>
        </div>

        <div className={styles.actions}>
          <a
            href={siteConfig.telegramOperatorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramBtn}
            aria-label={t('nav.telegram')}
          >
            <TelegramIcon />
          </a>

          <button
            type="button"
            className={styles.contactIconBtn}
            onClick={openContactModal}
            aria-label={t('nav.openContact')}
          >
            <span className={styles.contactIconArrow} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>

          <div className={styles.desktopRight}>
            <LangSwitcher light={!isDark} />
            <button type="button" className={styles.cta} onClick={openContactModal}>
              {t('nav.cta')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </button>
          </div>

          <button className={styles.hamburger} onClick={() => setMenuOpen(true)} aria-label={t('nav.openMenu')}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label={t('nav.closeMenu')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 4 L24 24 M24 4 L4 24"/>
          </svg>
        </button>

        <a href={hash('specialists')} onClick={() => setMenuOpen(false)}>{t('nav.about')}</a>
        <a href={hash('services')} onClick={() => setMenuOpen(false)}>{t('nav.services')}</a>
        <a href={hash('clients')} onClick={() => setMenuOpen(false)}>{t('nav.clients')}</a>
        <a href="/blog" onClick={() => setMenuOpen(false)}>{t('nav.blog')}</a>
        <button
          type="button"
          className={styles.drawerCta}
          onClick={() => { setMenuOpen(false); openContactModal() }}
        >
          {t('nav.cta')}
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>
        <LangSwitcher variant="drawer" />
      </div>
    </>
  )
}
