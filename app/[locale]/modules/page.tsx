'use client';
import { Link } from '@/i18n/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import { Lock, Circle, CheckCircle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { listModulesWithState, setModuleDone } from '@/utils/modules';
// NEU: useTranslations importieren
import { useTranslations } from 'next-intl';

// Definiert, wie ein Modul mit seinem Status aussieht
interface ModuleWithState {
  id: number;
  title: string;
  description: string;
  done: boolean;
  sort_order: number; // Annahme: listModulesWithState liefert auch sort_order
}

// ENTFERNT: Deutsches Objekt wird nicht mehr gebraucht
// const courseModulesDescriptions: { [key: number]: string } = { ... };

export default function ModulesOverviewPage() {
  const { subscription, isLoading: isSubLoading } = useSubscription();
  const [modules, setModules] = useState<ModuleWithState[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true);
  // NEU: Übersetzungsfunktion holen
  const t = useTranslations('moduleDescriptions');

  // Lädt die Module und ihren "erledigt"-Status, sobald die Seite aufgerufen wird
  useEffect(() => {
    async function loadModules() {
      try {
        setIsLoadingModules(true);
        const modulesFromDb = await listModulesWithState(); // Holt id, title, sort_order, done
        
        // Beschreibungen über die Übersetzungsfunktion hinzufügen
        const enrichedModules = modulesFromDb.map(m => ({
          ...m,
          // GEÄNDERT: t-Funktion verwenden
          description: t(String(m.id)) || 'Description not available.', // Fallback hinzugefügt
          done: m.done || false
        }));

        // Sicherstellen, dass die Module nach sort_order sortiert sind
        enrichedModules.sort((a, b) => a.sort_order - b.sort_order);

        setModules(enrichedModules as ModuleWithState[]);
      } catch (error) {
        console.error("Module konnten nicht geladen werden:", error);
      } finally {
        setIsLoadingModules(false);
      }
    }
    loadModules();
    // NEU: t zur Dependency Array hinzufügen
  }, [t]); 

  // handleToggleDone Funktion bleibt unverändert...
  const handleToggleDone = async (moduleId: number) => {
    const originalModules = modules;
    const moduleToUpdate = modules.find(m => m.id === moduleId);
    if (!moduleToUpdate) return;

    const newDoneState = !moduleToUpdate.done;

    setModules(currentModules =>
      currentModules.map(m =>
        m.id === moduleId ? { ...m, done: newDoneState } : m
      )
    );

    try {
      await setModuleDone(moduleId, newDoneState);
    } catch (error) {
      console.error("Fehler beim Speichern des Fortschritts:", error);
      setModules(originalModules);
      alert("Dein Fortschritt konnte nicht gespeichert werden. Bitte versuche es erneut.");
    }
  };

  // Ladeanzeige bleibt unverändert...
  if (isSubLoading || isLoadingModules) {
    return <LoadingSpinner />;
  }

  const isPremium = subscription?.status === 'active';

  // JSX-Teil bleibt strukturell gleich, verwendet jetzt aber die 'description' aus dem State
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Deine Studien-Module</h1>
      <div className="space-y-4">
        {modules.map((module, index) => {
          const isLocked = index > 0 && !isPremium; 

          if (isLocked) {
            return (
              <div key={module.id} className="flex items-center gap-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50 p-4 opacity-60">
                <Lock className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg text-slate-500">{module.title}</h2>
                  {/* Nutzt jetzt die übersetzte Beschreibung */}
                  <p className="text-sm text-slate-400">{module.description}</p> 
                </div>
                <Link href="/profile" className="ml-auto text-sm bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-dark whitespace-nowrap">
                  Upgrade
                </Link>
              </div>
            );
          }

          return (
            <div key={module.id} className="flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-dark p-4 transition-shadow hover:shadow-lg">
              <button
                onClick={() => handleToggleDone(module.id)}
                className="cursor-pointer p-2 -m-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Mark module ${module.title} as ${module.done ? 'incomplete' : 'complete'}`}
              >
                {module.done ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                )}
              </button>
              
              <Link href={`/modules/${module.id}`} className="flex-grow cursor-pointer">
                  <h2 className="font-semibold text-lg text-slate-900 dark:text-white">{module.title}</h2>
                   {/* Nutzt jetzt die übersetzte Beschreibung */}
                  <p className="text-sm text-slate-600 dark:text-slate-400">{module.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}