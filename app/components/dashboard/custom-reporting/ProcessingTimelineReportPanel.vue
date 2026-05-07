<script setup lang="ts">
const searchQuery = ref('')

const timelineColors = {
  brand: '#3899FA',
  success: '#1DC973',
  warning: '#C9481D',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7',
  panel: '#F9FAFB',
  text: '#15191E',
  muted: '#8D97A5'
} as const

const metricCards = [
  {
    label: 'Transactions',
    value: '3',
    icon: 'refresh-cw',
    color: timelineColors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)',
    valueClass: 'text-[26.815px] leading-[29px]'
  },
  {
    label: 'Fastest',
    value: '00:01:26',
    icon: 'bolt',
    color: timelineColors.success,
    overlay: 'rgba(29, 201, 115, 0.1)',
    valueClass: 'text-[19.5018px] leading-[21px]'
  },
  {
    label: 'Slowest',
    value: '01:00:40',
    icon: 'clock',
    color: timelineColors.warning,
    overlay: 'rgba(201, 72, 29, 0.1)',
    valueClass: 'text-[19.5018px] leading-[21px]'
  }
] as const

const rows = [
  {
    id: '004c9640',
    transactionId: '004C9640',
    service: 'Business Permit Reg. & Renewal — New Application',
    office: 'Payapa',
    firstDate: '2024-01-01 01:59:13',
    lastDate: '2024-01-01 02:00:55',
    processingTime: '00:01:26',
    tone: 'success'
  },
  {
    id: '3204b568',
    transactionId: '3204B568',
    service: 'Business Permit Reg. & Renewal — New Application',
    office: 'Payapa',
    firstDate: '2026-01-01 01:01:13',
    lastDate: '2026-01-01 01:23:31',
    processingTime: '00:23:05',
    tone: 'brand'
  },
  {
    id: '2204c629',
    transactionId: '2204C629',
    service: 'Business Permit Reg. & Renewal — New Application',
    office: 'Payapa',
    firstDate: '2024-01-01 01:49:04',
    lastDate: '2024-01-01 02:49:44',
    processingTime: '01:00:40',
    tone: 'warning'
  }
] as const

const toneStyles = {
  success: {
    color: timelineColors.success,
    background: 'rgba(29, 201, 115, 0.1)'
  },
  brand: {
    color: timelineColors.brand,
    background: 'rgba(56, 153, 250, 0.1)'
  },
  warning: {
    color: timelineColors.warning,
    background: 'rgba(201, 72, 29, 0.1)'
  }
} as const

const sortableHeaders = ['Transaction ID', 'Service', 'First Date', 'Last Date'] as const

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return rows
  }

  return rows.filter((row) => (
    row.transactionId.toLowerCase().includes(search)
    || row.service.toLowerCase().includes(search)
    || row.office.toLowerCase().includes(search)
  ))
})

const isSortableHeader = (header: string) => sortableHeaders.includes(header as typeof sortableHeaders[number])
</script>

