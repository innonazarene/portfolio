<script setup lang="ts">
import { ArrowRight, Download, ChevronDown, Sparkles } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const roles = [
  'Full-Stack Developer',
  'Laravel & PHP Specialist',
  'Vue.js & Nuxt 4 Engineer',
  'System Architecture Designer',
  'Creative Web Craftsman',
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
    await sleep(50)
  }
}

async function eraseText() {
  const text = displayedRole.value
  for (let i = text.length; i >= 0; i--) {
    if (!running) return
    displayedRole.value = text.substring(0, i)
    await sleep(25)
  }
}

async function cycleRoles() {
  let idx = 0
  while (running) {
    await typeText(roles[idx] + "")
    await sleep(2400)
    await eraseText()
    await sleep(350)
    idx = (idx + 1) % roles.length
  }
}

const heroContainerRef = ref<HTMLElement | null>(null)
const castleBackdropRef = ref<HTMLElement | null>(null)
const watermarkRef = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const roleRef = ref<HTMLElement | null>(null)
const bioRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const scrollHintRef = ref<HTMLElement | null>(null)

onMounted(() => {
  cycleRoles()

  const cursorTimer = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)

  // GSAP Hero Entrance Timeline
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    watermarkRef.value,
    { opacity: 0, scale: 0.85, rotate: -4 },
    { opacity: 0.045, scale: 1, rotate: 0, duration: 2.2 }
  )
  .fromTo(
    badgeRef.value,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=1.6'
  )
  .fromTo(
    titleRef.value,
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 1.0 },
    '-=0.6'
  )
  .fromTo(
    roleRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.6'
  )
  .fromTo(
    bioRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.5'
  )
  .fromTo(
    ctaRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.5'
  )
  .fromTo(
    scrollHintRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 1.0 },
    '-=0.3'
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
      yPercent: 25,
      ease: 'none',
    })
  }

  onUnmounted(() => {
    running = false
    clearInterval(cursorTimer)
    tl.kill()
  })
})
</script>

<template>
  <section
    id="home"
    ref="heroContainerRef"
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
  >
    <!-- Fixed Castle Background Cover Photo that follows on scroll (First Page Only) -->
    <div
      ref="castleBackdropRef"
      class="hero-castle-backdrop fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden"
    >
      <NuxtImg
        src="/images/castle-bg.png"
        alt="Japanese Castle Night Backdrop"
        class="w-full h-full object-cover object-center opacity-45 filter contrast-125 brightness-105"
        loading="eager"
      />
      <!-- Pure black gradient overlays so the castle dissolves seamlessly into pitch black #000000 -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/75" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_92%)]" />
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-3xl w-full flex flex-col items-center gap-6">
      <!-- Status Badge -->
      <div
        ref="badgeRef"
        class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold-500/25 bg-gold-500/[0.04] backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
      >
        <span class="hanko-stamp !text-[0.6rem] !py-0.5 !px-1.5 font-serif">DEV</span>
        <span class="w-1.5 h-1.5 rounded-full bg-vermilion-500 animate-ping" />
        <span class="text-base-100 text-xs font-serif tracking-widest uppercase">
          Available for Opportunities
        </span>
        <Sparkles :size="12" class="text-gold-400" />
      </div>

      <!-- Main Heading -->
      <div ref="titleRef" class="flex flex-col items-center gap-2">
        <span class="text-xs font-serif tracking-[0.3em] text-sakura-300 uppercase">
          Welcome to my digital sanctuary
        </span>
        <h1 class="font-display text-5xl sm:text-7xl font-bold tracking-tight text-base-50 leading-[1.1]">
          Hi, I'm
          <span class="text-gradient-accent inline-block font-display ml-2">
            Tom
          </span>
        </h1>
      </div>

      <!-- Typewriter Role -->
      <div
        ref="roleRef"
        class="flex items-center gap-2 text-lg sm:text-xl font-body text-base-100 min-h-[2rem]"
      >
        <span class="text-vermilion-500 font-serif">◈</span>
        <span class="font-medium tracking-wide text-gradient-gold">{{ displayedRole }}</span>
        <span
          class="inline-block w-0.5 h-5 bg-vermilion-500 transition-opacity duration-150 ml-0.5"
          :class="cursorVisible ? 'opacity-100' : 'opacity-0'"
        />
      </div>

      <!-- Bio / Philosophy -->
      <p
        ref="bioRef"
        class="text-base-300 max-w-2xl text-base sm:text-lg leading-relaxed font-body"
      >
        A Full-Stack Web Developer dedicated to the craft of building scalable, elegant, and resilient systems.
        Blending the power of <strong class="text-base-100 font-semibold">Laravel, PHP, Vue.js, and Nuxt</strong>
        with thoughtful architecture to deliver impactful real-world solutions.
      </p>

      <!-- Action Buttons -->
      <div
        ref="ctaRef"
        class="flex flex-col sm:flex-row gap-4 mt-3 w-full sm:w-auto items-center justify-center"
      >
        <a href="#projects" class="zen-btn-primary w-full sm:w-auto justify-center">
          <span>View My Work</span>
          <ArrowRight :size="15" />
        </a>
        <a
          href="/Rustom R Pedales Jr.pdf"
          download
          target="_blank"
          class="zen-btn-outline w-full sm:w-auto justify-center"
        >
          <Download :size="15" class="text-gold-400" />
          <span>Download CV</span>
        </a>
      </div>
    </div>

    <!-- Scroll Hint -->
    <div
      ref="scrollHintRef"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-base-400 hover:text-base-200 transition-colors pointer-events-none"
    >
      <span class="text-[0.65rem] font-serif tracking-[0.3em] uppercase">Scroll Down</span>
      <ChevronDown :size="16" class="animate-bounce text-gold-400" />
    </div>
  </section>
</template>
