<script setup lang="ts">
import DashboardIcon from './shared/DashboardIcon.vue'

const menuAsset = '/figma-assets/topbar-menu.png'
const logoAsset = '/figma-assets/topbar-logo.png'
const avatarAsset = '/figma-assets/topbar-avatar.png'
</script>

<template>
  <header
    class="-mx-4 -mt-6 border-b border-black/15 bg-white sm:-mx-6 sm:-mt-8 lg:-mx-8 lg:-mt-10 xl:-mx-[var(--app-shell-gutter)]"
  >
    <div class="flex min-h-[74px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-[37px]">
      <div class="flex min-w-0 items-center gap-[14px]">
        <button
          type="button"
          aria-label="Open navigation"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md"
        >
          <img :src="menuAsset" alt="" class="h-[14.63px] w-[17.56px] object-contain" />
        </button>

        <span class="h-[38px] w-px bg-[#cacaca]" aria-hidden="true" />

        <img :src="logoAsset" alt="LeAPS" class="h-12 w-[164px] min-w-[164px] object-contain object-left" />
      </div>

      <div class="flex items-center gap-3 xl:gap-7">
        <label class="relative hidden lg:block">
          <input
            type="search"
            placeholder="Search"
            class="h-[28.3px] w-[288.95px] rounded-[16.29px] border border-[#d5d5d5] bg-[#f5f6fa] pl-[32px] pr-3 text-[10.29px] font-light text-[#202224] placeholder:text-[#202224]/50"
          />
          <span class="pointer-events-none absolute inset-y-0 left-[12px] flex items-center text-[#202224]/55">
            <DashboardIcon name="search" :size="11" :stroke-width="1.7" />
          </span>
        </label>

        <div class="flex items-center gap-2.5">
          <div class="hidden text-right sm:block">
            <p class="text-[11px] leading-[1.17] font-light text-[#13aa13]">
              Welcome
            </p>
            <p class="mt-[1px] text-[13px] leading-[1.17] font-normal text-[#202224]">
              Atty. Sha Elijah Dumama-Alba
            </p>
          </div>

          <img :src="avatarAsset" alt="Atty. Sha Elijah Dumama-Alba" class="h-[34px] w-[34px] rounded-full object-cover" />

          <span class="hidden text-[#8d97a5] sm:inline-flex" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
