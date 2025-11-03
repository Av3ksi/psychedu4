// app/[locale]/update-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const { supabase } = useAuth();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // NEUES STATE: Verfolgt, ob die Session aus der URL geladen wurde
  const [isSessionReady, setIsSessionReady] = useState(false);

  // Der useEffect-Hook ist wieder da und verbessert.
  // Er liest den Token aus der URL und erstellt die temporäre Sitzung.
  useEffect(() => {
    // Wir erstellen eine async-Funktion innerhalb des Hooks,
    // damit wir 'await' verwenden können.
    const setSessionFromUrl = async () => {
      const hash = window.location.hash;
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'recovery' && accessToken) {
          // Warten, bis die Session vollständig gesetzt ist
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (error) {
            setError('Failed to set session. The link might be expired or invalid.');
          } else {
            // Erst jetzt ist es sicher, das Passwort-Update zu erlauben
            setIsSessionReady(true);
          }
        } else {
          setError('Invalid recovery link. Please try again.');
        }
      } else {
        setError('No recovery information found in URL. The link may be broken.');
      }
    };

    setSessionFromUrl();
  }, [supabase.auth]); // Die Abhängigkeit ist korrekt

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Dieser Aufruf funktioniert jetzt, da wir dank 'isSessionReady'
      // wissen, dass die Authentifizierung vorhanden ist.
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      setSuccess(true);
      // Redirect to login after successful password update
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setIsLoading(false); // Dieser Block wird jetzt zuverlässig erreicht
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Update Password</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Please enter your new password
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/30 text-green-500 p-4 rounded-lg text-center">
            Password updated successfully! Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="newPassword" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="New Password (min. 6 characters)"
                  minLength={6}
                />
              </div>
              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="Confirm Password"
                  minLength={6}
                />
              </div>
            </div>
            <button
              type="submit"
              // WICHTIGE ÄNDERUNG: Button ist deaktiviert, während die Session lädt ODER updatet
              disabled={isLoading || !isSessionReady}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-darker hover:bg-blue-700 disabled:opacity-50"
            >
              {/* Besserer Lade-Text */}
              {!isSessionReady ? 'Loading Session...' : isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}