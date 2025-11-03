// app/profile/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { AccountManagement } from '@/components/AccountManagement';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchProfileProgress } from '@/utils/modules';
import { useTranslations } from 'next-intl'; 

// Die Preis-IDs bleiben wie gehabt.
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
  const t = useTranslations('profilePage.stripeButton'); 

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
      const errorMessage = error instanceof Error ? error.message : t('unknownError');
      alert(t('checkoutError', { error: errorMessage })); 
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
          {loading ? t('loading') : label} 
        </div>
      </div>
    </button>
  );
}


function ProfileContent() {
  const t = useTranslations('profilePage'); 
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { subscription, isLoading: isLoadingSubscription, syncWithStripe, fetchSubscription } = useSubscription();
  const paymentStatus = searchParams.get('payment');
  const [prog, setProg] = useState({ percent: 0, completed_modules: 0, total_modules: 10 });
  
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');


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
      await fetchSubscription(); 
    } catch (error) {
      console.error('Error reactivating subscription:', error);
    }
  };
  
  const handleCancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;

    setIsCancelling(true);
    setCancelError('');

    try {
      const response = await fetch('/api/stripe/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.stripe_subscription_id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Kündigung fehlgeschlagen.');
      }
      
      await fetchSubscription(); 
      setIsCancelModalOpen(false);

    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setCancelError(error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally {
      setIsCancelling(false);
    }
  };


  if (!user) {
    return <LoadingSpinner />;
  }

  // Hilfsfunktion, um das Datum sicher zu formatieren
  // HIER IST DIE KORREKTUR: 'string' wurde als Typ hinzugefügt
  const getFormattedDate = (date: Date | number | string | undefined) => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return '';
    }
  };

  // Diese Zeile sollte jetzt keinen Fehler mehr verursachen
  const formattedEndDate = getFormattedDate(subscription?.current_period_end);

  return (
    // Hier ist die Korrektur von 'fallback' zu 'FallbackComponent'
    <ErrorBoundary FallbackComponent={() => <div className="p-4 text-red-600 dark:text-red-400">{t('fallbackError')}</div>}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] px-4 py-8">
        <div className="max-w-4xl mx-auto">
           {paymentStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-700 dark:text-green-400">{t('paymentSuccess')}</p>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">{t('title')}</h1>
          <AccountManagement />
          <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('progressCard.title')}</h2>
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
                {t('progressCard.viewModulesLink')}
              </Link>
              <Link
                href={prog.percent >= 100 ? '/exam' : '#'}
                className={`px-4 py-2 rounded-lg ${
                  prog.percent >= 100
                    ? 'bg-black text-white hover:opacity-90'
                    : 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-not-allowed'
                }`}
                aria-disabled={prog.percent < 100}
                onClick={(e) => { if (prog.percent < 100) e.preventDefault(); }}
              >
                {t('progressCard.startExamLink')}
              </Link>
            </div>
          </div>


          <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">{t('subscriptionCard.title')}</h2>
            {isLoadingSubscription ? (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 border-2 border-slate-400 dark:border-slate-600 border-t-transparent rounded-full animate-spin" />
                  <span>{t('subscriptionCard.loading')}</span>
              </div>
            ) : subscription ? (
              <div className="space-y-3 text-slate-800 dark:text-slate-200">
                <div className="flex justify-between">
                    <span className="font-medium">{t('subscriptionCard.statusLabel')}</span>
                    <span className="font-bold text-green-500">
                        {t('subscriptionCard.status.active')}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">{t('subscriptionCard.planLabel')}</span>
                    <span>
                        {subscription.price_id === monthlyPriceId ? t('subscriptionCard.plan.monthly') : t('subscriptionCard.plan.yearly')}
                    </span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">{t('subscriptionCard.nextPaymentLabel')}</span>
                    <span>
                        {formattedEndDate}
                    </span>
                </div>
                 {subscription.cancel_at_period_end ? (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <p className="text-yellow-700 dark:text-yellow-400 mb-2">
                      {t('subscriptionCard.cancelledMessage', { date: formattedEndDate })}
                    </p>
                    <button
                      onClick={handleReactivateSubscription}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      {t('subscriptionCard.reactivateButton')}
                    </button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <button
                      onClick={() => setIsCancelModalOpen(true)}
                      className="w-full px-4 py-2 text-sm text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      {t('subscriptionCard.cancelButton')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-slate-800 dark:text-slate-200">
                  <div className="flex justify-between text-slate-800 dark:text-slate-200">
                    <span className="font-medium">{t('subscriptionCard.statusLabel')}</span>
                    <span className="font-bold text-yellow-500">
                        {t('subscriptionCard.status.none')}
                    </span>
                </div>
                <p className="text-center">{t('subscriptionCard.noSubscription')}</p>
                
                <div className="space-y-3 pt-4">
                  <CustomStripeButton 
                    priceId={monthlyPriceId}
                    label={t('subscriptionCard.subscribeButton')}
                    planName={t('subscriptionCard.plan.monthly')}
                    price={t('stripeButton.priceMonthly')}
                  />
                  <CustomStripeButton 
                    priceId={yearlyPriceId}
                    label={t('subscriptionCard.subscribeButton')}
                    planName={t('subscriptionCard.plan.yearly')}
                    price={t('stripeButton.priceYearly')}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
       
      {isCancelModalOpen && subscription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">{t('cancelModal.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t('cancelModal.confirmation', { date: formattedEndDate })}
                </p>
                {cancelError && (
                    <p className="text-red-500 mb-4">{cancelError}</p>
                )}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setIsCancelModalOpen(false)}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        {t('cancelModal.buttonCancel')}
                    </button>
                    <button
                        onClick={handleCancelSubscription}
                        disabled={isCancelling}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {isCancelling ? t('cancelModal.buttonLoading') : t('cancelModal.buttonConfirm')}
                    </button>
                </div>
            </div>
        </div>
      )}
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