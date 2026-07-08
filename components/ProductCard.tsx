'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';
import { useCart } from '@/lib/CartContext';
import { useState } from 'react';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: string;
    images: string | string[];
    description?: string;
}

function getFirstImage(images: string | string[]): string {
    if (Array.isArray(images)) {
        return images[0] || '/placeholder.jpg';
    }
    if (typeof images === 'string' && images) {
        return images;
    }
    return '/placeholder.jpg';
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const oldPrice = product.price * 1.25;
    const firstImage = getFirstImage(product.images || '');
    const [descExpanded, setDescExpanded] = useState(false);
    const isLong = (product.description?.length ?? 0) > 80;

    return (
        <div className={styles.card}>
            <Link href={`/products/${product.slug}`} className={styles.imageContainer}>
                <img
                    src={firstImage}
                    alt={`${product.name} – BF Suma ${product.category} Kenya`}
                    className={styles.image}
                    loading="lazy"
                />
                <div className={styles.discountBadge}>-25%</div>
            </Link>

            <div className={styles.details}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.priceContainer}>
                    <span className={styles.priceNew}>KSh {product.price.toLocaleString()}</span>
                    <span className={styles.priceOld}>KSh {oldPrice.toLocaleString()}</span>
                </div>
                <div className={styles.rating}>
                    ★★★★★ <span style={{ fontSize: '0.7rem', color: '#757575' }}>(12)</span>
                </div>
                {product.description && (
                    <div className={descExpanded ? styles.descriptionExpanded : styles.description}>
                        {product.description}
                    </div>
                )}
                {isLong && (
                    <button
                        className={styles.moreBtn}
                        onClick={(e) => { e.preventDefault(); setDescExpanded(!descExpanded) }}
                    >
                        {descExpanded ? 'show less' : '...more'}
                    </button>
                )}
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                }}
                className={styles.atcBtn}
            >
                ADD TO CART
            </button>
        </div>
    );
}
