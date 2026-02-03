<template>
  <footer class="relative border-t border-white/[0.06] py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid sm:grid-cols-3 gap-12 mb-14">
        <!-- brand col -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <span class="text-base-100 font-display font-semibold text-lg">Rustom Pedales Jr.</span>
          </div>
          <p class="text-base-200/40 text-sm leading-relaxed max-w-xs">
            Full-stack developer | Back-End Develiper | Front-End Developer |  crafting elegant digital experiences. Available for freelance work.
          </p>
        </div>
        <!-- quick links -->
        <div>
          <h4 class="text-base-50 text-xs font-mono uppercase tracking-widest mb-5">Quick Links</h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in quickLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="text-base-200/45 hover:text-accent-400 text-sm transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
        <!-- contact col -->
        <div>
          <h4 class="text-base-50 text-xs font-mono uppercase tracking-widest mb-5">Get In Touch</h4>
          <ul class="flex flex-col gap-3">
            <li class="flex items-center gap-2">
              <Mail :size="15" class="text-base-200/30" />
              <a href="mailto:pedales.rustom@gmail.com" class="text-base-200/45 hover:text-accent-400 text-sm transition-colors">pedales.rustom@gmail.com</a>
            </li>
            <li class="flex items-center gap-2">
              <MapPin :size="15" class="text-base-200/30" />
              <span class="text-base-200/45 text-sm">P5-B Silad Mahogany Butuan City, Agusan Del Norte</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- divider -->
      <div class="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- copyright -->
        <p class="text-base-200/25 text-xs font-mono">
          © {{ new Date().getFullYear() }} Rustom Pedales Jr. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Mail, MapPin } from 'lucide-vue-next'

const quickLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
]

</script>