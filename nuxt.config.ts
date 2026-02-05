// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@formkit/auto-animate',
    '@vite-pwa/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback:   'dark',
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Rustom Pedales Jr. - Full-Stack Developer Portfolio',
      short_name: 'Tom Portfolio',
      description: 'Full-Stack Web Developer portfolio showcasing Laravel, PHP, Vue.js, and Nuxt projects',
      theme_color: '#000000', // Adjust to match your site's theme
      background_color: '#ffffff',
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