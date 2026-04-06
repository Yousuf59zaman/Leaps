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
  <section class="rounded-[24.1722px] bg-white px-4 py-5 sm:px-5 sm:py-6 lg:px-[44px] lg:pb-[41px] lg:pt-[29.71px]">
    <DashboardSectionHeading title="Reporting Analytics" icon="building-2" />

    <div class="mt-6 grid gap-5 sm:mt-8 sm:gap-6 min-[1700px]:mt-[43px] min-[1700px]:grid-cols-[704px_minmax(0,1009px)] min-[1700px]:items-start min-[1700px]:gap-[34px]">
      <ReportingAnalyticsLeftColumn :demographic="data.demographic" :vulnerability="data.vulnerability" />
      <ReportingAnalyticsRightColumn :age-groups="data.ageGroups" :vulnerability-matrix="data.vulnerabilityMatrix" />
    </div>
  </section>
</template>
