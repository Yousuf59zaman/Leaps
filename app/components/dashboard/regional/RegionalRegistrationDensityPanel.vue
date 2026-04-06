<script setup lang="ts">
import { ref } from 'vue'
import type { RegionTooltipData, RegionalRegistrationDensityData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'
import BarmmLeafletMap from './BarmmLeafletMap.vue'
import MapDensityLegend from './MapDensityLegend.vue'
import RegionTooltipCard from './RegionTooltipCard.vue'

defineProps<{
  data: RegionalRegistrationDensityData
}>()

const activeProvince = ref<RegionTooltipData | null>(null)
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] min-[1400px]:h-[881px]">
    <span class="absolute left-0 top-[26px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="flex flex-col gap-3 px-5 pt-7 sm:px-6 lg:px-[33px] lg:pt-[26px] min-[560px]:flex-row min-[560px]:items-start min-[560px]:justify-between">
      <div class="flex items-start gap-3">
        <DashboardIcon :name="data.icon || 'map'" :size="27" class="mt-[6px] text-[#3899FA]" />

        <div>
          <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
            {{ data.title }}
          </h2>
          <p class="text-[15px] font-normal leading-[22px] text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]">
            {{ data.subtitle }}
          </p>
        </div>
      </div>

      <span class="inline-flex h-[29.33px] items-center rounded-[13.3333px] bg-[#F3F5F7] px-[13.33px] text-[16px] font-semibold leading-[21px] text-[#1C2027]">
        {{ data.badgeLabel }}
      </span>
    </div>

    <div
      class="mx-4 mt-6 overflow-hidden rounded-[17.6993px] bg-[rgba(243,245,247,0.5)] sm:mx-6 sm:mt-8 lg:mx-[38px] lg:mt-[65px] min-h-[460px] sm:min-h-[560px] lg:min-h-[620px] min-[1400px]:h-[677px]"
    >
      <div class="relative min-h-[460px] w-full sm:min-h-[560px] lg:min-h-[620px] min-[1400px]:h-[677px]">
        <div
          class="absolute inset-0"
          style="background: radial-gradient(70.42% 70.42% at 50% 50%, rgba(56, 153, 250, 0.05) 0%, #F9FAFB 50%, #DFEFFF 100%);"
        />

        <ClientOnly>
          <div class="absolute inset-x-[3%] inset-y-[0.2%] overflow-hidden rounded-[24px]">
            <BarmmLeafletMap @hover="activeProvince = $event" @leave="activeProvince = null" />
          </div>

          <template #fallback>
            <div class="absolute inset-x-[3%] inset-y-[0.2%] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_center,rgba(56,153,250,0.16),rgba(255,255,255,0.96)_68%)]" />
          </template>
        </ClientOnly>

        <div
          v-if="activeProvince"
          class="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] sm:left-6 sm:top-6 sm:max-w-[323.65px] lg:left-[42px] lg:top-[40px]"
        >
          <RegionTooltipCard :data="activeProvince" />
        </div>

        <div class="absolute bottom-4 left-4 right-4 flex justify-center sm:left-auto sm:right-[16px] sm:justify-end lg:bottom-[30px]">
          <MapDensityLegend :items="data.legend" />
        </div>
      </div>
    </div>
  </article>
</template>
