export function formatCompactNumber(value: number | string): string {
  if (typeof value === 'string') {
    return value
  }

  return new Intl.NumberFormat('en-US', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 1000 ? 1 : 0
  }).format(value)
}

export function formatCount(value: number | string): string {
  if (typeof value === 'string') {
    return value
  }

  return new Intl.NumberFormat('en-US').format(value)
}

export function formatCurrency(value: number | string, currency = 'PHP'): string {
  if (typeof value === 'string') {
    return value
  }

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value)
}

export function formatPercent(value: number | string): string {
  if (typeof value === 'string') {
    return value
  }

  return `${value}%`
}

export function formatRating(value: number | string): string {
  if (typeof value === 'string') {
    return value
  }

  return value.toFixed(1)
}

export function formatFeedbackCount(value: number | string): string {
  if (typeof value === 'string') {
    return value
  }

  return new Intl.NumberFormat('en-US').format(value)
}
