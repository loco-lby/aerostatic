import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { packageId, accessCode, email } = await request.json();
    
    // Get the origin from the request headers
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!packageId || !accessCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Fetch package details
    const { data: packageData, error: packageError } = await supabase
      .from('media_packages')
      .select('*')
      .eq('id', packageId)
      .eq('access_code', accessCode)
      .eq('is_active', true)
      .gte('expires_at', new Date().toISOString())
      .single();

    if (packageError || !packageData) {
      return NextResponse.json(
        { error: 'Invalid or expired package' },
        { status: 404 }
      );
    }

    // Check if package requires purchase
    if (!packageData.requires_purchase || packageData.is_comp) {
      return NextResponse.json(
        { error: 'Package does not require purchase' },
        { status: 400 }
      );
    }

    // Check if user already purchased
    if (email) {
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('*')
        .eq('package_id', packageId)
        .eq('email', email)
        .eq('status', 'succeeded')
        .single();

      if (existingPurchase) {
        return NextResponse.json(
          { error: 'Already purchased', alreadyPurchased: true },
          { status: 400 }
        );
      }
    }

    // Create or retrieve Stripe Price
    let priceId = packageData.stripe_price_id;
    
    if (!priceId && packageData.price_cents) {
      // Create a one-time price for this package
      const price = await stripe.prices.create({
        unit_amount: packageData.price_cents,
        currency: STRIPE_CONFIG.currency,
        product_data: {
          name: `Aeromedia Package - ${packageData.passenger_names?.join(', ') || 'Flight Media'}`,
          metadata: {
            package_id: packageId,
            access_code: accessCode,
            flight_date: packageData.flight_date,
          },
        },
      });
      priceId = price.id;

      // Store the price ID for future use
      await supabase
        .from('media_packages')
        .update({ stripe_price_id: priceId })
        .eq('id', packageId);
    }

    if (!priceId) {
      return NextResponse.json(
        { error: 'No price configured for this package' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/tools/aeromedia/success?session_id={CHECKOUT_SESSION_ID}&package=${packageId}&code=${accessCode}`,
      cancel_url: `${origin}/tools/aeromedia/${accessCode}`,
      customer_email: email || undefined,
      metadata: {
        package_id: packageId,
        access_code: accessCode,
        operator_id: packageData.operator_id || '',
      },
      payment_intent_data: {
        metadata: {
          package_id: packageId,
          access_code: accessCode,
        },
      },
    });

    // Track checkout opened event
    await supabase.rpc('track_event', {
      p_package_id: packageId,
      p_event_type: 'checkout_opened',
      p_email: email || null,
      p_metadata: {
        session_id: session.id,
        price_cents: packageData.price_cents,
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}