<script setup lang="ts">
const colorMode = useColorMode()

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
