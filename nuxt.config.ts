// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Auto-sync uploaded profile photo
try {
  const uploadedPath = 'C:/Users/Inonazarene/.gemini/antigravity-ide/brain/a854ff1f-fc55-415e-adad-de495eceba34/.user_uploaded/media_1789696950481.png'
  const destDir = path.resolve('public/img')
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
  if (fs.existsSync(uploadedPath)) {
    fs.copyFileSync(uploadedPath, path.join(destDir, 'profile.png'))
    fs.copyFileSync(uploadedPath, path.join(destDir, '1a8c1651-4238-4b75-98d4-e92da04c6347.jpg'))
  }
  const testFile = path.join(destDir, 'test.txt')
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile)
} catch (e) {
  // Ignore
}

// Canonical site URL. Override with NUXT_PUBLIC_SITE_URL when a custom domain is attached.
const SITE_URL = (process.env.NUXT_PUBLIC_SITE_URL || 'https://rustompedales-portfolio.vercel.app').replace(/\/$/, '')
const SITE_TITLE = 'Rustom Pedales Jr. | Full-Stack Developer (Laravel, Vue)'
const SITE_DESC = 'Senior Full-Stack Developer and Application Architect in Butuan City, Philippines. 17+ shipped systems with Laravel, React, Vue/Nuxt and TypeScript.'
const OG_IMAGE = `${SITE_URL}/og-image.png`

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Rustom Pedales Jr.',
      alternateName: ['Rustom Ramos Pedales Jr.', 'Tom Pedales'],
      url: SITE_URL,
      image: `${SITE_URL}/img/profile.png`,
      jobTitle: 'Senior Full-Stack Developer & Application Architect',
      description: SITE_DESC,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Butuan City',
        addressRegion: 'Agusan del Norte',
        addressCountry: 'PH',
      },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'ACLC College of Butuan' },
      knowsAbout: ['Laravel', 'PHP', 'React', 'Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'REST API design', 'MySQL', 'Application architecture'],
      sameAs: ['https://github.com/innonazarene'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Rustom Pedales Jr. Portfolio',
      description: SITE_DESC,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      mainEntity: { '@id': `${SITE_URL}/#person` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ],
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
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
      htmlAttrs: {
        lang: 'en',
        class: 'dark',
        style: 'background-color: #000000 !important; background: #000000 !important; color-scheme: dark;',
      },
      bodyAttrs: {
        class: 'dark bg-black',
        style: 'background-color: #000000 !important; background: #000000 !important; color-scheme: dark;',
      },
      style: [
        {
          children: 'html, body, #__nuxt, #app { background-color: #000000 !important; background: #000000 !important; color-scheme: dark; } img, picture, video, canvas { background-color: #000000 !important; } svg { background: transparent !important; background-color: transparent !important; }',
        },
      ],
      title: SITE_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
        { name: 'title', content: SITE_TITLE },
        { name: 'description', content: SITE_DESC },
        { name: 'author', content: 'Rustom Pedales Jr.' },
        { name: 'keywords', content: 'Rustom Pedales Jr., full-stack developer, Laravel developer, Vue developer, Nuxt, React developer, application architect, Butuan City, Philippines, freelance web developer, TypeScript, portfolio' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Rustom Pedales Jr. Portfolio' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESC },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:secure_url', content: OG_IMAGE },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Rustom Pedales Jr., Senior Full-Stack Developer and Application Architect' },
        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESC },
        { name: 'twitter:image', content: OG_IMAGE },
        { name: 'twitter:image:alt', content: 'Rustom Pedales Jr., Senior Full-Stack Developer and Application Architect' },
      ],
      script: [
        { type: 'application/ld+json', innerHTML: JSON.stringify(personJsonLd), tagPosition: 'head' },
      ],
      link: [
        { rel: 'canonical', href: SITE_URL },
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