import { NextResponse } from 'next/server'
import { isBitrixConfigured, sendCalculatorLeadToBitrix } from '@/lib/bitrix'
import { isTelegramConfigured, sendLeadToTelegram } from '@/lib/telegram'
import type { CalculatorState, StartOption } from '@/lib/calculator/types'

const MAX_NAME = 120
const MAX_PHONE = 80

type CalculatorBody = {
  name?: string
  phone?: string
  state?: Partial<CalculatorState>
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function asNumber(value: unknown, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : fallback
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string').slice(0, 20)
}

function normalizeStartOption(value: unknown): StartOption | undefined {
  if (value === 'has-car' || value === 'has-cash' || value === 'has-both') return value
  return undefined
}

function normalizeState(raw: Partial<CalculatorState> | undefined): CalculatorState {
  return {
    step: 'strategy',
    startOption: normalizeStartOption(raw?.startOption),
    currentCarBrand: typeof raw?.currentCarBrand === 'string' ? raw.currentCarBrand.slice(0, 80) : undefined,
    currentCarModel: typeof raw?.currentCarModel === 'string' ? raw.currentCarModel.slice(0, 80) : undefined,
    currentCarYear: raw?.currentCarYear ? asNumber(raw.currentCarYear) : undefined,
    currentCarMileage: raw?.currentCarMileage ? asNumber(raw.currentCarMileage) : undefined,
    currentCarPrice: asNumber(raw?.currentCarPrice),
    additionalCash: asNumber(raw?.additionalCash),
    monthlyPayment: asNumber(raw?.monthlyPayment, 18000),
    termMonths: asNumber(raw?.termMonths, 36),
    motivations: asStringArray(raw?.motivations),
    bodyTypes: asStringArray(raw?.bodyTypes),
    brands: asStringArray(raw?.brands),
    maxBudget: raw?.maxBudget != null ? asNumber(raw.maxBudget) : undefined,
    totalStartBudget: raw?.totalStartBudget != null ? asNumber(raw.totalStartBudget) : undefined,
    budgetProfile: raw?.budgetProfile,
  }
}

export async function POST(request: Request) {
  if (!isBitrixConfigured() && !isTelegramConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: CalculatorBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = trimField(body.name, MAX_NAME)
  const phone = trimField(body.phone, MAX_PHONE)

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  const state = normalizeState(body.state)

  if (isBitrixConfigured()) {
    const created = await sendCalculatorLeadToBitrix({ name, phone, state })
    if (!created) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
    }
  }

  if (isTelegramConfigured()) {
    const comment = [
      'Калькулятор сайту',
      `Платіж: ${state.monthlyPayment} грн/міс`,
      `Строк: ${state.termMonths} міс`,
      state.maxBudget != null ? `Бюджет: $${state.maxBudget}` : null,
      state.totalStartBudget != null
        ? `На старті: ${state.totalStartBudget.toLocaleString('uk-UA')} грн`
        : null,
    ]
      .filter(Boolean)
      .join('\n')

    await sendLeadToTelegram({
      name,
      phone,
      comment,
      source: 'section',
    })
  }

  return NextResponse.json({ ok: true })
}
