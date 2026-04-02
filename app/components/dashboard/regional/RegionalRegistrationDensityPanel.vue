<script setup lang="ts">
import type { RegionalRegistrationDensityData } from '../../../../types'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'
import MapDensityLegend from './MapDensityLegend.vue'
import RegionTooltipCard from './RegionTooltipCard.vue'

defineProps<{
  data: RegionalRegistrationDensityData
}>()
</script>

<template>
  <DashboardPanelShell
    :title="data.title"
    :subtitle="data.subtitle"
    :icon="data.icon"
    :badge-label="data.badgeLabel"
    body-class="pt-6"
  >
    <div class="relative overflow-hidden rounded-[1.5rem] border border-[rgba(76,150,255,0.12)] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.95),rgba(183,215,255,0.82)_40%,rgba(76,150,255,0.22)_100%)] p-6 min-h-[26rem]">
      <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),rgba(255,255,255,0))]" />
      <div class="absolute left-[18%] top-[18%] h-52 w-40 rounded-[44%_56%_42%_58%] bg-[rgba(198,236,201,0.82)] blur-[2px] rotate-[-12deg]" />
      <div class="absolute left-[46%] top-[45%] h-36 w-24 rounded-[40%_60%_55%_45%] bg-[rgba(198,236,201,0.74)] blur-[1px] rotate-[10deg]" />
      <div class="absolute right-[18%] top-[42%] h-24 w-16 rounded-[38%_62%_44%_56%] bg-[rgba(198,236,201,0.76)] rotate-[16deg]" />

      <div class="absolute left-[25%] top-[34%]">
        <RegionTooltipCard :data="data.highlightedRegion" />
      </div>

      <div class="absolute bottom-6 right-6">
        <MapDensityLegend :items="data.legend" />
      </div>
    </div>
  </DashboardPanelShell>
</template>
