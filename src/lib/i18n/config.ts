export const locales = ['uk'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'uk'

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localePath(path: string, _locale?: Locale): string {
  if (!path || path === '/') return '/'
  return path.startsWith('/') ? path : `/${path}`
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1)
    }
  }
  return pathname
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0]
  return segment && isValidLocale(segment) ? segment : null
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localePath(stripLocalePrefix(pathname), locale)
}

export function localeOgLocale(locale: Locale): string {
  return locale === 'uk' ? 'uk_UA' : 'uk_UA'
}
