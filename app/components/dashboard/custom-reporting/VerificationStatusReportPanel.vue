<script setup lang="ts">
type VerificationFilter = 'all' | 'pending' | 'verified' | 'rejected'

const activeFilter = ref<VerificationFilter>('all')
const searchQuery = ref('')

const rows = [
  { id: 'region-i', region: 'Region I', pending: 0, rejected: 0, verified: 2, verifiedRate: 100, grandTotal: 2 },
  { id: 'barmm', region: 'Bangsamoro Autonomous Region in Muslim Mindanao', pending: 11, rejected: 5, verified: 51, verifiedRate: 76, grandTotal: 67 },
  { id: 'unknown', region: 'Information Not Provided', pending: 2, rejected: 4, verified: 42, verifiedRate: 88, grandTotal: 48 },
  { id: 'region-xi', region: 'Region XI', pending: 2, rejected: 0, verified: 0, verifiedRate: 0, grandTotal: 2 },
  { id: 'ncr', region: 'National Capital Region', pending: 1, rejected: 0, verified: 0, verifiedRate: 0, grandTotal: 1 },
  { id: 'region-x', region: 'Region X', pending: 1, rejected: 0, verified: 0, verifiedRate: 0, grandTotal: 1 },
  { id: 'region-viii', region: 'Region VIII', pending: 2, rejected: 0, verified: 0, verifiedRate: 0, grandTotal: 2 },
  { id: 'region-xii', region: 'Region XII', pending: 1, rejected: 0, verified: 0, verifiedRate: 0, grandTotal: 1 }
]

const columns = [
  { key: 'region', label: 'Region', width: '38.7%', sortable: true },
  { key: 'pending', label: 'Pending', align: 'right', type: 'number', sortable: true },
  { key: 'rejected', label: 'Rejected', align: 'right', type: 'number', sortable: true },
  { key: 'verified', label: 'Verified', align: 'right', type: 'number', sortable: true },
  { key: 'verifiedRate', label: 'Verified Rate', width: '15%', type: 'rate' },
  { key: 'grandTotal', label: 'Grand Total', align: 'right', type: 'number', emphasize: true, sortable: true }
] as const

const filters: Array<{ label: string, value: VerificationFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Rejected', value: 'rejected' }
]

const totals = computed(() => {
  const total = rows.reduce((sum, row) => ({
    pending: sum.pending + row.pending,
    rejected: sum.rejected + row.rejected,
    verified: sum.verified + row.verified,
    grandTotal: sum.grandTotal + row.grandTotal
  }), {
    pending: 0,
    rejected: 0,
    verified: 0,
    grandTotal: 0
  })

  return {
    id: 'total',
    region: 'Total',
    ...total,
    verifiedRate: total.grandTotal > 0 ? Math.round((total.verified / total.grandTotal) * 100) : 0
  }
})

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesSearch = !search || row.region.toLowerCase().includes(search)
    const matchesFilter = activeFilter.value === 'all' || row[activeFilter.value] > 0

    return matchesSearch && matchesFilter
  })
})
</script>

<template>
  <ReportPreviewShell
    title="User Profile Verification Status"
    subtitle="Breakdown of user verification states across all regions"
  >
    <template #actions>
      <div class="flex flex-wrap items-center gap-[7.31px]">
        <div class="flex items-start gap-[4.87px]">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            class="inline-flex h-[29.62px] items-center justify-center rounded-[6.09184px] border px-[12.1837px] text-[13.402px] leading-[15px] transition-colors"
            :class="activeFilter === filter.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5] hover:bg-[#F9FAFB]'"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <label class="relative block w-full sm:w-[219.31px]">
          <span class="sr-only">Search region</span>
          <DashboardIcon name="search" :size="14.62" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search region..."
            class="h-[35.06px] w-full rounded-[7.3102px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.3102px] pl-[32.8959px] pr-[12.1837px] text-[14.6204px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
          />
        </label>
      </div>
    </template>

    <div class="mt-[17.06px] flex flex-wrap justify-center gap-[12.1837px]">
      <ReportMetricCard label="Pending" :value="totals.pending" icon="clock" tone="warning" />
      <ReportMetricCard label="Rejected" :value="totals.rejected" icon="circle-x" tone="danger" />
      <ReportMetricCard label="Verified" :value="totals.verified" icon="circle-check" tone="success" />
      <ReportMetricCard label="Total Users" :value="totals.grandTotal" icon="user-round" tone="brand" />
    </div>

    <div class="mt-[17.06px]">
      <ReportDataTable
        :columns="columns"
        :rows="filteredRows"
        :footer="totals"
        row-key="id"
        min-width="1100px"
      />
    </div>
  </ReportPreviewShell>
</template>
