<script setup lang="ts">
type TokenDurationFilter = 'all' | 'fast' | 'medium' | 'slow'
type TokenOffice = 'Bulig' | 'Marantao' | 'Pagapu'

interface TokenDetailRow {
  id: string
  transactionId: string
  serviceName: string
  office: TokenOffice
  startTime: string
  endTime: string
  duration: string
  seconds: number
}

interface TokenMetric {
  label: string
  value: string
  color: string
  icon: string
  iconColor: string
  overlay: string
}

const activeFilter = ref<TokenDurationFilter>('all')
const searchQuery = ref('')

const colors = {
  brand: '#3899FA',
  success: '#1DC973',
  slow: '#EF4343',
  warning: '#C9481D',
  purple: '#4E1B8C',
  green: '#75D337',
  text: '#15191E',
  muted: '#8D97A5',
  panel: '#F9FAFB',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7'
} as const

const filterOptions: Array<{ label: string, value: TokenDurationFilter, width: string }> = [
  { label: 'All', value: 'all', width: '38.71px' },
  { label: 'Fast (<1min)', value: 'fast', width: '94.71px' },
  { label: 'Medium', value: 'medium', width: '68.71px' },
  { label: 'Slow (>30min)', value: 'slow', width: '104.71px' }
]

const rows: TokenDetailRow[] = [
  {
    id: 'r-001',
    transactionId: 'R-001',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '10/1/2025 1:13:05 PM',
    endTime: '10/1/2025 1:14:08 PM',
    duration: '00:01:02',
    seconds: 62
  },
  {
    id: 'r-012',
    transactionId: 'R-012',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '8/25/2025 3:25:24 PM',
    endTime: '8/25/2025 3:29:36 PM',
    duration: '00:03:12',
    seconds: 192
  },
  {
    id: 'r-06',
    transactionId: 'R-06',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '8/25/2025 1:05:27 PM',
    endTime: '8/25/2025 3:24:36 PM',
    duration: '02:19:01',
    seconds: 8341
  },
  {
    id: 'r-009',
    transactionId: 'R-009',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '8/25/2025 1:05:01 PM',
    endTime: '8/25/2025 1:05:02 PM',
    duration: '00:00:01',
    seconds: 1
  },
  {
    id: 'p-002',
    transactionId: 'P-002',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '8/25/2025 1:04:29 PM',
    endTime: '8/25/2025 1:04:37 PM',
    duration: '00:00:08',
    seconds: 8
  },
  {
    id: 'r-008',
    transactionId: 'R-008',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '8/25/2025 12:58:58 PM',
    endTime: '8/25/2025 12:57:01 PM',
    duration: '00:00:03',
    seconds: 3
  },
  {
    id: 'r-014',
    transactionId: 'R-014',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '8/24/2025 9:11:02 AM',
    endTime: '8/24/2025 9:18:44 AM',
    duration: '00:07:42',
    seconds: 462
  },
  {
    id: 'm-003',
    transactionId: 'M-003',
    serviceName: 'Inquiry',
    office: 'Marantao',
    startTime: '8/20/2025 10:30:15 AM',
    endTime: '8/20/2025 10:45:22 AM',
    duration: '00:15:07',
    seconds: 907
  },
  {
    id: 'r-022',
    transactionId: 'R-022',
    serviceName: 'Inquiry',
    office: 'Bulig',
    startTime: '7/15/2025 2:00:00 PM',
    endTime: '7/15/2025 3:10:33 PM',
    duration: '01:10:33',
    seconds: 4233
  },
  {
    id: 'p-011',
    transactionId: 'P-011',
    serviceName: 'Inquiry',
    office: 'Pagapu',
    startTime: '7/10/2025 11:05:10 AM',
    endTime: '7/10/2025 11:05:55 AM',
    duration: '00:00:45',
    seconds: 45
  }
]

