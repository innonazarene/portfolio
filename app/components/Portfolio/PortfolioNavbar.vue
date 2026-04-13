<script setup lang="ts">
import { Menu, X, Download, Terminal } from 'lucide-vue-next'

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'github',   label: 'GitHub', href: 'https://github.com/innonazarene', external: true },
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
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 mx-3 mt-3 rounded-xl border-0"
    :class="scrolled
      ? 'nav-scrolled'
      : 'bg-transparent'"
  >
    <!-- HUD corner brackets -->
    <div
      v-if="scrolled"
      class="absolute inset-0 rounded-xl pointer-events-none"
    >
      <!-- top-left -->
      <span class="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-400/30 rounded-tl-xl" />
      <!-- top-right -->
      <span class="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-400/30 rounded-tr-xl" />
      <!-- bottom-left -->
      <span class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-400/30 rounded-bl-xl" />
      <!-- bottom-right -->
      <span class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-400/30 rounded-br-xl" />
    </div>

    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
      <!-- Logo — terminal style -->
      <a href="#home" class="group flex items-center gap-2">
        <Terminal :size="16" class="text-accent-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        <span class="text-base-50 font-mono text-sm font-semibold">
          rustom<span class="text-accent-400">_</span><span class="animate-pulse text-accent-400">|</span>
        </span>
      </a>

      <!-- Desktop Links -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="link.external ? link.href : `#${link.id}`"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="neon-link text-xs font-mono uppercase tracking-[0.15em] py-1 transition-colors duration-300"
            :class="activeSection === link.id
              ? 'text-accent-400 active'
              : 'text-base-300 hover:text-accent-400'"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Desktop CTA -->
      <a
        href="/Rustom R Pedales Jr.pdf"
        download
        class="hidden md:inline-flex cyber-btn-outline !py-2 !px-4 !text-[0.65rem]"
      >
        <Download :size="13" />
        Resume
      </a>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-base-100 p-2 rounded-lg hover:bg-accent-400/10 transition-colors"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" :size="20" />
        <X v-else :size="20" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="md:hidden border-t border-accent-400/10 bg-base-950/95 backdrop-blur-xl rounded-b-xl"
      >
        <ul class="flex flex-col gap-1 px-6 py-4">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.external ? link.href : `#${link.id}`"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="block text-base-200 hover:text-accent-400 text-sm font-mono py-3 px-3 rounded-lg hover:bg-accent-400/5 transition-all duration-200"
              @click="!link.external && (mobileOpen = false)"
            >
              <span class="text-accent-400/40 mr-2">&gt;</span>
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="px-6 pb-5">
          <a
            href="/Rustom R Pedales Jr.pdf"
            download
            class="flex items-center justify-center gap-2 w-full cyber-btn-outline"
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
.nav-scrolled {
  background: rgba(7, 8, 16, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s ease;
  overflow: hidden;
  max-height: 400px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
