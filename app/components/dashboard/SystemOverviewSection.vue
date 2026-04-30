<script setup lang="ts">

type DashboardTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'

interface MetricCardData {
  id: string
  label: string
  value: number | string
  icon: string
  tone?: DashboardTone
}

const data: { title: string, cards: MetricCardData[] } = {
  title: 'System Overview',
  cards: [
    { id: 'total-offices', label: 'Total Offices', value: 1248, icon: 'building-2', tone: 'brand' },
    { id: 'total-services', label: 'Total Services', value: 342, icon: 'file-text', tone: 'success' },
    { id: 'total-registrations', label: 'Total Registrations', value: '2.4M', icon: 'users', tone: 'warning' },
    { id: 'verified-users', label: 'Verified Users', value: '1.8M', icon: 'circle-check', tone: 'success' },
    { id: 'suspended-users', label: 'Suspended Users', value: '12.4K', icon: 'circle-x', tone: 'danger' },
    { id: 'total-applications', label: 'Total Applications', value: '8.1M', icon: 'file-text', tone: 'brand' },
    { id: 'pending-applications', label: 'Pending Applications', value: '450K', icon: 'clock', tone: 'warning' },
    { id: 'completed-apps', label: 'Completed Apps', value: '7.2M', icon: 'feedback-sheet', tone: 'success' },
    { id: 'rejected-apps', label: 'Rejected Apps', value: '310K', icon: 'receipt', tone: 'danger' },
    { id: 'cancelled-apps', label: 'Cancelled Apps', value: '140K', icon: 'circle-alert', tone: 'neutral' }
  ]
}
</script>

<template>
  <section class="space-y-3 sm:space-y-4 xl:space-y-[20.67px]">
    <div class="flex items-center gap-[10.67px]">
      <DashboardIcon name="map" :size="26.67" class="text-[#3899FA]" />
      <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
        {{ data.title }}
      </h2>
    </div>

    <SystemOverviewCardsGrid :cards="data.cards" />
  </section>
</template>
