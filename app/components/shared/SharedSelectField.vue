<script setup lang="ts">
interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

type SharedSelectFieldVariant = 'dashboard-filter' | 'report-panel'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string | null
    options: SelectOption[]
    placeholder?: string
    placeholderDisabled?: boolean
    variant?: SharedSelectFieldVariant
    disabled?: boolean
  }>(),
  {
    placeholder: 'Choose One',
    placeholderDisabled: false,
    variant: 'dashboard-filter',
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const model = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value || null)
})

const variantClasses: Record<SharedSelectFieldVariant, {
  label: string
  labelText: string
  controlWrap: string
  control: string
  icon: string
}> = {
  'dashboard-filter': {
    label: 'block space-y-2.5 xl:space-y-[4.76px]',
    labelText: 'text-[15px] font-medium leading-[20px] text-[rgba(0,0,0,0.7)] xl:text-[21.3334px] xl:leading-[27px] xl:tracking-[-0.400001px]',
    controlWrap: 'relative block',
    control: 'h-14 w-full appearance-none rounded-[5px] border border-[#EFF0F6] bg-white px-4 pr-12 text-[15px] font-normal leading-[20px] text-[rgba(0,0,0,0.7)] shadow-none transition-colors focus:border-[rgba(56,153,250,0.42)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 xl:h-[64.96px] xl:px-[19.99px] xl:pr-[54px] xl:text-[21.3334px] xl:leading-[27px] xl:tracking-[-0.400001px]',
    icon: 'pointer-events-none absolute inset-y-0 right-4 flex items-center text-black xl:right-[19px]'
  },
  'report-panel': {
    label: 'block',
    labelText: 'mb-3 block text-[16px] font-semibold uppercase leading-[21px] tracking-[0.8px] text-[#8D97A5]',
    controlWrap: 'relative block',
    control: 'h-[53.33px] w-full appearance-none rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] px-[21px] pr-14 text-[18px] font-normal leading-[27px] text-[rgba(0,0,0,0.7)] outline-none transition-colors focus:border-[rgba(56,153,250,0.45)] disabled:cursor-not-allowed disabled:opacity-70 xl:text-[21.3334px] xl:tracking-[-0.400001px]',
    icon: 'pointer-events-none absolute inset-y-0 right-[18px] flex items-center text-black'
  }
}

const classes = computed(() => variantClasses[props.variant])
</script>

<template>
  <label :class="classes.label">
    <span :class="classes.labelText">
      {{ label }}
    </span>

    <span :class="classes.controlWrap">
      <select
        v-model="model"
        class="dashboard-field-select"
        :class="classes.control"
        :disabled="disabled"
      >
        <option value="" :disabled="placeholderDisabled">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <span :class="classes.icon">
        <DashboardIcon name="chevron" :size="18" :stroke-width="1.8" />
      </span>
    </span>
  </label>
</template>
