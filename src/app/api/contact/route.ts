import { NextResponse } from 'next/server'
import { isBitrixConfigured, sendLeadToBitrix } from '@/lib/bitrix'
import { isTelegramConfigured, sendLeadToTelegram } from '@/lib/telegram'

const MAX_NAME = 120
const MAX_PHONE = 80
const MAX_COMMENT = 2000

type ContactBody = {
  name?: string
  phone?: string
  comment?: string
  source?: 'section' | 'modal'
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export async function POST(request: Request) {
  if (!isBitrixConfigured() && !isTelegramConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: ContactBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = trimField(body.name, MAX_NAME)
  const phone = trimField(body.phone, MAX_PHONE)
  const comment = trimField(body.comment, MAX_COMMENT)
  const source = body.source === 'modal' ? 'modal' : 'section'

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  const payload = { name, phone, comment, source }

  if (isBitrixConfigured()) {
    const created = await sendLeadToBitrix(payload)
    if (!created) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
    }
  }

  if (isTelegramConfigured()) {
    await sendLeadToTelegram(payload)
  }

  return NextResponse.json({ ok: true })
}
