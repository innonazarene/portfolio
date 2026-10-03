// Writes public/sitemap.xml and public/robots.txt from the canonical site URL.
// Runs before build/generate so the sitemap always matches the deployed domain.
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = (process.env.NUXT_PUBLIC_SITE_URL || 'https://rustompedales-portfolio.vercel.app').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_URL}/og-image.png</image:loc>
      <image:title>Rustom Pedales Jr., Senior Full-Stack Developer</image:title>
    </image:image>
  </url>
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.mkdirSync('public', { recursive: true })
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemap)
fs.writeFileSync(path.resolve('public/robots.txt'), robots)
console.log(`[seo] wrote sitemap.xml and robots.txt for ${SITE_URL}`)
