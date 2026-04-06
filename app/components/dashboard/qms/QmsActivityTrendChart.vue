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

function buildSeriesStyles(barWidth: number, lineWidth: number, symbolSize: number, lineBorderWidth: number) {
  const bars = props.data.series.filter((series) => series.type === 'bar')
  const line = props.data.series.find((series) => series.type === 'line')

  return [
    ...bars.map((series) => ({
      name: series.name,
      type: 'bar',
      data: series.data,
      barWidth,
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
            symbolSize,
            showSymbol: true,
            z: 3,
            lineStyle: {
              color: line.color,
              width: lineWidth
            },
            itemStyle: {
              color: '#FFFFFF',
              borderColor: line.color,
              borderWidth: lineBorderWidth
            }
          }
        ]
      : [])
  ]
}

const chartOption = computed<EChartsOption>(() => {
  const categories = props.data.categories ?? []

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
    series: buildSeriesStyles(60, 4, 8, 2.5),
    media: [
      {
        query: {
          maxWidth: 1023
        },
        option: {
          grid: {
            left: 58,
            right: 18,
            top: 8,
            bottom: 52
          },
          xAxis: {
            axisLabel: {
              fontSize: 15,
              lineHeight: 22,
              margin: 14
            }
          },
          yAxis: {
            axisLabel: {
              fontSize: 15,
              lineHeight: 22,
              margin: 16
            }
          },
          series: buildSeriesStyles(42, 3.5, 7, 2.25)
        }
      },
      {
        query: {
          maxWidth: 767
        },
        option: {
          grid: {
            left: 36,
            right: 8,
            top: 12,
            bottom: 42
          },
          xAxis: {
            axisLabel: {
              fontSize: 11,
              lineHeight: 16,
              margin: 8,
              hideOverlap: false
            }
          },
          yAxis: {
            axisLabel: {
              fontSize: 11,
              lineHeight: 16,
              margin: 8
            }
          },
          series: buildSeriesStyles(24, 2.5, 4.5, 1.5)
        }
      }
    ]
  }
})
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] min-[1400px]:min-h-[554.67px]">
    <span class="absolute left-0 top-[30px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-4 pb-5 pt-5 min-[414px]:px-5 min-[414px]:pb-6 min-[414px]:pt-6 sm:px-6 sm:pb-8 sm:pt-7 xl:px-[34px] xl:pb-[33px] xl:pt-[29px]">
      <div class="flex items-start gap-3">
        <DashboardIcon :name="data.icon || 'indicator'" :size="27" class="mt-[6px] text-[#3899FA]" />

        <div>
          <h3 class="text-[18px] font-semibold leading-[28px] text-[#15191E] min-[414px]:text-[20px] min-[414px]:leading-[30px] sm:text-[24px] sm:leading-[37px]">
            {{ data.title }}
          </h3>
          <p v-if="data.subtitle" class="max-w-[230px] text-[13px] font-normal leading-5 text-[#8D97A5] min-[414px]:max-w-[320px] min-[414px]:text-[14px] min-[414px]:leading-[21px] sm:max-w-none sm:text-[18.6667px] sm:leading-[27px]">
            {{ data.subtitle }}
          </p>
        </div>
      </div>

      <div class="mt-5 min-[414px]:mt-6">
        <DashboardChartFrame :option="chartOption" height="clamp(300px, 64vw, 400px)" />

        <div class="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 min-[414px]:gap-x-4 sm:mt-5 md:gap-x-5 xl:mt-6 xl:gap-x-6">
          <div v-for="item in legendItems" :key="item.id" class="flex items-center gap-[6px]">
            <span
              v-if="!item.isLine"
              class="h-[12px] w-[12px] rounded-[1px] md:h-[14px] md:w-[14px] xl:h-[18.67px] xl:w-[18.67px]"
              :style="{ backgroundColor: item.color }"
            />

            <span v-else class="relative flex w-[12px] items-center justify-center md:w-[14px] xl:w-[18.67px]">
              <span class="absolute h-[2px] w-full bg-[#EF4343] xl:h-[2.5px]" />
              <span class="relative h-[6px] w-[6px] rounded-full border-[1.75px] border-[#EF4343] bg-white md:h-[7px] md:w-[7px] xl:h-[8px] xl:w-[8px] xl:border-[2px]" />
            </span>

            <span
              class="text-center text-[12px] font-normal leading-[18px] min-[414px]:text-[13px] min-[414px]:leading-5 md:text-[15px] md:leading-6 xl:text-[21.3333px] xl:leading-[32px]"
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
