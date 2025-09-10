import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_CONFIG.webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract metadata
        const packageId = session.metadata?.package_id;
        const accessCode = session.metadata?.access_code;
        const operatorId = session.metadata?.operator_id;
        
        if (!packageId) {
          console.error('Missing package_id in session metadata');
          return NextResponse.json({ received: true });
        }

        // Check if purchase already exists (idempotency)
        const { data: existingPurchase } = await supabase
          .from('purchases')
          .select('*')
          .eq('stripe_session_id', session.id)
          .single();

        if (existingPurchase) {
          console.log('Purchase already processed:', session.id);
          return NextResponse.json({ received: true });
        }

        // Create purchase record
        const { error: purchaseError } = await supabase
          .from('purchases')
          .insert({
            package_id: packageId,
            operator_id: operatorId || null,
            email: session.customer_email || session.customer_details?.email || '',
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent as string,
            amount_cents: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'succeeded',
            metadata: {
              access_code: accessCode,
              customer_name: session.customer_details?.name,
              payment_status: session.payment_status,
            },
          });

        if (purchaseError) {
          console.error('Failed to create purchase record:', purchaseError);
          // Don't return error - Stripe will retry
        }

        // Track payment success
        await supabase.rpc('track_event', {
          p_package_id: packageId,
          p_event_type: 'payment_succeeded',
          p_email: session.customer_email || null,
          p_metadata: {
            session_id: session.id,
            amount_cents: session.amount_total,
          },
        });

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const packageId = paymentIntent.metadata?.package_id;

        if (packageId) {
          // Update purchase status if exists
          await supabase
            .from('purchases')
            .update({ 
              status: 'failed',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_payment_intent', paymentIntent.id);

          // Track payment failure
          await supabase.rpc('track_event', {
            p_package_id: packageId,
            p_event_type: 'payment_failed',
            p_metadata: {
              payment_intent_id: paymentIntent.id,
              error: paymentIntent.last_payment_error?.message,
            },
          });
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        
        // Find purchase by payment intent
        const { data: purchase } = await supabase
          .from('purchases')
          .select('*')
          .eq('stripe_payment_intent', charge.payment_intent)
          .single();

        if (purchase) {
          // Update purchase status
          await supabase
            .from('purchases')
            .update({ 
              status: 'refunded',
              updated_at: new Date().toISOString(),
            })
            .eq('id', purchase.id);

          // Track refund
          await supabase.rpc('track_event', {
            p_package_id: purchase.package_id,
            p_event_type: 'payment_refunded',
            p_email: purchase.email,
            p_metadata: {
              charge_id: charge.id,
              amount_refunded: charge.amount_refunded,
            },
          });
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const packageId = session.metadata?.package_id;

        if (packageId) {
          // Track expired checkout
          await supabase.rpc('track_event', {
            p_package_id: packageId,
            p_event_type: 'checkout_expired',
            p_email: session.customer_email || null,
            p_metadata: {
              session_id: session.id,
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return success to prevent Stripe retries for processing errors
    return NextResponse.json({ received: true });
  }
}

// Stripe webhooks require raw body
export const config = {
  api: {
    bodyParser: false,
  },
};