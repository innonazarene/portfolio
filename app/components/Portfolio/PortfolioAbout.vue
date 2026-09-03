<script setup lang="ts">
import { Coffee, Rocket, Palette, Zap, GraduationCap, CheckCircle2 } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const highlights = [
  { icon: Coffee,         label: 'Coffee Addict' },
  { icon: Rocket,         label: 'Open Source' },
  { icon: Palette,        label: 'Design-Driven' },
  { icon: Zap,            label: 'Web Developer' },
  { icon: GraduationCap,  label: 'Former IT Instructor' },
]

const skills = [
  { name: 'PHP & Laravel',       level: 95, exp: 'Primary' },
  { name: 'Tailwind CSS',        level: 90, exp: 'Expert' },
  { name: 'Vue.js / Nuxt 3 & 4', level: 89, exp: 'Advanced' },
  { name: 'Javascript / TS',     level: 85, exp: 'Advanced' },
  { name: 'MySQL & Databases',   level: 85, exp: 'Advanced' },
  { name: 'Filament PHP',        level: 83, exp: 'Specialist' },
  { name: 'Livewire & Alpine',   level: 77, exp: 'Proficient' },
  { name: 'Flutter & Dart',      level: 70, exp: 'Mobile' },
  { name: 'Python',              level: 65, exp: 'Backend' },
  { name: 'React / Next.js',     level: 60, exp: 'Modern UI' },
]

const sectionRef = ref<HTMLElement | null>(null)
const bioCardRef = ref<HTMLElement | null>(null)
const skillsCardRef = ref<HTMLElement | null>(null)
const animated = ref(false)

onMounted(() => {
  if (!sectionRef.value) return

  // GSAP ScrollTrigger for About Section
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 80%',
      onEnter: () => {
        animated.value = true

        gsap.fromTo(
          bioCardRef.value,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
        )

        gsap.fromTo(
          skillsCardRef.value,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.2 }
        )

        // Staggered animate skill bars
        gsap.fromTo(
          '.skill-bar-fill',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.2, ease: 'power2.out', stagger: 0.08, delay: 0.3 }
        )
      },
      once: true,
    })
  }, sectionRef.value)

  onUnmounted(() => {
    ctx.revert()
  })
})
</script>

