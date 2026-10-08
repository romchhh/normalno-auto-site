export type CalculatorStep =
  | 'intro'
  | 'start-option'
  | 'car-info'
  | 'price-valuation'
  | 'additional-cash'
  | 'monthly-payment'
  | 'term'
  | 'motivation'
  | 'car-prefs'
  | 'loader'
  | 'results'
  | 'strategy'

export type StartOption = 'has-car' | 'has-cash' | 'has-both'

export interface BudgetProfileSummary {
  startMoneyUah: number
  comfortablePaymentUah: number
  maxPaymentUah: number
  comfortBudgetUah: number
  optimumBudgetUah: number
  maximumBudgetUah: number
  recommendedBudgetUah: number
  recommendedBudgetUsd: number
  maximumBudgetUsd: number
}

export interface CalculatorState {
  step: CalculatorStep
  startOption?: StartOption
  currentCarBrand?: string
  currentCarModel?: string
  currentCarYear?: number
  currentCarMileage?: number
  currentCarPrice: number
  additionalCash: number
  monthlyPayment: number
  termMonths: number
  motivations: string[]
  bodyTypes: string[]
  brands: string[]
  maxBudget?: number
  totalStartBudget?: number
  budgetProfile?: BudgetProfileSummary
}

export const PROGRESS_LABELS = ['Бюджет', 'Побажання', 'Варіанти', 'Стратегія'] as const

export function getProgressSegment(step: CalculatorStep): number {
  if (
    ['start-option', 'car-info', 'price-valuation', 'additional-cash', 'monthly-payment', 'term'].includes(
      step
    )
  ) {
    return 0
  }
  if (['motivation', 'car-prefs'].includes(step)) {
    return 1
  }
  if (['loader', 'results'].includes(step)) {
    return 2
  }
  if (step === 'strategy') {
    return 3
  }
  return -1
}

export function defaultCalculatorState(): CalculatorState {
  return {
    step: 'intro',
    currentCarPrice: 0,
    additionalCash: 130_000,
    monthlyPayment: 18_000,
    termMonths: 36,
    motivations: [],
    bodyTypes: [],
    brands: [],
  }
}
