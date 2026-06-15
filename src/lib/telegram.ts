const TELEGRAM_API = 'https://api.telegram.org'

type LeadPayload = {
  name: string
  phone: string
  comment?: string
  source?: 'section' | 'modal'
}

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return null
  }

  return { token, chatId }
}

function formatLeadMessage({ name, phone, comment, source }: LeadPayload): string {
  const sourceLabel =
    source === 'modal' ? 'Модальне вікно' : 'Форма на сайті'

  const lines = [
    '🆕 Нова заявка з сайту Нормально авто',
    '',
    `👤 Ім'я: ${name}`,
    `📞 Контакт: ${phone}`,
  ]

  if (comment?.trim()) {
    lines.push(`💬 Коментар: ${comment.trim()}`)
  }

  lines.push(`📍 Джерело: ${sourceLabel}`)

  return lines.join('\n')
}

export async function sendLeadToTelegram(payload: LeadPayload): Promise<boolean> {
  const config = getTelegramConfig()
  if (!config) {
    console.error('Telegram is not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return false
  }

  const response = await fetch(`${TELEGRAM_API}/bot${config.token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: config.chatId,
      text: formatLeadMessage(payload),
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Telegram sendMessage failed:', error)
    return false
  }

  return true
}

export function isTelegramConfigured(): boolean {
  return getTelegramConfig() !== null
}
