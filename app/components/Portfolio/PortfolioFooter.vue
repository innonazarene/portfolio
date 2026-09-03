<script setup lang="ts">
import { Mail, MapPin, ArrowUpRight } from 'lucide-vue-next'

const quickLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-gold-500/15 bg-base-950/80 pt-20 pb-12 px-6 overflow-hidden">
    <!-- Vermilion & Gold Hairline Accent -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-vermilion-500/70 to-transparent"
    />

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="grid sm:grid-cols-3 gap-12 mb-16">
        <!-- Brand & Motto -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="hanko-stamp text-xs !py-0.5 !px-1.5 font-serif">RP</span>
            <span class="text-base-50 font-display font-bold text-base tracking-wide">
              Rustom Pedales Jr.
            </span>
          </div>

          <p class="text-gold-400/90 text-xs font-serif leading-relaxed italic">
            Crafted with intention — Building scalable systems and delightful user experiences.
          </p>

          <p class="text-base-400 text-xs leading-relaxed max-w-xs font-body">
            Full-stack software developer crafting resilient web applications, modular APIs, and intuitive user experiences.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-base-200 text-xs font-serif uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <span class="text-vermilion-500 font-serif">◈</span>
            Navigation
          </h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in quickLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="group inline-flex items-center gap-2 text-base-300 hover:text-sakura-300 text-xs font-serif transition-colors duration-200"
              >
                <span>{{ link.label }}</span>
                <ArrowUpRight :size="12" class="opacity-0 group-hover:opacity-100 text-gold-400 transition-opacity" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-base-200 text-xs font-serif uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <span class="text-vermilion-500 font-serif">◈</span>
            Get In Touch
          </h4>
          <ul class="flex flex-col gap-3.5">
            <li class="flex items-center gap-3">
              <Mail :size="14" class="text-vermilion-500 shrink-0" />
              <a
                href="mailto:pedales.rustom@gmail.com"
                class="text-base-300 hover:text-sakura-300 text-xs font-body transition-colors"
              >
                pedales.rustom@gmail.com
              </a>
            </li>
            <li class="flex items-start gap-3">
              <MapPin :size="14" class="text-gold-400 mt-0.5 shrink-0" />
              <span class="text-base-400 text-xs font-body leading-relaxed">
                P5-B Silad Mahogany, Butuan City<br />
                Agusan Del Norte, Philippines
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider & Copyright -->
      <div class="border-t border-gold-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-base-500 text-xs font-serif">
          &copy; {{ currentYear }} Rustom Pedales Jr.
          <span class="text-vermilion-500/40 mx-2">◈</span>
          All rights reserved.
        </p>
        <p class="text-base-500 text-xs font-serif flex items-center gap-2">
          <span>Crafted with</span>
          <span class="text-vermilion-500">Nuxt 4</span>
          <span>•</span>
          <span class="text-sakura-300">Three.js 3D</span>
          <span>•</span>
          <span class="text-gold-400">GSAP</span>
        </p>
      </div>
    </div>
  </footer>
</template>