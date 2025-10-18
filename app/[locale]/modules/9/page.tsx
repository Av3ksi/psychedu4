'use client';

import { Link } from '@/i18n/navigation';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE PSYCHOLOGISCHE DIAGNOSTIK & PSYCHOMETRIE ---
const psychometricsModules = [
  { id: 1, title: "Grundlagen der Psychometrie", relevance: "green", descriptions: { grundwissen: "Definiert psychologische Tests und erklärt, warum Standardisierung, Normierung und Objektivität entscheidend sind.", anwendbarkeit: "Verstehe den Unterschied zwischen einem Online-Quiz und einem echten psychometrischen Test.", meisterklasse: "Diskutiere die Klassische Testtheorie (KTT) und ihre Grundannahme: Messwert = Wahrer Wert + Messfehler.", uebungen: "Teste dein Wissen über die fundamentalen Prinzipien des Testens." }},
  { id: 2, title: "Gütekriterien: Reliabilität", relevance: "red", descriptions: { grundwissen: "Lerne, was Reliabilität (Zuverlässigkeit) bedeutet und welche Arten es gibt (Test-Retest, Interrater, Interne Konsistenz).", anwendbarkeit: "Beurteile, warum eine Waage, die jeden Tag ein anderes Gewicht anzeigt, nicht reliabel ist.", meisterklasse: "Vergleiche die Vor- und Nachteile der verschiedenen Methoden zur Schätzung der Reliabilität.", uebungen: "Ordne Beispielszenarien der richtigen Art von Reliabilitätsprüfung zu." }},
  { id: 3, title: "Gütekriterien: Validität", relevance: "red", descriptions: { grundwissen: "Verstehe das wichtigste Gütekriterium: Misst der Test wirklich das, was er zu messen vorgibt? (Inhalts-, Kriteriums-, Konstruktvalidität).", anwendbarkeit: "Analysiere, warum ein Mathetest kein valides Mass für Kreativität ist.", meisterklasse: "Diskutiere die komplexe Beziehung zwischen Reliabilität und Validität.", uebungen: "Identifiziere, welche Art von Validität in verschiedenen Forschungsszenarien gefragt ist." }},
  { id: 4, title: "Intelligenzmessung", relevance: "orange", descriptions: { grundwissen: "Verfolge die Geschichte der Intelligenzmessung von Binet bis Wechsler und lerne die Struktur moderner IQ-Tests kennen.", anwendbarkeit: "Verstehe, was ein IQ von 100 bedeutet (Durchschnitt der Normstichprobe) und die Bedeutung der Normalverteilung.", meisterklasse: "Diskutiere die Kontroverse um die Erblichkeit von Intelligenz und den Flynn-Effekt.", uebungen: "Berechne einen einfachen Intelligenzquotienten nach der historischen Formel." }},
  { id: 5, title: "Testkonstruktion & Ethische Aspekte", relevance: "green", descriptions: { grundwissen: "Lerne die grundlegenden Schritte der Testkonstruktion kennen, von der Itemanalyse bis zur Normierung.", anwendbarkeit: "Verstehe, warum Testfragen fair und frei von kulturellen Verzerrungen (Bias) sein müssen.", meisterklasse: "Diskutiere die ethische Verantwortung von Psychologen beim Einsatz und der Interpretation von Tests.", uebungen: "Analysiere eine Testfrage auf mögliche Mängel oder Verzerrungen." }},
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
export default function PsychometricsPage() {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Psychologische Diagnostik</h2>
                <nav className="space-y-2">
                    {psychometricsModules.map(module => (
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
                    <h1 className="text-4xl font-bold mb-4">Psychologische Diagnostik & Psychometrie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Die Wissenschaft der psychologischen Messung: Wie wir unsichtbare Konstrukte wie Intelligenz und Persönlichkeit messbar machen.
                    </p>
                    <div className="space-y-12">
                        {psychometricsModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/9/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/9/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/9/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/9/uebungen-${module.id}`}>
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