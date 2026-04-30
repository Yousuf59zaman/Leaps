<script setup lang="ts">
import QmsActivityTrendChart from './qms/QmsActivityTrendChart.vue'

const data = {
  title: 'QMS Activity Trend',
  subtitle: 'Tokens Issued, Served, and Abandoned over time',
  icon: 'indicator',
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { id: 'issued', name: 'Tokens Issued', type: 'bar', color: '#3CD856', data: [86000, 92000, 88000, 105000, 112000, 118000] },
    { id: 'served', name: 'Tokens Served', type: 'bar', color: '#3899FA', data: [81000, 86000, 85000, 97000, 104000, 110000] },
    { id: 'abandoned', name: 'Abandoned', type: 'line', color: '#EF4343', smooth: true, data: [5200, 6100, 4700, 7600, 7000, 8400] }
  ],
  legend: [
    { id: 'issued', label: 'Tokens Issued', color: '#3CD856' },
    { id: 'served', label: 'Tokens Served', color: '#3899FA' },
    { id: 'abandoned', label: 'Abandoned', color: '#EF4343' }
  ]
}
</script>

<template>
  <section>
    <QmsActivityTrendChart :data="data" />
  </section>
</template>
