<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'dark'

const { currentTab, tabIndex, nextTab, prevTab } = usePortfolioNavigation()

// Keyboard left/right navigation
const onKeyDown = (e: KeyboardEvent) => {
  // Ignore if user is typing in an input or modal is open
  const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea') return

  if (e.key === 'ArrowRight') {
    nextTab()
  } else if (e.key === 'ArrowLeft') {
    prevTab()
  }
}

// Touch swipe support
let touchStartX = 0
let touchStartY = 0

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const onTouchEnd = (e: TouchEvent) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX
  const deltaY = e.changedTouches[0].clientY - touchStartY
  // Only trigger horizontal swipe if movement is primarily horizontal and > 50px
  if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
    if (deltaX < 0) {
      nextTab()
    } else {
      prevTab()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div
    class="relative h-screen w-screen overflow-hidden bg-black text-base-200 selection:bg-vermilion-500/30 selection:text-base-50 select-none"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- Three.js 3D Sakura interactive background -->
    <PortfolioCanvasBackground />

    <!-- Top Navigation Bar (Fixed) -->
    <PortfolioNavbar />

    <!-- Horizontal Slides Container (300vw track that slides left/right) -->
    <main
      class="flex w-[300vw] h-screen transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
      :style="{ transform: `translate3d(-${tabIndex * 100}vw, 0px, 0px)` }"
    >
      <!-- Slide 1: Home / Hero -->
      <section
        id="home"
        class="w-screen h-screen shrink-0 relative overflow-hidden flex flex-col pt-5 pb-16 px-4 sm:px-6 md:pl-28 lg:pl-32"
        :aria-hidden="currentTab !== 'home'"
      >
        <PortfolioHero />
      </section>

      <!-- Slide 2: About Me -->
      <section
        id="about-slide"
        class="w-screen h-screen shrink-0 relative overflow-hidden flex flex-col pt-5 pb-16 px-4 sm:px-6 md:pl-28 lg:pl-32"
        :aria-hidden="currentTab !== 'about'"
      >
        <PortfolioAbout />
      </section>

      <!-- Slide 3: Projects -->
      <section
        id="projects-slide"
        class="w-screen h-screen shrink-0 relative overflow-hidden flex flex-col pt-5 pb-16 px-4 sm:px-6 md:pl-28 lg:pl-32"
        :aria-hidden="currentTab !== 'projects'"
      >
        <PortfolioProjects />
      </section>
    </main>

    <!-- Sleek Bottom Status Bar & Slide Pagination (Fixed) -->
    <PortfolioFooter />
  </div>
</template>

<style>
html,
body,
#__nuxt,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000 !important;
  background: #000000 !important;
  color-scheme: dark !important;
  color: #c8c3b7;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

img,
picture,
video,
canvas {
  background-color: #000000 !important;
}

svg {
  background-color: transparent !important;
  background: transparent !important;
}
</style>
