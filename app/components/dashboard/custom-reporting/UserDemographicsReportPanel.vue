<script setup lang="ts">
import type { EChartsOption } from 'echarts'

type TrendKey = 'male' | 'female' | 'vulnerability'

const searchQuery = ref('')

const demographicsColors = {
  brand: '#3899FA',
  text: '#15191E',
  muted: '#8D97A5',
  border: '#EFF0F6',
  panel: '#F9FAFB',
  male: '#60A5FA',
  female: '#E277A2',
  vulnerability: '#E59A83',
  danger: '#C9481D'
} as const

const trendSeries: Array<{ key: TrendKey, label: string, color: string }> = [
  { key: 'male', label: 'Male', color: demographicsColors.male },
  { key: 'female', label: 'Female', color: demographicsColors.female },
  { key: 'vulnerability', label: 'Vulnerability', color: demographicsColors.vulnerability }
]

const trendRows = [
  { id: 'october-2024', month: 'October 2024', shortMonth: 'Oct 24', male: 1, female: 0, vulnerability: 0 },
  { id: 'november-2024', month: 'November 2024', shortMonth: 'Nov 24', male: 2, female: 1, vulnerability: 0 },
  { id: 'january-2025', month: 'January 2025', shortMonth: 'Jan 25', male: 0, female: 0, vulnerability: 0 },
  { id: 'february-2025', month: 'February 2025', shortMonth: 'Feb 25', male: 1, female: 0, vulnerability: 0 },
  { id: 'march-2025', month: 'March 2025', shortMonth: 'Mar 25', male: 1, female: 0, vulnerability: 1 },
  { id: 'april-2025', month: 'April 2025', shortMonth: 'Apr 25', male: 1, female: 0, vulnerability: 1 }
]

const tableRows = [
  { id: 'april-2025', month: 'April 2025', male: 1, female: 0, vulnerability: 1, noData: 0, count: 1 },
  { id: 'march-2025', month: 'March 2025', male: 1, female: 0, vulnerability: 1, noData: 0, count: 1 },
  { id: 'february-2025', month: 'February 2025', male: 1, female: 0, vulnerability: 0, noData: 1, count: 1 },
  { id: 'january-2025', month: 'January 2025', male: 0, female: 0, vulnerability: 0, noData: 0, count: 0 },
  { id: 'november-2024', month: 'November 2024', male: 2, female: 1, vulnerability: 0, noData: 1, count: 3 },
  { id: 'october-2024', month: 'October 2024', male: 1, female: 0, vulnerability: 0, noData: 0, count: 1 }
]

const tableHeaders = ['Month', 'Male', 'Female', 'Vuln.', 'No Data']

const monthlyTrendOption = computed<EChartsOption>(() => ({
  color: trendSeries.map(series => series.color),
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    top: 0,
    left: 'center',
    itemWidth: 28,
    itemHeight: 7,
    icon: 'rect',
    textStyle: {
      color: demographicsColors.muted,
      fontSize: 11,
      fontWeight: 500
    }
  },
  grid: {
    left: 48,
    right: 20,
    top: 44,
    bottom: 30
  },
  xAxis: {
    type: 'category',
    data: trendRows.map(row => row.shortMonth),
    axisLine: {
      lineStyle: { color: '#E8ECF2' }
    },
    axisTick: { show: false },
    axisLabel: {
      color: demographicsColors.muted,
      fontSize: 11,
      fontWeight: 500
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 2,
    interval: 1,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: demographicsColors.muted,
      fontSize: 11,
      fontWeight: 500
    },
    splitLine: {
      lineStyle: { color: demographicsColors.border }
    }
  },
  series: trendSeries.map(series => ({
    name: series.label,
    type: 'bar',
    barWidth: 18,
    barGap: '10%',
    data: trendRows.map(row => row[series.key]),
    itemStyle: {
      color: series.color,
      borderRadius: 3
    },
    emphasis: { focus: 'series' }
  }))
}))

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return tableRows
  }

  return tableRows.filter((row) => row.month.toLowerCase().includes(search))
})
</script>

