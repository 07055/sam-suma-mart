/**
 * Static sitemap generator for Sam's Suma Mart
 *
 * Crawls content/posts/*.md AND data/products.json to compile
 * a unified public/sitemap.xml. Intended to run via the prebuild hook.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BASE_URL = 'https://samsumamart.co.ke';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date) {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

function buildSitemap() {
  const urls = [];
  const now = formatDate(new Date());

  // Static pages
  urls.push({
    loc: BASE_URL,
    lastmod: now,
    changefreq: 'weekly',
    priority: '1.0',
  });
  urls.push({
    loc: `${BASE_URL}/shop`,
    lastmod: now,
    changefreq: 'daily',
    priority: '0.9',
  });
  urls.push({
    loc: `${BASE_URL}/bf-suma-products`,
    lastmod: now,
    changefreq: 'weekly',
    priority: '0.9',
  });
  urls.push({
    loc: `${BASE_URL}/story`,
    lastmod: now,
    changefreq: 'monthly',
    priority: '0.5',
  });

  // Blog listing
  urls.push({
    loc: `${BASE_URL}/blog`,
    lastmod: now,
    changefreq: 'weekly',
    priority: '0.8',
  });

  // Blog posts
  if (fs.existsSync(POSTS_DIR)) {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data } = matter(content);
      urls.push({
        loc: `${BASE_URL}/blog/${slug}`,
        lastmod: data.date ? formatDate(data.date) : now,
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
  }

  // Product pages
  if (fs.existsSync(PRODUCTS_FILE)) {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    for (const product of products) {
      if (product.slug) {
        urls.push({
          loc: `${BASE_URL}/products/${product.slug}`,
          lastmod: now,
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    }
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const outputPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✓ Sitemap generated: ${outputPath}`);
  console.log(`  → ${urls.length} URLs written`);
}

buildSitemap();
