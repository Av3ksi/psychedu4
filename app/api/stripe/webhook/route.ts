// app/api/stripe/webhook/route.ts (NEUE, VEREINFACHTE & KORRIGIERTE VERSION)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { withCors } from '@/utils/cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper-Funktion, um die Daten für die Datenbank zu formatieren (MIT CHECK)
const toSubscriptionData = (subscription: Stripe.Subscription) => {
  // Prüfen, ob current_period_end eine gültige Zahl ist
  const currentPeriodEndTimestamp = typeof subscription.current_period_end === 'number'
    ? subscription.current_period_end * 1000 // In Millisekunden umwandeln
    : null;

  // Nur ein ISO-String erstellen, wenn der Zeitstempel gültig war
  const currentPeriodEndISO = currentPeriodEndTimestamp
    ? new Date(currentPeriodEndTimestamp).toISOString()
    : null; // Fallback auf null, falls der Stripe-Wert ungültig ist

  return {
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    status: subscription.status,
    price_id: subscription.items.data[0]?.price.id,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_end: currentPeriodEndISO, // Den geprüften (oder null) Wert verwenden
    updated_at: new Date().toISOString(),
  };
};


export const POST = withCors(async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`✅ Stripe Webhook received: ${event.type}`);

    // Initialisiere subscription hier, aber weise den Wert im Switch zu
    let subscription: Stripe.Subscription | null = null;
    let userId: string | null = null; // Variable für die User-ID

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (!session.client_reference_id || !session.subscription) {
            throw new Error('Webhook Error: Missing client_reference_id or subscription in session.');
        }

        // Hol die vollständigen Subscription-Daten von Stripe
        subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        userId = session.client_reference_id; // Hol die User-ID aus der Session

        // Bereite die Daten für Supabase vor
        const subscriptionData = {
          ...toSubscriptionData(subscription),
          user_id: userId, // Füge die User-ID hinzu
          created_at: new Date().toISOString(), // Setze created_at nur beim Erstellen
        };

        // Versuche, die Daten in Supabase einzufügen oder zu aktualisieren
        const { error } = await supabaseAdmin
            .from('subscriptions')
            // Verwende upsert, um entweder einen neuen Eintrag zu erstellen oder einen bestehenden zu aktualisieren
            .upsert(subscriptionData, { onConflict: 'stripe_subscription_id' }); 
        
        if (error) {
          console.error('Supabase upsert error:', error);
          throw error;
        }
        console.log(`Subscription ${subscription.id} inserted/updated for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // Hol die Subscription-Daten direkt aus dem Event-Objekt
        subscription = event.data.object as Stripe.Subscription;

        // Bereite die Update-Daten vor (ohne user_id und created_at)
        const updateData = toSubscriptionData(subscription);

        // Aktualisiere den bestehenden Eintrag in Supabase
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update(updateData)
          .eq('stripe_subscription_id', subscription.id);
        
        if (error) {
          console.error('Supabase update error:', error);
          // Wenn der Eintrag nicht gefunden wurde (z.B. weil checkout.session.completed fehlschlug),
          // könnte man hier versuchen, ihn neu zu erstellen, falls nötig.
          // Fürs Erste loggen wir den Fehler.
          if (error.code === 'PGRST116') { // PGRST116 = Row not found
             console.warn(`Subscription ${subscription.id} not found in DB for update, possibly missed checkout.session.completed.`);
             // Optional: Hier könnte man versuchen, den Eintrag neu zu erstellen,
             // aber dafür bräuchten wir die User-ID, die im Subscription-Update-Event nicht direkt drin ist.
             // Man müsste sie über den customer_id holen, was komplexer wird.
          } else {
             throw error;
          }
        } else {
            console.log(`Subscription ${subscription.id} updated.`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`❌ Webhook handler failed: ${errorMessage}`);
    // Gib den detaillierten Fehler zurück, damit Stripe ihn anzeigen kann
    return NextResponse.json({ error: `Webhook handler failed: ${errorMessage}` }, { status: 400 });
  }
});