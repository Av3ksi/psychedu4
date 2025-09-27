// app/api/stripe/checkout/route.ts (repariert & ohne Trial)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
  }

  let user;
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    user = session.user;
  } else {
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: userData, error } = await supabase.auth.getUser(token);
      if (!error && userData.user) {
        user = userData.user; // KORREKTUR: Diese Zeile wurde repariert
      }
    }
  }

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      // subscription_data: { trial_period_days: 3 }, // ENTFERNT
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      client_reference_id: user.id,
      customer_email: user.email,
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to create checkout session: ${errorMessage}` }, { status: 500 });
  }
}