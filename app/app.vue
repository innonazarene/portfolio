<script setup>
const colorMode = useColorMode()

console.log(colorMode.preference)
</script>
<template>
  <div :class="colorMode.preference">
    <PortfolioHero />
    <PortfolioAbout />
    <PortfolioProjects />
    <PortfolioFooter />
  </div>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.522);
}
.dark body {
  background-color: #190e1d;
  color: #ebf4f1;
}
.sepia body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
