<template>
  <div class="relative min-h-screen overflow-hidden bg-[var(--color-app-bg)] text-[color:var(--color-text-strong)]">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(76,150,255,0.12)_0%,_rgba(76,150,255,0)_72%)]" />
      <div class="absolute right-[6%] top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(49,201,122,0.10)_0%,_rgba(49,201,122,0)_70%)] blur-2xl" />
      <div class="absolute bottom-[-8rem] left-[-4rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(244,181,72,0.08)_0%,_rgba(244,181,72,0)_72%)] blur-2xl" />
    </div>

    <div class="relative mx-auto flex min-h-screen w-full max-w-[var(--app-shell-max-width)] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-[var(--app-shell-gutter)]">
      <slot />
    </div>
  </div>
</template>
