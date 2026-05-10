<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const turnoverColors = {
  brand: '#3899FA',
  success: '#1DC973',
  warning: '#C9481D',
  grid: '#EFF0F6',
  muted: '#8D97A5',
  text: '#15191E'
} as const

const offices = [
  {
    id: 'bulaon',
    office: 'Bulaon',
    avgTurnover: '00:24:47',
    minutes: 24.78,
    grade: 'Excellent',
    color: turnoverColors.success,
    background: 'rgba(29, 201, 115, 0.1)'
  },
  {
    id: 'bacolor',
    office: 'Bacolor',
    avgTurnover: '00:28:51',
    minutes: 28.85,
    grade: 'Good',
    color: turnoverColors.brand,
    background: 'rgba(56, 153, 250, 0.1)'
  },
  {
    id: 'bonga',
    office: 'Bonga',
    avgTurnover: '01:21:05',
    minutes: 81.08,
    grade: 'Slow',
    color: turnoverColors.warning,
    background: 'rgba(201, 72, 29, 0.1)'
  }
]

const turnoverMax = 90

const officeComparisonOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    valueFormatter: value => `${value} minutes`
  },
  grid: {
    left: 70,
    right: 22,
    top: 38,
    bottom: 45
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: turnoverMax,
    interval: 10,
    name: 'Minutes',
    nameLocation: 'middle',
    nameGap: 30,
    axisLine: {
      lineStyle: { color: '#DEE2E7' }
    },
    axisTick: { show: false },
    axisLabel: {
      color: turnoverColors.muted,
      fontSize: 13,
      fontWeight: 600
    },
    splitLine: {
      lineStyle: { color: turnoverColors.grid }
    }
  },
  yAxis: {
    type: 'category',
    data: offices.map(office => office.office),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: turnoverColors.muted,
      fontSize: 14,
      fontWeight: 600
    }
  },
  series: [
    {
      name: 'Avg Turnover',
      type: 'bar',
      barWidth: 30,
      data: offices.map(office => ({
        value: office.minutes,
        itemStyle: {
          color: office.color,
          borderRadius: 5,
          opacity: 0.72
        }
      })),
      emphasis: {
        focus: 'series',
        itemStyle: { opacity: 1 }
      }
    }
  ]
}))
</script>

<template>
  <article class="min-h-[440px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[17.87px] pt-[22.9736px]">
      <header class="flex min-h-[41.55px] items-center">
        <div class="w-full max-w-[322px]">
          <h3 class="text-[17.8683px] font-semibold leading-[22px] text-[#15191E]">
            Average Turnover Time by Office
          </h3>
          <p class="mt-[2.55px] text-[14.0394px] leading-[17px] text-[#8D97A5]">
            Consolidated average processing time per office
          </p>
        </div>
      </header>

      <div class="grid min-h-[343.47px] gap-[15.32px] xl:grid-cols-2">
        <section class="overflow-hidden rounded-[12.7631px] border border-[#EFF0F6] bg-white xl:h-[321.75px]">
          <div class="flex h-[51.91px] items-center border-b border-[#EFF0F6] px-[20.4209px] py-[15.3157px]">
            <h4 class="text-[16.592px] font-semibold leading-5 text-[#15191E]">
              Office Comparison
            </h4>
          </div>

          <div class="h-[267.29px] px-[20.4209px] py-[20.4209px]">
            <DashboardChartFrame
              :option="officeComparisonOption"
              height="224.53px"
            />
          </div>
        </section>

        <section class="overflow-hidden rounded-[12.7631px] border border-[#EFF0F6] bg-white xl:h-[308.33px]">
          <div class="flex h-[51.91px] items-center border-b border-[#EFF0F6] px-[20.4209px] py-[15.3157px]">
            <h4 class="text-[16.592px] font-semibold leading-5 text-[#15191E]">
              Office Summary
            </h4>
          </div>

          <div class="thin-report-scrollbar overflow-x-auto">
            <table class="w-full min-w-0 border-separate border-spacing-0">
              <colgroup>
                <col class="w-[19.7%]" />
                <col class="w-[27.6%]" />
                <col class="w-[31.36%]" />
                <col class="w-[21.4%]" />
              </colgroup>

              <thead>
                <tr>
                  <th class="h-[41.8px] bg-[#F9FAFB] px-[17.8683px] py-[12.7631px] text-left text-[12.7631px] font-semibold uppercase leading-[15px] tracking-[0.638154px] text-[#8D97A5]">
                    Office <span class="font-['Cambria_Math'] text-[11.4868px] opacity-35">⇅</span>
                  </th>
                  <th class="h-[41.8px] bg-[#F9FAFB] px-[17.8683px] py-[12.7631px] text-right text-[12.7631px] font-semibold uppercase leading-[15px] tracking-[0.638154px] text-[#8D97A5]">
                    Avg Turnover
                  </th>
                  <th class="h-[41.8px] bg-[#F9FAFB] px-[17.8683px] py-[12.7631px] text-left text-[12.7631px] font-semibold uppercase leading-[15px] tracking-[0.638154px] text-[#8D97A5]">
                    Relative
                  </th>
                  <th class="h-[41.8px] bg-[#F9FAFB] px-[17.8683px] py-[12.7631px] text-center text-[12.7631px] font-semibold uppercase leading-[15px] tracking-[0.638154px] text-[#8D97A5]">
                    Grade
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="office in offices"
                  :key="office.id"
                  class="h-[48.36px]"
                >
                  <td class="border-b border-[#EFF0F6] px-[17.8683px] py-[14.0394px] text-[15.3157px] font-bold leading-[19px] text-[#15191E]">
                    {{ office.office }}
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.8683px] py-[12.7631px] text-right">
                    <span
                      class="inline-flex h-[22.11px] items-center justify-end rounded-[5.10524px] px-[8.93416px] py-[2.55262px] text-[14.0394px] font-semibold leading-[17px]"
                      :style="{ color: office.color, backgroundColor: office.background }"
                    >
                      {{ office.avgTurnover }}
                    </span>
                  </td>
                  <td class="border-b border-[#EFF0F6] py-[21.5px] pl-[17.8683px] pr-[17.8683px]">
                    <span class="flex h-[5.35px] overflow-hidden rounded-[2.55262px] bg-[#EFF0F6]">
                      <span
                        class="h-full rounded-[2.55262px]"
                        :style="{ width: `${(office.minutes / turnoverMax) * 100}%`, backgroundColor: office.color }"
                      />
                    </span>
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.8683px] py-[13.4012px] text-center">
                    <span
                      class="inline-flex h-[20.11px] items-center justify-center rounded-[25.5262px] px-[10.2105px] py-[2.55262px] text-[12.7631px] font-medium leading-[15px]"
                      :style="{ color: office.color, backgroundColor: office.background }"
                    >
                      {{ office.grade }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.thin-report-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.45) transparent;
  scrollbar-width: thin;
}

.thin-report-scrollbar::-webkit-scrollbar {
  height: 1px;
  width: 1px;
}

.thin-report-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-report-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(141, 151, 165, 0.45);
  border-radius: 999px;
}

.thin-report-scrollbar::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}
</style>
