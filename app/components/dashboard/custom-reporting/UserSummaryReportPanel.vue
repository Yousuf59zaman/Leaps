<script setup lang="ts">
import type { EChartsOption } from 'echarts'

type UserSummaryFilter = 'all' | 'male' | 'female' | 'pwd'
type TrendKey = 'male' | 'female' | 'vulnerability'

interface UserSummaryMetric {
  label: string
  value: string
  icon: string
  color: string
  overlay: string
}

interface UserSummaryRow {
  id: string
  month: string
  shortMonth: string
  male: number
  female: number
  vulnerability: number
  total: number
}

const activeFilter = ref<UserSummaryFilter>('all')
const searchQuery = ref('')

const userSummaryColors = {
  brand: '#3899FA',
  male: '#60A5FA',
  female: '#D63875',
  femaleSoft: '#E277A2',
  vulnerability: '#C9481D',
  vulnerabilitySoft: '#E59A83',
  pregnant: '#7A5CA8',
  ip: '#BCE53F',
  senior: '#3BCB7A',
  text: '#15191E',
  muted: '#8D97A5',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7',
  panel: '#F9FAFB'
} as const

const filterOptions: Array<{ label: string, value: UserSummaryFilter, width: string }> = [
  { label: 'All', value: 'all', width: '38.47px' },
  { label: 'Has Male', value: 'male', width: '76.47px' },
  { label: 'Has Female', value: 'female', width: '91.47px' },
  { label: 'Has PWD/SC', value: 'pwd', width: '99.47px' }
]

const rows: UserSummaryRow[] = [
  { id: 'october-2025', month: 'October 2025', shortMonth: 'Oct', male: 2, female: 0, vulnerability: 0, total: 2 },
  { id: 'september-2025', month: 'September 2025', shortMonth: 'Sep', male: 1, female: 0, vulnerability: 0, total: 1 },
  { id: 'august-2025', month: 'August 2025', shortMonth: 'Aug', male: 11, female: 5, vulnerability: 3, total: 16 },
  { id: 'july-2025', month: 'July 2025', shortMonth: 'Jul', male: 33, female: 0, vulnerability: 0, total: 33 },
  { id: 'march-2025', month: 'March 2025', shortMonth: 'Mar', male: 9, female: 16, vulnerability: 16, total: 25 },
  { id: 'february-2025', month: 'February 2025', shortMonth: 'Feb', male: 27, female: 45, vulnerability: 60, total: 72 },
  { id: 'january-2025', month: 'January 2025', shortMonth: 'Jan', male: 0, female: 1, vulnerability: 1, total: 1 }
]

const chartRows = [...rows].reverse()
const totalMale = rows.reduce((sum, row) => sum + row.male, 0)
const totalFemale = rows.reduce((sum, row) => sum + row.female, 0)
const totalVulnerability = rows.reduce((sum, row) => sum + row.vulnerability, 0)
const totalTokens = rows.reduce((sum, row) => sum + row.total, 0)
const malePercent = Math.round((totalMale / totalTokens) * 100)
const femalePercent = 100 - malePercent

const metricCards: UserSummaryMetric[] = [
  {
    label: 'Total Male',
    value: String(totalMale),
    icon: '♂',
    color: userSummaryColors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    label: 'Total Female',
    value: String(totalFemale),
    icon: '♀',
    color: userSummaryColors.female,
    overlay: 'rgba(214, 56, 117, 0.1)'
  },
  {
    label: 'PWD / Pregnant / IP / SC',
    value: String(totalVulnerability),
    icon: '♿',
    color: userSummaryColors.vulnerability,
    overlay: 'rgba(201, 72, 29, 0.1)'
  },
  {
    label: 'Total Tokens',
    value: String(totalTokens),
    icon: '🎫',
    color: userSummaryColors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)'
  }
]

const trendSeries: Array<{ key: TrendKey, label: string, color: string }> = [
  { key: 'male', label: 'Male', color: userSummaryColors.male },
  { key: 'female', label: 'Female', color: userSummaryColors.femaleSoft },
  { key: 'vulnerability', label: 'PWD/SC', color: userSummaryColors.vulnerabilitySoft }
]

