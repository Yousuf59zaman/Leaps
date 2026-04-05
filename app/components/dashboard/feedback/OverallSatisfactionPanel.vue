<script setup lang="ts">
import { computed } from 'vue'
import type { DonutPanelData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'

const props = defineProps<{
  data: DonutPanelData
}>()

const chartSegments = computed(() => {
  const orderedIds = ['good', 'very-good', 'average', 'bad', 'very-bad']
  const byId = new Map(props.data.legend.map((item) => [item.id, item]))

  return orderedIds
    .map((id) => byId.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
})

const donutStyle = computed(() => {
  let current = 0
  const stops: string[] = []

  for (const segment of chartSegments.value) {
    const percentage = typeof segment.percentage === 'number' ? segment.percentage : 0
    const next = current + percentage * 3.6
    const segmentEnd = Math.max(current, next - 1.1)

    stops.push(`${segment.color} ${current}deg ${segmentEnd}deg`)
    stops.push(`#F9FAFB ${segmentEnd}deg ${next}deg`)

    current = next
  }

  return {
    background: `conic-gradient(from -10deg, ${stops.join(', ')})`
  }
})
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] xl:min-h-[585.33px]">
    <span class="absolute left-[0.33px] top-[24.33px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-8 pb-10 pt-[25.33px] xl:px-[33.33px]">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <DashboardIcon :name="data.icon || 'like'" :size="27" class="text-[#3899FA]" />
          <h3 class="text-[24px] font-semibold leading-[37px] text-[#15191E]">
            {{ data.title }}
          </h3>
        </div>

        <button
          v-if="data.actions?.[0]"
          type="button"
          class="inline-flex h-9 items-center gap-2 rounded-[12px] border border-[#DEE2E7] bg-white px-[14px] text-[12px] font-medium leading-5 text-[#15191E]"
        >
          <DashboardIcon v-if="data.actions[0].icon" :name="data.actions[0].icon" :size="14" class="text-[#15191E]" />
          <span>{{ data.actions[0].label }}</span>
        </button>
      </div>

      <div class="mt-[24px] flex justify-center">
        <div class="relative h-[292px] w-[292px] rounded-full" :style="donutStyle">
          <div class="absolute inset-[63px] rounded-full bg-white" />
        </div>
      </div>

      <div class="mt-[38px] grid grid-cols-2 gap-x-[34px] gap-y-[10px] px-[22px]">
        <div
          v-for="item in data.legend"
          :key="item.id"
          class="flex items-center justify-between gap-4"
          :class="{ 'col-span-2 max-w-[228px]': item.id === 'very-bad' }"
        >
          <div class="flex min-w-0 items-center gap-[10px]">
            <span class="h-4 w-4 rounded-full" :style="{ backgroundColor: item.color }" />
            <span class="truncate text-[18.6667px] font-normal leading-[27px] text-[#8D97A5]">
              {{ item.label }}
            </span>
          </div>

          <span class="text-[18.6667px] font-medium leading-[27px] text-[#15191E]">
            {{ item.percentage }}%
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
