<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const searchQuery = ref('')

const channelColors = {
  femaleWeb: '#D63875',
  femaleMobile: '#F4B7CF',
  maleWeb: '#3899FA',
  maleMobile: '#A7D4FF',
  success: '#1DC973'
} as const

const rows = [
  {
    id: 'barmm',
    region: 'Bangsamoro (BARMM)',
    femaleWeb: 0,
    femaleMobile: 0,
    maleWeb: 55,
    maleMobile: 63,
    totalWeb: 55,
    totalMobile: 63
  },
  {
    id: 'unknown',
    region: 'Information Not Provided',
    femaleWeb: 12,
    femaleMobile: 16,
    maleWeb: 75,
    maleMobile: 60,
    totalWeb: 18,
    totalMobile: 13
  },
  {
    id: 'region-i',
    region: 'Region I',
    femaleWeb: 0,
    femaleMobile: 0,
    maleWeb: 0,
    maleMobile: 0,
    totalWeb: 0,
    totalMobile: 0
  },
  {
    id: 'ncr',
    region: 'National Capital Region',
    femaleWeb: 0,
    femaleMobile: 0,
    maleWeb: 0,
    maleMobile: 0,
    totalWeb: 0,
    totalMobile: 0
  },
  {
    id: 'combined',
    region: 'Region VIII / X / XI / XII',
    femaleWeb: 0,
    femaleMobile: 0,
    maleWeb: 0,
    maleMobile: 0,
    totalWeb: 0,
    totalMobile: 0
  }
]

const totals = {
  femaleWeb: 12,
  femaleMobile: 16,
  maleWeb: 75,
  maleMobile: 60,
  totalWeb: 87,
  totalMobile: 76
}

const metrics = [
  {
    label: 'Web Registrations',
    value: 87,
    icon: 'globe',
    color: channelColors.maleWeb,
    overlay: 'rgba(56,153,250,0.1)'
  },
  {
    label: 'Mobile Registrations',
    value: 76,
    icon: 'mobile',
    color: channelColors.success,
    overlay: 'rgba(29,201,115,0.1)'
  },
  {
    label: 'Male (Total)',
    value: 135,
    icon: 'male',
    color: channelColors.maleWeb,
    overlay: 'rgba(56,153,250,0.1)'
  },
  {
    label: 'Female (Total)',
    value: 28,
    icon: 'female',
    color: channelColors.femaleWeb,
    overlay: 'rgba(214,56,117,0.1)'
  }
]

const chartMax = 160
const channelChartRows = rows.slice(0, 2)

const channelBreakdownOption = computed<EChartsOption>(() => ({
  color: [
    channelColors.femaleWeb,
    channelColors.femaleMobile,
    channelColors.maleWeb,
    channelColors.maleMobile
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    top: 0,
    left: 'center',
    itemWidth: 30,
    itemHeight: 8,
    icon: 'rect',
    textStyle: {
      color: '#8D97A5',
      fontSize: 12
    }
  },
  grid: {
    left: 42,
    right: 16,
    top: 48,
    bottom: 30
  },
  xAxis: {
    type: 'category',
    data: channelChartRows.map(row => row.id === 'unknown' ? 'Info N/A' : 'BARMM'),
    axisLine: {
      lineStyle: { color: '#DEE2E7' }
    },
    axisTick: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontSize: 12
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: chartMax,
    interval: 40,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: '#DEE2E7',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: 'F-Web',
      type: 'bar',
      stack: 'registrations',
      barWidth: '34%',
      data: channelChartRows.map(row => row.femaleWeb),
      emphasis: { focus: 'series' }
    },
    {
      name: 'F-Mobile',
      type: 'bar',
      stack: 'registrations',
      barWidth: '34%',
      data: channelChartRows.map(row => row.femaleMobile),
      emphasis: { focus: 'series' }
    },
    {
      name: 'M-Web',
      type: 'bar',
      stack: 'registrations',
      barWidth: '34%',
      data: channelChartRows.map(row => row.maleWeb),
      emphasis: { focus: 'series' }
    },
    {
      name: 'M-Mobile',
      type: 'bar',
      stack: 'registrations',
      barWidth: '34%',
      data: channelChartRows.map(row => row.maleMobile),
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      },
      emphasis: { focus: 'series' }
    }
  ]
}))

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return rows
  }

  return rows.filter(row => row.region.toLowerCase().includes(search))
})

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

</script>