const classificationSegments = [
  { label: 'Male', value: 83, color: userSummaryColors.male },
  { label: 'Female', value: 67, color: userSummaryColors.femaleSoft },
  { label: 'PWD', value: 26, color: userSummaryColors.vulnerabilitySoft },
  { label: 'Pregnant', value: 10, color: userSummaryColors.pregnant },
  { label: 'IP', value: 8, color: userSummaryColors.ip },
  { label: 'Senior Citizen', value: 36, color: userSummaryColors.senior }
]

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesFilter = activeFilter.value === 'all'
      || (activeFilter.value === 'male' && row.male > 0)
      || (activeFilter.value === 'female' && row.female > 0)
      || (activeFilter.value === 'pwd' && row.vulnerability > 0)

    const matchesSearch = !search || row.month.toLowerCase().includes(search)

    return matchesFilter && matchesSearch
  })
})

const monthlyTrendOption = computed<EChartsOption>(() => ({
  color: trendSeries.map((series) => series.color),
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 8,
    left: 'center',
    itemWidth: 36,
    itemHeight: 7,
    icon: 'rect',
    textStyle: {
      color: userSummaryColors.muted,
      fontSize: 11,
      fontWeight: 500
    }
  },
  grid: {
    left: 54,
    right: 24,
    top: 48,
    bottom: 30
  },
  xAxis: {
    type: 'category',
    data: chartRows.map((row) => row.shortMonth),
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#E8ECF2'
      }
    },
    axisLabel: {
      color: userSummaryColors.muted,
      fontSize: 11,
      fontWeight: 500
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 140,
    interval: 40,
    axisLabel: {
      color: userSummaryColors.muted,
      fontSize: 11,
      fontWeight: 500
    },
    splitLine: {
      lineStyle: {
        color: userSummaryColors.border
      }
    }
  },
  series: trendSeries.map((series) => ({
    name: series.label,
    type: 'bar' as const,
    stack: 'visitors',
    barWidth: 48,
    data: chartRows.map((row) => row[series.key]),
    itemStyle: {
      color: series.color,
      borderRadius: [2, 2, 0, 0]
    },
    emphasis: {
      focus: 'series'
    }
  }))
}))

const classificationBreakdownOption = computed<EChartsOption>(() => ({
  color: classificationSegments.map((segment) => segment.color),
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} visitors ({d}%)'
  },
  legend: {
    bottom: 0,
    left: 'center',
    itemWidth: 38,
    itemHeight: 7,
    icon: 'rect',
    textStyle: {
      color: userSummaryColors.muted,
      fontSize: 11,
      fontWeight: 500
    }
  },
  series: [
    {
      name: 'Classification',
      type: 'pie',
      radius: ['38%', '64%'],
      center: ['50%', '42%'],
      selectedMode: 'multiple',
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.16)'
        }
      },
      data: classificationSegments.map((segment) => ({
        name: segment.label,
        value: segment.value
      }))
    }
  ]
}))

const getGenderBarWidth = (value: number, total: number) => (
  total > 0 ? `${(value / total) * 100}%` : '0%'
)

const showBadge = (value: number) => value > 0
</script>

