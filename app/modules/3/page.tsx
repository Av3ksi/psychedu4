'use client';

import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE KLINISCHE PSYCHOLOGIE-LEKTIONEN ---
const clinicalPsychologyModules = [
  // Block 1: Einführung & Grundlagen
  { id: 1, title: "Einführung in die Klinische Psychologie", relevance: "green", descriptions: { grundwissen: "Definiert das Fachgebiet, seine Ziele und die wichtigsten philosophischen Modelle wie das biopsychosoziale Modell.", anwendbarkeit: "Lerne, Alltagsphänomene von klinisch relevanten Symptomen zu unterscheiden.", meisterklasse: "Verstehe die historische Entwicklung des Krankheitsbegriffs in der Psychologie.", uebungen: "Teste dein Wissen zu den Grundpfeilern der Klinischen Psychologie." }},
  { id: 2, title: "Diagnostik & Klassifikation (DSM-5 / ICD-11)", relevance: "green", descriptions: { grundwissen: "Erfahre, wie psychische Störungen standardisiert diagnostiziert und klassifiziert werden.", anwendbarkeit: "Verstehe den Aufbau eines diagnostischen Berichts und die Bedeutung von Kriterien.", meisterklasse: "Diskutiere die Vor- und Nachteile kategorialer vs. dimensionaler Diagnostik.", uebungen: "Ordne Fallbeispiele den richtigen Störungskategorien zu." }},

  // Block 2: Wichtige Störungsbilder
  { id: 3, title: "Angst- und Zwangsstörungen", relevance: "orange", descriptions: { grundwissen: "Lerne die Symptome von Panikstörung, Phobien, generalisierter Angststörung und Zwangsstörungen kennen.", anwendbarkeit: "Erkenne die Anzeichen einer Panikattacke und lerne erste Bewältigungsstrategien.", meisterklasse: "Analysiere das Teufelskreis-Modell der Panikstörung.", uebungen: "Unterscheide zwischen Zwangsgedanken und Zwangshandlungen." }},
  { id: 4, title: "Depressive und Bipolare Störungen", relevance: "orange", descriptions: { grundwissen: "Verstehe die Kernsymptome von Depressionen und die manischen/depressiven Phasen bei bipolaren Störungen.", anwendbarkeit: "Lerne, wie man Anzeichen einer Depression bei Freunden oder Familie erkennt.", meisterklasse: "Diskutiere die kognitive Triade nach Beck als Erklärungsmodell der Depression.", uebungen: "Unterscheide zwischen einer depressiven Episode und einer bipolaren Störung." }},
  { id: 5, title: "Schizophrenie-Spektrum und andere psychotische Störungen", relevance: "red", descriptions: { grundwissen: "Unterscheide Positivsymptome (Wahn, Halluzinationen) von Negativsymptomen (sozialer Rückzug, Affektverflachung).", anwendbarkeit: "Verstehe die Bedeutung von Frühwarnzeichen einer psychotischen Episode.", meisterklasse: "Diskutiere das Vulnerabilitäts-Stress-Modell als Erklärungsansatz für Schizophrenie.", uebungen: "Analysiere Fallbeispiele und identifiziere Positiv- und Negativsymptome." }},
  { id: 6, title: "Persönlichkeitsstörungen", relevance: "red", descriptions: { grundwissen: "Lerne die drei Cluster (A, B, C) von Persönlichkeitsstörungen und ihre charakteristischen Merkmale kennen.", anwendbarkeit: "Verstehe die Herausforderungen im Umgang mit Menschen mit Borderline- oder narzisstischen Zügen.", meisterklasse: "Analysiere die Schwierigkeiten bei der Diagnose und Behandlung von Persönlichkeitsstörungen.", uebungen: "Ordne typische Verhaltensweisen den Clustern von Persönlichkeitsstörungen zu." }},
  
  // Block 3: Therapieformen
  { id: 7, title: "Psychodynamische Therapien", relevance: "green", descriptions: { grundwissen: "Verstehe die Grundannahmen von Freuds Psychoanalyse und ihre modernen Weiterentwicklungen.", anwendbarkeit: "Erkenne Abwehrmechanismen wie Verdrängung oder Projektion im Alltag.", meisterklasse: "Diskutiere die Rolle der Übertragung und Gegenübertragung in der therapeutischen Beziehung.", uebungen: "Analysiere einen Traum aus psychodynamischer Perspektive." }},
  { id: 8, title: "Kognitive Verhaltenstherapie (KVT)", relevance: "green", descriptions: { grundwissen: "Lerne, wie dysfunktionale Gedanken, Gefühle und Verhaltensweisen sich gegenseitig beeinflussen.", anwendbarkeit: "Wende einfache kognitive Umstrukturierungstechniken bei eigenen negativen Gedanken an.", meisterklasse: "Verstehe die 'dritte Welle' der KVT, einschliesslich Achtsamkeit und Akzeptanz (ACT).", uebungen: "Erstelle eine SORKC-Verhaltensanalyse für ein problematisches Verhalten." }},
  { id: 9, title: "Humanistische und Systemische Therapien", relevance: "green", descriptions: { grundwissen: "Verstehe die klientenzentrierte Gesprächsführung (Rogers) und den Fokus auf das 'System' (z.B. Familie) in der Systemischen Therapie.", anwendbarkeit: "Übe die Grundlagen des aktiven Zuhörens in deinen eigenen Gesprächen.", meisterklasse: "Vergleiche das Menschenbild der humanistischen Therapien mit dem der KVT.", uebungen: "Analysiere ein Familienproblem aus einer systemischen Perspektive." }},
];

// --- HILFS-KOMPONENTEN ---
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

// --- HAUPTKOMPONENTE FÜR DIE ÜBERSICHTSSEITE ---
export default function ClinicalPsychologyPage() {
    return (
        <div className="flex">
            {/* Seitenleiste für die Navigation */}
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Klinische Psychologie</h2>
                <nav className="space-y-2">
                    {clinicalPsychologyModules.map(module => (
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
                            <span className="text-sm">{module.title}</span>
                        </ScrollLink>
                    ))}
                </nav>
            </aside>

            {/* Hauptinhalt */}
            <main className="flex-grow p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Klinische Psychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Ein Einblick in die Entstehung, Diagnose und Behandlung psychischer Störungen.
                    </p>
                    <div className="space-y-12">
                        {clinicalPsychologyModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Die Links verweisen nun auf das Modul 3 */}
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/3/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/3/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/3/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/3/uebungen-${module.id}`}>
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