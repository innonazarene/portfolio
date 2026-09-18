<script setup lang="ts">
import {
  Coffee,
  Rocket,
  Palette,
  Zap,
  GraduationCap,
  CheckCircle2,
  Building2,
  MapPin,
  Code2,
  Calendar,
  Layers,
  Briefcase,
  ChevronRight,
} from 'lucide-vue-next'
import gsap from 'gsap'

const { currentTab } = usePortfolioNavigation()

const activePanel = ref<'experience' | 'skills'>('experience')

const setPanel = (panel: 'experience' | 'skills') => {
  activePanel.value = panel
  nextTick(() => {
    if (panel === 'skills') {
      gsap.fromTo(
        '.skill-bar-fill',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', stagger: 0.03 }
      )
    } else {
      gsap.fromTo(
        '.experience-item',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      )
    }
  })
}

// Detailed career items directly from the user's CV
const experiences = [
  {
    company: 'City Government of Butuan',
    role: 'Senior Full Stack Developer',
    period: 'May 2026 – Present',
    location: 'Butuan City, Philippines',
    isCurrent: true,
    steps: null,
    description: 'Building the City’s Human Resource Management System (CHRMS), a React front end backed by a Laravel REST API, digitizing personnel records and HR workflows across city departments.',
    details: [
      'Own architecture decisions end to end: database schema, REST API design, and front-end delivery.',
      'Partner with HR and department stakeholders to translate manual government processes into digital workflows.',
    ],
  },
  {
    company: 'Engtech Global Solutions Inc.',
    role: 'Application Architect',
    period: 'Oct 2024 – Feb 2026',
    location: 'Butuan City, Philippines',
    isCurrent: false,
    badge: 'Promoted 2x in 5 Yrs',
    steps: ['Junior Web Dev (2019)', 'Senior Web Dev (2022)', 'Application Architect (2024)'],
    description: 'Architected scalable application structures for educational and enterprise clients, setting standards for maintainability, performance, and modern web practices.',
    details: [
      'Reviewed technical designs across concurrent client projects prior to implementation.',
      'Rebuilt corporate websites and delivered backend logic, front-end interfaces, and database integrations in PHP, Laravel, and JavaScript.',
    ],
  },
  {
    company: 'ACLC College of Butuan',
    role: 'Part-Time IT Instructor',
    period: '2019 – April 2021',
    location: 'Butuan City, Philippines',
    isCurrent: false,
    badge: 'Academia & Mentorship',
    steps: ['Student Assistant (2014)', 'Part-Time IT Instructor (2019)'],
    description: 'Taught IT and programming courses at Mindanao’s leading IT institution, mentoring students on web development fundamentals and applied project work.',
    details: [
      'Built and maintained School Management System modules spanning enrollment, grading, academic advising, and accounting verification.',
    ],
  },
  {
    company: 'Independent Consulting',
    role: 'Freelance Web Developer',
    period: '2020 – Present',
    location: 'Butuan City, Philippines',
    isCurrent: false,
    badge: 'Client Systems',
    steps: null,
    description: 'Delivering custom full-stack web solutions and maintaining ongoing client systems alongside full-time architectural work.',
    details: [
      'Developed Altera Barangay & City App, Sigma Accounting, and Web3 Algorand Wallet integrations.',
    ],
  },
]

// Technical proficiency categories from CV
const skillsCol1 = [
  { name: 'PHP & Laravel',       level: 95, exp: 'Primary', category: 'Backend' },
  { name: 'React.js',            level: 90, exp: 'Advanced', category: 'Frontend' },
  { name: 'Vue.js / Nuxt 4',     level: 90, exp: 'Expert', category: 'Frontend' },
  { name: 'JavaScript / TS',     level: 88, exp: 'Advanced', category: 'Core' },
  { name: 'Tailwind CSS',        level: 92, exp: 'Expert', category: 'UI' },
]

const skillsCol2 = [
  { name: 'SQL & Database Design', level: 90, exp: 'Primary', category: 'Data' },
  { name: 'REST API Architecture', level: 94, exp: 'Architect', category: 'APIs' },
  { name: 'Filament PHP / Livewire', level: 85, exp: 'Specialist', category: 'Full-Stack' },
  { name: 'Git, GitHub & CI/CD',   level: 88, exp: 'Proficient', category: 'DevOps' },
  { name: 'CodeIgniter & jQuery',  level: 80, exp: 'Enterprise', category: 'Legacy' },
]

