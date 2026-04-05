<script setup lang="ts">
import { reactive } from 'vue'
import type { DashboardPageData } from '../../../types'
import DashboardSectionHeading from './shared/DashboardSectionHeading.vue'
import CustomReportingLeftColumn from './custom-reporting/CustomReportingLeftColumn.vue'
import CustomReportingRightColumn from './custom-reporting/CustomReportingRightColumn.vue'

const props = defineProps<{
  data: DashboardPageData['customReportingAnalytics']
}>()

const reportState = reactive(structuredClone(props.data.form.state))
</script>

<template>
  <section class="space-y-4">
    <DashboardSectionHeading title="Custom Reporting & Analytics" icon="file-text" />
    <div class="grid gap-6 xl:grid-cols-[434px_minmax(0,1fr)] xl:gap-[33px]">
      <CustomReportingLeftColumn :data="data.form" :state="reportState" />
      <CustomReportingRightColumn :data="data.officeEfficiency" />
    </div>
  </section>
</template>
