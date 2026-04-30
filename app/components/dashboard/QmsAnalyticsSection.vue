<script setup lang="ts">

const data = {
  title: 'Queue Management System (QMS) Analytics',
  cards: [
    { id: 'tokens-issued', label: 'Total Tokens Issued', value: '1.2M', icon: 'ticket', tone: 'brand', delta: { value: '+12%', label: 'vs last month', direction: 'up' } },
    { id: 'average-service-time', label: 'Average Service Time', value: '14m 30s', icon: 'timer', tone: 'brand', delta: { value: '-2m', label: 'improvement', direction: 'down' } },
    { id: 'average-waiting-time', label: 'Average Waiting Time', value: '28m 15s', icon: 'clock-3', tone: 'warning', footnote: 'Needs attention' },
    { id: 'male-visitors', label: 'Total Visitors (Male)', value: '540K', icon: 'user-round', tone: 'warning', footnote: '45% of total' },
    { id: 'female-visitors', label: 'Total Visitors (Female)', value: '660K', icon: 'user-round-check', tone: 'success', footnote: '45% of total' },
    { id: 'active-counters', label: 'Total Active Counters', value: '3,450', icon: 'scan-line', tone: 'neutral', footnote: 'Across 1,248 offices' }
  ]
}
</script>

<template>
  <section class="space-y-4">
    <DashboardSectionHeading :title="data.title" icon="table" />
    <QmsMetricsGrid :cards="data.cards" />
  </section>
</template>
