<script setup lang="ts">
import { computed } from 'vue'
import type { RequestSummaryData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'
import DashboardIcon from '../shared/DashboardIcon.vue'

const props = defineProps<{
  data: RequestSummaryData
}>()

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

function outerRadiusForSegment(segmentId: string) {
  switch (segmentId) {
    case 'total-requests':
      return 139
    case 'complete':
      return 133
    case 'overdue':
      return 128
    case 'open':
      return 123
    case 'cancelled':
      return 119
    case 'rejected':
      return 115
    default:
      return 120
  }
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
          rawValue: totalRow.value.rawValue,
          outerRadius: outerRadiusForSegment(totalRow.value.id)
        }
      }

      const row = summaryMap.get(id)

      if (!row) {
        return null
      }

      return {
        id: row.id,
        color: row.background,
        rawValue: row.rawValue,
        outerRadius: outerRadiusForSegment(row.id)
      }
    })
    .filter((segment): segment is NonNullable<typeof segment> => Boolean(segment))

  const totalWeight = segmentSpecs.reduce((sum, segment) => sum + Math.max(1, Math.sqrt(segment.rawValue)), 0)

  let currentAngle = donutLayout.startAngle

  return segmentSpecs.map((segment) => {
    const sweepAngle = 360 * (Math.max(1, Math.sqrt(segment.rawValue)) / totalWeight)
    const nextAngle = currentAngle + sweepAngle
    const startAngle = currentAngle + donutLayout.gapAngle / 2
    const endAngle = Math.max(startAngle + 0.01, nextAngle - donutLayout.gapAngle / 2)

    currentAngle = nextAngle

    return {
      ...segment,
      path: buildSlicePath(startAngle, endAngle, segment.outerRadius, donutLayout.innerRadius)
    }
  })
})
</script>

<template>
  <article
    class="relative overflow-hidden rounded-[19px] border border-[#EFF0F6] bg-white shadow-[0px_6.66668px_26.6667px_rgba(0,0,0,0.05)] min-[1400px]:h-[429px]"
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

    <div class="grid gap-6 px-5 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[1fr_305px] lg:px-[31.67px] lg:py-[18px]">
      <div class="space-y-[18px] lg:pt-[2px]">
        <div class="flex items-center justify-between gap-4 text-base leading-6 text-[#15191E] sm:text-[18px] sm:leading-[27px] lg:text-[20px] lg:leading-[30px]">
          <span class="font-normal">{{ totalRow.label }}</span>
          <span
            class="inline-flex h-[24px] min-w-[68px] items-center justify-center rounded-[6px] px-2.5 text-sm font-semibold leading-5 sm:min-w-[74px] sm:px-3 sm:text-[16px] sm:leading-[21px]"
            :style="{ backgroundColor: totalRow.background, color: totalRow.color }"
          >
            {{ totalRow.value }}
          </span>
        </div>

        <div
          v-for="row in summaryRows"
          :key="row.id"
          class="flex items-center justify-between gap-4 text-base leading-6 text-[#15191E] sm:text-[18px] sm:leading-[27px] lg:text-[20px] lg:leading-[30px]"
        >
          <span class="font-normal">{{ row.label }}</span>
          <span
            class="inline-flex h-[28px] min-w-[64px] items-center justify-center rounded-[6px] px-2.5 text-sm font-semibold leading-5 sm:min-w-[70px] sm:px-3 sm:text-[16px] sm:leading-[21px]"
            :style="{ backgroundColor: row.background, color: row.color }"
          >
            {{ row.value }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-center lg:justify-end">
        <div class="relative size-[180px] sm:size-[210px] lg:size-[292px]">
          <svg class="h-full w-full overflow-visible" :viewBox="`0 0 ${donutLayout.size} ${donutLayout.size}`" aria-hidden="true">
            <path
              v-for="segment in donutSlices"
              :key="segment.id"
              :d="segment.path"
              :fill="segment.color"
            />
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
