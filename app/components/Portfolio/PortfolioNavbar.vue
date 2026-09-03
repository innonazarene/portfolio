<script setup lang="ts">
import { Menu, X, Download } from 'lucide-vue-next'
import gsap from 'gsap'

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'github',   label: 'GitHub', href: 'https://github.com/innonazarene', external: true },
]

const scrolled      = ref(false)
const mobileOpen    = ref(false)
const activeSection = ref('home')
const navRef        = ref<HTMLElement | null>(null)

// ── scroll shadow toggle ──
onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 30 }
  window.addEventListener('scroll', onScroll, { passive: true })

  // Active-section via IntersectionObserver
  const sections = document.querySelectorAll('section[id]')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id
      })
    },
    { rootMargin: '-35% 0px -45% 0px' }
  )
  sections.forEach((s) => observer.observe(s))

  // GSAP Entrance
  if (navRef.value) {
    gsap.fromTo(
      navRef.value,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1 }
    )
  }

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    observer.disconnect()
  })
})
</script>

<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 mx-3 sm:mx-6 mt-3 rounded-2xl border"
    :class="scrolled
      ? 'bg-base-950/85 backdrop-blur-xl border-gold-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
      : 'bg-transparent border-transparent'"
  >
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between relative">
      <!-- Logo with Red Stamp Seal -->
      <a href="#home" class="group flex items-center gap-3">
        <span class="hanko-stamp text-xs py-0.5 px-2 group-hover:scale-105 transition-transform duration-300 font-serif">
          RP
        </span>
        <div class="flex flex-col">
          <span class="font-display text-base-50 font-bold text-sm tracking-wider group-hover:text-sakura-300 transition-colors">
            Rustom Pedales
          </span>
          <span class="text-[0.6rem] font-serif tracking-[0.2em] text-base-400 -mt-0.5 uppercase">
            Full-Stack Developer
          </span>
        </div>
      </a>

      <!-- Desktop Links -->
      <ul class="hidden md:flex items-center gap-9">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="link.external ? link.href : `#${link.id}`"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="zen-link group flex items-center py-1 transition-colors duration-300"
            :class="activeSection === link.id
              ? 'text-vermilion-400 active'
              : 'text-base-300 hover:text-base-100'"
          >
            <span class="text-xs font-medium tracking-wider">
              {{ link.label }}
            </span>
          </a>
        </li>
      </ul>

      <!-- Desktop CTA -->
      <a
        href="/Rustom R Pedales Jr.pdf"
        download
        class="hidden md:inline-flex zen-btn-outline !py-2 !px-4 !text-xs !rounded-full"
      >
        <Download :size="13" class="text-gold-400" />
        <span>Resume CV</span>
      </a>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-base-200 p-2 rounded-lg hover:bg-white/5 transition-colors"
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
        class="md:hidden border-t border-gold-500/15 bg-base-950/95 backdrop-blur-2xl rounded-b-2xl px-6 py-5 shadow-2xl"
      >
        <ul class="flex flex-col gap-2">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.external ? link.href : `#${link.id}`"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="flex items-center justify-between text-base-200 hover:text-sakura-300 text-sm font-medium py-2.5 px-3 rounded-xl hover:bg-white/5 transition-all duration-200"
              @click="!link.external && (mobileOpen = false)"
            >
              <span>{{ link.label }}</span>
            </a>
          </li>
        </ul>
        <div class="mt-4 pt-4 border-t border-white/5">
          <a
            href="/Rustom R Pedales Jr.pdf"
            download
            class="flex items-center justify-center gap-2 w-full zen-btn-primary !py-2.5 !text-xs !rounded-xl"
          >
            <Download :size="14" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.35s cubic-bezier(.16, 1, .3, 1), opacity 0.25s ease;
  overflow: hidden;
  max-height: 400px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
