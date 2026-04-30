<script setup lang="ts">
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

useHead({
  title: 'LeAPS Dashboard'
})
</script>

<template>
  <main class="flex flex-col gap-4 pb-12 sm:gap-5 lg:gap-6 xl:gap-8">
    <DashboardTopbar />
    <DashboardFiltersSection />

    <div class="flex flex-col gap-5 sm:gap-6 lg:gap-8">
      <SystemOverviewSection />
      <RegionalInsightsSection />
      <ServicePerformanceSection />
      <ServiceRequestTimelineSection />
      <PaymentInformationSection />
      <ReportingAnalyticsSection />
      <FeedbackRatingsSection variant="service-feedback" />
      <QmsAnalyticsSection />
      <QmsActivityTrendSection />
      <FeedbackRatingsSection variant="channel-feedback" />
      <CustomReportingAnalyticsSection />
    </div>
  </main>
</template>
