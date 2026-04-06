<script setup lang="ts">
import type { PanelAction } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'

type ReportingColumn = {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  emphasize?: boolean
}

type ReportingRow = Record<string, string | number>

const props = defineProps<{
  title: string
  icon?: string
  actions?: PanelAction[]
  columns: ReportingColumn[]
  rows: ReportingRow[]
  variant: 'age' | 'vulnerability'
}>()

const templateClass = props.variant === 'age'
  ? 'grid-cols-[81px_minmax(235px,1fr)_119px_149px_223px_122px]'
  : 'grid-cols-[82px_minmax(190px,1fr)_123px_151px_175px_208px]'

function getCellValue(row: ReportingRow, key: string) {
  if (key in row) {
    return row[key]
  }

  const camelKey = key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())

  return row[camelKey]
}

function cellClass(column: ReportingColumn) {
  if (column.align === 'right') {
    return 'text-right'
  }

  if (column.align === 'center') {
    return 'text-center'
  }

  return 'text-left'
}

function isEmphasizedCell(column: ReportingColumn) {
  return props.variant === 'vulnerability' && column.emphasize
}
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)]">
    <span class="absolute left-0 top-[30px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <header class="border-b border-[#DEE1E6] bg-[#F8F9FA] px-6 py-6 xl:px-[29px] xl:pb-[30px] xl:pt-[31px]">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-[10px]">
          <DashboardIcon :name="icon || 'building-2'" :size="27" class="text-[#3899FA]" />
          <h3 class="text-[24px] font-semibold leading-[37px] text-[#15191E]">
            {{ title }}
          </h3>
        </div>

        <div class="flex items-center gap-[14px]">
          <button
            v-for="action in actions"
            :key="action.id"
            type="button"
            class="inline-flex h-6 w-6 items-center justify-center text-[#565D6D]"
          >
            <DashboardIcon :name="action.icon || 'file-text'" :size="19" />
          </button>
        </div>
      </div>
    </header>

    <div class="overflow-x-auto rounded-b-[19px]">
      <div class="min-w-[980px]">
        <div class="grid min-h-[48px] items-center bg-[#F3F5F7]" :class="templateClass">
          <div
            v-for="column in columns"
            :key="column.key"
            class="px-4 text-[16px] font-medium uppercase leading-[21px] text-[#8D97A5] xl:px-[20px]"
            :class="cellClass(column)"
          >
            {{ column.label }}
          </div>
        </div>

        <div
          v-for="(row, rowIndex) in rows"
          :key="`${variant}-${rowIndex}`"
          class="grid min-h-[67px] items-center border-b border-[#DEE1E6] last:border-b-0"
          :class="templateClass"
        >
          <div
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-[14px] text-[18.67px] leading-[25px] text-[#171A1F] xl:px-[20px]"
            :class="[
              cellClass(column),
              isEmphasizedCell(column) ? 'font-bold' : 'font-normal',
              column.key === 'serial' ? 'text-[#565D6D]' : ''
            ]"
          >
            {{ getCellValue(row, column.key) }}
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
