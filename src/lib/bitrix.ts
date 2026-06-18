type LeadPayload = {
  name: string
  phone: string
  comment?: string
  source?: 'section' | 'modal'
}

type BitrixLeadResponse = {
  result?: number
  error?: string
  error_description?: string
}

function getBitrixWebhookUrl(): string | null {
  const url = process.env.BITRIX_URL?.trim().replace(/\/$/, '')
  if (!url) return null
  return url
}

function buildLeadFields({ name, phone, comment, source }: LeadPayload) {
  const sourceLabel =
    source === 'modal' ? 'Модальне вікно' : 'Форма на сайті'

  const fields: Record<string, unknown> = {
    TITLE: `Заявка з сайту: ${name}`,
    NAME: name,
    PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
    SOURCE_ID: 'WEB',
    SOURCE_DESCRIPTION: `normalno-auto.com — ${sourceLabel}`,
  }

  const commentParts = [`Джерело: ${sourceLabel}`]
  if (comment?.trim()) {
    commentParts.unshift(comment.trim())
  }
  fields.COMMENTS = commentParts.join('\n\n')

  return fields
}

export async function sendLeadToBitrix(payload: LeadPayload): Promise<boolean> {
  const webhookUrl = getBitrixWebhookUrl()
  if (!webhookUrl) {
    console.error('Bitrix is not configured: missing BITRIX_URL')
    return false
  }

  const response = await fetch(`${webhookUrl}/crm.lead.add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: buildLeadFields(payload) }),
  })

  let data: BitrixLeadResponse
  try {
    data = await response.json()
  } catch {
    console.error('Bitrix crm.lead.add returned invalid JSON')
    return false
  }

  if (!response.ok || data.error || typeof data.result !== 'number') {
    console.error('Bitrix crm.lead.add failed:', data.error_description ?? data.error ?? response.status)
    return false
  }

  return true
}

export function isBitrixConfigured(): boolean {
  return getBitrixWebhookUrl() !== null
}
