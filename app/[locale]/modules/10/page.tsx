'use client';

import { Link } from '@/i18n/navigation';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE A&O-PSYCHOLOGIE ---
const aoPsychologyModules = [
  { id: 1, title: "Einführung in die A&O-Psychologie", relevance: "green", descriptions: { grundwissen: "Definiert die drei Hauptbereiche: Arbeits- (Industrial), Organisations- (Organizational) und Ingenieurpsychologie (Human Factors).", anwendbarkeit: "Verstehe, wie A&O-Psychologen Unternehmen dabei helfen, die richtigen Mitarbeiter einzustellen und die Produktivität zu steigern.", meisterklasse: "Analysiere den Hawthorne-Effekt und seine revolutionäre Bedeutung für die Betrachtung von Mitarbeitern.", uebungen: "Ordne typische Aufgaben den drei Bereichen der A&O-Psychologie zu." }},
  { id: 2, title: "Personalauswahl", relevance: "orange", descriptions: { grundwissen: "Lerne die Methoden der Anforderungsanalyse und die verschiedenen Auswahlverfahren (Interview, Tests, Assessment Center) kennen.", anwendbarkeit: "Erkenne die Schwächen des unstrukturierten Interviews und die Vorteile des strukturierten, verhaltensbasierten Interviews.", meisterklasse: "Diskutiere das Problem des 'unconscious bias' im Auswahlprozess und Strategien zu seiner Reduzierung.", uebungen: "Entwickle eine verhaltensbasierte Interviewfrage für eine bestimmte Position." }},
  { id: 3, title: "Mitarbeiterbeurteilung & -entwicklung", relevance: "green", descriptions: { grundwissen: "Verstehe den Zweck von Leistungsbeurteilungen und die verschiedenen Methoden (z.B. 360-Grad-Feedback).", anwendbarkeit: "Lerne, konstruktives Feedback zu geben, das auf beobachtbarem Verhalten basiert.", meisterklasse: "Analysiere die häufigsten Beurteilungsfehler (z.B. Halo-Effekt, Milde-Härte-Fehler) und wie man sie vermeidet.", uebungen: "Identifiziere verschiedene Beurteilungsfehler in Fallbeispielen." }},
  { id: 4, title: "Arbeitsmotivation & -zufriedenheit", relevance: "red", descriptions: { grundwissen: "Lerne die wichtigsten Theorien der Arbeitsmotivation (z.B. von Herzberg, Maslow) und die Faktoren der Arbeitszufriedenheit kennen.", anwendbarkeit: "Verstehe, warum Bezahlung allein nicht glücklich macht (Zwei-Faktoren-Theorie).", meisterklasse: "Diskutiere die Bedeutung von 'Job Crafting' zur Steigerung der eigenen Arbeitszufriedenheit und Motivation.", uebungen: "Wende Herzbergs Theorie auf eine konkrete Arbeitssituation an." }},
  { id: 5, title: "Führung & Teamarbeit", relevance: "orange", descriptions: { grundwissen: "Unterscheide verschiedene Führungsstile (z.B. transaktional, transformational, Laissez-faire).", anwendbarkeit: "Analysiere die Stärken und Schwächen deines eigenen (oder eines bekannten) Führungsstils.", meisterklasse: "Diskutiere die psychologischen Prozesse, die zu 'Groupthink' (Gruppendenken) führen und wie man es verhindern kann.", uebungen: "Identifiziere Merkmale von transformationaler Führung in Beispielen." }},
  { id: 6, title: "Organisationskultur & Ergonomie", relevance: "green", descriptions: { grundwissen: "Verstehe, was Organisationskultur ist und wie sie das Verhalten der Mitarbeiter prägt.", anwendbarkeit: "Analysiere die sichtbaren Artefakte (Bürogestaltung, Kleiderordnung) und die tieferen Werte einer bekannten Unternehmenskultur.", meisterklasse: "Diskutiere die Herausforderungen bei der Veränderung einer etablierten Organisationskultur.", uebungen: "Unterscheide zwischen den verschiedenen Ebenen der Organisationskultur." }},
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
export default function AoPsychologyPage() {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">A&O-Psychologie</h2>
                <nav className="space-y-2">
                    {aoPsychologyModules.map(module => (
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
                    <h1 className="text-4xl font-bold mb-4">Arbeits- & Organisationspsychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Die Anwendung psychologischer Prinzipien zur Optimierung von Arbeitsplätzen und zur Steigerung des Wohlbefindens von Mitarbeitern.
                    </p>
                    <div className="space-y-12">
                        {aoPsychologyModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/10/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/10/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/10/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/10/uebungen-${module.id}`}>
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