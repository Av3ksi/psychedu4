'use client'
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { Lock, Circle, CheckCircle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { listModulesWithState, setModuleDone } from '@/utils/modules';

// Definiert, wie ein Modul mit seinem Status aussieht
interface ModuleWithState {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

// Die deutschen Beschreibungen, die den Moduldaten aus der Datenbank zugeordnet werden
const courseModulesDescriptions: { [key: number]: string } = {
  1: 'Das Fundament für die empirische Psychologie.',
  2: 'Der Mensch im Kontext der Gruppe.',
  3: 'Grundlagen psychischer Störungen.',
  4: 'Die menschliche Entwicklung über die Lebensspanne.',
  5: 'Wie wir Informationen verarbeiten.',
  6: 'Was uns antreibt und fühlen lässt.',
  7: 'Die neurobiologischen Grundlagen des Verhaltens.',
  8: 'Warum Menschen so unterschiedlich sind.',
  9: 'Wie psychologische Merkmale gemessen werden.',
  10: 'Der Mensch in der Arbeitswelt.',
};

export default function ModulesOverviewPage() {
  const { subscription, isLoading: isSubLoading } = useSubscription();
  const [modules, setModules] = useState<ModuleWithState[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true);

  // Lädt die Module und ihren "erledigt"-Status, sobald die Seite aufgerufen wird
  useEffect(() => {
    async function loadModules() {
      try {
        setIsLoadingModules(true);
        const modulesWithState = await listModulesWithState();
        // Die Titel kommen aus der DB, die Beschreibungen werden hier zugeordnet
        const enrichedModules = modulesWithState.map(m => ({
          ...m,
          description: courseModulesDescriptions[m.id as number] || 'Keine Beschreibung verfügbar.',
          done: m.done || false
        }));
        setModules(enrichedModules as ModuleWithState[]);
      } catch (error) {
        console.error("Module konnten nicht geladen werden:", error);
      } finally {
        setIsLoadingModules(false);
      }
    }
    loadModules();
  }, []);

  // Diese Funktion wird aufgerufen, wenn du auf einen Haken klickst
  const handleToggleDone = async (moduleId: number) => {
    const originalModules = modules;
    const moduleToUpdate = modules.find(m => m.id === moduleId);
    if (!moduleToUpdate) return;

    const newDoneState = !moduleToUpdate.done;

    // 1. UI sofort aktualisieren für eine schnelle Rückmeldung
    setModules(currentModules =>
      currentModules.map(m =>
        m.id === moduleId ? { ...m, done: newDoneState } : m
      )
    );

    // 2. Die Änderung an die Datenbank senden, um sie zu speichern
    try {
      await setModuleDone(moduleId, newDoneState);
    } catch (error) {
      console.error("Fehler beim Speichern des Fortschritts:", error);
      // Bei einem Fehler die UI zurücksetzen
      setModules(originalModules);
      alert("Dein Fortschritt konnte nicht gespeichert werden. Bitte versuche es erneut.");
    }
  };

  // Ladeanzeige, während Daten geholt werden
  if (isSubLoading || isLoadingModules) {
    return <LoadingSpinner />;
  }

  const isPremium = subscription?.status === 'active';

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Deine Studien-Module</h1>
      <div className="space-y-4">
        {modules.map((module, index) => {
          // Sperrt Module für nicht-Premium-Nutzer (ausser dem ersten)
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

          // Freigeschaltetes Modul mit klickbarem Haken
          return (
            <div key={module.id} className="flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-dark p-4 transition-shadow hover:shadow-lg">
              <button
                onClick={() => handleToggleDone(module.id)}
                className="cursor-pointer p-2 -m-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Modul ${module.title} als ${module.done ? 'unfertig' : 'fertig'} markieren`}
              >
                {module.done ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                )}
              </button>
              
              <Link href={`/modules/${module.id}`} className="flex-grow cursor-pointer">
                  <h2 className="font-semibold text-lg text-slate-900 dark:text-white">{module.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{module.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}