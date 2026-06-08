import blogData from '@/data/blog.json'

export type BlogLocalePost = {
  title: string
  excerpt: string
  category: string
  readTime: string
  imageAlt: string
  body: string
}

export type BlogPost = {
  slug: string
  date: string
  image: string
  ru: BlogLocalePost
  en: BlogLocalePost
}

export type BlogPostView = BlogLocalePost & {
  slug: string
  date: string
  image: string
}

export type BlogLocale = 'ru' | 'en'

const posts = blogData.posts as BlogPost[]

export function localizePost(post: BlogPost, locale: BlogLocale): BlogPostView {
  return {
    slug: post.slug,
    date: post.date,
    image: post.image,
    ...post[locale],
  }
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPostViews(locale: BlogLocale): BlogPostView[] {
  return getAllPosts().map((post) => localizePost(post, locale))
}

export function getPostView(slug: string, locale: BlogLocale): BlogPostView | undefined {
  const post = getPostBySlug(slug)
  return post ? localizePost(post, locale) : undefined
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts().filter((post) => post.slug !== slug).slice(0, limit)
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug)
}

export function formatBlogDate(date: string, locale: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  return parsed.toLocaleDateString(locale === 'en' ? 'en-GB' : 'ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
