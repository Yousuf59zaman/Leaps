<script setup lang="ts">
import type { LegendItem } from '../../../../types'

defineProps<{
  items: LegendItem[]
}>()

const densityStops = [
  'rgba(56, 153, 250, 0.2)',
  'rgba(56, 153, 250, 0.4)',
  'rgba(56, 153, 250, 0.6)',
  'rgba(56, 153, 250, 0.8)',
  '#3899FA'
]
</script>

<template>
  <div
    class="h-[102.4px] w-[255.38px] rounded-[12.6424px] border border-[#DEE2E7] bg-[rgba(249,250,251,0.9)] px-[16.44px] py-[16.44px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-[2.52848px]"
  >
    <p class="text-[15.1709px] font-medium leading-[20px] text-[#8D97A5]">
      Registration Density
    </p>

    <div class="mt-[10px] flex items-center gap-[5px]">
      <span
        v-for="(color, index) in densityStops"
        :key="`density-stop-${index}`"
        class="h-[15.17px] w-[40.46px] rounded-[7.58543px]"
        :style="{ backgroundColor: color }"
      />
    </div>

    <div class="mt-[5px] flex items-center justify-between text-[12.6424px] font-normal leading-[19px] text-[#8D97A5]">
      <span>Low</span>
      <span>High</span>
    </div>
  </div>
</template>
