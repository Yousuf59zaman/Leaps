<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const rows = [
  { id: 'qc', office: 'Quezon City Hall', applications: 21400, completed: 18600, rejected: 940, completionRate: 87 },
  { id: 'manila', office: 'Manila City Hall', applications: 19700, completed: 16240, rejected: 1120, completionRate: 82 },
  { id: 'makati', office: 'Makati City Hall', applications: 14100, completed: 12620, rejected: 420, completionRate: 90 },
  { id: 'pasig', office: 'Pasig City Hall', applications: 12800, completed: 10830, rejected: 610, completionRate: 85 },
  { id: 'taguig', office: 'Taguig City Hall', applications: 11900, completed: 10210, rejected: 500, completionRate: 86 }
]

const columns = [
  { key: 'office', label: 'Office', width: '36%' },
  { key: 'applications', label: 'Applications', align: 'right', type: 'number' },
  { key: 'completed', label: 'Completed', align: 'right', type: 'number' },
  { key: 'rejected', label: 'Rejected', align: 'right', type: 'number' },
  { key: 'completionRate', label: 'Completion Rate', type: 'rate' }
]

const totals = computed(() => {
  const total = rows.reduce((sum, row) => ({
    applications: sum.applications + row.applications,
    completed: sum.completed + row.completed,
    rejected: sum.rejected + row.rejected
  }), { applications: 0, completed: 0, rejected: 0 })

  return {
    id: 'total',
    office: 'Total',
    ...total,
    completionRate: total.applications > 0 ? Math.round((total.completed / total.applications) * 100) : 0
  }
})

const chartOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis' },
  legend: { bottom: 0, textStyle: { color: '#8D97A5' } },
  grid: { left: 52, right: 18, top: 16, bottom: 62 },
  xAxis: {
    type: 'category',
    data: rows.map((row) => row.office),
    axisLabel: { color: '#8D97A5', interval: 0 },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#8D97A5', formatter: (value: number) => `${Math.round(value / 1000)}k` },
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { lineStyle: { color: '#DEE2E7', type: 'dashed' } }
  },
  series: [
    {
      name: 'Applications',
      type: 'bar',
      data: rows.map((row) => row.applications),
      barWidth: 28,
      itemStyle: { color: '#3899FA', borderRadius: [4, 4, 0, 0] }
    },
    {
      name: 'Completed',
      type: 'bar',
      data: rows.map((row) => row.completed),
      barWidth: 28,
      itemStyle: { color: '#1DC973', borderRadius: [4, 4, 0, 0] }
    }
  ]
}))
</script>

<template>
  <ReportChartTablePanel
    title="Application Volume"
    subtitle="Application volume and completion by office"
    chart-title="Applications by Office"
    :chart-option="chartOption"
    :metrics="[
      { label: 'Applications', value: totals.applications, icon: 'file-text', tone: 'brand' },
      { label: 'Completed', value: totals.completed, icon: 'circle-check', tone: 'success' },
      { label: 'Rejected', value: totals.rejected, icon: 'circle-x', tone: 'danger' },
      { label: 'Completion', value: `${totals.completionRate}%`, icon: 'arrow-rise', tone: 'success' }
    ]"
    :columns="columns"
    :rows="rows"
    :footer="totals"
  />
</template>
