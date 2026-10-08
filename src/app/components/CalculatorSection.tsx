'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatUAH, formatUahShort, formatUsd } from '@/lib/currency'
import {
  CALCULATOR_CONFIG,
  getModelSuggestions,
  getYearSuggestions,
} from '@/lib/calculator/config'
import {
  calcTotalStartBudgetUah,
  computeCalculatorResult,
  estimateCarPrice,
  isCarInfoStepComplete,
  isValidCarYear,
} from '@/lib/calculator/math'
import {
  defaultCalculatorState,
  getProgressSegment,
  PROGRESS_LABELS,
  type CalculatorState,
  type CalculatorStep,
  type StartOption,
} from '@/lib/calculator/types'
import styles from './CalculatorSection.module.css'

type Status = 'idle' | 'loading' | 'success' | 'error'

const STEP_ORDER: CalculatorStep[] = [
  'intro',
  'start-option',
  'car-info',
  'price-valuation',
  'additional-cash',
  'monthly-payment',
  'term',
  'motivation',
  'car-prefs',
  'loader',
  'results',
  'strategy',
]

export default function CalculatorSection() {
  const { t } = useTranslation()
  const [state, setState] = useState<CalculatorState>(defaultCalculatorState)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+380')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [loaderStep, setLoaderStep] = useState(0)

  const update = (patch: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }

  const goTo = (step: CalculatorStep) => update({ step })

  const cashOnly = state.startOption === 'has-cash'

  const handleBack = () => {
    if (state.step === 'additional-cash' && cashOnly) {
      goTo('start-option')
      return
    }
    const idx = STEP_ORDER.indexOf(state.step)
    if (idx > 0) goTo(STEP_ORDER[idx - 1])
  }

  const handleStartOption = (option: StartOption) => {
    if (option === 'has-cash') {
      update({
        startOption: option,
        currentCarBrand: undefined,
        currentCarModel: undefined,
        currentCarYear: undefined,
        currentCarMileage: undefined,
        currentCarPrice: 0,
        step: 'additional-cash',
      })
      return
    }
    update({ startOption: option, step: 'car-info' })
  }

  const toggleChip = (key: 'motivations' | 'bodyTypes' | 'brands', id: string, max?: number) => {
    setState((prev) => {
      const list = prev[key]
      const exists = list.includes(id)
      let next = exists ? list.filter((item) => item !== id) : [...list, id]
      if (!exists && max && next.length > max) next = next.slice(1)
      return { ...prev, [key]: next }
    })
  }

  const runCalculation = () => {
    goTo('loader')
    setLoaderStep(0)
  }

  useEffect(() => {
    if (state.step !== 'loader') return

    const timers = [
      window.setTimeout(() => setLoaderStep(1), 600),
      window.setTimeout(() => setLoaderStep(2), 1200),
      window.setTimeout(() => setLoaderStep(3), 1800),
      window.setTimeout(() => {
        const result = computeCalculatorResult(state)
        update({
          step: 'results',
          totalStartBudget: result.totalStartBudget,
          maxBudget: result.maxBudget,
          budgetProfile: result.budgetProfile,
        })
      }, 2500),
    ]

    return () => timers.forEach(clearTimeout)
    // Only re-run when entering loader
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.step])

  const priceEstimate = useMemo(() => {
    if (!state.currentCarYear) return null
    return estimateCarPrice(state.currentCarYear, state.currentCarMileage || 0)
  }, [state.currentCarYear, state.currentCarMileage])

  const additionalCashValue = Math.min(
    CALCULATOR_CONFIG.additionalCashMax,
    Math.max(CALCULATOR_CONFIG.additionalCashMin, state.additionalCash)
  )

  const totalStartOnStep = calcTotalStartBudgetUah(state.currentCarPrice, additionalCashValue)
  const progressSegment = getProgressSegment(state.step)
  const showProgress = progressSegment >= 0

  const handleSubmit = async () => {
    if (!consent || !name.trim() || phone.length < 12) return
    setStatus('loading')

    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, state }),
      })
      if (!res.ok) throw new Error('submit failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const footer = (
    label: string,
    onClick: () => void,
    disabled = false
  ) => (
    <div className={styles.footer}>
      <button type="button" className={styles.primaryBtn} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </div>
  )

  const renderBody = () => {
    if (status === 'success') {
      return (
        <div className={styles.success}>
          <div className={styles.successIcon} aria-hidden="true">✓</div>
          <h2 className={styles.title}>{t('calculator.successTitle')}</h2>
          <p className={styles.subtitle}>{t('calculator.successText')}</p>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => {
              setState(defaultCalculatorState())
              setName('')
              setPhone('+380')
              setConsent(false)
              setStatus('idle')
            }}
          >
            {t('calculator.restart')}
          </button>
        </div>
      )
    }

    switch (state.step) {
      case 'intro':
        return (
          <div className={styles.introStep}>
            <h2 className={styles.title}>{t('calculator.introTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.introText')}</p>
            {footer(t('calculator.startCta'), () => goTo('start-option'))}
            <p className={styles.introMeta}>{t('calculator.introMeta')}</p>
          </div>
        )

      case 'start-option':
        return (
          <>
            <h2 className={styles.title}>{t('calculator.startTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.startText')}</p>
            <div className={styles.options}>
              {(
                [
                  { id: 'has-car' as const, titleKey: 'optCar', descKey: 'optCarDesc' },
                  { id: 'has-cash' as const, titleKey: 'optCash', descKey: 'optCashDesc' },
                  { id: 'has-both' as const, titleKey: 'optBoth', descKey: 'optBothDesc' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={styles.option}
                  onClick={() => handleStartOption(opt.id)}
                >
                  <div>
                    <p className={styles.optionTitle}>{t(`calculator.${opt.titleKey}`)}</p>
                    <p className={styles.optionDesc}>{t(`calculator.${opt.descKey}`)}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )

      case 'car-info': {
        const modelSuggestions = getModelSuggestions(state.currentCarBrand)
        const yearSuggestions = getYearSuggestions(1990)
        const carInfoReady = isCarInfoStepComplete(
          state.currentCarBrand,
          state.currentCarModel,
          state.currentCarYear
        )
        return (
          <>
            <h2 className={styles.title}>{t('calculator.carTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.carText')}</p>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="calc-brand">
                  {t('calculator.brandLabel')}
                </label>
                <input
                  id="calc-brand"
                  className={styles.input}
                  list="calc-brand-list"
                  placeholder={t('calculator.brandPlaceholder')}
                  value={state.currentCarBrand || ''}
                  onChange={(e) =>
                    update({
                      currentCarBrand: e.target.value,
                      currentCarModel: '',
                    })
                  }
                  autoComplete="off"
                />
                <datalist id="calc-brand-list">
                  {CALCULATOR_CONFIG.brandSuggestions.map((brand) => (
                    <option key={brand} value={brand} />
                  ))}
                </datalist>
                <p className={styles.fieldHint}>{t('calculator.brandHint')}</p>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="calc-model">
                  {t('calculator.modelLabel')}
                </label>
                <input
                  id="calc-model"
                  className={styles.input}
                  list="calc-model-list"
                  placeholder={t('calculator.modelPlaceholder')}
                  value={state.currentCarModel || ''}
                  onChange={(e) => update({ currentCarModel: e.target.value })}
                  autoComplete="off"
                />
                <datalist id="calc-model-list">
                  {modelSuggestions.map((model) => (
                    <option key={model} value={model} />
                  ))}
                </datalist>
                <p className={styles.fieldHint}>{t('calculator.modelHint')}</p>
              </div>

              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="calc-year">
                    {t('calculator.yearLabel')}
                  </label>
                  <input
                    id="calc-year"
                    type="number"
                    className={styles.input}
                    list="calc-year-list"
                    placeholder={t('calculator.yearPlaceholder')}
                    value={state.currentCarYear ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value
                      if (!raw) {
                        update({ currentCarYear: undefined })
                        return
                      }
                      const year = parseInt(raw, 10)
                      update({
                        currentCarYear: Number.isFinite(year) ? year : undefined,
                      })
                    }}
                    min={1990}
                    max={new Date().getFullYear()}
                    inputMode="numeric"
                  />
                  <datalist id="calc-year-list">
                    {yearSuggestions.map((year) => (
                      <option key={year} value={year} />
                    ))}
                  </datalist>
                  <p className={styles.fieldHint}>{t('calculator.yearHint')}</p>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="calc-mileage">
                    {t('calculator.mileageLabel')}
                  </label>
                  <input
                    id="calc-mileage"
                    type="number"
                    className={styles.input}
                    list="calc-mileage-list"
                    placeholder={t('calculator.mileagePlaceholder')}
                    value={state.currentCarMileage || ''}
                    onChange={(e) =>
                      update({
                        currentCarMileage: parseInt(e.target.value, 10) || undefined,
                      })
                    }
                    min={0}
                    step={1000}
                  />
                  <datalist id="calc-mileage-list">
                    {[80000, 100000, 120000, 150000, 180000, 200000, 250000].map((km) => (
                      <option key={km} value={km} />
                    ))}
                  </datalist>
                  <p className={styles.fieldHint}>{t('calculator.mileageHint')}</p>
                </div>
              </div>
            </div>
            {footer(
              t('calculator.next'),
              () => {
                if (!carInfoReady || !isValidCarYear(state.currentCarYear)) return
                const est = estimateCarPrice(state.currentCarYear!, state.currentCarMileage || 0)
                update({ step: 'price-valuation', currentCarPrice: est.avg })
              },
              !carInfoReady
            )}
          </>
        )
      }

      case 'price-valuation': {
        const est = priceEstimate ?? estimateCarPrice(2015, 100000)
        return (
          <>
            <h2 className={styles.title}>{t('calculator.priceTitle')}</h2>
            <p className={styles.subtitle}>
              {[state.currentCarBrand, state.currentCarModel, state.currentCarYear]
                .filter(Boolean)
                .join(' ')}
            </p>
            <div className={`${styles.stat} ${styles.statAccent}`}>
              <p className={styles.statLabel}>{t('calculator.priceEstimate')}</p>
              <p className={styles.statValue}>{formatUsd(state.currentCarPrice)}</p>
              <p className={styles.statHint}>
                {t('calculator.priceRange', {
                  min: formatUsd(est.min),
                  max: formatUsd(est.max),
                })}
              </p>
            </div>
            <label className={styles.sliderLabel}>{t('calculator.priceAdjust')}</label>
            <input
              type="range"
              className={styles.slider}
              min={est.min}
              max={est.max}
              step={500}
              value={state.currentCarPrice}
              onChange={(e) => update({ currentCarPrice: parseInt(e.target.value, 10) })}
            />
            <div className={styles.sliderEnds}>
              <span>{formatUsd(est.min)}</span>
              <span>{formatUsd(est.max)}</span>
            </div>
            {footer(t('calculator.next'), () => goTo('additional-cash'))}
          </>
        )
      }

      case 'additional-cash':
        return (
          <>
            <h2 className={styles.title}>{t('calculator.cashTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.cashText')}</p>
            <div className={styles.stat}>
              <p className={styles.statLabel}>{t('calculator.cashValue')}</p>
              <p className={styles.statValue}>{formatUAH(additionalCashValue)}</p>
            </div>
            <label className={styles.sliderLabel}>{t('calculator.cashChoose')}</label>
            <input
              type="range"
              className={styles.slider}
              min={CALCULATOR_CONFIG.additionalCashMin}
              max={CALCULATOR_CONFIG.additionalCashMax}
              step={CALCULATOR_CONFIG.additionalCashStep}
              value={additionalCashValue}
              onChange={(e) => update({ additionalCash: parseInt(e.target.value, 10) })}
            />
            <div className={styles.sliderEnds}>
              <span>{formatUahShort(CALCULATOR_CONFIG.additionalCashMin)}</span>
              <span>{formatUahShort(CALCULATOR_CONFIG.additionalCashMax)}</span>
            </div>
            <div className={`${styles.stat} ${styles.statAccent}`}>
              <p className={styles.statLabel}>{t('calculator.startMoney')}</p>
              <p className={styles.statValue}>{formatUAH(totalStartOnStep)}</p>
              <p className={styles.statHint}>
                {t('calculator.startMoneyHint', {
                  car: formatUsd(state.currentCarPrice),
                  cash: formatUahShort(additionalCashValue),
                })}
              </p>
            </div>
            {footer(t('calculator.next'), () => goTo('monthly-payment'))}
          </>
        )

      case 'monthly-payment': {
        const adjust = (delta: number) => {
          const next = Math.min(
            CALCULATOR_CONFIG.paymentMax,
            Math.max(CALCULATOR_CONFIG.paymentMin, state.monthlyPayment + delta)
          )
          update({ monthlyPayment: next })
        }
        return (
          <>
            <h2 className={styles.title}>{t('calculator.paymentTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.paymentText')}</p>
            <div className={styles.paymentControl}>
              <button type="button" className={styles.stepBtn} onClick={() => adjust(-CALCULATOR_CONFIG.paymentStep)}>
                −
              </button>
              <div>
                <p className={styles.statValue}>{formatUAH(state.monthlyPayment)}</p>
                <p className={styles.statHint}>{t('calculator.perMonth')}</p>
              </div>
              <button type="button" className={styles.stepBtn} onClick={() => adjust(CALCULATOR_CONFIG.paymentStep)}>
                +
              </button>
            </div>
            <input
              type="range"
              className={styles.slider}
              min={CALCULATOR_CONFIG.paymentMin}
              max={CALCULATOR_CONFIG.paymentMax}
              step={CALCULATOR_CONFIG.paymentStep}
              value={state.monthlyPayment}
              onChange={(e) => update({ monthlyPayment: parseInt(e.target.value, 10) })}
            />
            <div className={styles.sliderEnds}>
              <span>{formatUAH(CALCULATOR_CONFIG.paymentMin)}</span>
              <span>{formatUAH(CALCULATOR_CONFIG.paymentMax)}</span>
            </div>
            {footer(t('calculator.next'), () => goTo('term'))}
          </>
        )
      }

      case 'term':
        return (
          <>
            <h2 className={styles.title}>{t('calculator.termTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.termText')}</p>
            <div className={styles.options}>
              {CALCULATOR_CONFIG.termOptions.map((months) => (
                <button
                  key={months}
                  type="button"
                  className={`${styles.option} ${state.termMonths === months ? styles.optionSelected : ''}`}
                  onClick={() => {
                    update({ termMonths: months })
                    goTo('motivation')
                  }}
                >
                  <p className={styles.optionTitle}>{months} {t('calculator.months')}</p>
                  {months === 36 && <span className={styles.badge}>{t('calculator.recommended')}</span>}
                </button>
              ))}
            </div>
          </>
        )

      case 'motivation':
        return (
          <>
            <h2 className={styles.title}>{t('calculator.motivationTitle')}</h2>
            <p className={styles.subtitle}>{t('calculator.motivationText')}</p>
            <div className={styles.chips}>
              {CALCULATOR_CONFIG.motivations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.chip} ${state.motivations.includes(item.id) ? styles.chipSelected : ''}`}
                  onClick={() => toggleChip('motivations', item.id, 3)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {footer(t('calculator.next'), () => goTo('car-prefs'))}
          </>
        )

      case 'car-prefs':
        return (
          <>
            <h2 className={styles.title}>{t('calculator.prefsTitle')}</h2>
            <p className={styles.groupLabel}>{t('calculator.bodyTypes')}</p>
            <div className={styles.chips}>
              {CALCULATOR_CONFIG.bodyTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.chip} ${state.bodyTypes.includes(item.id) ? styles.chipSelected : ''}`}
                  onClick={() => toggleChip('bodyTypes', item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className={`${styles.groupLabel} ${styles.groupSpacer}`}>{t('calculator.brands')}</p>
            <div className={styles.chips}>
              {CALCULATOR_CONFIG.brands.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.chip} ${state.brands.includes(item.id) ? styles.chipSelected : ''}`}
                  onClick={() => toggleChip('brands', item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {footer(t('calculator.showResults'), runCalculation)}
          </>
        )

      case 'loader': {
        const checks = [
          t('calculator.loader1'),
          t('calculator.loader2'),
          t('calculator.loader3'),
          t('calculator.loader4'),
        ]
        return (
          <div className={styles.loader}>
            <div className={styles.spinner} aria-hidden="true" />
            <div className={styles.checks}>
              {checks.map((text, i) => (
                <div
                  key={text}
                  className={`${styles.checkRow} ${i <= loaderStep ? styles.checkRowActive : ''}`}
                >
                  <span className={styles.checkMark}>{i < loaderStep ? '✓' : i + 1}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        )
      }

      case 'results': {
        const profile = state.budgetProfile
        return (
          <>
            <h2 className={styles.title}>{t('calculator.resultsTitle')}</h2>
            <p className={styles.statValue}>
              {t('calculator.resultsBudget', { budget: formatUsd(state.maxBudget || 0) })}
            </p>
            {profile && (
              <p className={styles.subtitle} style={{ marginTop: 8 }}>
                {t('calculator.resultsHint', {
                  recommended: formatUAH(profile.recommendedBudgetUah),
                  max: formatUAH(profile.maximumBudgetUah),
                })}
              </p>
            )}
            {profile && (
              <div className={styles.tiers}>
                {[
                  { label: t('calculator.tierComfort'), value: profile.comfortBudgetUah, hint: '40% старт' },
                  { label: t('calculator.tierOptimum'), value: profile.optimumBudgetUah, hint: 'макс. платіж' },
                  { label: t('calculator.tierMax'), value: profile.maximumBudgetUah, hint: '25%+7%' },
                ].map((tier) => (
                  <div key={tier.label} className={styles.tier}>
                    <p className={styles.tierLabel}>{tier.label}</p>
                    <p className={styles.tierValue}>{formatUahShort(tier.value)}</p>
                    <p className={styles.tierHint}>{tier.hint}</p>
                  </div>
                ))}
              </div>
            )}
            {footer(t('calculator.getStrategy'), () => goTo('strategy'))}
            <button type="button" className={styles.linkBtn} onClick={() => goTo('start-option')}>
              {t('calculator.editParams')}
            </button>
          </>
        )
      }

      case 'strategy':
        return (
          <>
            <h2 className={styles.title}>{t('calculator.strategyTitle')}</h2>
            <div className={styles.summary}>
              <p>
                {t('calculator.summaryBudget')}:{' '}
                <strong>{formatUsd(state.maxBudget || 0)}</strong>
              </p>
              <p>
                {t('calculator.summaryPayment')}:{' '}
                <strong>{formatUAH(state.monthlyPayment)}/міс</strong>
              </p>
              <p>
                {t('calculator.summaryStart')}:{' '}
                <strong>{formatUAH(state.totalStartBudget || 0)}</strong>
              </p>
              <p>
                {t('calculator.summaryTerm')}:{' '}
                <strong>
                  {state.termMonths} {t('calculator.months')}
                </strong>
              </p>
            </div>
            <div className={styles.fields}>
              <input
                className={styles.input}
                placeholder={t('calculator.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                className={styles.input}
                placeholder={t('calculator.phonePlaceholder')}
                value={phone}
                onChange={(e) => {
                  let v = e.target.value.replace(/[^\d+]/g, '')
                  if (!v.startsWith('+38')) v = '+38'
                  setPhone(v.slice(0, 13))
                }}
              />
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>{t('contact.consent')}</span>
              </label>
            </div>
            {status === 'error' && <p className={styles.error}>{t('calculator.error')}</p>}
            {footer(
              status === 'loading' ? t('calculator.submitting') : t('calculator.submit'),
              handleSubmit,
              !consent || !name.trim() || phone.length < 12 || status === 'loading'
            )}
          </>
        )

      default:
        return null
    }
  }

  return (
    <section id="calculator" className={styles.section} aria-label={t('calculator.aria')}>
      <div className={styles.inner}>
        <div
          className={`${styles.shell} ${
            state.step === 'intro' && status !== 'success' ? styles.shellIntro : ''
          } ${state.step === 'loader' ? styles.shellLoader : ''}`}
        >
          {showProgress && (
            <div className={styles.progress} aria-hidden="true">
              {PROGRESS_LABELS.map((label, i) => (
                <div
                  key={label}
                  className={`${styles.progressItem} ${i === progressSegment ? styles.progressItemActive : ''}`}
                >
                  <div
                    className={`${styles.progressBar} ${
                      i < progressSegment
                        ? styles.progressBarDone
                        : i === progressSegment
                          ? styles.progressBarActive
                          : ''
                    }`}
                  >
                    <div className={styles.progressBarFill} />
                  </div>
                  <span className={styles.progressLabel}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {state.step !== 'intro' && state.step !== 'loader' && status !== 'success' && (
            <div className={styles.headerRow}>
              <button type="button" className={styles.backBtn} onClick={handleBack}>
                ← {t('calculator.back')}
              </button>
            </div>
          )}

          <div className={styles.body}>{renderBody()}</div>
        </div>
      </div>
    </section>
  )
}
