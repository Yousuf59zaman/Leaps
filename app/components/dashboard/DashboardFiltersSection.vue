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
  <section class="bg-[#EBF7F3]/70 px-5 py-6 sm:px-6 sm:py-7 lg:px-8 xl:min-h-[160px] xl:px-[40px] xl:py-6 xl:rounded-lg">
    <div class="flex flex-col gap-6 xl:gap-4">
      <div class="flex justify-start sm:justify-end">
        <FilterActions :is-dirty="isDirty" @reset="$emit('reset')" @apply="$emit('apply')" />
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,340.69px))] xl:justify-between xl:gap-[33px]">
        <LayerField v-model="state.layer" :options="layerOptions" />
        <OfficeField v-model="state.office" :options="officeOptions" />
        <ServiceField v-model="state.service" :options="serviceOptions" />
        <FromDateField v-model="state.fromDate" />
        <ToDateField v-model="state.toDate" />
      </div>
    </div>
  </section>
</template>
