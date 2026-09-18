<script setup lang="ts">
import { Mail } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="fixed bottom-0 left-0 right-0 z-40 bg-base-950/85 backdrop-blur-xl border-t border-white/10 py-2 px-4 sm:px-8 transition-all duration-500 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]"
  >
    <!-- Vermilion Hairline Accent -->
    <div
      class="absolute top-0 right-0 left-0 md:left-28 lg:left-32 h-[1px] bg-vermilion-500/40"
    />

    <div class="max-w-6xl mx-auto flex items-center justify-between gap-4 md:pl-28 lg:pl-32">
      <!-- Left: Hanko Seal & Copyright -->
      <div class="flex items-center gap-2.5">
        <span class="hanko-stamp text-[0.6rem] !py-0.5 !px-1.5 font-serif">RP</span>
        <span class="text-xs text-base-400 font-serif">
          &copy; {{ currentYear }} Rustom Pedales Jr.
        </span>
      </div>

      <!-- Right: Quick Contact -->
      <div class="flex items-center gap-4 text-xs font-body text-base-400">
        <a
          href="mailto:pedales.rustom@gmail.com"
          class="inline-flex items-center gap-1.5 text-base-300 hover:text-white transition-colors"
          title="pedales.rustom@gmail.com"
        >
          <Mail :size="13" class="text-vermilion-500" />
          <span class="hidden sm:inline text-xs">pedales.rustom@gmail.com</span>
          <span class="sm:hidden text-xs">Email</span>
        </a>
      </div>
    </div>
  </footer>
</template>