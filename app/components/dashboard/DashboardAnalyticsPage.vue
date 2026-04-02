<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardFiltersData } from '../../../types'
import { useDashboardAnalytics } from '../../composables/useDashboardAnalytics'
import { useDashboardFilters } from '../../composables/useDashboardFilters'
import CustomReportingAnalyticsSection from './CustomReportingAnalyticsSection.vue'
import DashboardFiltersSection from './DashboardFiltersSection.vue'
import DashboardTopbar from './DashboardTopbar.vue'
import FeedbackRatingsSection from './FeedbackRatingsSection.vue'
import PaymentInformationSection from './PaymentInformationSection.vue'
import QmsActivityTrendSection from './QmsActivityTrendSection.vue'
import QmsAnalyticsSection from './QmsAnalyticsSection.vue'
import RegionalInsightsSection from './RegionalInsightsSection.vue'
import ReportingAnalyticsSection from './ReportingAnalyticsSection.vue'
import ServicePerformanceSection from './ServicePerformanceSection.vue'
import ServiceRequestTimelineSection from './ServiceRequestTimelineSection.vue'
import SystemOverviewSection from './SystemOverviewSection.vue'

const { dashboardData } = useDashboardAnalytics()
const { state, isDirty, resetFilters, applyFilters } = useDashboardFilters(dashboardData.value.filters.state)

const filtersData = computed<DashboardFiltersData>(() => ({
  ...dashboardData.value.filters,
  state
}))

useHead({
  title: 'LeAPS Dashboard'
})
</script>

<template>
  <main class="flex flex-col gap-6 pb-10">
    <DashboardTopbar />
    <DashboardFiltersSection :filters="filtersData" :state="state" :is-dirty="isDirty" @reset="resetFilters" @apply="applyFilters" />
    <SystemOverviewSection :data="dashboardData.systemOverview" />
    <RegionalInsightsSection :data="dashboardData.regionalInsights" />
    <ServicePerformanceSection :data="dashboardData.servicePerformance" />
    <ServiceRequestTimelineSection :data="dashboardData.serviceRequestTimeline" />
    <PaymentInformationSection :data="dashboardData.paymentInformation" />
    <ReportingAnalyticsSection :data="dashboardData.reportingAnalytics" />
    <FeedbackRatingsSection :data="dashboardData.serviceFeedback" />
    <QmsAnalyticsSection :data="dashboardData.qmsAnalytics" />
    <QmsActivityTrendSection :data="dashboardData.qmsActivityTrend" />
    <FeedbackRatingsSection :data="dashboardData.channelFeedback" />
    <CustomReportingAnalyticsSection :data="dashboardData.customReportingAnalytics" />
  </main>
</template>
