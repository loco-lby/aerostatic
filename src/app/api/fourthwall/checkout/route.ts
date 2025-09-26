import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cart } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: 'Invalid cart data' },
        { status: 400 }
      );
    }

    // For now, we'll redirect to the main store
    // In a full implementation, you could create a cart using Fourthwall's API
    // and get a specific checkout URL

    // Build URL with product information if needed
    const checkoutUrl = 'https://aerostatic-shop.fourthwall.com';

    return NextResponse.json({
      success: true,
      checkoutUrl,
      fallback: true, // Indicates we're using fallback redirect
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      {
        error: 'Failed to create checkout',
        checkoutUrl: 'https://aerostatic-shop.fourthwall.com',
        fallback: true
      },
      { status: 500 }
    );
  }
}