import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { buildPageMetadata } from '@/lib/seo'
import styles from './not-found.module.css'

export const metadata = buildPageMetadata({
  title: 'Сторінку не знайдено',
  description: 'Запитана сторінка не існує. Поверніться на головну Нормально авто.',
  path: '/404',
  locale: 'uk',
  noIndex: true,
})

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
        <p className={styles.desc}>
          Можливо, посилання застаріло або сторінку було переміщено.
        </p>
        <div className={styles.actions}>
          <Link href="/uk" className={styles.primary}>
            На головну
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