<template>
  <ReportPreviewShell
    title="User Registration Channel Distribution"
    subtitle="Web vs Mobile breakdown by gender and region"
  >
    <template #actions>
      <label class="relative block w-full sm:w-[219.4px]">
        <span class="sr-only">Search</span>
        <DashboardIcon name="search" :size="14.63" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search..."
          class="h-[35.07px] w-full rounded-[7.3154px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.3154px] pl-[32.9193px] pr-[12.1923px] text-[14.6308px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
        />
      </label>
    </template>

    <div class="mt-[14.63px] grid gap-[12.1923px] pt-[2.43847px] sm:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="metric in metrics"
        :key="metric.label"
        class="flex min-h-[80.48px] min-w-[158.45px] items-center gap-[12.19px] rounded-[12.1923px] border border-[#EFF0F6] bg-[#F9FAFB] px-[17.0693px] py-[14.6308px]"
      >
        <span
          class="inline-flex h-[48.78px] w-[48.75px] shrink-0 items-center justify-center rounded-[12.1923px] text-[#15191E]"
          :style="{ backgroundColor: metric.overlay }"
        >
          <svg
            v-if="metric.icon === 'globe'"
            width="24.38"
            height="24.38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a13.8 13.8 0 0 1 0 18" />
            <path d="M12 3a13.8 13.8 0 0 0 0 18" />
          </svg>
          <svg
            v-else-if="metric.icon === 'mobile'"
            width="29.26"
            height="29.26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect x="7" y="2.7" width="10" height="18.6" rx="1.8" fill="currentColor" />
            <rect x="10" y="4.4" width="4" height="1" rx="0.5" fill="#F9FAFB" />
            <circle cx="12" cy="18.5" r="0.8" fill="#F9FAFB" />
          </svg>
          <span v-else-if="metric.icon === 'male'" class="font-[Arial] text-[24.3847px] leading-[28px]" v-html="'&#9794;'" />
          <span v-else class="font-[Arial] text-[24.3847px] leading-[28px]" v-html="'&#9792;'" />
        </span>

        <span class="min-w-0">
          <span class="block text-[13.4116px] font-medium leading-4 text-[#8D97A5]">
            {{ metric.label }}
          </span>
          <span class="block text-[26.8231px] font-bold leading-[30px]" :style="{ color: metric.color }">
            {{ metric.value }}
          </span>
        </span>
      </article>
    </div>

    <section class="mt-[14.63px] min-h-[310.47px] overflow-hidden rounded-[12.1923px] border border-[#EFF0F6] bg-white pt-[2.43847px]">
      <header class="flex h-[49.48px] items-center px-[19.5077px] py-[14.6308px]">
        <h4 class="text-[15.85px] font-semibold leading-[19px] text-[#15191E]">
          Channel Breakdown by Region
        </h4>
      </header>

      <div class="px-[19.5077px] py-[19.5077px]">
        <DashboardChartFrame
          :option="channelBreakdownOption"
          height="217.09px"
        />
      </div>
    </section>

    <div class="mt-[14.63px] overflow-hidden rounded-[12.1923px] border border-[#EFF0F6] bg-white">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[780px] border-separate border-spacing-0">
          <colgroup>
            <col class="w-[31.52%]" />
            <col class="w-[9.9%]" />
            <col class="w-[12.98%]" />
            <col class="w-[9.9%]" />
            <col class="w-[12.98%]" />
            <col class="w-[9.9%]" />
            <col class="w-[12.82%]" />
          </colgroup>

          <thead>
            <tr>
              <th
                rowspan="2"
                class="bg-[#F9FAFB] px-[17.0693px] pb-[11.5827px] pt-[52.427px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]"
              >
                Region
              </th>
              <th
                colspan="2"
                class="border-l border-[#DEE2E7] bg-[#F9FAFB] px-[17.0693px] py-[12.1923px] text-center text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#D63875]"
              >
                Female
              </th>
              <th
                colspan="2"
                class="border-l border-[#DEE2E7] bg-[#F9FAFB] px-[17.0693px] py-[12.1923px] text-center text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#3899FA]"
              >
                Male
              </th>
              <th
                colspan="2"
                class="border-l border-[#DEE2E7] bg-[#F9FAFB] px-[17.0693px] py-[12.1923px] text-center text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]"
              >
                Grand Total
              </th>
            </tr>

            <tr>
              <th class="border-l border-[#DEE2E7] bg-[#F9FAFB] px-[15.85px] py-[12.1923px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]">
                Web
              </th>
              <th class="bg-[#F9FAFB] px-[17.0693px] py-[12.1923px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]">
                Mobile
              </th>
              <th class="border-l border-[#DEE2E7] bg-[#F9FAFB] px-[15.85px] py-[12.1923px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]">
                Web
              </th>
              <th class="bg-[#F9FAFB] px-[17.0693px] py-[12.1923px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]">
                Mobile
              </th>
              <th class="border-l border-[#DEE2E7] bg-[#F9FAFB] px-[15.85px] py-[12.1923px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]">
                Web
              </th>
              <th class="bg-[#F9FAFB] px-[17.0693px] py-[12.1923px] text-left text-[12.1923px] font-semibold uppercase leading-[15px] tracking-[0.609617px] text-[#8D97A5]">
                Mobile
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in filteredRows" :key="row.id">
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-[14.6308px] font-normal leading-[18px] text-[#15191E]">
                {{ row.region }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-right text-[14.6308px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.femaleWeb) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-right text-[14.6308px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.femaleMobile) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-right text-[14.6308px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.maleWeb) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-right text-[14.6308px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.maleMobile) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-right text-[14.6308px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.totalWeb) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0693px] py-[12.802px] text-right text-[14.6308px] font-bold leading-[18px] text-[#3899FA]">
                {{ formatNumber(row.totalMobile) }}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="bg-[#F9FAFB]">
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-[14.6308px] font-semibold leading-[18px] text-black">
                Total
              </td>
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-right text-[14.6308px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.femaleWeb) }}
              </td>
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-right text-[14.6308px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.femaleMobile) }}
              </td>
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-right text-[14.6308px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.maleWeb) }}
              </td>
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-right text-[14.6308px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.maleMobile) }}
              </td>
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-right text-[14.6308px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.totalWeb) }}
              </td>
              <td class="border-t-[2.43847px] border-[#DEE2E7] px-[17.0693px] py-[10.9731px] text-right text-[14.6308px] font-bold leading-[18px] text-[#3899FA]">
                {{ formatNumber(totals.totalMobile) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </ReportPreviewShell>
</template>
