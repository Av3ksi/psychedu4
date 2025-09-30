'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/modules');
  }, [router]);

  // Zeige einen Lade-Spinner, während die Weiterleitung stattfindet
  return <LoadingSpinner />;
}