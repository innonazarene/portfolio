// Refreshes app/data/github-contributions.json from the public contributions API.
// Never fails the build: if the fetch fails, the last committed snapshot is kept.
import fs from 'node:fs'
import path from 'node:path'

const USER = 'innonazarene'
const out = path.resolve('app/data/github-contributions.json')

try {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('empty payload')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify({
    user: USER,
    total: data.total?.lastYear ?? data.contributions.reduce((s, d) => s + d.count, 0),
    fetchedAt: new Date().toISOString(),
    contributions: data.contributions.map(({ date, count, level }) => ({ date, count, level })),
  }))
  console.log(`[github] saved ${data.contributions.length} days, total ${data.total?.lastYear}`)
} catch (e) {
  console.warn(`[github] fetch failed (${e.message}); keeping existing snapshot`)
}
