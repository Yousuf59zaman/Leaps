<script setup lang="ts">
import { ref } from 'vue'
import DashboardIcon from './shared/DashboardIcon.vue'

const logoAsset = '/figma-assets/topbar-logo-barmm.png'
const avatarAsset = '/figma-assets/topbar-avatar-barmm.png'
const isProfileMenuOpen = ref(false)
</script>

<template>
  <header
    class="-mx-4 -mt-6 border-b border-black/15 bg-white sm:-mx-6 sm:-mt-8 lg:-mx-8 lg:-mt-10 xl:-mx-[var(--app-shell-gutter)]"
  >
    <div class="flex min-h-[74px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-[34px]">
      <div class="flex min-w-0 items-center">
        <img :src="logoAsset" alt="LeAPS" class="h-12 w-[164px] min-w-[164px] object-contain object-left" />
      </div>

      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-2.5 rounded-[12px] px-2 py-1 text-left transition-colors hover:bg-[#F8FAFC]"
          :aria-expanded="isProfileMenuOpen"
          aria-haspopup="menu"
          @click="isProfileMenuOpen = !isProfileMenuOpen"
        >
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
        </button>

        <div
          v-if="isProfileMenuOpen"
          class="absolute right-0 top-[calc(100%+10px)] z-[1200] w-[184px] overflow-hidden rounded-[12px] border border-[#DEE2E7] bg-white py-2 shadow-[0_18px_42px_rgba(15,37,82,0.14)]"
          role="menu"
        >
          <button
            type="button"
            class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium leading-5 text-[#15191E] transition-colors hover:bg-[#F8FAFC]"
            role="menuitem"
            @click="isProfileMenuOpen = false"
          >
            <DashboardIcon name="user-round" :size="17" />
            <span>Profile</span>
          </button>
          <button
            type="button"
            class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium leading-5 text-[#EF4343] transition-colors hover:bg-[#FFF4F4]"
            role="menuitem"
            @click="isProfileMenuOpen = false"
          >
            <DashboardIcon name="log-out" :size="17" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
