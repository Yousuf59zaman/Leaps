<script setup lang="ts">
type ReportMetricTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral'

const props = withDefaults(
  defineProps<{
    label: string
    value: number | string
    icon?: string
    tone?: ReportMetricTone
  }>(),
  {
    icon: 'bar-chart-3',
    tone: 'brand'
  }
)

const toneStyles: Record<ReportMetricTone, { wrap: string; value: string }> = {
  brand: {
    wrap: 'bg-[rgba(56,153,250,0.1)] text-[#15191E]',
    value: 'text-[#3899FA]'
  },
  success: {
    wrap: 'bg-[rgba(29,201,115,0.1)] text-[#15191E]',
    value: 'text-[#1DC973]'
  },
  warning: {
    wrap: 'bg-[rgba(201,72,29,0.1)] text-[#15191E]',
    value: 'text-[#C9481D]'
  },
  danger: {
    wrap: 'bg-[rgba(239,67,67,0.1)] text-[#15191E]',
    value: 'text-[#EF4343]'
  },
  neutral: {
    wrap: 'bg-[#F3F5F7] text-[#15191E]',
    value: 'text-[#565D6D]'
  }
}

const classes = computed(() => toneStyles[props.tone])
</script>

<template>
  <article class="flex min-h-[80.41px] min-w-[158px] flex-1 items-center gap-[12.18px] rounded-[12.1837px] border border-[#EFF0F6] bg-[#F9FAFB] px-[17.0571px] py-[14.6204px]">
    <span class="inline-flex h-[48.73px] w-[48.73px] shrink-0 items-center justify-center rounded-[12.1837px]" :class="classes.wrap">
      <DashboardIcon :name="icon" :size="24.37" />
    </span>

    <span class="min-w-0">
      <span class="block text-[13.402px] font-medium leading-4 text-[#8D97A5]">
        {{ label }}
      </span>
      <span class="mt-0 block text-[26.8041px] font-bold leading-[30px]" :class="classes.value">
        {{ value }}
      </span>
    </span>
  </article>
</template>
