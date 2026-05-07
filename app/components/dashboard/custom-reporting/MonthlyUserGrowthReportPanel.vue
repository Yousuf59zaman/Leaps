<script setup lang="ts">
const searchQuery = ref('')
const activePeriod = ref<'monthly' | 'quarterly'>('monthly')
const activePointIndex = ref<number | null>(null)

const growthColors = {
  brand: '#3899FA',
  success: '#1DC973',
  lightSuccess: '#75D337',
  grid: '#EFF0F6',
  axis: '#DEE2E7',
  text: '#15191E',
  muted: '#8D97A5'
} as const

const periodOptions = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'quarterly', label: 'Quarterly' }
] as const

const chartValues = [
  { month: 'Jan', value: 1 },
  { month: 'Feb', value: 1 },
  { month: 'Mar', value: 2 },
  { month: 'Apr', value: 1 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 1 },
  { month: 'Jul', value: 0 },
  { month: 'Aug', value: 4 },
  { month: 'Sep', value: 1 },
  { month: 'Oct', value: 2 },
  { month: 'Nov', value: 3 },
  { month: 'Dec', value: 1 }
]

const rows = [
  { id: 'barmm-aug', region: 'Bangsamoro (BARMM)', period: '2025 August', count: 4 },
  { id: 'barmm-dec', region: 'Bangsamoro (BARMM)', period: '2025 December', count: 1 },
  { id: 'barmm-jan', region: 'Bangsamoro (BARMM)', period: '2025 January', count: 1 },
  { id: 'barmm-feb', region: 'Bangsamoro (BARMM)', period: '2025 February', count: 1 },
  { id: 'region-i-mar', region: 'Region I', period: '2025 March', count: 2 },
  { id: 'ncr-jun', region: 'NCR', period: '2025 June', count: 1 }
]

const chartBounds = {
  width: 1289.56,
  height: 208.53,
  left: 42,
  top: 14,
  right: 9,
  bottom: 38,
  max: 4
} as const

const tooltipBounds = {
  width: 156,
  height: 56,
  offset: 12
} as const

const plotWidth = chartBounds.width - chartBounds.left - chartBounds.right
const plotHeight = chartBounds.height - chartBounds.top - chartBounds.bottom
const plotBottom = chartBounds.top + plotHeight
const yTicks = [4, 3, 2, 1, 0]
const sortIcon = '&#8645;'
const maxCount = 4

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return rows
  }

  return rows.filter(row => row.region.toLowerCase().includes(search) || row.period.toLowerCase().includes(search))
})

const chartPoints = computed(() => chartValues.map((point, index) => ({
  ...point,
  x: chartBounds.left + (plotWidth / (chartValues.length - 1)) * index,
  y: plotBottom - (point.value / chartBounds.max) * plotHeight
})))

const activePoint = computed(() => {
  if (activePointIndex.value === null) {
    return null
  }

  return chartPoints.value[activePointIndex.value] ?? null
})

const tooltipPosition = computed(() => {
  const point = activePoint.value

  if (!point) {
    return null
  }

  const x = clamp(
    point.x - (tooltipBounds.width / 2),
    chartBounds.left,
    chartBounds.width - chartBounds.right - tooltipBounds.width
  )
  const y = point.y - tooltipBounds.height - tooltipBounds.offset < chartBounds.top
    ? point.y + tooltipBounds.offset
    : point.y - tooltipBounds.height - tooltipBounds.offset

  return { x, y }
})

const linePath = computed(() => createSmoothPath(chartPoints.value))

const areaPath = computed(() => {
  const points = chartPoints.value

  if (!points.length) {
    return ''
  }

  const first = points[0]
  const last = points[points.length - 1]

  return `${linePath.value} L ${round(last.x)} ${round(plotBottom)} L ${round(first.x)} ${round(plotBottom)} Z`
})

