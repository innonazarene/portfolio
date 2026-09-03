<script setup lang="ts">
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  ArrowUpRight,
  X,
  Maximize2,
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
    imageCount: 10,
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
    title: 'eClinic Medical Records System',
    category: 'Web App',
    description: 'HIPAA-conscious clinic management solution covering electronic health records, patient queues, and pharmaceutical dispensing.',
    techs: ['Laravel', 'Inertia.js', 'Vue 3', 'Tailwind CSS'],
    folder: 'clinic-management-system',
    imageCount: 8,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 14,
    title: 'Barangay Bulletin Hub',
    category: 'Web App',
    description: 'Civic engagement portal for community announcements, emergency notifications, and document processing.',
    techs: ['Laravel', 'Inertia.js', 'ReactJS', 'TypeScript'],
    folder: 'barangay-bulletin',
    imageCount: 5,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 15,
    title: 'Procurement & Purchase Order System',
    category: 'Web App',
    description: 'Enterprise procurement management system streamlining purchase orders, canvassing, vendor price quotations, and requisition workflows.',
    techs: ['Laravel', 'ReactJS', 'Inertia.js', 'MySQL', 'Tailwind CSS'],
    folder: 'procurement',
    imageCount: 6,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 16,
    title: 'Authorix Institutional Gateway',
    category: 'Web App',
    description: 'Campus access control, institutional turnstile authorization, and identity verification portal deployed on Laravel Cloud.',
    techs: ['Laravel', 'PHP', 'Inertia.js', 'Laravel Cloud'],
    folder: 'authorix',
    imageCount: 12,
    liveUrl: 'https://authorix-production-jauksa.laravel.cloud/',
    repoUrl: '#',
  },
  {
    id: 17,
    title: 'CHRMS Human Resource Portal',
    category: 'Web App',
    description: 'Comprehensive Human Resource Management System overseeing organizational personnel records, service records, leave credits, and compliance analytics.',
    techs: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'ReactJS', 'API', 'Back-end', 'Front-end'],
    folder: 'chrms',
    imageCount: 1,
    liveUrl: '#',
    repoUrl: '#',
  },
]

interface ProjectItem {
  id: number
  title: string
  category: string
  description: string
  techs: string[]
  folder: string
  imageCount: number
  liveUrl: string
  repoUrl: string
  images: string[]
}

const getProjectImages = (folder: string, count: number = 5) => {
  const images: string[] = []
  for (let i = 1; i <= count; i++) {
    images.push(`/projects/${folder}/${i}.png`)
  }
  return images
}

