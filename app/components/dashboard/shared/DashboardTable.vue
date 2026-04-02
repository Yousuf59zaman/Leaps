<script setup lang="ts">
import type { TableColumn } from '../../../../types'

type TableRow = Record<string, unknown>

withDefaults(
  defineProps<{
    columns: TableColumn<TableRow>[]
    rows: TableRow[]
    rowKey?: string
    compact?: boolean
  }>(),
  {
    rowKey: 'id',
    compact: false
  }
)

function resolveValue(row: TableRow, key: TableColumn<TableRow>['key']) {
  return row[key as string]
}

function resolveRowKey(row: TableRow, index: number, rowKey: string) {
  return String(row[rowKey] ?? `${rowKey}-${index}`)
}

function formatCell(column: TableColumn<TableRow>, row: TableRow, index: number) {
  const value = resolveValue(row, column.key)

  if (column.formatter) {
    return column.formatter(value, row, index)
  }

  if (value === null || value === undefined || value === '') {
    return '—'
  }

  return String(value)
}

function alignClass(align?: TableColumn<TableRow>['align']) {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
}

function slotName(key: TableColumn<TableRow>['key']) {
  return `cell-${String(key)}`
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="String(column.key)"
            class="border-b border-[color:var(--app-surface-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--color-text-muted)]"
            :class="alignClass(column.align)"
            :style="{ width: column.width }"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="resolveRowKey(row, rowIndex, rowKey)">
          <td
            v-for="column in columns"
            :key="`${resolveRowKey(row, rowIndex, rowKey)}-${String(column.key)}`"
            class="border-b border-[color:rgba(15,37,82,0.06)] px-4"
            :class="[alignClass(column.align), compact ? 'py-3 text-sm' : 'py-4 text-sm']"
          >
            <slot
              :name="slotName(column.key)"
              :row="row"
              :value="resolveValue(row, column.key)"
              :column="column"
              :index="rowIndex"
            >
              <span
                :class="column.emphasize ? 'font-semibold text-[color:var(--color-text-strong)]' : 'text-[color:var(--color-text-muted)]'"
              >
                {{ formatCell(column, row, rowIndex) }}
              </span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
