<script setup lang="ts">
import { computed } from 'vue'
import type { DonutPanelData } from '../../../../types'

const props = defineProps<{
  data: DonutPanelData
  variant: 'demographic' | 'vulnerability'
}>()

const orderedIds = computed(() => (
  props.variant === 'vulnerability'
    ? ['vulnerability', 'male', 'female', 'common']
    : ['male', 'female', 'common']
))

const chartSegments = computed(() => {
  const byId = new Map(props.data.legend.map((item) => [item.id, item]))

  return orderedIds.value
    .map((id) => byId.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
})

const donutStyle = computed(() => {
  const gapSize = 1.8
  let current = 0
  const stops: string[] = []

  for (const segment of chartSegments.value) {
    const percentage = segment.percentage ?? 0
    const next = current + percentage * 3.6
    const solidEnd = Math.max(current, next - gapSize)

    stops.push(`${segment.color} ${current}deg ${solidEnd}deg`)
    stops.push(`#FFFFFF ${solidEnd}deg ${next}deg`)
    current = next
  }

  return {
    background: `conic-gradient(from -12deg, ${stops.join(', ')})`
  }
})

const sliceLabels = computed(() => {
  if (props.variant === 'vulnerability') {
    return [
      { id: 'vulnerability', label: props.data.centerLabel || 'Vulnerability', class: 'left-[20px] top-[82px]' },
      { id: 'male', label: 'Male', class: 'right-[32px] top-[28px]' },
      { id: 'common', label: 'Common', class: 'left-[32px] bottom-[82px]' },
      { id: 'female', label: 'Female', class: 'right-[22px] bottom-[16px]' }
    ]
  }

  return [
    { id: 'male', label: 'Male', class: 'right-[32px] top-[28px]' },
    { id: 'common', label: 'Common', class: 'left-[32px] bottom-[82px]' },
    { id: 'female', label: 'Female', class: 'right-[22px] bottom-[16px]' }
  ]
})
</script>

<template>
  <article class="rounded-[15px] bg-white px-[28px] py-[24px] shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)]">
    <div class="grid gap-6 xl:grid-cols-[170px_minmax(0,1fr)] xl:items-center">
      <div class="space-y-[18px] self-start pt-[10px]">
        <div v-for="item in data.legend" :key="item.id" class="flex items-center gap-[9px]">
          <span class="h-[10px] w-[10px] rounded-full" :style="{ backgroundColor: item.color }" />
          <span class="text-[17.8111px] font-medium leading-[27px]" :style="{ color: item.color }">
            {{ item.label }}
          </span>
        </div>
      </div>

      <div class="relative mx-auto h-[260px] w-full max-w-[330px]">
        <span
          v-for="item in sliceLabels"
          :key="item.id"
          class="absolute text-[15.2667px] font-medium leading-5 text-[#171A1F]"
          :class="item.class"
        >
          {{ item.label }}
        </span>

        <div class="absolute right-[18px] top-[6px] h-[206px] w-[206px] rounded-full" :style="donutStyle">
          <div class="absolute inset-[48px] rounded-full bg-white shadow-[0px_9.66791px_68.8838px_rgba(0,0,0,0.14)]" />
        </div>
      </div>
    </div>
  </article>
</template>
