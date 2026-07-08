import { notFound } from 'next/navigation'
import { getPrisma } from '@/lib/prisma'
import ProductDetail from '@/components/ProductDetail'
import ReviewSection from '@/components/ReviewSection'
import type { Metadata } from 'next'
import { productSchema, breadcrumbSchema } from '@/lib/seo'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

function getFirstImage(images: any): string {
  if (typeof images === 'string') return images || '/placeholder.jpg'
  if (Array.isArray(images) && images.length > 0) return images[0]
  return '/placeholder.jpg'
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const prisma = getPrisma()
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return {}
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: getFirstImage(product.images) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description.slice(0, 160),
      images: [getFirstImage(product.images)],
    },
    alternates: {
      canonical: `/products/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const prisma = getPrisma()

  const product = await prisma.product.findUnique({
    where: { slug }
  })

  if (!product) {
    notFound()
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  })

  const reviews = await prisma.review.findMany({
    where: { productId: product.id, approved: true },
  })

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  const productJson = productSchema({
    name: product.name,
    description: product.description,
    images: product.images,
    price: product.price,
    slug: product.slug,
    category: product.category,
    stock: product.stock,
    reviewRating: avgRating,
    reviewCount: reviews.length,
  })

  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: product.name, url: `/products/${product.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <div className="container">
        <ReviewSection productId={product.id} />
      </div>
    </>
  )
}