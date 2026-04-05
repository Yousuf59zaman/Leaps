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

const legendItems = computed<LegendItem[]>(() =>
  props.data.legend?.length
    ? props.data.legend
    : props.data.series.map((series) => ({
        id: series.id,
        label: series.name,
        color: series.color || '#3899FA'
      }))
)

const chartOption = computed<EChartsOption>(() => ({
  animationDuration: 600,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(56, 153, 250, 0.08)'
      }
    },
    backgroundColor: '#FFFFFF',
    borderColor: '#DEE2E7',
    borderWidth: 1,
    padding: [10, 12],
    textStyle: {
      color: '#171A1F',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12
    },
    formatter: (params: Array<{ seriesName: string; value: number }>) =>
      params.map((item) => `${item.seriesName}: ${item.value.toLocaleString()}`).join('<br />')
  },
  grid: {
    left: 2,
    right: 8,
    top: 10,
    bottom: 42,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: props.data.categories ?? [],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
      interval: 0,
      margin: 14
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 60000,
    interval: 15000,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
      margin: 14,
      formatter: (value: number) => `${Math.round(value / 1000)}k`
    },
    splitLine: {
      lineStyle: {
        color: '#DEE2E7',
        type: 'dashed',
        width: 1
      }
    }
  },
  series: props.data.series.map((series) => ({
    name: series.name,
    type: 'bar',
    data: series.data.map(getNumericValue),
    barWidth: 19,
    barGap: '18%',
    barCategoryGap: '38%',
    itemStyle: {
      color: series.color,
      borderRadius: [4, 4, 0, 0]
    }
  }))
}))
</script>

<template>
  <article
    class="relative w-full overflow-hidden rounded-[19px] bg-white px-5 pb-6 pt-8 shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] sm:px-7 lg:px-[33px] lg:pb-[28px] lg:pt-[31px] xl:h-[650px]"
  >
    <span class="absolute left-0 top-[31px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="flex items-start gap-[12px]">
      <DashboardIcon :name="data.icon || 'indicator'" :size="27" class="mt-[4px] text-[#3899FA]" />

      <div>
        <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
          {{ data.title }}
        </h2>
        <p
          v-if="data.subtitle"
          class="text-[15px] font-normal leading-[22px] text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]"
        >
          {{ data.subtitle }}
        </p>
      </div>
    </div>

    <div class="mt-4 lg:mt-[18px]">
      <DashboardChartFrame :option="chartOption" :height="440" />
    </div>

    <div class="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 pl-9 text-[12px] leading-[18px] text-[#171A1F] lg:pl-[44px] lg:text-[13px] lg:leading-[20px]">
      <div v-for="item in legendItems" :key="item.id" class="inline-flex items-center gap-2 whitespace-nowrap">
        <span class="h-[10px] w-[10px] rounded-full" :style="{ backgroundColor: item.color }" />
        <span :style="{ color: item.color }">{{ item.label }}</span>
      </div>
    </div>
  </article>
</template>
