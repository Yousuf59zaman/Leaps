<script setup lang="ts">
import { computed } from 'vue'
import type { PaymentInformationRow, TableColumn, TablePanelData } from '../../../../types'
import { formatCurrency } from '../../../utils/dashboard-formatters'
import DashboardIcon from '../shared/DashboardIcon.vue'

type PaymentColumn = TableColumn<PaymentInformationRow> & {
  currency?: boolean
}

const props = defineProps<{
  data: TablePanelData<PaymentInformationRow>
}>()

const columns = computed<PaymentColumn[]>(() =>
  props.data.columns.map((column) => ({
    ...column,
    currency: column.key === 'receivable_amount' || column.key === 'received_amount'
  }))
)

function getCellValue(row: PaymentInformationRow, key: string) {
  const record = row as unknown as Record<string, string | number>

  if (key in record) {
    return record[key]
  }

  const camelKey = key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())

  return record[camelKey]
}

function formatCellValue(column: PaymentColumn, value: string | number | undefined) {
  if (value === undefined) {
    return ''
  }

  if (column.currency) {
    return formatCurrency(Number(value))
  }

  return value
}

function alignClass(align?: PaymentColumn['align']) {
  if (align === 'right') {
    return 'text-right'
  }

  if (align === 'center') {
    return 'text-center'
  }

  return 'text-left'
}
</script>

<template>
  <article
    class="relative w-full rounded-[19px] bg-white px-5 py-6 shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] sm:px-7 lg:px-[31.81px] lg:pb-[31.8px] lg:pt-[24.81px]"
  >
    <span class="absolute left-0 top-[24.81px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <header class="mb-5 flex items-center gap-[10px] sm:pl-2 lg:mb-[25.8px]">
      <DashboardIcon :name="data.icon || 'building-2'" :size="27" class="text-[#3899FA]" />
      <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
        {{ data.title }}
      </h2>
    </header>

    <div class="overflow-hidden rounded-[7.63333px] border border-[#DEE1E6] bg-white">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1160px] border-separate border-spacing-0">
          <colgroup>
            <col style="width: 5.73%" />
            <col style="width: 46.94%" />
            <col style="width: 24.6%" />
            <col style="width: 22.73%" />
          </colgroup>

          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="border-b border-[#DEE2E7] bg-[#F3F5F7] px-[20.36px] py-[17px] text-[16px] font-medium uppercase leading-[25px] text-[#565D6D]"
                :class="alignClass(column.align)"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in data.rows" :key="row.serial">
              <td
                v-for="column in columns"
                :key="`${row.serial}-${column.key}`"
                class="border-b border-[#DEE2E7] px-[20.36px] py-[21px] text-[18.67px] font-medium leading-[25px] text-[#15191E]"
                :class="[alignClass(column.align), column.key === 'serial' ? 'text-[#565D6D]' : '']"
              >
                {{ formatCellValue(column, getCellValue(row, column.key)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>
