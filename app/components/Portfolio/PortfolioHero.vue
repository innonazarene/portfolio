<script setup lang="ts">
import { ArrowRight, Download, ChevronDown } from 'lucide-vue-next'

const roles = [
  'Full-Stack Developer',
  'Back-End Developer',
  'Vue.js Developer',
  'Laravel Developer',
  'Nuxt 4 Developer',
  'Web Developer',
]

const currentRole = ref(roles[0])
let idx = 0

onMounted(() => {
  const interval = setInterval(() => {
    idx = (idx + 1) % roles.length
    currentRole.value = roles[idx]
  }, 2400)
  onUnmounted(() => clearInterval(interval))
})
</script>
<template>
  <section
    id="home"
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
  >
    <!-- ── subtle grid ── -->
    <div class="absolute inset-0 grid-bg opacity-40" />

    <!-- ── ambient glow orbs ── -->
    <div class="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent-500 opacity-[0.12] blur-[120px] rounded-full animate-float" />
    <div class="absolute -bottom-40 -right-20 w-[450px] h-[450px] bg-secondary-500 opacity-[0.10] blur-[100px] rounded-full" style="animation: float 8s ease-in-out infinite reverse" />

    <!-- ── content ── -->
    <div class="relative z-10 max-w-3xl w-full flex flex-col items-center gap-6 animate-fade-in-up">
      <!-- tag -->
      <span class="section-label">Welcome to my world</span>

      <!-- heading -->
      <h1 class="font-display text-7xl sm:text-7xl font-bold leading-[1.05] text-base-50">
        Hi, I'm
        <span class="text-gradient-accent"> Tom RP</span>
      </h1>

      <!-- animated role line -->
      <p class="text-base-200 text-lg sm:text-xl font-body font-light">
        <span class="text-accent-300 font-mono text-xl font-bold">&lt;{{ currentRole }}&gt;</span>
      </p>

      <!-- short bio -->
      <p class="text-base-200/60 max-w-xl text-base leading-relaxed">
        I’m a Full-Stack Web Developer with a strong passion for building practical,
        scalable, and user-friendly web applications. Over the years, I’ve worked with
        Laravel, PHP, Vue.js, and Nuxt 3 & 4 to deliver systems used in real-world
        academic and business environments.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 mt-4">
        <a
          href="#projects"
          class="inline-flex items-center gap-2 bg-accent-400 text-base-950 font-mono text-xs uppercase tracking-widest px-8 py-3.5 rounded-full font-semibold hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/25 transition-all duration-300 hover:-translate-y-0.5"
        >
          View My Work
          <ArrowRight :size="16" />
        </a>
        <a
          href="/Rustom R Pedales Jr.pdf"
          download
          target="_blank"
          class="inline-flex items-center gap-2 border border-white/[0.15] text-base-100 font-mono text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:border-accent-400 hover:text-accent-400 transition-all duration-300 hover:-translate-y-0.5"
        >
          <Download :size="16" />
          Download CV
        </a>
      </div>
    </div>

    <!-- ── scroll hint ── -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
      <span class="text-base-200/30 text-xs font-mono uppercase tracking-widest">Scroll</span>
      <ChevronDown :size="18" class="text-base-200/30" />
    </div>
  </section>
</template>
