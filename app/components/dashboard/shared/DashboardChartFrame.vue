<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GraphicComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, GraphicComponent, UniversalTransition])

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    height?: number | string
  }>(),
  {
    height: 320
  }
)

const resolvedHeight = computed(() => (typeof props.height === 'number' ? `${props.height}px` : props.height))
</script>

<template>
  <div class="w-full" :style="{ height: resolvedHeight }">
    <ClientOnly>
      <VChart :option="option" autoresize class="h-full w-full" />

      <template #fallback>
        <div class="flex h-full w-full items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-surface-muted)] text-sm text-[color:var(--color-text-muted)]">
          Loading chart...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
