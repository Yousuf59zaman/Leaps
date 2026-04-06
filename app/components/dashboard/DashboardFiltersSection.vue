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
  <section class="bg-[rgba(235,247,243,0.73)] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 xl:min-h-[164.57px] xl:rounded-none xl:px-[43px] xl:pb-[17.76px] xl:pt-[11.67px]">
    <div class="flex flex-col gap-4 xl:gap-[2px]">
      <div class="flex justify-start sm:justify-end xl:min-h-[36px]">
        <FilterActions :is-dirty="isDirty" @reset="$emit('reset')" @apply="$emit('apply')" />
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,340.69px))] xl:justify-between xl:gap-[33px]">
        <LayerField v-model="state.layer" :options="filters.layerOptions" />
        <OfficeField v-model="state.office" :options="filters.officeOptions" />
        <ServiceField v-model="state.service" :options="filters.serviceOptions" />
        <FromDateField v-model="state.fromDate" />
        <ToDateField v-model="state.toDate" />
      </div>
    </div>
  </section>
</template>