function round(value: number) {
  return Number(value.toFixed(2))
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function createSmoothPath(points: Array<{ x: number, y: number }>) {
  if (!points.length) {
    return ''
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${round(point.x)} ${round(point.y)}`
    }

    const previous = points[index - 1]
    const beforePrevious = points[index - 2] ?? previous
    const next = points[index + 1] ?? point
    const controlPointOneX = previous.x + (point.x - beforePrevious.x) / 6
    const controlPointOneY = clamp(previous.y + (point.y - beforePrevious.y) / 6, chartBounds.top, plotBottom)
    const controlPointTwoX = point.x - (next.x - previous.x) / 6
    const controlPointTwoY = clamp(point.y - (next.y - previous.y) / 6, chartBounds.top, plotBottom)

    return `${path} C ${round(controlPointOneX)} ${round(controlPointOneY)}, ${round(controlPointTwoX)} ${round(controlPointTwoY)}, ${round(point.x)} ${round(point.y)}`
  }, '')
}

function tickY(value: number) {
  return plotBottom - (value / chartBounds.max) * plotHeight
}

function barWidth(value: number) {
  return `${(value / maxCount) * 100}%`
}

function barColor(value: number) {
  if (value === maxCount) {
    return growthColors.success
  }

  if (value === 2) {
    return growthColors.lightSuccess
  }

  return growthColors.brand
}

function setActivePoint(index: number) {
  activePointIndex.value = index
}

function clearActivePoint() {
  activePointIndex.value = null
}
</script>

<template>
  <article class="min-h-[740px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[14.76px] pt-[22.1401px]">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-[17.2201px] font-semibold leading-[21px] text-[#15191E]">
            Monthly User Growth
          </h3>
          <p class="mt-[2.46px] text-[13.5301px] leading-4 text-[#8D97A5]">
            New user registrations over time
          </p>
        </div>

        <div class="flex w-full flex-wrap items-center gap-x-[7.38003px] gap-y-2 sm:w-auto">
          <div class="flex h-[30.76px] items-start gap-[4.92px]">
            <button
              v-for="period in periodOptions"
              :key="period.key"
              type="button"
              class="inline-flex h-[30.76px] items-center justify-center rounded-[6.15002px] border px-[12.3px] py-[6.15002px] font-[Arial] text-[13.5301px] leading-4"
              :class="activePeriod === period.key ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: period.key === 'monthly' ? '75.06px' : '83.06px' }"
              :aria-pressed="activePeriod === period.key"
              @click="activePeriod = period.key"
            >
              {{ period.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[219.4px]">
            <span class="sr-only">Filter region</span>
            <DashboardIcon name="search" :size="14.63" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Filter region..."
              class="h-[35.22px] w-full rounded-[7.38003px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.38003px] pl-[33.2101px] pr-[12.3px] text-[14.7601px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <section class="h-[302.92px] overflow-hidden rounded-[12.3px] border border-[#EFF0F6] bg-white pt-[2.46001px]">
        <header class="flex h-[49.75px] items-center px-[19.6801px] py-[14.7601px]">
          <h4 class="text-[15.9901px] font-semibold leading-[19px] text-[#15191E]">
            Growth Trend
          </h4>
        </header>

        <div class="h-[248.25px] px-[19.6801px] py-[19.6801px]">
          <svg
            class="h-[208.53px] w-full"
            :viewBox="`0 0 ${chartBounds.width} ${chartBounds.height}`"
            role="img"
            aria-label="Monthly user growth trend"
            preserveAspectRatio="none"
            @mouseleave="clearActivePoint"
          >
            <defs>
              <linearGradient id="monthly-growth-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#3899FA" stop-opacity="0.16" />
                <stop offset="100%" stop-color="#3899FA" stop-opacity="0.06" />
              </linearGradient>
            </defs>

            <g>
              <g v-for="tick in yTicks" :key="`grid-${tick}`">
                <line
                  :x1="chartBounds.left"
                  :x2="chartBounds.width - chartBounds.right"
                  :y1="tickY(tick)"
                  :y2="tickY(tick)"
                  :stroke="growthColors.grid"
                  stroke-width="1"
                />
                <text
                  x="8"
                  :y="tickY(tick) + 4"
                  fill="#8D97A5"
                  font-family="Inter, ui-sans-serif, system-ui, sans-serif"
                  font-size="14.7601"
                >
                  {{ tick }}
                </text>
              </g>
              <line
                :x1="chartBounds.left"
                :x2="chartBounds.left"
                :y1="chartBounds.top"
                :y2="plotBottom"
                :stroke="growthColors.axis"
                stroke-width="1"
              />
            </g>

            <path :d="areaPath" fill="url(#monthly-growth-fill)" />
            <path :d="linePath" fill="none" stroke="#3899FA" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />

            <g
              v-if="activePoint && tooltipPosition"
              class="pointer-events-none"
            >
              <line
                :x1="activePoint.x"
                :x2="activePoint.x"
                :y1="chartBounds.top"
                :y2="plotBottom"
                stroke="#3899FA"
                stroke-dasharray="5 5"
                stroke-opacity="0.45"
                stroke-width="1.5"
              />
              <circle
                :cx="activePoint.x"
                :cy="activePoint.y"
                r="10.5"
                fill="#3899FA"
                opacity="0.14"
              />
              <circle
                :cx="activePoint.x"
                :cy="activePoint.y"
                r="6.2"
                fill="#FFFFFF"
                stroke="#3899FA"
                stroke-width="3"
              />
              <rect
                :x="tooltipPosition.x"
                :y="tooltipPosition.y"
                :width="tooltipBounds.width"
                :height="tooltipBounds.height"
                rx="8"
                fill="#15191E"
                opacity="0.94"
              />
              <text
                :x="tooltipPosition.x + 14"
                :y="tooltipPosition.y + 22"
                fill="#FFFFFF"
                font-family="Inter, ui-sans-serif, system-ui, sans-serif"
                font-size="13.5301"
                font-weight="600"
              >
                {{ activePoint.month }} 2025
              </text>
              <text
                :x="tooltipPosition.x + 14"
                :y="tooltipPosition.y + 42"
                fill="#CFE6FF"
                font-family="Inter, ui-sans-serif, system-ui, sans-serif"
                font-size="12.3"
                font-weight="500"
              >
                {{ activePoint.value }} new registrations
              </text>
            </g>

            <g
              v-for="(point, index) in chartPoints"
              :key="`point-${point.month}`"
            >
              <circle
                :cx="point.x"
                :cy="point.y"
                :r="activePointIndex === index ? 5.8 : 4.6"
                fill="#3899FA"
              />
              <circle
                :cx="point.x"
                :cy="point.y"
                r="18"
                fill="transparent"
                class="cursor-pointer outline-none"
                role="button"
                tabindex="0"
                :aria-label="`${point.month}: ${point.value} new registrations`"
                @mouseenter="setActivePoint(index)"
                @focus="setActivePoint(index)"
                @click="setActivePoint(index)"
                @keydown.enter.prevent="setActivePoint(index)"
                @keydown.space.prevent="setActivePoint(index)"
                @blur="clearActivePoint"
              />
            </g>

            <text
              v-for="point in chartPoints"
              :key="`month-${point.month}`"
              :x="point.x"
              :y="chartBounds.height - 7"
              fill="#8D97A5"
              font-family="Inter, ui-sans-serif, system-ui, sans-serif"
              font-size="14.7601"
              text-anchor="middle"
            >
              {{ point.month }}
            </text>
          </svg>
        </div>
      </section>

      <section class="h-[305.04px] overflow-hidden rounded-[12.3px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[780px] border-separate border-spacing-0">
            <colgroup>
              <col class="w-[32.33%]" />
              <col class="w-[24.62%]" />
              <col class="w-[16.65%]" />
              <col class="w-[26.4%]" />
            </colgroup>

            <thead>
              <tr>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-left text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  <span class="inline-flex items-center gap-[3.69px]">
                    Region <span class="font-[Cambria_Math] text-[11.07px] font-normal leading-[13px] opacity-35" v-html="sortIcon" />
                  </span>
                </th>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-left text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  <span class="inline-flex items-center gap-[3.69px]">
                    Period <span class="font-[Cambria_Math] text-[11.07px] font-normal leading-[13px] opacity-35" v-html="sortIcon" />
                  </span>
                </th>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-right text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  <span class="inline-flex items-center justify-end gap-[3.69px]">
                    Count <span class="font-[Cambria_Math] text-[11.07px] font-normal leading-[13px] opacity-35" v-html="sortIcon" />
                  </span>
                </th>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-left text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  Relative Volume
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in filteredRows" :key="row.id">
                <td class="border-b border-[#EFF0F6] px-[17.2201px] py-[12.9151px] text-[14.7601px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.region }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.2201px] py-[12.9151px] text-[14.7601px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.period }}
                </td>
                <td
                  class="border-b border-[#EFF0F6] px-[17.2201px] py-[12.9151px] text-right text-[14.7601px] leading-[18px]"
                  :class="row.count === maxCount ? 'font-bold text-[#3899FA]' : 'font-medium text-[#15191E]'"
                >
                  {{ row.count }}
                </td>
                <td class="border-b border-[#EFF0F6] py-[19.97px] pl-[17.2324px] pr-[17.2201px]">
                  <span class="flex h-[4.96px] overflow-hidden rounded-[2.46001px] bg-[#EFF0F6]">
                    <span
                      class="h-full rounded-[2.46001px]"
                      :style="{ width: barWidth(row.count), backgroundColor: barColor(row.count) }"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </article>
</template>
