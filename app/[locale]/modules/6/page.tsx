'use client';

import { Link } from '@/i18n/navigation';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR DIE EMOTIONS- & MOTIVATIONSPSYCHOLOGIE ---
const emotionMotivationModules = [
  { id: 1, title: "Motivation: Theorien & Konzepte", relevance: "green", descriptions: { grundwissen: "Verstehe den Unterschied zwischen intrinsischer und extrinsischer Motivation, die Triebtheorie und Maslows Bedürfnishierarchie.", anwendbarkeit: "Analysiere, wie Boni am Arbeitsplatz (extrinsisch) die eigentliche Freude an der Arbeit (intrinsisch) untergraben können.", meisterklasse: "Diskutiere die Selbstbestimmungstheorie und die drei psychologischen Grundbedürfnisse.", uebungen: "Ordne Alltagsbeispiele den verschiedenen Motivationstheorien zu." }},
  { id: 2, title: "Hunger, Essen & Sättigung", relevance: "green", descriptions: { grundwissen: "Lerne die biologischen Mechanismen (z.B. Leptin, Ghrelin) und psychologischen Faktoren, die Hunger und Essverhalten steuern.", anwendbarkeit: "Verstehe, warum Diäten oft scheitern (Set-Point-Theorie) und warum wir bei Stress mehr essen.", meisterklasse: "Analysiere die komplexen Ursachen von Essstörungen wie Anorexie und Bulimie.", uebungen: "Teste dein Wissen über die hormonelle Steuerung des Hungers." }},
  { id: 3, title: "Sexualverhalten", relevance: "orange", descriptions: { grundwissen: "Erforsche die bahnbrechende Arbeit von Kinsey sowie Masters und Johnson zum menschlichen Sexualzyklus.", anwendbarkeit: "Verstehe die biologischen und sozialen Grundlagen der sexuellen Orientierung und Geschlechtsidentität.", meisterklasse: "Diskutiere die evolutionären und soziokulturellen Perspektiven auf menschliches Paarungsverhalten.", uebungen: "Identifiziere die Phasen des sexuellen Reaktionszyklus." }},
  { id: 4, title: "Emotionstheorien", relevance: "orange", descriptions: { grundwissen: "Vergleiche die klassischen Emotionstheorien: James-Lange, Cannon-Bard und die Zwei-Faktoren-Theorie von Schachter-Singer.", anwendbarkeit: "Analysiere eine eigene Angstreaktion: Was kam zuerst, der Gedanke, die körperliche Reaktion oder beides gleichzeitig?", meisterklasse: "Diskutiere die Rolle der kognitiven Bewertung (Cognitive Appraisal) bei der Entstehung von Emotionen (Lazarus).", uebungen: "Wende die verschiedenen Theorien auf ein konkretes emotionales Erlebnis an." }},
  { id: 5, title: "Die Biologie der Emotionen", relevance: "red", descriptions: { grundwissen: "Erforsche die Schlüsselrolle des limbischen Systems, insbesondere der Amygdala, bei der Verarbeitung von Furcht und Emotionen.", anwendbarkeit: "Verstehe, warum emotionale Erinnerungen (z.B. bei PTBS) so stark und langlebig sind.", meisterklasse: "Analysiere den Unterschied zwischen dem 'schnellen Pfad' (Amygdala) und dem 'langsamen Pfad' (Kortex) der Furchtverarbeitung.", uebungen: "Ordne Hirnstrukturen ihren Funktionen in der Emotionsverarbeitung zu." }},
  { id: 6, title: "Ausdruck & Regulation von Emotionen", relevance: "green", descriptions: { grundwissen: "Lerne die sieben universellen Basisemotionen nach Paul Ekman und die kulturellen Darstellungsregeln (Display Rules) kennen.", anwendbarkeit: "Verbessere deine emotionale Intelligenz, indem du Mikroexpressionen bei anderen besser erkennst.", meisterklasse: "Diskutiere die Facial-Feedback-Hypothese: Kann ein Lächeln deine Stimmung wirklich verbessern?", uebungen: "Analysiere, wie unterschiedliche Kulturen den Ausdruck von Emotionen regulieren." }},
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
export default function EmotionMotivationPage() {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <Link href="/modules" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Modulübersicht
                </Link>
                <h2 className="font-bold mb-4">Emotions- & Motivationspsychologie</h2>
                <nav className="space-y-2">
                    {emotionMotivationModules.map(module => (
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
                    <h1 className="text-4xl font-bold mb-4">Emotions- & Motivationspsychologie</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Erforsche die treibenden Kräfte hinter unserem Verhalten und die komplexe Welt unserer Gefühle.
                    </p>
                    <div className="space-y-12">
                        {emotionMotivationModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/6/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/6/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/6/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/6/uebungen-${module.id}`}>
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