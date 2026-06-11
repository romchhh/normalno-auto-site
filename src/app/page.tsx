import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeroUtpSection from './components/HeroUtpSection'
import PainPointsSection from './components/PainPointsSection'
import HowWeWorkSection from './components/HowWeWorkSection'
import ComfortablePaymentSection from './components/ComfortablePaymentSection'
import GuaranteedExitSection from './components/GuaranteedExitSection'
import FreedomGuaranteeSection from './components/FreedomGuaranteeSection'
import FinancialPauseSection from './components/FinancialPauseSection'
import FairLeasingSection from './components/FairLeasingSection'
import AboutSection from './components/AboutSection'
import CtaSection from './components/CtaSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import SeoTextSection from './components/SeoTextSection'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import SectionBlurDivider from './components/SectionBlurDivider'
import JsonLd from './components/JsonLd'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.pages.home.title,
  description: siteConfig.pages.home.description,
  path: '/',
  locale: 'uk',
  ogTitle: siteConfig.pages.home.ogTitle,
  ogDescription: siteConfig.pages.home.description,
  keywords: siteConfig.keywords,
})

export default function Home() {
  return (
    <>
      <JsonLd locale="uk" />
      <Navbar transparent />
      <main>
        <Hero />
        <HeroUtpSection />
        <ScrollReveal><PainPointsSection /></ScrollReveal>
        <SectionBlurDivider />
        <ScrollReveal delay={80}><HowWeWorkSection /></ScrollReveal>
        <ScrollReveal delay={80}><ComfortablePaymentSection /></ScrollReveal>
        <ScrollReveal delay={80}><GuaranteedExitSection /></ScrollReveal>
        <ScrollReveal delay={80}><FreedomGuaranteeSection /></ScrollReveal>
        <ScrollReveal delay={80}><FinancialPauseSection /></ScrollReveal>
        <ScrollReveal delay={80}><FairLeasingSection /></ScrollReveal>
        <ScrollReveal delay={80}><AboutSection /></ScrollReveal>
        <ScrollReveal delay={80}><CtaSection /></ScrollReveal>
        <ScrollReveal delay={80}><FaqSection /></ScrollReveal>
        <ScrollReveal delay={80}><ContactSection /></ScrollReveal>
        <SeoTextSection />
      </main>
      <ScrollReveal delay={80}><Footer /></ScrollReveal>
    </>
  )
}
