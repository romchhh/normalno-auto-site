export const GTM_ID = 'GTM-WD48VHNG'
export const GOOGLE_ADS_ID = 'AW-18558540832'
/** Conversion: Заявка на автолизинг — сайт */
export const GOOGLE_ADS_CONVERSION_SEND_TO = 'AW-18558540832/TeyYCOTdh7UdEKC4s5FF'

type GtagArgs = unknown[]

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: GtagArgs) => void
  gtag_report_conversion?: (url?: string) => boolean
}

function getAnalyticsWindow(): AnalyticsWindow | null {
  if (typeof window === 'undefined') return null
  return window as AnalyticsWindow
}

export function pushDataLayerEvent(
  event: string,
  payload: Record<string, unknown> = {}
): void {
  const w = getAnalyticsWindow()
  if (!w) return
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...payload })
}

/**
 * Google Ads conversion snippet for «Заявка на автолизинг — сайт».
 * Optional url: navigate after the hit is sent (link clicks).
 */
export function gtagReportConversion(url?: string): boolean {
  const w = getAnalyticsWindow()
  if (!w) return false

  const callback = () => {
    if (typeof url !== 'undefined' && url) {
      w.location = url
    }
  }

  if (typeof w.gtag === 'function') {
    w.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      event_callback: callback,
    })
  } else {
    // Fallback if gtag not ready yet — still push for GTM listeners
    pushDataLayerEvent('conversion', {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
    })
    callback()
  }

  return false
}

/** Call after a successful lead (contact form or calculator). */
export function trackLeadConversion(source: 'contact' | 'calculator' | 'modal'): void {
  pushDataLayerEvent('generate_lead', {
    lead_source: source,
    form_name: source === 'calculator' ? 'calculator' : 'contact',
  })
  gtagReportConversion()
}
