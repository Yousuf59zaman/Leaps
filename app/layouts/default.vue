<template>
  <div class="relative min-h-screen overflow-hidden bg-[var(--color-app-bg)] text-[color:var(--color-text-strong)]">
    <div class="relative mx-auto flex min-h-screen w-full max-w-[var(--app-shell-max-width)] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-[var(--app-shell-gutter)]">
      <slot />
    </div>
  </div>
</template>