const officeStyles: Record<TokenOffice, { color: string, background: string }> = {
  Bulig: {
    color: colors.purple,
    background: 'rgba(78, 27, 140, 0.1)'
  },
  Marantao: {
    color: colors.green,
    background: 'rgba(117, 211, 55, 0.1)'
  },
  Pagapu: {
    color: colors.muted,
    background: 'rgba(0, 0, 0, 0.05)'
  }
}

const slowRows = computed(() => rows.filter((row) => row.seconds > 1800))

const metrics: TokenMetric[] = [
  {
    label: 'Total Tokens',
    value: '150',
    color: colors.brand,
    icon: 'ticket',
    iconColor: '#15191E',
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    label: 'Fastest',
    value: '00:00:01',
    color: colors.success,
    icon: 'activity',
    iconColor: '#15191E',
    overlay: 'rgba(29, 201, 115, 0.1)'
  },
  {
    label: 'Slowest',
    value: '02:19:01',
    color: colors.slow,
    icon: 'timer',
    iconColor: '#15191E',
    overlay: 'rgba(239, 67, 67, 0.1)'
  },
  {
    label: 'Avg Duration',
    value: '~18m',
    color: colors.warning,
    icon: 'clock',
    iconColor: '#15191E',
    overlay: 'rgba(201, 72, 29, 0.1)'
  }
]

const durationTone = (row: TokenDetailRow) => {
  if (row.seconds < 60) {
    return {
      color: colors.success,
      background: 'rgba(29, 201, 115, 0.1)'
    }
  }

  if (row.seconds > 1800) {
    return {
      color: colors.slow,
      background: 'rgba(239, 67, 67, 0.1)'
    }
  }

  return {
    color: colors.brand,
    background: 'rgba(56, 153, 250, 0.1)'
  }
}

const matchesDurationFilter = (row: TokenDetailRow) => {
  if (activeFilter.value === 'fast') {
    return row.seconds < 60
  }

  if (activeFilter.value === 'medium') {
    return row.seconds >= 60 && row.seconds <= 1800
  }

  if (activeFilter.value === 'slow') {
    return row.seconds > 1800
  }

  return true
}

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesSearch = !search
      || row.transactionId.toLowerCase().includes(search)
      || row.serviceName.toLowerCase().includes(search)
      || row.office.toLowerCase().includes(search)
      || row.duration.toLowerCase().includes(search)

    return matchesDurationFilter(row) && matchesSearch
  })
})

const isSlowRow = (row: TokenDetailRow) => row.seconds > 1800
</script>

