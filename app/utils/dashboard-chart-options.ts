import type { EChartsOption } from 'echarts'
import type { ChartDataPoint, ChartPanelData, DonutPanelData } from '../../types'
import { formatCompactNumber, formatCount } from './dashboard-formatters'

interface CartesianChartConfig {
  horizontal?: boolean
  showLegend?: boolean
  showSymbols?: boolean
  barMaxWidth?: number
  lineWidth?: number
  gridBottom?: number
  axisLabelRotate?: number
}

const gridLineColor = 'rgba(15, 37, 82, 0.08)'
const axisLabelColor = '#848A95'
const tooltipBorderColor = '#EFF0F6'

function getNumericValue(point: number | null | ChartDataPoint): number {
  if (typeof point === 'number') {
    return point
  }

  if (point === null) {
    return 0
  }

  return Number(point.value)
}

function formatTooltipValue(value: number): string {
  if (value >= 1000) {
    return formatCount(value)
  }

  return String(value)
}

function baseTooltip(): EChartsOption['tooltip'] {
  return {
    trigger: 'axis',
    backgroundColor: '#FFFFFF',
    borderColor: tooltipBorderColor,
    borderWidth: 1,
    textStyle: {
      color: '#0F2552',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    }
  }
}

function baseAxisLabel() {
  return {
    color: axisLabelColor,
    fontSize: 11,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
  }
}

export function buildDonutChartOption(panel: DonutPanelData): EChartsOption {
  const source = panel.series[0]
  const chartData = source?.data.map((point) => {
    const item = point as ChartDataPoint

    return {
      name: item.label,
      value: Number(item.value),
      itemStyle: {
        color: item.color
      }
    }
  }) ?? []

  const total = chartData.reduce((sum, item) => sum + Number(item.value), 0)

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      borderColor: tooltipBorderColor,
      borderWidth: 1,
      textStyle: {
        color: '#0F2552',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
      },
      formatter: (params: { name: string; value: number }) => `${params.name}: ${formatCompactNumber(params.value)}`
    },
    series: [
      {
        type: 'pie',
        radius: ['56%', '78%'],
        center: ['50%', '42%'],
        startAngle: 90,
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        itemStyle: {
          borderColor: '#FFFFFF',
          borderWidth: 6
        },
        data: chartData
      }
    ],
    graphic: panel.centerLabel
      ? [
          {
            type: 'text',
            left: 'center',
            top: '38%',
            style: {
              text: panel.centerLabel,
              textAlign: 'center',
              fill: '#0F2552',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '46%',
            style: {
              text: formatCompactNumber(total),
              textAlign: 'center',
              fill: '#848A95',
              fontSize: 11,
              fontWeight: 500,
              fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
            }
          }
        ]
      : undefined
  }
}

export function buildCartesianChartOption(panel: ChartPanelData, config: CartesianChartConfig = {}): EChartsOption {
  const horizontal = config.horizontal ?? false
  const showLegend = config.showLegend ?? Boolean(panel.legend?.length || panel.series.length > 1)
  const lineWidth = config.lineWidth ?? 2.4

  const series = panel.series.map((item) => {
    const isBar = item.type === 'bar'

    return {
      name: item.name,
      type: isBar ? 'bar' : 'line',
      data: item.data.map(getNumericValue),
      smooth: item.smooth ?? !isBar,
      showSymbol: isBar ? false : config.showSymbols ?? false,
      symbolSize: 5,
      barMaxWidth: isBar ? config.barMaxWidth ?? 28 : undefined,
      itemStyle: {
        color: item.color,
        borderRadius: isBar ? [6, 6, 0, 0] : undefined
      },
      lineStyle: !isBar
        ? {
            width: lineWidth,
            color: item.color
          }
        : undefined,
      areaStyle: item.area
        ? {
            color: item.color,
            opacity: 0.12
          }
        : undefined
    }
  })

  return {
    tooltip: horizontal
      ? {
          ...baseTooltip(),
          axisPointer: { type: 'shadow' }
        }
      : baseTooltip(),
    legend: showLegend
      ? {
          bottom: 0,
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: axisLabelColor,
            fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
            fontSize: 11
          }
        }
      : undefined,
    grid: horizontal
      ? {
          left: 8,
          right: 16,
          top: 20,
          bottom: config.gridBottom ?? (showLegend ? 44 : 8),
          containLabel: true
        }
      : {
          left: 16,
          right: 16,
          top: 16,
          bottom: config.gridBottom ?? (showLegend ? 56 : 16),
          containLabel: true
        },
    xAxis: horizontal
      ? {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: gridLineColor,
              type: 'dashed'
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            ...baseAxisLabel(),
            formatter: (value: number) => formatCompactNumber(value)
          }
        }
      : {
          type: 'category',
          data: panel.categories,
          axisTick: { show: false },
          axisLine: { lineStyle: { color: gridLineColor } },
          axisLabel: {
            ...baseAxisLabel(),
            interval: 0,
            rotate: config.axisLabelRotate ?? 0
          }
        },
    yAxis: horizontal
      ? {
          type: 'category',
          data: panel.categories,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            ...baseAxisLabel(),
            width: 180,
            overflow: 'truncate'
          }
        }
      : {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: gridLineColor,
              type: 'dashed'
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            ...baseAxisLabel(),
            formatter: (value: number) => formatCompactNumber(value)
          }
        },
    series,
    animationDuration: 600
  }
}

export function buildLineChartOption(panel: ChartPanelData, config: Omit<CartesianChartConfig, 'horizontal'> = {}): EChartsOption {
  return buildCartesianChartOption(panel, {
    ...config,
    horizontal: false,
    showSymbols: config.showSymbols ?? false
  })
}

export function buildVerticalBarChartOption(panel: ChartPanelData, config: Omit<CartesianChartConfig, 'horizontal'> = {}): EChartsOption {
  return buildCartesianChartOption(panel, {
    ...config,
    horizontal: false
  })
}

export function buildHorizontalBarChartOption(panel: ChartPanelData, config: Omit<CartesianChartConfig, 'horizontal'> = {}): EChartsOption {
  return buildCartesianChartOption(panel, {
    ...config,
    horizontal: true,
    showLegend: config.showLegend ?? false,
    gridBottom: config.gridBottom ?? 10
  })
}

export function buildTimelineChartOption(panel: ChartPanelData): EChartsOption {
  return buildLineChartOption(panel, {
    showLegend: true,
    showSymbols: false,
    gridBottom: 86,
    lineWidth: 1.8
  })
}

export function buildQmsActivityOption(panel: ChartPanelData): EChartsOption {
  return {
    ...buildCartesianChartOption(panel, {
      showLegend: true,
      showSymbols: true,
      gridBottom: 52,
      lineWidth: 2
    }),
    tooltip: {
      ...baseTooltip(),
      formatter: (params: Array<{ seriesName: string; value: number }>) =>
        params.map((item) => `${item.seriesName}: ${formatTooltipValue(item.value)}`).join('<br />')
    }
  }
}
