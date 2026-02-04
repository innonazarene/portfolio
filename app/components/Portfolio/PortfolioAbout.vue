<script setup lang="ts">
const highlights = [
  '☕ Coffee Addict',
  '🚀 Open Source',
  '🎨 Design-Driven',
  '⚡ Web Developer',
  '👨‍🏫 Former Part-time Instructor',
]

const skills = [
  { name: 'Laravel / PHP',       level: 90 },
  { name: 'Vue.js / Nuxt 3 & 4', level: 89 },
  { name: 'TypeScript',          level: 80 },
  { name: 'Tailwind CSS',        level: 90 },
  { name: 'MySQL',               level: 85 },
  { name: 'REST APIs',           level: 90 },
  { name: 'Javascript',          level: 80 },
]

const animated = ref(false)
const skillsCol = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries: Array<IntersectionObserverEntry>) => {
      if (entries[0]?.isIntersecting) {
        animated.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.25 }
  )
  if (skillsCol.value) observer.observe(skillsCol.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <section id="about" class="relative py-28 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- label -->
      <span class="section-label mb-4 inline-flex">About Me</span>
      <div class="grid md:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-start">
        <!-- ── Left: bio ── -->
        <div ref="bioCol" class="flex flex-col gap-6">
          <!-- Profile Image & Name -->
          <div class="flex items-center gap-4 mb-2">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <img
                src="/img/1a8c1651-4238-4b75-98d4-e92da04c6347.jpg"
                alt="Rustom Pedales Jr."
                class="relative w-40 h-28 rounded-full object-cover ring-2 ring-accent-400/30 group-hover:ring-accent-400/50 transition-all"
              >
            </div>
            <div>
              <h3 class="text-2xl font-display font-bold text-base-50">Rustom Ramos Pedales Jr.</h3>
              <p class="text-base-200/70 text-sm">Full-Stack Developer | Back-End Developer | Front-End Developer | Web Developer | Database Designer</p>
            </div>
          </div>

          <p class="text-base-200/70 leading-relaxed text-base">
            I'm a Full-Stack Web Developer with a strong passion for building practical, scalable,
            and user-friendly web applications. Over the years, I've worked with <strong class="text-base-100">Laravel,
            PHP, Vue.js, and Nuxt 3 & 4</strong> to deliver systems used in real-world academic and business environments.
          </p>
          <p class="text-base-200/70 leading-relaxed text-base">
            My experience ranges from developing school management systems to designing application architectures
            that prioritize performance, maintainability, and clean code. I enjoy working across both frontend and
            backend, collaborating with teams, and turning complex requirements into functional solutions.
          </p>
          <p class="text-base-200/70 leading-relaxed text-base">
            Beyond development, I've had the opportunity to teach as a <strong class="text-base-100">part-time instructor</strong>, 
            guiding students through web development fundamentals and hands-on projects—an experience that strengthened
            my communication and leadership skills.
          </p>

          <p class="text-base-200/70 leading-relaxed text-base">
            I'm always eager to learn, improve, and take on new challenges in modern web development.
            Let's connect if you're interested in full-stack development, Laravel/Vue projects, or system architecture.
          </p>

          <!-- highlight tags -->
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="tag in highlights"
              :key="tag"
              class="glass-card px-4 py-1.5 text-xs font-mono text-base-200/80 hover:border-accent-400/40 transition-colors"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- ── Right: skills ── -->
        <div ref="skillsCol" class="flex flex-col gap-5">
          <h3 class="text-base-50 font-display text-xl font-semibold mb-2">Technical Skills</h3>

          <div
            v-for="skill in skills"
            :key="skill.name"
            class="group"
          >
            <!-- label row -->
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-base-200 text-sm font-body">{{ skill.name }}</span>
              <span class="text-accent-400 text-xs font-mono">{{ skill.level }}%</span>
            </div>

            <!-- track -->
            <div class="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :style="{
                  width: animated ? `${skill.level}%` : '0%',
                  background: 'linear-gradient(90deg, #fbbf24, #2dd4bf)',
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>