<template>
  <article class="min-h-[1026px] w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex min-w-0 flex-col gap-[14.83px] pt-[22.2403px]">
      <header class="flex min-h-[50.83px] min-w-0 flex-wrap items-start justify-between gap-4">
        <div class="w-full min-w-0 max-w-[367px]">
          <h3 class="text-[17.298px] font-semibold leading-[21px] text-[#15191E]">
            All Token Details
          </h3>
          <p class="mt-[2.47px] text-[13.5913px] font-normal leading-4 text-[#8D97A5]">
            Full transaction log with service, office, and time tracking
          </p>
        </div>

        <div class="flex w-full min-w-0 flex-wrap items-center gap-x-[7.41342px] gap-y-2 lg:w-auto">
          <div class="flex min-h-[26.36px] flex-wrap items-start gap-[3.71px]">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="h-[26.36px] rounded-[6.17785px] border px-[11.1201px] py-[4.94228px] font-['Arial'] text-[12.3557px] font-normal leading-[14px] transition-colors"
              :class="activeFilter === option.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: option.width }"
              :aria-pressed="activeFilter === option.value"
              @click="activeFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[195.02px]">
            <span class="sr-only">Search ID, service, office</span>
            <DashboardIcon name="search" :size="13.41" :stroke-width="1.42" class="pointer-events-none absolute left-[8.53px] top-[9.92px] text-[#8D97A5]" />
            <textarea
              v-model="searchQuery"
              rows="2"
              aria-label="Search ID, service, office"
              placeholder="Search ID, service, office..."
              class="min-h-[50.83px] w-full resize-none overflow-hidden rounded-[7.41342px] border border-[#DEE2E7] bg-[#F9FAFB] py-[6.17785px] pl-[30.8893px] pr-[9.88456px] text-[14.8268px] font-normal leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <section class="grid min-h-[74.74px] min-w-0 gap-[9.88456px] pt-[2.47114px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metrics"
          :key="metric.label"
          class="flex h-[72.27px] min-w-0 items-center gap-[11.12px] rounded-[11.1201px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.8268px] py-[12.3557px]"
        >
          <span
            class="inline-flex h-[45.09px] w-[43.88px] shrink-0 items-center justify-center rounded-[11.1201px]"
            :style="{ backgroundColor: metric.overlay, color: metric.iconColor }"
          >
            <DashboardIcon :name="metric.icon" :size="19.77" :stroke-width="2" />
          </span>
          <span class="block min-w-0">
            <span class="block text-[12.3557px] font-medium leading-[15px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block font-bold"
              :class="metric.label === 'Total Tokens' ? 'text-[24.7114px] leading-[27px]' : 'text-[17.298px] leading-[20px]'"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
          </span>
        </article>
      </section>

      <section class="min-h-[567.94px] min-w-0 overflow-hidden rounded-[11.1201px] border border-[#EFF0F6] bg-white">
        <div class="thin-token-scrollbar min-w-0 overflow-x-auto overflow-y-visible">
          <table class="w-full min-w-[1080px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 17.06%" />
              <col style="width: 15.54%" />
              <col style="width: 11.09%" />
              <col style="width: 20.24%" />
              <col style="width: 20.24%" />
              <col style="width: 15.83%" />
            </colgroup>

            <thead>
              <tr class="h-[38.48px]">
                <th
                  v-for="header in ['Transaction ID', 'Service Name', 'Office', 'Start Time', 'End Time', 'Time Difference']"
                  :key="header"
                  class="bg-[#F9FAFB] px-[16.0624px] py-[11.1201px] text-[12.3557px] font-semibold uppercase leading-[15px] tracking-[0.617785px] text-[#8D97A5]"
                  :class="header === 'Time Difference' ? 'text-right' : 'text-left'"
                >
                  {{ header }}
                  <span
                    v-if="header !== 'Time Difference'"
                    class="font-['Cambria_Math'] text-[11.1201px] font-normal leading-[13px] opacity-35"
                  >
                    &#8645;
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in visibleRows"
                :key="row.id"
                class="h-[44.65px]"
                :class="isSlowRow(row) ? 'bg-[rgba(239,67,67,0.03)]' : ''"
              >
                <td class="border-b border-[#EFF0F6] px-[16.0624px] py-[11.1201px]">
                  <span class="inline-flex h-[18.94px] items-center rounded-[3.70671px] border border-[#EFF0F6] bg-[#F9FAFB] px-[4.94228px] py-[1.23557px] font-['Consolas'] text-[12.3557px] font-normal leading-[14px] text-[#15191E]">
                    {{ row.transactionId }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[16.0624px] py-[12.3557px] text-[14.8268px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.serviceName }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[16.0624px] py-[11.7379px]">
                  <span
                    class="inline-flex h-[19.94px] items-center rounded-[24.7114px] px-[8.64899px] py-[2.47114px] text-[12.3557px] font-medium leading-[15px]"
                    :style="{ color: officeStyles[row.office].color, backgroundColor: officeStyles[row.office].background }"
                  >
                    {{ row.office }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[16.0624px] py-[12.9735px] text-[13.5913px] font-normal leading-4 text-[#15191E]">
                  {{ row.startTime }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[16.0624px] py-[12.9735px] text-[13.5913px] font-normal leading-4 text-[#15191E]">
                  {{ row.endTime }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[16.0624px] py-[11.1201px] text-right">
                  <span
                    class="inline-flex h-[20.94px] w-[74.83px] items-center justify-end rounded-[4.94228px] px-[7.41342px] py-[2.47114px] font-['Consolas'] text-[13.5913px] font-bold leading-4"
                    :style="{ color: durationTone(row).color, backgroundColor: durationTone(row).background }"
                  >
                    {{ row.duration }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex min-h-[56.04px] flex-wrap items-center justify-between gap-3 border-t border-[#EFF0F6] bg-white px-[16.0624px] py-[11.1201px]">
          <div class="flex min-h-[30.36px] flex-wrap items-center gap-x-[12.36px] gap-y-2">
            <p class="text-[13.5913px] font-normal leading-4 text-[#8D97A5]">
              Showing {{ visibleRows.length }} of 150 tokens
            </p>
            <label class="flex items-center gap-[6.18px] text-[13.5913px] font-normal leading-4 text-[#8D97A5]">
              Show
              <select
                class="h-[30.36px] w-[66.38px] rounded-[6.17785px] border border-[#DEE2E7] bg-white px-[12.3557px] py-[3.70671px] text-[13.5913px] font-normal leading-[17px] text-[#15191E] outline-none"
                aria-label="Rows per page"
              >
                <option>10</option>
              </select>
              rows
            </label>
          </div>

          <nav class="flex h-[32.57px] items-center gap-[2.47px]" aria-label="Token table pagination">
            <button type="button" class="inline-flex h-[32.57px] w-[32.68px] min-w-[31.69px] items-center justify-center rounded-[6.17785px] border border-[#DEE2E7] bg-white text-[13.5913px] font-medium leading-4 text-[#15191E] opacity-30" disabled aria-label="Previous page">
              &lsaquo;
            </button>
            <button type="button" class="inline-flex h-[32.57px] min-w-[33.47px] items-center justify-center rounded-[6.17785px] border border-[#3899FA] bg-[#3899FA] px-[11.9974px] text-[13.5913px] font-medium leading-4 text-white" aria-current="page">
              1
            </button>
            <button
              v-for="page in [2, 3]"
              :key="page"
              type="button"
              class="inline-flex h-[32.57px] min-w-[32.59px] items-center justify-center rounded-[6.17785px] border border-[#DEE2E7] bg-white px-[10.5518px] text-[13.5913px] font-medium leading-4 text-[#15191E]"
            >
              {{ page }}
            </button>
            <span class="inline-flex h-4 items-center px-[4.94228px] text-[13.5913px] font-normal leading-4 text-[#8D97A5]">
              &hellip;
            </span>
            <button type="button" class="inline-flex h-[32.57px] min-w-[33.29px] items-center justify-center rounded-[6.17785px] border border-[#DEE2E7] bg-white px-[7.89529px] text-[13.5913px] font-medium leading-4 text-[#15191E]">
              15
            </button>
            <button type="button" class="inline-flex h-[32.57px] w-[32.68px] min-w-[31.69px] items-center justify-center rounded-[6.17785px] border border-[#DEE2E7] bg-white text-[13.5913px] font-medium leading-4 text-[#15191E]" aria-label="Next page">
              &rsaquo;
            </button>
          </nav>
        </footer>

        <div class="flex min-h-[37px] items-center gap-[7.41px] border-t border-[rgba(239,67,67,0.15)] bg-[rgba(239,67,67,0.03)] px-[16.0624px] py-[9.88456px] text-[13.5913px] leading-4 text-[#EF4343]">
          <span class="h-[7.52px] w-[7.31px] shrink-0 rounded-[3.70671px] bg-[#EF4343]" />
          <strong class="font-bold">
            {{ slowRows.length }} tokens
          </strong>
          <span class="font-normal">
            exceeded 30-minute processing time -- rows highlighted above
          </span>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.thin-token-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.35) transparent;
  scrollbar-width: thin;
}

.thin-token-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.thin-token-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-token-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(141, 151, 165, 0.35);
  border-radius: 999px;
}
</style>
