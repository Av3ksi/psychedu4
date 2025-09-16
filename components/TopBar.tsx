'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { BuyMeCoffee } from './BuyMeCoffee';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { subscription, isLoading: isLoadingSubscription } = useSubscription();
  const { isInTrial } = useTrialStatus();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to sign out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className="
        w-full sticky top-0
        z-[200] relative
        bg-white/90 dark:bg-neutral-darker/80
        backdrop-blur-sm
        border-b border-slate-200 dark:border-slate-700
        text-slate-900 dark:text-slate-100
      "
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/"
          className="text-md sm:text-lg font-medium flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl">🎬</span>
          <span className="font-sans">NextTemp</span>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <BuyMeCoffee />
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shadow-subtle hover:shadow-hover"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              {/* show "View Subscription" when not in trial & not effectively active */}
              {!isLoadingSubscription &&
                !isInTrial &&
                (
                  !subscription ||
                  subscription.status === 'canceled' ||
                  (subscription.cancel_at_period_end && new Date(subscription.current_period_end) > new Date())
                ) && (
                  <button
                    onClick={() => router.push('/profile')}
                    className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
                  >
                    View Subscription
                  </button>
                )}

              <BuyMeCoffee />

              {/* "Start Free Trial / Start Building" button */}
              {!isLoadingSubscription && (subscription || isInTrial) && pathname !== '/dashboard' && (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
                >
                  {isInTrial ? 'Start Free Trial' : 'Start Building'}
                </button>
              )}

              {/* Avatar + dropdown */}
              <div className="relative z-[300]" ref={dropdownRef}>
                <button
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div
                    className="
                      absolute right-0 mt-2 w-56
                      z-[400]
                      rounded-xl border border-slate-200 dark:border-slate-700
                      bg-white dark:bg-neutral-dark
                      text-slate-800 dark:text-slate-100
                      shadow-lg p-1
                    "
                  >
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        window.location.href = '/profile';
                      }}
                    >
                      Profile &amp; Subscription
                    </Link>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 disabled:opacity-50"
                    >
                      {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

