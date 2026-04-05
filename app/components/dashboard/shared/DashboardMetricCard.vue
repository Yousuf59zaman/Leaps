<script setup lang="ts">
import { computed } from 'vue'
import type { MetricCardData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'
import DashboardIcon from './DashboardIcon.vue'

const props = withDefaults(
  defineProps<{
    data: MetricCardData
    variant?: 'overview' | 'qms'
  }>(),
  {
    variant: 'overview'
  }
)

const overviewToneStyles: Record<string, { iconWrap: string; radius: string }> = {
  'total-offices': {
    iconWrap: 'bg-[rgba(56,153,250,0.1)] text-[#3899FA]',
    radius: 'rounded-[18.6667px]'
  },
  'total-services': {
    iconWrap: 'bg-[rgba(29,201,115,0.1)] text-[#1DC973]',
    radius: 'rounded-[18.6667px]'
  },
  'total-registrations': {
    iconWrap: 'bg-[rgba(184,227,35,0.1)] text-[#B8E323]',
    radius: 'rounded-[18.6667px]'
  },
  'verified-users': {
    iconWrap: 'bg-[rgba(117,211,55,0.1)] text-[#75D337]',
    radius: 'rounded-[18.6667px]'
  },
  'suspended-users': {
    iconWrap: 'bg-[rgba(239,67,67,0.1)] text-[#EF4343]',
    radius: 'rounded-[14px]'
  },
  'total-applications': {
    iconWrap: 'bg-[rgba(78,27,140,0.1)] text-[#8A42E1]',
    radius: 'rounded-[18.6667px]'
  },
  'pending-applications': {
    iconWrap: 'bg-[rgba(201,72,29,0.1)] text-[#944223]',
    radius: 'rounded-[18.6667px]'
  },
  'completed-apps': {
    iconWrap: 'bg-[rgba(29,201,115,0.1)] text-[#3AB276]',
    radius: 'rounded-[18.6667px]'
  },
  'rejected-apps': {
    iconWrap: 'bg-[rgba(247,147,30,0.1)] text-[#F7931E]',
    radius: 'rounded-[18.6667px]'
  },
  'cancelled-apps': {
    iconWrap: 'bg-[#F3F5F7] text-[#8D97A5]',
    radius: 'rounded-[14px]'
  }
}

const qmsCardStyles: Record<string, string> = {
  'tokens-issued': 'bg-[#EDEEFC]',
  'average-service-time': 'bg-[#E6F1FD]',
  'average-waiting-time': 'bg-[rgba(56,153,250,0.02)]',
  'male-visitors': 'bg-[rgba(247,147,30,0.12)]',
  'female-visitors': 'bg-[rgba(0,182,155,0.05)]',
  'active-counters': 'bg-[rgba(211,188,55,0.05)]'
}

const toneStyles = computed(() => {
  return overviewToneStyles[props.data.id] ?? {
    iconWrap: 'bg-[rgba(56,153,250,0.1)] text-[#3899FA]',
    radius: 'rounded-[18.6667px]'
  }
})

const articleClass = computed(() => {
  if (props.variant === 'qms') {
    return `min-h-[124px] rounded-[15px] px-5 py-4 shadow-[var(--shadow-card)] ${qmsCardStyles[props.data.id] ?? 'bg-white'}`
  }

  return 'h-[109.333px] rounded-[15px] bg-white px-5 py-4 shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] lg:px-[33.33px] lg:py-[17.67px]'
})

const formattedValue = computed(() => formatCount(props.data.value))

const deltaIcon = computed(() => {
  if (!props.data.delta || props.data.delta.direction === 'neutral') {
    return null
  }

  return props.data.delta.direction === 'down' ? 'arrow-fall' : 'arrow-rise'
})
</script>

<template>
  <article :class="articleClass">
    <div v-if="variant === 'qms'" class="flex h-full flex-col">
      <p class="text-[15px] font-medium leading-[21px] text-[#8D97A5] lg:text-[16px]">
        {{ data.label }}
      </p>
      <p class="mt-1 text-[24px] font-bold leading-[32px] text-[#15191E] lg:text-[26.6667px] lg:leading-[37px]">
        {{ formattedValue }}
      </p>
      <div v-if="data.delta || data.footnote" class="mt-auto flex items-center gap-1.5 pt-3 text-[13.3333px] leading-5 text-[#8D97A5]">
        <DashboardIcon v-if="deltaIcon" :name="deltaIcon" :size="16" :stroke-width="1.9" class="text-black" />
        <span v-if="data.delta">
          {{ data.delta.value }} {{ data.delta.label }}
        </span>
        <span v-else>{{ data.footnote }}</span>
      </div>
    </div>

    <div v-else class="flex items-center gap-4 lg:gap-[21.33px]">
      <span class="inline-flex h-16 w-16 shrink-0 items-center justify-center" :class="[toneStyles.iconWrap, toneStyles.radius]">
        <DashboardIcon :name="data.icon" :size="32" :stroke-width="1.7" />
      </span>

      <div class="min-w-0 flex-1">
        <p class="text-[15px] font-medium leading-[22px] text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]">
          {{ data.label }}
        </p>
        <p class="mt-[5px] text-[24px] font-bold leading-[32px] text-[#15191E] lg:text-[32px] lg:leading-[43px]">
          {{ formattedValue }}
        </p>
        <div v-if="data.delta || data.footnote" class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span v-if="data.delta" class="font-semibold text-[#15191E]">
            {{ data.delta.value }} {{ data.delta.label }}
          </span>
          <span v-if="data.footnote" class="text-[#8D97A5]">
            {{ data.footnote }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
