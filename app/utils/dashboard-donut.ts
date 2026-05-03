export function createValueRadiusScale(
  values: number[],
  minRadius: number,
  maxRadius: number
) {
  const numericValues = values.map((value) => Number.isFinite(value) ? Math.max(0, value) : 0)
  const minValue = Math.min(...numericValues)
  const maxValue = Math.max(...numericValues)

  return (value: number) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0

    if (maxValue <= minValue) {
      return (minRadius + maxRadius) / 2
    }

    const ratio = (safeValue - minValue) / (maxValue - minValue)

    return minRadius + ratio * (maxRadius - minRadius)
  }
}

export interface DonutSliceLayout {
  center: number
  innerRadius: number
  startAngle: number
  gapAngle: number
}

export interface DonutSliceGeometry {
  outerRadius: number
  midAngle: number
  path: string
}

interface DonutSliceOptions<T> {
  layout: DonutSliceLayout
  getOuterRadius: (segment: T) => number
  getSweepAngle: (segment: T) => number
}

function polarToCartesian(center: number, radius: number, angleDeg: number) {
  const radians = (angleDeg * Math.PI) / 180

  return {
    x: center + Math.sin(radians) * radius,
    y: center - Math.cos(radians) * radius
  }
}

function buildDonutSlicePath(
  center: number,
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number
) {
  const outerStart = polarToCartesian(center, outerRadius, startAngle)
  const outerEnd = polarToCartesian(center, outerRadius, endAngle)
  const innerEnd = polarToCartesian(center, innerRadius, endAngle)
  const innerStart = polarToCartesian(center, innerRadius, startAngle)
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z'
  ].join(' ')
}

export function createDonutSlices<T extends object>(
  segments: T[],
  options: DonutSliceOptions<T>
): Array<T & DonutSliceGeometry> {
  const { layout, getOuterRadius, getSweepAngle } = options
  let currentAngle = layout.startAngle

  return segments.map((segment) => {
    const sweepAngle = getSweepAngle(segment)
    const nextAngle = currentAngle + sweepAngle
    const startAngle = currentAngle + layout.gapAngle / 2
    const endAngle = Math.max(startAngle + 0.01, nextAngle - layout.gapAngle / 2)
    const outerRadius = getOuterRadius(segment)
    const midAngle = startAngle + (endAngle - startAngle) / 2

    currentAngle = nextAngle

    return {
      ...segment,
      outerRadius,
      midAngle,
      path: buildDonutSlicePath(layout.center, startAngle, endAngle, outerRadius, layout.innerRadius)
    }
  })
}
