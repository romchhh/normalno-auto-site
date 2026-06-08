import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'
import BlogPostPage from '../../components/BlogPostPage'
import Footer from '../../components/Footer'
import ScrollReveal from '../../components/ScrollReveal'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { buildBlogPostingJsonLd, getPostKeywords } from '@/lib/blog-seo'
import { buildArticleMetadata, buildBreadcrumbJsonLd, buildGraphJsonLd, buildWebPageJsonLd } from '@/lib/seo'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/site'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return buildArticleMetadata({
    title: post.ru.title,
    description: post.ru.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.ru.imageAlt,
    publishedTime: post.date,
    category: post.ru.category,
    keywords: getPostKeywords(post, 'ru'),
    ogTitle: post.ru.title,
  })
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(params.slug)
  const path = `/blog/${post.slug}`

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: 'CardProc', path: '/' },
    { name: 'Блог', path: '/blog' },
    { name: post.ru.title, path },
  ])

  const webPage = buildWebPageJsonLd({
    title: post.ru.title,
    description: post.ru.excerpt,
    path,
  })

  const articleSchema = buildBlogPostingJsonLd(post, 'ru')

  const relatedList = related.length > 0
    ? {
        '@type': 'ItemList',
        name: 'Читайте также',
        itemListElement: related.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.ru.title,
          url: `${siteConfig.url}/blog/${item.slug}`,
        })),
      }
    : null

  const graph = relatedList
    ? buildGraphJsonLd([breadcrumb, webPage, articleSchema, relatedList])
    : buildGraphJsonLd([breadcrumb, webPage, articleSchema])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <main>
        <ScrollReveal>
          <BlogPostPage post={post} related={related} />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}
