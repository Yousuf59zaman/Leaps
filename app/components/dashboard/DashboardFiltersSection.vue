<script setup lang="ts">

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface DashboardFilterState {
  layer: string | null
  office: string | null
  service: string | null
  fromDate: string | null
  toDate: string | null
  applied: boolean
}

const layerOptions: SelectOption[] = [
  { label: 'Office Layer', value: 'office' },
  { label: 'Regional Layer', value: 'regional' },
  { label: 'Service Layer', value: 'service' }
]

const officeOptions: SelectOption[] = [
  { label: 'Metro Manila', value: 'metro-manila' },
  { label: 'Cebu City', value: 'cebu-city' },
  { label: 'Davao Central', value: 'davao-central' }
]

const serviceOptions: SelectOption[] = [
  { label: 'All Services', value: 'all-services' },
  { label: 'Business Permit Registration', value: 'business-permit-registration' },
  { label: 'Birth Certificate Request', value: 'birth-certificate-request' }
]

const defaultState: DashboardFilterState = {
  layer: 'office',
  office: 'metro-manila',
  service: 'all-services',
  fromDate: '2024-01-01',
  toDate: '2024-06-30',
  applied: true
}

const state = reactive<DashboardFilterState>({ ...defaultState })

const serializeState = (target: DashboardFilterState) => JSON.stringify({
  layer: target.layer,
  office: target.office,
  service: target.service,
  fromDate: target.fromDate,
  toDate: target.toDate
})

const isDirty = computed(() => serializeState(state) !== serializeState(defaultState))

function resetFilters() {
  Object.assign(state, defaultState)
}

function applyFilters() {
  state.applied = true
}
</script>

<template>
  <section class="bg-[rgba(235,247,243,0.73)] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 xl:min-h-[164.57px] xl:rounded-none xl:px-[43px] xl:pb-[17.76px] xl:pt-[11.67px]">
    <div class="flex flex-col gap-4 xl:gap-[2px]">
      <div class="flex justify-start sm:justify-end xl:min-h-[36px]">
        <FilterActions :is-dirty="isDirty" @reset="$emit('reset')" @apply="$emit('apply')" />
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,340.69px))] xl:justify-between xl:gap-[33px]">
        <SharedSelectField
          v-model="state.layer"
          label="Select Layer"
          placeholder="Choose One"
          placeholder-disabled
          :options="layerOptions"
        />
        <SharedSelectField
          v-model="state.office"
          label="Select Office"
          placeholder="Choose One"
          placeholder-disabled
          :options="officeOptions"
        />
        <SharedSelectField
          v-model="state.service"
          label="Select Service"
          placeholder="Choose One"
          placeholder-disabled
          :options="serviceOptions"
        />
        <SharedDateField v-model="state.fromDate" label="From Date" />
        <SharedDateField v-model="state.toDate" label="To Date" />
      </div>
    </div>
  </section>
</template>
