<script setup lang="ts">
import {
  ArrowRight,
  Download,
} from 'lucide-vue-next'
import gsap from 'gsap'

const { goToTab } = usePortfolioNavigation()

const heroContainerRef = ref<HTMLElement | null>(null)
const castleBackdropRef = ref<HTMLElement | null>(null)

const coreSkills = [
  'Laravel & PHP',
  'React.js',
  'Vue 3 & Nuxt 4',
  'TypeScript',
  'Tailwind CSS',
  'SQL & Databases',
  'REST API Architecture',
]

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    '.hero-fade-in',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }
  )

  onUnmounted(() => {
    tl.kill()
  })
})
</script>

<template>
  <div
    id="home"
    ref="heroContainerRef"
    class="relative w-full h-full flex flex-col justify-between overflow-hidden"
  >
    <!-- Japanese Castle Backdrop (Slides along with Hero) -->
    <div
      ref="castleBackdropRef"
      class="hero-castle-backdrop absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black"
    >
      <NuxtImg
        src="/images/castle-bg.png"
        alt="Japanese Castle Night Backdrop"
        class="w-full h-full object-cover object-center opacity-40 filter contrast-125 brightness-105 bg-black"
        loading="eager"
      />
      <!-- Pure black overlay -->
      <div class="absolute inset-0 bg-black/75" />
    </div>

    <!-- 2-Column Hero Content Grid (Expands to fill height between top and bottom lines) -->
    <div class="relative z-10 max-w-6xl w-full flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center justify-center mx-auto py-1">
      <!-- Left Column (7 cols): Narrative & Actions (Compressed & Centered) -->
      <div class="lg:col-span-7 flex flex-col justify-center gap-3.5 sm:gap-4.5 items-center text-center lg:items-start lg:text-left py-1">
        <!-- Top: Headline & Identity -->
        <div class="hero-fade-in flex flex-col items-center lg:items-start">
          <span class="block text-[0.7rem] sm:text-xs md:text-sm font-serif tracking-[0.25em] sm:tracking-[0.35em] text-base-300 uppercase text-center lg:text-left mb-3 sm:mb-4 lg:mb-5">
            Rustom Pedales Jr. &bull; Senior Full-Stack Developer
          </span>
          <h1 class="font-katsuno text-2xl sm:text-3xl lg:text-[2.7rem] font-normal tracking-tight text-white leading-[1.35] sm:leading-[1.3] lg:leading-[1.25] text-center lg:text-left max-w-lg">
            Architecting Scalable &amp; Modern Systems<span class="text-vermilion-500">.</span>
          </h1>
        </div>

        <!-- Middle: Elevator Pitch (Compressed, No Voids) -->
        <p class="hero-fade-in text-base-300 text-xs sm:text-sm md:text-base leading-relaxed font-body max-w-xl text-center lg:text-left mx-auto lg:mx-0">
          Hi, I'm <strong class="text-white font-medium">Tom</strong>. A Senior Full-Stack Developer and Application Architect dedicated to engineering reliable web platforms, administrative enterprise suites, and clean user interfaces with
          <span class="text-white font-medium">Laravel</span>,
          <span class="text-white font-medium">React</span>,
          <span class="text-white font-medium">Vue.js</span>, and modern web architectures.
        </p>

        <!-- Bottom: Action Buttons & Core Stack Strip -->
        <div class="flex flex-col items-center lg:items-start gap-3 w-full sm:w-auto shrink-0">
          <div class="hero-fade-in grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full sm:flex sm:w-auto items-center">
            <button
              class="zen-btn-primary w-full sm:w-auto !py-2.5 !px-2 sm:!px-7 text-[0.72rem] sm:text-xs md:text-sm cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap text-center"
              @click="goToTab('projects')"
            >
              <span>Explore 17 Systems</span>
              <ArrowRight :size="14" class="shrink-0" />
            </button>
            <a
              href="/Rustom R Pedales Jr.pdf"
              download
              target="_blank"
              class="zen-btn-outline w-full sm:w-auto !py-2.5 !px-2 sm:!px-6 text-[0.72rem] sm:text-xs md:text-sm flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap text-center"
            >
              <Download :size="14" class="text-base-300 shrink-0" />
              <span>Download Resume</span>
            </a>
          </div>

          <!-- Core Stack Pills Strip -->
          <div class="hero-fade-in flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
            <span
              v-for="skill in coreSkills"
              :key="skill"
              class="px-2.5 py-1 rounded-full text-[0.68rem] sm:text-[0.7rem] font-mono text-base-300 bg-black/70 border border-white/10 hover:border-vermilion-500/40 hover:text-white transition-all shadow-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column (5 cols): Compact 2x2 Bento Metric Cards Grid -->
      <div class="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-3.5 w-full">
        <!-- Card 1: 17+ Production Systems -->
        <div class="hero-fade-in washi-card p-3.5 sm:p-4 lg:p-4.5 rounded-2xl border border-white/10 bg-black flex flex-col justify-between text-left hover:border-white/20 transition-colors duration-300 gap-2">
          <div>
            <span class="font-katsuno text-2xl sm:text-3xl lg:text-[2.2rem] font-normal tracking-wide text-white leading-none">17+</span>
          </div>

          <div class="py-0.5">
            <span class="text-xs sm:text-[0.78rem] font-mono text-base-200 block">12 Web &bull; 5 Mobile Apps</span>
            <span class="text-[0.68rem] sm:text-[0.72rem] font-mono text-emerald-400 mt-0.5 block">100% Shipped to Production</span>
          </div>

          <div class="pt-2 border-t border-white/5">
            <span class="text-[0.7rem] sm:text-xs font-serif text-base-200 uppercase tracking-wider block font-semibold">Production Systems</span>
            <span class="text-[0.62rem] sm:text-[0.68rem] text-base-400 block mt-0.5">Enterprise, Web &amp; Mobile UI</span>
          </div>
        </div>

        <!-- Card 2: FULL-STACK & Core Specialization -->
        <div class="hero-fade-in washi-card p-3.5 sm:p-4 lg:p-4.5 rounded-2xl border border-white/10 bg-black flex flex-col justify-between text-left hover:border-white/20 transition-colors duration-300 gap-2">
          <div>
            <span class="font-katsuno text-xl sm:text-2xl lg:text-[1.85rem] font-normal tracking-wide text-white leading-tight">Full-Stack</span>
          </div>

          <div class="py-0.5">
            <span class="text-xs sm:text-[0.78rem] font-mono text-base-200 block">7+ Years Experience</span>
          </div>

          <div class="pt-2 border-t border-white/5">
            <span class="text-[0.7rem] sm:text-xs font-serif text-base-200 uppercase tracking-wider block font-semibold">Core Specialization</span>
            <span class="text-[0.62rem] sm:text-[0.68rem] text-base-400 block mt-0.5">Laravel &bull; React &bull; Vue 3 &bull; Nuxt</span>
          </div>
        </div>

        <!-- Card 3: 100% Engineering Craft -->
        <div class="hero-fade-in washi-card p-3.5 sm:p-4 lg:p-4.5 rounded-2xl border border-white/10 bg-black flex flex-col justify-between text-left hover:border-white/20 transition-colors duration-300 gap-2">
          <div>
            <span class="font-katsuno text-2xl sm:text-3xl lg:text-[2.2rem] font-normal tracking-wide text-white leading-none">100%</span>
          </div>

          <div class="py-0.5">
            <span class="text-xs sm:text-[0.78rem] font-mono text-base-200 block">End-to-End Delivery</span>
            <span class="text-[0.68rem] sm:text-[0.72rem] font-mono text-base-400 mt-0.5 block">Architecture to UI &bull; APIs</span>
          </div>

          <div class="pt-2 border-t border-white/5">
            <span class="text-[0.7rem] sm:text-xs font-serif text-base-200 uppercase tracking-wider block font-semibold">Engineering Craft</span>
            <span class="text-[0.62rem] sm:text-[0.68rem] text-base-400 block mt-0.5">Modular &bull; Scalable &bull; Clean</span>
          </div>
        </div>

        <!-- Card 4: ACTIVE & Availability -->
        <div class="hero-fade-in washi-card p-3.5 sm:p-4 lg:p-4.5 rounded-2xl border border-white/10 bg-black flex flex-col justify-between text-left hover:border-white/20 transition-colors duration-300 gap-2">
          <div>
            <span class="font-katsuno text-xl sm:text-2xl lg:text-[2rem] font-normal tracking-wide text-white leading-none">Active</span>
          </div>

          <div class="py-0.5">
            <span class="text-xs sm:text-[0.78rem] font-mono text-base-200 block">Full-Stack &bull; Architect</span>
            <span class="text-[0.68rem] sm:text-[0.72rem] font-mono text-emerald-400 mt-0.5 block">Response Speed &lt; 24h</span>
          </div>

          <div class="pt-2 border-t border-white/5">
            <span class="text-[0.7rem] sm:text-xs font-serif text-base-200 uppercase tracking-wider block font-semibold">Availability</span>
            <span class="text-[0.62rem] sm:text-[0.68rem] text-base-400 block mt-0.5">Remote &amp; Contract Ready</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.font-katsuno {
  font-family: 'Katsuno Japan Demo', cursive, sans-serif !important;
}
</style>
