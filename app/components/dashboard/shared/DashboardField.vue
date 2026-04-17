<script setup lang="ts">
import { computed } from 'vue'
import type { SelectOption } from '../../../../types'
import DashboardIcon from './DashboardIcon.vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string | null
    options?: SelectOption[]
    placeholder?: string
    type?: 'select' | 'date'
    icon?: string
  }>(),
  {
    options: () => [],
    placeholder: 'Choose One',
    type: 'select',
    icon: 'chevron'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const model = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value || null)
})
</script>

<template>
  <label class="block space-y-2 lg:space-y-1.5">
    <span class="text-[14px] font-medium leading-[20px] text-black/70 lg:text-[15px] lg:leading-[22px] xl:text-[20px] xl:leading-[28px] xl:tracking-tight">
      {{ label }}
    </span>

    <span class="relative block">
      <select
        v-if="type === 'select'"
        v-model="model"
        class="dashboard-field-select h-12 w-full appearance-none rounded-[8px] border border-[#EFF0F6] bg-white px-4 pr-12 text-[15px] font-normal leading-[20px] text-black/70 shadow-none transition-all focus:border-brand-500/50 focus:outline-none xl:h-[60px] xl:px-5 xl:pr-[54px] xl:text-[20px] xl:leading-[28px] xl:tracking-tight"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <input
        v-else
        v-model="model"
        type="date"
        class="dashboard-date-field h-12 w-full rounded-[8px] border border-[#EFF0F6] bg-white px-4 pr-12 text-[15px] font-normal leading-[20px] text-black/70 shadow-none transition-all focus:border-brand-500/50 focus:outline-none xl:h-[60px] xl:px-5 xl:pr-[54px] xl:text-[20px] xl:leading-[28px] xl:tracking-tight"
      />

      <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black xl:right-5">
        <DashboardIcon :name="type === 'date' ? 'calendar' : icon" :size="20" :stroke-width="1.8" />
      </span>
    </span>
  </label>
</template>
