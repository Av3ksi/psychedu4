'use client';

import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE ENTWICKLUNGSPSYCHOLOGIE-LEKTIONEN ---
const developmentalPsychologyModules = [
  // Block 1: Grundlagen
  { id: 1, title: "Einführung in die Entwicklungspsychologie", relevance: "green", descriptions: { grundwissen: "Was ist Entwicklung? Lerne die zentralen Fragen und Themenbereiche der Entwicklungspsychologie kennen.", anwendbarkeit: "Verstehe, warum die Frage 'Anlage oder Umwelt?' für Erziehung und Politik so relevant ist.", meisterklasse: "Diskutiere die Vor- und Nachteile von Längsschnitt- vs. Querschnittstudien.", uebungen: "Teste dein Wissen zu den Grundkonzepten der Entwicklungsforschung." }},
  { id: 2, title: "Theorien der Entwicklung", relevance: "green", descriptions: { grundwissen: "Ein Überblick über die grossen Theorien: Piagets kognitive Stufen, Eriksons psychosoziale Krisen und Vygotskys soziokultureller Ansatz.", anwendbarkeit: "Analysiere ein Spielzeug und erkläre, welche Entwicklungsstufe nach Piaget es am besten fördert.", meisterklasse: "Vergleiche die Menschenbilder von Piaget, Freud und den Behavioristen.", uebungen: "Ordne Fallbeispiele den Theorien von Erikson und Piaget zu." }},
  
  // Block 2: Frühe Entwicklung
  { id: 3, title: "Pränatale Entwicklung, Geburt & das Neugeborene", relevance: "orange", descriptions: { grundwissen: "Verfolge die Entwicklung vom Embryo zum Fötus und lerne die wichtigsten Reflexe eines Neugeborenen.", anwendbarkeit: "Verstehe die Risiken von Teratogenen wie Alkohol während der Schwangerschaft.", meisterklasse: "Diskutiere die epigenetischen Einflüsse auf die pränatale Entwicklung.", uebungen: "Teste dein Wissen zu den Stadien der Geburt und den Fähigkeiten von Neugeborenen." }},
  { id: 4, title: "Säuglingsalter & Kleinkindzeit: Körper & Kognition", relevance: "green", descriptions: { grundwissen: "Erforsche die rasante motorische und kognitive Entwicklung in den ersten zwei Lebensjahren, inklusive Objektpermanenz.", anwendbarkeit: "Gestalte eine sichere und anregende Umgebung für die Entwicklung eines Kleinkindes.", meisterklasse: "Analysiere die kritische Periode der Sprachentwicklung nach Chomsky.", uebungen: "Identifiziere die verschiedenen Stufen der sensomotorischen Phase." }},
  { id: 5, title: "Säuglingsalter & Kleinkindzeit: Sozioemotionale Entwicklung", relevance: "green", descriptions: { grundwissen: "Lerne die Bindungstheorie nach Bowlby und Ainsworths 'Fremde Situation'-Test kennen.", anwendbarkeit: "Erkenne die Bedeutung einer sicheren Bindung für die spätere Beziehungsfähigkeit.", meisterklasse: "Diskutiere die kulturellen Unterschiede im Bindungsverhalten.", uebungen: "Ordne Verhaltensweisen den verschiedenen Bindungsstilen zu." }},

  // Block 3: Kindheit & Jugend
  { id: 6, title: "Frühe & Mittlere Kindheit", relevance: "green", descriptions: { grundwissen: "Verstehe Piagets präoperationale und konkret-operationale Phasen sowie die Entwicklung des Selbstkonzepts.", anwendbarkeit: "Analysiere Erziehungsstile (autoritär, permissiv, etc.) und ihre Auswirkungen auf das Kind.", meisterklasse: "Diskutiere Kohlbergs Stufen der moralischen Entwicklung und die Kritik daran.", uebungen: "Wende die 'Theory of Mind' auf Alltagsbeispiele an." }},
  { id: 7, title: "Adoleszenz", relevance: "orange", descriptions: { grundwissen: "Erforsche die körperlichen (Pubertät), kognitiven (abstraktes Denken) und sozialen (Identitätssuche) Veränderungen.", anwendbarkeit: "Verstehe die typischen Konflikte zwischen Jugendlichen und Eltern aus entwicklungstheoretischer Sicht.", meisterklasse: "Analysiere James Marcias vier Identitätszustände (diffusion, foreclosure, moratorium, achievement).", uebungen: "Diskutiere die Rolle von Gleichaltrigen (Peers) in der Adoleszenz." }},

  // Block 4: Erwachsenenalter
  { id: 8, title: "Frühes & Mittleres Erwachsenenalter", relevance: "green", descriptions: { grundwissen: "Verstehe die Entwicklungsaufgaben wie Partnerschaft, Beruf und Familie.", anwendbarkeit: "Analysiere das Konzept der 'Midlife Crisis' aus wissenschaftlicher Sicht.", meisterklasse: "Diskutiere die Veränderungen der fluiden und kristallinen Intelligenz im Alter.", uebungen: "Wende Sternbergs Dreieckstheorie der Liebe auf verschiedene Beziehungsformen an." }},
  { id: 9, title: "Spätes Erwachsenenalter, Tod & Sterben", relevance: "red", descriptions: { grundwissen: "Lerne die körperlichen und kognitiven Veränderungen im hohen Alter sowie die psychologischen Phasen des Sterbens nach Kübler-Ross.", anwendbarkeit: "Verstehe die Herausforderungen und Chancen des Alterns (z.B. ' erfolgreiches Altern').", meisterklasse: "Diskutiere die sozioemotionale Selektivitätstheorie und ihre Implikationen für das Wohlbefinden im Alter.", uebungen: "Analysiere verschiedene kulturelle Umgangsweisen mit Tod und Trauer." }},
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
export default function DevelopmentalPsychologyPage() {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Entwicklungspsychologie</h2>
                <nav className="space-y-2">
                    {developmentalPsychologyModules.map(module => (
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
            <main className="flex-grow p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Entwicklungspsychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Eine Reise durch die menschliche Entwicklung von der Empfängnis bis zum Tod.
                    </p>
                    <div className="space-y-12">
                        {developmentalPsychologyModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/4/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/4/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/4/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/4/uebungen-${module.id}`}>
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