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
