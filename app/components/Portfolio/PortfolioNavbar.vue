<script setup lang="ts">
import { Menu, X, Download } from 'lucide-vue-next'

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
]

const scrolled      = ref(false)
const mobileOpen    = ref(false)
const activeSection = ref('home')

// ── scroll shadow toggle ──
onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// ── active-section via IntersectionObserver ──
onMounted(() => {
  const sections = document.querySelectorAll('section[id]')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id
      })
    },
    { rootMargin: '-40% 0px -50% 0px' }
  )
  sections.forEach((s) => observer.observe(s))
  onUnmounted(() => observer.disconnect())
})
</script>
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 mx-4 mt-3 rounded-2xl border"
    :class="scrolled 
      ? 'bg-base-950/95 backdrop-blur-lg shadow-lg shadow-black/20 border-white/[0.07]' 
      : 'bg-transparent border-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a href="#home" class="group flex items-center gap-2">
        <span class="text-base-100 font-display font-semibold text-lg">Rustom Ramos Pedales Jr.</span>
      </a>

      <!-- Desktop Links -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="relative text-sm font-body text-base-200 hover:text-accent-400 transition-colors duration-300 py-1"
            :class="activeSection === link.id ? 'text-accent-400' : ''"
          >
            {{ link.label }}
            <!-- Active underline -->
            <span
              class="absolute bottom-0 left-0 h-px bg-accent-400 transition-all duration-300"
              :class="activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'"
            />
          </a>
        </li>
      </ul>
      <!-- Desktop CTA -->
      <a
        href="/Rustom R Pedales Jr.pdf"
        download
        class="hidden md:inline-flex items-center gap-2 border border-accent-400 text-accent-400 text-xs font-mono uppercase tracking-widest px-5 py-2 rounded-full hover:bg-accent-400 hover:text-base-950 transition-all duration-300"
      >
        <Download :size="14" />
        Download CV
      </a>
      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-base-100 p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" :size="22" />
        <X v-else :size="22" />
      </button>
    </div>
    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="md:hidden border-t border-white/[0.07] bg-base-950/95 backdrop-blur-lg"
      >
        <ul class="flex flex-col gap-1 px-6 py-4">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="block text-base-200 hover:text-accent-400 text-sm py-3 px-3 rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="px-6 pb-5">
          <a
            href="/Rustom R Pedales Jr.pdf"
            download
            class="flex items-center justify-center gap-2 w-full border border-accent-400 text-accent-400 text-xs font-mono uppercase tracking-widest px-5 py-3 rounded-full hover:bg-accent-400 hover:text-base-950 transition-all duration-300"
          >
            <Download :size="14" />
            Download CV
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s ease;
  overflow: hidden;
  max-height: 300px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.glass-card {
  background: rgba(10, 10, 15, 0.95); /* or your base-950 color with opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
</style>