<template>
  <article class="min-h-[1023px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[17.4px] pt-[22.3721px]">
      <header class="flex min-h-[40.49px] flex-wrap items-center justify-between gap-4">
        <div class="w-full max-w-[361px]">
          <h3 class="text-[17.4005px] font-semibold leading-[21px] text-[#15191E]">
            User Demographic Summary
          </h3>
          <p class="mt-[2.49px] text-[13.6718px] leading-[17px] text-[#8D97A5]">
            Monthly registrations by gender and vulnerability status
          </p>
        </div>

        <label class="relative block w-full sm:w-[219.4px]">
          <span class="sr-only">Search month</span>
          <DashboardIcon name="search" :size="14.63" :stroke-width="1.55" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search month..."
            class="h-[35.4px] w-full rounded-[7.45737px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.45737px] pl-[33.5582px] pr-[12.429px] text-[14.9147px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
          />
        </label>
      </header>

      <div class="grid w-full gap-[14.92px] xl:grid-cols-2">
        <section class="h-[321.71px] overflow-hidden rounded-[12.429px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[51.07px] items-center px-[19.8863px] py-[14.9147px]">
            <h4 class="text-[16.1576px] font-semibold leading-5 text-[#15191E]">
              Monthly Trend
            </h4>
          </header>

          <div class="px-[19.8863px] pb-[19.8863px] pt-[19.8863px]">
            <DashboardChartFrame
              :option="monthlyTrendOption"
              height="200.25px"
            />
          </div>
        </section>

        <section class="h-[315.81px] overflow-hidden rounded-[12.429px] border border-[#EFF0F6] bg-white">
          <div class="thin-demographics-scrollbar overflow-x-auto">
            <table class="w-full min-w-[600px] table-fixed border-separate border-spacing-0 xl:min-w-0">
              <colgroup>
                <col style="width: 23.62%" />
                <col style="width: 14.16%" />
                <col style="width: 16.71%" />
                <col style="width: 14.78%" />
                <col style="width: 17.57%" />
                <col style="width: 13.16%" />
              </colgroup>

              <thead>
                <tr>
                  <th
                    v-for="header in tableHeaders"
                    :key="header"
                    class="h-[41.1px] bg-[#F9FAFB] px-[17.4005px] py-[12.429px] text-[12.429px] font-semibold uppercase leading-[15px] tracking-[0.621448px] text-[#8D97A5]"
                    :class="header === 'Month' ? 'text-left' : 'text-right'"
                  >
                    {{ header }} <span class="font-['Cambria_Math'] text-[11.1861px] opacity-35">&#8645;</span>
                  </th>
                  <th class="h-[41.1px] bg-[#F9FAFB] px-[17.4005px] py-[12.429px] text-right text-[12.429px] font-semibold uppercase leading-[15px] tracking-[0.621448px] text-[#8D97A5]">
                    Count
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="row in filteredRows"
                  :key="row.id"
                  class="h-[45.34px]"
                >
                  <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[10.2px] text-[14.9147px] font-normal leading-[18px] text-[#15191E]">
                    {{ row.month }}
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[10.2px] text-right text-[14.9147px] font-medium leading-[18px] text-[#15191E]">
                    {{ row.male }}
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[10.2px] text-right text-[14.9147px] font-medium leading-[18px] text-[#15191E]">
                    {{ row.female }}
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[10.2px] text-right">
                    <span
                      v-if="row.vulnerability > 0"
                      class="inline-flex h-[18.97px] min-w-[25.89px] items-center justify-end rounded-[24.8579px] bg-[rgba(201,72,29,0.1)] px-[9.94316px] py-[2.48579px] text-[11.1861px] font-medium leading-[14px] text-[#C9481D]"
                    >
                      {{ row.vulnerability }}
                    </span>
                    <span
                      v-else
                      class="text-[14.9147px] font-medium leading-[18px] text-[#15191E]"
                    >
                      0
                    </span>
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[10.2px] text-right">
                    <span
                      v-if="row.noData > 0"
                      class="inline-flex h-[18.97px] min-w-[25.89px] items-center justify-end rounded-[24.8579px] bg-[rgba(0,0,0,0.05)] px-[9.94316px] py-[2.48579px] text-[11.1861px] font-medium leading-[14px] text-[#8D97A5]"
                    >
                      {{ row.noData }}
                    </span>
                    <span
                      v-else
                      class="text-[14.9147px] font-medium leading-[18px] text-[#15191E]"
                    >
                      0
                    </span>
                  </td>
                  <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[10.2px] text-right text-[14.9147px] font-bold leading-[18px] text-[#3899FA]">
                    {{ row.count }}
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
.thin-demographics-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.45) transparent;
  scrollbar-width: thin;
}

.thin-demographics-scrollbar::-webkit-scrollbar {
  height: 1px;
  width: 1px;
}

.thin-demographics-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-demographics-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(141, 151, 165, 0.45);
  border-radius: 999px;
}

.thin-demographics-scrollbar::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}
</style>
