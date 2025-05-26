export const formatNumber = (num: number | bigint, currency = false) => {
  if (!num && num !== 0) return 0

  return new Intl.NumberFormat('id-ID', {
    style: currency ? 'currency' : 'decimal',
    currency: currency ? 'IDR' : undefined,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol' // Use narrowSymbol to remove spacing
  })
    .format(num)
    .replace(/\s+/g, '') // Remove any remaining spaces
}

export const numberToFixedExceptRoundNumber = (
  num: number,
  fractionDigits = 1
) => (num ? Number.parseFloat(num.toFixed(fractionDigits)) : 0)
