import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import styles from "./Article.module.css";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://samsumamart.co.ke/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url,
      siteName: "Sam's Suma Mart",
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://samsumamart.co.ke/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "Sam's Suma Mart",
      url: "https://samsumamart.co.ke",
    },
    publisher: {
      "@type": "Organization",
      name: "Sam's Suma Mart",
      logo: {
        "@type": "ImageObject",
        url: "https://samsumamart.co.ke/logo.svg",
      },
    },
    ...(post.coverImage && {
      image: post.coverImage.startsWith("http")
        ? post.coverImage
        : `https://samsumamart.co.ke${post.coverImage}`,
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://samsumamart.co.ke/blog/${slug}`,
    },
  };

  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span className={styles.current}>{post.title}</span>
        </nav>

        {post.coverImage && (
          <div className={styles.heroImage}>
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.articleMeta}>
              <span className={styles.category}>{post.category}</span>
              <time>
                {new Date(post.date).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.markdown}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <AdBanner slot="ZZZZZZZZZZ" format="horizontal" />
          </div>

          <aside className={styles.sidebar}>
            <AdBanner slot="WWWWWWWWWW" format="vertical" style={{ marginBottom: '1.25rem' }} />

            <div className={styles.ctaCard}>
              <div className={styles.ctaAccent} />
              <h3 className={styles.ctaTitle}>Shop This Product</h3>
              <p className={styles.ctaText}>
                Ready to experience the benefits described in this article? Get
                authentic BF Suma products delivered straight to your door.
              </p>
              {post.productSlug ? (
                <Link
                  href={`/products/${post.productSlug}`}
                  className={styles.ctaButton}
                >
                  View Product &amp; Order →
                </Link>
              ) : (
                <Link href="/shop" className={styles.ctaButton}>
                  Browse Our Store →
                </Link>
              )}
            </div>

            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>Need Help Choosing?</h3>
              <p className={styles.ctaText}>
                Our team is ready to assist you with product recommendations and
                orders.
              </p>
              <a
                href="https://wa.me/254796388790"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                Chat on WhatsApp →
              </a>
            </div>

            <div className={styles.backLink}>
              <Link href="/blog">← Back to All Articles</Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
