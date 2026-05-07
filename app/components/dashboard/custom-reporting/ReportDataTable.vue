<script setup lang="ts">
type TableAlign = 'left' | 'center' | 'right'
type TableCellType = 'text' | 'number' | 'rate' | 'status'

interface ReportTableColumn {
  key: string
  label: string
  align?: TableAlign
  width?: string
  sortable?: boolean
  emphasize?: boolean
  type?: TableCellType
}

type ReportTableRow = Record<string, number | string | null | undefined>

const props = withDefaults(
  defineProps<{
    columns: ReportTableColumn[]
    rows: ReportTableRow[]
    footer?: ReportTableRow | null
    rowKey?: string
    minWidth?: string
  }>(),
  {
    footer: null,
    rowKey: 'id',
    minWidth: '980px'
  }
)

function alignClass(align?: TableAlign) {
  if (align === 'right') {
    return 'text-right'
  }

  if (align === 'center') {
    return 'text-center'
  }

  return 'text-left'
}

function getValue(row: ReportTableRow, key: string) {
  return row[key]
}

function resolveRowKey(row: ReportTableRow, index: number) {
  return String(row[props.rowKey] ?? `${props.rowKey}-${index}`)
}

function formatValue(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return value
}

function rateValue(row: ReportTableRow, key: string) {
  const value = row[key]

  if (typeof value === 'number') {
    return value
  }

  return Number(value) || 0
}

function statusClass(value: number | string | null | undefined) {
  const status = String(value ?? '').toLowerCase()

  if (status.includes('completed') || status.includes('approved') || status.includes('verified') || status.includes('optimal')) {
    return 'bg-[rgba(29,201,115,0.1)] text-[#1B8F53]'
  }

  if (status.includes('rejected') || status.includes('failed')) {
    return 'bg-[rgba(239,67,67,0.1)] text-[#D93636]'
  }

  if (status.includes('pending') || status.includes('review') || status.includes('progress')) {
    return 'bg-[rgba(252,177,29,0.14)] text-[#A96D00]'
  }

  return 'bg-[#F3F5F7] text-[#565D6D]'
}
</script>

<template>
  <div class="overflow-hidden rounded-[12.1837px] border border-[#EFF0F6] bg-white">
    <div class="overflow-x-auto">
      <table class="w-full border-separate border-spacing-0" :style="{ minWidth }">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="bg-[#F9FAFB] px-[17.0571px] py-[12.1837px] text-[12.1837px] font-semibold uppercase leading-[15px] tracking-[0.609183px] text-[#8D97A5]"
              :class="alignClass(column.align)"
              :style="{ width: column.width }"
            >
              <span class="inline-flex items-center gap-[3.66px]" :class="column.align === 'right' ? 'justify-end' : ''">
                {{ column.label }}
                <span v-if="column.sortable" class="text-[10.9653px] opacity-35" aria-hidden="true">⇅</span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="resolveRowKey(row, rowIndex)">
            <td
              v-for="column in columns"
              :key="`${resolveRowKey(row, rowIndex)}-${column.key}`"
              class="border-b border-[#EFF0F6] px-[17.0571px] py-[12.7929px] text-[14.6204px] leading-[18px] text-[#15191E]"
              :class="[alignClass(column.align), column.emphasize ? 'font-bold text-[#3899FA]' : column.type === 'number' ? 'font-medium' : 'font-normal']"
            >
              <ReportRateBar
                v-if="column.type === 'rate'"
                :value="rateValue(row, column.key)"
                :color="rateValue(row, column.key) >= 90 ? '#1DC973' : '#3899FA'"
              />
              <span
                v-else-if="column.type === 'status'"
                class="inline-flex rounded-[999px] px-2.5 py-1 text-[12px] font-semibold leading-4"
                :class="statusClass(getValue(row, column.key))"
              >
                {{ formatValue(getValue(row, column.key)) }}
              </span>
              <span v-else>{{ formatValue(getValue(row, column.key)) }}</span>
            </td>
          </tr>
        </tbody>

        <tfoot v-if="footer">
          <tr class="bg-[#F9FAFB]">
            <td
              v-for="column in columns"
              :key="`footer-${column.key}`"
              class="border-t-[2.43673px] border-[#DEE2E7] px-[17.0571px] py-[10.9653px] text-[14.6204px] leading-[18px] text-black"
              :class="[alignClass(column.align), column.emphasize ? 'font-bold text-[#3899FA]' : 'font-semibold']"
            >
              <ReportRateBar
                v-if="column.type === 'rate'"
                :value="rateValue(footer, column.key)"
                color="#1DC973"
              />
              <span v-else>{{ formatValue(getValue(footer, column.key)) }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
