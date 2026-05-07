<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number
    color?: string
  }>(),
  {
    color: '#3899FA'
  }
)

const safeValue = computed(() => Math.min(100, Math.max(0, props.value)))
const textColor = computed(() => {
  if (safeValue.value >= 90) {
    return '#1DC973'
  }

  if (safeValue.value <= 0) {
    return '#8D97A5'
  }

  return '#15191E'
})
</script>

<template>
  <div class="flex min-w-[122px] items-center gap-[7.31px]">
    <span class="h-[4.87px] flex-1 overflow-hidden rounded-[2.43673px] bg-[#EFF0F6]">
      <span class="block h-full rounded-[2.43673px]" :style="{ width: `${safeValue}%`, backgroundColor: color }" />
    </span>
    <span class="min-w-[38.99px] text-right text-[12.1837px] font-semibold leading-[15px]" :style="{ color: textColor }">
      {{ safeValue }}%
    </span>
  </div>
</template>
