<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'dark'
</script>

<template>
  <div class="relative min-h-screen bg-black text-base-200 selection:bg-vermilion-500/30 selection:text-base-50">
    <!-- Three.js 3D Sakura interactive background -->
    <PortfolioCanvasBackground />

    <!-- Main Japanese portfolio content -->
    <div class="relative z-10">
      <PortfolioNavbar />
      <main>
        <PortfolioHero />
        <PortfolioAbout />
        <PortfolioProjects />
      </main>
      <PortfolioFooter />
    </div>
  </div>
</template>

<style>
html,
body {
  background-color: #000000;
  color: #c8c3b7;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  overflow-x: hidden;
}
</style>