<template>
  <section id="about" ref="sectionRef" class="relative py-28 px-6 overflow-hidden">
    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col items-start gap-2 mb-14">
        <span class="section-label">About Me</span>
        <h2 class="font-display text-3xl sm:text-5xl font-bold text-base-50 tracking-tight">
          Craft, Philosophy & <span class="text-gradient-accent">Expertise</span>
        </h2>
        <p class="text-base-400 font-serif text-sm max-w-xl">
          Clean architecture, thoughtful system engineering, and continuous growth.
        </p>
      </div>

      <div class="grid md:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
        <!-- ── Left: Bio & Story ── -->
        <div
          ref="bioCardRef"
          class="washi-card p-7 sm:p-9 flex flex-col gap-6"
        >
          <!-- Profile Image with Ring -->
          <div class="flex items-center gap-6 pb-4 border-b border-gold-500/15">
            <div class="relative group shrink-0">
              <!-- Golden & Vermilion Aura Ring -->
              <div
                class="absolute -inset-1.5 rounded-full opacity-60 group-hover:opacity-90 blur-sm transition-opacity duration-500"
                style="background: conic-gradient(from 0deg, #c52222, #d4af37, #f4a7b9, #c52222);"
              />
              <NuxtImg
                src="/img/1a8c1651-4238-4b75-98d4-e92da04c6347.jpg"
                alt="Rustom Pedales Jr."
                class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-base-900 shadow-2xl"
                loading="lazy"
              />
              <!-- Stamp Seal on avatar -->
              <span class="absolute -bottom-1 -right-1 hanko-stamp text-[0.6rem] !py-0.5 !px-1.5 shadow-lg bg-base-950 font-serif">
                RP
              </span>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-display font-bold text-base-50">
                Rustom Ramos Pedales Jr.
              </h3>
              <p class="text-gold-400 text-xs sm:text-sm font-serif mt-1 flex items-center gap-2">
                <span>Full-Stack Developer</span>
                <span class="text-base-500">•</span>
                <span class="text-base-300">Software Craftsman</span>
              </p>
            </div>
          </div>

          <!-- Bio text paragraphs -->
          <div class="flex flex-col gap-4 text-base-300 text-sm sm:text-[0.95rem] leading-relaxed">
            <p>
              I am a Full-Stack Web Developer driven by precision, problem-solving, and continuous learning.
              Over the years, I've specialized in
              <strong class="text-base-100 font-medium">Laravel, PHP, Vue.js, and Nuxt 3 & 4</strong>
              to deliver robust enterprise systems used in academic institutions and businesses.
            </p>
            <p>
              My expertise spans the entire lifecycle: from architecting modular database schemas and APIs,
              to engineering reactive, intuitive user interfaces with Tailwind CSS and modern component architecture.
            </p>
            <p>
              Beyond building systems, I have served as a
              <strong class="text-base-100 font-medium">part-time IT instructor</strong>,
              mentoring aspiring developers in programming fundamentals and system design — an honor that honed
              my communication, patience, and leadership abilities.
            </p>
          </div>

          <!-- Highlight Plaques -->
          <div class="pt-2">
            <span class="text-xs font-serif text-base-400 uppercase tracking-widest block mb-3">
              ◈ Highlights & Interests
            </span>
            <div class="flex flex-wrap gap-2.5">
              <span
                v-for="tag in highlights"
                :key="tag.label"
                class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/[0.04] text-xs text-base-200 hover:border-vermilion-500/50 hover:text-base-50 transition-all duration-300 cursor-default"
              >
                <component :is="tag.icon" :size="13" class="text-vermilion-500" />
                <span>{{ tag.label }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- ── Right: Technical Skills ── -->
        <div
          ref="skillsCardRef"
          class="washi-card p-7 sm:p-9 flex flex-col gap-6"
        >
          <div class="flex items-center justify-between pb-3 border-b border-gold-500/15">
            <div>
              <span class="text-xs font-serif text-gold-400 uppercase tracking-widest">Core Stack</span>
              <h3 class="text-lg sm:text-xl font-display font-bold text-base-50 mt-0.5">
                Technical Proficiency
              </h3>
            </div>
            <span class="hanko-stamp text-xs !py-0.5 !px-2 font-serif">SKILLS</span>
          </div>

          <div class="flex flex-col gap-5">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="group flex flex-col gap-1.5"
            >
              <div class="flex justify-between items-center text-xs sm:text-sm">
                <div class="flex items-center gap-2">
                  <CheckCircle2 :size="13" class="text-vermilion-500" />
                  <span class="text-base-100 font-medium group-hover:text-gold-300 transition-colors">
                    {{ skill.name }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[0.65rem] font-serif px-2 py-0.5 rounded bg-white/5 text-base-400">
                    {{ skill.exp }}
                  </span>
                  <span class="text-xs font-mono text-gold-400 font-semibold">
                    {{ skill.level }}%
                  </span>
                </div>
              </div>

              <!-- Zen Brush Progress Bar -->
              <div class="power-meter-track">
                <div
                  class="power-meter-fill skill-bar-fill"
                  :style="{ width: `${skill.level}%` }"
                />
              </div>
            </div>
          </div>

          <!-- Bottom Philosophy Footer -->
          <div class="mt-2 p-3.5 rounded-xl border border-white/5 bg-base-900/60 flex items-center gap-3">
            <span class="text-vermilion-500 font-serif text-sm">◈</span>
            <p class="text-xs text-base-400 font-serif leading-relaxed">
              Committed to continuous growth, clean documentation, and writing code that endures.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>