<script setup lang="ts">
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return

  const container = containerRef.value
  let width = window.innerWidth
  let height = window.innerHeight

  // ── Scene, Camera, Renderer ──
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0016)

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
  camera.position.set(0, 0, 220)

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  container.appendChild(renderer.domElement)

  // ── Lighting ──
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
  scene.add(ambientLight)

  const moonLight = new THREE.DirectionalLight(0xffeedd, 1.8)
  moonLight.position.set(100, 150, 100)
  scene.add(moonLight)

  // Silver rim light to highlight curved edges of black petals against pitch black
  const rimLight = new THREE.DirectionalLight(0xdbeafe, 1.8)
  rimLight.position.set(-120, 100, -80)
  scene.add(rimLight)

  // Soft cool fill light from below
  const fillLight = new THREE.PointLight(0x94a3b8, 1.2, 400)
  fillLight.position.set(0, -100, 60)
  scene.add(fillLight)

  // ── Procedural Sakura Petal Geometry ──
  // Creates a realistic curved 3D petal shape
  const petalShape = new THREE.Shape()
  petalShape.moveTo(0, -6)
  petalShape.bezierCurveTo(4, -4, 6, 2, 4, 7)
  petalShape.bezierCurveTo(3, 9, 1.5, 10, 0, 9.2) // Notch at the tip of sakura petal
  petalShape.bezierCurveTo(-1.5, 10, -3, 9, -4, 7)
  petalShape.bezierCurveTo(-6, 2, -4, -4, 0, -6)

  const extrudeSettings = {
    depth: 0.25,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.15,
    bevelThickness: 0.15,
  }
  const basePetalGeo = new THREE.ExtrudeGeometry(petalShape, extrudeSettings)
  basePetalGeo.center()

  // Slightly curve the petal in Z axis for organic 3D realism
  const posAttr = basePetalGeo.attributes.position
  if (posAttr) {
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i)
      const x = posAttr.getX(i)
      const distFromCenter = Math.sqrt(x * x + y * y)
      // cup the petal slightly
      posAttr.setZ(i, posAttr.getZ(i) - (distFromCenter * distFromCenter) * 0.02)
    }
    basePetalGeo.computeVertexNormals()
  }

  // ── Black Sumi Ink & Obsidian Petal Materials ──
  const petalDefs = [
    { color: 0x18181b, emissive: 0x050508, roughness: 0.28, metalness: 0.35, opacity: 0.95 }, // Deep Obsidian Black
    { color: 0x27272a, emissive: 0x08080c, roughness: 0.25, metalness: 0.3,  opacity: 0.95 }, // Charcoal Ink with Silver Sheen
    { color: 0x0f0f11, emissive: 0x030305, roughness: 0.35, metalness: 0.4,  opacity: 0.92 }, // Velvet Midnight Black
    { color: 0x3f3f46, emissive: 0x0a0a0f, roughness: 0.22, metalness: 0.25, opacity: 0.96 }, // Smoky Graphite Grey-Black
    { color: 0x141417, emissive: 0x040406, roughness: 0.3,  metalness: 0.35, opacity: 0.93 }, // Charred Sumi Black
    { color: 0x2e2e33, emissive: 0x07070a, roughness: 0.26, metalness: 0.32, opacity: 0.95 }, // Gunmetal Obsidian
  ]

  const petalMaterials = petalDefs.map((def) => {
    return new THREE.MeshStandardMaterial({
      color: def.color,
      emissive: def.emissive,
      roughness: def.roughness,
      metalness: def.metalness,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: def.opacity,
    })
  })

  // ── Create Petal Meshes ──
  const isMobile = width < 768
  const petalCount = isMobile ? 55 : 120

  interface PetalData {
    mesh: THREE.Mesh
    vx: number
    vy: number
    vz: number
    rotX: number
    rotY: number
    rotZ: number
    swaySpeed: number
    swayDist: number
    swayOffset: number
    origZ: number
  }

  const petals: PetalData[] = []
  const spawnBounds = {
    x: isMobile ? 160 : 280,
    y: 200,
    z: 180,
  }

  for (let i = 0; i < petalCount; i++) {
    const mat = petalMaterials[i % petalMaterials.length]!
    const mesh = new THREE.Mesh(basePetalGeo, mat)

    // Random initial position
    mesh.position.set(
      (Math.random() - 0.5) * spawnBounds.x * 2,
      (Math.random() - 0.5) * spawnBounds.y * 2,
      (Math.random() - 0.5) * spawnBounds.z * 2
    )

    // Varied scale for depth perspective
    const scale = Math.random() * 0.6 + 0.55
    mesh.scale.set(scale, scale, scale)

    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    )

    scene.add(mesh)

    petals.push({
      mesh,
      vx: (Math.random() - 0.45) * 0.25, // Slight natural drift to the right
      vy: -(Math.random() * 0.45 + 0.35), // Natural fall speed
      vz: (Math.random() - 0.5) * 0.15,
      rotX: (Math.random() - 0.5) * 0.02,
      rotY: (Math.random() - 0.5) * 0.025,
      rotZ: (Math.random() - 0.5) * 0.018,
      swaySpeed: Math.random() * 0.015 + 0.008,
      swayDist: Math.random() * 0.6 + 0.3,
      swayOffset: Math.random() * Math.PI * 2,
      origZ: mesh.position.z,
    })
  }

  // ── Golden Fireflies / Zen Ember Particles ──
  const fireflyCount = isMobile ? 35 : 75
  const fireflyGeo = new THREE.BufferGeometry()
  const fireflyPos = new Float32Array(fireflyCount * 3)
  const fireflySizes = new Float32Array(fireflyCount)

  for (let i = 0; i < fireflyCount; i++) {
    fireflyPos[i * 3] = (Math.random() - 0.5) * spawnBounds.x * 2
    fireflyPos[i * 3 + 1] = (Math.random() - 0.5) * spawnBounds.y * 2
    fireflyPos[i * 3 + 2] = (Math.random() - 0.5) * spawnBounds.z * 2
    fireflySizes[i] = Math.random() * 3.5 + 1.5
  }

  fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPos, 3))
  fireflyGeo.setAttribute('size', new THREE.BufferAttribute(fireflySizes, 1))

  // Soft glowing firefly canvas texture
  const particleCanvas = document.createElement('canvas')
  particleCanvas.width = 32
  particleCanvas.height = 32
  const pCtx = particleCanvas.getContext('2d')!
  const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
  grad.addColorStop(0, 'rgba(240, 245, 255, 0.85)')
  grad.addColorStop(0.3, 'rgba(180, 195, 220, 0.4)')
  grad.addColorStop(0.7, 'rgba(100, 115, 140, 0.15)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  pCtx.fillStyle = grad
  pCtx.fillRect(0, 0, 32, 32)

  const fireflyTexture = new THREE.CanvasTexture(particleCanvas)
  const fireflyMat = new THREE.PointsMaterial({
    map: fireflyTexture,
    size: 4,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const fireflies = new THREE.Points(fireflyGeo, fireflyMat)
  scene.add(fireflies)

  // ── Mouse & Wind Interaction ──
  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
  }

  let scrollY = window.scrollY
  let scrollSpeed = 0
  let lastScrollY = window.scrollY

  const onMouseMove = (e: MouseEvent) => {
    // Normalized to -1 .. 1
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1

    mouse.vx = (e.clientX - mouse.lastX) * 0.05
    mouse.vy = (e.clientY - mouse.lastY) * 0.05
    mouse.lastX = e.clientX
    mouse.lastY = e.clientY
  }

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]!
      mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1
    }
  }

  const onScroll = () => {
    scrollY = window.scrollY
    scrollSpeed = (scrollY - lastScrollY) * 0.08
    lastScrollY = scrollY
  }

  // Click creates a swirl gust
  const onClick = (e: MouseEvent) => {
    const clickX = (e.clientX / window.innerWidth) * 2 - 1
    const worldClickX = clickX * (spawnBounds.x * 0.6)
    petals.forEach((p) => {
      const dx = p.mesh.position.x - worldClickX
      const dist = Math.abs(dx)
      if (dist < 90) {
        const force = (90 - dist) / 90
        p.vx += (dx > 0 ? 1 : -1) * force * 1.8
        p.vy += force * 1.4 // upward swirl
        p.rotZ += (Math.random() - 0.5) * 0.4
      }
    })
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('click', onClick, { passive: true })

  // ── Window Resize ──
  const onResize = () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
  window.addEventListener('resize', onResize)

  // ── Animation Loop ──
  let animId: number
  let clock = new THREE.Clock()

  const animate = () => {
    animId = requestAnimationFrame(animate)

    const delta = clock.getDelta()
    const elapsedTime = clock.getElapsedTime()

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05
    mouse.y += (mouse.targetY - mouse.y) * 0.05

    // Decay mouse velocity
    mouse.vx *= 0.92
    mouse.vy *= 0.92

    // Decay scroll speed
    scrollSpeed *= 0.94

    // Subtle camera parallax based on mouse
    camera.position.x += (mouse.x * 16 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 10 - (scrollY * 0.04) - camera.position.y) * 0.03
    camera.lookAt(0, -scrollY * 0.03, 0)

    // Update Petals
    const windFromMouseX = mouse.vx * 0.08
    const windFromScrollY = Math.abs(scrollSpeed) * 0.05

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i]!
      const mesh = p.mesh

      // Aerodynamic oscillation (sway)
      const sway = Math.sin(elapsedTime * 2.5 + p.swayOffset) * p.swayDist

      // Apply velocities
      mesh.position.x += p.vx + sway * 0.3 + windFromMouseX
      mesh.position.y += p.vy - windFromScrollY
      mesh.position.z += p.vz

      // Aerodynamic tumbling rotations
      mesh.rotation.x += p.rotX + Math.sin(elapsedTime + i) * 0.008
      mesh.rotation.y += p.rotY + Math.cos(elapsedTime * 1.5 + i) * 0.012
      mesh.rotation.z += p.rotZ + sway * 0.02

      // Restore damping on induced velocities
      p.vx *= 0.985
      if (Math.abs(p.vx) < 0.15) {
        p.vx = (Math.random() - 0.45) * 0.25
      }

      // Wrap around bounds seamlessly
      if (mesh.position.y < -spawnBounds.y - 10) {
        mesh.position.y = spawnBounds.y + 10
        mesh.position.x = (Math.random() - 0.5) * spawnBounds.x * 2
        mesh.position.z = (Math.random() - 0.5) * spawnBounds.z * 2
      }
      if (mesh.position.x > spawnBounds.x + 20) {
        mesh.position.x = -spawnBounds.x - 20
      } else if (mesh.position.x < -spawnBounds.x - 20) {
        mesh.position.x = spawnBounds.x + 20
      }
    }

    // Update Fireflies
    const positions = fireflyGeo.attributes.position
    if (positions) {
      for (let i = 0; i < fireflyCount; i++) {
        let y = positions.getY(i)
        let x = positions.getX(i)

        y += Math.sin(elapsedTime * 1.2 + i) * 0.18 - 0.05
        x += Math.cos(elapsedTime * 0.8 + i) * 0.15

        if (y < -spawnBounds.y) y = spawnBounds.y
        if (y > spawnBounds.y) y = -spawnBounds.y
        if (x < -spawnBounds.x) x = spawnBounds.x
        if (x > spawnBounds.x) x = -spawnBounds.x

        positions.setY(i, y)
        positions.setX(i, x)
      }
      positions.needsUpdate = true
    }

    renderer.render(scene, camera)
  }

  animate()

  // ── Clean Up on Unmount ──
  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('click', onClick)
    window.removeEventListener('resize', onResize)

    // Dispose geometries and materials
    basePetalGeo.dispose()
    petalMaterials.forEach((m) => m.dispose())
    fireflyGeo.dispose()
    fireflyMat.dispose()
    fireflyTexture.dispose()
    renderer.dispose()

    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    aria-hidden="true"
  />
</template>
