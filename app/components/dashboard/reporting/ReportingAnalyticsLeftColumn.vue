<script setup lang="ts">
import type { DashboardPageData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'
import ReportingDonutCard from './ReportingDonutCard.vue'

defineProps<{
  demographic: DashboardPageData['reportingAnalytics']['demographic']
  vulnerability: DashboardPageData['reportingAnalytics']['vulnerability']
}>()
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-[#F3F5F7] shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)]">
    <span class="absolute left-0 top-[30.77px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <header class="border-b border-[#DEE1E6] bg-[#F8F9FA] px-6 py-6 xl:px-[29px] xl:pb-[30px] xl:pt-[31px]">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-[10px]">
          <DashboardIcon :name="demographic.icon || 'building-2'" :size="27" class="text-[#3899FA]" />
          <h3 class="text-[24px] font-semibold leading-[37px] text-[#15191E]">
            {{ demographic.title }}
          </h3>
        </div>

        <button type="button" class="inline-flex h-6 w-6 items-center justify-center text-[#565D6D]">
          <DashboardIcon :name="demographic.actions?.[0]?.icon || 'download'" :size="20" />
        </button>
      </div>
    </header>

    <div class="grid gap-[26px] px-[26px] py-[29px]">
      <ReportingDonutCard :data="demographic" variant="demographic" />
      <ReportingDonutCard :data="vulnerability" variant="vulnerability" />
    </div>
  </article>
</template>