<template>
  <article class="min-h-[1026px] w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex min-w-0 flex-col gap-[12.24px] pt-[22.0266px]">
      <header class="flex min-h-[39.45px] min-w-0 flex-wrap items-start justify-between gap-4">
        <div class="w-full min-w-0 max-w-[398px]">
          <h3 class="text-[17.1318px] font-semibold leading-[21px] text-[#15191E]">
            User Summary
          </h3>
          <p class="mt-[2.45px] text-[13.4607px] font-normal leading-4 text-[#8D97A5]">
            Monthly visitor count by gender and vulnerability classification
          </p>
        </div>

        <div class="flex w-full min-w-0 flex-wrap items-center gap-x-[7.34218px] gap-y-2 lg:w-auto">
          <div class="flex min-h-[26.24px] flex-wrap items-start gap-[3.67px]">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="h-[26.24px] rounded-[6.11849px] border px-[11.0133px] py-[4.89479px] font-['Arial'] text-[12.237px] font-normal leading-[14px] transition-colors"
              :class="activeFilter === option.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: option.width }"
              :aria-pressed="activeFilter === option.value"
              @click="activeFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[195.02px]">
            <span class="sr-only">Search month</span>
            <DashboardIcon name="search" :size="13.41" :stroke-width="1.4" class="pointer-events-none absolute left-[8.53px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search month..."
              class="h-[32.68px] w-full rounded-[7.34218px] border border-[#DEE2E7] bg-[#F9FAFB] py-[6.11849px] pl-[30.5924px] pr-[9.78958px] text-[14.6844px] font-normal leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <section class="grid min-h-[76.04px] min-w-0 gap-[9.78958px] pt-[4.89479px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metricCards"
          :key="metric.label"
          class="flex h-[71.15px] min-w-0 items-center gap-[11.01px] rounded-[11.0133px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.6844px] py-[12.237px]"
        >
          <span
            class="inline-flex h-[44.23px] w-[43.88px] shrink-0 items-center justify-center rounded-[11.0133px] text-[19.5792px] leading-[21px] text-black"
            :style="{ backgroundColor: metric.overlay }"
          >
            {{ metric.icon }}
          </span>
          <span class="block min-w-0">
            <span class="block text-[12.237px] font-medium leading-[15px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block text-[24.4739px] font-bold leading-[27px]"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
          </span>
        </article>
      </section>

      <section class="flex min-h-[92.23px] min-w-0 flex-col gap-[7.34px] rounded-[11.0133px] border border-[#EFF0F6] bg-[#F9FAFB] px-[17.1318px] pb-[14.6844px] pt-[17.1318px]">
        <div class="flex min-h-4 flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <h4 class="text-[13.4607px] font-medium leading-4 text-[#15191E]">
            Gender &amp; Classification Split
          </h4>
          <span class="text-[13.4607px] font-normal leading-4 text-[#8D97A5]">
            {{ totalTokens }} total visitors
          </span>
        </div>

        <div class="flex h-[12.29px] min-w-0 overflow-hidden rounded-[4.89479px] pt-[2.44739px]">
          <span
            class="h-[9.84px] bg-[#3899FA]"
            :style="{ width: `${malePercent}%` }"
          />
          <span
            class="h-[9.84px] bg-[#D63875]"
            :style="{ width: `${femalePercent}%` }"
          />
        </div>

        <div class="flex min-h-[15px] flex-wrap items-start gap-x-[19.58px] gap-y-1">
          <span class="inline-flex h-[15px] items-center gap-[4.89px] text-[12.237px] font-normal leading-[15px] text-[#3899FA]">
            <span class="h-[9.83px] w-[9.75px] rounded-[2.44739px] bg-[#3899FA]" />
            Male {{ malePercent }}%
          </span>
          <span class="inline-flex h-[15px] items-center gap-[4.89px] text-[12.237px] font-normal leading-[15px] text-[#D63875]">
            <span class="h-[9.83px] w-[9.75px] rounded-[2.44739px] bg-[#D63875]" />
            Female {{ femalePercent }}%
          </span>
          <span class="max-w-full text-[12.237px] font-normal leading-[15px] text-[#8D97A5] sm:ml-auto sm:text-right">
            {{ totalVulnerability }} visitors flagged as PWD / Pregnant / IP / Senior Citizen
          </span>
        </div>
      </section>

      <section class="grid min-h-[298.54px] min-w-0 gap-[12.24px] pt-[2.45px] xl:grid-cols-2">
        <article class="h-[280.57px] min-w-0 overflow-hidden rounded-[11.0133px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.7px] items-center px-[17.1318px] py-[12.237px]">
            <h4 class="text-[15.9081px] font-semibold leading-[19px] text-[#15191E]">
              Monthly Trend
            </h4>
          </header>

          <div class="px-[17.1318px] py-[17.1318px]">
            <DashboardChartFrame :option="monthlyTrendOption" height="199.02px" />
          </div>
        </article>

        <article class="h-[280.57px] min-w-0 overflow-hidden rounded-[11.0133px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.7px] items-center px-[17.1318px] py-[12.237px]">
            <h4 class="text-[15.9081px] font-semibold leading-[19px] text-[#15191E]">
              Classification Breakdown
            </h4>
          </header>

          <div class="flex h-[233.42px] flex-col items-center justify-center px-[17.1318px] pb-[16px] pt-[10px]">
            <DashboardChartFrame :option="classificationBreakdownOption" height="206px" class="w-full" />
          </div>
        </article>
      </section>

      <section class="h-[385.1px] min-w-0 overflow-hidden rounded-[11.0133px] border border-[#EFF0F6] bg-white">
        <div class="thin-user-summary-scrollbar h-full min-w-0 overflow-x-auto">
          <table class="w-full min-w-[1060px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 17.44%" />
              <col style="width: 9.95%" />
              <col style="width: 11.81%" />
              <col style="width: 25.94%" />
              <col style="width: 18.17%" />
              <col style="width: 16.69%" />
            </colgroup>

            <thead>
              <tr class="h-[38.25px]">
                <th
                  v-for="header in ['Month', 'Male', 'Female', 'PWD / Pregnant / IP / SC', 'Gender Mix', 'Total Count']"
                  :key="header"
                  class="bg-[#F9FAFB] px-[15.9081px] py-[11.0133px] text-[12.237px] font-semibold uppercase leading-[15px] tracking-[0.611849px] text-[#8D97A5]"
                  :class="header === 'Month' || header === 'Gender Mix' ? 'text-left' : 'text-right'"
                >
                  {{ header }}
                  <span
                    v-if="header !== 'Gender Mix'"
                    class="font-['Cambria_Math'] text-[11.0133px] font-normal leading-[13px] opacity-35"
                  >
                    &#8645;
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.id"
                class="h-[44.37px]"
              >
                <td class="border-b border-[#EFF0F6] px-[15.9081px] py-[12.237px] text-[14.6844px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.month }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.9081px] py-[11.6251px] text-right">
                  <span
                    v-if="showBadge(row.male)"
                    class="inline-flex h-[19.89px] min-w-[23.13px] items-center justify-end rounded-[24.4739px] bg-[rgba(56,153,250,0.1)] px-[8.56588px] py-[2.44739px] text-[12.237px] font-medium leading-[15px] text-[#3899FA]"
                  >
                    {{ row.male }}
                  </span>
                  <span
                    v-else
                    class="text-[14.6844px] font-medium leading-[18px] text-[#15191E]"
                  >
                    0
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.9081px] py-[11.6251px] text-right">
                  <span
                    v-if="showBadge(row.female)"
                    class="inline-flex h-[19.89px] min-w-[23.13px] items-center justify-end rounded-[24.4739px] bg-[rgba(214,56,117,0.1)] px-[8.56588px] py-[2.44739px] text-[12.237px] font-medium leading-[15px] text-[#D63875]"
                  >
                    {{ row.female }}
                  </span>
                  <span
                    v-else
                    class="text-[14.6844px] font-medium leading-[18px] text-[#15191E]"
                  >
                    0
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.9081px] py-[11.6251px] text-right">
                  <span
                    v-if="showBadge(row.vulnerability)"
                    class="inline-flex h-[19.89px] min-w-[23.13px] items-center justify-end rounded-[24.4739px] bg-[rgba(201,72,29,0.1)] px-[8.56588px] py-[2.44739px] text-[12.237px] font-medium leading-[15px] text-[#C9481D]"
                  >
                    {{ row.vulnerability }}
                  </span>
                  <span
                    v-else
                    class="text-[14.6844px] font-medium leading-[18px] text-[#15191E]"
                  >
                    0
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.9081px] py-[19.7px]">
                  <span class="flex h-[4.91px] w-full overflow-hidden rounded-[2.44739px] bg-[#EFF0F6]">
                    <span
                      class="h-[4.91px] bg-[#3899FA]"
                      :style="{ width: getGenderBarWidth(row.male, row.total) }"
                    />
                    <span
                      class="h-[4.91px] bg-[#D63875]"
                      :style="{ width: getGenderBarWidth(row.female, row.total) }"
                    />
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.9081px] py-[12.237px] text-right text-[14.6844px] font-bold leading-[18px] text-[#3899FA]">
                  {{ row.total }}
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr class="h-[41.77px] bg-[#F9FAFB]">
                <td class="border-t-[2.44739px] border-[#DEE2E7] px-[15.9081px] py-[9.78958px] text-[14.6844px] font-semibold leading-[18px] text-black">
                  Total
                </td>
                <td class="border-t-[2.44739px] border-[#DEE2E7] px-[15.9081px] py-[9.78958px] text-right text-[14.6844px] font-medium leading-[18px] text-black">
                  {{ totalMale }}
                </td>
                <td class="border-t-[2.44739px] border-[#DEE2E7] px-[15.9081px] py-[9.78958px] text-right text-[14.6844px] font-medium leading-[18px] text-black">
                  {{ totalFemale }}
                </td>
                <td class="border-t-[2.44739px] border-[#DEE2E7] px-[15.9081px] py-[9.78958px] text-right text-[14.6844px] font-medium leading-[18px] text-black">
                  {{ totalVulnerability }}
                </td>
                <td class="border-t-[2.44739px] border-[#DEE2E7]" />
                <td class="border-t-[2.44739px] border-[#DEE2E7] px-[15.9081px] py-[9.78958px] text-right text-[14.6844px] font-bold leading-[18px] text-[#3899FA]">
                  {{ totalTokens }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.thin-user-summary-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.35) transparent;
  scrollbar-width: thin;
}

.thin-user-summary-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.thin-user-summary-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-user-summary-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(141, 151, 165, 0.35);
  border-radius: 999px;
}
</style>
