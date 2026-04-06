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
  <div class="h-auto w-full max-w-[323.65px] rounded-[15.1709px] border border-[#DEE2E7] bg-[#F9FAFB] px-4 py-4 shadow-[0_12px_40px_rgba(15,37,82,0.08)] sm:px-[21.49px] sm:py-[21.49px]">
    <div class="flex items-start justify-between border-b border-[rgba(222,226,231,0.5)] pb-[10px]">
      <h4 class="text-[18px] font-bold leading-7 text-[#3899FA] sm:text-[20.2278px] sm:leading-[30px]">
        {{ data.name }}
      </h4>
      <span class="pt-[6px] text-sm font-semibold leading-5 text-[#15191E] sm:text-[15.1709px]">
        {{ data.statusLabel }}
      </span>
    </div>

    <div class="mt-[19px] space-y-[9px]">
      <div
        v-for="(stat, index) in data.stats"
        :key="stat.id"
        class="flex items-center justify-between gap-4 text-[15px] leading-6 sm:text-[17.6993px] sm:leading-[25px]"
      >
        <span class="font-normal text-[#8D97A5]">{{ stat.label }}</span>
        <span class="font-semibold" :class="valueClass(index)">
          {{ formatCount(stat.value) }}
        </span>
      </div>
    </div>
  </div>
</template>
