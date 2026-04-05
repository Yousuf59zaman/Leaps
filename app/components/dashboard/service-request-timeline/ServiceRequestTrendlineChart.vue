<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { ChartDataPoint, ChartPanelData, LegendItem } from '../../../../types'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardIcon from '../shared/DashboardIcon.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

function getNumericValue(point: number | null | ChartDataPoint) {
  if (typeof point === 'number') {
    return point
  }

  if (point === null) {
    return 0
  }

  return Number(point.value)
}

function buildMonthlyCategories(categories: string[]) {
  return categories.flatMap((label, index) => (index === categories.length - 1 ? [label] : [label, '']))
}

function densifySeriesData(points: Array<number | null | ChartDataPoint>) {
  const values = points.map(getNumericValue)

  return values.flatMap((value, index) => {
    if (index === values.length - 1) {
      return [value]
    }

    const nextValue = values[index + 1]
    const midpoint = Math.round((value + nextValue) / 2)

    return [value, midpoint]
  })
}

const legendItems = computed<LegendItem[]>(() =>
  props.data.legend?.length
    ? props.data.legend
    : props.data.series.map((series) => ({
        id: series.id,
        label: series.name,
        color: series.color || '#3B82F6'
      }))
)

const legendRows = computed(() => [
  legendItems.value.slice(0, 5),
  legendItems.value.slice(5, 10),
  legendItems.value.slice(10)
])

const monthlyCategories = computed(() => buildMonthlyCategories(props.data.categories ?? []))

const chartOption = computed<EChartsOption>(() => ({
  animationDuration: 600,
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    padding: [10, 12],
    textStyle: {
      color: '#171A1F',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#CBD5E1',
        type: 'dashed'
      }
    }
  },
  grid: {
    left: 8,
    right: 10,
    top: 6,
    bottom: 44,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: monthlyCategories.value,
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: '#64748B',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
      margin: 14,
      interval: 0,
      hideOverlap: false
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 165,
    interval: 55,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#171A1F',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
      margin: 14
    },
    splitLine: {
      lineStyle: {
        color: '#DEE1E6',
        type: 'dashed',
        width: 1.2
      }
    }
  },
  series: props.data.series.map((series) => ({
    name: series.name,
    type: 'line',
    smooth: true,
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 4.5,
    data: densifySeriesData(series.data),
    lineStyle: {
      width: 2,
      color: series.color
    },
    itemStyle: {
      color: series.color
    }
  }))
}))
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)]">
    <span class="absolute left-0 top-[29.54px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <header
      class="flex min-h-[87.78px] items-center border-b border-[#DEE1E6] bg-[rgba(255,255,255,0.5)] px-5 py-5 sm:px-6 lg:px-[30.53px]"
    >
      <div class="flex items-center gap-[10px]">
        <DashboardIcon :name="data.icon || 'building-2'" :size="27" class="text-[#3899FA]" />
        <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
          {{ data.title }}
        </h2>
      </div>
    </header>

    <div class="px-4 pb-6 pt-6 sm:px-6 lg:px-[30.53px] lg:pb-[26px] lg:pt-[30.54px]">
      <DashboardChartFrame :option="chartOption" :height="560" />

      <div class="mt-2 flex flex-col items-center gap-[10px] lg:mt-[18px]">
        <div
          v-for="(row, rowIndex) in legendRows"
          :key="`trendline-legend-row-${rowIndex}`"
          class="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:gap-x-5"
        >
          <div
            v-for="item in row"
            :key="item.id"
            class="inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-normal leading-[18px] text-[#171A1F] lg:text-[13px] lg:leading-[20px]"
          >
            <span class="h-[8px] w-[8px] rounded-full lg:h-[10.15px] lg:w-[10.15px]" :style="{ backgroundColor: item.color }" />
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
