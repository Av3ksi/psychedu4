'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, X, Eye, EyeOff } from 'lucide-react';
import { ReactNode, useState, FC } from 'react';

// --- TYP-DEFINITIONEN ---
interface QuizQuestion {
  q: string;
  a: string[];
  correct: number;
}
interface OpenQuestion {
  q: string;
  solution: string;
}
interface UebungenData {
  quiz: QuizQuestion[];
  open: OpenQuestion[];
  kreativ: string;
}
interface ModuleContent {
  grundwissen: ReactNode;
  anwendbarkeit: ReactNode;
  meisterklasse: ReactNode;
  uebungen: ReactNode;
}
interface StatisticsModule {
  id: number;
  title: string;
  relevance: string;
  content: ModuleContent;
}

// --- HILFS-KOMPONENTEN ---
const ToggleSolution: FC<{ question: OpenQuestion }> = ({ question }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-t dark:border-slate-700 pt-4">
            <p className="font-semibold">{question.q}</p>
            <button onClick={() => setIsOpen(!isOpen)} className="text-sm text-primary hover:underline flex items-center gap-2 my-2">
                {isOpen ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                {isOpen ? 'Lösung verbergen' : 'Lösung anzeigen'}
            </button>
            {isOpen && <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300"><p>{question.solution}</p></div>}
        </div>
    );
};
const UebungenContent: FC<{ data: UebungenData }> = ({ data }) => {
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(data.quiz.length).fill(null));
    const handleSelect = (quizIndex: number, answerIndex: number) => { setAnswers(prev => { const newAnswers = [...prev]; newAnswers[quizIndex] = answerIndex; return newAnswers; }); };
    return (
        <div className="space-y-12">
            <div><h3 className="text-2xl font-semibold border-b pb-2 mb-4">Single-Choice-Fragen</h3><div className="space-y-6">{data.quiz.map((q, i) => (<div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><p className="font-semibold mb-3">{i+1}. {q.q}</p><div className="space-y-2">{q.a.map((ans, j) => {const isSelected = answers[i] === j; const isCorrect = q.correct === j; let buttonClass = 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'; if (isSelected) { buttonClass = isCorrect ? 'bg-green-200 dark:bg-green-800 text-slate-900 dark:text-white' : 'bg-red-200 dark:bg-red-800 text-slate-900 dark:text-white'; } return (<button key={j} onClick={() => handleSelect(i, j)} className={`w-full text-left p-2 rounded-md transition-colors flex items-center justify-between ${buttonClass}`}><span>{ans}</span>{isSelected && (isCorrect ? <Check className="w-5 h-5 text-green-700 dark:text-green-300" /> : <X className="w-5 h-5 text-red-700 dark:text-red-300" />)}</button>);})}</div></div>))}</div></div>
            <div><h3 className="text-2xl font-semibold border-b pb-2 mb-4">Offene Fragen</h3><div className="space-y-6">{data.open.map((q, i) => <ToggleSolution key={i} question={q} />)}</div></div>
            <div><h3 className="text-2xl font-semibold border-b pb-2 mb-4">Kreativitätsfrage</h3><div className="p-4 border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20"><p className="italic text-slate-700 dark:text-slate-300">{data.kreativ}</p></div></div>
        </div>
    );
};

// --- INHALTE FÜR MODUL 1 (KORRIGIERT) ---
const grundwissenInhalt = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">Willkommen in der Welt der Statistik! Statistik ist die Wissenschaft und Kunst, aus Daten zu lernen. Sie gibt uns die Werkzeuge, um Informationen zu sammeln, zu analysieren, zu interpretieren und schliesslich fundierte Entscheidungen zu treffen. Ohne Statistik wäre die moderne Psychologie, Wirtschaft oder Medizin undenkbar.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die fünf Grundpfeiler der Statistik</h3>
        <p>Stell dir vor, du möchtest wissen, wie zufrieden die Studierenden in der Schweiz im Durchschnitt mit ihrem Studium sind. Hier kommen die fünf wichtigsten Begriffe ins Spiel:</p>
        <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-100 dark:bg-slate-800"><th className="p-3 font-semibold border-b dark:border-slate-700">Begriff</th><th className="p-3 font-semibold border-b dark:border-slate-700">Erklärung</th><th className="p-3 font-semibold border-b dark:border-slate-700">Beispiel: „Studierendenzufriedenheit“</th></tr></thead><tbody><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Population</td><td className="p-3">Die <strong>gesamte</strong> Gruppe, über die du eine Aussage treffen willst.</td><td className="p-3">Alle 200'000 Studierenden in der Schweiz.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Stichprobe (Sample)</td><td className="p-3">Eine <strong>Teilmenge</strong> der Population, die du tatsächlich untersuchst.</td><td className="p-3">Eine zufällig ausgewählte Gruppe von 1'000 Studierenden.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Parameter</td><td className="p-3">Ein numerischer Wert, der die <strong>Population</strong> beschreibt. (oft unbekannt)</td><td className="p-3">Die <strong>tatsächliche</strong> durchschnittliche Zufriedenheit aller 200'000 Studierenden.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Statistik (Statistic)</td><td className="p-3">Ein numerischer Wert, der die <strong>Stichprobe</strong> beschreibt.</td><td className="p-3">Die <strong>berechnete</strong> durchschnittliche Zufriedenheit der 1'000 befragten Studierenden.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Variable</td><td className="p-3">Die Eigenschaft, die du misst (kann variieren).</td><td className="p-3">Die „Zufriedenheit“ (z.B. auf einer Skala von 1–10).</td></tr></tbody></table></div>
        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-4 rounded-lg"><p><strong>Merkhilfe:</strong> <strong>P</strong>arameter gehört zur <strong>P</strong>opulation. <strong>S</strong>tatistik gehört zur <strong>S</strong>tichprobe.</p></div>
        <h3 className="text-2xl font-semibold border-b pb-2">Arten von Daten: Was messen wir eigentlich?</h3>
        <p>Nicht alle Daten sind gleich. Wir unterscheiden hauptsächlich zwei Arten:</p>
        <ul className="list-disc list-inside space-y-4 pl-2"><li><strong>Qualitative (Kategoriale) Daten:</strong> Beschreiben Merkmale oder Eigenschaften.<br /><em className="text-slate-600 dark:text-slate-400">Beispiele: Haarfarbe, Studienfach.</em></li><li><strong>Quantitative (Numerische) Daten:</strong> Sind immer Zahlen.<ul className="list-disc list-inside space-y-2 pl-6 mt-2"><li><strong>Diskret:</strong> Zählbare Werte.<br/><em className="text-slate-600 dark:text-slate-400">Beispiele: Anzahl Geschwister.</em></li><li><strong>Stetig (Kontinuierlich):</strong> Messbare Werte.<br /><em className="text-slate-600 dark:text-slate-400">Beispiele: Körpergrösse.</em></li></ul></li></ul>
    </div>
);
const anwendbarkeitInhalt = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Theorie ist gut, aber wie hilft uns das in der echten Welt? Sehen wir uns an, wie eine Firma die Grundbegriffe der Statistik nutzt, um eine wichtige Geschäftsentscheidung zu treffen: **„Sollen wir eine neue Premium-Funktion für unsere App entwickeln?“**</p>
        <div className="p-6 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">Ansatz 1: Quantitative Forschung (Das „Was?“)</h3>
            <p className="mt-2 mb-4">Hier geht es um Zahlen, Messungen und statistische Signifikanz.</p>
            <ul className="list-decimal list-inside space-y-3"><li><strong>Population:</strong> Alle 50'000 aktiven Nutzer der App.</li><li><strong>Stichprobe:</strong> Eine E-Mail-Umfrage wird an 2'500 zufällig ausgewählte Nutzer gesendet.</li><li><strong>Statistik:</strong> Aus der Stichprobe berechnen wir: „Der durchschnittliche Preis, den Nutzer zu zahlen bereit sind, beträgt <strong>8.50 CHF</strong>.“</li></ul>
            <p className="mt-4 font-semibold">**Entscheidung:** Da der geschätzte Preis über den Entwicklungskosten liegt, startet das Management das Projekt.</p>
        </div>
        <div className="p-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300">Ansatz 2: Qualitative Forschung (Das „Warum?“)</h3>
            <p className="mt-2 mb-4">Hier geht es um das tiefere Verständnis von Motivationen und Meinungen.</p>
            <ul className="list-decimal list-inside space-y-3"><li><strong>Stichprobe:</strong> 10 sorgfältig ausgewählte „Power-User“ werden zu Interviews eingeladen.</li><li><strong>Analyse:</strong> Man identifiziert wiederkehrende Themen, z.B. „Viele Nutzer wünschten sich die Funktion für Team-Kollaboration“.</li></ul>
            <p className="mt-4 font-semibold">**Entscheidung:** Das Produktteam optimiert die Funktion für Teams.</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Fazit für die Arbeitswelt:</strong> Quantitative Forschung sagt dir, **ob** du etwas tun solltest. Qualitative Forschung sagt dir, **wie** du es am besten tun solltest.</p></div>
    </div>
);
const meisterklasseInhalt = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Grundbegriffe der Statistik zu unterrichten, ist eine Kunst. Dein Ziel als Lehrer ist es, eine <strong>Intuition</strong> zu schaffen. Der Schlüssel dazu ist eine gute Geschichte.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die goldene Regel: Vom Grossen zum Kleinen</h3>
        <ol className="list-decimal list-inside space-y-4"><li><strong>Schritt 1: Das Universum definieren (Population & Parameter).</strong> Starte mit einer grossen, fast unmöglichen Frage.</li><li><strong>Schritt 2: Die Realität anerkennen (Stichprobe).</strong> Mache klar, dass die Untersuchung der Population unmöglich ist.</li><li><strong>Schritt 3: Das Messbare berechnen (Statistik).</strong> Zeige, dass die Statistik aus der Stichprobe unsere beste Schätzung ist.</li></ol>
        <h3 className="text-2xl font-semibold border-b pb-2">Typische Fallen</h3>
        <ul className="list-disc list-inside space-y-3 pl-2"><li><strong>Fehler 1: Mit Definitionen langweilen.</strong> Beginne immer mit einem praxisnahen Problem.</li><li><strong>Fehler 2: Parameter und Statistik verwechseln.</strong> Nutze die Eselsbrücke: <strong>P</strong>arameter/<strong>P</strong>opulation, <strong>S</strong>tatistik/<strong>S</strong>tichprobe.</li></ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Qualitätskontrolle & Finanzieller Wert</h3>
        <p>Die Fähigkeit, die Qualität einer Stichprobe zu beurteilen, ist eine extrem wertvolle Fähigkeit. Eine falsche Statistik kann Unternehmen Millionen kosten.</p>
    </div>
);
const uebungenData1: UebungenData = { 
  quiz: [ 
    { q: "Ein Forscher befragt 500 zufällig ausgewählte CEOs...", a: ["Die Population", "Eine Statistik", "Eine Stichprobe"], correct: 2 }, 
    { q: "Das Durchschnittsalter aller Einwohner von Zürich ist ein...", a: ["Parameter", "Statistik", "Variable"], correct: 0 }, 
    { q: "Die Postleitzahl ist ein Beispiel für welches Datenformat?", a: ["Quantitative, stetige Daten", "Qualitative (kategoriale) Daten", "Quantitative, diskrete Daten"], correct: 1 }, 
  ], 
  open: [ 
    { q: "Du arbeitest für Netflix...", solution: "Population: Alle Netflix-Abonnenten..." }, 
    { q: "Warum ist die ‚Anzahl der verkauften Kaffees‘ diskret...", solution: "Die ‚Anzahl‘ kann man zählen..." } 
  ], 
  kreativ: "Stell dir vor, du könntest eine einzige statistische Frage über die gesamte Menschheit stellen..." 
};
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;

// --- INHALTE FÜR MODUL 2 (KORRIGIERT) ---
const grundwissenInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Nachdem wir wissen, was Daten sind, müssen wir klären, wie wir sie erhalten. Eine schlechte Datenerhebung führt unweigerlich zu falschen Schlussfolgerungen, egal wie gut die Analyse ist. „Garbage in, garbage out“ ist das oberste Gebot.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Kunst der richtigen Stichprobe</h3>
        <p>Da wir selten die ganze Population befragen können, müssen wir eine kluge Auswahl treffen. Das Ziel ist immer, eine <strong>repräsentative</strong> Stichprobe zu erhalten.</p>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li><strong>Zufallsstichprobe (Simple Random):</strong> Jedes Mitglied der Population hat die exakt gleiche Chance, ausgewählt zu werden. Das ist der Goldstandard, aber oft schwer umsetzbar. (Beispiel: Namen aus einem Hut ziehen).</li>
            <li><strong>Geschichtete Stichprobe (Stratified):</strong> Die Population wird zuerst in relevante Gruppen (Schichten/Strata) unterteilt (z.B. nach Altersgruppen). Dann wird aus jeder Gruppe eine Zufallsstichprobe gezogen. Garantiert, dass alle Gruppen vertreten sind.</li>
            <li><strong>Cluster-Stichprobe:</strong> Die Population wird in natürliche Gruppen (Cluster) unterteilt (z.B. Schulklassen). Man wählt zufällig einige ganze Cluster aus und befragt <strong>alle</strong> Mitglieder dieser ausgewählten Cluster.</li>
        </ul>
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg"><p><strong>Warnung:</strong> Vermeide die „Gelegenheitsstichprobe“ (Convenience Sampling), bei der du einfach Leute befragst, die leicht verfügbar sind (z.B. nur deine Freunde). Diese ist fast immer verzerrt (biased).</p></div>
        <h3 className="text-2xl font-semibold border-b pb-2">Experiment vs. Beobachtung</h3>
        <p>Der wichtigste Unterschied im Studiendesign ist, ob du aktiv eingreifst oder nur zuschaust.</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Beobachtungsstudie:</strong> Du misst Variablen, ohne die Teilnehmer zu beeinflussen. Du kannst Zusammenhänge (Korrelationen) finden, aber <strong>niemals auf Ursache-Wirkung schliessen</strong>.</li>
            <li><strong>Experiment:</strong> Du greifst aktiv ein, indem du eine Variable manipulierst und ihre Auswirkung auf eine andere misst. Nur ein gut geplantes Experiment erlaubt Kausalschlüsse.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Software-Unternehmen möchte wissen, ob ein neues „Dark Mode“-Feature die tägliche Nutzungsdauer der App erhöht.</p>
        <div className="p-6 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-orange-800 dark:text-orange-300">Ansatz 1: Beobachtungsstudie (Schnell, aber gefährlich)</h3>
            <p className="mt-2 mb-4">Man vergleicht die Nutzungsdauer aller Nutzer in der Woche *vor* dem Update mit der Woche *danach*.</p>
            <p><strong>Problem:</strong> Was ist, wenn in der Woche nach dem Update zufällig Ferien waren? Man findet eine <strong>Korrelation</strong>, aber keine <strong>Kausalität</strong>.</p>
        </div>
        <div className="p-6 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">Ansatz 2: Experiment (Der Goldstandard)</h3>
            <p className="mt-2 mb-4">Man teilt 10'000 Nutzer per Zufall in zwei Gruppen: 5'000 erhalten den Dark Mode (Treatment-Gruppe), 5'000 nicht (Kontroll-Gruppe).</p>
            <p><strong>Korrekter Schluss:</strong> Wenn die Nutzungsdauer in der Dark-Mode-Gruppe signifikant höher ist, <strong>verursacht</strong> der Dark Mode die höhere Nutzung, da alle anderen Einflüsse zufällig auf beide Gruppen verteilt waren.</p>
        </div>
    </div>
);
const meisterklasseInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Der häufigste und teuerste Fehler in der Datenanalyse ist die Verwechslung von <strong>Korrelation und Kausalität</strong>. Deine wichtigste Aufgabe als Lehrer ist es, diesen Unterschied unmissverständlich klarzumachen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das Eiscreme-Beispiel</h3>
        <p>Nutze diese Geschichte: „Daten zeigen, dass Hai-Angriffe ansteigen, wenn mehr Eiscreme verkauft wird. Sollen wir also den Eisverkauf verbieten?“</p>
        <p>Die Antwort ist nein. Die „lauernde Variable“ (Lurking Variable) ist die <strong>Temperatur</strong>. Im Sommer wird mehr Eis gegessen UND es gehen mehr Menschen schwimmen.</p>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><strong>Lehrsatz:</strong> Eine Beobachtungsstudie kann dir niemals sagen, ob A B verursacht. Nur ein Experiment mit <strong>zufälliger Zuweisung</strong> kann Kausalität beweisen.</div>
        <h3 className="text-2xl font-semibold border-b pb-2">Ethische Grenzen</h3>
        <p>Mache klar, warum wir nicht alles experimentell untersuchen können. Man kann z.B. aus ethischen Gründen niemanden zwingen zu rauchen, um die Kausalität von Lungenkrebs zu beweisen. Hier ist man auf sehr gute Beobachtungsstudien angewiesen.</p>
    </div>
);
const uebungenData2: UebungenData = {
    quiz: [
        { q: "Eine Universität befragt alle Studierenden der Psychologie und alle der Informatik, um Meinungen zu vergleichen. Welche Stichprobenart ist das?", a: ["Cluster-Stichprobe", "Zufallsstichprobe", "Geschichtete Stichprobe"], correct: 2 },
        { q: "Ein Forscher will den Effekt von Kaffee auf die Reaktionszeit messen. Was ist die abhängige Variable?", a: ["Die Kaffeemenge", "Die Reaktionszeit", "Die Tageszeit"], correct: 1 },
    ],
    open: [
        { q: "Du möchtest herausfinden, ob eine 4-Tage-Woche die Produktivität in deiner Firma steigert. Skizziere kurz ein Experiment. Was ist deine Kontrollgruppe?", solution: "Population: Alle Mitarbeiter. Stichprobe: Zufällig 2 von 4 Abteilungen auswählen. Treatment-Gruppe: Diese 2 Abteilungen arbeiten 3 Monate lang nur 4 Tage. Kontroll-Gruppe: Die anderen 2 Abteilungen arbeiten normal weiter. Variable: Gemessene Produktivität." },
    ],
    kreativ: "In den Nachrichten liest du: ‚Studie zeigt: Menschen, die Rotwein trinken, leben länger.‘ Nenne mindestens drei mögliche ‚lauernde Variablen‘, die diesen Zusammenhang erklären könnten."
};
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;

// --- MODUL-LISTE ---
const statisticsModules: StatisticsModule[] = [
    { 
        id: 1, 
        title: "Einführung & Grundbegriffe", 
        relevance: "green", 
        content: { 
            grundwissen: grundwissenInhalt, 
            anwendbarkeit: anwendbarkeitInhalt, 
            meisterklasse: meisterklasseInhalt,
            uebungen: uebungenInhalt1
        }
    },
    { 
        id: 2, 
        title: "Datenerhebung & Studiendesign", 
        relevance: "orange", 
        content: { 
            grundwissen: grundwissenInhalt2, 
            anwendbarkeit: anwendbarkeitInhalt2, 
            meisterklasse: meisterklasseInhalt2,
            uebungen: uebungenInhalt2
        }
    },
];

// --- HAUPTKOMPONENTE ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = statisticsModules.find(m => m.id === moduleId);

  if (!moduleData) {
    return <div>Lektion nicht gefunden.</div>;
  }
  
  const contentKey = type as keyof typeof moduleData.content;
  const content = moduleData.content[contentKey] || "Inhalt nicht verfügbar.";
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${moduleData.title}`;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <Link href="/modules/1" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Statistik-Übersicht</span>
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {content}
        </div>
      </div>
    </div>
  );
}