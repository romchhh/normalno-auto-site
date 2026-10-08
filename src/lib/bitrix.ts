import { convertUAHToUSD, convertUSDToUAH } from '@/lib/currency'
import {
  resolveBodyTypeLabels,
  resolveBrandLabels,
  resolveMotivationLabels,
} from '@/lib/calculator/config'
import type { CalculatorState } from '@/lib/calculator/types'

type ContactLeadPayload = {
  name: string
  phone: string
  comment?: string
  source?: 'section' | 'modal'
}

export type CalculatorLeadPayload = {
  name: string
  phone: string
  state: CalculatorState
}

type BitrixLeadResponse = {
  result?: number
  error?: string
  error_description?: string
}

/** UF fields aligned with normalno-app wizard Bitrix mapping */
export const BITRIX_LEAD_FIELDS = {
  TELEGRAM_ID: 'UF_CRM_TELEGRAMID_WZ',
  TELEGRAM_USERNAME: 'UF_CRM_TELEGRAMUSERNAME_WZ',
  CURRENT_CAR: 'UF_CRM_LEAD_1700666250717',
  CURRENT_CAR_SUMMARY: 'UF_CRM_1637597123912',
  CURRENT_CAR_PRICE: 'UF_CRM_1644237585',
  CAR_YEAR: 'UF_CRM_1604663543',
  CAR_BRAND: 'UF_CRM_1604663495',
  ADDITIONAL_CASH: 'UF_CRM_1782122109410',
  MONTHLY_PAYMENT: 'UF_CRM_1782122084565',
  TERM: 'UF_CRM_1782125703647',
  BODY_TYPE: 'UF_CRM_1770726493',
  DESIRED_CAR: 'UF_CRM_LEAD_1701783274065',
  SELECTED_CAR: 'UF_CRM_1767948529026',
} as const

function getBitrixWebhookUrl(): string | null {
  const url = process.env.BITRIX_URL?.trim().replace(/\/$/, '')
  if (!url) return null
  return url
}

async function callBitrixLeadAdd(
  fields: Record<string, unknown>
): Promise<{ ok: boolean; leadId?: number; error?: string }> {
  const webhookUrl = getBitrixWebhookUrl()
  if (!webhookUrl) {
    return { ok: false, error: 'Bitrix is not configured: missing BITRIX_URL' }
  }

  try {
    const response = await fetch(`${webhookUrl}/crm.lead.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
    })

    let data: BitrixLeadResponse
    try {
      data = await response.json()
    } catch {
      return { ok: false, error: 'Bitrix returned invalid JSON' }
    }

    if (!response.ok || data.error || typeof data.result !== 'number') {
      return {
        ok: false,
        error: data.error_description ?? data.error ?? `HTTP ${response.status}`,
      }
    }

    return { ok: true, leadId: data.result }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Bitrix request failed',
    }
  }
}

function buildContactLeadFields({ name, phone, comment, source }: ContactLeadPayload) {
  const sourceLabel = source === 'modal' ? 'Модальне вікно' : 'Форма на сайті'

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

function formatCurrentCar(state: CalculatorState): string {
  if (!state.currentCarBrand && !state.currentCarModel) return ''
  return [
    state.currentCarBrand,
    state.currentCarModel,
    state.currentCarYear ? String(state.currentCarYear) : '',
    state.currentCarMileage ? `(${state.currentCarMileage} км)` : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim()
}

function buildCalculatorComments(state: CalculatorState, name: string): string {
  return [
    '=== Калькулятор сайту normalno-auto.com ===',
    `Ім'я: ${name}`,
    state.startOption ? `Стартовий варіант: ${state.startOption}` : null,
    `Стартовий бюджет: ${
      state.totalStartBudget
        ? `${state.totalStartBudget.toLocaleString('uk-UA')} грн`
        : '—'
    }`,
    state.budgetProfile
      ? `Рекомендований бюджет: ${state.budgetProfile.recommendedBudgetUah.toLocaleString('uk-UA')} грн`
      : null,
    state.budgetProfile
      ? `Макс. бюджет: ${state.budgetProfile.maximumBudgetUah.toLocaleString('uk-UA')} грн`
      : `Макс. бюджет: $${state.maxBudget ?? '—'}`,
    `Комфортний платіж: ${state.monthlyPayment.toLocaleString('uk-UA')} грн/міс`,
    `Строк: ${state.termMonths} міс`,
    state.motivations.length
      ? `Мотивація: ${resolveMotivationLabels(state.motivations).join(', ')}`
      : null,
    state.bodyTypes.length
      ? `Тип кузова: ${resolveBodyTypeLabels(state.bodyTypes).join(', ')}`
      : null,
    state.brands.length ? `Марки: ${resolveBrandLabels(state.brands).join(', ')}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildCalculatorLeadFields({
  name,
  phone,
  state,
}: CalculatorLeadPayload): Record<string, unknown> {
  const currentCar = formatCurrentCar(state)
  const totalStartUah =
    state.totalStartBudget ??
    convertUSDToUAH(state.currentCarPrice) + state.additionalCash

  const fields: Record<string, unknown> = {
    TITLE: `Калькулятор сайту — ${name}`,
    NAME: name,
    PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
    SOURCE_ID: 'WEB',
    SOURCE_DESCRIPTION: 'normalno-auto.com — калькулятор',
    CURRENCY_ID: 'USD',
    OPPORTUNITY: state.maxBudget ?? convertUAHToUSD(totalStartUah),
    COMMENTS: buildCalculatorComments(state, name),
    [BITRIX_LEAD_FIELDS.MONTHLY_PAYMENT]: String(state.monthlyPayment),
    [BITRIX_LEAD_FIELDS.TERM]: String(state.termMonths),
    [BITRIX_LEAD_FIELDS.ADDITIONAL_CASH]: String(state.additionalCash),
    [BITRIX_LEAD_FIELDS.CURRENT_CAR_PRICE]: String(state.currentCarPrice),
  }

  if (currentCar) {
    fields[BITRIX_LEAD_FIELDS.CURRENT_CAR] = currentCar
    fields[BITRIX_LEAD_FIELDS.CURRENT_CAR_SUMMARY] = currentCar
  }

  if (state.currentCarYear) {
    fields[BITRIX_LEAD_FIELDS.CAR_YEAR] = String(state.currentCarYear)
  }

  if (state.currentCarBrand) {
    fields[BITRIX_LEAD_FIELDS.CAR_BRAND] = state.currentCarBrand
  }

  if (state.bodyTypes.length) {
    fields[BITRIX_LEAD_FIELDS.BODY_TYPE] = resolveBodyTypeLabels(state.bodyTypes).join(', ')
  }

  if (state.brands.length) {
    fields[BITRIX_LEAD_FIELDS.DESIRED_CAR] = resolveBrandLabels(state.brands).join(', ')
  }

  return fields
}

export async function sendLeadToBitrix(payload: ContactLeadPayload): Promise<boolean> {
  const result = await callBitrixLeadAdd(buildContactLeadFields(payload))
  if (!result.ok) {
    console.error('Bitrix crm.lead.add failed:', result.error)
  }
  return result.ok
}

export async function sendCalculatorLeadToBitrix(
  payload: CalculatorLeadPayload
): Promise<boolean> {
  const result = await callBitrixLeadAdd(buildCalculatorLeadFields(payload))
  if (!result.ok) {
    console.error('Bitrix calculator lead failed:', result.error)
  }
  return result.ok
}

export function isBitrixConfigured(): boolean {
  return getBitrixWebhookUrl() !== null
}
