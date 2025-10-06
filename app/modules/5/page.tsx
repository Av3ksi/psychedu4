'use client';

import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE WAHRNEHMUNGSPSYCHOLOGIE-LEKTIONEN ---
const perceptionPsychologyModules = [
  { id: 1, title: "Einführung: Empfindung & Wahrnehmung", relevance: "green", descriptions: { grundwissen: "Unterscheidet zwischen Sinnesempfindung (Sensation) und Wahrnehmung (Perception) und stellt die psychophysischen Methoden vor.", anwendbarkeit: "Verstehe, warum dein Handy-Display im Sonnenlicht schwerer zu erkennen ist (Absolutschwelle).", meisterklasse: "Diskutiere das Signalentdeckungs-Paradigma und seine Anwendung über die Sinne hinaus.", uebungen: "Teste dein Wissen über die grundlegenden Konzepte der Wahrnehmungsforschung." }},
  { id: 2, title: "Das Visuelle System", relevance: "green", descriptions: { grundwissen: "Lerne den Aufbau des Auges, die Funktion von Stäbchen und Zapfen und den Weg des Sehens ins Gehirn.", anwendbarkeit: "Verstehe die biologischen Ursachen von Farbenblindheit und Kurzsichtigkeit.", meisterklasse: "Analysiere die Gegenfarbtheorie und ihre Erklärung von Nachbildern.", uebungen: "Identifiziere die Teile des Auges und ihre Funktionen." }},
  { id: 3, title: "Das Auditive System", relevance: "orange", descriptions: { grundwissen: "Erforsche den Aufbau des Ohrs und wie Schallwellen in neuronale Signale umgewandelt werden.", anwendbarkeit: "Verstehe, wie Hörgeräte und Cochlea-Implantate funktionieren.", meisterklasse: "Vergleiche die Ortstheorie und die Frequenztheorie des Hörens.", uebungen: "Analysiere, wie wir die Richtung einer Schallquelle lokalisieren." }},
  { id: 4, title: "Die Körpersinne (Somatosensorik)", relevance: "green", descriptions: { grundwissen: "Entdecke die Sinne für Berührung, Temperatur, Schmerz, Gleichgewicht (vestibulär) und Körperposition (Propriozeption).", anwendbarkeit: "Verstehe, warum ein Papierschnitt so wehtut und wie Schmerzmittel wirken (Gate-Control-Theorie).", meisterklasse: "Diskutiere das Phänomen des Phantomschmerzes nach einer Amputation.", uebungen: "Teste die Zwei-Punkt-Diskriminationsschwelle auf deiner eigenen Haut." }},
  { id: 5, title: "Die Chemischen Sinne: Geschmack & Geruch", relevance: "green", descriptions: { grundwissen: "Lerne die fünf Grundgeschmacksrichtungen und die Funktionsweise der Geruchsrezeptoren in der Nase kennen.", anwendbarkeit: "Verstehe, warum Essen bei einer Erkältung 'nach nichts schmeckt'.", meisterklasse: "Analysiere den direkten Pfad vom Geruchssinn zum limbischen System (Emotionen & Gedächtnis).", uebungen: "Unterscheide zwischen Geschmack, Aroma und Flavour." }},
  { id: 6, title: "Wahrnehmungsorganisation & Gestaltprinzipien", relevance: "orange", descriptions: { grundwissen: "Erfahre, wie unser Gehirn aus einzelnen Sinneseindrücken kohärente Objekte und Szenen konstruiert.", anwendbarkeit: "Erkenne Gestaltprinzipien (z.B. Nähe, Ähnlichkeit) im Design von Logos und Webseiten.", meisterklasse: "Diskutiere das Figur-Grund-Problem und seine Bedeutung für die Wahrnehmung.", uebungen: "Identifiziere verschiedene Gestaltgesetze in optischen Illusionen." }},
  { id: 7, title: "Multimodale Wahrnehmung", relevance: "red", descriptions: { grundwissen: "Verstehe, wie unser Gehirn Informationen aus verschiedenen Sinnen integriert, um ein einheitliches Wahrnehmungserlebnis zu schaffen.", anwendbarkeit: "Erlebe den McGurk-Effekt, bei dem Sehen das Hören beeinflusst.", meisterklasse: "Diskutiere das Phänomen der Synästhesie, bei der Sinne miteinander vermischt sind.", uebungen: "Analysiere, wie das Zusammenspiel von Geschmack und Geruch das 'Flavour'-Erlebnis erzeugt." }},
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
export default function PerceptionPsychologyPage() {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Wahrnehmungspsychologie</h2>
                <nav className="space-y-2">
                    {perceptionPsychologyModules.map(module => (
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
                    <h1 className="text-4xl font-bold mb-4">Wahrnehmungspsychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Wie unsere Sinne die physische Welt in das reiche Erlebnis unseres Bewusstseins übersetzen.
                    </p>
                    <div className="space-y-12">
                        {perceptionPsychologyModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* HIER IST DIE KORREKTUR: Alle Links verweisen jetzt auf /modules/5/... */}
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/5/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/5/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/5/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/5/uebungen-${module.id}`}>
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