<script setup lang="ts">

const logoAsset = '/figma-assets/topbar-logo-barmm.png'
const avatarAsset = '/figma-assets/topbar-avatar-barmm.png'
const isProfileMenuOpen = ref(false)
</script>

<template>
  <header
    class="-mx-4 -mt-6 border-b border-black/10 bg-white sm:-mx-6 sm:-mt-8 lg:-mx-8 lg:-mt-10 xl:-mx-[var(--app-shell-gutter)]">
    <div class="flex min-h-[74px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-[34px]">
      <div class="flex min-w-0 items-center">
        <img :src="logoAsset" alt="LeAPS" class="h-12 w-[164px] min-w-[164px] object-contain object-left" />
      </div>

      <div class="relative">
        <button type="button"
          class="flex items-center gap-2.5 rounded-[12px] px-2 py-1 text-left transition-colors hover:bg-[#F8FAFC]"
          :aria-expanded="isProfileMenuOpen" aria-haspopup="menu" @click="isProfileMenuOpen = !isProfileMenuOpen">
          <div class="hidden text-right sm:block">
            <p class="text-[11px] font-semibold tracking-wider uppercase text-success-500">
              Welcome
            </p>
            <p class="mt-0.5 text-[14px] font-bold text-gray-900">
              Atty. Sha Elijah Dumama-Alba
            </p>
          </div>

          <div class="relative">
            <img :src="avatarAsset" alt="Atty. Sha Elijah Dumama-Alba"
              class="h-10 w-10 rounded-full border-2 border-white shadow-sm object-cover" />
            <span
              class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-success-500"></span>
          </div>

          <button class="hidden text-gray-400 hover:text-gray-900 sm:inline-flex transition-colors"
            aria-label="Account options">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>

          <div v-if="isProfileMenuOpen"
            class="absolute right-0 top-[calc(100%+10px)] z-[1200] w-[184px] overflow-hidden rounded-[12px] border border-[#DEE2E7] bg-white py-2 shadow-[0_18px_42px_rgba(15,37,82,0.14)]"
            role="menu">
            <button type="button"
              class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium leading-5 text-[#15191E] transition-colors hover:bg-[#F8FAFC]"
              role="menuitem" @click="isProfileMenuOpen = false">
              <DashboardIcon name="user-round" :size="17" />
              <span>Profile</span>
            </button>
            <button type="button"
              class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium leading-5 text-[#EF4343] transition-colors hover:bg-[#FFF4F4]"
              role="menuitem" @click="isProfileMenuOpen = false">
              <DashboardIcon name="log-out" :size="17" />
              <span>Logout</span>
            </button>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>
