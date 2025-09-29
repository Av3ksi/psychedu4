// app/api/stripe/webhook/route.ts (NEUE, VEREINFACHTE VERSION)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { withCors } from '@/utils/cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper-Funktion, um die Daten für die Datenbank zu formatieren
const toSubscriptionData = (subscription: Stripe.Subscription) => {
  return {
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    status: subscription.status,
    price_id: subscription.items.data[0]?.price.id,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export const POST = withCors(async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`✅ Stripe Webhook received: ${event.type}`);

    const subscription = event.data.object as Stripe.Subscription;

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (!session.client_reference_id || !session.subscription) {
            throw new Error('Webhook Error: Missing client_reference_id or subscription in session.');
        }

        const fullSubscription = await stripe.subscriptions.retrieve(session.subscription as string);

        const subscriptionData = {
          ...toSubscriptionData(fullSubscription),
          user_id: session.client_reference_id, // Wichtig: Die User-ID vom Checkout
          created_at: new Date().toISOString(),
        };

        const { error } = await supabaseAdmin
            .from('subscriptions')
            .upsert(subscriptionData, { onConflict: 'stripe_subscription_id' });
        
        if (error) {
          console.error('Supabase upsert error:', error);
          throw error;
        }
        console.log(`Subscription ${subscription.id} inserted/updated for user ${session.client_reference_id}`);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update(toSubscriptionData(subscription))
          .eq('stripe_subscription_id', subscription.id);
        
        if (error) {
          console.error('Supabase update error:', error);
          throw error;
        }
        console.log(`Subscription ${subscription.id} updated.`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`❌ Webhook handler failed: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook handler failed: ${errorMessage}` }, { status: 400 });
  }
});