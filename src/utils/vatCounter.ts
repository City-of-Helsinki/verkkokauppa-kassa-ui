export const parsePriceToCents = (price: string): bigint => {
  const [euros, cents = ''] = price.split('.')
  const eurosPart = BigInt(euros) // whole euros
  const centsPart = BigInt((cents + '00').slice(0, 2)) // pad/truncate to 2 decimals
  return eurosPart * BigInt(100) + centsPart
}

// Format BigInt cents back into a string with exactly two decimals
export const formatCents = (cents: bigint): string => {
  const euros = cents / BigInt(100)
  const remainder = cents % BigInt(100)
  return `${euros}.${remainder.toString().padStart(2, '0')}`
}
interface VatTable {
  [percentage: string]: string // formatted string like "12.34"
}
export const vatCounter = (items: any): VatTable => {
  const vatTotals: Record<string, bigint> = {}

  for (const item of items) {
    if (!item.vatPercentage || !item.rowPriceVat) continue

    const vatKey = item.vatPercentage
    const vatValue = parsePriceToCents(item.rowPriceVat)

    if (!vatTotals[vatKey]) {
      vatTotals[vatKey] = BigInt(0)
    }

    vatTotals[vatKey] += vatValue
  }

  // Convert back to formatted strings with 2 decimals
  const formattedTotals: VatTable = {}
  for (const [key, value] of Object.entries(vatTotals)) {
    formattedTotals[key] = formatCents(value)
  }

  return formattedTotals
}

