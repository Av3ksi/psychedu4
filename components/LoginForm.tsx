'use client';

import { useState } from 'react';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import Image from 'next/image';

interface LoginFormProps {
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({
  onSubmit,
  onGoogleSignIn,
  isLoading,
  error
}: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isSignUp);
  };

  return (
    <div className="auth-card">
      <div className="text-center">
        <div className="auth-brand">
          <span className="text-3xl">🎬</span>
          <h2 className="text-2xl font-medium">NextTemp</h2>
        </div>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Google */}
      <div className="mt-6 space-y-4">
        <button onClick={onGoogleSignIn} className="auth-google">
          <Image src="/Google-Logo.png" alt="Google Logo" width={20} height={20} className="mr-2" />
          <span>Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span>OR</span>
          <span className="auth-divider-line" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="auth-title">
          {isSignUp ? 'Create an account' : 'Are you an Email User?'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="auth-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="text-sm auth-link"
          >
            Forgot your password?
          </button>
        </div>

        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />

        <button type="submit" disabled={isLoading} className="auth-submit">
          {isSignUp ? 'Sign up' : 'Sign in'} with Email
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="auth-link"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
