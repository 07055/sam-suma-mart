import type { Metadata } from "next";
import { aboutPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Sam's Suma Mart — your trusted source for authentic BF Suma health, wellness, and beauty products in Kenya. Our story, our promise.",
  openGraph: {
    title: "About Sam's Suma Mart",
    description: "Learn about Sam's Suma Mart — your trusted source for authentic BF Suma health, wellness, and beauty products in Kenya.",
    images: [{ url: '/logo.svg', width: 200, height: 200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Sam's Suma Mart",
    description: "Learn about Sam's Suma Mart — your trusted source for authentic BF Suma health, wellness, and beauty products in Kenya.",
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: '/story',
  },
}

export default function StoryPage() {
    const aboutJson = aboutPageSchema()
    return (
        <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJson) }}
        />
        <div className="container" style={{ padding: '8rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>About Sam's Suma Mart</h1>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#444', marginBottom: '2rem' }}>
                SSM was founded to bring authentic BF Suma health, wellness, and beauty products
                to customers across Kenya. We believe that access to premium supplements,
                skincare, and wellness products should be easy, affordable, and dependable.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                From anti-aging skincare and NMN supplements to immune-boosting mushroom coffees
                and joint care formulas, every product in our catalog is carefully selected
                to meet BF Suma's strict quality standards. We partner with trusted manufacturers
                to ensure you get genuine products at fair prices, delivered right to your doorstep.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginTop: '2rem' }}>
                <strong>Our Promise:</strong> Quality products, fast delivery, and excellent customer service
                — because your health matters.
            </p>
        </div>
        </>
    );
}
