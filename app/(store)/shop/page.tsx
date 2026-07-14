import ProductGrid from "@/components/ProductGrid";
import CategoryAccordion from "@/components/CategoryAccordion";
import { getPrisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { collectionPageSchema } from "@/lib/seo";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Buy BF Suma Products Online Kenya – Shop All Categories",
  description: "Browse the full catalog of authentic BF Suma products. Anti-aging skincare, immunity builders, NMN supplements, joint care, digestive health & more. Order online with delivery in Kenya and international shipping.",
  openGraph: {
    title: "Buy BF Suma Products Online Kenya – Shop All Categories | Sam's Suma Mart",
    description: "Browse the full catalog of authentic BF Suma products. Anti-aging skincare, immunity builders, NMN supplements, joint care, digestive health & more. Order online with delivery in Kenya and international shipping.",
    images: [{ url: '/logo.svg', width: 200, height: 200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Buy BF Suma Products Online Kenya – Shop All Categories | Sam's Suma Mart",
    description: "Browse the full catalog of authentic BF Suma products. Anti-aging skincare, immunity builders, NMN supplements, joint care, digestive health & more. Order online with delivery in Kenya and international shipping.",
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: '/shop',
  },
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
    const params = await searchParams;
    const query = params.q;
    const category = params.category;

    const prisma = getPrisma()
    const collectionJson = collectionPageSchema(
      query ? `Search: "${query}"` : category ? category : 'Shop All Products',
      "Browse the full catalog of authentic BF Suma health supplements, skincare, and wellness products in Kenya."
    )

    const allCategories = await prisma.product.findMany({
        select: { category: true },
        distinct: ['category'],
    })
    const categories = allCategories.map(c => c.category)

    let products: any[] = []
    const where: any = {}
    if (query) {
        where.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
        ]
    }
    if (category) {
        where.category = category
    }

    products = await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJson) }}
            />
            <div className="shop-layout">
                {/* Sidebar - Categories */}
                <div className="shop-sidebar">
                    <CategoryAccordion categories={categories} currentCategory={category} />
                </div>

                {/* Products */}
                <div className="shop-main">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                            {query ? `Search: "${query}"` : category ? category : 'Shop All Products'}
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>{products.length} product{products.length !== 1 ? 's' : ''} found</p>
                    </div>

                    {products.length > 0 ? (
                        <ProductGrid products={products} />
                    ) : (
                        <div className="section-card" style={{ textAlign: 'center', padding: '3rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <p style={{ color: '#666' }}>No products found. Try a different search or category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
