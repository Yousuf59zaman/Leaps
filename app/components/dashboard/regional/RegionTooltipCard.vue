<script setup lang="ts">
import type { RegionTooltipData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'

const props = defineProps<{
  data: RegionTooltipData
}>()

function valueClass(index: number) {
  const stat = props.data.stats[index]

  if (stat?.tone === 'danger') {
    return 'text-[#EF4343]'
  }

  return 'text-[#15191E]'
}
</script>

<template>
  <div class="h-[226.3px] w-[323.65px] rounded-[15.1709px] border border-[#DEE2E7] bg-[#F9FAFB] px-[21.49px] py-[21.49px] shadow-[0_12px_40px_rgba(15,37,82,0.08)]">
    <div class="flex items-start justify-between border-b border-[rgba(222,226,231,0.5)] pb-[10px]">
      <h4 class="text-[20.2278px] font-bold leading-[30px] text-[#3899FA]">
        {{ data.name }}
      </h4>
      <span class="pt-[6px] text-[15.1709px] font-semibold leading-[20px] text-[#15191E]">
        {{ data.statusLabel }}
      </span>
    </div>

    <div class="mt-[19px] space-y-[9px]">
      <div
        v-for="(stat, index) in data.stats"
        :key="stat.id"
        class="flex items-center justify-between gap-4 text-[17.6993px] leading-[25px]"
      >
        <span class="font-normal text-[#8D97A5]">{{ stat.label }}</span>
        <span class="font-semibold" :class="valueClass(index)">
          {{ formatCount(stat.value) }}
        </span>
      </div>
    </div>
  </div>
</template>
