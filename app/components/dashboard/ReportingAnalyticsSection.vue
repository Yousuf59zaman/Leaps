<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import DashboardSectionHeading from './shared/DashboardSectionHeading.vue'
import ReportingAnalyticsLeftColumn from './reporting/ReportingAnalyticsLeftColumn.vue'
import ReportingAnalyticsRightColumn from './reporting/ReportingAnalyticsRightColumn.vue'

defineProps<{
  data: DashboardPageData['reportingAnalytics']
}>()
</script>

<template>
  <section class="space-y-4">
    <DashboardSectionHeading title="Reporting Analytics" icon="table" />
    <div class="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
      <ReportingAnalyticsLeftColumn :demographic="data.demographic" :vulnerability="data.vulnerability" />
      <ReportingAnalyticsRightColumn :age-groups="data.ageGroups" :vulnerability-matrix="data.vulnerabilityMatrix" />
    </div>
  </section>
</template>
