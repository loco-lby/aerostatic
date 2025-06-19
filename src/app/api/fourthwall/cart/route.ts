import { NextRequest, NextResponse } from 'next/server';

const FOURTHWALL_API_BASE = 'https://storefront-api.fourthwall.com';

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN) {
      return NextResponse.json(
        { error: 'Fourthwall storefront token not configured' },
        { status: 500 }
      );
    }

    // Create cart with Fourthwall Storefront API using correct format
    const storefrontToken = process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN;
    const response = await fetch(`${FOURTHWALL_API_BASE}/v1/carts?storefront_token=${storefrontToken}&currency=USD`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items.map((item: any) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fourthwall cart creation failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to create cart' },
        { status: response.status }
      );
    }

    const cartData = await response.json();
    return NextResponse.json(cartData);

  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN) {
      return NextResponse.json(
        { error: 'Fourthwall storefront token not configured' },
        { status: 500 }
      );
    }

    // Get cart from Fourthwall API using storefront token
    const storefrontToken = process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN;
    const response = await fetch(`${FOURTHWALL_API_BASE}/v1/carts/${cartId}?storefront_token=${storefrontToken}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fourthwall cart fetch failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch cart' },
        { status: response.status }
      );
    }

    const cartData = await response.json();
    return NextResponse.json(cartData);

  } catch (error) {
    console.error('Cart fetch API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 