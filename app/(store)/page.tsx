import ProductGrid from "@/components/ProductGrid";
import HeroSlider from "@/components/HeroSlider";
import { getPrisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { websiteSchema } from "@/lib/seo";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "BF Suma Products Kenya – Buy Health & Wellness Online",
  description: "Kenya's trusted online store for authentic BF Suma products. Shop anti-aging skincare, NMN anti-aging supplements, Reishi coffee, joint care & more. Order now for delivery across Nairobi & all Kenyan counties.",
  openGraph: {
    title: "BF Suma Products Kenya – Buy Health & Wellness Online | Sam's Suma Mart",
    description: "Kenya's trusted online store for authentic BF Suma products. Shop anti-aging skincare, NMN supplements, Reishi coffee, joint care & more. Order now for delivery across Nairobi & all Kenyan counties.",
    images: [{ url: '/logo.svg', width: 200, height: 200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BF Suma Products Kenya – Buy Health & Wellness Online | Sam's Suma Mart",
    description: "Kenya's trusted online store for authentic BF Suma products. Shop anti-aging skincare, NMN supplements, Reishi coffee, joint care & more. Order now for delivery across Nairobi & all Kenyan counties.",
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default async function Home() {
  const prisma = getPrisma()
  const webJson = websiteSchema()

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
    where: { featured: false }
  })

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 4,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webJson) }}
      />
      <HeroSlider />

      <div className="container" style={{ padding: '2rem 0' }}>
        {featuredProducts.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>⭐ Featured Products</h2>
              <a href="/shop" style={{ color: '#2e7d32', fontSize: '0.9rem', fontWeight: '600' }}>See All →</a>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        )}

        {products.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>🔥 Latest Products</h2>
              <a href="/shop" style={{ color: '#2e7d32', fontSize: '0.9rem', fontWeight: '600' }}>See All →</a>
            </div>
            <ProductGrid products={products} />
          </div>
        )}

        {products.length === 0 && featuredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <p style={{ marginBottom: '1.5rem' }}>No products available yet.</p>
            <a href="/shop" className="btn-primary" style={{ display: 'inline-block' }}>Browse Shop</a>
          </div>
        )}
      </div>
    </div>
  );
}
