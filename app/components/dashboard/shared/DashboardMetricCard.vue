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
  const base = 'rounded-[16px] bg-white shadow-card transition-all duration-300 hover:shadow-panel hover:-translate-y-1'
  if (props.variant === 'qms') {
    return `${base} min-h-[120px] px-5 py-4 ${qmsCardStyles[props.data.id] ?? 'bg-white'}`
  }

  return `${base} min-h-[100px] px-4 py-5 lg:px-8 lg:py-6`
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
      <p class="text-sm font-medium leading-5 text-gray-400 lg:text-base">
        {{ data.label }}
      </p>
      <p class="mt-1 text-2xl font-bold leading-tight text-gray-900 lg:text-3xl">
        {{ formattedValue }}
      </p>
      <div v-if="data.delta || data.footnote" class="mt-auto flex items-center gap-1.5 pt-3 text-[13px] leading-5 text-gray-400">
        <DashboardIcon v-if="deltaIcon" :name="deltaIcon" :size="16" :stroke-width="2" class="text-black" />
        <span v-if="data.delta">
          {{ data.delta.value }} {{ data.delta.label }}
        </span>
        <span v-else>{{ data.footnote }}</span>
      </div>
    </div>

    <div v-else class="flex items-center gap-4 lg:gap-6">
      <span class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] sm:h-16 sm:w-16" :class="[toneStyles.iconWrap]">
        <DashboardIcon :name="data.icon" :size="28" :stroke-width="1.8" class="sm:[&_svg]:size-8" />
      </span>

      <div class="min-w-0 flex-1">
        <p class="text-[14px] font-medium leading-5 text-gray-400 sm:text-[15px] lg:text-[18px] lg:leading-7">
          {{ data.label }}
        </p>
        <p class="mt-1 text-2xl font-bold leading-9 text-gray-900 lg:mt-1 lg:text-3xl lg:leading-10">
          {{ formattedValue }}
        </p>
        <div v-if="data.delta || data.footnote" class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span v-if="data.delta" class="font-semibold text-gray-900">
            {{ data.delta.value }} {{ data.delta.label }}
          </span>
          <span v-if="data.footnote" class="text-gray-400">
            {{ data.footnote }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
