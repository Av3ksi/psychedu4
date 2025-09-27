// app/modules/[moduleId]/page.tsx (vereinfacht, ohne Trial)
'use client';

import { useParams } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const { subscription, isLoading: isSubLoading } = useSubscription();

  if (isSubLoading) {
    return <LoadingSpinner />;
  }

  const isPremium = subscription?.status === 'active';
  const moduleNumber = parseInt(moduleId as string, 10);

  if (moduleNumber > 1 && !isPremium) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Zugriff verweigert</h1>
        <p className="mb-6">Dieses Modul ist nur für Premium-Nutzer verfügbar.</p>
        <Link href="/profile" className="px-6 py-2 bg-primary text-white rounded-lg">
          Jetzt upgraden
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Modul {moduleId}</h1>
      <p>Hier werden die Lerninhalte für Modul {moduleId} angezeigt.</p>
    </div>
  );
}