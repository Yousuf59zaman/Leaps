<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { ChartPanelData } from '../../../../types'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardIcon from '../shared/DashboardIcon.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const legendItems = computed(() =>
  (props.data.legend ?? props.data.series.map((series) => ({
    id: series.id,
    label: series.name,
    color: series.color ?? '#3899FA'
  }))).map((item) => ({
    ...item,
    isLine: item.id === 'abandoned'
  }))
)

const chartOption = computed<EChartsOption>(() => {
  const categories = props.data.categories ?? []
  const bars = props.data.series.filter((series) => series.type === 'bar')
  const line = props.data.series.find((series) => series.type === 'line')

  return {
    animationDuration: 550,
    grid: {
      left: 88,
      right: 28,
      top: 10,
      bottom: 96
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: '#FFFFFF',
      borderColor: '#EFF0F6',
      borderWidth: 1,
      textStyle: {
        color: '#15191E',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
      },
      formatter: (params: Array<{ seriesName: string; value: number }>) =>
        params.map((item) => `${item.seriesName}: ${item.value.toLocaleString()}`).join('<br />')
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#8D97A5',
        fontSize: 21.3333,
        lineHeight: 32,
        margin: 18,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 120000,
      interval: 30000,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#8D97A5',
        fontSize: 21.3333,
        lineHeight: 32,
        margin: 22,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        formatter: (value: number) => `${Math.round(value / 1000)}k`
      },
      splitLine: {
        lineStyle: {
          color: '#DEE2E7',
          type: 'dashed',
          width: 1.33333
        }
      }
    },
    series: [
      ...bars.map((series) => ({
        name: series.name,
        type: 'bar',
        data: series.data,
        barWidth: 60,
        barGap: '18%',
        barCategoryGap: '34%',
        z: 2,
        itemStyle: {
          color: series.color,
          borderRadius: [3, 3, 0, 0]
        }
      })),
      ...(line
        ? [
            {
              name: line.name,
              type: 'line',
              data: line.data,
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              showSymbol: true,
              z: 3,
              lineStyle: {
                color: line.color,
                width: 4
              },
              itemStyle: {
                color: '#FFFFFF',
                borderColor: line.color,
                borderWidth: 2.5
              }
            }
          ]
        : [])
    ]
  }
})
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] xl:min-h-[554.67px]">
    <span class="absolute left-0 top-[30px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-7 pb-8 pt-7 xl:px-[34px] xl:pb-[33px] xl:pt-[29px]">
      <div class="flex items-start gap-3">
        <DashboardIcon :name="data.icon || 'indicator'" :size="27" class="mt-[6px] text-[#3899FA]" />

        <div>
          <h3 class="text-[24px] font-semibold leading-[37px] text-[#15191E]">
            {{ data.title }}
          </h3>
          <p v-if="data.subtitle" class="text-[18.6667px] font-normal leading-[27px] text-[#8D97A5]">
            {{ data.subtitle }}
          </p>
        </div>
      </div>

      <div class="relative mt-[26px] h-[400px]">
        <DashboardChartFrame :option="chartOption" :height="400" />

        <div class="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-[26px]">
          <div v-for="item in legendItems" :key="item.id" class="flex items-center gap-[6px]">
            <span
              v-if="!item.isLine"
              class="h-[18.67px] w-[18.67px] rounded-[1px]"
              :style="{ backgroundColor: item.color }"
            />

            <span v-else class="relative flex w-[18.67px] items-center justify-center">
              <span class="absolute h-[2.5px] w-full bg-[#EF4343]" />
              <span class="relative h-[8px] w-[8px] rounded-full border-[2px] border-[#EF4343] bg-white" />
            </span>

            <span
              class="text-center text-[21.3333px] font-normal leading-[32px]"
              :style="{ color: item.color }"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
