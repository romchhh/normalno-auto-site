'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { formatBlogDate, getAllPostViews } from '@/lib/blog'
import { useLocale, useLocalizedPath } from '@/lib/i18n/use-locale'
import ScrollReveal from './ScrollReveal'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const posts = getAllPostViews(locale)

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <ScrollReveal>
          <header className={styles.header}>
            <h1 className={styles.title}>{t('blog.title')}</h1>
            <p className={styles.description}>{t('blog.description')}</p>
          </header>
        </ScrollReveal>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={(index % 2) * 100}>
            <Link href={lp(`/blog/${post.slug}`)} className={styles.card}>
              <div className={styles.cardImgWrap}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardMeta}>
                  <time dateTime={post.date}>{formatBlogDate(post.date, locale)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </p>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <span className={styles.readMore}>
                  {t('blog.readMore')}
                  <span className={styles.readMoreArrow} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12 L12 2 M5 2 H12 V9" />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
