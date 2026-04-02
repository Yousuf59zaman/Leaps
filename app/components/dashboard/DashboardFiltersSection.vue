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
  <section class="rounded-[var(--radius-panel)] border border-[color:var(--app-surface-border)] bg-white px-5 py-5 shadow-[var(--shadow-panel)] sm:px-6 sm:py-6">
    <div class="grid gap-4 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto] xl:items-end">
      <LayerField v-model="state.layer" :options="filters.layerOptions" />
      <OfficeField v-model="state.office" :options="filters.officeOptions" />
      <ServiceField v-model="state.service" :options="filters.serviceOptions" />
      <FromDateField v-model="state.fromDate" />
      <ToDateField v-model="state.toDate" />
      <FilterActions :is-dirty="isDirty" @reset="$emit('reset')" @apply="$emit('apply')" />
    </div>
  </section>
</template>
