'use client';

import { useParams } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// --- DATEN FÜR ALLE 16 STATISTIK-LEKTIONEN (JETZT MIT SPEZIFISCHEN BESCHREIBUNGEN) ---
const statisticsModules = [
  { id: 1, title: "Einführung & Grundbegriffe", relevance: "green", descriptions: { grundwissen: "Definiere, was Daten sind und lerne die wichtigsten Grundbegriffe wie Population und Stichprobe.", anwendbarkeit: "Verstehe, wie Umfragen in der Marktforschung korrekt geplant und interpretiert werden.", meisterklasse: "Lerne, die Qualität von Daten zu beurteilen und typische Fehlschlüsse zu vermeiden.", uebungen: "Teste dein Wissen mit interaktiven Fragen zu den Kernkonzepten." }},
  { id: 2, title: "Datenerhebung & Studiendesign", relevance: "orange", descriptions: { grundwissen: "Unterscheide verschiedene Stichprobenarten und die Grundlagen des experimentellen Designs.", anwendbarkeit: "Plane eine eigene (fiktive) Studie und erkenne potenzielle Störfaktoren und ethische Hürden.", meisterklasse: "Analysiere komplexe Studiendesigns und beurteile ihre Aussagekraft für die Praxis.", uebungen: "Wende dein Wissen in Szenarien an, um das beste Studiendesign auszuwählen." }},
  { id: 3, title: "Beschreibende Statistik", relevance: "green", descriptions: { grundwissen: "Lerne, Daten mit Kennzahlen wie Mittelwert, Median und Standardabweichung zusammenzufassen.", anwendbarkeit: "Erstelle ein aussagekräftiges Dashboard, um die Performance einer Marketing-Kampagne zu visualisieren.", meisterklasse: "Interpretiere Boxplots und Histogramme, um tiefere Einblicke in die Datenstruktur zu gewinnen.", uebungen: "Berechne und interpretiere die wichtigsten Kennzahlen für verschiedene Datensätze." }},
  { id: 4, title: "Grundlagen der Wahrscheinlichkeit", relevance: "orange", descriptions: { grundwissen: "Verstehe die Axiome und Rechenregeln der Wahrscheinlichkeitstheorie.", anwendbarkeit: "Berechne das Risiko für Ereignisse, z.B. in der Versicherungsmathematik oder bei Spielen.", meisterklasse: "Löse komplexe Aufgaben zu bedingten Wahrscheinlichkeiten (Satz von Bayes).", uebungen: "Löse klassische Wahrscheinlichkeits-Rätsel interaktiv." }},
  { id: 5, title: "Wahrscheinlichkeitsverteilungen", relevance: "red", descriptions: { grundwissen: "Lerne den Unterschied zwischen diskreten und stetigen Zufallsvariablen kennen.", anwendbarkeit: "Modelliere die Anzahl von Kunden, die pro Stunde ein Geschäft betreten (Poisson-Verteilung).", meisterklasse: "Verstehe die theoretische Basis, die hinter den wichtigsten statistischen Tests steckt.", uebungen: "Ordne realen Szenarien die passende Wahrscheinlichkeitsverteilung zu." }},
  { id: 6, title: "Die Normalverteilung", relevance: "green", descriptions: { grundwissen: "Verstehe die zentralen Eigenschaften der 'Glockenkurve' und die 68-95-99.7-Regel.", anwendbarkeit: "Standardisiere Werte mit dem z-Wert, um sie über verschiedene Skalen hinweg vergleichbar zu machen.", meisterklasse: "Prüfe, ob ein Datensatz normalverteilt ist und was die Konsequenzen sind, wenn nicht.", uebungen: "Berechne Wahrscheinlichkeiten für normalverteilte Daten." }},
  { id: 7, title: "Konfidenzintervalle", relevance: "green", descriptions: { grundwissen: "Lerne, wie man die Unsicherheit einer Schätzung quantifiziert.", anwendbarkeit: "Interpretiere Umfrageergebnisse korrekt, indem du die angegebene Fehlermarge verstehst.", meisterklasse: "Diskutiere die Faktoren, die die Breite eines Konfidenzintervalls beeinflussen.", uebungen: "Berechne und interpretiere Konfidenzintervalle für Mittelwerte." }},
  { id: 8, title: "Hypothesentests", relevance: "green", descriptions: { grundwissen: "Formuliere Null- und Alternativhypothesen und verstehe die Logik des p-Wertes.", anwendbarkeit: "Führe einen A/B-Test aus, um zu entscheiden, welche Version einer Webseite besser funktioniert.", meisterklasse: "Verstehe das Konzept der statistischen Power und wie man Typ-I- und Typ-II-Fehler kontrolliert.", uebungen: "Wende den t-Test in verschiedenen Szenarien korrekt an." }},
  { id: 9, title: "Chi-Quadrat-Tests", relevance: "orange", descriptions: { grundwissen: "Analysiere Zusammenhänge zwischen kategorialen Variablen (z.B. Geschlecht und Produktwahl).", anwendbarkeit: "Werte Umfragedaten aus, um zu sehen, ob bestimmte Meinungen von der Altersgruppe abhängen.", meisterklasse: "Prüfe die Voraussetzungen des Chi-Quadrat-Tests und interpretiere die Ergebnisse im Detail.", uebungen: "Führe Tests auf Unabhängigkeit mit vorgegebenen Tabellen durch." }},
  { id: 10, title: "Lineare Regression & Korrelation", relevance: "green", descriptions: { grundwissen: "Modelliere und quantifiziere den linearen Zusammenhang zwischen zwei Variablen.", anwendbarkeit: "Erstelle ein einfaches Vorhersagemodell, z.B. für den Umsatz basierend auf Werbeausgaben.", meisterklasse: "Interpretiere das Bestimmtheitsmass (R-Quadrat) und die Residuenanalyse zur Modellgüte.", uebungen: "Berechne und interpretiere Korrelationskoeffizienten und Regressionsgeraden." }},
  { id: 11, title: "ANOVA (Varianzanalyse)", relevance: "orange", descriptions: { grundwissen: "Vergleiche die Mittelwerte von drei oder mehr Gruppen miteinander.", anwendbarkeit: "Finde heraus, welche von mehreren Lehrmethoden den grössten Lernerfolg bringt.", meisterklasse: "Führe Post-Hoc-Tests durch, um herauszufinden, welche Gruppen sich spezifisch unterscheiden.", uebungen: "Entscheide anhand von Fallstudien, wann eine ANOVA angebracht ist." }},
  { id: 12, title: "Multiple Lineare Regression", relevance: "green", descriptions: { grundwissen: "Erweitere das Regressionsmodell, um den Einfluss mehrerer Variablen gleichzeitig zu untersuchen.", anwendbarkeit: "Baue ein Modell zur Vorhersage von Immobilienpreisen basierend auf Grösse, Lage und Alter.", meisterklasse: "Identifiziere und behandle Probleme wie Multikollinearität in deinem Modell.", uebungen: "Interpretiere die Koeffizienten eines multiplen Regressionsmodells." }},
  { id: 13, title: "Logistische Regression", relevance: "green", descriptions: { grundwissen: "Lerne, wie man kategoriale Ergebnisse (Ja/Nein) vorhersagt.", anwendbarkeit: "Entwickle ein Modell zur Vorhersage der Kundenabwanderung (Churn Prediction).", meisterklasse: "Interpretiere Odds Ratios und beurteile die Güte deines Klassifikationsmodells (z.B. mit ROC-Kurven).", uebungen: "Wende das Modell auf reale Datensätze an, um Vorhersagen zu treffen." }},
  { id: 14, title: "Nicht-parametrische Tests", relevance: "orange", descriptions: { grundwissen: "Lerne robuste Testverfahren kennen, die keine Normalverteilung voraussetzen.", anwendbarkeit: "Analysiere Daten aus Ranglisten oder Bewertungen, die nicht metrisch sind.", meisterklasse: "Verstehe die Vor- und Nachteile (insb. die 'Power') im Vergleich zu parametrischen Tests.", uebungen: "Wähle in verschiedenen Szenarien den passenden statistischen Test aus." }},
  { id: 15, title: "Bayes'sche Statistik", relevance: "orange", descriptions: { grundwissen: "Verstehe den fundamentalen Unterschied zur klassischen (frequentistischen) Statistik.", anwendbarkeit: "Interpretiere A/B-Testergebnisse als 'Wahrscheinlichkeit, dass Variante B besser ist'.", meisterklasse: "Definiere sinnvolle 'Priors' (Vorannahmen) und verstehe deren Einfluss auf das Ergebnis.", uebungen: "Löse das Monty-Hall-Problem mit dem Satz von Bayes." }},
  { id: 16, title: "Praktische Datenanalyse mit Software", relevance: "green", descriptions: { grundwissen: "Lerne die Grundlagen von Datenanalyse-Bibliotheken in Python (pandas) oder R.", anwendbarkeit: "Führe eine komplette Datenanalyse von der Datenbereinigung bis zur Visualisierung durch.", meisterklasse: "Erstelle reproduzierbare Analyse-Skripte und präsentiere deine Ergebnisse in einem Jupyter-Notebook.", uebungen: "Löse kleine Programmieraufgaben zur Datenmanipulation und -visualisierung." }},
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

const StatisticsPage: FC = () => {
    return (
        <div className="flex">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 flex-shrink-0 p-4 hidden lg:block overflow-y-auto">
                <h2 className="font-bold mb-4">Themen der Statistik</h2>
                <nav className="space-y-2">
                    {statisticsModules.map(module => (
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
                    <h1 className="text-4xl font-bold mb-4">Statistik von A-Z</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        Wähle eine Lektion, um dein Wissen zu vertiefen. Jede Lektion ist in die Bereiche Grundwissen, Anwendbarkeit, Meisterklasse und Übungen unterteilt.
                    </p>
                    <div className="space-y-12">
                        {statisticsModules.map(module => (
                            <Element key={module.id} name={`module-${module.id}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <RelevanceIndicator relevance={module.relevance} />
                                    <h2 className="text-2xl font-bold">{module.id}. {module.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SectionCard title="Grundwissen" icon={<BookOpen className="w-6 h-6 text-primary"/>} href={`/modules/1/grundwissen-${module.id}`}>
                                        <p>{module.descriptions.grundwissen}</p>
                                    </SectionCard>
                                    <SectionCard title="Anwendbarkeit" icon={<Target className="w-6 h-6 text-primary"/>} href={`/modules/1/anwendbarkeit-${module.id}`}>
                                         <p>{module.descriptions.anwendbarkeit}</p>
                                    </SectionCard>
                                    <SectionCard title="Meisterklasse" icon={<BrainCircuit className="w-6 h-6 text-primary"/>} href={`/modules/1/meisterklasse-${module.id}`}>
                                        <p>{module.descriptions.meisterklasse}</p>
                                    </SectionCard>
                                    <SectionCard title="Übungen" icon={<Lightbulb className="w-6 h-6 text-primary"/>} href={`/modules/1/uebungen-${module.id}`}>
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

// --- HAUPTKOMPONENTE (ROUTER) ---
export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const { subscription, isLoading: isSubLoading } = useSubscription();

  if (isSubLoading) {
    return <LoadingSpinner />;
  }

  const isPremium = subscription?.status === 'active';
  const moduleNumber = parseInt(moduleId as string, 10);

  if (moduleNumber === 1) {
    return <StatisticsPage />;
  }

  if (isPremium) {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Modul {moduleId}</h1>
            <p>Hier werden die Lerninhalte für Modul {moduleId} angezeigt. (Platzhalter für Premium-Inhalt)</p>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Zugriff verweigert</h1>
      <p className="mb-6">Dieses Modul ist nur für Premium-Nutzer verfügbar.</p>
      <Link href="/profile" className="px-6 py-2 bg-primary text-white rounded-lg">
        Jetzt upgraden
      </Link>
    </div>
  );
}