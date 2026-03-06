import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const SITE_URL = 'https://www.tylerngo.co.uk'
const PROJECT_ID = 'gqqnt3c0'
const DATASET = 'production'
const API_VERSION = '2024-06-01'

const staticPages = [
  {
    path: '/portfolio',
    title: 'Portfolio | Tyler Ngo',
    description: 'Case studies, growth experiments, and practical performance marketing outcomes by Tyler Ngo.',
  },
  {
    path: '/blog',
    title: 'Blog | Tyler Ngo',
    description: 'Practical growth marketing and personal finance insights for UK professionals.',
  },
  {
    path: '/about',
    title: 'About | Tyler Ngo',
    description: 'About Tyler Ngo, performance marketer focused on practical growth systems and measurable outcomes.',
  },
  {
    path: '/contact',
    title: 'Contact | Tyler Ngo',
    description: 'Contact Tyler Ngo for performance marketing consulting and growth projects.',
  },
]

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function upsertTag(html, pattern, replacement, anchor = '</head>') {
  if (pattern.test(html)) return html.replace(pattern, replacement)
  return html.replace(anchor, `  ${replacement}\n${anchor}`)
}

function renderHtml(baseHtml, { title, description, canonicalPath, robots = 'index,follow' }) {
  const canonical = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`

  let html = baseHtml
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)

  html = upsertTag(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  )
  html = upsertTag(html, /<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${robots}" />`)
  html = upsertTag(html, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`)

  html = upsertTag(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  )
  html = upsertTag(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  )
  html = upsertTag(html, /<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonical}" />`)

  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  )
  html = upsertTag(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  )

  return html
}

async function getPosts() {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    metaDescription,
    ogTitle,
    noIndex,
    canonicalUrl
  }`

  const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(endpoint)
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data?.result) ? data.result : []
}

function writeRouteFile(distDir, routePath, html) {
  const routeDir = join(distDir, routePath.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(routeDir), { recursive: true })
  writeFileSync(routeDir, html)
}

async function run() {
  const distDir = join(process.cwd(), 'dist')
  const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')

  for (const page of staticPages) {
    const html = renderHtml(baseHtml, {
      title: page.title,
      description: page.description,
      canonicalPath: page.path,
    })
    writeRouteFile(distDir, page.path, html)
  }

  const posts = await getPosts()
  for (const post of posts) {
    if (!post?.slug) continue
    const path = `/blog/${post.slug}`
    const title = post.ogTitle || post.title || 'Blog | Tyler Ngo'
    const description =
      post.metaDescription || post.excerpt || 'Practical marketing and growth insights from Tyler Ngo.'

    const html = renderHtml(baseHtml, {
      title: `${title} | Tyler Ngo`.replace(' | Tyler Ngo | Tyler Ngo', ' | Tyler Ngo'),
      description,
      canonicalPath: post.canonicalUrl?.startsWith('http')
        ? post.canonicalUrl.replace(SITE_URL, '')
        : path,
      robots: post.noIndex ? 'noindex,nofollow' : 'index,follow',
    })

    writeRouteFile(distDir, path, html)
  }

  console.log(`Prerendered ${staticPages.length + posts.length} route HTML files`)
}

run().catch((error) => {
  console.error('prerender-routes failed', error)
  process.exit(1)
})
