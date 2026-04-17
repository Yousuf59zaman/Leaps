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

import { dashboardFixture } from '../../../data/dashboard.fixture'

const { state, isDirty, resetFilters, applyFilters } = useDashboardFilters(dashboardFixture.filters.state)
const { dashboardData, isLoading } = useDashboardAnalytics(state)

const filtersData = computed<DashboardFiltersData>(() => ({
  ...dashboardData.value.filters,
  state
}))

useHead({
  title: 'LeAPS Dashboard'
})
</script>

<template>
  <main class="flex flex-col gap-4 pb-12 sm:gap-6 lg:gap-8 transition-all duration-500" :class="{ 'opacity-60 grayscale-[0.3] pointer-events-none': isLoading }">
    <DashboardTopbar />
    <DashboardFiltersSection :filters="filtersData" :state="state" :is-dirty="isDirty" @reset="resetFilters" @apply="applyFilters" />

    <div class="relative flex flex-col gap-8 sm:gap-10 lg:gap-12 xl:px-[var(--app-shell-gutter)]">
      <div v-if="isLoading" class="absolute inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-[4px] rounded-2xl transition-all">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-brand-500 border-t-transparent shadow-lg"></div>
      </div>

      <SystemOverviewSection :data="dashboardData.systemOverview" />
      <RegionalInsightsSection :data="dashboardData.regionalInsights" />
      <ServicePerformanceSection :data="dashboardData.servicePerformance" />
      <ServiceRequestTimelineSection :data="dashboardData.serviceRequestTimeline" />
      <PaymentInformationSection :data="dashboardData.paymentInformation" />
      <ReportingAnalyticsSection :data="dashboardData.reportingAnalytics" />
      <FeedbackRatingsSection :data="dashboardData.serviceFeedback" title="Service Feedback" />
      <QmsAnalyticsSection :data="dashboardData.qmsAnalytics" />
      <QmsActivityTrendSection :data="dashboardData.qmsActivityTrend" />
      <FeedbackRatingsSection :data="dashboardData.channelFeedback" title="Channel Feedback" />
      <CustomReportingAnalyticsSection :data="dashboardData.customReportingAnalytics" />
    </div>
  </main>
</template>
