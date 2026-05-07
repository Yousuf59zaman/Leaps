<script setup lang="ts">
type TrackingFilter = 'all' | 'approved' | 'payment-received' | 'pending'
type TrackingStatus = Exclude<TrackingFilter, 'all'>

const activeFilter = ref<TrackingFilter>('all')
const searchQuery = ref('')

const trackingColors = {
  brand: '#3899FA',
  text: '#15191E',
  muted: '#8D97A5',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7',
  panel: '#F9FAFB',
  approved: '#75D337',
  payment: '#4E1B8C',
  pending: '#C9481D',
  rating: '#F5A623'
} as const

const filterOptions: Array<{ label: string, value: TrackingFilter, width: string }> = [
  { label: 'All', value: 'all', width: '43.34px' },
  { label: 'Approved', value: 'approved', width: '86.34px' },
  { label: 'Payment Received', value: 'payment-received', width: '142.34px' },
  { label: 'Pending', value: 'pending', width: '78.34px' }
]

const rows: Array<{
  id: string
  service: string
  subCategory: string
  trackingId: string
  status: TrackingStatus
  applicationDate: string
  rating: number | null
}> = [
  {
    id: '2026030602',
    service: 'Business Permit Registration and Renewal',
    subCategory: 'New Application',
    trackingId: '2026030602',
    status: 'approved',
    applicationDate: '2026-03-19 09:02:08',
    rating: 3
  },
  {
    id: '2026050672',
    service: 'Business Permit Registration and Renewal',
    subCategory: 'New Application',
    trackingId: '2026050672',
    status: 'approved',
    applicationDate: '2026-03-19 09:17:44',
    rating: 3
  },
  {
    id: '2025038472',
    service: 'Certificate of Live Birth (Code)',
    subCategory: 'Late Registration',
    trackingId: '2025038472',
    status: 'payment-received',
    applicationDate: '2025-03-19 09:39:08',
    rating: null
  },
  {
    id: '2026041195',
    service: 'Business Permit Registration and Renewal',
    subCategory: 'Renewal Application',
    trackingId: '2026041195',
    status: 'approved',
    applicationDate: '2026-04-11 10:22:15',
    rating: 4
  },
  {
    id: '2026049903',
    service: 'Appointment for Health Services',
    subCategory: 'Alternative',
    trackingId: '2026049903',
    status: 'pending',
    applicationDate: '2026-04-28 08:11:47',
    rating: null
  },
  {
    id: '2026031830',
    service: 'Authority to Travel',
    subCategory: 'Standard',
    trackingId: '2026031830',
    status: 'approved',
    applicationDate: '2026-03-18 14:05:33',
    rating: 5
  }
]

const statusStyles = {
  approved: {
    label: 'Approved',
    color: trackingColors.approved,
    background: 'rgba(117, 211, 55, 0.1)',
    width: '91.89px'
  },
  'payment-received': {
    label: 'Payment Received',
    color: trackingColors.payment,
    background: 'rgba(78, 27, 140, 0.1)',
    width: '145.89px'
  },
  pending: {
    label: 'Pending',
    color: trackingColors.pending,
    background: 'rgba(201, 72, 29, 0.1)',
    width: '84.89px'
  }
} as const

const sortableHeaders = ['Service Name', 'Tracking ID', 'Application Date'] as const
const ratingStars = [1, 2, 3, 4, 5] as const

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesFilter = activeFilter.value === 'all' || row.status === activeFilter.value
    const matchesSearch = !search
      || row.service.toLowerCase().includes(search)
      || row.subCategory.toLowerCase().includes(search)
      || row.trackingId.toLowerCase().includes(search)
      || statusStyles[row.status].label.toLowerCase().includes(search)

    return matchesFilter && matchesSearch
  })
})

const isSortableHeader = (header: string) => sortableHeaders.includes(header as typeof sortableHeaders[number])
</script>

