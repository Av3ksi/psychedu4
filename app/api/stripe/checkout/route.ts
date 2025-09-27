// app/api/stripe/checkout/route.ts (NEUE, ROBUSTERE VERSION)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/utils/supabase-admin'; // Admin-Client für Fallback

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
  }

  let user = null;

  // VERSUCH 1: Benutzer über Cookies holen (Standardweg)
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    user = session.user;
  }

  // VERSUCH 2 (FALLBACK): Benutzer über Authorization-Header holen
  // Dies ist sehr nützlich für localhost und direkte API-Aufrufe.
  if (!user) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: userData, error } = await supabase.auth.getUser(token);
      if (!error && userData.user) {
        user = userData.user;
      }
    }
  }
  
  if (!user) {
    // Wenn beide Methoden fehlschlagen, geben wir den Fehler zurück.
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
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