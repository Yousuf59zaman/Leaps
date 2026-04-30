<script setup lang="ts">

const data = {
  form: {
    title: 'Custom Reporting',
    icon: 'settings-2',
    state: {
      reportType: null,
      layer: null,
      office: null,
      dateRange: { from: '2024-01-01', to: '2024-06-30' },
      exportFormat: 'preview',
      previewMode: true
    },
    reportTypeOptions: [
      { label: 'Office Efficiency', value: 'office-efficiency' },
      { label: 'QMS Summary', value: 'qms-summary' }
    ],
    layerOptions: [
      { label: 'Office Layer', value: 'office' },
      { label: 'Regional Layer', value: 'regional' }
    ],
    officeOptions: [
      { label: 'Metro Manila', value: 'metro-manila' },
      { label: 'Quezon City Hall', value: 'quezon-city-hall' }
    ]
  },
  officeEfficiency: {
    title: 'Office Efficiency Report: Metro Manila',
    subtitle: 'Generated on: Oct 24, 2024 • Layer: Office Level',
    icon: 'bar-chart-3',
    badgeLabel: 'Preview Mode',
    generatedAt: '2024-10-24',
    chart: {
      title: 'Tokens Processed per Office',
      categories: ['Quezon City Hall', 'Manila City Hall', 'Makati City Hall', 'Pasig City Hall', 'Taguig City Hall'],
      series: [
        { id: 'tokens', name: 'Tokens', type: 'bar', color: '#4C96FF', data: [14500, 12800, 9500, 8200, 7800] }
      ]
    },
    table: {
      title: 'Office Efficiency Breakdown',
      columns: [
        { key: 'officeName', label: 'Office Name' },
        { key: 'totalTokens', label: 'Total Tokens', align: 'right' },
        { key: 'averageServiceTime', label: 'Avg Service Time', align: 'center' },
        { key: 'averageWaitingTime', label: 'Avg Waiting Time', align: 'center' },
        { key: 'status', label: 'Status', align: 'center', emphasize: true }
      ],
      rows: [
        { officeName: 'Quezon City Hall', totalTokens: 14500, averageServiceTime: '12m', averageWaitingTime: '25m', status: 'Optimal' },
        { officeName: 'Manila City Hall', totalTokens: 12800, averageServiceTime: '15m', averageWaitingTime: '32m', status: 'Review Needed' },
        { officeName: 'Makati City Hall', totalTokens: 9500, averageServiceTime: '10m', averageWaitingTime: '18m', status: 'Optimal' },
        { officeName: 'Pasig City Hall', totalTokens: 8200, averageServiceTime: '14m', averageWaitingTime: '22m', status: 'Optimal' },
        { officeName: 'Taguig City Hall', totalTokens: 7800, averageServiceTime: '11m', averageWaitingTime: '20m', status: 'Optimal' }
      ]
    }
  }
}

const reportState = reactive(structuredClone(data.form.state))
</script>

<template>
  <section class="space-y-4">
    <DashboardSectionHeading title="Custom Reporting & Analytics" icon="file-text" />
    <div class="grid gap-5 sm:gap-6 min-[1400px]:grid-cols-[434px_minmax(0,1fr)] min-[1400px]:items-start min-[1400px]:gap-[33px]">
      <CustomReportingLeftColumn :data="data.form" :state="reportState" />
      <CustomReportingRightColumn :data="data.officeEfficiency" />
    </div>
  </section>
</template>
