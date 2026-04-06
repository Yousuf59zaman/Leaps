<script setup lang="ts">
import type { OfficeEfficiencyRow, TablePanelData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'

const props = defineProps<{
  data: TablePanelData<OfficeEfficiencyRow>
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <div class="min-w-[860px] overflow-hidden rounded-[8px] border border-[#DEE2E7]">
      <div
        class="grid h-[53.33px] items-center bg-[#F3F5F7] px-4 text-[16px] font-semibold uppercase leading-[21px] text-[#8D97A5] grid-cols-[20.43%_17.97%_20.63%_20.6%_20.43%] xl:px-0"
      >
        <div class="pl-8">Office Name</div>
        <div class="pr-[33px] text-right">Total Tokens</div>
        <div class="pr-[33px] text-right">Avg Service Time</div>
        <div class="pr-[32.67px] text-right">Avg Waiting Time</div>
        <div class="text-center">Status</div>
      </div>

      <div
        v-for="row in data.rows"
        :key="row.officeName"
        class="grid min-h-[72.67px] items-center border-b border-[#DEE2E7] px-4 text-[#15191E] last:border-b-0 grid-cols-[20.43%_17.97%_20.63%_20.6%_20.43%] xl:px-0"
      >
        <div class="pl-8 text-[18.6667px] font-medium leading-[27px]">
          {{ row.officeName }}
        </div>
        <div class="pr-[33px] text-right text-[18.6667px] font-normal leading-[27px]">
          {{ formatCount(row.totalTokens) }}
        </div>
        <div class="pr-[33px] text-right text-[18.6667px] font-medium leading-[27px]">
          {{ row.averageServiceTime }}
        </div>
        <div class="pr-[32.67px] text-right text-[18.6667px] font-medium leading-[27px]">
          {{ row.averageWaitingTime }}
        </div>
        <div class="text-center text-[16px] font-semibold leading-[21px]">
          {{ row.status }}
        </div>
      </div>
    </div>
  </div>
</template>
