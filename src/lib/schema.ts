import { config } from '@/config';

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function generateVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration || "PT0M0S",
    "contentUrl": video.contentUrl,
    "embedUrl": video.embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Aerostatic",
      "logo": {
        "@type": "ImageObject",
        "url": `${config.baseUrl}/images/logo.png`,
      },
    },
  };
}

export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  image?: string;
  url?: string;
  organizer?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": event.location.address ? {
        "@type": "PostalAddress",
        "streetAddress": event.location.address,
        "addressLocality": event.location.city,
        "addressRegion": event.location.state,
        "addressCountry": event.location.country || "US",
      } : undefined,
    },
    "image": event.image ? [event.image] : undefined,
    "url": event.url,
    "organizer": {
      "@type": "Organization",
      "name": event.organizer || "Aerostatic",
      "url": config.baseUrl,
    },
    "performer": {
      "@type": "Organization",
      "name": "Aerostatic",
      "url": config.baseUrl,
    },
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aerostatic",
      "logo": {
        "@type": "ImageObject",
        "url": `${config.baseUrl}/images/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function generateReviewSchema(review: {
  itemReviewed: string;
  author: string;
  reviewRating: number;
  reviewBody: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Service",
      "name": review.itemReviewed,
    },
    "author": {
      "@type": "Person",
      "name": review.author,
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.reviewRating,
      "bestRating": 5,
      "worstRating": 1,
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  sku?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Aerostatic",
    },
    "offers": product.offers ? {
      "@type": "Offer",
      "price": product.offers.price,
      "priceCurrency": product.offers.priceCurrency,
      "availability": product.offers.availability,
      "url": product.offers.url,
      "seller": {
        "@type": "Organization",
        "name": "Aerostatic",
      },
    } : undefined,
  };
}
