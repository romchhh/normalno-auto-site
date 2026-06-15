import Image from 'next/image'
import { siteConfig } from '@/lib/site'
import styles from './SiteLogo.module.css'

type SiteLogoProps = {
  className?: string
  priority?: boolean
}

export default function SiteLogo({ className, priority = false }: SiteLogoProps) {
  return (
    <Image
      src={siteConfig.logoSrc}
      alt={siteConfig.name}
      width={200}
      height={44}
      priority={priority}
      className={`${styles.logo} ${className ?? ''}`}
    />
  )
}
