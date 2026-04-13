<script setup lang="ts">
import { Coffee, Rocket, Palette, Zap, GraduationCap } from 'lucide-vue-next'

const highlights = [
  { icon: Coffee,         label: 'Coffee Addict' },
  { icon: Rocket,         label: 'Open Source' },
  { icon: Palette,        label: 'Design-Driven' },
  { icon: Zap,            label: 'Web Developer' },
  { icon: GraduationCap,  label: 'Former IT Instructor' },
]

const skills = [
  { name: 'PHP',                 level: 95 },
  { name: 'Tailwind CSS',        level: 90 },
  { name: 'Vue.js / Nuxt 3 & 4', level: 89 },
  { name: 'Javascript',          level: 85 },
  { name: 'MySQL',               level: 85 },
  { name: 'Filament PHP',        level: 83 },
  { name: 'TypeScript',          level: 80 },
  { name: 'Livewire',            level: 77 },
  { name: 'Alpine Js',           level: 75 },
  { name: 'Flutter',             level: 70 },
  { name: 'Python',              level: 65 },
  { name: 'React Js / Next Js',  level: 60 },
  { name: 'Java',                level: 50 },
]

const animated = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animated.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <section id="about" ref="sectionRef" class="relative py-28 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- label -->
      <span class="section-label mb-6 inline-flex">About Me</span>

      <div class="grid md:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-start">
        <!-- ── Left: bio ── -->
        <div
          class="flex flex-col gap-6 transition-all duration-700"
          :class="animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <!-- Profile Image & Name -->
          <div class="flex items-center gap-5 mb-2">
            <div class="relative group shrink-0">
              <!-- animated neon ring -->
              <div
                class="absolute -inset-1 rounded-full opacity-50 group-hover:opacity-80 blur-sm transition-opacity duration-500"
                style="background: conic-gradient(from 0deg, #00e5ff, #8b5cf6, #f472b6, #00e5ff);"
              />
              <NuxtImg
                src="/img/1a8c1651-4238-4b75-98d4-e92da04c6347.jpg"
                alt="Rustom Pedales Jr."
                class="relative w-28 h-28 rounded-full object-cover ring-2 ring-base-800"
                loading="lazy"
              />
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-display font-bold text-base-50">
                Rustom Ramos Pedales Jr.
              </h3>
              <p class="text-base-400 text-xs sm:text-sm font-mono mt-1">
                Full-Stack Developer <span class="text-accent-400/40">|</span>
                Back-End Developer <span class="text-accent-400/40">|</span>
                Web Developer
              </p>
            </div>
          </div>

          <p class="text-base-300 leading-relaxed text-[0.93rem]">
            I'm a Full-Stack Web Developer with a strong passion for building practical, scalable,
            and user-friendly web applications. Over the years, I've worked with
            <strong class="text-base-100 font-medium">Laravel, PHP, Vue.js, and Nuxt 3 & 4</strong>
            to deliver systems used in real-world academic and business environments.
          </p>
          <p class="text-base-300 leading-relaxed text-[0.93rem]">
            My experience ranges from developing school management systems to designing application architectures
            that prioritize performance, maintainability, and clean code. I enjoy working across both frontend and
            backend, collaborating with teams, and turning complex requirements into functional solutions.
          </p>
          <p class="text-base-300 leading-relaxed text-[0.93rem]">
            Beyond development, I've had the opportunity to teach as a
            <strong class="text-base-100 font-medium">part-time instructor</strong>,
            guiding students through web development fundamentals and hands-on projects — an experience that
            strengthened my communication and leadership skills.
          </p>
          <p class="text-base-300 leading-relaxed text-[0.93rem]">
            I'm always eager to learn, improve, and take on new challenges in modern web development.
            Let's connect if you're interested in full-stack development, Laravel/Vue projects, or system architecture.
          </p>

          <!-- highlight tags -->
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="tag in highlights"
              :key="tag.label"
              class="glass-card flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono text-base-200 hover:border-accent-400/30 hover:text-accent-300 transition-all duration-300 cursor-default"
            >
              <component :is="tag.icon" :size="13" class="text-accent-400/60" />
              {{ tag.label }}
            </span>
          </div>
        </div>

        <!-- ── Right: skills ── -->
        <div
          class="flex flex-col gap-4 transition-all duration-700 delay-200"
          :class="animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <h3 class="text-base-50 font-display text-lg font-semibold mb-1 flex items-center gap-2">
            <span class="text-accent-400 font-mono text-sm opacity-50">//</span>
            Technical Skills
          </h3>

          <div
            v-for="(skill, i) in skills"
            :key="skill.name"
            class="group"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <!-- label row -->
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-base-200 text-sm font-body group-hover:text-base-100 transition-colors">
                {{ skill.name }}
              </span>
              <span class="text-accent-400 text-xs font-mono opacity-70">
                {{ skill.level }}%
              </span>
            </div>

            <!-- power meter -->
            <div class="power-meter-track">
              <div
                class="power-meter-fill"
                :style="{ width: animated ? `${skill.level}%` : '0%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>