<template>
  <article class="min-h-[1023px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[17.06px] pt-[21.9396px]">
      <header class="flex min-h-[39.44px] flex-wrap items-center justify-between gap-4">
        <div class="w-full max-w-[329px]">
          <h3 class="text-[17.0641px] font-semibold leading-[21px] text-[#15191E]">
            Transaction Processing Timeline Report
          </h3>
          <p class="mt-[2.44px] text-[13.4075px] leading-4 text-[#8D97A5]">
            First to last date tracking per transaction
          </p>
        </div>

        <label class="relative block w-full sm:w-[219.4px]">
          <span class="sr-only">Search ID or service</span>
          <DashboardIcon name="search" :size="14.63" :stroke-width="1.52" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search ID or service..."
            class="h-[35.06px] w-full rounded-[7.31319px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.31319px] pl-[32.9093px] pr-[12.1886px] text-[14.6264px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
          />
        </label>
      </header>

      <div class="grid min-h-[80.45px] gap-[12.1886px] lg:grid-cols-3">
        <article
          v-for="metric in metricCards"
          :key="metric.label"
          class="flex h-[80.45px] min-w-[158.45px] items-center gap-[12.19px] rounded-[12.1886px] border border-[#EFF0F6] bg-[#F9FAFB] px-[17.0641px] py-[14.6264px]"
        >
          <span
            class="inline-flex h-[48.75px] w-[48.75px] shrink-0 items-center justify-center rounded-[12.1886px] text-[#15191E]"
            :style="{ backgroundColor: metric.overlay }"
          >
            <svg
              v-if="metric.icon === 'bolt'"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.3 2.8 5.7 13.1h5.3L9.9 21.2l8.4-11.4h-5.7l.7-7Z" />
            </svg>
            <DashboardIcon v-else :name="metric.icon" :size="24" :stroke-width="1.9" />
          </span>

          <span class="min-w-0">
            <span class="block text-[13.4075px] font-medium leading-4 text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block font-bold"
              :class="metric.valueClass"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
          </span>
        </article>
      </div>

      <section class="h-[282.44px] overflow-hidden rounded-[12.1886px] border border-[#EFF0F6] bg-white">
        <div class="thin-processing-scrollbar h-[220.28px] overflow-x-auto">
          <table class="w-full min-w-[980px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 15.95%" />
              <col style="width: 23.71%" />
              <col style="width: 9.39%" />
              <col style="width: 17.9%" />
              <col style="width: 17.9%" />
              <col style="width: 15.15%" />
            </colgroup>

            <thead>
              <tr>
                <th
                  v-for="header in ['Transaction ID', 'Service', 'Office', 'First Date', 'Last Date', 'Processing Time']"
                  :key="header"
                  class="h-[40.6px] bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]"
                  :class="header === 'Processing Time' ? 'text-right' : 'text-left'"
                >
                  <span
                    class="inline-flex items-center gap-[3.66px]"
                    :class="header === 'Processing Time' ? 'justify-end' : ''"
                  >
                    {{ header }}
                    <span
                      v-if="isSortableHeader(header)"
                      class="font-['Cambria_Math'] text-[10.9698px] font-normal leading-[13px] opacity-35"
                    >
                      &#8645;
                    </span>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in visibleRows"
                :key="row.id"
                class="h-[59.88px]"
              >
                <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[18.283px]">
                  <span class="inline-flex h-[20.88px] items-center rounded-[4.87546px] border border-[#EFF0F6] bg-[#F9FAFB] px-[6.09432px] py-[1.21886px] font-['Consolas'] text-[13.4075px] font-normal leading-4 text-[#15191E]">
                    {{ row.transactionId }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[12.1886px] text-[13.4075px] font-normal leading-4 text-[#15191E]">
                  <span class="block max-w-[253px]">
                    {{ row.service }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[20.1113px]">
                  <span class="inline-flex h-[19.88px] items-center rounded-[24.3773px] bg-[rgba(56,153,250,0.1)] px-[9.75092px] py-[2.43773px] text-[12.1886px] font-medium leading-[15px] text-[#3899FA]">
                    {{ row.office }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[21.3301px] text-[13.4075px] font-normal leading-4 text-[#15191E]">
                  {{ row.firstDate }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[21.3301px] text-[13.4075px] font-normal leading-4 text-[#15191E]">
                  {{ row.lastDate }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[19.5018px] text-right">
                  <span
                    class="inline-flex h-[20.88px] items-center justify-end rounded-[4.87546px] px-[8.53205px] py-[2.43773px] text-[13.4075px] font-semibold leading-4"
                    :style="{ color: toneStyles[row.tone].color, backgroundColor: toneStyles[row.tone].background }"
                  >
                    {{ row.processingTime }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex h-[59.72px] flex-wrap items-center justify-between gap-3 border-t border-[#EFF0F6] px-[17.0641px] py-[12.1886px]">
          <p class="text-[13.4075px] font-normal leading-4 text-[#8D97A5]">
            Showing {{ visibleRows.length }} of {{ rows.length }} transactions
          </p>

          <div class="flex h-[34.13px] items-start gap-[3.66px]">
            <button
              type="button"
              class="inline-flex h-[34.13px] w-[34.13px] min-w-[34.13px] items-center justify-center rounded-[7.31319px] border border-[#DEE2E7] bg-white text-[13.4075px] font-medium leading-4 text-[#15191E] opacity-30"
              disabled
              aria-label="Previous page"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              class="inline-flex h-[34.13px] min-w-[35.55px] items-center justify-center rounded-[7.31319px] border border-[#3899FA] bg-[#3899FA] px-[13.0418px] text-[13.4075px] font-medium leading-4 text-white"
              aria-current="page"
            >
              1
            </button>
            <button
              type="button"
              class="inline-flex h-[34.13px] w-[34.13px] min-w-[34.13px] items-center justify-center rounded-[7.31319px] border border-[#DEE2E7] bg-white text-[13.4075px] font-medium leading-4 text-[#15191E] opacity-30"
              disabled
              aria-label="Next page"
            >
              &rsaquo;
            </button>
          </div>
        </footer>
      </section>
    </div>
  </article>
</template>

<style scoped>
.thin-processing-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.45) transparent;
  scrollbar-width: thin;
}

.thin-processing-scrollbar::-webkit-scrollbar {
  height: 1px;
  width: 1px;
}

.thin-processing-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-processing-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(141, 151, 165, 0.45);
  border-radius: 999px;
}

.thin-processing-scrollbar::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}
</style>
