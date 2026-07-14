const BASE_URL = 'https://samsumamart.co.ke'
const SITE_NAME = "Sam's Suma Mart"

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
    telephone: '+254-796-388-790',
      contactType: 'customer service',
      availableLanguage: ['English', 'Swahili'],
    },
    sameAs: [
      'https://www.facebook.com/samsumamart',
      'https://www.instagram.com/samsumamart',
      'https://wa.me/254796388790',
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: SITE_NAME,
    image: `${BASE_URL}/logo.svg`,
    url: BASE_URL,
    telephone: '+254-700-000-000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
    },
    priceRange: '$$',
    currenciesAccepted: 'KES',
    openingHours: 'Mo-Sa 08:00-18:00',
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Authentic BF Suma health supplements, skincare, and wellness products delivered to your doorstep in Kenya.",
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function productSchema(product: {
  name: string
  description: string
  images: string
  price: number
  slug: string
  category: string
  stock: number
  reviewRating?: number
  reviewCount?: number
}) {
  const image = getFirstImage(product.images)
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description.slice(0, 300),
    image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    sku: product.slug,
    mpn: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'BF Suma',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KES',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/products/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  }

  if (product.reviewRating && product.reviewCount && product.reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.reviewRating,
      reviewCount: product.reviewCount,
    }
  }

  return schema
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

export function collectionPageSchema(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${BASE_URL}/shop`,
    about: {
      '@type': 'Thing',
      name: 'BF Suma Health & Wellness Products',
    },
  }
}

export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    description:
      'Learn about Sam\'s Suma Mart — your trusted source for authentic BF Suma health, wellness, and beauty products in Kenya.',
    url: `${BASE_URL}/story`,
  }
}

function getFirstImage(images: string): string {
  if (!images) return '/placeholder.jpg'
  try {
    const parsed = JSON.parse(images)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed[0]
    return images
  } catch {
    return images || '/placeholder.jpg'
  }
}
