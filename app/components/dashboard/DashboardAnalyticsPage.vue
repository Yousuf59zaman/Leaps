<script setup lang="ts">

useHead({
  title: 'LeAPS Dashboard'
})
</script>

<template>
  <main class="flex flex-col gap-4 pb-12 sm:gap-6 lg:gap-8 transition-all duration-500" :class="{ 'opacity-60 grayscale-[0.3] pointer-events-none': isLoading }">
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
