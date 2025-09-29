// app/profile/page.tsx (Stabile Version)
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { AccountManagement } from '@/components/AccountManagement';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchProfileProgress } from '@/utils/modules';

// Die Preis-IDs werden hier als Konstanten definiert.
const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '';
const yearlyPriceId = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || '';

// CustomStripeButton Komponente
interface CustomStripeButtonProps {
  priceId: string;
  label: string;
  planName: string;
  price: string;
}

function CustomStripeButton({ priceId, label, planName, price }: CustomStripeButtonProps) {
  const [loading, setLoading] = useState(false);
  const { supabase } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      if (!priceId) {
        throw new Error('Price ID is missing. Please check your environment variables.');
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User is not authenticated.');
      }
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      });
      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert(`Ein Fehler ist aufgetreten: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || !priceId}
      className="w-full text-left p-4 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 transition-all"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">{planName}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{price}</p>
        </div>
        <div className="px-4 py-2 bg-primary text-white rounded-lg">
          {loading ? 'Lade...' : label}
        </div>
      </div>
    </button>
  );
}


function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { subscription, isLoading: isLoadingSubscription, syncWithStripe, fetchSubscription } = useSubscription();
  const paymentStatus = searchParams.get('payment');
  const [prog, setProg] = useState({ percent: 0, completed_modules: 0, total_modules: 10 });

  useEffect(() => {
    if (!user?.id) return;
    fetchProfileProgress().then(setProg).catch(() => setProg({ percent: 0, completed_modules: 0, total_modules: 10 }));
  }, [user?.id]);

  useEffect(() => {
    if (paymentStatus === 'success') {
      console.log('Payment successful!');
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (subscription?.stripe_subscription_id) {
      try {
        syncWithStripe(subscription.stripe_subscription_id);
      } catch (err: unknown) {
        console.error('Error syncing with Stripe:', err);
      }
    }
  }, [syncWithStripe, subscription?.stripe_subscription_id]);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  useEffect(() => {
    if (user?.id) fetchSubscription();
  }, [user?.id, fetchSubscription]);
    
  const handleReactivateSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;
    try {
      const response = await fetch('/api/stripe/reactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.stripe_subscription_id }),
      });
      if (!response.ok) throw new Error('Failed to reactivate subscription');
      router.refresh();
    } catch (error) {
      console.error('Error reactivating subscription:', error);
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-600 dark:text-red-400">Failed to load subscription details.</div>}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {paymentStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-700 dark:text-green-400">🎉 Danke für dein Abonnement! Deine Zahlung war erfolgreich.</p>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Profil</h1>
          <AccountManagement />
          <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Studienfortschritt</h2>
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {prog.completed_modules}/{prog.total_modules} · {prog.percent}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded">
              <div className="h-2 rounded bg-black dark:bg-white" style={{ width: `${prog.percent}%` }} />
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href="/modules"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Module ansehen/abhaken
              </Link>
              <Link
                href={prog.percent >= 100 ? '/exam' : '/modules'}
                className={`px-4 py-2 rounded-lg ${
                  prog.percent >= 100
                    ? 'bg-black text-white hover:opacity-90'
                    : 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-not-allowed'
                }`}
                aria-disabled={prog.percent < 100}
              >
                Grosse Prüfung starten
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Abonnement-Status</h2>
            {isLoadingSubscription ? (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 border-2 border-slate-400 dark:border-slate-600 border-t-transparent rounded-full animate-spin" />
                  <span>Lade Abo-Details...</span>
              </div>
            ) : subscription ? (
              <div className="space-y-3 text-slate-800 dark:text-slate-200">
                <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className="font-bold text-green-500">
                        Premium Aktiv
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Aktueller Plan:</span>
                    <span>
                        {subscription.price_id === monthlyPriceId ? 'Monats-Abo' : 'Jahres-Abo'}
                    </span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">Nächste Zahlung:</span>
                    <span>
                        {new Date(subscription.current_period_end).toLocaleDateString()}
                    </span>
                </div>
                 {subscription.cancel_at_period_end ? (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <p className="text-yellow-700 dark:text-yellow-400 mb-2">
                      Dein Abo ist gekündigt und endet am {new Date(subscription.current_period_end).toLocaleDateString()}
                    </p>
                    <button
                      onClick={handleReactivateSubscription}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Abo reaktivieren
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-4">Du kannst dein Abo in den Stripe-Einstellungen verwalten.</p>
                )}
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-slate-800 dark:text-slate-200">
                 <div className="flex justify-between text-slate-800 dark:text-slate-200">
                    <span className="font-medium">Status:</span>
                    <span className="font-bold text-yellow-500">
                        Kein Premium
                    </span>
                </div>
                <p className="text-center">Wähle einen Plan, um vollen Zugriff zu erhalten.</p>
                
                <div className="space-y-3 pt-4">
                  <CustomStripeButton 
                    priceId={monthlyPriceId}
                    label="Abonnieren"
                    planName="Monats-Abo"
                    price="20 CHF / Monat"
                  />
                  <CustomStripeButton 
                    priceId={yearlyPriceId}
                    label="Abonnieren"
                    planName="Jahres-Abo"
                    price="200 CHF / Jahr"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileContent />
    </Suspense>
  );
}