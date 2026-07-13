import Link from 'next/link';
import styles from './CategoryGrid.module.css';

const categories = [
    { name: 'Skincare & Beauty', icon: '✨', slug: 'Better Life' },
    { name: 'Immune Support', icon: '🛡️', slug: 'Immunity Builders' },
    { name: 'NMN Anti-Aging', icon: '🧬', slug: 'Premium Selected' },
    { name: 'Joint & Bone Care', icon: '🦴', slug: 'Sport Fit' },
    { name: 'Coffee & Tea', icon: '☕', slug: 'Coffee' },
    { name: 'Digestive Health', icon: '🌿', slug: 'Suma Digsetive Health' },
    { name: 'Kids & Baby', icon: '👶', slug: 'Suma Baby' },
    { name: 'Personal Care', icon: '🧴', slug: 'Suma Self Care' },
];

export default function CategoryGrid() {
    return (
        <div className={`section-card ${styles.grid}`}>
            {categories.map((cat) => (
                <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className={styles.item}>
                    <div className={styles.icon}>{cat.icon}</div>
                    <span className={styles.name}>{cat.name}</span>
                </Link>
            ))}
        </div>
    );
}
