<script setup lang="ts">
import type { DashboardPageData } from '../../../../types'
import AgeGroupTablePanel from './AgeGroupTablePanel.vue'
import VulnerabilityTablePanel from './VulnerabilityTablePanel.vue'

defineProps<{
  ageGroups: DashboardPageData['reportingAnalytics']['ageGroups']
  vulnerabilityMatrix: DashboardPageData['reportingAnalytics']['vulnerabilityMatrix']
}>()
</script>

<template>
  <div class="grid gap-6">
    <AgeGroupTablePanel :data="ageGroups" />
    <VulnerabilityTablePanel :data="vulnerabilityMatrix" />
  </div>
</template>
