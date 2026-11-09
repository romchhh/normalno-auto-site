export const GTM_ID = 'GTM-WD48VHNG'

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[]
}

export function pushDataLayerEvent(
  event: string,
  payload: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...payload })
}

/** Call after a successful lead (contact form or calculator). */
export function trackLeadConversion(source: 'contact' | 'calculator' | 'modal'): void {
  pushDataLayerEvent('generate_lead', {
    lead_source: source,
    form_name: source === 'calculator' ? 'calculator' : 'contact',
  })
  pushDataLayerEvent('conversion', {
    send_to: 'google_ads',
    lead_source: source,
  })
}
