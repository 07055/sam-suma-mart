import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import styles from "./BlogList.module.css";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <span className={styles.badge}>Our Blog</span>
          <h1 className={styles.title}>Wellness Insights & Product Guides</h1>
          <p className={styles.subtitle}>
            Expert advice on health, nutrition, and getting the most from your BF
            Suma products.
          </p>
        </div>

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
      </div>
    </section>
  );
}
