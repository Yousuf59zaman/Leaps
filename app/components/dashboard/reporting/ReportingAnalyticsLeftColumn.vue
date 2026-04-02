<script setup lang="ts">
import type { DashboardPageData } from '../../../../types'
import DemographicDonutPanel from './DemographicDonutPanel.vue'
import VulnerabilityDonutPanel from './VulnerabilityDonutPanel.vue'

defineProps<{
  demographic: DashboardPageData['reportingAnalytics']['demographic']
  vulnerability: DashboardPageData['reportingAnalytics']['vulnerability']
}>()
</script>

<template>
  <div class="grid gap-6">
    <DemographicDonutPanel :data="demographic" />
    <VulnerabilityDonutPanel :data="vulnerability" />
  </div>
</template>
