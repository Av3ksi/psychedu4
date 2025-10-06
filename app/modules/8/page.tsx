'use client';

import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE PERSÖNLICHKEITSPSYCHOLOGIE ---
const personalityPsychologyModules = [
  { id: 1, title: "Einführung & Psychodynamische Perspektive", relevance: "green", descriptions: { grundwissen: "Definiert Persönlichkeit und stellt Freuds psychoanalytisches Modell von Es, Ich und Über-Ich sowie seine Abwehrmechanismen vor.", anwendbarkeit: "Erkenne alltägliche Abwehrmechanismen wie Verdrängung oder Projektion bei dir und anderen.", meisterklasse: "Diskutiere die Kritik an Freuds Theorien und ihren dennoch nachhaltigen Einfluss auf die Psychologie.", uebungen: "Analysiere ein Szenario anhand der psychosexuellen Entwicklungsstufen." }},
  { id: 2, title: "Neo-Freudianer & Humanistische Perspektive", relevance: "green", descriptions: { grundwissen: "Lerne die Theorien von Adler, Erikson, Jung und Horney kennen und entdecke die humanistischen Ansätze von Maslow und Rogers.", anwendbarkeit: "Wende Rogers' Konzepte von Real- und Ideal-Selbst auf deine eigene Selbstwahrnehmung an.", meisterklasse: "Vergleiche Jungs Konzept des kollektiven Unbewussten mit Freuds Unbewusstem.", uebungen: "Ordne Konzepte wie 'Minderwertigkeitskomplex' oder 'Selbstverwirklichung' den richtigen Theoretikern zu." }},
  { id: 3, title: "Lerntheoretische & Biologische Ansätze", relevance: "orange", descriptions: { grundwissen: "Verstehe, wie Behavioristen und sozial-kognitive Theoretiker (Bandura) Persönlichkeit als gelerntes Verhalten betrachten.", anwendbarkeit: "Analysiere, wie dein Selbstwirksamkeitsgefühl deine Herangehensweise an neue Herausforderungen beeinflusst.", meisterklasse: "Diskutiere die Ergebnisse von Zwillingsstudien zur Erblichkeit von Persönlichkeitsmerkmalen.", uebungen: "Unterscheide zwischen reziprokem Determinismus und klassischer Konditionierung." }},
  { id: 4, title: "Eigenschaftstheorien (Trait-Theorien)", relevance: "red", descriptions: { grundwissen: "Lerne die wichtigsten Eigenschaftstheorien kennen, insbesondere das Fünf-Faktoren-Modell ('Big Five').", anwendbarkeit: "Schätze deine eigene Persönlichkeit anhand der fünf Dimensionen (Offenheit, Gewissenhaftigkeit, Extraversion, Verträglichkeit, Neurotizismus) ein.", meisterklasse: "Diskutiere die Stabilität der Big Five über die Lebensspanne und ihre Vorhersagekraft für Lebenserfolg.", uebungen: "Ordne typische Verhaltensweisen den Big Five Dimensionen zu." }},
  { id: 5, title: "Persönlichkeitsmessung", relevance: "green", descriptions: { grundwissen: "Unterscheide zwischen Selbstberichtsverfahren (z.B. MMPI) und projektiven Tests (z.B. Rorschach-Test, TAT).", anwendbarkeit: "Verstehe die Logik hinter einem Lügenscore in einem Persönlichkeitsfragebogen.", meisterklasse: "Diskutiere die Validitäts- und Reliabilitätsprobleme von projektiven Tests.", uebungen: "Vergleiche die Vor- und Nachteile der verschiedenen Testarten." }},
];

// --- HILFS-KOMPONENTEN ---
const RelevanceIndicator: FC<{ relevance: string }> = ({ relevance }) => {
  const colorMap: { [key: string]: string } = { green: 'bg-green-500', orange: 'bg-orange-500', red: 'bg-red-500' };
  return <span className={`w-3 h-3 rounded-full ${colorMap[relevance]}`}></span>;
};

const SectionCard: FC<{ title: string; icon: ReactNode; href: string; children: ReactNode }> = ({ title, icon, href, children }) => (
  <Link href={href} className="block group">
    <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full group-hover:border-primary group-hover:shadow-lg transition-all flex flex-col">
      <div className="flex items-center gap-3 mb-3"> {icon} <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3> </div>
      <div className="prose prose-slate dark:prose-invert max-w-none text-sm flex-grow"> {children} </div>
    </div>
  </Link>
);

// --- HAUPTKOMPONENTE FÜR DIE ÜBERSICHTSSEITE ---
export default function PersonalityPsychologyPage() {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Persönlichkeitspsychologie</h2>
                <nav className="space-y-2">
                    {personalityPsychologyModules.map(module => (
                        <ScrollLink key={module.id} to={`module-${module.id}`} spy={true} smooth={true} offset={-90} duration={500}
                            className="flex items-center gap-3 p-2 rounded-md cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            activeClass="!text-primary font-semibold bg-primary/10">
                            <RelevanceIndicator relevance={module.relevance} />
                            <span className="text-sm">{module.title}</span>
                        </ScrollLink>
                    ))}
                </nav>
            </aside>
            <main className="flex-grow p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Persönlichkeitspsychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Was macht uns zu dem, was wir sind? Eine Erkundung der Muster, die unser Denken, Fühlen und Handeln einzigartig machen.
                    </p>
                    <div className="space-y-12">
                        {personalityPsychologyModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/8/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/8/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/8/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/8/uebungen-${module.id}`}>
                                        <p>{module.descriptions.uebungen}</p>
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