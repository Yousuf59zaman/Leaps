<script setup lang="ts">
import DashboardIcon from './shared/DashboardIcon.vue'
</script>

<template>
  <header class="rounded-[var(--radius-panel)] border border-[color:rgba(15,37,82,0.04)] bg-white/90 px-5 py-4 shadow-[var(--shadow-card)] backdrop-blur sm:px-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
          Analytics Overview
        </p>
        <h1 class="mt-2 text-[length:var(--text-dashboard-title)] leading-[var(--text-dashboard-title--line-height)] tracking-[-0.03em] text-[color:var(--color-brand-700)]">
          LeAPS Dashboard
        </h1>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label class="relative block min-w-[18rem] max-w-full">
          <input
            type="search"
            placeholder="Search"
            class="h-11 w-full rounded-full border border-[color:var(--app-surface-border)] bg-[var(--color-surface-muted)] pl-11 pr-4 text-sm text-[color:var(--color-text-strong)] shadow-[var(--shadow-card)]"
          />
          <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[color:var(--color-text-muted)]">
            <DashboardIcon name="search" :size="16" />
          </span>
        </label>

        <div class="flex items-center gap-3 rounded-full border border-[color:var(--app-surface-border)] bg-[var(--color-surface-muted)] px-4 py-2.5 shadow-[var(--shadow-card)]">
          <div class="text-right">
            <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-success-500)]">
              Welcome
            </p>
            <p class="text-sm font-semibold text-[color:var(--color-brand-700)]">
              Atty. Sha Eajith Duma-Alba
            </p>
          </div>
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-500),#7ec2ff)] text-sm font-semibold text-white">
            SA
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
