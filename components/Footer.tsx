import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './Footer.module.css';

export default async function Footer() {
    const cookieStore = await cookies()
    const country = cookieStore.get('country-override')?.value
        || cookieStore.get('country')?.value
        || 'KE'
    const isKenya = !country || country === 'KE'

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.grid}`}>
                <div>
                    <h4 className={styles.heading}>SSM</h4>
                    <p className={styles.text}>Sam's Suma Mart — your trusted source for authentic BF Suma health, wellness, and beauty products.</p>
                    {isKenya && (
                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#bbb' }}>
                            <div style={{ marginBottom: '0.3rem' }}>📱 Paybill: <strong style={{ color: '#fff' }}>303030</strong></div>
                            <div>📋 Account: <strong style={{ color: '#fff' }}>2052132897</strong></div>
                        </div>
                    )}
                    <div className={styles.whatsapp}>
                        <a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer">💬 WhatsApp: 0796 388 790</a>
                    </div>
                </div>

                <div>
                    <h4 className={styles.heading}>NEED HELP?</h4>
                    <ul className={styles.list}>
                        <li><Link href="/">Help Center</Link></li>
                        <li><a href="https://wa.me/254796388790" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
                        <li><Link href="/">Delivery options</Link></li>
                        <li><Link href="/">Return Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className={styles.heading}>CATEGORIES</h4>
                    <ul className={styles.list}>
                        <li><Link href="/shop?category=Better Life">Skincare & Beauty</Link></li>
                        <li><Link href="/shop?category=Immunity Builders">Immune Support</Link></li>
                        <li><Link href="/shop?category=Premium Selected">NMN Anti-Aging</Link></li>
                        <li><Link href="/blog">Health Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className={styles.heading}>MY ACCOUNT</h4>
                    <ul className={styles.list}>
                        <li><Link href="/login">Sign In</Link></li>
                        <li><Link href="/register">Create Account</Link></li>
                        <li><Link href="/orders">My Orders</Link></li>
                        <li><Link href="/cart">My Cart</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                © 2026 Sam's Suma Mart (SSM). All Rights Reserved.
            </div>
        </footer>
    );
}
