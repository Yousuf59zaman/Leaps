<script setup lang="ts">
import type { DashboardPageData } from '../../../../types'
import ReportingTableCard from './ReportingTableCard.vue'

defineProps<{
  ageGroups: DashboardPageData['reportingAnalytics']['ageGroups']
  vulnerabilityMatrix: DashboardPageData['reportingAnalytics']['vulnerabilityMatrix']
}>()
</script>

<template>
  <div class="grid gap-[31px]">
    <ReportingTableCard
      :title="ageGroups.title"
      :icon="ageGroups.icon"
      :actions="ageGroups.actions"
      :columns="ageGroups.columns"
      :rows="ageGroups.rows"
      variant="age"
    />

    <ReportingTableCard
      :title="vulnerabilityMatrix.title"
      :icon="vulnerabilityMatrix.icon"
      :actions="vulnerabilityMatrix.actions"
      :columns="vulnerabilityMatrix.columns"
      :rows="vulnerabilityMatrix.rows"
      variant="vulnerability"
    />
  </div>
</template>
