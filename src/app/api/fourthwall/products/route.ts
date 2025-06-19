import { NextRequest, NextResponse } from 'next/server';
import { getFourthwallProducts } from '@/lib/fourthwall';

const FOURTHWALL_API_BASE = 'https://storefront-api.fourthwall.com';

export async function GET() {
  try {
    console.log('Products API: Starting request');
    const products = await getFourthwallProducts();
    console.log('Products API: Success, returning products:', products.length);
    
    return NextResponse.json({ 
      data: products,
      success: true 
    });
  } catch (error) {
    console.error('Products API: Error fetching products:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        success: false,
        data: []
      },
      { status: 500 }
    );
  }
} 