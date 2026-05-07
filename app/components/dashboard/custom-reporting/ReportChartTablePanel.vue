<script setup lang="ts">
import type { EChartsOption } from 'echarts'

interface ReportMetric {
  label: string
  value: number | string
  icon?: string
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral'
}

interface ReportTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  width?: string
  sortable?: boolean
  emphasize?: boolean
  type?: 'text' | 'number' | 'rate' | 'status'
}

type ReportTableRow = Record<string, number | string | null | undefined>

withDefaults(
  defineProps<{
    title: string
    subtitle: string
    metrics: ReportMetric[]
    chartTitle?: string
    chartOption?: EChartsOption | null
    columns: ReportTableColumn[]
    rows: ReportTableRow[]
    footer?: ReportTableRow | null
    minWidth?: string
  }>(),
  {
    chartTitle: '',
    chartOption: null,
    footer: null,
    minWidth: '980px'
  }
)
</script>

<template>
  <ReportPreviewShell :title="title" :subtitle="subtitle">
    <div class="mt-[17.06px] flex flex-wrap justify-center gap-[12.1837px]">
      <ReportMetricCard
        v-for="metric in metrics"
        :key="metric.label"
        :label="metric.label"
        :value="metric.value"
        :icon="metric.icon"
        :tone="metric.tone"
      />
    </div>

    <div v-if="chartOption" class="mt-[17.06px] rounded-[12.1837px] border border-[#EFF0F6] bg-white px-4 pb-4 pt-3">
      <h4 v-if="chartTitle" class="mb-2 text-center text-[18.6667px] font-semibold leading-[27px] text-[#8D97A5]">
        {{ chartTitle }}
      </h4>
      <DashboardChartFrame :option="chartOption" height="clamp(260px, 34vw, 333px)" />
    </div>

    <div class="mt-[17.06px]">
      <ReportDataTable
        :columns="columns"
        :rows="rows"
        :footer="footer"
        row-key="id"
        :min-width="minWidth"
      />
    </div>
  </ReportPreviewShell>
</template>
