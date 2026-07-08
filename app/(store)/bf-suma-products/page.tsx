import ProductGrid from "@/components/ProductGrid";
import { getPrisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { collectionPageSchema } from "@/lib/seo";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "BF Suma Products Online Kenya | Buy Authentic Health & Wellness",
  description: "Shop the full range of authentic BF Suma products in Kenya. Anti-aging skincare, NMN supplements, immune boosters, joint care, digestive health & more. Order online for fast delivery across Kenya.",
  openGraph: {
    title: "BF Suma Products Online Kenya | Sam's Suma Mart",
    description: "Shop the full range of authentic BF Suma products in Kenya. Anti-aging skincare, NMN supplements, immune boosters, joint care, digestive health & more. Order online for fast delivery.",
    images: [{ url: '/logo.svg', width: 200, height: 200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BF Suma Products Online Kenya | Sam's Suma Mart",
    description: "Shop the full range of authentic BF Suma products in Kenya. Anti-aging skincare, NMN supplements, immune boosters, joint care, digestive health & more. Order online for fast delivery.",
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: '/bf-suma-products',
  },
}

export default async function BfSumaProductsPage() {
  const prisma = getPrisma()

  const products = await prisma.product.findMany({
    orderBy: { category: 'asc' },
  })

  const collectionJson = collectionPageSchema(
    'BF Suma Products Online Kenya',
    'Shop the full range of authentic BF Suma health and wellness products in Kenya.'
  )

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJson) }}
      />

      {/* Hero / Intro section */}
      <div style={{
        background: 'linear-gradient(135deg, #1b5e20, #2e7d32)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', marginBottom: '1rem' }}>
          BF Suma Products Online Kenya
        </h1>
        <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', maxWidth: '750px', margin: '0 auto 0.5rem', lineHeight: '1.7', opacity: 0.95 }}>
          Welcome to Sam&apos;s Suma Mart — Kenya&apos;s trusted online store for 100% authentic BF Suma health and wellness products.
          From anti-aging skincare and NMN anti-aging supplements to immune-boosting mushroom coffees, joint care, digestive health, and baby wellness,
          we carry the full BF Suma catalog at competitive prices. Every product is genuine, carefully stored, and delivered right to your doorstep
          in Nairobi, Mombasa, Kisumu, and all Kenyan counties. Shop with confidence and experience the BF Suma difference today.
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '1rem' }}>
          {products.length} products across {categories.length} categories — Free delivery within Nairobi.
        </p>
      </div>

      {/* Category filter links */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem',
        justifyContent: 'center',
      }}>
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            style={{
              padding: '0.4rem 1rem',
              background: '#f0f4f0',
              color: '#2e7d32',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            {cat}
          </a>
        ))}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <p>No BF Suma products available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
