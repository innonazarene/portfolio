<script setup lang="ts">
import {
  ArrowRight,
  Download,
  ChevronDown,
  Layers,
  Code2,
  ShieldCheck,
  Terminal,
} from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const heroContainerRef = ref<HTMLElement | null>(null)
const castleBackdropRef = ref<HTMLElement | null>(null)

const coreSkills = [
  'Laravel & PHP',
  'Vue 3 & Nuxt 4',
  'Inertia & Livewire',
  'TypeScript',
  'Tailwind CSS',
  'MySQL & Relational DBs',
]

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    '.hero-fade-in',
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }
  )

  if (heroContainerRef.value && castleBackdropRef.value) {
    gsap.to(castleBackdropRef.value, {
      scrollTrigger: {
        trigger: heroContainerRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 0,
      yPercent: 20,
      ease: 'none',
    })
  }

  onUnmounted(() => {
    tl.kill()
  })
})
</script>

<template>
  <section
    id="home"
    ref="heroContainerRef"
    class="relative min-h-screen flex items-center justify-center px-5 sm:px-8 pt-20 pb-16 overflow-hidden"
  >
    <!-- Fixed Castle Background Cover Photo that follows on scroll (First Page Only) -->
    <div
      ref="castleBackdropRef"
      class="hero-castle-backdrop fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden"
    >
      <NuxtImg
        src="/images/castle-bg.png"
        alt="Japanese Castle Night Backdrop"
        class="w-full h-full object-cover object-center opacity-40 filter contrast-125 brightness-105"
        loading="eager"
      />
      <!-- Pure black gradient overlays so the castle dissolves seamlessly into pitch black #000000 -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_92%)]" />
    </div>

    <!-- 2-Column Hero Content Grid -->
    <div class="relative z-10 max-w-6xl w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
      <!-- Left Column (7 cols): Narrative & Actions -->
      <div class="lg:col-span-7 flex flex-col items-start text-left gap-5">
        <!-- Status Pill -->
        <div
          class="hero-fade-in inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold-500/25 bg-black/80 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span class="text-[0.7rem] font-mono tracking-wider text-base-200 uppercase">
            Available for Full-Stack &amp; Engineering Roles
          </span>
        </div>

        <!-- Headline -->
        <div class="hero-fade-in flex flex-col gap-2">
          <span class="text-[0.68rem] sm:text-xs font-serif tracking-[0.35em] text-gold-400 uppercase">
            Rustom Pedales Jr. &bull; Software Craftsman
          </span>
          <h1 class="font-katsuno text-2xl sm:text-3xl lg:text-[2.6rem] font-normal tracking-wide text-white leading-[1.45] sm:leading-[1.5] my-1">
            Architecting Scalable &amp; Modern Systems<span class="text-vermilion-500">.</span>
          </h1>
        </div>

        <!-- Elevator Pitch -->
        <p class="hero-fade-in text-base-300 text-sm sm:text-base leading-relaxed font-body max-w-xl">
          Hi, I'm <strong class="text-white font-medium">Tom</strong>. A Full-Stack Developer dedicated to engineering reliable web platforms, administrative enterprise suites, and clean user interfaces with
          <span class="text-white font-medium">Laravel</span>,
          <span class="text-white font-medium">Vue.js</span>,
          <span class="text-white font-medium">Nuxt</span>, and modern web architectures.
        </p>

        <!-- Action Buttons -->
        <div class="hero-fade-in flex flex-wrap gap-3.5 items-center w-full sm:w-auto pt-1">
          <a
            href="#projects"
            class="zen-btn-primary !py-2.5 !px-7 text-xs sm:text-sm shadow-[0_6px_20px_rgba(224,49,49,0.35)]"
          >
            <span>Explore 17 Systems</span>
            <ArrowRight :size="15" />
          </a>
          <a
            href="/Rustom R Pedales Jr.pdf"
            download
            target="_blank"
            class="zen-btn-outline !py-2.5 !px-6 text-xs sm:text-sm"
          >
            <Download :size="15" class="text-gold-400" />
            <span>Download CV</span>
          </a>
        </div>

        <!-- Core Stack Pills Strip -->
        <div class="hero-fade-in flex flex-wrap items-center gap-1.5 pt-2">
          <span
            v-for="skill in coreSkills"
            :key="skill"
            class="px-2.5 py-1 rounded-full text-[0.7rem] font-mono text-base-300 bg-black/70 border border-gold-500/15 hover:border-vermilion-500/40 hover:text-white transition-all shadow-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Right Column (5 cols): Compact 2x2 Bento Metric Cards Grid -->
      <div class="lg:col-span-5 grid grid-cols-2 gap-3.5 w-full">
        <!-- Card 1: Projects -->
        <div class="hero-fade-in washi-card p-4 rounded-xl border border-gold-500/15 bg-black/60 backdrop-blur-md flex flex-col justify-between text-left h-36">
          <div class="flex items-center justify-between">
            <span class="font-display text-3xl font-bold text-white">17+</span>
            <Layers :size="18" class="text-gold-400" />
          </div>
          <div>
            <span class="text-[0.7rem] font-serif text-gold-400 uppercase tracking-wider block">Production Systems</span>
            <span class="text-[0.68rem] text-base-400 block mt-0.5">Enterprise, Web &amp; Mobile UI</span>
          </div>
        </div>

        <!-- Card 2: Specialization -->
        <div class="hero-fade-in washi-card p-4 rounded-xl border border-gold-500/15 bg-black/60 backdrop-blur-md flex flex-col justify-between text-left h-36">
          <div class="flex items-center justify-between">
            <span class="font-display text-2xl font-bold text-white">Full-Stack</span>
            <Code2 :size="18" class="text-vermilion-400" />
          </div>
          <div>
            <span class="text-[0.7rem] font-serif text-gold-400 uppercase tracking-wider block">Core Specialization</span>
            <span class="text-[0.68rem] text-base-400 block mt-0.5">Laravel &bull; Vue 3 &bull; Nuxt</span>
          </div>
        </div>

        <!-- Card 3: Craftsmanship -->
        <div class="hero-fade-in washi-card p-4 rounded-xl border border-gold-500/15 bg-black/60 backdrop-blur-md flex flex-col justify-between text-left h-36">
          <div class="flex items-center justify-between">
            <span class="font-display text-3xl font-bold text-white">100%</span>
            <ShieldCheck :size="18" class="text-emerald-400" />
          </div>
          <div>
            <span class="text-[0.7rem] font-serif text-gold-400 uppercase tracking-wider block">Engineering Craft</span>
            <span class="text-[0.68rem] text-base-400 block mt-0.5">Modular &bull; Scalable &bull; Clean</span>
          </div>
        </div>

        <!-- Card 4: Active Status -->
        <div class="hero-fade-in washi-card p-4 rounded-xl border border-gold-500/15 bg-black/60 backdrop-blur-md flex flex-col justify-between text-left h-36">
          <div class="flex items-center justify-between">
            <span class="font-display text-2xl font-bold text-white">Active</span>
            <Terminal :size="18" class="text-sakura-400" />
          </div>
          <div>
            <span class="text-[0.7rem] font-serif text-gold-400 uppercase tracking-wider block">Availability</span>
            <span class="text-[0.68rem] text-base-400 block mt-0.5">Remote &amp; Contract Ready</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Hint -->
    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-base-400 hover:text-base-200 transition-colors pointer-events-none"
    >
      <span class="text-[0.6rem] font-serif tracking-[0.3em] uppercase">Scroll Down</span>
      <ChevronDown :size="14" class="animate-bounce text-gold-400" />
    </div>
  </section>
</template>

<style scoped>
.font-katsuno {
  font-family: 'Katsuno Japan Demo', cursive, sans-serif;
}
</style>
