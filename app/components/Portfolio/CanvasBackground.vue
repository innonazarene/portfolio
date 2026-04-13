<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const mouse = reactive({ x: -9999, y: -9999 })

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  hue: number
  baseHue: number
}

onMounted(() => {
  const canvas = canvasRef.value!
  const ctx = canvas.getContext('2d')!
  let animId: number
  let particles: Particle[] = []

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const isMobile = window.innerWidth < 768
  const maxParticles = isMobile ? 50 : 100
  const connectionDist = isMobile ? 100 : 140
  const mouseRadius = 180

  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function initParticles() {
    const w = window.innerWidth
    const h = window.innerHeight
    particles = Array.from({ length: maxParticles }, () => {
      const baseHue = 185 + Math.random() * 30 // cyan–teal range
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
        hue: baseHue,
        baseHue,
      }
    })
  }

  function drawGrid() {
    const w = window.innerWidth
    const h = window.innerHeight
    const spacing = 70
    const drift = (Date.now() * 0.005) % spacing

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.018)'
    ctx.lineWidth = 0.5

    for (let x = -spacing + drift; x < w + spacing; x += spacing) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = -spacing + drift; y < h + spacing; y += spacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
  }

  function animate() {
    const w = window.innerWidth
    const h = window.innerHeight
    ctx.clearRect(0, 0, w, h)

    // Subtle grid
    drawGrid()

    const scrollFactor = window.scrollY / (document.body.scrollHeight - h || 1)

    // Update particles
    for (const p of particles) {
      // Mouse repulsion
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const distSq = dx * dx + dy * dy
      const dist = Math.sqrt(distSq)

      if (dist < mouseRadius && dist > 0) {
        const force = ((mouseRadius - dist) / mouseRadius) * 0.015
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }

      // Apply velocity with damping
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.992
      p.vy *= 0.992

      // Hue shift based on scroll
      p.hue = p.baseHue + scrollFactor * 60

      // Wrap edges
      if (p.x < -10) p.x = w + 10
      if (p.x > w + 10) p.x = -10
      if (p.y < -10) p.y = h + 10
      if (p.y > h + 10) p.y = -10

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.opacity})`
      ctx.fill()
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distSq = dx * dx + dy * dy

        if (distSq < connectionDist * connectionDist) {
          const dist = Math.sqrt(distSq)
          const alpha = (1 - dist / connectionDist) * 0.12
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `hsla(190, 85%, 55%, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(animate)
  }

  const onMouse = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  const onMouseLeave = () => {
    mouse.x = -9999
    mouse.y = -9999
  }

  const onTouch = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX
      mouse.y = e.touches[0].clientY
    }
  }

  const onTouchEnd = () => {
    mouse.x = -9999
    mouse.y = -9999
  }

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouse, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('touchmove', onTouch, { passive: true })
  window.addEventListener('touchend', onTouchEnd)

  resize()
  initParticles()
  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('touchmove', onTouch)
    window.removeEventListener('touchend', onTouchEnd)
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 z-0 pointer-events-none"
    aria-hidden="true"
  />
</template>
