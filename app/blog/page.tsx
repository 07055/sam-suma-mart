import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import styles from "./BlogList.module.css";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Blog – Health Tips & Product Guides",
  description:
    "Expert advice on health, nutrition, and wellness. Read product guides, ingredient deep-dives, and wellness tips from Sam's Suma Mart.",
  openGraph: {
    title: "Blog – Health Tips & Product Guides | Sam's Suma Mart",
    description:
      "Expert advice on health, nutrition, and wellness. Read product guides, ingredient deep-dives, and wellness tips from Sam's Suma Mart.",
    type: "website",
    url: "https://samsumamart.co.ke/blog",
    siteName: "Sam's Suma Mart",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog – Health Tips & Product Guides | Sam's Suma Mart",
    description:
      "Expert advice on health, nutrition, and wellness. Read product guides, ingredient deep-dives, and wellness tips from Sam's Suma Mart.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog – Health Tips & Product Guides",
    description:
      "Expert advice on health, nutrition, and wellness from Sam's Suma Mart.",
    url: "https://samsumamart.co.ke/blog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://samsumamart.co.ke/blog/${post.slug}`,
      })),
    },
  };

  return (
    <section className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="container">
        <div className={styles.hero}>
          <span className={styles.badge}>Our Blog</span>
          <h1 className={styles.title}>Wellness Insights & Product Guides</h1>
          <p className={styles.subtitle}>
            Expert advice on health, nutrition, and getting the most from your BF
            Suma products.
          </p>
        </div>

        <AdBanner slot="XXXXXXXXXX" format="horizontal" />

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>Articles coming soon. Check back shortly!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.card}
              >
                {post.coverImage && (
                  <div className={styles.imageWrap}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{post.category}</span>
                    <time className={styles.date}>
                      {new Date(post.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardDesc}>{post.description}</p>
                  <span className={styles.readMore}>Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <AdBanner slot="YYYYYYYYYY" format="horizontal" />
      </div>
    </section>
  );
}
