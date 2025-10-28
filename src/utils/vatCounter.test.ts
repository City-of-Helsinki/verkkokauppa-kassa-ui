import { vatCounter } from './vatCounter' // adjust import path if needed

// Re-declare helpers here (or import them if exported)
const parsePriceToCents = (price: string): bigint => {
  const [euros, cents = ''] = price.split('.')
  const eurosPart = BigInt(euros)
  const centsPart = BigInt((cents + '00').slice(0, 2))
  return eurosPart * BigInt(100) + centsPart
}

const formatCents = (cents: bigint): string => {
  const euros = cents / BigInt(100)
  const remainder = cents % BigInt(100)
  return `${euros}.${remainder.toString().padStart(2, '0')}`
}

describe('parsePriceToCents', () => {
  it('converts euro strings to BigInt cents correctly', () => {
    expect(parsePriceToCents('0')).toBe(BigInt(0))
    expect(parsePriceToCents('1')).toBe(BigInt(100))
    expect(parsePriceToCents('1.23')).toBe(BigInt(123))
    expect(parsePriceToCents('12.3')).toBe(BigInt(1230))
    expect(parsePriceToCents('12.345')).toBe(BigInt(1234)) // truncates beyond 2 decimals
  })

  it('handles missing decimal part', () => {
    expect(parsePriceToCents('5')).toBe(BigInt(500))
  })
})

describe('formatCents', () => {
  it('formats BigInt cents into string with 2 decimals', () => {
    expect(formatCents(BigInt(0))).toBe('0.00')
    expect(formatCents(BigInt(5))).toBe('0.05')
    expect(formatCents(BigInt(99))).toBe('0.99')
    expect(formatCents(BigInt(1234))).toBe('12.34')
    expect(formatCents(BigInt(500))).toBe('5.00')
  })
})

describe('vatCounter', () => {
  it('sums VAT amounts by vatPercentage correctly', () => {
    const items = [
      { vatPercentage: '19', rowPriceVat: '1.00' },
      { vatPercentage: '19', rowPriceVat: '2.50' },
      { vatPercentage: '7', rowPriceVat: '0.70' },
    ]

    const result = vatCounter(items)

    expect(result).toEqual({
      '19': '3.50',
      '7': '0.70',
    })
  })

  it('handles empty input gracefully', () => {
    expect(vatCounter([])).toEqual({})
  })

  it('skips items missing vatPercentage or rowPriceVat', () => {
    const items = [
      { vatPercentage: '19', rowPriceVat: '1.00' },
      { vatPercentage: '', rowPriceVat: '2.00' },
      { vatPercentage: '19' }, // missing VAT value
    ]
    const result = vatCounter(items)
    expect(result).toEqual({ '19': '1.00' })
  })

  it('handles different decimal lengths and truncates correctly', () => {
    const items = [
      { vatPercentage: '10', rowPriceVat: '1.234' },
      { vatPercentage: '10', rowPriceVat: '0.7' },
    ]
    const result = vatCounter(items)
    expect(result).toEqual({ '10': '1.93' }) // 1.23 + 0.70 = 1.93
  })

  it('aggregates correctly with large totals (BigInt safe)', () => {
    const items = Array.from({ length: 1000 }, () => ({
      vatPercentage: '25',
      rowPriceVat: '0.01',
    }))
    const result = vatCounter(items)
    expect(result).toEqual({ '25': '10.00' }) // 1000 * 0.01 = 10.00
  })
})
