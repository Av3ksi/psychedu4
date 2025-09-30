'use client'
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { Lock, Circle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

// --- HIER WURDE DIE LISTE ERWEITERT ---
// Statische Definition deiner Haupt-Module
const courseModules = [
  { id: 1, title: 'Statistik von A-Z', description: 'Das Fundament für die empirische Psychologie.' },
  { id: 2, title: 'Sozialpsychologie', description: 'Der Mensch im Kontext der Gruppe.' },
  { id: 3, title: 'Klinische Psychologie', description: 'Grundlagen psychischer Störungen.' },
  { id: 4, title: 'Entwicklungspsychologie', description: 'Die menschliche Entwicklung über die Lebensspanne.' },
  { id: 5, title: 'Allgemeine Psychologie I: Wahrnehmung & Kognition', description: 'Wie wir Informationen verarbeiten.' },
  { id: 6, title: 'Allgemeine Psychologie II: Emotion & Motivation', description: 'Was uns antreibt und fühlen lässt.' },
  { id: 7, title: 'Biologische Psychologie', description: 'Die neurobiologischen Grundlagen des Verhaltens.' },
  { id: 8, title: 'Persönlichkeitspsychologie', description: 'Warum Menschen so unterschiedlich sind.' },
  { id: 9, 'title': 'Diagnostik und Testtheorie', 'description': 'Wie psychologische Merkmale gemessen werden.' },
  { id: 10, 'title': 'Arbeits- & Organisationspsychologie', 'description': 'Der Mensch in der Arbeitswelt.' },
];

export default function ModulesOverviewPage() {
  const { subscription, isLoading: isSubLoading } = useSubscription();

  if (isSubLoading) return <LoadingSpinner />;

  const isPremium = subscription?.status === 'active';

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Deine Studien-Module</h1>
      <div className="space-y-4">
        {courseModules.map((module, index) => {
          const isLocked = index > 0 && !isPremium;

          if (isLocked) {
            return (
              <div key={module.id} className="flex items-center gap-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50 p-4 opacity-60">
                <Lock className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg text-slate-500">{module.title}</h2>
                  <p className="text-sm text-slate-400">{module.description}</p>
                </div>
                <Link href="/profile" className="ml-auto text-sm bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-dark whitespace-nowrap">
                  Upgrade
                </Link>
              </div>
            );
          }

          return (
            <Link key={module.id} href={`/modules/${module.id}`} passHref>
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-dark p-4 cursor-pointer hover:shadow-lg transition-shadow">
                {/* Hier könnte man später den Fortschritt anzeigen, z.B. mit einer Checkbox */}
                <Circle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg text-slate-900 dark:text-white">{module.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{module.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}