const projects = ref<ProjectItem[]>(
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

// ═════════════════════════════════════════════════════════════
// PROJECT DETAIL & SWIPEABLE GALLERY MODAL
// ═════════════════════════════════════════════════════════════
const selectedModalProject = ref<ProjectItem | null>(null)
const modalImageIndex = ref(0)
const isModalOpen = ref(false)

let touchStartX = 0
let touchEndX = 0

const openModal = (project: ProjectItem) => {
  selectedModalProject.value = project
  modalImageIndex.value = currentImageIndex.value[project.id] ?? 0
  isModalOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  isModalOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const modalNextImage = () => {
  if (!selectedModalProject.value) return
  const count = selectedModalProject.value.images.length
  if (count <= 1) return
  modalImageIndex.value = (modalImageIndex.value + 1) % count
}

const modalPrevImage = () => {
  if (!selectedModalProject.value) return
  const count = selectedModalProject.value.images.length
  if (count <= 1) return
  modalImageIndex.value = (modalImageIndex.value - 1 + count) % count
}

const modalNextProject = () => {
  if (!selectedModalProject.value) return
  const currentIdx = filteredProjects.value.findIndex(p => p.id === selectedModalProject.value?.id)
  if (currentIdx === -1) return
  const nextIdx = (currentIdx + 1) % filteredProjects.value.length
  const nextP = filteredProjects.value[nextIdx]
  if (nextP) {
    selectedModalProject.value = nextP
    modalImageIndex.value = 0
  }
}

const modalPrevProject = () => {
  if (!selectedModalProject.value) return
  const currentIdx = filteredProjects.value.findIndex(p => p.id === selectedModalProject.value?.id)
  if (currentIdx === -1) return
  const prevIdx = (currentIdx - 1 + filteredProjects.value.length) % filteredProjects.value.length
  const prevP = filteredProjects.value[prevIdx]
  if (prevP) {
    selectedModalProject.value = prevP
    modalImageIndex.value = 0
  }
}

// Touch swipe gestures
const onTouchStart = (e: TouchEvent) => {
  const touch = e.changedTouches[0]
  if (touch) {
    touchStartX = touch.screenX
  }
}

const onTouchEnd = (e: TouchEvent) => {
  const touch = e.changedTouches[0]
  if (touch) {
    touchEndX = touch.screenX
    handleSwipe()
  }
}

const handleSwipe = () => {
  const swipeThreshold = 50
  if (touchEndX < touchStartX - swipeThreshold) {
    modalNextImage()
  } else if (touchEndX > touchStartX + swipeThreshold) {
    modalPrevImage()
  }
}

// Keyboard shortcuts for modal
const onKeyDown = (e: KeyboardEvent) => {
  if (!isModalOpen.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') modalNextImage()
  if (e.key === 'ArrowLeft') modalPrevImage()
}

// ScrollTrigger animation
const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)

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
    window.removeEventListener('keydown', onKeyDown)
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
            A curated collection of web platforms, enterprise systems, and mobile applications engineered with precision. Click any project to open full details.
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
          class="project-card-item washi-card group flex flex-col overflow-hidden border border-gold-500/15 hover:border-vermilion-500/50 hover:shadow-[0_8px_30px_rgba(224,49,49,0.15)] transition-all duration-300 -translate-y-0 hover:-translate-y-1 cursor-pointer"
          @click="openModal(project)"
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

            <!-- Category Badge & Click Hint -->
            <div
              class="absolute top-3 right-3 flex items-center gap-1.5 bg-base-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/20 text-gold-400 text-[0.65rem] font-serif z-[2]"
            >
              <span>{{ project.category }}</span>
            </div>

            <div
              class="absolute bottom-2 left-3 flex items-center gap-1 text-[0.65rem] font-serif text-base-400 opacity-0 group-hover:opacity-100 transition-opacity z-[2]"
            >
              <Maximize2 :size="11" />
              <span>Click to view details</span>
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
              v-if="project.liveUrl && project.liveUrl !== '#'"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-300 hover:text-vermilion-400 text-xs font-serif transition-colors"
              @click.stop
            >
              <ArrowUpRight :size="13" />
              <span>Live Demo</span>
            </a>
            <span
              v-else
              class="text-xs font-serif text-base-500 flex items-center gap-1 cursor-pointer"
            >
              <span>View Gallery</span>
            </span>

            <a
              v-if="project.repoUrl && project.repoUrl !== '#'"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-300 hover:text-gold-300 text-xs font-serif transition-colors"
              @click.stop
            >
              <span>Source Code</span>
              <ExternalLink :size="12" />
            </a>
            <span
              v-else
              class="text-xs font-serif text-base-500"
            >
              Proprietary
            </span>
          </div>
        </article>
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════
         PROJECT DETAIL & SWIPEABLE GALLERY MODAL (LAZY LOADING)
         ═════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen && selectedModalProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl"
          @click.self="closeModal"
        >
          <div
            class="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-base-950 border border-gold-500/25 shadow-2xl p-5 sm:p-7 flex flex-col gap-6 relative"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <!-- Modal Top Header -->
            <div class="flex items-center justify-between gap-4 pb-3 border-b border-gold-500/15">
              <div class="flex items-center gap-3">
                <span class="hanko-stamp text-xs !py-0.5 !px-2 font-serif">
                  {{ selectedModalProject.category === 'Mobile App' ? 'APP' : 'WEB' }}
                </span>
                <span class="text-xs font-serif uppercase tracking-widest text-gold-400">
                  {{ selectedModalProject.category }}
                </span>
                <span class="text-base-600">•</span>
                <span class="text-xs font-mono text-base-400">
                  Image {{ modalImageIndex + 1 }} of {{ selectedModalProject.images.length }}
                </span>
              </div>

              <!-- Close Button -->
              <button
                class="p-2 rounded-full border border-gold-500/20 bg-base-900 text-base-300 hover:text-white hover:border-vermilion-500 hover:bg-vermilion-500/20 transition-all cursor-pointer"
                aria-label="Close modal"
                @click="closeModal"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- Swipeable Image Viewer -->
            <div class="relative h-64 sm:h-96 md:h-[480px] w-full rounded-xl overflow-hidden bg-black/95 border border-gold-500/20 shadow-2xl flex items-center justify-center p-3 sm:p-5 group/modal-viewer select-none">
              <!-- Screenshot with lazy loading -->
              <template v-for="(image, imgIdx) in selectedModalProject.images" :key="imgIdx">
                <NuxtImg
                  v-if="isImageValid(image)"
                  :src="image"
                  :alt="`${selectedModalProject.title} screenshot ${imgIdx + 1}`"
                  class="absolute inset-0 m-auto max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg transition-all duration-300"
                  :class="modalImageIndex === imgIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'"
                  loading="lazy"
                  @error="handleImageError(image)"
                />
              </template>

              <!-- Left Arrow Button -->
              <button
                v-if="selectedModalProject.images.length > 1"
                class="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-base-950/80 backdrop-blur border border-white/10 hover:bg-vermilion-500 text-white opacity-85 hover:opacity-100 transition-all hover:scale-110 z-10 cursor-pointer shadow-xl"
                aria-label="Previous screenshot"
                @click.stop="modalPrevImage"
              >
                <ChevronLeft :size="20" />
              </button>

              <!-- Right Arrow Button -->
              <button
                v-if="selectedModalProject.images.length > 1"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-base-950/80 backdrop-blur border border-white/10 hover:bg-vermilion-500 text-white opacity-85 hover:opacity-100 transition-all hover:scale-110 z-10 cursor-pointer shadow-xl"
                aria-label="Next screenshot"
                @click.stop="modalNextImage"
              >
                <ChevronRight :size="20" />
              </button>

              <!-- Swipe indicator on mobile -->
              <div
                v-if="selectedModalProject.images.length > 1"
                class="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-[0.65rem] text-base-300 font-serif border border-white/10 pointer-events-none"
              >
                Swipe left / right to browse
              </div>
            </div>

            <!-- Thumbnail filmstrip strip (for multi-image projects) -->
            <div
              v-if="selectedModalProject.images.length > 1"
              class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
            >
              <button
                v-for="(img, thumbIdx) in selectedModalProject.images"
                :key="thumbIdx"
                class="h-14 w-20 shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer bg-black/60 p-1 flex items-center justify-center"
                :class="
                  modalImageIndex === thumbIdx
                    ? 'border-vermilion-500 ring-2 ring-vermilion-500/40 scale-105'
                    : 'border-gold-500/20 opacity-50 hover:opacity-100'
                "
                @click="modalImageIndex = thumbIdx"
              >
                <NuxtImg
                  :src="img"
                  :alt="`Thumbnail ${thumbIdx + 1}`"
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
              </button>
            </div>

            <!-- Project Details & Actions -->
            <div class="flex flex-col gap-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 class="font-display text-2xl sm:text-3xl font-bold text-base-50 tracking-tight">
                  {{ selectedModalProject.title }}
                </h3>

                <!-- Project Switcher in Modal -->
                <div class="flex items-center gap-2">
                  <button
                    class="px-3 py-1.5 rounded-lg border border-gold-500/20 bg-base-900/60 hover:bg-vermilion-500 hover:border-vermilion-500 text-xs text-base-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    @click="modalPrevProject"
                  >
                    <ChevronLeft :size="14" />
                    <span>Prev Project</span>
                  </button>
                  <button
                    class="px-3 py-1.5 rounded-lg border border-gold-500/20 bg-base-900/60 hover:bg-vermilion-500 hover:border-vermilion-500 text-xs text-base-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    @click="modalNextProject"
                  >
                    <span>Next Project</span>
                    <ChevronRight :size="14" />
                  </button>
                </div>
              </div>

              <p class="text-base-300 text-sm sm:text-base leading-relaxed font-body">
                {{ selectedModalProject.description }}
              </p>

              <!-- Tech Badges -->
              <div class="flex flex-wrap gap-2 pt-1">
                <span
                  v-for="tech in selectedModalProject.techs"
                  :key="tech"
                  class="bg-white/[0.05] text-gold-300/90 text-xs font-medium px-3 py-1 rounded-full border border-gold-500/15"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action CTAs -->
              <div class="flex flex-wrap items-center gap-4 pt-4 border-t border-gold-500/10">
                <a
                  v-if="selectedModalProject.liveUrl && selectedModalProject.liveUrl !== '#'"
                  :href="selectedModalProject.liveUrl"
                  target="_blank"
                  rel="noopener"
                  class="zen-btn-primary !py-2.5 !px-6 !text-xs"
                >
                  <span>Open Live Project</span>
                  <ArrowUpRight :size="14" />
                </a>

                <a
                  v-if="selectedModalProject.repoUrl && selectedModalProject.repoUrl !== '#'"
                  :href="selectedModalProject.repoUrl"
                  target="_blank"
                  rel="noopener"
                  class="zen-btn-outline !py-2.5 !px-6 !text-xs"
                >
                  <span>Source Repository</span>
                  <ExternalLink :size="14" class="text-gold-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>