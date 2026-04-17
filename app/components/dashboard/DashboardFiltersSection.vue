<script setup lang="ts">
import type { DashboardFiltersData, DashboardFilterState } from '../../../types'
import FilterActions from './filters/FilterActions.vue'
import FromDateField from './filters/FromDateField.vue'
import LayerField from './filters/LayerField.vue'
import OfficeField from './filters/OfficeField.vue'
import ServiceField from './filters/ServiceField.vue'
import ToDateField from './filters/ToDateField.vue'

defineProps<{
  filters: DashboardFiltersData
  state: DashboardFilterState
  isDirty: boolean
}>()

defineEmits<{
  reset: []
  apply: []
}>()
</script>

<template>
  <section class="bg-[#EBF7F3]/70 px-5 py-6 sm:px-6 sm:py-7 lg:px-8 xl:min-h-[160px] xl:px-[40px] xl:py-6 xl:rounded-lg">
    <div class="flex flex-col gap-6 xl:gap-4">
      <div class="flex justify-start sm:justify-end">
        <FilterActions :is-dirty="isDirty" @reset="$emit('reset')" @apply="$emit('apply')" />
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:items-end xl:justify-between xl:gap-6">
        <LayerField v-model="state.layer" :options="filters.layerOptions" class="xl:flex-1 xl:max-w-[320px]" />
        <OfficeField v-model="state.office" :options="filters.officeOptions" class="xl:flex-1 xl:max-w-[320px]" />
        <ServiceField v-model="state.service" :options="filters.serviceOptions" class="xl:flex-1 xl:max-w-[320px]" />
        <FromDateField v-model="state.fromDate" class="xl:flex-1 xl:max-w-[320px]" />
        <ToDateField v-model="state.toDate" class="xl:flex-1 xl:max-w-[320px]" />
      </div>
    </div>
  </section>
</template>
