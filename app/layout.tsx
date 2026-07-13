import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "BF Suma Products Kenya | Shop Online – Sam's Suma Mart",
    template: "%s | Sam's Suma Mart",
  },
  description: "Shop authentic BF Suma products online in Kenya. Browse anti-aging skincare, immune boosters, NMN supplements, joint care & more. Fast delivery across Nairobi & all counties.",
  metadataBase: new URL('https://samsumamart.co.ke'),
  robots: { index: true, follow: true },
  verification: {
    google: 'DHfA53dOVgEFxVwf5pSswOyJBRADoaTXHif3eIVX59g',
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: "Sam's Suma Mart",
    title: "BF Suma Products Kenya | Shop Online – Sam's Suma Mart",
    description: "Shop authentic BF Suma products online in Kenya. Browse anti-aging skincare, immune boosters, NMN supplements, joint care & more. Fast delivery across Nairobi & all counties.",
    images: [{ url: '/logo.svg', width: 200, height: 200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BF Suma Products Kenya | Shop Online – Sam's Suma Mart",
    description: "Shop authentic BF Suma products online in Kenya. Browse anti-aging skincare, immune boosters, NMN supplements, joint care & more. Fast delivery across Nairobi & all counties.",
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJson = organizationSchema();
  const localJson = localBusinessSchema();
  return (
    <html lang="en">
      <body>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9132897909170105"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localJson) }}
        />
      </body>
    </html>
  );
}
