import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className="container" style={{ padding: '1rem 0', marginBottom: '2rem' }}>
            <div className={styles.hero}>
                <div className={styles.content}>
                    <span className={styles.badge}>
                        ✨ #1 BF Suma Store in Kenya
                    </span>
                    <h1 className={styles.title}>
                        Premium BF Suma Wellness Delivered.
                    </h1>
                    <p className={styles.description}>
                        From anti-aging skincare to immune-boosting supplements, get authentic BF Suma products delivered to your doorstep.
                    </p>
                    <div>
                        <Link href="/shop" className="btn-primary" style={{
                            background: 'white',
                            color: 'var(--medical-blue)',
                            fontWeight: '700',
                            padding: '0.8rem 1.5rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderRadius: '8px',
                        }}>
                            SHOP NOW →
                        </Link>
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <img
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
                        alt="BF Suma Products"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}