<template>
  <article class="min-h-[1023px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[17.4px] pt-[22.3721px]">
      <header class="flex min-h-[40.49px] flex-wrap items-center justify-between gap-4">
        <div class="w-full max-w-[347px]">
          <h3 class="text-[17.4005px] font-semibold leading-[21px] text-[#15191E]">
            User Service Application Tracking Report
          </h3>
          <p class="mt-[2.49px] text-[13.6718px] leading-[17px] text-[#8D97A5]">
            Individual citizen application records with status
          </p>
        </div>

        <div class="flex w-full flex-wrap items-center gap-x-[7.45737px] gap-y-2 lg:w-auto">
          <div class="flex h-[30.91px] items-start gap-[4.97px]">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="h-[30.91px] rounded-[6.21448px] border px-[12.429px] py-[6.21448px] font-['Arial'] text-[13.6718px] font-normal leading-4 transition-colors"
              :class="activeFilter === option.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: option.width }"
              :aria-pressed="activeFilter === option.value"
              @click="activeFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[219.4px]">
            <span class="sr-only">Search ID or service</span>
            <DashboardIcon name="search" :size="14.63" :stroke-width="1.55" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search ID or service..."
              class="h-[35.4px] w-full rounded-[7.45737px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.45737px] pl-[33.5582px] pr-[12.429px] text-[14.9147px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <section class="h-[400.99px] overflow-hidden rounded-[12.429px] border border-[#EFF0F6] bg-white">
        <div class="thin-tracking-scrollbar h-[336.91px] overflow-x-auto">
          <table class="w-full min-w-[980px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 28.4%" />
              <col style="width: 15.4%" />
              <col style="width: 12.94%" />
              <col style="width: 17.21%" />
              <col style="width: 16.75%" />
              <col style="width: 9.3%" />
            </colgroup>

            <thead>
              <tr>
                <th
                  v-for="header in ['Service Name', 'Sub-category', 'Tracking ID', 'Status', 'Application Date', 'Rating']"
                  :key="header"
                  class="h-[41.1px] bg-[#F9FAFB] px-[17.4005px] py-[12.429px] text-[12.429px] font-semibold uppercase leading-[15px] tracking-[0.621448px] text-[#8D97A5]"
                  :class="header === 'Rating' ? 'text-center' : 'text-left'"
                >
                  <span
                    class="inline-flex items-center gap-[3.72px]"
                    :class="header === 'Rating' ? 'justify-center' : ''"
                  >
                    {{ header }}
                    <span
                      v-if="isSortableHeader(header)"
                      class="font-['Cambria_Math'] text-[11.1861px] font-normal leading-[13px] opacity-35"
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
                class="h-[49.8px]"
              >
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[15.5362px] text-[13.6718px] font-normal leading-[17px] text-[#15191E]">
                  {{ row.service }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[15.5362px] text-[13.6718px] font-normal leading-[17px] text-[#8D97A5]">
                  {{ row.subCategory }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[14.9147px] leading-none">
                  <span class="inline-flex h-[20.97px] items-center rounded-[4.97158px] border border-[#EFF0F6] bg-[#F9FAFB] px-[6.21448px] py-[1.2429px] font-['Consolas'] text-[13.6718px] font-normal leading-4 text-[#15191E]">
                    {{ row.trackingId }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[13.0504px] leading-none">
                  <span
                    class="inline-flex h-[22.46px] items-center rounded-[24.8579px] px-[9.94316px] py-[3.72868px] text-[12.429px] font-medium leading-[15px]"
                    :style="{ width: statusStyles[row.status].width, color: statusStyles[row.status].color, backgroundColor: statusStyles[row.status].background }"
                  >
                    <template v-if="row.status === 'approved'">
                      &#10003;&nbsp;Approved
                    </template>
                    <template v-else-if="row.status === 'payment-received'">
                      &#128179;&nbsp;Payment Received
                    </template>
                    <template v-else>
                      &#9203;&nbsp;Pending
                    </template>
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[15.5362px] text-[13.6718px] font-normal leading-[17px] text-[#15191E]">
                  {{ row.applicationDate }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[14.9147px] text-center leading-none">
                  <span
                    v-if="row.rating"
                    class="inline-flex h-5 items-center justify-center text-[14.9147px] leading-5 tracking-[0.621448px]"
                    aria-label="Rating"
                  >
                    <span
                      v-for="star in ratingStars"
                      :key="star"
                      :class="star <= row.rating ? 'text-[#F5A623]' : 'text-[#EFF0F6]'"
                    >
                      &#9733;
                    </span>
                  </span>
                  <span v-else class="text-[14.9147px] font-normal leading-[18px] text-[#8D97A5]">
                    &mdash;
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex h-[61.59px] flex-wrap items-center justify-between gap-3 border-t border-[#EFF0F6] px-[17.4005px] py-[12.429px]">
          <p class="text-[13.6718px] font-normal leading-[17px] text-[#8D97A5]">
            Showing {{ visibleRows.length }} of {{ rows.length }} records
          </p>

          <div class="flex h-[35.49px] items-start gap-[3.73px]">
            <button
              type="button"
              class="inline-flex h-[35.49px] w-[35.32px] min-w-[33.97px] items-center justify-center rounded-[7.45737px] border border-[#DEE2E7] bg-white text-[13.6718px] font-medium leading-[17px] text-[#15191E] opacity-30"
              disabled
              aria-label="Previous page"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              class="inline-flex h-[35.49px] min-w-[36.11px] items-center justify-center rounded-[7.45737px] border border-[#3899FA] bg-[#3899FA] px-[13.299px] text-[13.6718px] font-medium leading-[17px] text-white"
              aria-current="page"
            >
              1
            </button>
            <button
              type="button"
              class="inline-flex h-[35.49px] w-[35.32px] min-w-[33.97px] items-center justify-center rounded-[7.45737px] border border-[#DEE2E7] bg-white text-[13.6718px] font-medium leading-[17px] text-[#15191E] opacity-30"
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
.thin-tracking-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.45) transparent;
  scrollbar-width: thin;
}

.thin-tracking-scrollbar::-webkit-scrollbar {
  height: 1px;
  width: 1px;
}

.thin-tracking-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-tracking-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(141, 151, 165, 0.45);
  border-radius: 999px;
}

.thin-tracking-scrollbar::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}
</style>