const cvTools = [
  { label: 'Languages', items: ['PHP', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { label: 'Frameworks', items: ['Laravel', 'React.js', 'Vue.js', 'Nuxt 4', 'Tailwind CSS', 'CodeIgniter'] },
  { label: 'Practices', items: ['REST API Design', 'Database Schema', 'CI/CD', 'Git/GitHub', 'Responsive UI'] },
]

const highlights = [
  { icon: Building2,      label: 'Gov & Enterprise Systems' },
  { icon: Code2,          label: 'REST API & DB Architecture' },
  { icon: Rocket,         label: 'Promoted 2x to Architect' },
  { icon: GraduationCap,  label: 'BS Computer Science' },
  { icon: Zap,            label: 'Former IT Instructor' },
]

const bioCardRef = ref<HTMLElement | null>(null)
const skillsCardRef = ref<HTMLElement | null>(null)
const animated = ref(false)

const playAnimation = () => {
  if (animated.value) return
  animated.value = true

  gsap.fromTo(
    bioCardRef.value,
    { opacity: 0, x: -25 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
  )

  gsap.fromTo(
    skillsCardRef.value,
    { opacity: 0, x: 25 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.12 }
  )

  gsap.fromTo(
    '.skill-bar-fill',
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 0.9, ease: 'power2.out', stagger: 0.04, delay: 0.2 }
  )
}

watch(currentTab, (newTab) => {
  if (newTab === 'about') {
    playAnimation()
  }
})

onMounted(() => {
  if (currentTab.value === 'about') {
    playAnimation()
  }
})
</script>

<template>
  <div
    class="relative w-full h-full flex flex-col justify-between overflow-hidden"
  >
    <div class="max-w-6xl w-full mx-auto relative z-10 flex flex-col justify-between h-full gap-3 sm:gap-4">
      <!-- Section Header (Aligned with top of sidebar) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-h-[44px] pb-4 mb-3 sm:mb-4 border-b border-white/10 shrink-0 pr-14 md:pr-0">
        <div class="flex items-center gap-2.5 sm:gap-3">
          <h2 class="font-katsuno text-lg sm:text-2xl lg:text-3xl font-normal tracking-wide text-white leading-[1.55] sm:leading-[1.4]">
            Craft, Philosophy &amp; <span class="text-vermilion-500">Expertise</span>
          </h2>
          <span class="hidden md:inline text-base-500">•</span>
          <p class="hidden md:inline text-base-400 font-serif text-xs">
            Clean architecture &bull; thoughtful system engineering &bull; continuous growth
          </p>
        </div>
      </div>

      <!-- 2-Card Layout (Expands vertically to match sidebar bottom) -->
      <div class="grid lg:grid-cols-[1fr_1.15fr] gap-4 lg:gap-6 items-stretch flex-1 min-h-0">
        <!-- ── Left Card: Bio, Education & Alma Mater ── -->
        <div
          ref="bioCardRef"
          class="washi-card p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full overflow-y-auto no-scrollbar gap-3"
        >
          <!-- Profile Header -->
          <div class="flex items-center gap-4 pb-3 border-b border-white/10 shrink-0">
            <div class="relative group shrink-0">
              <!-- Pure Vermilion Aura Ring -->
              <div
                class="absolute -inset-1 rounded-full bg-vermilion-500/40 opacity-80 group-hover:opacity-100 blur-sm transition-opacity duration-500"
              />
              <NuxtImg
                src="/img/profile.png"
                alt="Rustom Pedales Jr."
                class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top ring-2 ring-base-900 shadow-xl bg-black"
                loading="lazy"
              />
              <!-- Stamp Seal on avatar -->
              <span class="absolute -bottom-1 -right-1 hanko-stamp text-[0.55rem] !py-0.2 !px-1 shadow-lg bg-base-950 font-serif">
                RP
              </span>
            </div>

            <div class="flex flex-col min-w-0 flex-1 gap-1 sm:gap-1.5">
              <h3 class="text-sm sm:text-lg lg:text-xl font-katsuno font-normal tracking-wide text-base-50 leading-snug whitespace-nowrap mb-1 sm:mb-1.5">
                Rustom Ramos Pedales Jr.
              </h3>
              <p class="text-xs sm:text-sm font-serif flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span class="text-vermilion-400 font-medium">Senior Full Stack Developer</span>
                <span class="text-base-500">•</span>
                <span class="text-base-300">Application Architect</span>
              </p>
              <div class="flex items-center gap-1.5 text-[0.7rem] text-base-400 mt-1 font-mono">
                <MapPin :size="11" class="text-vermilion-500 shrink-0" />
                <span>Butuan City, Agusan del Norte, Philippines</span>
              </div>
            </div>
          </div>

          <!-- Professional CV Narrative -->
          <div class="flex flex-col gap-2 text-base-300 text-xs sm:text-[0.82rem] leading-relaxed py-1">
            <p>
              Senior Full-Stack Web Developer &amp; Application Architect specialized in engineering high-reliability public sector enterprise platforms, academic systems, and reactive user interfaces with
              <strong class="text-base-100 font-medium">Laravel, React.js, Vue.js, and Nuxt 4</strong>.
            </p>
            <p>
              Proven engineering progression: advanced from junior developer to <strong class="text-base-100 font-medium">Application Architect</strong> within five years, owning modular database schemas, RESTful API integrations, and translating manual workflows into high-impact digital systems.
            </p>
          </div>

          <!-- Education Section (Direct from CV) -->
          <div class="p-3 rounded-xl border border-white/10 bg-black flex flex-col gap-1.5 shrink-0">
            <div class="flex items-center justify-between">
              <span class="text-[0.65rem] font-serif text-vermilion-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <GraduationCap :size="13" class="text-vermilion-500" />
                Education &amp; Alma Mater
              </span>
              <span class="text-[0.65rem] font-mono text-base-400">2014 – 2019</span>
            </div>
            <div>
              <h4 class="text-xs sm:text-sm font-semibold text-white">
                Bachelor of Science in Computer Science
              </h4>
              <p class="text-[0.75rem] text-base-300 font-serif">
                ACLC College of Butuan &bull; Butuan City, Philippines
              </p>
              <p class="text-[0.68rem] text-base-400 font-mono mt-0.5">
                Student Assistant (2014–2019) &bull; Part-Time IT Instructor (2019–2021)
              </p>
            </div>
          </div>


          <!-- Highlights Tags Strip -->
          <div class="pt-1 shrink-0">
            <span class="text-[0.62rem] font-serif text-base-400 uppercase tracking-widest block mb-1.5">
              ◈ Core Competencies &amp; Track Record
            </span>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in highlights"
                :key="tag.label"
                class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-black text-[0.68rem] text-base-200 hover:border-white/25 hover:text-base-50 transition-all duration-300 cursor-default"
              >
                <component :is="tag.icon" :size="11" class="text-vermilion-500 shrink-0" />
                <span>{{ tag.label }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- ── Right Card: Dual-Tab Deck (Career Experience & Tech Stack) ── -->
        <div
          ref="skillsCardRef"
          class="washi-card p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full overflow-hidden"
        >
          <!-- Top Switcher Header (Career Experience vs Technical Proficiency) -->
          <div class="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div class="flex items-center gap-1.5 p-1 rounded-full bg-black border border-white/10">
              <button
                class="px-3.5 py-1 rounded-full text-xs font-serif font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                :class="activePanel === 'experience'
                  ? 'bg-vermilion-500 text-white shadow-sm font-semibold'
                  : 'text-base-400 hover:text-white'"
                @click="setPanel('experience')"
              >
                <Briefcase :size="12" />
                <span>Career Experience</span>
              </button>
              <button
                class="px-3.5 py-1 rounded-full text-xs font-serif font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                :class="activePanel === 'skills'
                  ? 'bg-vermilion-500 text-white shadow-sm font-semibold'
                  : 'text-base-400 hover:text-white'"
                @click="setPanel('skills')"
              >
                <Code2 :size="12" />
                <span>Technical Stack</span>
              </button>
            </div>

            <span class="hanko-stamp text-[0.6rem] !py-0.5 !px-2 font-serif">
              {{ activePanel === 'experience' ? 'CAREER' : 'STACK' }}
            </span>
          </div>

          <!-- ── Panel 1: Career Experience Timeline (From CV) ── -->
          <div
            v-if="activePanel === 'experience'"
            class="flex-1 overflow-y-auto no-scrollbar py-2 flex flex-col gap-4 pr-1.5"
          >
            <div
              v-for="exp in experiences"
              :key="exp.company"
              class="experience-item p-3.5 sm:p-4 rounded-xl border border-white/10 bg-black hover:border-white/20 transition-all duration-300 flex flex-col gap-2 group"
            >

              <!-- Top Row: Role Title, Status Badge & Clean Un-wrapped Date -->
              <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="text-sm sm:text-base font-display font-bold text-white leading-tight">
                    {{ exp.role }}
                  </h4>

                  <!-- Active Live Status Pill (Pure Black) -->
                  <span
                    v-if="exp.isCurrent"
                    class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black border border-white/20 text-[0.65rem] font-mono text-white shrink-0"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Current Role</span>
                  </span>

                  <!-- Milestone Badge (Pure Black) -->
                  <span
                    v-else-if="exp.badge"
                    class="px-2 py-0.5 rounded-full bg-black border border-white/20 text-[0.62rem] font-mono text-base-200 shrink-0"
                  >
                    {{ exp.badge }}
                  </span>
                </div>

                <!-- Clean, Un-wrapped Date -->
                <span class="text-xs font-mono text-base-400 shrink-0 whitespace-nowrap self-start sm:self-auto">
                  {{ exp.period }}
                </span>
              </div>

              <!-- Second Row: Company & Location -->
              <div class="flex items-center gap-2 text-xs font-serif">
                <span class="text-vermilion-400 font-medium tracking-wide">{{ exp.company }}</span>
                <span class="text-base-600">•</span>
                <span class="text-base-400 font-mono text-[0.72rem]">{{ exp.location }}</span>
              </div>

              <!-- Career Progression Breadcrumb (if applicable) -->
              <div
                v-if="exp.steps && exp.steps.length > 0"
                class="flex items-center gap-1.5 text-[0.68rem] font-mono py-1 px-2.5 rounded-lg bg-black border border-white/10 flex-wrap"
              >
                <span class="text-base-400 font-serif text-[0.62rem] uppercase tracking-wider">Career Track:</span>
                <template v-for="(step, sIdx) in exp.steps" :key="sIdx">
                  <span :class="sIdx === exp.steps.length - 1 ? 'text-white font-medium' : 'text-base-300'">
                    {{ step }}
                  </span>
                  <span v-if="sIdx < exp.steps.length - 1" class="text-vermilion-500 text-[0.65rem]">→</span>
                </template>
              </div>

              <!-- Narrative Description -->
              <p class="text-xs text-base-300 leading-relaxed">
                {{ exp.description }}
              </p>

              <!-- Bullet Points -->
              <ul class="flex flex-col gap-1 pt-0.5">
                <li
                  v-for="(detail, dIdx) in exp.details"
                  :key="dIdx"
                  class="text-[0.72rem] text-base-400 flex items-start gap-1.5 leading-snug"
                >
                  <span class="text-vermilion-500 font-bold shrink-0 mt-0.5">&bull;</span>
                  <span>{{ detail }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- ── Panel 2: Technical Stack & Competencies (From CV) ── -->
          <div
            v-else
            class="flex-1 overflow-y-auto no-scrollbar py-2 flex flex-col justify-between gap-3"
          >
            <!-- 2-Column Skill Meters -->
            <div class="grid grid-cols-2 gap-x-5 lg:gap-x-7 gap-y-3">
              <!-- Column 1 -->
              <div class="flex flex-col justify-between gap-2.5">
                <div
                  v-for="skill in skillsCol1"
                  :key="skill.name"
                  class="group flex flex-col gap-1"
                >
                  <div class="flex justify-between items-center text-xs">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <CheckCircle2 :size="11" class="text-vermilion-500 shrink-0" />
                      <span class="text-base-100 font-medium group-hover:text-white transition-colors truncate text-xs">
                        {{ skill.name }}
                      </span>
                    </div>
                    <span class="text-xs font-mono text-white font-semibold ml-1 shrink-0">
                      {{ skill.level }}%
                    </span>
                  </div>
                  <div class="power-meter-track !h-[5px]">
                    <div
                      class="power-meter-fill skill-bar-fill"
                      :style="{ width: `${skill.level}%` }"
                    />
                  </div>
                </div>
              </div>

              <!-- Column 2 -->
              <div class="flex flex-col justify-between gap-2.5">
                <div
                  v-for="skill in skillsCol2"
                  :key="skill.name"
                  class="group flex flex-col gap-1"
                >
                  <div class="flex justify-between items-center text-xs">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <CheckCircle2 :size="11" class="text-vermilion-500 shrink-0" />
                      <span class="text-base-100 font-medium group-hover:text-white transition-colors truncate text-xs">
                        {{ skill.name }}
                      </span>
                    </div>
                    <span class="text-xs font-mono text-white font-semibold ml-1 shrink-0">
                      {{ skill.level }}%
                    </span>
                  </div>
                  <div class="power-meter-track !h-[5px]">
                    <div
                      class="power-meter-fill skill-bar-fill"
                      :style="{ width: `${skill.level}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- CV Categorized Tech Pill Strips -->
            <div class="flex flex-col gap-2 pt-2 border-t border-white/5">
              <div
                v-for="grp in cvTools"
                :key="grp.label"
                class="flex flex-wrap items-center gap-1.5 text-[0.7rem]"
              >
                <span class="font-serif text-vermilion-400 font-medium w-20 shrink-0">{{ grp.label }}:</span>
                <span
                  v-for="item in grp.items"
                  :key="item"
                  class="px-2 py-0.5 rounded bg-black border border-white/10 text-base-200 font-mono text-[0.68rem]"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Philosophy Quote -->
          <div class="p-2.5 rounded-lg border border-white/5 bg-base-900/60 flex items-center gap-2.5 shrink-0 mt-2">
            <span class="text-vermilion-500 font-serif text-xs">◈</span>
            <p class="text-xs text-base-400 font-serif leading-tight">
              Committed to continuous growth, clean documentation, and writing code that endures.
            </p>
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