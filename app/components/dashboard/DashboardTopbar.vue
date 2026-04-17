<script setup lang="ts">
import DashboardIcon from './shared/DashboardIcon.vue'

const menuAsset = '/figma-assets/topbar-menu-barmm.png'
const logoAsset = '/figma-assets/topbar-logo-barmm.png'
const avatarAsset = '/figma-assets/topbar-avatar-barmm.png'
</script>

<template>
  <header
    class="-mx-4 -mt-6 border-b border-black/10 bg-white sm:-mx-6 sm:-mt-8 lg:-mx-8 lg:-mt-10 xl:-mx-[var(--app-shell-gutter)]"
  >
    <div class="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-[40px]">
      <div class="flex min-w-0 items-center gap-4 lg:gap-6">
        <button
          type="button"
          aria-label="Open navigation"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <img :src="menuAsset" alt="" class="h-4 w-5 object-contain" />
        </button>

        <span class="h-8 w-px bg-gray-200" aria-hidden="true" />

        <img :src="logoAsset" alt="LeAPS" class="h-10 w-auto min-w-[140px] object-contain object-left" />
      </div>

      <div class="flex items-center gap-4 xl:gap-8">
        <label class="relative hidden lg:block">
          <input
            type="search"
            placeholder="Search dashboard..."
            class="h-10 w-[300px] rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-[14px] font-normal text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-500/50 focus:outline-none transition-all"
          />
          <span class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-400">
            <DashboardIcon name="search" :size="16" :stroke-width="2" />
          </span>
        </label>

        <div class="flex items-center gap-3">
          <div class="hidden text-right sm:block">
            <p class="text-[11px] font-semibold tracking-wider uppercase text-success-500">
              Welcome
            </p>
            <p class="mt-0.5 text-[14px] font-bold text-gray-900">
              Atty. Sha Elijah Dumama-Alba
            </p>
          </div>

          <div class="relative">
            <img :src="avatarAsset" alt="Atty. Sha Elijah Dumama-Alba" class="h-10 w-10 rounded-full border-2 border-white shadow-sm object-cover" />
            <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-success-500"></span>
          </div>

          <button class="hidden text-gray-400 hover:text-gray-900 sm:inline-flex transition-colors" aria-label="Account options">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
