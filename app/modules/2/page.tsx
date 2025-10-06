'use client';

import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE SOZIALPSYCHOLOGIE-LEKTIONEN ---
// Basierend auf dem OpenStax Lehrbuch
const socialPsychologyModules = [
  { id: 1, title: "Was ist Sozialpsychologie?", relevance: "green", descriptions: { grundwissen: "Definiert das Feld und erklärt, wie wir über uns selbst und andere denken.", anwendbarkeit: "Analysiere Alltags-Situationen durch die Brille eines Sozialpsychologen.", meisterklasse: "Verstehe den Unterschied zwischen situationsbezogenen und dispositionsbezogenen Einflüssen auf das Verhalten.", uebungen: "Teste dein Verständnis der Kernkonzepte der sozialen Wahrnehmung." }},
  { id: 2, title: "Selbstdarstellung & Soziale Wahrnehmung", relevance: "green", descriptions: { grundwissen: "Lerne, wie wir uns selbst wahrnehmen und wie wir uns anderen präsentieren.", anwendbarkeit: "Erkenne Strategien der Selbstdarstellung im Berufsleben und in sozialen Medien.", meisterklasse: "Analysiere das Konzept der 'sozialen Vergleichstheorie' von Festinger.", uebungen: "Wende dein Wissen an, um verschiedene Arten der Selbstdarstellung zu identifizieren." }},
  { id: 3, title: "Einstellungen & Überzeugung", relevance: "green", descriptions: { grundwissen: "Verstehe, wie Einstellungen entstehen, sich ändern und unser Verhalten beeinflussen.", anwendbarkeit: "Analysiere Werbekampagnen und erkenne die eingesetzten Überzeugungstechniken.", meisterklasse: "Diskutiere das Elaboration-Likelihood-Modell der Persuasion und seine praktischen Implikationen.", uebungen: "Identifiziere kognitive Dissonanz in verschiedenen Szenarien." }},
  { id: 4, title: "Konformität, Compliance & Gehorsam", relevance: "orange", descriptions: { grundwissen: "Lerne die klassischen Studien von Asch, Milgram und Zimbardo kennen.", anwendbarkeit: "Erkenne Gruppendruck im Alltag und entwickle Strategien, um ihm zu widerstehen.", meisterklasse: "Diskutiere die ethischen Implikationen der berühmten Gehorsamsexperimente.", uebungen: "Analysiere Fallstudien zu Konformität und Gehorsam." }},
  { id: 5, title: "Vorurteile & Diskriminierung", relevance: "orange", descriptions: { grundwissen: "Unterscheide Stereotype, Vorurteile und Diskriminierung und lerne ihre Ursachen kennen.", anwendbarkeit: "Identifiziere unbewusste Vorurteile (implizite Bias) bei dir selbst und anderen.", meisterklasse: "Bewerte die Wirksamkeit von Strategien zur Reduzierung von Vorurteilen.", uebungen: "Analysiere Beispiele für verschiedene Arten von Vorurteilen." }},
  { id: 6, title: "Aggression", relevance: "red", descriptions: { grundwissen: "Verstehe die biologischen, sozialen und umweltbedingten Ursachen von aggressivem Verhalten.", anwendbarkeit: "Analysiere die Rolle der Medien bei der Förderung von Aggression (z.B. 'Waffeneffekt').", meisterklasse: "Diskutiere die Frustrations-Aggressions-Hypothese und ihre Weiterentwicklungen.", uebungen: "Unterscheide zwischen feindseliger und instrumenteller Aggression." }},
  { id: 7, title: "Prosoziales Verhalten", relevance: "green", descriptions: { grundwissen: "Erforsche, warum Menschen anderen helfen (Altruismus, Empathie).", anwendbarkeit: "Verstehe den 'Bystander-Effekt' und lerne, wie man ihn in Notsituationen überwindet.", meisterklasse: "Analysiere die evolutionären und sozialen Theorien des helfenden Verhaltens.", uebungen: "Wende die 5 Schritte der Hilfeleistung auf reale Szenarien an." }},
];

// --- HILFS-KOMPONENTEN (identisch zur Statistik-Seite) ---
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
export default function SocialPsychologyPage() {
    return (
        <div className="flex">
            {/* Seitenleiste für die Navigation */}
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Themen der Sozialpsychologie</h2>
                <nav className="space-y-2">
                    {socialPsychologyModules.map(module => (
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
                    <h1 className="text-4xl font-bold mb-4">Sozialpsychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Erforsche, wie Individuen durch die tatsächliche, vorgestellte oder implizite Anwesenheit anderer beeinflusst werden.
                    </p>
                    <div className="space-y-12">
                        {socialPsychologyModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* ACHTUNG: Die Links müssen auf /modules/2/... verweisen! */}
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/2/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/2/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/2/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/2/uebungen-${module.id}`}>
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