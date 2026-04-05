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
  <label class="block space-y-2.5 xl:space-y-[4.76px]">
    <span class="text-[15px] font-medium leading-[20px] text-[rgba(0,0,0,0.7)] xl:text-[21.3334px] xl:leading-[27px] xl:tracking-[-0.400001px]">
      {{ label }}
    </span>

    <span class="relative block">
      <select
        v-if="type === 'select'"
        v-model="model"
        class="dashboard-field-select h-14 w-full appearance-none rounded-[5px] border border-[#EFF0F6] bg-white px-4 pr-12 text-[15px] font-normal leading-[20px] text-[rgba(0,0,0,0.7)] shadow-none transition-colors focus:border-[rgba(56,153,250,0.42)] focus:outline-none xl:h-[64.96px] xl:px-[19.99px] xl:pr-[54px] xl:text-[21.3334px] xl:leading-[27px] xl:tracking-[-0.400001px]"
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
        class="dashboard-date-field h-14 w-full rounded-[5px] border border-[#EFF0F6] bg-white px-4 pr-12 text-[15px] font-normal leading-[20px] text-[rgba(0,0,0,0.7)] shadow-none transition-colors focus:border-[rgba(56,153,250,0.42)] focus:outline-none xl:h-[64.96px] xl:px-[19.99px] xl:pr-[54px] xl:text-[21.3334px] xl:leading-[27px] xl:tracking-[-0.400001px]"
      />

      <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black xl:right-[19px]">
        <DashboardIcon :name="type === 'date' ? 'calendar' : icon" :size="18" :stroke-width="1.8" />
      </span>
    </span>
  </label>
</template>
