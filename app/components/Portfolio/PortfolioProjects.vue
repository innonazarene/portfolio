<script setup lang="ts">
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  ArrowUpRight,
} from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const categories = [
  { id: 'All',        label: 'All Works' },
  { id: 'Web App',    label: 'Web Applications' },
  { id: 'Mobile App', label: 'Mobile Applications' },
]

const activeFilter = ref('All')

const projectsData = [
  {
    id: 1,
    title: 'Pawurelove',
    category: 'Mobile App',
    description: 'Pawurelove is a dedicated iOS/Android mobile application designed for passionate dog lovers and pet parents.',
    techs: ['Flutter', 'Dart', 'Mobile UI'],
    folder: 'pawurelove',
    imageCount: 5,
    liveUrl: '#',
    repoUrl: 'https://github.com/innonazarene/pawurelove',
  },
  {
    id: 2,
    title: 'Altera Barangay / City App',
    category: 'Web App',
    description: 'Comprehensive barangay and city administrative suite with integrated disaster risk reduction management.',
    techs: ['Filament PHP', 'Laravel', 'MySQL', 'Tailwind', 'Livewire'],
    folder: 'altera',
    imageCount: 3,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 3,
    title: 'Tectonic Adventure Game',
    category: 'Mobile App',
    description: 'Gamified educational adventure where every interactive level teaches children geological and science concepts.',
    techs: ['G-Develop 5', 'Game Engine', 'Interactive'],
    folder: 'tectonic-adventures',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 4,
    title: 'Point Of Sale Suite',
    category: 'Web App',
    description: 'Highly configurable POS system empowering retailers and digital merchants with inventory and revenue analytics.',
    techs: ['Filament', 'Laravel', 'Livewire', 'Alpine.js', 'MySQL'],
    folder: 'point-of-sale',
    imageCount: 5,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 5,
    title: 'Algorand Perawallet Web3',
    category: 'Web App',
    description: 'Decentralized blockchain application interfacing with the Algorand API for crypto asset and wallet operations.',
    techs: ['Nuxt 3', 'Algorand SDK', 'Web3.js', 'TypeScript'],
    folder: 'algorand-perawallet',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 6,
    title: 'School Management System',
    category: 'Web App',
    description: 'End-to-end academic management system handling student lifecycle, transcripts, curriculum, and faculty records.',
    techs: ['Vue.js', 'Laravel', 'MySQL', 'Tailwind CSS'],
    folder: 'school-management',
    imageCount: 2,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 7,
    title: 'School Grading & Assessment',
    category: 'Web App',
    description: 'Dedicated evaluation and grading system engineered with fine-grained role permissions and automated report cards.',
    techs: ['Filament', 'Laravel', 'Livewire', 'Alpine.js'],
    folder: 'school-grading',
    imageCount: 4,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 8,
    title: 'Emphaty Telehealth Video Call',
    category: 'Web App',
    description: 'Secure mental health video platform connecting patients with licensed psychologists via encrypted WebRTC channels.',
    techs: ['Laravel', 'WebRTC', 'Socket.io', 'Tailwind CSS'],
    folder: 'emphaty',
    imageCount: 2,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 9,
    title: 'Woosoo Korean BBQ App',
    category: 'Mobile App',
    description: 'Real-time kitchen display, order tracking, and table booking system tailored for Korean BBQ restaurants.',
    techs: ['Nuxt 3', 'TypeScript', 'Tailwind CSS'],
    folder: 'woosoo',
    imageCount: 4,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 10,
    title: 'Sigma Accounting & Audit',
    category: 'Web App',
    description: 'Financial ledger, audit trail, and project expenditure monitoring platform under the Sigma enterprise umbrella.',
    techs: ['Nuxt 3', 'TypeScript', 'Tailwind CSS'],
    folder: 'sigma-accounting',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 11,
    title: 'Zen Interactive Portfolio',
    category: 'Web App',
    description: 'A modern Japanese-inspired interactive portfolio powered by Vue 3, Nuxt 4, Three.js 3D, and GSAP animations.',
    techs: ['Nuxt 4', 'Vue 3', 'Three.js', 'GSAP', 'Tailwind v4'],
    folder: 'portfolio',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 12,
    title: 'Finance Budgeting & Tracker',
    category: 'Web App',
    description: 'Smart personal wealth tracking tool with dynamic budget visualization, recurring charges, and expense analytics.',
    techs: ['Laravel', 'Inertia.js', 'Vue 3', 'TypeScript'],
    folder: 'finance-budget-tracker',
    imageCount: 11,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 13,
    title: 'Clinic Medical Records System',
    category: 'Web App',
    description: 'HIPAA-conscious clinic management solution covering electronic health records, queues, and pharmaceutical dispensing.',
    techs: ['Laravel', 'Inertia.js', 'Vue 3', 'Tailwind CSS'],
    folder: 'clinic-management-system',
    imageCount: 4,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 14,
    title: 'Barangay Bulletin Hub',
    category: 'Web App',
    description: 'Civic engagement portal for community announcements, emergency notifications, and document processing.',
    techs: ['Laravel', 'Inertia.js', 'Vue 3', 'TypeScript'],
    folder: 'barangay-bulletin',
    imageCount: 5,
    liveUrl: '#',
    repoUrl: '#',
  },
]

