import { NextResponse } from 'next/server';

const STOREFRONT_TOKEN = process.env.FOURTHWALL_STOREFRONT_TOKEN;

export async function GET() {
  try {
    // Use the STOREFRONT API - not the Open API
    const response = await fetch('https://api.fourthwall.com/v1.2/store/aerostatic-shop/offers', {
      headers: {
        'X-Storefront-Token': STOREFRONT_TOKEN || '',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Fourthwall Storefront API error:', response.status);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    // Transform offers to our product format
    const products = (data.offers || []).map((offer: any) => ({
      id: offer.id,
      name: offer.name,
      price: Math.round(offer.price.amount / 100), // Convert cents to dollars
      description: offer.description || '',
      images: offer.images?.map((img: any) => ({
        url: img.src,
        alt: img.alt || offer.name
      })) || [{ url: '/images/placeholder.webp', alt: 'Product' }],
      variants: offer.variants?.map((v: any) => ({
        id: v.id,
        name: v.name,
        price: Math.round(v.price.amount / 100),
        available: v.available
      })) || [],
      featured: offer.featured || false,
      stock: offer.available ? 'In Stock' : 'Limited',
      url: `https://aerostatic-shop.fourthwall.com/en-usd/products/${offer.slug}`
    }));

    return NextResponse.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Error fetching from Storefront API:', error);

    // Return placeholder products
    return NextResponse.json({
      success: true,
      data: [
        {
          id: 'placeholder-1',
          name: 'Visit Our Store',
          price: 0,
          description: 'Browse our full collection on Fourthwall',
          images: [{ url: '/images/placeholder.webp', alt: 'Aerostatic Merch' }],
          variants: [],
          featured: true,
          stock: 'Available',
          url: 'https://aerostatic-shop.fourthwall.com/en-usd/collections/all'
        }
      ]
    });
  }
}