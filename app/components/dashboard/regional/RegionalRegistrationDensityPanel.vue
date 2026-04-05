<script setup lang="ts">
import type { RegionalRegistrationDensityData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'
import MapDensityLegend from './MapDensityLegend.vue'
import RegionTooltipCard from './RegionTooltipCard.vue'

defineProps<{
  data: RegionalRegistrationDensityData
}>()

const densityMapImage = '/figma-assets/regional-density-map.png'
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] xl:h-[881px]">
    <span class="absolute left-0 top-[26px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="flex items-start justify-between gap-4 px-5 pt-7 sm:px-6 lg:px-[33px] lg:pt-[26px]">
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

    <div class="mx-5 mt-12 overflow-hidden rounded-b-[17.6993px] bg-[rgba(243,245,247,0.5)] sm:mx-6 lg:mx-[38px] lg:mt-[65px] xl:h-[677px]">
      <div class="relative h-full w-full">
        <div
          class="absolute inset-0"
          style="background: radial-gradient(70.42% 70.42% at 50% 50%, rgba(56, 153, 250, 0.05) 0%, #F9FAFB 50%, #DFEFFF 100%);"
        />

        <div class="absolute inset-x-[3%] inset-y-[0.2%] opacity-80">
          <img
            :src="densityMapImage"
            alt="Philippines registration density map"
            class="absolute left-1/2 top-1/2 w-[76.47%] max-w-[749.67px] -translate-x-1/2 -translate-y-1/2 opacity-40"
          />
        </div>

        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <RegionTooltipCard :data="data.highlightedRegion" />
        </div>

        <div class="absolute bottom-[30px] right-[16px]">
          <MapDensityLegend :items="data.legend" />
        </div>
      </div>
    </div>
  </article>
</template>
