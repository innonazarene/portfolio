<script setup lang="ts">
import { Mail, MapPin, Terminal, ArrowUpRight } from 'lucide-vue-next'

const quickLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-accent-400/[0.06] pt-16 pb-10 px-6">
    <!-- neon top border glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" />

    <div class="max-w-6xl mx-auto">
      <div class="grid sm:grid-cols-3 gap-12 mb-14">
        <!-- brand col -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <Terminal :size="15" class="text-accent-400 opacity-60" />
            <span class="text-base-50 font-mono text-sm font-semibold">
              @inonazarene<span class="text-accent-400">_</span>
            </span>
          </div>
          <p class="text-base-500 text-xs leading-relaxed max-w-xs font-mono">
            <span class="text-accent-400/40">&gt; </span>
            Full-stack developer crafting elegant digital experiences. Available for freelance work.
          </p>
        </div>

        <!-- quick links -->
        <div>
          <h4 class="text-base-200 text-[0.65rem] font-mono uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <span class="text-accent-400/40">//</span>
            Quick Links
          </h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in quickLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="group flex items-center gap-2 text-base-400 hover:text-accent-400 text-xs font-mono transition-colors duration-200"
              >
                <ArrowUpRight :size="11" class="opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- contact col -->
        <div>
          <h4 class="text-base-200 text-[0.65rem] font-mono uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <span class="text-accent-400/40">//</span>
            Get In Touch
          </h4>
          <ul class="flex flex-col gap-3">
            <li class="flex items-center gap-2.5">
              <Mail :size="13" class="text-accent-400/40 shrink-0" />
              <a
                href="mailto:pedales.rustom@gmail.com"
                class="text-base-400 hover:text-accent-400 text-xs font-mono transition-colors"
              >
                pedales.rustom@gmail.com
              </a>
            </li>
            <li class="flex items-start gap-2.5">
              <MapPin :size="13" class="text-accent-400/40 mt-0.5 shrink-0" />
              <span class="text-base-500 text-xs font-mono leading-relaxed">
                P5-B Silad Mahogany<br />
                Butuan City, Agusan Del Norte
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- divider + copyright -->
      <div class="border-t border-accent-400/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-base-600 text-[0.65rem] font-mono tracking-wider">
          &copy; {{ currentYear }} Rustom Pedales Jr.
          <span class="text-accent-400/20 mx-1">|</span>
          All rights reserved.
        </p>
        <p class="text-base-700 text-[0.6rem] font-mono">
          Built with <span class="text-accent-400/40">Nuxt 4</span> + <span class="text-accent-400/40">Canvas</span>
        </p>
      </div>
    </div>
  </footer>
</template>