const getProjectImages = (folder: string, count: number = 5) => {
  const images: string[] = []
  for (let i = 1; i <= count; i++) {
    images.push(`/projects/${folder}/${i}.png`)
  }
  return images
}

const projects = ref(
  projectsData.map((project) => ({
    ...project,
    images: getProjectImages(project.folder, project.imageCount),
  }))
)

const currentImageIndex = ref<Record<number, number>>({})
const imageLoadErrors = ref<Record<string, boolean>>({})

projects.value.forEach((project) => {
  currentImageIndex.value[project.id] = 0
})

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects.value
    : projects.value.filter((p) => p.category === activeFilter.value)
)

const selectFilter = (catId: string) => {
  activeFilter.value = catId
  nextTick(() => {
    gsap.fromTo(
      '.project-card-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    )
  })
}

// Image carousel within a project card
const nextImage = (projectId: number, project: { images: string[] }) => {
  const validIndices = project.images
    .map((img: string, idx: number) => (isImageValid(img) ? idx : -1))
    .filter((idx: number) => idx !== -1)
  if (validIndices.length === 0) return
  const currentValidIndex = validIndices.indexOf(currentImageIndex.value[projectId] ?? 0)
  const nextValidIndex = (currentValidIndex + 1) % validIndices.length
  currentImageIndex.value[projectId] = validIndices[nextValidIndex] ?? 0
}

const prevImage = (projectId: number, project: { images: string[] }) => {
  const validIndices = project.images
    .map((img: string, idx: number) => (isImageValid(img) ? idx : -1))
    .filter((idx: number) => idx !== -1)
  if (validIndices.length === 0) return
  const currentValidIndex = validIndices.indexOf(currentImageIndex.value[projectId] ?? 0)
  const prevValidIndex = (currentValidIndex - 1 + validIndices.length) % validIndices.length
  currentImageIndex.value[projectId] = validIndices[prevValidIndex] ?? 0
}

const handleImageError = (imagePath: string) => {
  imageLoadErrors.value[imagePath] = true
}

const isImageValid = (imagePath: string) => {
  return !imageLoadErrors.value[imagePath]
}

const getValidImages = (project: { images: string[] }) => {
  return project.images.filter((img: string) => isImageValid(img))
}

// ScrollTrigger animation
const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionEl.value) return
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionEl.value,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          '.project-card-item',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
        )
      },
      once: true,
    })
  }, sectionEl.value)

  onUnmounted(() => {
    ctx.revert()
  })
})
</script>

