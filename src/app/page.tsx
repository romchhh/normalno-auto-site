import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SpecialistsSection from './components/SpecialistsSection'
import StatsSection from './components/StatsSection'
import ServicesSection from './components/ServicesSection'
import AdvantagesSection from './components/AdvantagesSection'
import AccountsSection from './components/AccountsSection'
import HowWeWorkSection from './components/HowWeWorkSection'
import ClientsSection from './components/ClientsSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.titleRu,
  description: siteConfig.descriptionRu,
  path: '/',
  ogTitle: siteConfig.titleRu,
})

export default function Home() {
  return (
    <>
      <Navbar transparent />
      <main>
        <Hero />
        <ScrollReveal><StatsSection /></ScrollReveal>
        <ScrollReveal delay={80}><ServicesSection /></ScrollReveal>
        <ScrollReveal delay={80}><AdvantagesSection /></ScrollReveal>
        <ScrollReveal delay={80}><HowWeWorkSection /></ScrollReveal>
        <ScrollReveal delay={80}><AccountsSection /></ScrollReveal>
        <ScrollReveal delay={80}><SpecialistsSection /></ScrollReveal>
        <ScrollReveal delay={80}><ClientsSection /></ScrollReveal>
        <ScrollReveal delay={80}><FaqSection /></ScrollReveal>
        <ScrollReveal delay={80}><ContactSection /></ScrollReveal>
      </main>
      <ScrollReveal delay={80}><Footer /></ScrollReveal>
    </>
  )
}
