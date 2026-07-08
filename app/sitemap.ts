import type { MetadataRoute } from 'next'
import { getPrisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prisma = getPrisma()
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true, category: true },
  })

  const baseUrl = 'https://samsumamart.co.ke'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/bf-suma-products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/story`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
