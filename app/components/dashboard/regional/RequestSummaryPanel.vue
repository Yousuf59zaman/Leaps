<script setup lang="ts">
import { formatCount } from '../../../utils/dashboard-formatters'
import { createValueRadiusScale } from '../../../utils/dashboard-donut'

type DashboardMetricValue = number | string

interface ChartDataPoint {
  label: string
  value: DashboardMetricValue
  color?: string
}

interface RequestSummaryData {
  title: string
  icon?: string
  totalRequests: number
  totalLabel: string
  periodLabel: string
  statuses: Array<{
    id: string
    label: string
    value: DashboardMetricValue
    color?: string
  }>
  series: Array<{
    id: string
    name: string
    type: string
    color?: string
    data: Array<number | null | ChartDataPoint>
  }>
}

const props = defineProps<{
  data: RequestSummaryData
}>()

const activeSegmentId = ref<string | null>(null)

interface SummaryRow {
  id: string
  label: string
  value: string
  rawValue: number
  background: string
  color: string
}

function getBadgeStyle(id: string) {
  switch (id) {
    case 'total-requests':
      return { background: '#3899FA', color: '#FFFFFF' }
    case 'open':
      return { background: '#FF9330', color: '#FFFFFF' }
    case 'rejected':
      return { background: '#F3F5F7', color: '#15191E' }
    case 'cancelled':
      return { background: '#FF4343', color: '#FFFFFF' }
    case 'complete':
      return { background: '#4FD463', color: '#FFFFFF' }
    default:
      return { background: '#F4C533', color: '#FFFFFF' }
  }
}

const totalRow = computed<SummaryRow>(() => ({
  id: 'total-requests',
  label: props.data.totalLabel,
  value: formatCount(props.data.totalRequests),
  rawValue: props.data.totalRequests,
  ...getBadgeStyle('total-requests')
}))

const summaryRows = computed<SummaryRow[]>(() =>
  props.data.statuses.map((status) => ({
    id: status.id,
    label: status.label,
    value: formatCount(status.value),
    rawValue: typeof status.value === 'number' ? status.value : Number(status.value) || 0,
    ...getBadgeStyle(status.id)
  }))
)

const requestRows = computed<SummaryRow[]>(() => [totalRow.value, ...summaryRows.value])

const donutLayout = {
  size: 292,
  center: 146,
  innerRadius: 70,
  startAngle: -10,
  gapAngle: 1.1
}

function polarToCartesian(radius: number, angleDeg: number) {
  const radians = (angleDeg * Math.PI) / 180

  return {
    x: donutLayout.center + Math.sin(radians) * radius,
    y: donutLayout.center - Math.cos(radians) * radius
  }
}

function buildSlicePath(startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) {
  const outerStart = polarToCartesian(outerRadius, startAngle)
  const outerEnd = polarToCartesian(outerRadius, endAngle)
  const innerEnd = polarToCartesian(innerRadius, endAngle)
  const innerStart = polarToCartesian(innerRadius, startAngle)
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z'
  ].join(' ')
}

const donutSlices = computed(() => {
  const summaryMap = new Map(summaryRows.value.map((row) => [row.id, row]))
  const orderedIds = ['total-requests', 'complete', 'overdue', 'open', 'cancelled', 'rejected']
  const segmentSpecs = orderedIds
    .map((id) => {
      if (id === totalRow.value.id) {
        return {
          id: totalRow.value.id,
          color: totalRow.value.background,
          rawValue: totalRow.value.rawValue
        }
      }

      const row = summaryMap.get(id)

      if (!row) {
        return null
      }

      return {
        id: row.id,
        color: row.background,
        rawValue: row.rawValue
      }
    })
    .filter((segment): segment is NonNullable<typeof segment> => Boolean(segment))

  const radiusForValue = createValueRadiusScale(
    segmentSpecs.map((segment) => segment.rawValue),
    115,
    139
  )
  const totalWeight = segmentSpecs.reduce((sum, segment) => sum + Math.max(1, Math.sqrt(segment.rawValue)), 0)

  let currentAngle = donutLayout.startAngle

  return segmentSpecs.map((segment) => {
    const sweepAngle = 360 * (Math.max(1, Math.sqrt(segment.rawValue)) / totalWeight)
    const nextAngle = currentAngle + sweepAngle
    const startAngle = currentAngle + donutLayout.gapAngle / 2
    const endAngle = Math.max(startAngle + 0.01, nextAngle - donutLayout.gapAngle / 2)
    const midAngle = startAngle + (endAngle - startAngle) / 2

    currentAngle = nextAngle

    return {
      ...segment,
      outerRadius: radiusForValue(segment.rawValue),
      midAngle,
      path: buildSlicePath(startAngle, endAngle, radiusForValue(segment.rawValue), donutLayout.innerRadius)
    }
  })
})

const activeDetail = computed(() => {
  const row = requestRows.value.find((item) => item.id === activeSegmentId.value)

  if (!row) {
    return null
  }

  return {
    ...row,
    percentage: props.data.totalRequests > 0
      ? Math.round((row.rawValue / props.data.totalRequests) * 100)
      : 0
  }
})

function setActiveSegment(id: string) {
  activeSegmentId.value = id
}

function clearActiveSegment() {
  activeSegmentId.value = null
}

function isDimmed(id: string) {
  if (!activeSegmentId.value) {
    return false
  }

  const activeSliceExists = donutSlices.value.some((segment) => segment.id === activeSegmentId.value)

  if (!activeSliceExists) {
    return false
  }

  return activeSegmentId.value !== id
}
</script>

