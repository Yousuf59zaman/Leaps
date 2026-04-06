<script setup lang="ts">
import type { ChartPanelData, RequestSummaryData } from '../../../../types'
import MonthlyRegistrationTrendPanel from './MonthlyRegistrationTrendPanel.vue'
import RequestSummaryPanel from './RequestSummaryPanel.vue'

defineProps<{
  requestSummary: RequestSummaryData
  monthlyRegistrationTrend: ChartPanelData
}>()
</script>

<template>
  <div class="grid gap-5 sm:gap-6 xl:gap-[31px]">
    <RequestSummaryPanel :data="requestSummary" />
    <MonthlyRegistrationTrendPanel :data="monthlyRegistrationTrend" />
  </div>
</template>
