<template>
  <section id="projects" class="relative py-28 px-6 overflow-hidden">
    <!-- subtle grid bg -->
    <div class="absolute inset-0 grid-bg opacity-20" />

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- header -->
      <span class="section-label mb-4 inline-flex">Projects</span>
      <h2 class="font-display text-4xl sm:text-5xl font-bold text-base-50 leading-tight mb-3">
        Things I've <span class="text-gradient-accent">built</span> 
      </h2>
      <p class="text-base-200/50 max-w-xl mb-10">A curated selection of projects — each one a learning adventure.</p>

      <!-- filter pills -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border"
          :class="
            activeFilter === cat
              ? 'bg-accent-400 text-base-950 border-accent-400'
              : 'border-white/[0.1] text-base-200/60 hover:border-accent-400/40 hover:text-base-100'
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
          class="glass-card group flex flex-col overflow-hidden hover:border-accent-400/30 hover:shadow-xl hover:shadow-black/30 transition-all duration-500 hover:-translate-y-1"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <!-- image placeholder -->
          <div class="relative h-48 overflow-hidden bg-base-900">
            <!-- gradient overlay to simulate image atmosphere -->
            <div
              class="absolute inset-0 opacity-60"
              :style="{ background: project.gradient }"
            />
            <!-- grid texture on top -->
            <div class="absolute inset-0 grid-bg opacity-30" />
            <!-- icon -->
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="project.icon" :size="56" class="text-white/20" />
            </div>
            <!-- tag on top-right -->
            <span class="absolute top-4 right-4 bg-base-950/70 backdrop-blur text-accent-400 text-xs font-mono px-3 py-1 rounded-full border border-white/[0.08]">
              {{ project.category }}
            </span>
          </div>

          <!-- content -->
          <div class="flex flex-col gap-3 p-5 flex-1">
            <h3 class="text-base-50 font-display font-semibold text-lg group-hover:text-accent-400 transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-base-200/50 text-sm leading-relaxed flex-1">
              {{ project.description }}
            </p>

            <!-- tech tags -->
            <div class="flex flex-wrap gap-1.5 mt-auto">
              <span
                v-for="tech in project.techs"
                :key="tech"
                class="bg-white/[0.05] text-base-200/60 text-xs font-mono px-2.5 py-0.5 rounded-md"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- links row -->
          <div class="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
            <a
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-200/50 hover:text-accent-400 text-xs font-mono transition-colors"
            >
              <ExternalLink :size="13" />
              Live Demo
            </a>
            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-base-200/50 hover:text-secondary-300 text-xs font-mono transition-colors"
            >
              <Globe :size="13" />
              Source Code
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ExternalLink, Globe } from 'lucide-vue-next'

const categories = ['All', 'Web App', 'E-Commerce', 'Dashboard', 'Mobile']

const activeFilter = ref('All')

const projects = [
  {
    id: 6,
    title: 'LinkVault',
    category: 'Web App',
    description: 'A personal link-management tool with tagging, search, and a beautiful public share page.',
    techs: ['Nuxt', 'Supabase', 'TypeScript'],
    gradient: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)',
    icon: Globe,
    liveUrl: '#',
    repoUrl: '#',
  },
]

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter.value)
)
</script>
