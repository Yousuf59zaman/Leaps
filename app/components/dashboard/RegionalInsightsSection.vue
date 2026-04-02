<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import RegionalInsightsRightColumn from './regional/RegionalInsightsRightColumn.vue'
import RegionalRegistrationDensityPanel from './regional/RegionalRegistrationDensityPanel.vue'

defineProps<{
  data: DashboardPageData['regionalInsights']
}>()
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-[minmax(0,1.32fr)_minmax(0,0.92fr)]">
    <RegionalRegistrationDensityPanel :data="data.density" />
    <RegionalInsightsRightColumn :request-summary="data.requestSummary" :monthly-registration-trend="data.monthlyRegistrationTrend" />
  </section>
</template>
