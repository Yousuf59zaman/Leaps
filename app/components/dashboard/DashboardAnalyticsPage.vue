<script setup lang="ts">

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
