// components/RouteWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import ProtectedRoute from '@/contexts/ProtectedRoute';
import TopBar from '@/components/TopBar';
import ChatBot from '@/components/ChatBot';

const PUBLIC_PATHS = [
  '/sources',
  '/login',
  '/signup',
  '/about',          // ← HIER HINZUFÜGEN
  '/privacy',
  '/terms',
  '/forgot-password',
];

export default function RouteWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const pathWithoutLocale = pathname.replace(/^\/(de|en|fr|es)/, '');
  
  const isPublicRoute = PUBLIC_PATHS.some(path => 
    pathWithoutLocale === path || pathWithoutLocale.startsWith(path + '/')
  );

  if (isPublicRoute) {
    return (
      <>
        <TopBar />
        <main>{children}</main>
      </>
    );
  }

  return (
    <ProtectedRoute>
      <TopBar />
      <main>{children}</main>
      <ChatBot />
    </ProtectedRoute>
  );
}
