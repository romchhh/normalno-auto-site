import { DEFAULT_LEASING_PARAMS, type LeasingParams } from './leasing'

export const CALCULATOR_CONFIG = {
  defaultTermMonths: 36,
  paymentMin: 8000,
  paymentMax: 35000,
  paymentStep: 1000,
  defaultMonthlyPayment: 18000,
  additionalCashMin: 130_000,
  additionalCashMax: 1_000_000,
  additionalCashStep: 10_000,
  termOptions: [24, 36, 48] as const,
  leasing: DEFAULT_LEASING_PARAMS as LeasingParams,
  motivations: [
    { id: 'newer', label: 'Новіше на 3–5 років' },
    { id: 'reliable', label: 'Надійніше' },
    { id: 'bigger', label: 'Більше / сімейніше' },
    { id: 'comfort', label: 'Комфортніше' },
    { id: 'premium', label: 'Преміальніше' },
    { id: 'economy', label: 'Економніше' },
  ],
  bodyTypes: [
    { id: 'suv', label: 'SUV' },
    { id: 'sedan', label: 'Sedan' },
    { id: 'ev', label: 'EV' },
  ],
  brands: [
    { id: 'toyota', label: 'Toyota' },
    { id: 'lexus', label: 'Lexus' },
    { id: 'bmw', label: 'BMW' },
    { id: 'mercedes-benz', label: 'Mercedes' },
    { id: 'volkswagen', label: 'Volkswagen' },
    { id: 'tesla', label: 'Tesla' },
    { id: 'audi', label: 'Audi' },
    { id: 'hyundai', label: 'Hyundai' },
    { id: 'kia', label: 'Kia' },
    { id: 'mazda', label: 'Mazda' },
  ],
  /** Popular models for car-info autocomplete (keyed by brand label) */
  brandModels: {
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Highlander', 'Prius', 'Yaris', 'Avalon'],
    Lexus: ['RX', 'ES', 'NX', 'GX', 'LX', 'IS', 'UX'],
    BMW: ['X5', 'X3', 'X1', '3 Series', '5 Series', 'X6', '7 Series'],
    Mercedes: ['E-Class', 'C-Class', 'GLC', 'GLE', 'S-Class', 'GLA', 'ML'],
    Volkswagen: ['Passat', 'Golf', 'Tiguan', 'Touareg', 'Polo', 'Jetta', 'Touran'],
    Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'],
    Audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3', 'A8'],
    Hyundai: ['Tucson', 'Santa Fe', 'Elantra', 'Sonata', 'Accent', 'Creta', 'Kona'],
    Kia: ['Sportage', 'Sorento', 'Ceed', 'Optima', 'Rio', 'Cerato', 'Soul'],
    Mazda: ['CX-5', '6', '3', 'CX-9', 'CX-3', 'CX-30'],
    Nissan: ['Qashqai', 'X-Trail', 'Leaf', 'Juke', 'Pathfinder', 'Murano'],
    Honda: ['CR-V', 'Civic', 'Accord', 'HR-V', 'Pilot'],
    Skoda: ['Octavia', 'Superb', 'Kodiaq', 'Fabia', 'Karoq', 'Rapid'],
    Ford: ['Focus', 'Mondeo', 'Kuga', 'Explorer', 'Escape', 'Fusion'],
    Renault: ['Megane', 'Duster', 'Kadjar', 'Captur', 'Scenic', 'Logan'],
  } as Record<string, string[]>,
  brandSuggestions: [
    'Toyota',
    'Lexus',
    'BMW',
    'Mercedes',
    'Volkswagen',
    'Tesla',
    'Audi',
    'Hyundai',
    'Kia',
    'Mazda',
    'Nissan',
    'Honda',
    'Skoda',
    'Ford',
    'Renault',
    'Peugeot',
    'Opel',
    'Chevrolet',
    'Mitsubishi',
    'Subaru',
    'Volvo',
    'Porsche',
    'Land Rover',
    'Jeep',
    'BYD',
  ],
} as const

export function getYearSuggestions(from = 2000): number[] {
  const current = new Date().getFullYear()
  const years: number[] = []
  for (let y = current; y >= from; y -= 1) years.push(y)
  return years
}

export function getModelSuggestions(brand?: string): string[] {
  if (!brand?.trim()) {
    return Object.values(CALCULATOR_CONFIG.brandModels).flat().slice(0, 24)
  }
  const key = Object.keys(CALCULATOR_CONFIG.brandModels).find(
    (name) => name.toLowerCase() === brand.trim().toLowerCase()
  )
  if (key) return CALCULATOR_CONFIG.brandModels[key]
  return []
}

export function resolveBrandLabels(ids: string[]): string[] {
  return ids.map((id) => {
    const brand = CALCULATOR_CONFIG.brands.find((b) => b.id === id)
    return brand?.label ?? id
  })
}

export function resolveMotivationLabels(ids: string[]): string[] {
  return ids.map((id) => {
    const item = CALCULATOR_CONFIG.motivations.find((m) => m.id === id)
    return item?.label ?? id
  })
}

export function resolveBodyTypeLabels(ids: string[]): string[] {
  return ids.map((id) => {
    const item = CALCULATOR_CONFIG.bodyTypes.find((b) => b.id === id)
    return item?.label ?? id
  })
}
