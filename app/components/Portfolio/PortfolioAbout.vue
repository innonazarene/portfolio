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
  Github,
  GitCommitHorizontal,
  GitPullRequest,
  MessageCircle,
  SearchCheck,
} from 'lucide-vue-next'
import gsap from 'gsap'
import githubContributions from '~/data/github-contributions.json'

const { currentTab } = usePortfolioNavigation()

const activePanel = ref<'experience' | 'skills' | 'github'>('experience')

const setPanel = (panel: 'experience' | 'skills' | 'github') => {
  activePanel.value = panel
  nextTick(() => {
    if (panel === 'skills') {
      gsap.fromTo(
        '.skill-bar-fill',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', stagger: 0.03 }
      )
    } else if (panel === 'experience') {
      gsap.fromTo(
        '.experience-item',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      )
    } else {
      gsap.fromTo(
        '.github-activity-item',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power3.out' }
      )
      if (heatmapScrollRef.value && window.innerWidth < 1024) heatmapScrollRef.value.scrollLeft = heatmapScrollRef.value.scrollWidth
      else if (heatmapScrollRef.value) heatmapScrollRef.value.scrollLeft = 0
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
    company: 'Independent AI Systems & Consulting',
    role: 'AI Systems Engineer / Consultant',
    period: '2020 – Present',
    location: 'Butuan City, Philippines',
    isCurrent: false,
    badge: 'Agentic AI',
    steps: null,
    description: 'Design and operate agentic AI systems and automation workflows alongside ongoing full-stack client work.',
    details: [
      'Build LLM tool-use and MCP servers; orchestrate agents with Claude Code and Hermes.',
      'Serve and route local LLMs and automate workflows with scheduled jobs and webhooks.',
    ],
  },
]

// Technical proficiency categories from CV
const skillsCol1 = [
  { name: 'PHP & Laravel',       level: 95, exp: 'Primary', category: 'Backend' },
  { name: 'React.js',            level: 90, exp: 'Advanced', category: 'Frontend' },
  { name: 'Vue.js / Nuxt 4',     level: 90, exp: 'Expert', category: 'Frontend' },
  { name: 'TypeScript',           level: 88, exp: '3 yrs', category: 'Core' },
  { name: 'Tailwind CSS',        level: 92, exp: 'Expert', category: 'UI' },
]

const skillsCol2 = [
  { name: 'SQL & Database Design', level: 90, exp: 'Primary', category: 'Data' },
  { name: 'REST API Architecture', level: 94, exp: 'Architect', category: 'APIs' },
  { name: 'Filament PHP / Livewire', level: 85, exp: 'Specialist', category: 'Full-Stack' },
  { name: 'Git, GitHub & CI/CD',   level: 88, exp: 'Proficient', category: 'DevOps' },
  { name: 'AI & Agentic Systems',  level: 85, exp: 'Architect', category: 'AI' },
]

const cvTools = [
  { label: 'Languages', items: ['PHP', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'] },
  { label: 'Frameworks', items: ['Laravel', 'React.js', 'Vue.js', 'Nuxt 4', 'Tailwind CSS', 'CodeIgniter'] },
  { label: 'Practices', items: ['REST API Design', 'Database Schema', 'CI/CD', 'Git/GitHub', 'Responsive UI'] },
  { label: 'AI & Agentic', items: ['LLM APIs', 'MCP Servers', 'Claude Code', 'Agent Orchestration', 'Prompt Engineering', 'Model Routing', 'Local LLM Serving'] },
]

const highlights = [
  { icon: Building2,      label: 'Gov & Enterprise Systems' },
  { icon: Code2,          label: 'REST API & DB Architecture' },
  { icon: Rocket,         label: 'Promoted 2x to Architect' },
  { icon: GraduationCap,  label: 'BS Computer Science' },
  { icon: Zap,            label: 'AI & Agentic Systems' },
]

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Real GitHub contribution calendar, refreshed at build time by scripts/fetch-github-contributions.mjs
const contributionDays = githubContributions.contributions as { date: string, count: number, level: number }[]
const contributionTotal = githubContributions.total as number

// Group days into week columns (Sunday first), padding the first column so rows line up with weekdays
const contributionWeeks = (() => {
  const weeks: ({ date: string, count: number, level: number } | null)[][] = []
  let current: ({ date: string, count: number, level: number } | null)[] = []
  const firstDow = new Date(`${contributionDays[0]?.date}T00:00:00Z`).getUTCDay()
  for (let i = 0; i < firstDow; i++) current.push(null)
  for (const day of contributionDays) {
    current.push(day)
    if (current.length === 7) {
      weeks.push(current)
      current = []
    }
  }
  if (current.length) {
    while (current.length < 7) current.push(null)
    weeks.push(current)
  }
  return weeks
})()

// Month labels sit above the first week column that starts that month
const contributionMonths = (() => {
  const labels: { label: string, start: number }[] = []
  let lastMonth = -1
  contributionWeeks.forEach((week, idx) => {
    const first = week.find(Boolean)
    if (!first) return
    const m = new Date(`${first.date}T00:00:00Z`).getUTCMonth()
    if (m !== lastMonth) {
      if (!labels.length || idx - labels[labels.length - 1]!.start >= 3) labels.push({ label: monthNames[m]!, start: idx })
      lastMonth = m
    }
  })
  return labels
})()

const contributionTone = (level: number) => [
  'bg-base-800/80 border-white/[0.03]',
  'bg-emerald-950 border-emerald-900/40',
  'bg-emerald-800 border-emerald-700/40',
  'bg-emerald-600 border-emerald-500/40',
  'bg-emerald-400 border-emerald-300/50',
][level] ?? 'bg-base-800/80 border-white/[0.03]'

const githubRepos = ['cictd-isds/chrmd-api', 'cictd-isds/chrmd-web', 'innonazarene/farmlync']

const activityStats = [
  { label: 'Commits', value: 64, icon: GitCommitHorizontal },
  { label: 'Code review', value: 21, icon: SearchCheck },
  { label: 'Pull requests', value: 12, icon: GitPullRequest },
  { label: 'Issues', value: 3, icon: MessageCircle },
]

const heatmapScrollRef = ref<HTMLElement | null>(null)
const bioCardRef = ref<HTMLElement | null>(null)
const skillsCardRef = ref<HTMLElement | null>(null)
const animated = ref(false)

const playAnimation = () => {
  if (animated.value) return
  animated.value = true

  gsap.fromTo(
    bioCardRef.value,
    { x: -18 },
    { x: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform' }
  )

  gsap.fromTo(
    skillsCardRef.value,
    { x: 18 },
    { x: 0, duration: 0.45, ease: 'power3.out', delay: 0.08, clearProps: 'transform' }
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
    class="relative w-full min-h-full md:h-full flex flex-col justify-between overflow-visible md:overflow-hidden"
  >
    <div class="max-w-6xl w-full mx-auto relative z-10 flex flex-col justify-between md:h-full gap-3 sm:gap-4">
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
      <div class="grid lg:grid-cols-[1fr_1.15fr] gap-4 lg:gap-6 items-stretch flex-1 md:min-h-0">
        <!-- ── Left Card: Bio, Education & Alma Mater ── -->
        <div
          ref="bioCardRef"
          class="washi-card p-4 sm:p-5 lg:p-6 flex flex-col justify-between md:h-full md:overflow-y-auto no-scrollbar gap-3"
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
              <h3 class="text-sm sm:text-lg lg:text-xl font-katsuno font-normal tracking-wide text-base-50 leading-snug sm:whitespace-nowrap mb-1 sm:mb-1.5">
                Rustom Ramos Pedales Jr.
              </h3>
              <p class="text-xs sm:text-sm font-serif flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span class="text-vermilion-400 font-medium">AI Systems Architect</span>
                <span class="text-base-500">•</span>
                <span class="text-base-300">Full-Stack Engineer</span>
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
              AI Systems Architect &amp; full-stack engineer who designs and builds AI-native, agentic systems end to end, on a deep foundation of
              <strong class="text-base-100 font-medium">Laravel, React.js, Vue.js, Nuxt 4, and TypeScript</strong>.
            </p>
            <p>
              Owns architecture from database schema through deployment, and works hands-on with <strong class="text-base-100 font-medium">LLM tool use, MCP servers, agent orchestration (Claude Code, Hermes), and local model serving</strong>. Advanced from junior developer to Application Architect within five years.
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
          class="washi-card p-4 sm:p-5 lg:p-6 flex flex-col justify-between md:h-full md:overflow-hidden"
        >
          <!-- Top Switcher Header (Career Experience vs Technical Proficiency) -->
          <div class="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div class="flex items-center gap-1.5 p-1 rounded-full bg-black border border-white/10 overflow-x-auto no-scrollbar max-w-full">
              <button
                class="px-3 sm:px-3.5 py-1 rounded-full text-xs font-serif font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                :class="activePanel === 'experience'
                  ? 'bg-vermilion-500 text-white shadow-sm font-semibold'
                  : 'text-base-400 hover:text-white'"
                @click="setPanel('experience')"
              >
                <Briefcase :size="12" />
                <span>Career Experience</span>
              </button>
              <button
                class="px-3 sm:px-3.5 py-1 rounded-full text-xs font-serif font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                :class="activePanel === 'skills'
                  ? 'bg-vermilion-500 text-white shadow-sm font-semibold'
                  : 'text-base-400 hover:text-white'"
                @click="setPanel('skills')"
              >
                <Code2 :size="12" />
                <span>Technical Stack</span>
              </button>
              <button
                class="px-3 sm:px-3.5 py-1 rounded-full text-xs font-serif font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                :class="activePanel === 'github'
                  ? 'bg-vermilion-500 text-white shadow-sm font-semibold'
                  : 'text-base-400 hover:text-white'"
                @click="setPanel('github')"
              >
                <Github :size="12" />
                <span>GitHub Activity</span>
              </button>
            </div>

            <span class="hanko-stamp text-[0.6rem] !py-0.5 !px-2 font-serif">
              {{ activePanel === 'experience' ? 'CAREER' : activePanel === 'skills' ? 'STACK' : 'GITHUB' }}
            </span>
          </div>

          <!-- ── Panel 1: Career Experience Timeline (From CV) ── -->
          <div
            v-if="activePanel === 'experience'"
            class="flex-1 md:overflow-y-auto no-scrollbar py-2 flex flex-col gap-4 pr-1.5"
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
            v-else-if="activePanel === 'skills'"
            class="flex-1 md:overflow-y-auto no-scrollbar py-2 flex flex-col justify-between gap-3"
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

          <!-- ── Panel 3: GitHub Contribution Activity ── -->
          <div
            v-else
            class="flex-1 md:overflow-y-auto no-scrollbar py-2 flex flex-col gap-4"
          >
            <div class="github-activity-item rounded-xl border border-white/10 bg-black p-3.5 sm:p-4 flex flex-col gap-3">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                <div>
                  <h4 class="text-sm sm:text-base font-display font-bold text-white">
                    {{ contributionTotal.toLocaleString() }} contributions in the last year
                  </h4>
                  <p class="text-[0.7rem] text-base-400 font-serif mt-0.5">
                    Live from GitHub, refreshed on every deploy.
                  </p>
                </div>
                <a
                  href="https://github.com/innonazarene"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-serif text-base-300 hover:text-white transition-colors"
                >
                  <Github :size="14" />
                  <span>@innonazarene</span>
                </a>
              </div>

              <div ref="heatmapScrollRef" class="relative overflow-x-auto no-scrollbar pb-1">
                <div class="min-w-[560px] lg:min-w-0">
                  <div class="relative h-5 ml-9 mb-1">
                    <span
                      v-for="month in contributionMonths"
                      :key="month.label"
                      class="absolute text-[0.65rem] font-serif text-base-300"
                      :style="{ left: `${(month.start / contributionWeeks.length) * 100}%` }"
                    >
                      {{ month.label }}
                    </span>
                  </div>
                  <div class="flex gap-2">
                    <div class="w-7 shrink-0 grid grid-rows-7 gap-0.5 text-[0.62rem] font-serif text-base-300 leading-3">
                      <span />
                      <span>Mon</span>
                      <span />
                      <span>Wed</span>
                      <span />
                      <span>Fri</span>
                      <span />
                    </div>
                    <div
                      class="grid flex-1 gap-0.5"
                      :style="{ gridTemplateColumns: `repeat(${contributionWeeks.length}, minmax(0, 1fr))` }"
                    >
                      <div
                        v-for="(week, weekIdx) in contributionWeeks"
                        :key="weekIdx"
                        class="grid grid-rows-7 gap-0.5"
                      >
                        <span
                          v-for="(day, dayIdx) in week"
                          :key="`${weekIdx}-${dayIdx}`"
                          class="aspect-square w-full rounded-[2px] border"
                          :class="day ? contributionTone(day.level) : 'border-transparent'"
                          :title="day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center justify-end gap-1.5 text-[0.68rem] font-serif text-base-400">
                    <span>Less</span>
                    <span
                      v-for="level in [0, 1, 2, 3, 4]"
                      :key="level"
                      class="h-2 w-2 rounded-[2px] border"
                      :class="contributionTone(level)"
                    />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-[1fr_1.05fr] gap-4 github-activity-item">
              <div class="rounded-xl border border-white/10 bg-black p-3.5 sm:p-4 flex flex-col gap-3">
                <h4 class="text-sm font-display font-bold text-white">
                  Activity overview
                </h4>
                <div class="flex items-start gap-3">
                  <Github :size="20" class="text-base-400 mt-0.5 shrink-0" />
                  <p class="text-xs sm:text-sm text-base-200 leading-relaxed">
                    Contributed to
                    <template v-for="(repo, repoIdx) in githubRepos" :key="repo">
                      <a
                        :href="`https://github.com/${repo}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-vermilion-400 hover:text-white font-semibold transition-colors"
                      >{{ repo }}</a><span v-if="repoIdx < githubRepos.length - 1">, </span>
                    </template>
                    and 47 other repositories.
                  </p>
                </div>
              </div>

              <div class="rounded-xl border border-white/10 bg-black p-3.5 sm:p-4 relative min-h-[190px] overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center opacity-85">
                  <svg viewBox="0 0 240 170" class="w-full max-w-[280px] h-full text-emerald-400" aria-hidden="true">
                    <line x1="120" y1="18" x2="120" y2="152" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                    <line x1="35" y1="85" x2="205" y2="85" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                    <polygon points="35,85 120,58 120,112" fill="currentColor" opacity="0.42" />
                    <circle cx="35" cy="85" r="5" fill="black" stroke="currentColor" stroke-width="3" />
                    <circle cx="120" cy="58" r="5" fill="black" stroke="currentColor" stroke-width="3" />
                    <circle cx="120" cy="85" r="5" fill="black" stroke="currentColor" stroke-width="3" />
                    <circle cx="120" cy="112" r="5" fill="black" stroke="currentColor" stroke-width="3" />
                  </svg>
                </div>
                <div class="relative h-full min-h-[190px]">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-center">
                    <span class="text-lg font-mono text-base-200">64%</span>
                    <span class="block text-[0.68rem] text-base-400 font-serif">Commits</span>
                  </div>
                  <div class="absolute left-1/2 -translate-x-1/2 top-1 text-center">
                    <span class="text-lg font-mono text-base-200">21%</span>
                    <span class="block text-[0.68rem] text-base-400 font-serif">Code review</span>
                  </div>
                  <div class="absolute left-1/2 -translate-x-1/2 bottom-1 text-center">
                    <span class="text-lg font-mono text-base-200">12%</span>
                    <span class="block text-[0.68rem] text-base-400 font-serif">Pull requests</span>
                  </div>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-center">
                    <span class="text-lg font-mono text-base-200">3%</span>
                    <span class="block text-[0.68rem] text-base-400 font-serif">Issues</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="github-activity-item grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div
                v-for="stat in activityStats"
                :key="stat.label"
                class="rounded-xl border border-white/10 bg-black p-3 flex items-center gap-2"
              >
                <component :is="stat.icon" :size="15" class="text-emerald-400 shrink-0" />
                <div>
                  <span class="block text-sm font-mono text-white">{{ stat.value }}%</span>
                  <span class="block text-[0.62rem] font-serif text-base-400">{{ stat.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Philosophy Quote -->
          <div v-if="activePanel !== 'github'" class="p-2.5 rounded-lg border border-white/5 bg-base-900/60 flex items-center gap-2.5 shrink-0 mt-2">
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