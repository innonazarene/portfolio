<script setup lang="ts">
import {
  Menu,
  X,
  Download,
  Home,
  User,
  Layers,
  Github,
} from 'lucide-vue-next'
import gsap from 'gsap'
import type { PortfolioTab } from '~/composables/usePortfolioNavigation'

const { currentTab, goToTab } = usePortfolioNavigation()

interface NavLinkItem {
  id: PortfolioTab | 'github'
  label: string
  icon: any
  href?: string
  external?: boolean
}

const navLinks: NavLinkItem[] = [
  { id: 'home',     label: 'Home',     icon: Home },
  { id: 'about',    label: 'About',    icon: User },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'github',   label: 'GitHub',   icon: Github, href: 'https://github.com/innonazarene', external: true },
]

const mobileOpen = ref(false)
const sidebarRef = ref<HTMLElement | null>(null)

const handleNavClick = (link: NavLinkItem) => {
  if (link.external) return
  goToTab(link.id as PortfolioTab)
  mobileOpen.value = false
}

onMounted(() => {
  if (sidebarRef.value) {
    gsap.fromTo(
      sidebarRef.value,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.1 }
    )
  }
})
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════════════════════════
         DESKTOP VERTICAL SIDEBAR DOCK (Left Side)
         ═══════════════════════════════════════════════════════════ -->
    <aside
      ref="sidebarRef"
      class="hidden md:flex fixed left-4 lg:left-6 top-5 bottom-16 w-20 lg:w-22 z-50 rounded-2xl bg-base-950/90 backdrop-blur-xl flex-col justify-between items-center py-5 px-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      aria-label="Sidebar Navigation"
    >
      <!-- Top: Hanko Seal Stamp Logo -->
      <button
        class="group flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
        title="Go to Home"
        @click="goToTab('home')"
      >
        <span class="hanko-stamp text-xs py-1 px-2 group-hover:scale-110 transition-transform duration-300 font-serif">
          RP
        </span>
        <span class="text-[0.55rem] font-serif tracking-widest text-base-400 uppercase group-hover:text-white transition-colors">
          Pedales
        </span>
      </button>

      <!-- Center: Navigation Stack -->
      <nav class="flex flex-col items-center gap-2.5 w-full px-1">
        <template v-for="link in navLinks" :key="link.id">
          <!-- External Link (GitHub) -->
          <a
            v-if="link.external"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-base-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
            title="GitHub Profile"
          >
            <component :is="link.icon" :size="18" class="group-hover:scale-110 transition-transform" />
            <span class="text-[0.6rem] font-serif tracking-wider uppercase">
              {{ link.label }}
            </span>
          </a>

          <!-- Internal Slide Trigger Button -->
          <button
            v-else
            class="w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer border relative group"
            :class="currentTab === link.id
              ? 'bg-vermilion-500 text-white border-vermilion-500 font-semibold'
              : 'border-transparent text-base-400 hover:text-white hover:bg-white/5'"
            :title="link.label"
            @click="handleNavClick(link)"
          >
            <component :is="link.icon" :size="18" class="group-hover:scale-110 transition-transform" />
            <span class="text-[0.6rem] font-serif tracking-wider uppercase">
              {{ link.label }}
            </span>
          </button>
        </template>
      </nav>

      <!-- Bottom: Resume Download Action Button (Icon Only, No CV Text, No Yellow) -->
      <a
        href="/Rustom R Pedales Jr.pdf"
        download
        class="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-vermilion-500 hover:border-vermilion-500 text-base-300 hover:text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-sm"
        title="Download Resume CV"
      >
        <Download :size="17" class="group-hover:scale-110 transition-transform" />
      </a>
    </aside>

    <!-- ═══════════════════════════════════════════════════════════
         MOBILE TOP TRIGGER & SLIDE-OVER SIDEBAR
         ═══════════════════════════════════════════════════════════ -->
    <div class="md:hidden">
      <!-- Mobile Floating Menu Button (Top-Right) -->
      <button
        class="fixed top-3.5 right-4 z-50 p-2 rounded-xl border border-white/10 bg-base-950/90 backdrop-blur-xl text-base-200 hover:text-white transition-all shadow-lg cursor-pointer"
        aria-label="Toggle Navigation Sidebar"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" :size="20" />
        <X v-else :size="20" />
      </button>

      <!-- Mobile Backdrop Overlay -->
      <Transition name="fade">
        <div
          v-if="mobileOpen"
          class="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
          @click="mobileOpen = false"
        />
      </Transition>

      <!-- Mobile Slide-In Sidebar Drawer (from Right) -->
      <Transition name="slide-right">
        <div
          v-if="mobileOpen"
          class="fixed inset-y-0 right-0 w-64 z-50 bg-base-950/95 backdrop-blur-2xl p-6 flex flex-col justify-between shadow-2xl border-l border-white/10"
        >
          <div>
            <!-- Header with Seal & Brand -->
            <div class="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div class="flex items-center gap-3">
                <span class="hanko-stamp text-xs py-0.5 px-2 font-serif">RP</span>
                <div>
                  <h3 class="font-katsuno font-normal tracking-wide text-white text-base">Rustom Pedales</h3>
                  <span class="text-[0.62rem] font-serif text-base-400 uppercase block tracking-wider">Full-Stack Dev</span>
                </div>
              </div>
              <button
                class="p-1 rounded-lg text-base-400 hover:text-white transition-colors cursor-pointer"
                @click="mobileOpen = false"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- Links List -->
            <ul class="flex flex-col gap-2">
              <li v-for="link in navLinks" :key="link.id">
                <a
                  v-if="link.external"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 text-sm font-medium py-3 px-3.5 rounded-xl text-base-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <component :is="link.icon" :size="17" />
                  <span>{{ link.label }}</span>
                </a>
                <button
                  v-else
                  class="w-full text-left flex items-center justify-between text-sm font-medium py-3 px-3.5 rounded-xl transition-all cursor-pointer border"
                  :class="currentTab === link.id
                    ? 'bg-vermilion-500 text-white border-vermilion-500 shadow-sm font-semibold'
                    : 'border-transparent text-base-300 hover:text-white hover:bg-white/5'"
                  @click="handleNavClick(link)"
                >
                  <div class="flex items-center gap-3">
                    <component :is="link.icon" :size="17" />
                    <span>{{ link.label }}</span>
                  </div>
                  <span
                    v-if="currentTab === link.id"
                    class="w-1.5 h-1.5 rounded-full bg-white"
                  />
                </button>
              </li>
            </ul>
          </div>

          <!-- Bottom CTA -->
          <div class="pt-4 border-t border-white/5">
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
    </div>
  </div>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(.16, 1, .3, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.font-katsuno {
  font-family: 'Katsuno Japan Demo', cursive, sans-serif !important;
}
</style>