<template>
  <section id="projects" ref="sectionEl" class="relative py-28 px-6 overflow-hidden">
    <!-- Section Content -->
    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="flex flex-col items-start gap-3">
          <span class="section-label">Selected Works</span>
          <h2 class="font-display text-3xl sm:text-5xl font-bold text-base-50 tracking-tight">
            Things I Have <span class="text-gradient-accent">Engineered</span>
          </h2>
          <p class="text-base-300 font-serif text-sm sm:text-base max-w-xl">
            A curated collection of web platforms, enterprise systems, and mobile applications engineered with precision.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2.5 self-start md:self-auto">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="px-5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border cursor-pointer"
            :class="
              activeFilter === cat.id
                ? 'bg-vermilion-500 text-white border-vermilion-500 shadow-[0_4px_16px_rgba(224,49,49,0.35)]'
                : 'border-gold-500/20 text-base-300 bg-base-900/60 backdrop-blur hover:border-gold-500/40 hover:text-base-100'
            "
            @click="selectFilter(cat.id)"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- ═════════════════════════════════════════════════════════════
           PROJECTS GRID (Staggered Responsive Cards)
           ═════════════════════════════════════════════════════════════ -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card-item washi-card group flex flex-col overflow-hidden border border-gold-500/15 hover:border-vermilion-500/50 hover:shadow-[0_8px_30px_rgba(224,49,49,0.15)] transition-all duration-300 -translate-y-0 hover:-translate-y-1"
        >
          <!-- Preview with object-contain and fitted padding -->
          <div class="relative h-48 sm:h-52 overflow-hidden bg-base-950/90 border-b border-gold-500/10 flex items-center justify-center p-3">
            <div class="relative w-full h-full flex items-center justify-center">
              <template v-for="(image, imgIndex) in project.images" :key="imgIndex">
                <NuxtImg
                  v-if="isImageValid(image)"
                  :src="image"
                  :alt="`${project.title} screenshot ${imgIndex + 1}`"
                  class="absolute inset-0 m-auto max-w-full max-h-full object-contain drop-shadow-md rounded transition-opacity duration-500"
                  :class="currentImageIndex[project.id] === imgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'"
                  loading="lazy"
                  @error="handleImageError(image)"
                />
              </template>

              <!-- Fallback when no preview is available -->
              <div
                v-if="getValidImages(project).length === 0"
                class="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-base-900 to-base-950"
              >
                <div class="text-center">
                  <FolderKanban :size="26" class="mx-auto mb-2 text-base-600" />
                  <span class="text-base-500 text-xs font-serif block">Preview Pending</span>
                </div>
              </div>
            </div>

            <!-- Arrows if multiple screenshots -->
            <button
              v-if="getValidImages(project).length > 1"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-base-950/80 backdrop-blur hover:bg-vermilion-500 text-base-100 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-[2] cursor-pointer"
              aria-label="Previous image"
              @click.stop="prevImage(project.id, project)"
            >
              <ChevronLeft :size="15" />
            </button>
            <button
              v-if="getValidImages(project).length > 1"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-base-950/80 backdrop-blur hover:bg-vermilion-500 text-base-100 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-[2] cursor-pointer"
              aria-label="Next image"
              @click.stop="nextImage(project.id, project)"
            >
              <ChevronRight :size="15" />
            </button>

            <!-- Category Badge -->
            <div
              class="absolute top-3 right-3 flex items-center gap-1.5 bg-base-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/20 text-gold-400 text-[0.65rem] font-serif z-[2]"
            >
              <span>{{ project.category }}</span>
            </div>
          </div>

          <!-- Card Details -->
          <div class="flex flex-col gap-3 p-6 flex-1 relative z-[2]">
            <h3
              class="text-base-50 font-display font-bold text-base sm:text-lg group-hover:text-sakura-300 transition-colors duration-300"
            >
              {{ project.title }}
            </h3>
            <p class="text-base-300 text-xs sm:text-[0.82rem] leading-relaxed flex-1 font-body">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
              <span
                v-for="tech in project.techs"
                :key="tech"
                class="bg-white/[0.04] text-base-300 text-[0.65rem] px-2.5 py-0.5 rounded-full border border-white/5"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Card Links -->
          <div class="flex items-center justify-between px-6 py-3.5 border-t border-gold-500/10 bg-base-950/40 relative z-[2]">
            <a
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-300 hover:text-vermilion-400 text-xs font-serif transition-colors"
            >
              <ArrowUpRight :size="13" />
              <span>Live Demo</span>
            </a>
            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-300 hover:text-gold-300 text-xs font-serif transition-colors"
            >
              <span>Source Code</span>
              <ExternalLink :size="12" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>