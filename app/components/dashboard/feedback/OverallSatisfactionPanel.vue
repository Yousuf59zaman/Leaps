<script setup lang="ts">
import { createDonutSlices, createValueRadiusScale } from '../../../utils/dashboard-donut'

interface LegendItem {
  id: string
  label: string
  color: string
  value?: number | string
  percentage?: number
  tone?: string
}

interface ChartDataPoint {
  label: string
  value: number | string
  color?: string
  meta?: Record<string, string | number | boolean | null>
}

interface ChartSeriesData {
  id: string
  name: string
  type: string
  color?: string
  stack?: string
  smooth?: boolean
  area?: boolean
  data: Array<number | null | ChartDataPoint>
}

interface DonutPanelData {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: Array<{ id: string, label: string, icon?: string }>
  series: ChartSeriesData[]
  legend: LegendItem[]
  centerLabel?: string
}

const props = defineProps<{
  data: DonutPanelData
}>()

const activeSegmentId = ref<string | null>(null)

const chartSegments = computed(() => {
  const orderedIds = ['good', 'very-good', 'average', 'bad', 'very-bad']
  const byId = new Map(props.data.legend.map((item) => [item.id, item]))

  return orderedIds
    .map((id) => byId.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
})

const activeSegment = computed(() => {
  const item = chartSegments.value.find((segment) => segment.id === activeSegmentId.value)

  if (!item) {
    return null
  }

  return {
    label: item.label,
    value: item.percentage ?? 0,
    color: item.color
  }
})

const donutGeometry = {
  viewBoxSize: 320,
  center: 160,
  innerRadius: 78,
  startAngle: -10,
  gapAngle: 1.1
}

function setActiveSegment(id: string) {
  activeSegmentId.value = id
}

function clearActiveSegment() {
  activeSegmentId.value = null
}

function isDimmed(id: string) {
  return Boolean(activeSegmentId.value) && activeSegmentId.value !== id
}

const donutSlices = computed(() => {
  const radiusForValue = createValueRadiusScale(
    chartSegments.value.map((segment) => segment.percentage ?? 0),
    128,
    152
  )

  return createDonutSlices(chartSegments.value, {
    layout: donutGeometry,
    getOuterRadius: (segment) => radiusForValue(segment.percentage ?? 0),
    getSweepAngle: (segment) => (typeof segment.percentage === 'number' ? segment.percentage : 0) * 3.6
  })
})
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] min-[1600px]:min-h-[585.33px]">
    <span class="absolute left-[0.33px] top-[24.33px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-[25.33px] xl:px-[33.33px]">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <DashboardIcon :name="data.icon || 'like'" :size="27" class="text-[#3899FA]" />
          <h3 class="text-[20px] font-semibold leading-[30px] text-[#15191E] sm:text-[24px] sm:leading-[37px]">
            {{ data.title }}
          </h3>
        </div>

        <button
          v-if="data.actions?.[0]"
          type="button"
          class="inline-flex h-9 items-center gap-2 rounded-[12px] border border-[#DEE2E7] bg-white px-[14px] text-[12px] font-medium leading-5 text-[#15191E]"
        >
          <DashboardIcon v-if="data.actions[0].icon" :name="data.actions[0].icon" :size="14" class="text-[#15191E]" />
          <span>{{ data.actions[0].label }}</span>
        </button>
      </div>

      <div class="mt-[24px] flex justify-center">
        <div class="relative h-[240px] w-[240px] sm:h-[308px] sm:w-[308px]">
          <div
            class="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white/95 text-center shadow-[0_16px_32px_rgba(15,23,42,0.14)] transition-all duration-200 sm:h-[114px] sm:w-[114px]"
            :class="{ 'opacity-0 scale-90': !activeSegment, 'opacity-100 scale-100': activeSegment }"
          >
            <template v-if="activeSegment">
              <span class="max-w-[72px] text-[10px] font-medium leading-[13px] text-[#8D97A5] sm:max-w-[88px] sm:text-[12px] sm:leading-4">
                {{ activeSegment.label }}
              </span>
              <span class="mt-1 text-[16px] font-semibold leading-5 sm:text-[20px] sm:leading-6" :style="{ color: activeSegment.color }">
                {{ activeSegment.value }}%
              </span>
            </template>
          </div>

          <svg
            class="h-full w-full overflow-visible"
            :viewBox="`0 0 ${donutGeometry.viewBoxSize} ${donutGeometry.viewBoxSize}`"
            aria-hidden="true"
          >
            <g
              v-for="segment in donutSlices"
              :key="segment.id"
              class="cursor-pointer transition-opacity duration-150 ease-out"
              :class="{ 'opacity-40': isDimmed(segment.id) }"
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
                class="drop-shadow-[0_10px_22px_rgba(15,23,42,0.08)]"
              />
            </g>

            <circle
              :cx="donutGeometry.center"
              :cy="donutGeometry.center"
              :r="donutGeometry.innerRadius - 1"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      <div class="mt-[30px] grid gap-x-[24px] gap-y-[10px] sm:mt-[38px] sm:grid-cols-2 sm:px-[22px]">
        <button
          v-for="item in data.legend"
          :key="item.id"
          type="button"
          class="flex appearance-none items-center justify-between gap-4 rounded-[12px] border-0 bg-transparent px-2 py-1 text-left transition-all duration-200 hover:bg-[#F8FAFC]"
          :class="{ 'sm:col-span-2 sm:max-w-[228px]': item.id === 'very-bad' }"
          :style="activeSegmentId === item.id ? 'box-shadow: inset 0 0 0 1px rgba(56,153,250,0.14); background:#F8FAFC;' : ''"
          @mouseenter="setActiveSegment(item.id)"
          @mouseleave="clearActiveSegment"
          @focus="setActiveSegment(item.id)"
          @blur="clearActiveSegment"
        >
          <div class="flex min-w-0 items-center gap-[10px]">
            <span class="h-4 w-4 rounded-full" :style="{ backgroundColor: item.color }" />
            <span class="truncate text-[15px] font-normal leading-6 text-[#8D97A5] sm:text-[18.6667px] sm:leading-[27px]">
              {{ item.label }}
            </span>
          </div>

          <span class="text-[15px] font-medium leading-6 text-[#15191E] sm:text-[18.6667px] sm:leading-[27px]">
            {{ item.percentage }}%
          </span>
        </button>
      </div>
    </div>
  </article>
</template>
