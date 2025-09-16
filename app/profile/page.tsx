'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useTrialStatus } from '@/hooks/useTrialStatus';

import { AccountManagement } from '@/components/AccountManagement';
import LoadingSpinner from '@/components/LoadingSpinner';
import { StripeBuyButton } from '@/components/StripeBuyButton';
import { ErrorBoundary } from 'react-error-boundary';

// ⬇️ NEU: Progress-Utils importieren
import { fetchProfileProgress } from '@/utils/modules';

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user } = useAuth();
  const { subscription, isLoading: isLoadingSubscription, syncWithStripe, fetchSubscription } = useSubscription();
  const { isInTrial, trialEndTime } = useTrialStatus();

  const paymentStatus = searchParams.get('payment');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⬇️ NEU: State für Studienfortschritt
  const [prog, setProg] = useState({ percent: 0, completed_modules: 0, total_modules: 10 });

  // ⬇️ NEU: Progress laden, wenn User da ist
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
        console.log('Subscription synced with Stripe successfully');
      } catch (err: unknown) {
        console.error('Error syncing with Stripe:', err);
        setError('Unable to load subscription details');
      }
    }
  }, [syncWithStripe, subscription?.stripe_subscription_id]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let refreshAttempts = 0;
    const MAX_REFRESH_ATTEMPTS = 3;
    const REFRESH_INTERVAL = 3000;

    const attemptRefresh = async () => {
      if (refreshAttempts < MAX_REFRESH_ATTEMPTS) {
        refreshAttempts++;
        await fetchSubscription();
        if (isLoadingSubscription) {
          timeoutId = setTimeout(attemptRefresh, REFRESH_INTERVAL);
        }
      } else {
        setError('Loading subscription is taking longer than expected. Please refresh the page.');
      }
    };

    if (isLoadingSubscription) {
      timeoutId = setTimeout(attemptRefresh, REFRESH_INTERVAL);
    }
    return () => timeoutId && clearTimeout(timeoutId);
  }, [isLoadingSubscription, fetchSubscription]);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  useEffect(() => {
    if (user?.id) fetchSubscription();
  }, [user?.id, fetchSubscription]);

  const handleCancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;
    setIsCancelling(true);
    try {
      const response = await fetch('/api/stripe/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.stripe_subscription_id }),
      });
      if (!response.ok) throw new Error('Failed to cancel subscription');
      setIsCancelModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setIsCancelling(false);
    }
  };

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B1120]">
        <div className="text-center text-slate-700 dark:text-slate-300">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-400 dark:border-slate-600 border-t-transparent mb-4 mx-auto" />
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 text-red-600 dark:text-red-400">
          Failed to load subscription details. Please try refreshing.
        </div>
      }
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {paymentStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-700 dark:text-green-400">
                🎉 Thank you for your subscription! Your payment was successful.
              </p>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Profile</h1>

          <AccountManagement />

          {/* ⬇️ NEU: Studienfortschritt-Karte */}
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

          {/* Abo-Status */}
          <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Subscription Status</h2>

            {error ? (
              <div className="text-red-600 dark:text-red-400">{error}</div>
            ) : isLoadingSubscription ? (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <div className="w-4 h-4 border-2 border-slate-400 dark:border-slate-600 border-t-transparent rounded-full animate-spin" />
                <span>Loading subscription details...</span>
              </div>
            ) : subscription ? (
              <div className="space-y-2 text-slate-800 dark:text-slate-200">
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  <span className={subscription.status === 'active' ? 'text-green-600' : 'text-yellow-500'}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Started:</span>{' '}
                  {new Date(subscription.created_at).toLocaleDateString()}
                </p>

                {subscription.status === 'canceled' ? (
                  <div className="mt-4">
                    <Link
                      href="/pay"
                      className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-subtle hover:shadow-hover transition-all"
                    >
                      Resubscribe
                    </Link>
                  </div>
                ) : subscription.cancel_at_period_end ? (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <p className="text-yellow-700 dark:text-yellow-400 mb-2">
                      Your subscription will end on {new Date(subscription.current_period_end).toLocaleDateString()}
                    </p>
                    <button
                      onClick={handleReactivateSubscription}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Resume Subscription
                    </button>
                  </div>
                ) : (subscription.status === 'active' || subscription.status === 'trialing') ? (
                  <button
                    onClick={() => setIsCancelModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4"
                  >
                    Cancel Subscription
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-slate-800 dark:text-slate-200">
                {isInTrial ? (
                  <>
                    <p className="text-yellow-700 dark:text-yellow-400">
                      You are currently in your 48-hour trial period. Your trial will end on{' '}
                      {trialEndTime ? new Date(trialEndTime).toLocaleDateString() : 'soon'}.
                    </p>
                    <p>Subscribe now to continue using the app after the trial ends.</p>
                  </>
                ) : trialEndTime ? (
                  <>
                    <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg mb-4">
                      <p className="text-red-700 dark:text-red-400">
                        Your trial period ended on {new Date(trialEndTime).toLocaleDateString()}.
                      </p>
                      <p className="mt-2">Subscribe now to regain access to the cooking experience.</p>
                    </div>
                  </>
                ) : (
                  <p>Subscribe to unlock the amazing cooking experience.</p>
                )}

                <StripeBuyButton
                  buyButtonId={process.env.NEXT_PUBLIC_STRIPE_BUTTON_ID || ''}
                  publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
                />
              </div>
            )}
          </div>

          {/* Cancel Confirmation Modal */}
          {isCancelModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                  Cancel Subscription?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  You&apos;ll continue to have access until the end of your billing period on{' '}
                  {new Date(subscription?.current_period_end || '').toLocaleDateString()}. No refunds are provided for
                  cancellations.
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => setIsCancelModalOpen(false)}
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                    disabled={isCancelling}
                  >
                    Keep Subscription
                  </button>
                  <button
                    onClick={handleCancelSubscription}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    disabled={isCancelling}
                  >
                    {isCancelling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Canceling...
                      </>
                    ) : (
                      'Yes, Cancel'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
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
