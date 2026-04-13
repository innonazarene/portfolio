<script setup lang="ts">
const colorMode = useColorMode()
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'apple-touch-icon', href: '/pwa-icon-512x512.png' },
  ],
  meta: [
    { name: 'description', content: 'Rustom Pedales Jr. — Full-Stack Developer portfolio showcasing Laravel, PHP, Vue.js, and Nuxt projects.' },
    { name: 'theme-color', content: '#070810' },
  ],
})
console.log(colorMode.preference)
</script>

<template>
  <div class="scanline-overlay">
    <!-- Canvas particle background -->
    <PortfolioCanvasBackground />

    <!-- All content above the canvas -->
    <div class="relative z-10">
      <PortfolioNavbar />
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioProjects />
      <PortfolioFooter />
    </div>
  </div>
</template>

<style>
/* Dark mode is the only mode for cyberpunk */
body {
  background-color: #070810;
  color: #8e96b8;
}

.dark body {
  background-color: #070810;
  color: #8e96b8;
}

.sepia body {
  background-color: #070810;
  color: #8e96b8;
}
</style>
