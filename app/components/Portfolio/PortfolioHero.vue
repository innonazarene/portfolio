<script setup lang="ts">
import { ArrowRight, Download, ChevronDown, Activity } from 'lucide-vue-next'

const roles = [
  'Full-Stack Developer',
  'Back-End Developer',
  'Vue.js Developer',
  'Laravel Developer',
  'Nuxt 4 Developer',
  'Web Developer',
]

const displayedRole = ref('')
const cursorVisible = ref(true)
let running = true

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function typeText(text: string) {
  for (let i = 0; i < text.length; i++) {
    if (!running) return
    displayedRole.value = text.substring(0, i + 1)
    await sleep(55)
  }
}

async function eraseText() {
  const text = displayedRole.value
  for (let i = text.length; i >= 0; i--) {
    if (!running) return
    displayedRole.value = text.substring(0, i)
    await sleep(30)
  }
}

async function cycleRoles() {
  let idx = 0
  while (running) {
    await typeText(roles[idx])
    await sleep(2200)
    await eraseText()
    await sleep(400)
    idx = (idx + 1) % roles.length
  }
}

onMounted(() => {
  cycleRoles()
  const cursorTimer = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)
  onUnmounted(() => {
    running = false
    clearInterval(cursorTimer)
  })
})
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
  >
    <!-- ambient glow orbs -->
    <div
      class="absolute -top-40 -left-40 w-[550px] h-[550px] bg-accent-500 opacity-[0.06] blur-[140px] rounded-full animate-float"
    />
    <div
      class="absolute -bottom-48 -right-24 w-[500px] h-[500px] bg-secondary-500 opacity-[0.05] blur-[120px] rounded-full"
      style="animation: float 8s ease-in-out infinite reverse"
    />

    <!-- content -->
    <div class="relative z-10 max-w-3xl w-full flex flex-col items-center gap-6 animate-fade-in-up">
      <!-- status badge -->
      <div
        class="flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent-400/15 bg-accent-400/[0.03]"
      >
        <Activity :size="12" class="text-cyber-green animate-glow-pulse" />
        <span class="text-accent-400 text-[0.65rem] font-mono uppercase tracking-[0.25em]">
          System Online
        </span>
      </div>

      <!-- heading with glitch -->
      <h1 class="font-display text-5xl sm:text-7xl font-bold leading-[1.08] text-base-50">
        Hi, I'm
        <span class="glitch-text text-gradient-accent inline-block"> Tom</span>
      </h1>

      <!-- typewriter role line -->
      <div class="flex items-center gap-1 text-lg sm:text-xl font-mono">
        <span class="text-accent-400/50">&gt;</span>
        <span class="text-accent-300">{{ displayedRole }}</span>
        <span
          class="text-accent-400 text-xl transition-opacity duration-100"
          :class="cursorVisible ? 'opacity-100' : 'opacity-0'"
        >▌</span>
      </div>

      <!-- bio -->
      <p class="text-base-300 max-w-xl text-base leading-relaxed">
        I'm a Full-Stack Web Developer with a strong passion for building practical,
        scalable, and user-friendly web applications. Over the years, I've worked with
        Laravel, PHP, Vue.js, and Nuxt 3 & 4 to deliver systems used in real-world
        academic and business environments.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 mt-4">
        <a href="#projects" class="cyber-btn-primary">
          <span>View My Work</span>
          <ArrowRight :size="15" />
        </a>
        <a
          href="/Rustom R Pedales Jr.pdf"
          download
          target="_blank"
          class="cyber-btn-outline"
        >
          <Download :size="15" />
          <span>Download CV</span>
        </a>
      </div>
    </div>

    <!-- scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
      <span class="text-base-500 text-[0.6rem] font-mono uppercase tracking-[0.3em]">Scroll</span>
      <ChevronDown :size="16" class="text-base-500" />
    </div>
  </section>
</template>
