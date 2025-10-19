'use client';

import { useParams } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link } from '@/i18n/navigation';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { useTranslations } from 'next-intl';

// --- DATENSTRUKTUR (OHNE TITEL) ---
// Titel werden jetzt aus der JSON-Datei geladen
const statisticsModulesBase = [
  { id: 1, relevance: "green" },
  { id: 2, relevance: "orange" },
  { id: 3, relevance: "green" },
  { id: 4, relevance: "orange" },
  { id: 5, relevance: "red" },
  { id: 6, relevance: "green" },
  { id: 7, relevance: "green" },
  { id: 8, relevance: "green" },
  { id: 9, relevance: "orange" },
  { id: 10, relevance: "green" },
  { id: 11, relevance: "orange" },
  { id: 12, relevance: "green" },
  { id: 13, relevance: "green" },
  { id: 14, relevance: "orange" },
  { id: 15, relevance: "orange" },
  { id: 16, relevance: "green" },
];

// --- HILFS-KOMPONENTEN (bleiben gleich) ---
const RelevanceIndicator: FC<{ relevance: string }> = ({ relevance }) => {
  const colorMap: { [key: string]: string } = {
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };
  return <span className={`w-3 h-3 rounded-full ${colorMap[relevance]}`}></span>;
};

const SectionCard: FC<{ title: string; icon: ReactNode; href: string; children: ReactNode }> = ({ title, icon, href, children }) => (
  <Link href={href} className="block group">
    <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full group-hover:border-primary group-hover:shadow-lg transition-all flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none text-sm flex-grow">
          {children}
      </div>
    </div>
  </Link>
);

// --- ANGEPASSTE StatisticsPage KOMPONENTE ---
const StatisticsPage: FC = () => {
    // Übersetzungsfunktionen
    const t = useTranslations('statisticsModuleDescriptions'); // Für die Karten-Beschreibungen
    const tModules = useTranslations('modulesOverview'); // Für Titel, Beschreibung, Zurück-Link, Karten-Titel
    const tTitles = useTranslations('statisticsModuleTitles'); // NEU: Für die Lektions-Titel

    return (
        <div className="flex">
             <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  <span>{tModules('backLink')}</span>
                </Link>
                <h2 className="font-bold mb-4">{tModules('statsTitle')}</h2>
                <nav className="space-y-2">
                    {statisticsModulesBase.map(module => (
                        <ScrollLink
                            key={module.id}
                            to={`module-${module.id}`}
                            spy={true}
                            smooth={true}
                            offset={-90}
                            duration={500}
                            className="flex items-center gap-3 p-2 rounded-md cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            activeClass="!text-primary font-semibold bg-primary/10"
                        >
                            <RelevanceIndicator relevance={module.relevance} />
                            {/* GEÄNDERT: Titel wird mit tTitles() geholt */}
                            <span className="text-sm">{tTitles(String(module.id))}</span>
                        </ScrollLink>
                    ))}
                </nav>
            </aside>
            <main className="flex-grow p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">{tModules('statsTitle')}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        {tModules('statsDescription')}
                    </p>
                    <div className="space-y-12">
                        {statisticsModulesBase.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    {/* GEÄNDERT: Titel wird mit tTitles() geholt */}
                                    <h2 className="text-2xl font-bold">{module.id}. {tTitles(String(module.id))}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title={tModules('cardTitleGrundwissen')} icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/1/grundwissen-${module.id}`}>
                                        <p>{t(`${module.id}_grundwissen`)}</p>
                                    </SectionCard>
                                    <SectionCard title={tModules('cardTitleAnwendbarkeit')} icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/1/anwendbarkeit-${module.id}`}>
                                         <p>{t(`${module.id}_anwendbarkeit`)}</p>
                                    </SectionCard>
                                    <SectionCard title={tModules('cardTitleMeisterklasse')} icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/1/meisterklasse-${module.id}`}>
                                        <p>{t(`${module.id}_meisterklasse`)}</p>
                                    </SectionCard>
                                    <SectionCard title={tModules('cardTitleUebungen')} icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/1/uebungen-${module.id}`}>
                                        <p>{t(`${module.id}_uebungen`)}</p>
                                    </SectionCard>
                                </div>
                            </Element>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- HAUPTKOMPONENTE (bleibt gleich) ---
export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const { subscription, isLoading: isSubLoading } = useSubscription();

  const tModules = useTranslations('modulesOverview'); 
  const tPremium = useTranslations('premiumAccess'); 
  const tPlaceholder = useTranslations('premiumPlaceholder'); 

  if (isSubLoading) {
    return <LoadingSpinner />;
  }

  const isPremium = subscription?.status === 'active';
  const moduleNumber = parseInt(moduleId as string, 10);

  if (moduleNumber === 1) {
    return <StatisticsPage />;
  }

  // Platzhalter für Premium-Nutzer (Module 2-10)
  if (isPremium) {
    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* HIER DIE ÄNDERUNG */}
            <h1 className="text-2xl font-bold mb-4">{tPlaceholder('title', { moduleId: moduleNumber })}</h1>
            <p>{tPlaceholder('description', { moduleId: moduleNumber })}</p>
             {/* --- BIS HIER --- */}
            <Link href="/modules" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>{tModules('backLink')}</span>
            </Link>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{tPremium('title')}</h1>
      <p className="mb-6">{tPremium('description')}</p>
      <Link href="/profile" className="px-6 py-2 bg-primary text-white rounded-lg">
        {tPremium('upgradeButton')}
      </Link>
       <Link href="/modules" className="block flex items-center justify-center gap-2 text-primary hover:underline mt-6">
            <ArrowLeft className="w-5 h-5" />
            <span>{tModules('backLink')}</span>
        </Link>
    </div>
  );
}