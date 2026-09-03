// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@formkit/auto-animate',
    '@vite-pwa/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
  ],
  css: ['~/assets/css/tailwind.css'],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback:   'dark',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Rustom Pedales Jr. — Full-Stack Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
        { name: 'title', content: 'Rustom Pedales Jr. — Full-Stack Developer Portfolio' },
        { name: 'description', content: 'Crafting digital experiences with Laravel, Vue.js, Nuxt & modern web technologies. Guided by precision, clean architecture, and modern aesthetics.' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Rustom Pedales Jr. — Full-Stack Developer Portfolio' },
        { property: 'og:description', content: 'Crafting digital experiences with Laravel, Vue.js, Nuxt & modern web technologies.' },
        { property: 'og:image', content: '/pwa-icon-512x512.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Rustom Pedales Jr. — Full-Stack Developer Portfolio' },
        { name: 'twitter:description', content: 'Crafting digital experiences with Laravel, Vue.js, Nuxt & modern web technologies.' },
        { name: 'twitter:image', content: '/pwa-icon-512x512.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/pwa-icon-192x192.png' },
        { rel: 'apple-touch-icon', href: '/pwa-icon-512x512.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap' }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Rustom Pedales Jr. - Full-Stack Developer Portfolio',
      short_name: 'Tom Portfolio',
      description: 'Full-Stack Web Developer portfolio showcasing Laravel, PHP, Vue.js, and Nuxt projects',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/pwa-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwa-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwa-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 5242880, // 5 MB limit
      globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg,webp}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\/_vercel\/image\?url=.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'vercel-images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: false,
      type: 'module',
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    }
  },
})