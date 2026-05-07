<script setup lang="ts">
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

const chartRows = rows.slice(0, 2)
const chartMax = 160
const chartTicks = [160, 120, 80, 40, 0]
const gridTicks = [40, 80, 120, 160]
const legendItems = [
  { label: 'F-Web', color: channelColors.femaleWeb },
  { label: 'F-Mobile', color: channelColors.femaleMobile },
  { label: 'M-Web', color: channelColors.maleWeb },
  { label: 'M-Mobile', color: channelColors.maleMobile }
]
const chartBars = chartRows.map((row) => {
  const total = row.femaleWeb + row.femaleMobile + row.maleWeb + row.maleMobile
  const scale = total > chartMax ? chartMax / total : 1

  return {
    id: row.id,
    label: row.id === 'unknown' ? 'Info N/A' : 'BARMM',
    scale,
    segments: [
      { key: 'femaleWeb', value: row.femaleWeb, color: channelColors.femaleWeb },
      { key: 'femaleMobile', value: row.femaleMobile, color: channelColors.femaleMobile },
      { key: 'maleWeb', value: row.maleWeb, color: channelColors.maleWeb },
      { key: 'maleMobile', value: row.maleMobile, color: channelColors.maleMobile }
    ]
  }
})

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

function tickBottom(value: number) {
  return `${(value / chartMax) * 100}%`
}

function segmentHeight(value: number, scale: number) {
  return `${((value * scale) / chartMax) * 100}%`
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
        <div class="h-[217.09px] w-full">
          <div class="flex h-[22px] items-center justify-center gap-[14px]">
            <span
              v-for="item in legendItems"
              :key="item.label"
              class="inline-flex items-center gap-[5px] text-[12px] leading-[15px] text-[#8D97A5]"
            >
              <span class="h-[8px] w-[30px]" :style="{ backgroundColor: item.color }" />
              {{ item.label }}
            </span>
          </div>

          <div class="mt-[22px] grid h-[156px] grid-cols-[42px_minmax(0,1fr)]">
            <div class="relative h-[132px]">
              <span
                v-for="tick in chartTicks"
                :key="`tick-${tick}`"
                class="absolute right-[10px] translate-y-1/2 text-[12px] leading-[15px] text-[#8D97A5]"
                :style="{ bottom: tickBottom(tick) }"
              >
                {{ tick }}
              </span>
            </div>

            <div class="relative h-[132px] border-b border-l border-[#DEE2E7]">
              <span
                v-for="tick in gridTicks"
                :key="`grid-${tick}`"
                class="absolute left-0 right-0 border-t border-dashed border-[#DEE2E7]"
                :style="{ bottom: tickBottom(tick) }"
              />

              <div class="absolute inset-x-0 bottom-0 top-0 flex items-end justify-around">
                <div
                  v-for="bar in chartBars"
                  :key="bar.id"
                  class="flex h-full w-[36%] max-w-[360px] min-w-[180px] items-end"
                >
                  <div class="flex h-full w-full flex-col-reverse overflow-hidden">
                    <span
                      v-for="segment in bar.segments"
                      :key="`${bar.id}-${segment.key}`"
                      class="block w-full"
                      :style="{ height: segmentHeight(segment.value, bar.scale), backgroundColor: segment.color }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div />
            <div class="flex justify-around pt-[11px]">
              <span
                v-for="bar in chartBars"
                :key="`label-${bar.id}`"
                class="w-[36%] max-w-[360px] min-w-[180px] text-center text-[12px] leading-[15px] text-[#8D97A5]"
              >
                {{ bar.label }}
              </span>
            </div>
          </div>
        </div>
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
