<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import RegionalInsightsRightColumn from './regional/RegionalInsightsRightColumn.vue'
import RegionalRegistrationDensityPanel from './regional/RegionalRegistrationDensityPanel.vue'

defineProps<{
  data: DashboardPageData['regionalInsights']
}>()
</script>

<template>
  <section class="grid gap-5 sm:gap-6 min-[1400px]:grid-cols-[minmax(0,1.38fr)_minmax(320px,0.96fr)] min-[1400px]:items-start min-[1400px]:gap-[31px]">
    <RegionalRegistrationDensityPanel :data="data.density" />
    <RegionalInsightsRightColumn :request-summary="data.requestSummary" :monthly-registration-trend="data.monthlyRegistrationTrend" />
  </section>
</template>
