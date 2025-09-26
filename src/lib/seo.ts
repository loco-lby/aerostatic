import { config } from '@/config'

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  structuredData?: Record<string, any>
}

export function generatePageSEO(data: SEOData) {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    structuredData
  } = data

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical || config.baseUrl,
      siteName: 'Aerostatic',
      type: ogType,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: canonical || config.baseUrl,
    },
    other: structuredData ? {
      'structured-data': JSON.stringify(structuredData)
    } : undefined,
  }
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aerostatic',
    description: 'Professional hot air balloon displays and cinematic coverage for festivals, brand launches, and private experiences.',
    url: config.baseUrl,
    logo: `${config.baseUrl}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${config.baseUrl}/work-with-us`,
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    founder: [
      {
        '@type': 'Person',
        name: 'Colby',
        jobTitle: 'Third-Generation Pilot & Creative Director',
      },
      {
        '@type': 'Person',
        name: 'Matteo',
        jobTitle: 'Pilot & Client Relations Manager',
      },
    ],
    serviceArea: {
      '@type': 'Place',
      name: 'Western United States',
    },
  }
}

export function generateServiceStructuredData(services: Array<{ name: string; description: string; price?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: generateOrganizationStructuredData(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hot Air Balloon Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          category: 'Hot Air Balloon Services',
        },
        priceSpecification: service.price ? {
          '@type': 'PriceSpecification',
          price: service.price.replace(/[$,]/g, ''),
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
        } : undefined,
      })),
    },
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
} 