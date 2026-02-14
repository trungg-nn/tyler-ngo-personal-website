import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://www.tylerngo.co.uk'
const PROJECT_ID = 'gqqnt3c0'
const DATASET = 'production'
const API_VERSION = '2024-06-01'

const staticRoutes = ['/', '/portfolio', '/blog', '/about', '/contact']

const escapeXml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

async function getPostUrls() {
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(endpoint)
  if (!res.ok) return []

  const data = await res.json()
  const results = data?.result || []

  return results
    .filter((item) => item?.slug)
    .map((item) => ({
      loc: `${SITE_URL}/blog/${item.slug}`,
      lastmod: item?._updatedAt ? new Date(item._updatedAt).toISOString() : undefined,
      changefreq: 'weekly',
      priority: '0.80',
    }))
}

async function run() {
  const nowIso = new Date().toISOString()

  const staticEntries = staticRoutes.map((route) => ({
    loc: `${SITE_URL}${route === '/' ? '' : route}`,
    lastmod: nowIso,
    changefreq: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? '1.00' : '0.70',
  }))

  const postEntries = await getPostUrls()
  const allEntries = [...staticEntries, ...postEntries]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allEntries
    .map(
      (entry) => `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${
        entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
      }\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`

  writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), xml)

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  writeFileSync(join(process.cwd(), 'public', 'robots.txt'), robots)

  console.log(`Generated sitemap with ${allEntries.length} URLs`)
}

run()
