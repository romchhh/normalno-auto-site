import { convertUSDToUAH, formatUAH } from '@/lib/currency'
import { calcBudgetProfile, type BudgetProfile } from './leasing'
import { CALCULATOR_CONFIG } from './config'
import type { BudgetProfileSummary, CalculatorState } from './types'

export function calcTotalStartBudgetUah(
  currentCarPriceUsd: number,
  additionalCashUah: number
): number {
  return convertUSDToUAH(currentCarPriceUsd) + additionalCashUah
}

export function isValidCarYear(year?: number): boolean {
  if (year == null || !Number.isFinite(year)) return false
  const max = new Date().getFullYear()
  return year >= 1990 && year <= max
}

export function isCarInfoStepComplete(
  brand?: string,
  model?: string,
  year?: number
): boolean {
  return (
    Boolean(brand?.trim()) &&
    Boolean(model?.trim()) &&
    isValidCarYear(year)
  )
}

export function estimateCarPrice(year: number, mileage: number): {
  min: number
  avg: number
  max: number
} {
  const currentYear = new Date().getFullYear()
  const age = Math.max(0, currentYear - year)
  const mileageFactor = Math.max(0, (mileage - 50000) / 1000) * 150
  const base = Math.max(4000, 22000 - age * 1200 - mileageFactor)
  const round = (n: number) => Math.round(n / 500) * 500
  return {
    min: round(base * 0.95),
    avg: round(base),
    max: round(base * 1.05),
  }
}

export function toBudgetSummary(profile: BudgetProfile): BudgetProfileSummary {
  return {
    startMoneyUah: profile.startMoneyUah,
    comfortablePaymentUah: profile.comfortablePaymentUah,
    maxPaymentUah: profile.maxPaymentUah,
    comfortBudgetUah: profile.comfortBudgetUah,
    optimumBudgetUah: profile.optimumBudgetUah,
    maximumBudgetUah: profile.maximumBudgetUah,
    recommendedBudgetUah: profile.recommendedBudgetUah,
    recommendedBudgetUsd: profile.recommendedBudgetUsd,
    maximumBudgetUsd: profile.maximumBudgetUsd,
  }
}

export function computeCalculatorResult(state: CalculatorState): {
  totalStartBudget: number
  maxBudget: number
  budgetProfile: BudgetProfileSummary
} {
  const profile = calcBudgetProfile(
    state.currentCarPrice,
    state.additionalCash,
    state.monthlyPayment,
    state.termMonths,
    CALCULATOR_CONFIG.leasing
  )
  const summary = toBudgetSummary(profile)
  return {
    totalStartBudget: summary.startMoneyUah,
    maxBudget: summary.recommendedBudgetUsd,
    budgetProfile: summary,
  }
}

export { formatUAH }