<template>
  <article
    class="relative overflow-hidden rounded-[19px] border border-[#EFF0F6] bg-white shadow-[0px_6.66668px_26.6667px_rgba(0,0,0,0.05)] min-[1400px]:min-h-[429px]"
  >
    <span class="absolute left-0 top-[21.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="border-b border-[#E4E5E7] px-5 pb-5 pt-6 sm:px-6 lg:px-[31.67px] lg:pb-[18px] lg:pt-[23px]">
      <div class="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div class="flex items-center gap-3">
          <DashboardIcon :name="data.icon || 'map'" :size="24" class="text-[#3899FA]" />
          <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
            {{ data.title }}
          </h2>
        </div>

        <button class="inline-flex items-center gap-1 text-[14px] font-normal leading-[21px] text-[#1C3662]">
          <span>{{ data.periodLabel }}</span>
          <DashboardIcon name="chevron" :size="14" class="text-[#667085]" />
        </button>
      </div>
    </div>

    <div class="grid gap-5 px-5 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(190px,230px)] md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(220px,292px)] lg:gap-6 lg:px-[31.67px] lg:py-[18px]">
      <div class="space-y-3 lg:space-y-[14px] lg:pt-[2px]">
        <button
          type="button"
          class="group flex w-full items-center justify-between gap-3 rounded-[12px] px-2 py-1 text-left text-base leading-6 text-[#15191E] transition-colors duration-200 hover:bg-[#F8FAFC] sm:text-[18px] sm:leading-[27px] lg:text-[18px] lg:leading-[27px] min-[1700px]:text-[20px] min-[1700px]:leading-[30px]"
          :class="{ 'bg-[#F8FAFC] shadow-[inset_0_0_0_1px_rgba(56,153,250,0.16)]': activeSegmentId === totalRow.id }"
          @mouseenter="setActiveSegment(totalRow.id)"
          @mouseleave="clearActiveSegment"
          @focus="setActiveSegment(totalRow.id)"
          @blur="clearActiveSegment"
        >
          <span class="font-normal">{{ totalRow.label }}</span>
          <span
            class="inline-flex h-[24px] min-w-[68px] items-center justify-center rounded-[6px] px-2.5 text-sm font-semibold leading-5 transition-transform duration-200 group-hover:scale-105 sm:min-w-[74px] sm:px-3 sm:text-[16px] sm:leading-[21px]"
            :style="{ backgroundColor: totalRow.background, color: totalRow.color }"
          >
            {{ totalRow.value }}
          </span>
        </button>

        <button
          v-for="row in summaryRows"
          :key="row.id"
          type="button"
          class="group flex w-full items-center justify-between gap-3 rounded-[12px] px-2 py-1 text-left text-base leading-6 text-[#15191E] transition-colors duration-200 hover:bg-[#F8FAFC] sm:text-[18px] sm:leading-[27px] lg:text-[18px] lg:leading-[27px] min-[1700px]:text-[20px] min-[1700px]:leading-[30px]"
          :class="{ 'bg-[#F8FAFC] shadow-[inset_0_0_0_1px_rgba(56,153,250,0.16)]': activeSegmentId === row.id }"
          @mouseenter="setActiveSegment(row.id)"
          @mouseleave="clearActiveSegment"
          @focus="setActiveSegment(row.id)"
          @blur="clearActiveSegment"
        >
          <span class="font-normal">{{ row.label }}</span>
          <span
            class="inline-flex h-[28px] min-w-[64px] items-center justify-center rounded-[6px] px-2.5 text-sm font-semibold leading-5 transition-transform duration-200 group-hover:scale-105 sm:min-w-[70px] sm:px-3 sm:text-[16px] sm:leading-[21px]"
            :style="{ backgroundColor: row.background, color: row.color }"
          >
            {{ row.value }}
          </span>
        </button>
      </div>

      <div class="flex min-w-0 items-center justify-center md:justify-end">
        <div class="relative aspect-square w-full max-w-[292px] min-w-[180px]">
          <div
            class="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white/95 text-center shadow-[0_16px_32px_rgba(15,23,42,0.14)] transition-all duration-200"
            :class="{ 'opacity-0 scale-90': !activeDetail, 'opacity-100 scale-100': activeDetail }"
          >
            <template v-if="activeDetail">
              <span class="max-w-[70px] text-[10px] font-medium leading-3 text-[#8D97A5] sm:max-w-[78px] sm:text-[11px] sm:leading-[14px] lg:max-w-[90px] lg:text-[12px] lg:leading-4">
                {{ activeDetail.label }}
              </span>
              <span class="mt-1 text-[14px] font-semibold leading-4 text-[#15191E] sm:text-[15px] sm:leading-5 lg:text-[18px] lg:leading-6">
                {{ activeDetail.value }}
              </span>
              <span class="mt-1 text-[10px] font-medium leading-3 text-[#3899FA] lg:text-[11px] lg:leading-4">
                {{ activeDetail.percentage }}%
              </span>
            </template>
          </div>

          <svg class="h-full w-full overflow-visible" :viewBox="`0 0 ${donutLayout.size} ${donutLayout.size}`" aria-hidden="true">
            <g
              v-for="segment in donutSlices"
              :key="segment.id"
              class="cursor-pointer transition-opacity duration-150 ease-out"
              :class="{ 'opacity-35': isDimmed(segment.id) }"
              @mouseenter="setActiveSegment(segment.id)"
              @mouseleave="clearActiveSegment"
              @focus="setActiveSegment(segment.id)"
              @blur="clearActiveSegment"
            >
              <path
                :d="segment.path"
                :fill="segment.color"
                tabindex="0"
                focusable="true"
                class="drop-shadow-[0_10px_22px_rgba(15,23,42,0.08)] transition-[filter] duration-200"
              />
            </g>
            <circle
              :cx="donutLayout.center"
              :cy="donutLayout.center"
              :r="donutLayout.innerRadius - 1"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>
