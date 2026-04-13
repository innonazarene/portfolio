<script setup lang="ts">
import { ExternalLink, ChevronLeft, ChevronRight, Layers } from 'lucide-vue-next'

const categories = ['All', 'Web App', 'Mobile App']

const activeFilter = ref('All')
const projectsData = [
  {
    id: 1,
    title: 'Altera Barangay / City App',
    category: 'Web App',
    description: 'Barangay and city management system for disaster risk reduction management.',
    techs: ['Filamentphp', 'Laravel', 'Mysql', 'Tailwind', 'Livewire'],
    folder: 'altera',
    imageCount: 3,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 2,
    title: 'Tectonic Adventure Game',
    category: 'Mobile App',
    description: 'Educational adventure game where each level provides learning experiences for children.',
    techs: ['G-develop 5', 'No-Coding'],
    folder: 'tectonic-adventures',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 3,
    title: 'Point Of Sale',
    category: 'Web App',
    description: 'Flexible and customizable point of sale system for businesses selling physical and digital products.',
    techs: ['Filament', 'Laravel', 'Livewire', 'PHP', 'Alpine JS'],
    folder: 'point-of-sale',
    imageCount: 5,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 4,
    title: 'Algorand Perawallet Web 3',
    category: 'Web App',
    description: 'Web3 application integrating with Algorand blockchain API for cryptocurrency wallet management.',
    techs: ['nuxt 3', 'Algorand SDK', 'Web3.js', 'TypeScript', 'Javascript'],
    folder: 'algorand-perawallet',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 5,
    title: 'School Management System',
    category: 'Web App',
    description: 'Comprehensive school management system for administrative tasks and student records, grading system, curriculum, and more.',
    techs: ['vuejs', 'Laravel', 'Mysql', 'Tailwind', 'Codeigniter'],
    folder: 'school-management',
    imageCount: 2,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 6,
    title: 'School Grading System',
    category: 'Web App',
    description: 'Dedicated grading and assessment system separate from the main school management system.',
    techs: ['Filament', 'Laravel', 'Livewire', 'PHP', 'Alpine JS'],
    folder: 'school-grading',
    imageCount: 4,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 7,
    title: 'Emphaty Video Call App',
    category: 'Web App',
    description: 'Mental health support platform connecting individuals experiencing depression with psychologists and counselors via video call.',
    techs: ['Laravel', 'WebRTC', 'Socket.io', 'Livewire', 'Tailwind'],
    folder: 'emphaty',
    imageCount: 2,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 8,
    title: 'Woosoo Web App',
    category: 'Mobile App',
    description: 'Restaurant management system for Sangyup Korean BBQ operations.',
    techs: ['Nuxt 3', 'Javascript', 'Tailwind', 'TypeScript'],
    folder: 'woosoo',
    imageCount: 4,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 9,
    title: 'Sigma Accounting System',
    category: 'Web App',
    description: 'Project monitoring and accounting system as part of the Sigma project suite.',
    techs: ['Nuxt 3', 'Javascript', 'Tailwind', 'TypeScript'],
    folder: 'sigma-accounting',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 10,
    title: 'My Portfolio',
    category: 'Web App',
    description: 'A portfolio website built with Vue 3 and Nuxt.',
    techs: ['Vue 3', 'Nuxt 4', 'Tailwind', 'TypeScript'],
    folder: 'portfolio',
    imageCount: 1,
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

const nextImage = (projectId: number, project: {images: string[]}) => {
  const validIndices = project.images
    .map((img: string, idx: number) => isImageValid(img) ? idx : -1)
    .filter((idx: number) => idx !== -1)
  if (validIndices.length === 0) return
  const currentValidIndex = validIndices.indexOf(currentImageIndex.value[projectId] ?? 0)
  const nextValidIndex = (currentValidIndex + 1) % validIndices.length
  currentImageIndex.value[projectId] = validIndices[nextValidIndex] ?? 0
}

const prevImage = (projectId: number, project: {images: string[]}) => {
  const validIndices = project.images
    .map((img: string, idx: number) => isImageValid(img) ? idx : -1)
    .filter((idx: number) => idx !== -1)
  if (validIndices.length === 0) return
  const currentValidIndex = validIndices.indexOf(currentImageIndex.value[projectId] ?? 0)
  const prevValidIndex = (currentValidIndex - 1 + validIndices.length) % validIndices.length
  currentImageIndex.value[projectId] = validIndices[prevValidIndex] ?? 0
}

const goToImage = (projectId: number, index: number, project: { images: string[] }) => {
  if (isImageValid(project.images[index] ?? '')) {
    currentImageIndex.value[projectId] = index
  }
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

// ── 3D tilt effect ──
function onCardMouseMove(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  const rotateY = (x - 0.5) * 8
  const rotateX = (y - 0.5) * -8
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  card.style.setProperty('--glow-x', `${x * 100}%`)
  card.style.setProperty('--glow-y', `${y * 100}%`)
}

function onCardMouseLeave(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  card.style.transform = ''
}

// ── scroll reveal ──
const sectionVisible = ref(false)
const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        sectionVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.08 }
  )
  if (sectionEl.value) observer.observe(sectionEl.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <section id="projects" ref="sectionEl" class="relative py-28 px-6 overflow-hidden">
    <!-- grid bg -->
    <div class="absolute inset-0 grid-bg opacity-30" />

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- header -->
      <span class="section-label mb-4 inline-flex">Projects</span>
      <h2 class="font-display text-3xl sm:text-5xl font-bold text-base-50 leading-tight mb-3">
        Things I've <span class="text-gradient-accent">built</span>
      </h2>
      <p class="text-base-400 max-w-xl mb-10 text-sm">
        A curated selection of projects — each one a learning adventure.
      </p>

      <!-- filter pills -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-1.5 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.15em] transition-all duration-300 border cursor-pointer"
          :class="
            activeFilter === cat
              ? 'bg-accent-400 text-base-950 border-accent-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
              : 'border-base-700 text-base-400 hover:border-accent-400/40 hover:text-base-200'
          "
          @click="activeFilter = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          class="glass-card group flex flex-col overflow-hidden transition-all duration-[400ms] will-change-transform"
          style="--glow-x: 50%; --glow-y: 50%;"
          :style="{
            transitionDelay: sectionVisible ? `${i * 70}ms` : '0ms',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
          }"
          @mousemove="onCardMouseMove"
          @mouseleave="onCardMouseLeave"
        >
          <!-- interactive glow that follows cursor -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-[1]"
            style="background: radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(0,229,255,0.1), transparent 50%);"
          />

          <!-- image carousel -->
          <div class="relative h-48 overflow-hidden bg-base-900 img-scanline">
            <!-- images -->
            <div class="relative w-full h-full">
              <template v-for="(image, imgIndex) in project.images" :key="imgIndex">
                <NuxtImg
                  v-if="isImageValid(image)"
                  :src="image"
                  :alt="`${project.title} screenshot ${imgIndex + 1}`"
                  class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  :class="currentImageIndex[project.id] === imgIndex ? 'opacity-100' : 'opacity-0'"
                  loading="lazy"
                  @error="handleImageError(image)"
                />
              </template>
              <!-- Fallback if no valid images -->
              <div
                v-if="getValidImages(project).length === 0"
                class="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-base-800 to-base-900"
              >
                <div class="text-center">
                  <Layers :size="24" class="mx-auto mb-2 text-base-600" />
                  <span class="text-base-500 text-xs font-mono block">No preview</span>
                </div>
              </div>
            </div>

            <!-- navigation arrows -->
            <button
              v-if="getValidImages(project).length > 1"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-base-950/70 backdrop-blur hover:bg-base-900 text-accent-400 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-[2]"
              @click.stop="prevImage(project.id, project)"
            >
              <ChevronLeft :size="14" />
            </button>
            <button
              v-if="getValidImages(project).length > 1"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-base-950/70 backdrop-blur hover:bg-base-900 text-accent-400 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-[2]"
              @click.stop="nextImage(project.id, project)"
            >
              <ChevronRight :size="14" />
            </button>

            <!-- dots indicator -->
            <div
              v-if="getValidImages(project).length > 1"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]"
            >
              <a
                v-for="(image, imgIndex) in project.images"
                v-show="isImageValid(image)"
                :key="imgIndex"
                class="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                :class="
                  currentImageIndex[project.id] === imgIndex
                    ? 'bg-accent-400 w-5 shadow-[0_0_6px_rgba(0,229,255,0.5)]'
                    : 'bg-white/30 hover:bg-white/50'
                "
                @click.stop="goToImage(project.id, imgIndex, project)"
              />
            </div>

            <!-- category tag -->
            <span
              class="absolute top-3 right-3 bg-base-950/70 backdrop-blur text-accent-400 text-[0.6rem] font-mono px-2.5 py-1 rounded-full border border-accent-400/15 z-[2]"
            >
              {{ project.category }}
            </span>
          </div>

          <!-- content -->
          <div class="flex flex-col gap-3 p-5 flex-1 relative z-[2]">
            <h3
              class="text-base-50 font-display font-semibold text-base group-hover:text-accent-400 transition-colors duration-300"
            >
              {{ project.title }}
            </h3>
            <p class="text-base-400 text-xs leading-relaxed flex-1">
              {{ project.description }}
            </p>

            <!-- tech tags -->
            <div class="flex flex-wrap gap-1.5 mt-auto">
              <span
                v-for="tech in project.techs"
                :key="tech"
                class="bg-accent-400/[0.06] text-accent-300/70 text-[0.6rem] font-mono px-2 py-0.5 rounded border border-accent-400/10"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- links row -->
          <div class="flex items-center justify-between px-5 py-3.5 border-t border-accent-400/[0.06] relative z-[2]">
            <a
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-400 hover:text-accent-400 text-xs font-mono transition-colors"
            >
              <ExternalLink :size="12" />
              Live Demo
            </a>
            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-400 hover:text-secondary-300 text-xs font-mono transition-colors"
            >
              Source Code
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>