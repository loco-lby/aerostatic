import { NextRequest, NextResponse } from 'next/server';

const FOURTHWALL_API_BASE = 'https://storefront-api.fourthwall.com';
const FOURTHWALL_CHECKOUT_DOMAIN = 'https://aerostatic-shop.fourthwall.com';

export async function POST(request: NextRequest) {
  try {
    const { cart } = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Get storefront token from environment
    const storefrontToken = process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN;
    if (!storefrontToken) {
      console.warn('No Fourthwall storefront token found, redirecting to main store');
      return NextResponse.json({ 
        checkoutUrl: FOURTHWALL_CHECKOUT_DOMAIN,
        fallback: true,
        message: 'Redirecting to Aerostatic store'
      });
    }

    // Create cart with Fourthwall Storefront API using correct format
    const cartItems = cart.map((item: any) => ({
      variantId: item.variantId,
      quantity: item.quantity
    }));

    // Use the correct endpoint format from the documentation
    const createCartUrl = `${FOURTHWALL_API_BASE}/v1/carts?storefront_token=${storefrontToken}&currency=USD`;

    const createCartResponse = await fetch(createCartUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems
      })
    });

    if (!createCartResponse.ok) {
      const errorText = await createCartResponse.text();
      console.error('Failed to create cart with Fourthwall API:', createCartResponse.status, errorText);
      console.warn('Falling back to main store');
      return NextResponse.json({ 
        checkoutUrl: FOURTHWALL_CHECKOUT_DOMAIN,
        fallback: true,
        message: 'Redirecting to Aerostatic store'
      });
    }

    const cartData = await createCartResponse.json();
    console.log('Cart created successfully:', cartData);
    
    if (cartData.id) {
      // Create checkout URL with cart ID
      const checkoutUrl = `${FOURTHWALL_CHECKOUT_DOMAIN}/checkout/?cartCurrency=USD&cartId=${cartData.id}`;
      
      return NextResponse.json({ 
        checkoutUrl,
        cartId: cartData.id,
        message: 'Cart created successfully'
      });
    } else {
      // Fallback to main store
      return NextResponse.json({ 
        checkoutUrl: FOURTHWALL_CHECKOUT_DOMAIN,
        fallback: true,
        message: 'Redirecting to Aerostatic store'
      });
    }

  } catch (error) {
    console.error('Checkout API error:', error);
    // Always fallback to the main store
    return NextResponse.json({ 
      checkoutUrl: FOURTHWALL_CHECKOUT_DOMAIN,
      fallback: true,
      message: 'Redirecting to Aerostatic store'
    });
  }
} 