'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, X, Eye, EyeOff } from 'lucide-react';
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

// --- INHALTE FÜR MODUL 1 ---
const grundwissenInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">Willkommen in der Welt der Statistik! Statistik ist die Wissenschaft und Kunst, aus Daten zu lernen. Sie gibt uns die Werkzeuge, um Informationen zu sammeln, zu analysieren, zu interpretieren und schliesslich fundierte Entscheidungen zu treffen. Ohne Statistik wäre die moderne Psychologie, Wirtschaft oder Medizin undenkbar.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die fünf Grundpfeiler der Statistik</h3>
        <p>Stell dir vor, du möchtest wissen, wie zufrieden die Studierenden in der Schweiz im Durchschnitt mit ihrem Studium sind. Hier kommen die fünf wichtigsten Begriffe ins Spiel:</p>
        <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-100 dark:bg-slate-800"><th className="p-3 font-semibold border-b dark:border-slate-700">Begriff</th><th className="p-3 font-semibold border-b dark:border-slate-700">Erklärung</th><th className="p-3 font-semibold border-b dark:border-slate-700">Beispiel: &quot;Studierendenzufriedenheit&quot;</th></tr></thead><tbody><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Population</td><td className="p-3">Die <strong>gesamte</strong> Gruppe, über die du eine Aussage treffen willst.</td><td className="p-3">Alle 200&apos;000 Studierenden in der Schweiz.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Stichprobe (Sample)</td><td className="p-3">Eine <strong>Teilmenge</strong> der Population, die du tatsächlich untersuchst.</td><td className="p-3">Eine zufällig ausgewählte Gruppe von 1&apos;000 Studierenden.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Parameter</td><td className="p-3">Ein numerischer Wert, der die <strong>Population</strong> beschreibt. (oft unbekannt)</td><td className="p-3">Die <strong>tatsächliche</strong> durchschnittliche Zufriedenheit aller 200&apos;000 Studierenden.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Statistik (Statistic)</td><td className="p-3">Ein numerischer Wert, der die <strong>Stichprobe</strong> beschreibt.</td><td className="p-3">Die <strong>berechnete</strong> durchschnittliche Zufriedenheit der 1&apos;000 befragten Studierenden.</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3 font-bold">Variable</td><td className="p-3">Die Eigenschaft, die du misst (kann variieren).</td><td className="p-3">Die &quot;Zufriedenheit&quot; (z.B. auf einer Skala von 1–10).</td></tr></tbody></table></div>

        {/* KORRIGIERTES BILD */}
        <div className="my-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
            <Image 
                src="/diagram-population-stichprobe.png" 
                alt="Diagramm von Population und Stichprobe" 
                width={448} // max-w-md entspricht 448px
                height={250} // Geschätztes Seitenverhältnis
                className="mx-auto w-full max-w-md rounded-lg" 
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Visuelle Darstellung: Die Stichprobe {'(Sample)'} ist eine kleine, repräsentative Auswahl aus der viel grösseren Population.</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-4 rounded-lg"><p><strong>Merkhilfe:</strong> <strong>P</strong>arameter gehört zur <strong>P</strong>opulation. <strong>S</strong>tatistik gehört zur <strong>S</strong>tichprobe.</p></div>

        <h3 className="text-2xl font-semibold border-b pb-2">Die Rolle von Variablen in Experimenten</h3>
        <p>Im Kontext von Experimenten (siehe Modul 2) geben wir Variablen oft spezifischere Rollen, um Ursache-Wirkungs-Beziehungen zu untersuchen:</p>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li>
                <strong>Unabhängige Variable (UV):</strong> Dies ist die Variable, die vom Forscher **manipuliert** oder gezielt verändert wird. Man kann sie sich als die &quot;Ursache&quot; vorstellen.
                <br /><em className="text-slate-600 dark:text-slate-400">Beispiel: Ein Forscher möchte den Effekt von Koffein auf die Gedächtnisleistung testen. Er gibt einer Gruppe eine Koffeinpille (UV = Koffein) und der anderen ein Placebo (UV = kein Koffein).</em>
            </li>
            <li>
                <strong>Abhängige Variable (AV):</strong> Dies ist die Variable, die **gemessen** wird, um den Effekt der unabhängigen Variable zu sehen. Man kann sie sich als die &quot;Wirkung&quot; vorstellen.
                <br /><em className="text-slate-600 dark:text-slate-400">Beispiel: Nach der Einnahme der Pille misst der Forscher die Gedächtnisleistung aller Teilnehmer mit einem Test. Die Punktzahl im Test ist die abhängige Variable.</em>
            </li>
        </ul>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Merkhilfe:</strong> Die abhängige Variable ist vom Wert der unabhängigen Variable *abhängig*.</p></div>

        <h3 className="text-2xl font-semibold border-b pb-2">Arten von Daten: Was messen wir eigentlich?</h3>
        <p>Nicht alle Daten sind gleich. Wir unterscheiden hauptsächlich zwei Arten:</p>
        <ul className="list-disc list-inside space-y-4 pl-2"><li><strong>Qualitative (Kategoriale) Daten:</strong> Beschreiben Merkmale oder Eigenschaften.<br /><em className="text-slate-600 dark:text-slate-400">Beispiele: Haarfarbe, Studienfach.</em></li><li><strong>Quantitative (Numerische) Daten:</strong> Sind immer Zahlen.<ul className="list-disc list-inside space-y-2 pl-6 mt-2"><li><strong>Diskret:</strong> Zählbare Werte.<br/><em className="text-slate-600 dark:text-slate-400">Beispiele: Anzahl Geschwister.</em></li><li><strong>Stetig (Kontinuierlich):</strong> Messbare Werte.<br /><em className="text-slate-600 dark:text-slate-400">Beispiele: Körpergrösse.</em></li></ul></li></ul>
    </div>
);
const anwendbarkeitInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Theorie ist gut, aber wie hilft uns das in der echten Welt? Sehen wir uns an, wie eine Firma die Grundbegriffe der Statistik nutzt, um eine wichtige Geschäftsentscheidung zu treffen: **&quot;Sollen wir eine neue Premium-Funktion für unsere App entwickeln?&quot;**</p>
        <div className="p-6 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">Ansatz 1: Quantitative Forschung (Das &quot;Was?&quot;)</h3>
            <p className="mt-2 mb-4">Hier geht es um Zahlen, Messungen und statistische Signifikanz.</p>
            <ul className="list-decimal list-inside space-y-3"><li><strong>Population:</strong> Alle 50&apos;000 aktiven Nutzer der App.</li><li><strong>Stichprobe:</strong> Eine E-Mail-Umfrage wird an 2&apos;500 zufällig ausgewählte Nutzer gesendet.</li><li><strong>Statistik:</strong> Aus der Stichprobe berechnen wir: &quot;Der durchschnittliche Preis, den Nutzer zu zahlen bereit sind, beträgt <strong>8.50 CHF</strong>.&quot;</li></ul>
            <p className="mt-4 font-semibold">**Entscheidung:** Da der geschätzte Preis über den Entwicklungskosten liegt, startet das Management das Projekt.</p>
        </div>
        <div className="p-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300">Ansatz 2: Qualitative Forschung (Das &quot;Warum?&quot;)</h3>
            <p className="mt-2 mb-4">Hier geht es um das tiefere Verständnis von Motivationen und Meinungen.</p>
            <ul className="list-decimal list-inside space-y-3"><li><strong>Stichprobe:</strong> 10 sorgfältig ausgewählte &quot;Power-User&quot; werden zu Interviews eingeladen.</li><li><strong>Analyse:</strong> Man identifiziert wiederkehrende Themen, z.B. &quot;Viele Nutzer wünschten sich die Funktion für Team-Kollaboration&quot;.</li></ul>
            <p className="mt-4 font-semibold">**Entscheidung:** Das Produktteam optimiert die Funktion für Teams.</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Fazit für die Arbeitswelt:</strong> Quantitative Forschung sagt dir, **ob** du etwas tun solltest. Qualitative Forschung sagt dir, **wie** du es am besten tun solltest.</p></div>
    </div>
);
const meisterklasseInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Grundbegriffe der Statistik zu unterrichten, ist eine Kunst. Dein Ziel als Lehrer ist es, eine <strong>Intuition</strong> zu schaffen. Der Schlüssel dazu ist eine gute Geschichte.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die goldene Regel: Vom Grossen zum Kleinen</h3>
        <ol className="list-decimal list-inside space-y-4"><li><strong>Schritt 1: Das Universum definieren (Population & Parameter).</strong> Starte mit einer grossen, fast unmöglichen Frage.</li><li><strong>Schritt 2: Die Realität anerkennen (Stichprobe).</strong> Mache klar, dass die Untersuchung der Population unmöglich ist.</li><li><strong>Schritt 3: Das Messbare berechnen (Statistik).</strong> Zeige, dass die Statistik aus der Stichprobe unsere beste Schätzung ist.</li></ol>
        
        {/* ERWEITERTER ABSCHNITT */}
        <h3 className="text-2xl font-semibold border-b pb-2">Typische Fallen (mit Beispielen)</h3>
        <ul className="list-disc list-inside space-y-6 pl-2">
            <li>
                <strong>Fehler 1: Mit Definitionen langweilen.</strong>
                <p className="mt-2 text-slate-700 dark:text-slate-300">Niemand wird motiviert durch abstrakte Definitionen. Der Mensch lernt durch Probleme und Geschichten.</p>
                <ul className="list-none space-y-2 pl-4 mt-2">
                    <li><strong className="text-red-500">Schlecht:</strong> &quot;Heute lernen wir, was ein Parameter ist. Ein Parameter ist eine numerische Grösse, die eine Eigenschaft einer Population beschreibt.&quot; </li>
                    <li><strong className="text-green-500">Besser:</strong> &quot;Stellt euch vor, wir wollen den *tatsächlichen* Durchschnitts-IQ aller Schweizer herausfinden. Diese eine, wahre Zahl, die wir aber nie genau kennen werden, nennen wir &apos;Parameter&apos;. Wie könnten wir versuchen, uns ihr anzunähern?&quot; </li>
                </ul>
            </li>
            <li>
                <strong>Fehler 2: Parameter und Statistik verwechseln.</strong>
                <p className="mt-2 text-slate-700 dark:text-slate-300">Dies ist mehr als nur ein terminologischer Fehler; es führt zu gefährlicher Selbstüberschätzung.</p>
                <ul className="list-none space-y-2 pl-4 mt-2">
                    <li><strong>Beispiel:</strong> Eine Umfrage unter 1000 Personen ergibt, dass 55% die Partei A wählen würden.</li>
                    <li><strong className="text-red-500">Falsche Schlussfolgerung:</strong> &quot;Der Parameter für Partei A ist 55%. Partei A hat also die absolute Mehrheit.&quot; (Falsch! Das Ergebnis der Stichprobe wird als absolute Wahrheit für alle dargestellt.)</li>
                    <li><strong className="text-green-500">Korrekte Aussage:</strong> &quot;Unsere *Statistik* aus der Stichprobe beträgt 55%. Dies ist unsere beste Schätzung für den unbekannten *Parameter* in der Gesamtbevölkerung. Der wahre Wert liegt wahrscheinlich irgendwo in der Nähe von 55%.&quot;</li>
                </ul>
            </li>
            <li>
                <strong>Fehler 3: Die Qualität der Stichprobe ignorieren.</strong>
                <p className="mt-2 text-slate-700 dark:text-slate-300">Eine Statistik ist nur so gut wie die Stichprobe, aus der sie stammt. Eine verzerrte Stichprobe (biased sample) produziert nutzlose Statistiken.</p>
                <ul className="list-none space-y-2 pl-4 mt-2">
                    <li><strong>Beispiel:</strong> Um das Durchschnittseinkommen einer Stadt zu ermitteln, befragt man ausschliesslich die Besucher eines Luxus-Einkaufszentrums.</li>
                    <li><strong className="text-red-500">Falsche Schlussfolgerung:</strong> Man berechnet einen sehr hohen Durchschnitt und schliesst daraus, dass die Stadt extrem wohlhabend ist.</li>
                    <li><strong className="text-green-500">Korrekte Analyse:</strong> Die Statistik ist wertlos, da die Stichprobe nicht repräsentativ ist. Man hat systematisch einkommensschwächere Gruppen (die nicht in Luxus-Zentren einkaufen) ausgeschlossen. Die Schätzung für den wahren Parameter ist daher stark nach oben verzerrt.</li>
                </ul>
            </li>
        </ul>

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
    { q: "Du arbeitest für Netflix und möchtest die durchschnittliche Sehdauer pro Tag aller europäischen Abonnenten schätzen. Definiere Population, Stichprobe, Parameter und eine mögliche Statistik.", solution: "Population: Alle Netflix-Abonnenten in Europa. Stichprobe: Eine zufällige Auswahl von 10'000 europäischen Abonnenten. Parameter: Die tatsächliche durchschnittliche Sehdauer aller europäischen Abonnenten. Statistik: Die berechnete durchschnittliche Sehdauer der 10'000 Abonnenten in der Stichprobe." },
    { q: "Warum ist die 'Anzahl der verkauften Kaffees' diskret, während die 'Füllmenge eines Kaffees' stetig ist?", solution: "Die 'Anzahl' kann man zählen (1, 2, 3...), es gibt keine Zwischenwerte. Die 'Füllmenge' kann man messen und sie kann jeden Wert in einem Bereich annehmen (z.B. 200.5 ml, 201.23 ml...)." }
  ],
  kreativ: "Stell dir vor, du könntest eine einzige statistische Frage über die gesamte Menschheit stellen, um möglichst viel über sie zu lernen. Welche Frage wäre das und warum?"
};
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;

// --- INHALTE FÜR MODUL 2 ---
const grundwissenInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Nachdem wir wissen, was Daten sind, müssen wir klären, wie wir sie erhalten. Eine schlechte Datenerhebung führt unweigerlich zu falschen Schlussfolgerungen, egal wie gut die Analyse ist. &quot;Garbage in, garbage out&quot; ist das oberste Gebot.</p>

        <h3 className="text-2xl font-semibold border-b pb-2">Die Kunst der richtigen Stichprobe</h3>
        <p>Da wir selten die ganze Population befragen können, müssen wir eine kluge Auswahl treffen. Das Ziel ist immer, eine <strong>repräsentative</strong> Stichprobe zu erhalten.</p>

        <ul className="list-disc list-inside space-y-4 pl-2">
            <li><strong>Zufallsstichprobe (Simple Random):</strong> Jedes Mitglied der Population hat die exakt gleiche Chance, ausgewählt zu werden. Das ist der Goldstandard, aber oft schwer umsetzbar. (Beispiel: Namen aus einem Hut ziehen).</li>
            <li><strong>Geschichtete Stichprobe (Stratified):</strong> Die Population wird zuerst in relevante Gruppen (Schichten/Strata) unterteilt (z.B. nach Altersgruppen). Dann wird aus jeder Gruppe eine Zufallsstichprobe gezogen. Garantiert, dass alle Gruppen vertreten sind.</li>
            <li><strong>Cluster-Stichprobe:</strong> Die Population wird in natürliche Gruppen (Cluster) unterteilt (z.B. Schulklassen, Unternehmensabteilungen). Man wählt zufällig einige ganze Cluster aus und befragt <strong>alle</strong> Mitglieder dieser ausgewählten Cluster.</li>
        </ul>

        {/* --- HIER WIRD DEIN BILD EINGEFÜGT --- */}
        <div className="my-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <Image 
                // Der Pfad beginnt mit "/" und verweist auf dein Bild im "public"-Ordner
                src="/stich.png" 

                // Ein beschreibender Text für Barrierefreiheit
                alt="Diagramm der verschiedenen Stichprobenarten: Zufall, Geschichtet und Cluster" 

                // WICHTIG: Ersetze diese Werte durch die ECHTEN Pixel-Dimensionen deines Bildes!
               width={448} // max-w-md entspricht 448px
                height={250}

                // Klassen für das Styling
                className="w-full h-auto rounded-md shadow-md" 
            />
        </div>
        {/* --- ENDE DES BILD-BLOCKS --- */}

        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg"><p><strong>Warnung:</strong> Vermeide die &quot;Gelegenheitsstichprobe&quot; (Convenience Sampling), bei der du einfach Leute befragst, die leicht verfügbar sind (z.B. nur deine Freunde). Diese ist fast immer verzerrt (biased).</p></div>

        <h3 className="text-2xl font-semibold border-b pb-2">Experiment vs. Beobachtung</h3>
        <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Beobachtungsstudie:</strong> Du misst nur. Du findest Korrelationen, aber <strong>niemals Ursache-Wirkung</strong>.</li>
            <li><strong>Experiment:</strong> Du greifst aktiv ein, um Ursache-Wirkung zu beweisen.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Software-Unternehmen möchte wissen, ob ein neues &quot;Dark Mode&quot;-Feature die tägliche Nutzungsdauer der App erhöht.</p>
        <div className="p-6 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-orange-800 dark:text-orange-300">Ansatz 1: Beobachtungsstudie (Gefährlich)</h3>
            <p className="mt-2">Man vergleicht die Nutzung *vor* und *nach* dem Update. Problem: Waren vielleicht Ferien? Man findet eine <strong>Korrelation</strong>, keine <strong>Kausalität</strong>.</p>
        </div>
        <div className="p-6 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300">Ansatz 2: Experiment (Goldstandard)</h3>
            <p className="mt-2">10&apos;000 Nutzer werden zufällig aufgeteilt: 5&apos;000 erhalten Dark Mode (Treatment-Gruppe), 5&apos;000 nicht (Kontroll-Gruppe). Ist die Nutzung in der Treatment-Gruppe höher, **verursacht** der Dark Mode die höhere Nutzung.</p>
        </div>
    </div>
);
const meisterklasseInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Der teuerste Fehler in der Datenanalyse ist die Verwechslung von <strong>Korrelation und Kausalität</strong>. Deine Aufgabe als Lehrer ist es, das unmissverständlich klarzumachen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das Eiscreme-Beispiel</h3>
        <p>Nutze die Geschichte: &quot;Daten zeigen, dass Hai-Angriffe ansteigen, wenn mehr Eiscreme verkauft wird. Sollen wir Eis verbieten?&quot; Nein. Die &quot;lauernde Variable&quot; (Lurking Variable) ist die <strong>Temperatur</strong>. Im Sommer wird mehr Eis gegessen UND mehr geschwommen.</p>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><strong>Lehrsatz:</strong> Nur ein Experiment mit <strong>zufälliger Zuweisung</strong> kann Kausalität beweisen.</div>
        <h3 className="text-2xl font-semibold border-b pb-2">Ethische Grenzen</h3>
        <p>Mache klar, warum wir nicht alles experimentell untersuchen können. Man kann z.B. aus ethischen Gründen niemanden zwingen zu rauchen, um die Kausalität von Lungenkrebs zu beweisen. Hier ist man auf sehr gute Beobachtungsstudien angewiesen.</p>
    </div>
);
const uebungenData2: UebungenData = {
    quiz: [
        { q: "Eine Uni befragt alle Psychologie- und alle Informatik-Studierenden. Das ist eine...", a: ["Cluster-Stichprobe", "Zufallsstichprobe", "Geschichtete Stichprobe"], correct: 2 },
        { q: "Ein Forscher will den Effekt von Kaffee auf die Reaktionszeit messen. Was ist die abhängige Variable?", a: ["Die Kaffeemenge", "Die Reaktionszeit", "Die Tageszeit"], correct: 1 },
    ],
    open: [
        { q: "Skizziere ein Experiment, um zu testen, ob eine 4-Tage-Woche die Produktivität steigert.", solution: "Treatment-Gruppe: Zufällig ausgewählte Abteilungen arbeiten 4 Tage. Kontroll-Gruppe: Die anderen arbeiten normal weiter. Man vergleicht die Produktivität." },
    ],
    kreativ: "In den Nachrichten liest du: 'Studie zeigt: Menschen, die Rotwein trinken, leben länger.' Nenne mindestens drei mögliche 'lauernde Variablen'."
};
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;

// --- INHALTE FÜR MODUL 3 ---
const grundwissenInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die beschreibende (oder deskriptive) Statistik hilft uns, grosse Datenmengen übersichtlich zusammenzufassen und zu visualisieren. Sie beschreibt, was in den Daten vorhanden ist, ohne Verallgemeinerungen über die Stichprobe hinaus zu treffen.</p>
        
        {/* Gemeinsame Datenreihe für die Beispiele */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <p className="font-semibold text-center">Für die folgenden Beispiele nutzen wir eine simple Datenreihe: Die Quiz-Punkte von 5 Studierenden.</p>
            <p className="text-2xl font-mono text-center my-2 tracking-wider">[4, 5, 2, 5, 3]</p>
        </div>

        <h3 className="text-2xl font-semibold border-b pb-2">Zentrale Lagemaße: Wo ist das Zentrum?</h3>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li>
                <strong>Mittelwert (Mean):</strong> Der Durchschnitt aller Werte. Sehr anfällig für Ausreisser.
                <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: (4 + 5 + 2 + 5 + 3) / 5 = <strong>3.8</strong>. Kommt ein Ausreisser dazu (z.B. ein Schüler mit 20 Punkten), verzerrt das den Mittelwert stark.</em>
            </li>
            <li>
                <strong>Median:</strong> Der mittlere Wert in einer sortierten Datenreihe. Robust gegenüber Ausreissern.
                <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: Zuerst sortieren wir die Punkte: [2, 3, <strong>4</strong>, 5, 5]. Der Wert genau in der Mitte ist die 4. Der Median ist also <strong>4</strong>.</em>
            </li>
            <li>
                <strong>Modus (Mode):</strong> Der häufigste Wert in den Daten.
                <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: In der Reihe [2, 3, 4, <strong>5, 5</strong>] kommt die 5 am häufigsten vor. Der Modus ist also <strong>5</strong>.</em>
            </li>
        </ul>

        {/* --- PLATZHALTER 1: ZENTRALE LAGEMASSE --- */}
        <div className="my-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
            <Image 
                src="/Average.png" 
                alt="Platzhalter-Grafik, die Mittelwert, Median und Modus in einer Verteilung zeigt" 
                width={600}
                height={300}
                className="mx-auto w-full max-w-lg rounded-lg" 
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Eine visuelle Darstellung der zentralen Lagemaße.</p>
        </div>

        <h3 className="text-2xl font-semibold border-b pb-2">Streuungsmaße: Wie verteilt sind die Daten?</h3>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li>
                <strong>Spannweite (Range):</strong> Differenz zwischen dem höchsten und niedrigsten Wert.
                <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: Höchster Wert (5) - niedrigster Wert (2) = <strong>3</strong>.</em>
            </li>
            <li>
                <strong>Interquartilsabstand (IQR):</strong> Die mittleren 50% der Daten. Misst die Streuung um den Median und ignoriert Ausreisser.
                <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: Gibt den Bereich an, in dem die mittleren 50% der Punkte liegen.</em>
            </li>
            <li>
                <strong>Varianz & Standardabweichung:</strong> Messen die durchschnittliche Abweichung jedes einzelnen Datenpunktes vom Mittelwert.
                <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: Eine kleine Standardabweichung bedeutet, die Punkte liegen alle nah am Durchschnitt (3.8). Eine grosse bedeutet, sie sind weit verstreut.</em>
            </li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p><strong>Visualisierung:</strong> Ein <strong>Boxplot</strong> ist eine geniale Methode, um Median, IQR und mögliche Ausreisser auf einen Blick zu sehen. Ein <strong>Histogramm</strong> zeigt die Verteilung und Häufigkeit der Daten.</p></div>
    </div>
);
const anwendbarkeitInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Online-Shop analysiert die Kaufbeträge seiner Kunden. Der Mittelwert beträgt 80 CHF, der Median aber nur 45 CHF.</p>
        <p><strong>Interpretation:</strong> Die grosse Differenz zwischen Mittelwert und Median deutet auf eine rechtsschiefe Verteilung hin. Das heisst: Die meisten Kunden geben eher kleinere Beträge aus (um die 45 CHF), aber einige wenige &quot;Power-Käufer&quot; ziehen mit sehr hohen Rechnungen den Durchschnitt stark nach oben. </p>
        <p><strong>Handlungsempfehlung:</strong> Anstatt einer allgemeinen Rabattaktion für alle (die auf dem hohen Mittelwert basiert), sollte das Marketing gezielte Aktionen für das &quot;Median-Segment&quot; (die grosse Masse) und ein spezielles VIP-Programm für die Ausreisser-Kunden entwickeln.</p>
    </div>
);
const meisterklasseInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Wann welches Lagemaß?</h3>
        <p>Die Wahl des richtigen Lagemaßes ist entscheidend. Für symmetrische Daten (wie die Körpergrösse) sind Mittelwert und Median ähnlich und beide gut geeignet. Für schiefe Daten (wie Einkommen oder Reaktionszeiten) ist der <strong>Median fast immer die bessere Wahl</strong>, da er ein robusteres Bild der &quot;typischen&quot; Beobachtung liefert und nicht von Extremwerten verzerrt wird.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Tücken der Standardabweichung</h3>
        <p>Die Standardabweichung ist nur dann wirklich aussagekräftig, wenn die Daten annähernd normalverteilt sind (siehe Glockenkurve in Modul 6). Bei stark schiefen Verteilungen kann sie irreführend sein. Hier ist der Interquartilsabstand (IQR) oft die bessere Wahl zur Beschreibung der Streuung.</p>
    </div>
);
const uebungenData3: UebungenData = {
    quiz: [
        { q: "Welches Lagemaß ist am empfindlichsten gegenüber Ausreissern?", a: ["Median", "Mittelwert", "Modus"], correct: 1 },
        { q: "In einem Boxplot repräsentiert die 'Box'...", a: ["Die gesamte Spannweite", "Den Interquartilsabstand (IQR)", "Eine Standardabweichung"], correct: 1 },
    ],
    open: [
        { q: "Gegeben sind die Zahlen: 2, 3, 3, 5, 8, 10, 30. Berechne Mittelwert und Median. Welcher Wert beschreibt das 'Zentrum' besser und warum?", solution: "Mittelwert: 8.71, Median: 5. Der Median beschreibt das Zentrum besser, da der Wert '30' ein Ausreisser ist, der den Mittelwert stark nach oben zieht." },
    ],
    kreativ: "Du bist Sportanalyst. Wie würdest du die Leistung von zwei Fussballstürmern mit jeweils 20 Saisontoren vergleichen, wenn einer eine viel höhere Standardabweichung seiner Tore pro Spiel hat als der andere?"
};
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;

// --- INHALTE FÜR MODUL 4 ---
const grundwissenInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Wahrscheinlichkeitstheorie ist die mathematische Grundlage, um von einer Stichprobe auf die Population zu schliessen (Inferenzstatistik). Sie beschäftigt sich mit der Quantifizierung von Unsicherheit.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Grundbegriffe</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Zufallsexperiment:</strong> Ein Prozess mit einem unsicheren Ausgang (z.B. ein Münzwurf).</li>
            <li><strong>Ergebnisraum (Sample Space):</strong> Die Menge aller möglichen Ausgänge (z.B. Kopf, Zahl).</li>
            <li><strong>Ereignis (Event):</strong> Eine Teilmenge des Ergebnisraums (z.B. Kopf).</li>
            <li><strong>Wahrscheinlichkeit:</strong> Eine Zahl zwischen 0 und 1, die die Chance angibt, dass ein Ereignis eintritt.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Rechenregeln</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Komplementärregel:</strong> Die Wahrscheinlichkeit, dass ein Ereignis A *nicht* eintritt, ist P(nicht A) = 1 - P(A).</li>
            <li><strong>Additionsregel:</strong> P(A oder B) = P(A) + P(B) - P(A und B). Wenn A und B sich ausschliessen, ist P(A und B) = 0.</li>
            <li><strong>Bedingte Wahrscheinlichkeit:</strong> Die Wahrscheinlichkeit für A, *gegeben dass B bereits eingetreten ist*, ist P(A|B) = P(A und B) / P(B).</li>
            <li><strong>Multiplikationsregel:</strong> P(A und B) = P(A|B) * P(B). Wenn A und B unabhängig sind, vereinfacht sich dies zu P(A und B) = P(A) * P(B).</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Arzt führt einen medizinischen Test durch. Die Wahrscheinlichkeit, dass eine kranke Person ein positives Ergebnis erhält (Sensitivität), beträgt 99%. Die Wahrscheinlichkeit, dass eine gesunde Person ein negatives Ergebnis erhält (Spezifität), beträgt 95%. Die Krankheit kommt bei 1% der Bevölkerung vor.</p>
        <p><strong>Frage:</strong> Eine Person wird zufällig getestet und erhält ein positives Ergebnis. Wie hoch ist die Wahrscheinlichkeit, dass sie wirklich krank ist?</p>
        <p><strong>Antwort (via Satz von Bayes):</strong> Die Wahrscheinlichkeit liegt nur bei ca. <strong>16.5%</strong>! Obwohl der Test sehr genau erscheint, führt die geringe Grundwahrscheinlichkeit der Krankheit dazu, dass die meisten positiven Ergebnisse &quot;falsch-positiv&quot; sind. Dies ist entscheidend für das Verständnis von medizinischen Screenings.</p>
    </div>
);
const meisterklasseInhalt4 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Unabhängigkeit vs. Disjunktheit</h3>
        <p>Diese beiden Begriffe werden oft verwechselt, bedeuten aber fast das Gegenteil:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Disjunkte (sich ausschliessende) Ereignisse:</strong> Können nicht gleichzeitig auftreten. Wenn A eintritt, kann B nicht eintreten. Wissen über A gibt uns perfekte Information über B (nämlich, dass es nicht passiert). Sie sind also <strong>maximal abhängig</strong>. Beispiel: Beim einmaligen Würfeln &quot;eine 1 würfeln&quot; und &quot;eine 6 würfeln&quot;.</li>
            <li><strong>Unabhängige Ereignisse:</strong> Das Eintreten von A hat keinerlei Einfluss auf die Wahrscheinlichkeit von B. Wissen über A gibt uns keine Information über B. Beispiel: Bei zwei Würfen &quot;beim ersten Wurf eine 6&quot; und &quot;beim zweiten Wurf eine 6&quot;.</li>
        </ul>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p>Wenn P(A) {'>'} 0 und P(B) {'>'} 0, dann können zwei Ereignisse nicht gleichzeitig unabhängig und disjunkt sein.</p></div>
    </div>
);
const uebungenData4: UebungenData = {
    quiz: [
        { q: "Beim Ziehen einer Karte aus einem 52er-Deck: Was ist die Wahrscheinlichkeit, ein Ass oder einen König zu ziehen?", a: ["4/52", "8/52", "1/52"], correct: 1 },
        { q: "Zwei Ereignisse A und B sind unabhängig. P(A) = 0.5, P(B) = 0.4. Was ist P(A und B)?", a: ["0.9", "0.1", "0.2"], correct: 2 },
    ],
    open: [
        { q: "Du wirfst zwei faire Würfel. Wie hoch ist die Wahrscheinlichkeit, dass die Augensumme genau 7 beträgt?", solution: "Der Ergebnisraum hat 36 Möglichkeiten. Die günstigen Ereignisse für die Summe 7 sind (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Das sind 6 Ereignisse. Die Wahrscheinlichkeit ist also 6/36 = 1/6." },
    ],
    kreativ: "Das 'Geburtstagsproblem': Wie viele Personen müssen in einem Raum sein, damit die Wahrscheinlichkeit, dass mindestens zwei am selben Tag Geburtstag haben, über 50% liegt? (Die Antwort ist überraschend niedrig!)"
};
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;

// --- INHALTE FÜR MODUL 5 ---
const grundwissenInhalt5 = (
  <div className="space-y-8">
    <p className="text-lg leading-relaxed">Eine Zufallsvariable ordnet den Ergebnissen eines Zufallsexperiments Zahlen zu. Verteilungen beschreiben, welche Werte eine Zufallsvariable annehmen kann und mit welchen Wahrscheinlichkeiten.</p>
    <h3 className="text-2xl font-semibold border-b pb-2">Diskrete Zufallsvariablen</h3>
    <p>Eine Variable, die nur eine zählbare Anzahl von Werten annehmen kann (z.B. 0, 1, 2, 3...).</p>
    <ul className="list-disc list-inside space-y-3 pl-2">
      <li><strong>Binomialverteilung:</strong> Beschreibt die Anzahl der Erfolge in einer festen Anzahl von unabhängigen Ja/Nein-Experimenten. Beispiel: Wie oft kommt &quot;Kopf&quot; bei 10 Münzwürfen?</li>
      <li><strong>Poisson-Verteilung:</strong> Beschreibt die Anzahl von Ereignissen in einem festen Intervall (Zeit oder Raum), wenn die Ereignisse selten und unabhängig sind. Beispiel: Anzahl der Anrufe in einem Callcenter pro Stunde.</li>
    </ul>
    <h3 className="text-2xl font-semibold border-b pb-2">Stetige Zufallsvariablen</h3>
    <p>Eine Variable, die jeden Wert innerhalb eines bestimmten Bereichs annehmen kann (z.B. Körpergrösse, Temperatur).</p>
    <ul className="list-disc list-inside space-y-3 pl-2">
      <li><strong>Gleichverteilung (Uniform):</strong> Jeder Wert in einem Intervall [a, b] ist gleich wahrscheinlich. Beispiel: Wartezeit auf einen Bus, der exakt alle 10 Minuten kommt.</li>
      <li><strong>Exponentialverteilung:</strong> Beschreibt die Zeit bis zum Eintreten eines Ereignisses. Beispiel: Lebensdauer einer Glühbirne.</li>
      <li><strong>Normalverteilung:</strong> Die wichtigste Verteilung in der Statistik, wird in Modul 6 detailliert behandelt.</li>
    </ul>
  </div>
);
const anwendbarkeitInhalt5 = (
  <div className="space-y-8">
    <p className="text-lg leading-relaxed">Ein Qualitätsmanager in einer Fabrik weiss, dass 2% der produzierten Teile defekt sind. Er entnimmt eine Stichprobe von 20 Teilen.</p>
    <p><strong>Frage:</strong> Wie hoch ist die Wahrscheinlichkeit, dass er genau ein defektes Teil findet?</p>
    <p><strong>Anwendung:</strong> Dies ist ein klassisches Beispiel für die <strong>Binomialverteilung</strong> (n=20 Versuche, Erfolgswahrscheinlichkeit p=0.02). Mit der Formel der Binomialverteilung kann er berechnen, dass die Wahrscheinlichkeit für genau einen &quot;Erfolg&quot; (ein defektes Teil) bei ca. 27.2% liegt. Dies hilft ihm, realistische Toleranzgrenzen für seine Stichprobenkontrollen festzulegen.</p>
  </div>
);
const meisterklasseInhalt5 = (
  <div className="space-y-8">
    <h3 className="text-2xl font-semibold border-b pb-2">Der Zusammenhang zwischen Poisson und Binomial</h3>
    <p>Die Poisson-Verteilung kann als eine Annäherung an die Binomialverteilung verstanden werden, wenn die Anzahl der Versuche (n) sehr gross und die Erfolgswahrscheinlichkeit (p) sehr klein ist. Dies war historisch nützlich, da die Berechnung der Poisson-Wahrscheinlichkeiten einfacher war. Heute ist es konzeptionell wichtig: Wenn du viele Gelegenheiten für ein seltenes Ereignis hast, kannst du dessen Häufigkeit oft gut mit der Poisson-Verteilung modellieren.</p>
    <h3 className="text-2xl font-semibold border-b pb-2">Erwartungswert und Varianz</h3>
    <p>Jede Wahrscheinlichkeitsverteilung hat einen Erwartungswert (den &quot;durchschnittlichen&quot; Wert, den man auf lange Sicht erwarten würde) und eine Varianz (ein Mass für die Streuung um diesen Erwartungswert). Diese theoretischen Kennzahlen sind die Grundlage für viele statistische Tests.</p>
  </div>
);
const uebungenData5: UebungenData = {
    quiz: [
        { q: "Die Anzahl der Tippfehler auf einer Buchseite wird am besten modelliert durch...", a: ["Binomialverteilung", "Poisson-Verteilung", "Gleichverteilung"], correct: 1 },
        { q: "Welche dieser Variablen ist stetig?", a: ["Anzahl der Geschwister", "Augenzahl beim Würfeln", "Körpergrösse in cm"], correct: 2 },
    ],
    open: [
        { q: "Ein Basketballspieler hat eine Freiwurfquote von 80%. Er wirft 3 Mal. Nenne den Ergebnisraum für die Anzahl der Treffer und begründe, welche Verteilung hier passt.", solution: "Ergebnisraum: {0, 1, 2, 3} Treffer. Es passt die Binomialverteilung, da wir eine feste Anzahl (n=3) von unabhängigen Versuchen mit zwei Ausgängen (Treffer/Fehlwurf) und einer konstanten Erfolgswahrscheinlichkeit (p=0.8) haben." },
    ],
    kreativ: "Beschreibe ein Alltagsphänomen, das du mit der Exponentialverteilung modellieren könntest, und erkläre warum."
};
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;

// --- INHALTE FÜR MODUL 6 ---
const grundwissenInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Normalverteilung, auch bekannt als &quot;Glockenkurve&quot; oder Gauss-Verteilung, ist die mit Abstand wichtigste Verteilung in der Statistik. Viele natürliche Phänomene, wie Körpergrösse, IQ-Werte oder Messfehler, folgen annähernd dieser Verteilung.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Eigenschaften der Normalverteilung</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Sie ist symmetrisch um ihren Mittelwert (μ).</li>
            <li>Mittelwert, Median und Modus sind identisch.</li>
            <li>Sie wird vollständig durch ihren Mittelwert (μ) und ihre Standardabweichung (σ) definiert.</li>
            <li>Die Gesamtfläche unter der Kurve beträgt 1 (oder 100%).</li>
        </ul>


        <div className="my-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
            <Image 
                src="/Average.png" 
                alt="Platzhalter-Grafik, die Mittelwert, Median und Modus in einer Verteilung zeigt" 
                width={600}
                height={300}
                className="mx-auto w-full max-w-lg rounded-lg" 
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Eine visuelle Darstellung der zentralen Lagemaße.</p>
        </div>
        
        <h3 className="text-2xl font-semibold border-b pb-2">Die Empirische Regel (68-95-99.7-Regel)</h3>
        <p>Für jede Normalverteilung gilt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Ca. <strong>68%</strong> aller Werte liegen innerhalb von einer Standardabweichung (σ) vom Mittelwert (μ).</li>
            <li>Ca. <strong>95%</strong> aller Werte liegen innerhalb von zwei Standardabweichungen (2σ) vom Mittelwert.</li>
            <li>Ca. <strong>99.7%</strong> aller Werte liegen innerhalb von drei Standardabweichungen (3σ) vom Mittelwert.</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p>
    <strong>Der Z-Wert (Standard-Score):</strong><br />
    Um verschiedene Normalverteilungen miteinander zu <strong>vergleichen</strong>, 
    standardisieren wir die Werte. Der Z-Wert zeigt an, 
    <strong>wie viele Standardabweichungen (σ)</strong> ein bestimmter Wert 
    <strong> X </strong> vom <strong>Mittelwert (μ)</strong> entfernt liegt.
  </p>
  <p className="mt-2">
    <strong>Formel:</strong><br />
    <code>Z = (X − μ) / σ</code>
  </p>
  <p className="mt-2">
    <strong>Bedeutung:</strong><br />
    – Wenn <code>Z = 0</code>, liegt der Wert <strong>genau im Mittelwert</strong>.<br />
    – Wenn <code>Z = +1</code>, liegt der Wert <strong>eine Standardabweichung über dem Mittelwert</strong>.<br />
    – Wenn <code>Z = −1</code>, liegt der Wert <strong>eine Standardabweichung darunter</strong>.
  </p>
        </div>
        </div>
);
const anwendbarkeitInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Angenommen, die IQ-Werte in einer Population sind normalverteilt mit einem Mittelwert (μ) von 100 und einer Standardabweichung (σ) von 15.</p>
        <p><strong>Frage:</strong> Welcher prozentuale Anteil der Bevölkerung hat einen IQ zwischen 85 und 115?</p>
        <p><strong>Anwendung:</strong> Die Werte 85 und 115 liegen genau eine Standardabweichung unter bzw. über dem Mittelwert (100 ± 15). Gemäss der <strong>Empirischen Regel</strong> wissen wir sofort, dass ca. <strong>68%</strong> der Bevölkerung in diesem Bereich liegen.</p>
        <p><strong>Frage 2:</strong> Ein Studierender hat einen IQ von 130. Wie aussergewöhnlich ist das?</p>
        <p><strong>Anwendung:</strong> Ein IQ von 130 liegt genau zwei Standardabweichungen über dem Mittelwert (100 + 2*15). Da 95% der Werte innerhalb von ±2σ liegen, wissen wir, dass nur 5% ausserhalb liegen. Aufgrund der Symmetrie liegen 2.5% im oberen und 2.5% im unteren Bereich. Diese Person gehört also zu den besten 2.5% der Bevölkerung.</p>
    </div>
);
const meisterklasseInhalt6 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Der Zentrale Grenzwertsatz (Central Limit Theorem)</h3>
        <p>Dies ist eines der mächtigsten Konzepte der Statistik. Er besagt: Wenn man aus einer beliebigen Population (egal wie diese verteilt ist) wiederholt ausreichend grosse Stichproben zieht und deren Mittelwerte berechnet, dann ist die Verteilung dieser <strong>Stichprobenmittelwerte</strong> annähernd normalverteilt.</p>
        <p><strong>Warum ist das so wichtig?</strong> Weil es uns erlaubt, die Normalverteilung und ihre Eigenschaften für statistische Tests zu nutzen, selbst wenn die ursprünglichen Daten nicht normalverteilt sind. Dies ist die theoretische Grundlage für fast alle Hypothesentests und Konfidenzintervalle, die wir in den nächsten Modulen behandeln werden.</p>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p>In der Praxis gilt eine Stichprobengrösse von n {'>'} 30 oft als &quot;ausreichend gross&quot;, damit der Zentrale Grenzwertsatz greift.</p></div>
    </div>
);
const uebungenData6: UebungenData = {
    quiz: [
        { q: "Wenn μ=50 und σ=10, in welchem Bereich liegen ca. 95% der Daten?", a: ["40-60", "30-70", "20-80"], correct: 1 },
        { q: "Ein Wert X=75 kommt aus einer Normalverteilung mit μ=60 und σ=5. Was ist der Z-Wert?", a: ["+2", "+3", "-3"], correct: 1 },
    ],
    open: [
        { q: "Die Körpergrösse von Männern sei normalverteilt mit μ=178cm und σ=7cm. Wie viel Prozent der Männer sind grösser als 192cm?", solution: "192cm ist genau 2 Standardabweichungen über dem Mittelwert (178 + 2*7). Laut der 95%-Regel liegen 5% ausserhalb von ±2σ. Wegen der Symmetrie sind 2.5% grösser als 192cm." },
    ],
    kreativ: "Warum ist der Zentrale Grenzwertsatz so etwas wie eine 'Superkraft' für Statistiker? Erkläre es in einer Analogie, die auch ein Nicht-Statistiker versteht."
};
const uebungenInhalt6 = <UebungenContent data={uebungenData6} />;

// --- INHALTE FÜR MODUL 7 ---
const grundwissenInhalt7 = (
  <div className="space-y-8">
    <p className="text-lg leading-relaxed">
      Eine einzelne Punktschätzung wie der Mittelwert einer Stichprobe trifft selten genau den wahren Mittelwert der
      gesamten Population. Statt nur einen Schätzwert anzugeben, verwenden wir ein
      <strong> Konfidenzintervall</strong>, um einen Bereich anzugeben, in dem der wahre Populationsparameter mit
      einer bestimmten Wahrscheinlichkeit liegt.
    </p>

    <h3 className="text-2xl font-semibold border-b pb-2">1. Aufbau eines Konfidenzintervalls</h3>
    <p>Die Grundformel lautet:</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-center font-mono">
      Punktschätzung ± Fehlermarge (Margin of Error)
    </div>

    <p>Die Fehlermarge setzt sich aus zwei Teilen zusammen:</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-center font-mono">
      (Kritischer Wert) × (Standardfehler der Schätzung)
    </div>

    <ul className="list-disc list-inside space-y-3 pl-2">
      <li>
        <strong>Punktschätzung:</strong> Der beste Schätzwert aus der Stichprobe, z.B. der Stichprobenmittelwert x̄.
      </li>
      <li>
        <strong>Kritischer Wert:</strong> Gibt an, wie weit wir in einer Standardverteilung gehen müssen, um das
        gewünschte Konfidenzniveau zu erreichen. Für 95% wird meist <strong>z = 1.96</strong> verwendet.
      </li>
      <li>
        <strong>Standardfehler (SE):</strong> Misst, wie stark der Stichprobenmittelwert von Stichprobe zu Stichprobe
        schwankt. Formel:
        <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-md font-mono text-center">
          SE = σ / √n
        </div>
        Dabei ist σ die Standardabweichung der Population und n die Stichprobengröße.
      </li>
    </ul>

    <h3 className="text-2xl font-semibold border-b pb-2">2. Beispiel</h3>
    <p>
      Angenommen, du ziehst eine Stichprobe von 100 Personen und misst deren Körpergröße. Der Mittelwert beträgt
      175 cm, die bekannte Populationsstandardabweichung ist 10 cm.
    </p>

    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg space-y-2 font-mono">
      <p>x̄ = 175</p>
      <p>σ = 10</p>
      <p>n = 100</p>
      <p>Konfidenzniveau = 95% → z = 1.96</p>
    </div>

    <p>Berechnung des Standardfehlers:</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-center">
      SE = 10 / √100 = 10 / 10 = 1
    </div>

    <p>Berechnung der Fehlermarge:</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-center">
      Margin of Error = 1.96 × 1 = 1.96
    </div>

    <p>Konfidenzintervall:</p>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-center">
      175 ± 1.96 → (173.04, 176.96)
    </div>

    <p>
      Wir sind also zu 95% sicher, dass der wahre Durchschnitt der Körpergröße in der Population zwischen 173.04 cm
      und 176.96 cm liegt.
    </p>

    <h3 className="text-2xl font-semibold border-b pb-2">3. Wichtige Hinweise</h3>
    <ul className="list-disc list-inside space-y-3 pl-2">
      <li>Je größer die Stichprobe, desto kleiner der Standardfehler und desto enger das Intervall.</li>
      <li>Ein höheres Konfidenzniveau (z.B. 99%) führt zu einem breiteren Intervall.</li>
      <li>Bei kleinen Stichproben (n &lt; 30) wird der t-Wert statt des z-Werts verwendet.</li>
    </ul>
  </div>
);


const anwendbarkeitInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">In einer Wahlumfrage gibt Kandidat A an, 52% der Stimmen zu erhalten. In den Fussnoten steht: &quot;Fehlermarge ±3%, Konfidenzniveau 95%&quot;.</p>
        <p><strong>Interpretation:</strong> Das Konfidenzintervall für den wahren Stimmenanteil von Kandidat A in der gesamten Wählerschaft liegt zwischen 49% (52%-3%) und 55% (52%+3%).</p>
        <p><strong>Was heisst das wirklich?</strong> Es bedeutet, dass wir zu 95% sicher sind, dass der wahre Stimmenanteil von Kandidat A irgendwo in diesem Bereich liegt. Wichtig ist: Da das Intervall auch Werte unter 50% enthält (nämlich 49%), können wir statistisch nicht sicher sein, dass Kandidat A die Wahl gewinnen wird. Das Rennen ist zu knapp, um es basierend auf dieser Umfrage zu entscheiden (&quot;statistical tie&quot;).</p>
    </div>
);
const meisterklasseInhalt7 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die häufigste Fehlinterpretation</h3>
        <p>Ein 95%-Konfidenzintervall bedeutet <strong>NICHT</strong>: &quot;Es besteht eine 95%ige Wahrscheinlichkeit, dass der wahre Populationsparameter in *diesem spezifischen* Intervall liegt.&quot; Der wahre Parameter ist ein fester Wert, er ist entweder drin oder nicht. Die Unsicherheit liegt in unserem Schätzverfahren.</p>
        <p><strong>Die korrekte Interpretation (im frequentistischen Sinne):</strong> &quot;Wenn wir dieses Umfrageverfahren 100 Mal wiederholen würden, würden 95 der 100 berechneten Konfidenzintervalle den wahren Populationsparameter enthalten.&quot;</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Was beeinflusst die Breite des Intervalls?</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Höheres Konfidenzniveau:</strong> Führt zu einem breiteren Intervall (mehr Sicherheit erfordert einen grösseren Bereich).</li>
            <li><strong>Grössere Stichprobe (n):</strong> Führt zu einem schmaleren Intervall (mehr Daten reduzieren die Unsicherheit).</li>
            <li><strong>Grössere Streuung in den Daten (σ):</strong> Führt zu einem breiteren Intervall.</li>
        </ul>
    </div>
);
const uebungenData7: UebungenData = {
    quiz: [
        { q: "Wenn wir das Konfidenzniveau von 95% auf 99% erhöhen, wird das Intervall...", a: ["schmaler", "breiter", "bleibt gleich"], correct: 1 },
        { q: "Um die Fehlermarge eines Konfidenzintervalls zu halbieren, müssen wir die Stichprobengrösse in etwa...", a: ["verdoppeln", "halbieren", "vervierfachen"], correct: 2 },
    ],
    open: [
        { q: "Ein Forscher berechnet ein 95%-Konfidenzintervall für die durchschnittliche Körpergrösse als [175cm, 185cm]. Ist die Aussage 'Es besteht eine 95% Wahrscheinlichkeit, dass die wahre durchschnittliche Körpergrösse zwischen 175cm und 185cm liegt' korrekt? Begründe.", solution: "Nein, die Aussage ist falsch. Sie impliziert, dass der wahre Wert variabel ist. Korrekt wäre: 'Wir sind zu 95% zuversichtlich, dass das Verfahren, mit dem wir dieses Intervall berechnet haben, den wahren Mittelwert einfängt.'" },
    ],
    kreativ: "Du bist ein Journalist. Erkläre einem Laienpublikum in einem kurzen Absatz den Unterschied zwischen einer Punktschätzung und einem Konfidenzintervall am Beispiel einer Wettervorhersage."
};
const uebungenInhalt7 = <UebungenContent data={uebungenData7} />;

// --- INHALTE FÜR MODUL 8 ---
const grundwissenInhalt8 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Hypothesentests sind das formale Verfahren, um zu entscheiden, ob die Daten einer Stichprobe genügend Beweise liefern, um eine Behauptung über die gesamte Population zu stützen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die vier Schritte eines Hypothesentests</h3>
        <ol className="list-decimal list-inside space-y-4 pl-2">
            <li><strong>Hypothesen formulieren:</strong>
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li><strong>Nullhypothese (H₀):</strong> Die &quot;Status quo&quot;-Annahme. Behauptet, dass es keinen Effekt, keinen Unterschied oder keinen Zusammenhang gibt. Enthält immer ein Gleichheitszeichen (=, ≤, ≥).</li>
                    <li><strong>Alternativhypothese (H₁ oder Hₐ):</strong> Die Behauptung des Forschers. Was wir beweisen wollen (z.B. es gibt einen Effekt). Enthält nie ein Gleichheitszeichen.</li>
                </ul>
            </li>
            <li><strong>Teststatistik berechnen:</strong> Ein Wert (z.B. ein Z-Wert oder t-Wert), der misst, wie weit unsere Stichprobendaten von dem abweichen, was wir unter der Annahme der Nullhypothese erwarten würden.</li>
            <li><strong>p-Wert bestimmen:</strong> Die Wahrscheinlichkeit, ein so extremes (oder extremeres) Ergebnis wie in unserer Stichprobe zu beobachten, *unter der Annahme, dass die Nullhypothese wahr ist*.</li>
            <li><strong>Schlussfolgerung ziehen:</strong> Wir vergleichen den p-Wert mit einem vorher festgelegten Signifikanzniveau (a, meist 0.05).
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li>Wenn <strong>p ≤ a</strong>: Wir verwerfen die Nullhypothese. Das Ergebnis ist &quot;statistisch signifikant&quot;.</li>
                    <li>Wenn <strong>p {'>'} a</strong>: Wir verwerfen die Nullhypothese nicht. Das Ergebnis ist &quot;nicht statistisch signifikant&quot;.</li>
                </ul>
            </li>
        </ol>
    </div>
);
const anwendbarkeitInhalt8 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Pharmaunternehmen entwickelt ein neues Medikament, das den Blutdruck senken soll. Sie führen eine klinische Studie durch.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>H₀:</strong> Das Medikament hat keine Wirkung auf den Blutdruck (durchschnittliche Senkung = 0).</li>
            <li><strong>H₁:</strong> Das Medikament senkt den Blutdruck (durchschnittliche Senkung {'>'} 0).</li>
        </ul>
        <p>Nach der Studie mit einer Stichprobe von Patienten berechnen sie eine Teststatistik und finden einen <strong>p-Wert von 0.02</strong>. Sie hatten ein Signifikanzniveau von α = 0.05 festgelegt.</p>
        <p><strong>Schlussfolgerung:</strong> Da der p-Wert (0.02) kleiner ist als das Signifikanzniveau (0.05), verwerfen sie die Nullhypothese. Sie haben statistisch signifikante Beweise dafür gefunden, dass das Medikament den Blutdruck tatsächlich senkt. Diese Schlussfolgerung ist entscheidend für die Zulassung des Medikaments.</p>
    </div>
);
const meisterklasseInhalt8 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die wahre Bedeutung des p-Wertes</h3>
        <p>Der p-Wert ist das am häufigsten missverstandene Konzept in der Statistik. Er ist <strong>NICHT</strong> die Wahrscheinlichkeit, dass die Nullhypothese wahr ist.</p>
        <p>Ein kleiner p-Wert (z.B. 0.02) bedeutet: &quot;Wenn das Medikament *in Wahrheit* keine Wirkung hätte (H₀ ist wahr), dann wäre es extrem unwahrscheinlich (nur 2% Chance), dass wir durch reinen Zufall eine so starke Blutdrucksenkung in unserer Stichprobe beobachten.&quot; Weil dieses Ergebnis so unwahrscheinlich unter der Annahme der H₀ ist, entscheiden wir uns, die H₀ zu verwerfen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Typ-I- und Typ-II-Fehler</h3>
        <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-100 dark:bg-slate-800"><th className="p-3 font-semibold border-b dark:border-slate-700">Entscheidung</th><th className="p-3 font-semibold border-b dark:border-slate-700">Realität: H₀ ist wahr</th><th className="p-3 font-semibold border-b dark:border-slate-700">Realität: H₀ ist falsch</th></tr></thead><tbody><tr className="border-b dark:border-slate-700"><td className="p-3">H₀ verwerfen</td><td className="p-3 bg-red-50 dark:bg-red-900/30"><strong>Typ-I-Fehler (α)</strong><br/>(Falscher Alarm)</td><td className="p-3 bg-green-50 dark:bg-green-900/30">Korrekte Entscheidung<br/>(Power)</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3">H₀ nicht verwerfen</td><td className="p-3 bg-green-50 dark:bg-green-900/30">Korrekte Entscheidung</td><td className="p-3 bg-red-50 dark:bg-red-900/30"><strong>Typ-II-Fehler (β)</strong><br/>(Verpasster Effekt)</td></tr></tbody></table></div>
        <p>Das Signifikanzniveau α ist die Wahrscheinlichkeit, einen Typ-I-Fehler zu begehen. Die <strong>Power (1-β)</strong> eines Tests ist die Fähigkeit, einen echten Effekt zu finden, wenn er existiert. Dies ist in der Studienplanung extrem wichtig.</p>
    </div>
);
const uebungenData8: UebungenData = {
    quiz: [
        { q: "Ein p-Wert von 0.04 bei einem α von 0.05 bedeutet...", a: ["Das Ergebnis ist nicht signifikant.", "Wir verwerfen die Nullhypothese.", "Die Alternativhypothese ist falsch."], correct: 1 },
        { q: "Die Nullhypothese (H₀) enthält immer...", a: ["ein Ungleichheitszeichen (≠)", "ein Gleichheitszeichen (=, ≤, ≥)", "ein Kleiner-als-Zeichen (<)"], correct: 1 },
    ],
    open: [
        { q: "Ein Forscher findet ein nicht-signifikantes Ergebnis (p > 0.05). Darf er schlussfolgern, dass er bewiesen hat, dass die Nullhypothese wahr ist?", solution: "Nein, auf keinen Fall. 'Das Nicht-Verwerfen der H₀' bedeutet nicht, dass man sie 'akzeptiert' oder als wahr bewiesen hat. Es bedeutet nur, dass man nicht genügend Beweise gefunden hat, um sie zu verwerfen. 'Absence of evidence is not evidence of absence'." },
    ],
    kreativ: "Erkläre den Unterschied zwischen statistischer Signifikanz und praktischer Relevanz. Kann ein Ergebnis hoch signifikant (sehr kleiner p-Wert), aber praktisch bedeutungslos sein? Gib ein Beispiel."
};
const uebungenInhalt8 = <UebungenContent data={uebungenData8} />;

// --- INHALTE FÜR MODUL 9 ---
const grundwissenInhalt9 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Bisher haben wir uns hauptsächlich mit numerischen Daten beschäftigt. Der Chi-Quadrat-Test (χ²) ist ein mächtiges Werkzeug, um Zusammenhänge zwischen **kategorialen** Variablen zu analysieren. Er vergleicht die beobachteten Häufigkeiten in den Kategorien mit den Häufigkeiten, die wir unter der Annahme der Nullhypothese (kein Zusammenhang) erwarten würden.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Zwei Hauptanwendungen</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Test auf Anpassungsgüte (Goodness-of-Fit):</strong> Überprüft, ob die beobachteten Häufigkeiten einer einzelnen kategorialen Variable einer erwarteten Verteilung entsprechen. (Beispiel: Entsprechen die Verkaufszahlen von vier Produkten den erwarteten Marktanteilen?).</li>
            <li><strong>Test auf Unabhängigkeit (Test of Independence):</strong> Überprüft, ob zwischen zwei kategorialen Variablen ein statistisch signifikanter Zusammenhang besteht. (Beispiel: Hängt die Wahl des Lieblings-Filmgenres vom Geschlecht ab?).</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Logik des Tests</h3>
        <p>Für jede Zelle in einer Häufigkeitstabelle berechnet der Test die Differenz zwischen der beobachteten (O) und der erwarteten (E) Häufigkeit, quadriert diese und gewichtet sie an der erwarteten Häufigkeit: (O - E)² / E. Die Summe dieser Werte über alle Zellen ergibt die χ²-Teststatistik. Je grösser dieser Wert, desto stärker weichen die Beobachtungen von der Erwartung (der Nullhypothese) ab.</p>
    </div>
);
const anwendbarkeitInhalt9 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Marketing-Team führt eine Umfrage durch, um herauszufinden, ob es einen Zusammenhang zwischen der bevorzugten Social-Media-Plattform (Facebook, Instagram, TikTok) und der Altersgruppe (18-29, 30-49, 50+) gibt.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>H₀:</strong> Die Wahl der Plattform ist **unabhängig** von der Altersgruppe.</li>
            <li><strong>H₁:</strong> Es gibt einen **Zusammenhang** zwischen Plattformwahl und Altersgruppe.</li>
        </ul>
        <p>Sie erstellen eine Kreuztabelle (Kontingenztabelle) mit den beobachteten Häufigkeiten und führen einen Chi-Quadrat-Test auf Unabhängigkeit durch. Der resultierende p-Wert ist 0.001.</p>
        <p><strong>Schlussfolgerung:</strong> Da p {'<'} 0.05, wird die Nullhypothese verworfen. Es gibt einen statistisch signifikanten Zusammenhang. Das Marketing-Team kann nun gezieltere Werbekampagnen erstellen: TikTok-Anzeigen für die jüngere Zielgruppe, Facebook für die ältere.</p>
    </div>
);
const meisterklasseInhalt9 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Voraussetzungen und Grenzen</h3>
        <p>Der Chi-Quadrat-Test ist nicht immer anwendbar. Die wichtigste Voraussetzung ist die <strong>erwartete Häufigkeit</strong>: In jeder Zelle der Tabelle sollte die erwartete Häufigkeit (E) mindestens 5 betragen. Wenn diese Bedingung verletzt ist (besonders bei kleinen Stichproben), verliert der Test an Gültigkeit und man muss auf exakte Tests (wie den Fisher&apos;s Exact Test) ausweichen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Signifikanz vs. Effektstärke</h3>
        <p>Ein signifikanter Chi-Quadrat-Test sagt uns nur, **dass** ein Zusammenhang besteht, aber nicht, **wie stark** dieser ist. Bei sehr grossen Stichproben können auch trivial kleine Zusammenhänge statistisch signifikant werden. Deshalb sollte man immer zusätzlich ein Mass für die Effektstärke berechnen, wie z.B. <strong>Cramer&apos;s V</strong>. Cramer&apos;s V ist ein Wert zwischen 0 (kein Zusammenhang) und 1 (perfekter Zusammenhang) und erlaubt eine bessere Einordnung der praktischen Relevanz des gefundenen Zusammenhangs.</p>
    </div>
);
const uebungenData9: UebungenData = {
    quiz: [
        { q: "Der Chi-Quadrat-Test wird verwendet für...", a: ["den Vergleich von Mittelwerten", "die Analyse von Zusammenhängen kategorialer Variablen", "die Vorhersage eines numerischen Wertes"], correct: 1 },
        { q: "Eine wichtige Voraussetzung für den Chi-Quadrat-Test ist, dass...", a: ["die Daten normalverteilt sind", "die erwarteten Häufigkeiten in jeder Zelle ≥ 5 sind", "die Stichprobe klein ist"], correct: 1 },
    ],
    open: [
        { q: "Ein signifikanter Chi-Quadrat-Test zeigt einen Zusammenhang zwischen Wohnort (Stadt/Land) und Autotyp (SUV/Limousine). Was genau sagt dir dieses Ergebnis – und was nicht?", solution: "Das Ergebnis sagt uns, dass die Wahl des Autotyps nicht unabhängig vom Wohnort ist. Es sagt uns aber NICHT, welche Gruppe welchen Autotyp bevorzugt oder wie stark dieser Zusammenhang ist. Dafür müsste man die prozentualen Anteile in der Kreuztabelle analysieren und eine Effektstärke wie Cramer's V berechnen." },
    ],
    kreativ: "Entwirf eine fiktive Studie mit zwei kategorialen Variablen aus dem Bereich der Psychologie, die du mit einem Chi-Quadrat-Test auf Unabhängigkeit prüfen könntest. Formuliere H₀ und H₁."
};
const uebungenInhalt9 = <UebungenContent data={uebungenData9} />;

// --- INHALTE FÜR MODUL 10 ---
const grundwissenInhalt10 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Korrelation und Regression sind zentrale Werkzeuge, um den Zusammenhang zwischen zwei **quantitativen (numerischen)** Variablen zu analysieren und Vorhersagen zu treffen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Korrelation: Richtung und Stärke des Zusammenhangs</h3>
        <p>Der <strong>Korrelationskoeffizient (r)</strong> ist eine Zahl zwischen -1 und +1, die zwei Dinge beschreibt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Richtung:</strong> Ein positives Vorzeichen (+) bedeutet, dass hohe Werte bei Variable A mit hohen Werten bei Variable B einhergehen. Ein negatives Vorzeichen (-) bedeutet einen gegenläufigen Zusammenhang.</li>
            <li><strong>Stärke:</strong> Der Betrag von r (der Wert ohne Vorzeichen) gibt die Stärke des *linearen* Zusammenhangs an. Werte nahe 1 oder -1 deuten auf einen starken, Werte nahe 0 auf einen schwachen oder keinen linearen Zusammenhang hin.</li>
        </ul>
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg"><p><strong>Wichtig:</strong> Korrelation impliziert keine Kausalität! (Siehe Modul 2).</p></div>
        <h3 className="text-2xl font-semibold border-b pb-2">Lineare Regression: Vorhersagen treffen</h3>
        <p>Während die Korrelation den Zusammenhang nur beschreibt, geht die Regression einen Schritt weiter: Sie versucht, eine Variable (die abhängige Variable, Y) durch eine andere (die unabhängige Variable, X) vorherzusagen. Das Modell ist eine Geradengleichung:</p>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-center font-mono">
            Ŷ = b₀ + b₁X
        </div>
        <p>Dabei ist Ŷ der vorhergesagte Wert, b₀ der Y-Achsenabschnitt und b₁ die Steigung (zeigt an, um wie viel sich Y ändert, wenn X um eine Einheit steigt).</p>
    </div>
);
const anwendbarkeitInhalt10 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Unternehmen analysiert den Zusammenhang zwischen seinen monatlichen Werbeausgaben (in CHF 1000) und dem monatlichen Umsatz (in CHF 10&apos;000).</p>
        <p><strong>Analyse:</strong> Sie finden einen starken positiven Korrelationskoeffizienten von <strong>r = 0.85</strong>. Das bestätigt, dass mehr Werbeausgaben tendenziell mit mehr Umsatz einhergehen.</p>
        <p><strong>Regression:</strong> Sie berechnen ein Regressionsmodell und erhalten die Gleichung: <strong>Umsatz = 3.5 + 2.1 * Werbeausgaben</strong>.</p>
        <p><strong>Anwendung:</strong> Das Management plant, im nächsten Monat 10&apos;000 CHF für Werbung auszugeben (X = 10). Sie können nun eine Vorhersage treffen: Ŷ = 3.5 + 2.1 * 10 = 24.5. Der erwartete Umsatz beträgt also 245&apos;000 CHF. Diese Vorhersage hilft bei der Budgetplanung und Zielsetzung.</p>
    </div>
);
const meisterklasseInhalt10 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Das Bestimmtheitsmass (R²)</h3>
        <p>Das Bestimmtheitsmass, R-Quadrat (R²), ist einfach das Quadrat des Korrelationskoeffizienten (r²). Es gibt an, wie viel Prozent der Varianz in der abhängigen Variable (Y) durch die unabhängige Variable (X) &quot;erklärt&quot; werden kann.</p>
        <p>In unserem Beispiel (r=0.85) wäre R² = 0.85² ≈ 0.72. Das bedeutet: <strong>72% der Schwankungen im monatlichen Umsatz können durch die Schwankungen der Werbeausgaben erklärt werden.</strong> Die restlichen 28% sind auf andere, nicht im Modell berücksichtigte Faktoren zurückzuführen (z.B. Saison, Konkurrenz).</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Residuenanalyse</h3>
        <p>Ein Residuum ist die Differenz zwischen dem beobachteten Wert und dem vom Modell vorhergesagten Wert (Y - Ŷ). Die Analyse der Residuen ist entscheidend, um die Güte eines Regressionsmodells zu beurteilen. Wenn das Modell gut ist, sollten die Residuen zufällig um Null streuen und kein erkennbares Muster aufweisen. Erkennbare Muster in den Residuen deuten darauf hin, dass der angenommene lineare Zusammenhang nicht die ganze Geschichte erzählt.</p>
    </div>
);
const uebungenData10: UebungenData = {
    quiz: [
        { q: "Ein Korrelationskoeffizient von r = -0.9 deutet auf einen...", a: ["schwachen negativen Zusammenhang", "starken positiven Zusammenhang", "starken negativen Zusammenhang"], correct: 2 },
        { q: "In der Gleichung Ŷ = 10 + 5X, was passiert mit Ŷ, wenn X um 2 Einheiten steigt?", a: ["Es steigt um 5", "Es steigt um 10", "Es steigt um 20"], correct: 1 },
    ],
    open: [
        { q: "Ein Forscher findet eine Korrelation von r = 0.6 zwischen Lernzeit und Prüfungsergebnis. Das R² ist also 0.36. Interpretiere diesen R²-Wert im Kontext.", solution: "36% der Varianz (der Unterschiede) in den Prüfungsergebnissen der Studierenden können durch die unterschiedliche Lernzeit erklärt werden. Die restlichen 64% sind auf andere Faktoren (Intelligenz, Vorkenntnisse, Prüfungsangst etc.) zurückzuführen." },
    ],
    kreativ: "Finde ein Beispiel für eine starke Korrelation zwischen zwei Variablen, bei der die Kausalität aber offensichtlich in die 'falsche' Richtung läuft oder von einer dritten Variable abhängt."
};
const uebungenInhalt10 = <UebungenContent data={uebungenData10} />;

// --- INHALTE FÜR MODUL 11 ---
const grundwissenInhalt11 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Was tun, wenn wir die Mittelwerte von **mehr als zwei** Gruppen vergleichen wollen? Man könnte versucht sein, einfach viele einzelne t-Tests durchzuführen, aber das würde die Wahrscheinlichkeit für einen Typ-I-Fehler drastisch erhöhen. Die Lösung ist die **Varianzanalyse (ANOVA)**.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Kernidee der ANOVA</h3>
        <p>Die ANOVA vergleicht die Varianz **zwischen** den Gruppen mit der Varianz **innerhalb** der Gruppen. Die Logik ist:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Wenn die Unterschiede zwischen den Gruppenmittelwerten gross sind (im Vergleich zur natürlichen Streuung innerhalb jeder Gruppe), dann gibt es wahrscheinlich einen echten Effekt der Gruppenzugehörigkeit.</li>
            <li>Wenn die Streuung innerhalb der Gruppen so gross ist, dass sie die Unterschiede zwischen den Gruppen &quot;überschattet&quot;, dann sind die beobachteten Mittelwertsunterschiede wahrscheinlich nur Zufall.</li>
        </ul>
        <p>Das Ergebnis ist die <strong>F-Statistik</strong>: das Verhältnis von &quot;Varianz zwischen den Gruppen&quot; zu &quot;Varianz innerhalb der Gruppen&quot;. Ein grosser F-Wert (und ein kleiner p-Wert) deutet darauf hin, dass sich mindestens zwei der Gruppenmittelwerte signifikant unterscheiden.</p>
    </div>
);
const anwendbarkeitInhalt11 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Eine Psychologin möchte testen, ob drei verschiedene Therapieformen (A, B, C) unterschiedlich wirksam bei der Reduzierung von Angstsymptomen sind. Sie teilt ihre Patienten zufällig in drei Gruppen ein.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>H₀:</strong> Die mittleren Angstwerte sind in allen drei Therapiegruppen gleich (μₐ = μₑ = μₒ).</li>
            <li><strong>H₁:</strong> Mindestens zwei der mittleren Angstwerte unterscheiden sich.</li>
        </ul>
        <p>Sie führt eine ANOVA durch und erhält ein signifikantes Ergebnis (z.B. p = 0.01). </p>
        <p><strong>Schlussfolgerung:</strong> Das signifikante Ergebnis der ANOVA sagt ihr, **dass** es einen Unterschied zwischen den Therapien gibt. Es sagt ihr aber **nicht, welche** Therapie besser ist als welche andere. Ist A besser als C? Ist B besser als A und C? Um das herauszufinden, muss sie im nächsten Schritt <strong>Post-Hoc-Tests</strong> durchführen.</p>
    </div>
);
const meisterklasseInhalt11 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Post-Hoc-Tests: Wo liegt der Unterschied?</h3>
        <p>Nach einer signifikanten ANOVA sind Post-Hoc-Tests (wie der Tukey-Test oder Bonferroni-Korrektur) zwingend erforderlich, um paarweise Vergleiche zwischen allen Gruppen durchzuführen (A vs. B, A vs. C, B vs. C). Diese Tests sind so konzipiert, dass sie für die multiples Testen (&quot;multiple comparisons&quot;) korrigieren und so die Gesamt-Typ-I-Fehlerrate auf dem gewünschten Niveau (z.B. α = 0.05) halten.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Voraussetzungen der ANOVA</h3>
        <p>Die ANOVA hat drei wichtige Voraussetzungen:</p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Unabhängigkeit der Beobachtungen:</strong> Die Stichproben der Gruppen müssen unabhängig voneinander sein.</li>
            <li><strong>Normalverteilung:</strong> Die Daten innerhalb jeder Gruppe sollten annähernd normalverteilt sein.</li>
            <li><strong>Varianzhomogenität:</strong> Die Varianzen der Gruppen sollten ungefähr gleich sein (Homoskedastizität).</li>
        </ol>
        <p>Die ANOVA ist relativ robust gegenüber Verletzungen der Normalverteilungsannahme (wegen des Zentralen Grenzwertsatzes), reagiert aber empfindlicher auf eine Verletzung der Varianzhomogenität.</p>
    </div>
);
const uebungenData11: UebungenData = {
    quiz: [
        { q: "Wann sollte eine ANOVA anstelle mehrerer t-Tests verwendet werden?", a: ["Wenn man zwei Gruppen vergleicht", "Wenn man drei oder mehr Gruppen vergleicht", "Wenn die Daten nicht normalverteilt sind"], correct: 1 },
        { q: "Ein signifikantes Ergebnis in einer ANOVA mit 4 Gruppen sagt uns...", a: ["dass alle 4 Gruppen sich voneinander unterscheiden.", "dass Gruppe 1 sich von Gruppe 4 unterscheidet.", "dass mindestens zwei Gruppenmittelwerte sich unterscheiden."], correct: 2 },
    ],
    open: [
        { q: "Warum ist es problematisch, einfach mehrere t-Tests statt einer ANOVA durchzuführen, wenn man 5 Gruppen vergleicht?", solution: "Bei 5 Gruppen müsste man 10 einzelne t-Tests durchführen. Bei jedem Test hat man eine 5%ige Chance auf einen Typ-I-Fehler (falsch-positiv). Durch die vielen Tests steigt die kumulierte Wahrscheinlichkeit, mindestens einen Typ-I-Fehler zu begehen, dramatisch an (auf ca. 40%). Die ANOVA testet die Gesamt-Hypothese mit nur einem Test und hält die Fehlerrate bei 5%." },
    ],
    kreativ: "Du vergleichst die Wirksamkeit von 4 verschiedenen Düngemitteln auf das Pflanzenwachstum. Nach einer signifikanten ANOVA, was könnte ein Post-Hoc-Test ergeben, das für einen Gärtner praktisch relevant wäre?"
};
const uebungenInhalt11 = <UebungenContent data={uebungenData11} />;

// --- INHALTE FÜR MODUL 12 ---
const grundwissenInhalt12 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die multiple lineare Regression ist eine Erweiterung der einfachen linearen Regression. Statt nur einer unabhängigen Variable (X) verwenden wir nun **mehrere** unabhängige Variablen (X₁, X₂, X₃, ...), um eine abhängige Variable (Y) vorherzusagen. Dies erlaubt uns, komplexere und realistischere Modelle zu erstellen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Modellgleichung</h3>
        <p>Das Modell erweitert sich logisch von der Geradengleichung zu einer Hyperebene:</p>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-center font-mono">
            Ŷ = b₀ + b₁X₁ + b₂X₂ + ... + bₙXₙ
        </div>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Ŷ:</strong> Der vorhergesagte Wert der abhängigen Variable.</li>
            <li><strong>b₀:</strong> Der Y-Achsenabschnitt (der Wert von Y, wenn alle X-Variablen null sind).</li>
            <li><strong>b₁, b₂, ...:</strong> Die Regressionskoeffizienten. Jeder Koeffizient (z.B. b₁) gibt an, um wie viel sich Ŷ ändert, wenn X₁ um eine Einheit steigt, *während alle anderen X-Variablen konstant gehalten werden*.</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p><strong>Schlüsselkonzept:</strong> Die multiple Regression isoliert den einzigartigen Beitrag jeder einzelnen unabhängigen Variable, indem sie den Einfluss der anderen Variablen &quot;kontrolliert&quot; oder &quot;herausrechnet&quot;.</p></div>
    </div>
);
const anwendbarkeitInhalt12 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Immobilienmakler möchte den Preis (Y) eines Hauses vorhersagen. Er sammelt Daten zu drei Variablen:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>X₁:</strong> Wohnfläche in m²</li>
            <li><strong>X₂:</strong> Alter des Hauses in Jahren</li>
            <li><strong>X₃:</strong> Entfernung zum Stadtzentrum in km</li>
        </ul>
        <p>Nach der Analyse erhält er die Regressionsgleichung: <strong>Preis = 50000 + 1500*X₁ - 2000*X₂ - 3000*X₃</strong></p>
        <p><strong>Interpretation der Koeffizienten:</strong></p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>b₁ = 1500:</strong> Jeder zusätzliche Quadratmeter Wohnfläche erhöht den vorhergesagten Preis um 1500 CHF, bei gleichem Alter und gleicher Entfernung zum Zentrum.</li>
            <li><strong>b₂ = -2000:</strong> Jedes zusätzliche Jahr Alter senkt den Preis um 2000 CHF, bei gleicher Wohnfläche und Entfernung.</li>
            <li><strong>b₃ = -3000:</strong> Jeder zusätzliche Kilometer Entfernung zum Zentrum senkt den Preis um 3000 CHF, bei gleicher Fläche und gleichem Alter.</li>
        </ul>
        <p>Mit diesem Modell kann der Makler nun für ein neues Haus mit bekannten Eigenschaften einen fundierten Preis schätzen.</p>
    </div>
);
const meisterklasseInhalt12 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Das Problem der Multikollinearität</h3>
        <p>Multikollinearität tritt auf, wenn zwei oder mehr unabhängige Variablen im Modell stark miteinander korrelieren. Beispiel: Wenn wir &quot;Körpergrösse in cm&quot; und &quot;Körpergrösse in Zoll&quot; beide ins Modell aufnehmen würden.</p>
        <p><strong>Warum ist das ein Problem?</strong> Wenn X₁ und X₂ stark korrelieren, kann das Modell nicht mehr zuverlässig den *einzigartigen* Beitrag jeder einzelnen Variable schätzen. Die Koeffizienten (b₁ und b₂) werden sehr instabil und ihre p-Werte sind nicht mehr vertrauenswürdig. Das Gesamtmodell mag zwar noch gute Vorhersagen treffen, aber die Interpretation der einzelnen Koeffizienten wird unmöglich.</p>
        <p>Man kann Multikollinearität mit dem <strong>Varianz-Inflations-Faktor (VIF)</strong> aufdecken. Ein VIF-Wert über 5 oder 10 für eine Variable gilt oft als problematisch und man sollte überlegen, eine der korrelierenden Variablen aus dem Modell zu entfernen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Adjustiertes R-Quadrat</h3>
        <p>In der multiplen Regression fügt das Hinzufügen jeder neuen Variable, egal wie nutzlos sie ist, das R² immer leicht erhöhen. Das <strong>adjustierte R²</strong> korrigiert für die Anzahl der Variablen im Modell und steigt nur an, wenn eine neue Variable das Modell tatsächlich verbessert. Es ist daher das bessere Mass zur Beurteilung der Modellgüte.</p>
    </div>
);
const uebungenData12: UebungenData = {
    quiz: [
        { q: "Was beschreibt der Koeffizient b₁ in einer multiplen Regression?", a: ["Den Gesamteffekt aller Variablen", "Den Effekt von X₁, während alle anderen Variablen konstant gehalten werden", "Die Korrelation zwischen X₁ und Y"], correct: 1 },
        { q: "Multikollinearität ist ein Problem, weil...", a: ["es die Vorhersagekraft des Modells zerstört", "es die Interpretation der einzelnen Koeffizienten unzuverlässig macht", "es das R-Quadrat senkt"], correct: 1 },
    ],
    open: [
        { q: "Ein Forscher modelliert das Gehalt (Y) mit den Variablen 'Jahre an Berufserfahrung' (X₁) und 'Alter' (X₂). Warum könnte hier Multikollinearität ein Problem sein?", solution: "Alter und Berufserfahrung sind typischerweise stark positiv korreliert. Ältere Menschen haben tendenziell mehr Berufserfahrung. Das Modell wird Schwierigkeiten haben, den einzigartigen Einfluss des Alters vom Einfluss der Erfahrung zu trennen, was zu instabilen Koeffizienten führt." },
    ],
    kreativ: "Du willst den Erfolg eines YouTube-Videos (gemessen in Views) vorhersagen. Nenne mindestens vier unabhängige Variablen (X), die du in ein multiples Regressionsmodell aufnehmen würdest."
};
const uebungenInhalt12 = <UebungenContent data={uebungenData12} />;

// --- INHALTE FÜR MODUL 13 ---
const grundwissenInhalt13 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Was, wenn unsere abhängige Variable (Y) nicht numerisch, sondern kategorial ist, insbesondere wenn sie nur zwei Ausgänge hat (Ja/Nein, Erfolg/Misserfolg, Krank/Gesund)? Hier stösst die lineare Regression an ihre Grenzen. Die **logistische Regression** ist die Standardmethode für diese Art von Klassifikationsproblemen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Logit-Transformation</h3>
        <p>Die logistische Regression modelliert nicht den Wert von Y direkt, sondern die **Wahrscheinlichkeit**, dass Y den Wert 1 annimmt (z.B. P(Y=1)). Da Wahrscheinlichkeiten zwischen 0 und 1 liegen, verwendet das Modell eine spezielle Transformation, die Sigmoid- oder Logit-Funktion, um den linearen Teil (b₀ + b₁X₁ + ...) in diesen Bereich zu &quot;quetschen&quot;.</p>
        <p>Das Ergebnis ist eine S-förmige Kurve. Anstatt einer direkten Vorhersage (&quot;der Wert ist 5.3&quot;) erhalten wir eine Wahrscheinlichkeitsvorhersage (&quot;die Wahrscheinlichkeit für &apos;Ja&apos; ist 75%&quot;).</p>
    </div>
);
const anwendbarkeitInhalt13 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Eine Bank möchte vorhersagen, ob ein Kreditantragsteller seinen Kredit zurückzahlen wird (Y=1) oder nicht (Y=0). Sie verwenden als unabhängige Variablen das Jahreseinkommen (X₁) und den Kredit-Score (X₂).</p>
        <p><strong>Anwendung:</strong> Das logistische Regressionsmodell gibt für einen neuen Antragsteller eine Wahrscheinlichkeit aus, z.B. P(Y=1) = 0.85.</p>
        <p><strong>Entscheidungsregel:</strong> Die Bank legt einen Schwellenwert (Threshold) fest, z.B. 0.5. Wenn die vorhergesagte Wahrscheinlichkeit über 0.5 liegt, wird der Kredit genehmigt. Liegt sie darunter, wird er abgelehnt. In diesem Fall (85% Wahrscheinlichkeit der Rückzahlung) würde der Kredit genehmigt.</p>
        <p>Dieses Vorgehen, bekannt als **Kreditrisiko-Scoring**, ist eine der fundamentalsten Anwendungen der logistischen Regression in der Finanzwelt und automatisiert Millionen von Entscheidungen pro Tag.</p>
    </div>
);
const meisterklasseInhalt13 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Interpretation der Koeffizienten: Odds Ratios</h3>
        <p>Die Koeffizienten einer logistischen Regression sind nicht direkt als &quot;Anstieg pro Einheit&quot; interpretierbar. Stattdessen werden sie in **Odds Ratios (Chancenverhältnisse)** umgewandelt, indem man sie exponiert (eᵇ¹).</p>
        <p>Ein Odds Ratio von 1.5 für die Variable &quot;Raucher&quot; (im Vergleich zu Nichtrauchern) bedeutet: &quot;Raucher haben eine 1.5-mal so hohe *Chance* (nicht Wahrscheinlichkeit!), die Krankheit zu entwickeln, wie Nichtraucher, unter Konstanthaltung aller anderen Variablen.&quot; Ein Odds Ratio unter 1 bedeutet ein reduziertes Risiko.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Modellgüte: Confusion Matrix und ROC-Kurve</h3>
        <p>Anstelle von R² verwenden wir zur Beurteilung von Klassifikationsmodellen andere Metriken:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Confusion Matrix:</strong> Eine Tabelle, die zeigt, wie viele Vorhersagen richtig positiv, richtig negativ, falsch positiv und falsch negativ waren. Daraus leiten sich Kennzahlen wie Genauigkeit, Sensitivität und Spezifität ab.</li>
            <li><strong>ROC-Kurve (Receiver Operating Characteristic):</strong> Eine Grafik, die die Leistung eines Modells über alle möglichen Schwellenwerte hinweg zeigt. Die Fläche unter dieser Kurve (AUC - Area Under Curve) ist ein gängiges Mass für die Gesamtgüte des Modells (0.5 = Zufall, 1.0 = perfekt).</li>
        </ul>
    </div>
);
const uebungenData13: UebungenData = {
    quiz: [
        { q: "Die logistische Regression wird verwendet, wenn die abhängige Variable (Y)...", a: ["stetig ist.", "mehr als 10 Kategorien hat.", "kategorial mit zwei Ausgängen ist."], correct: 2 },
        { q: "Das Ergebnis einer logistischen Regression ist...", a: ["eine exakte Vorhersage (z.B. 42).", "eine Wahrscheinlichkeit (z.B. 0.75).", "ein Korrelationskoeffizient."], correct: 1 },
    ],
    open: [
        { q: "Ein Online-Shop verwendet ein logistisches Regressionsmodell, um zu entscheiden, ob einem Kunden ein Rabattgutschein angezeigt wird. Nenne zwei mögliche unabhängige Variablen (X) und erkläre deine Wahl.", solution: "Mögliche Variablen: 1. 'Anzahl der Artikel im Warenkorb': Kunden mit vielen Artikeln zögern vielleicht wegen des Preises. Ein Gutschein könnte den Kauf abschliessen. 2. 'Zeit auf der Seite': Eine lange Verweildauer ohne Kauf könnte auf Unentschlossenheit hindeuten, die ein Gutschein überwinden könnte." },
    ],
    kreativ: "Warum kann man nicht einfach eine lineare Regression für ein Ja/Nein-Problem verwenden? Nenne mindestens zwei Gründe."
};
const uebungenInhalt13 = <UebungenContent data={uebungenData13} />;

// --- INHALTE FÜR MODUL 14 ---
const grundwissenInhalt14 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die meisten der bisher besprochenen Tests (t-Test, ANOVA, Regression) sind **parametrische Tests**. Sie machen bestimmte Annahmen über die Verteilung der Daten in der Population – am häufigsten die Annahme der Normalverteilung.</p>
        <p><strong>Nicht-parametrische Tests</strong> (auch verteilungsfreie Tests genannt) sind Alternativen, die ohne diese Annahmen auskommen. Sie arbeiten oft nicht mit den Originaldaten, sondern mit deren **Rängen**.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Wann verwendet man sie?</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Wenn die Stichprobe sehr klein ist und man die Normalverteilung nicht annehmen kann.</li>
            <li>Wenn die Daten stark schief sind oder viele Ausreisser haben.</li>
            <li>Wenn die Daten von Natur aus Rangdaten sind (z.B. Platzierungen in einem Wettbewerb) oder auf einer Ordinalskala gemessen wurden (z.B. &quot;stimme gar nicht zu&quot; bis &quot;stimme voll zu&quot;).</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Wichtige nicht-parametrische Tests</h3>
        <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-100 dark:bg-slate-800"><th className="p-3 font-semibold border-b dark:border-slate-700">Parametrischer Test</th><th className="p-3 font-semibold border-b dark:border-slate-700">Nicht-parametrisches Äquivalent</th><th className="p-3 font-semibold border-b dark:border-slate-700">Anwendung</th></tr></thead><tbody><tr className="border-b dark:border-slate-700"><td className="p-3">Unabhängiger t-Test</td><td className="p-3 font-bold">Mann-Whitney-U-Test</td><td className="p-3">Vergleich zweier unabhängiger Gruppen</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3">Abhängiger t-Test</td><td className="p-3 font-bold">Wilcoxon-Vorzeichen-Rang-Test</td><td className="p-3">Vergleich zweier abhängiger (gepaarter) Gruppen</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3">ANOVA</td><td className="p-3 font-bold">Kruskal-Wallis-Test</td><td className="p-3">Vergleich von drei oder mehr unabhängigen Gruppen</td></tr><tr className="border-b dark:border-slate-700"><td className="p-3">Pearson-Korrelation</td><td className="p-3 font-bold">Spearman-Rangkorrelation</td><td className="p-3">Zusammenhang zweier Variablen</td></tr></tbody></table></div>
    </div>
);
const anwendbarkeitInhalt14 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Eine Lehrerin möchte zwei Lehrmethoden (A und B) vergleichen. Sie hat zwei kleine Klassen mit jeweils nur 8 Schülern. Die Prüfungsergebnisse (Punkte von 0-100) sind nicht normalverteilt, da einige Schüler extrem gut und andere extrem schlecht abgeschnitten haben.</p>
        <p><strong>Falscher Ansatz:</strong> Ein t-Test wäre hier ungeeignet, da die Annahme der Normalverteilung bei einer so kleinen Stichprobe nicht erfüllt ist und die Ausreisser das Ergebnis stark verzerren würden.</p>
        <p><strong>Korrekter Ansatz:</strong> Sie verwendet den **Mann-Whitney-U-Test**. Dieser Test ordnet alle 16 Schüler nach ihren Prüfungsergebnissen und vergibt Ränge von 1 bis 16. Dann prüft er, ob die Summe der Ränge in Gruppe A systematisch höher oder niedriger ist als die Summe der Ränge in Gruppe B. Dieser Ansatz ist robust gegenüber Ausreissern und benötigt keine Normalverteilungsannahme.</p>
    </div>
);
const meisterklasseInhalt14 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Macht (Power) von statistischen Tests</h3>
        <p>Wenn die Annahmen eines parametrischen Tests (wie die Normalverteilung) erfüllt sind, ist dieser Test fast immer **mächtiger (hat mehr Power)** als sein nicht-parametrisches Gegenstück. Das bedeutet, er hat eine höhere Wahrscheinlichkeit, einen echten Effekt zu finden, wenn einer existiert.</p>
        <p><strong>Warum also nicht immer parametrische Tests verwenden?</strong> Weil bei einer starken Verletzung der Annahmen die Ergebnisse des parametrischen Tests komplett falsch sein können (insbesondere die Typ-I-Fehlerrate kann stark ansteigen). Nicht-parametrische Tests sind &quot;sicherer&quot; und robuster, aber man bezahlt dafür mit einem gewissen Verlust an Power.</p>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Faustregel:</strong> Wenn deine Daten die Annahmen erfüllen (oder deine Stichprobe gross genug für den Zentralen Grenzwertsatz ist), wähle den parametrischen Test. Wenn nicht, wähle das nicht-parametrische Äquivalent.</p></div>
    </div>
);
const uebungenData14: UebungenData = {
    quiz: [
        { q: "Welcher Test ist die nicht-parametrische Alternative zur ANOVA?", a: ["Mann-Whitney-U-Test", "Kruskal-Wallis-Test", "Wilcoxon-Test"], correct: 1 },
        { q: "Nicht-parametrische Tests basieren oft auf...", a: ["den Originaldaten.", "den Rängen der Daten.", "den Mittelwerten der Daten."], correct: 1 },
    ],
    open: [
        { q: "Ein Forscher hat die Zufriedenheit von Kunden mit drei verschiedenen Produkten auf einer Skala von 1 ('sehr unzufrieden') bis 5 ('sehr zufrieden') erfasst. Warum könnte ein Kruskal-Wallis-Test hier besser geeignet sein als eine ANOVA?", solution: "Die Daten sind ordinalskaliert, nicht metrisch. Die Abstände zwischen 1, 2, 3 etc. sind nicht unbedingt gleich. Eine ANOVA nimmt intervallskalierte Daten und Normalverteilung an. Der Kruskal-Wallis-Test arbeitet mit den Rängen und ist daher für Ordinaldaten besser geeignet und robuster." },
    ],
    kreativ: "Stelle dir eine Situation vor, in der du bewusst einen nicht-parametrischen Test wählen würdest, obwohl deine Daten metrisch sind. Begründe deine Entscheidung."
};
const uebungenInhalt14 = <UebungenContent data={uebungenData14} />;

// --- INHALTE FÜR MODUL 15 ---
const grundwissenInhalt15 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die bisherigen Methoden (Hypothesentests, Konfidenzintervalle) gehören zur **frequentistischen** Statistik. Die Bayes&apos;sche Statistik ist ein alternativer, fundamental anderer Ansatz zur Datenanalyse. Anstatt den p-Wert zu berechnen, aktualisiert sie unsere &quot;Überzeugungen&quot; angesichts neuer Daten.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Der Satz von Bayes</h3>
        <p>Das Herzstück ist der Satz von Bayes, der beschreibt, wie man eine anfängliche Überzeugung (Prior) mit neuen Daten (Likelihood) kombiniert, um eine aktualisierte Überzeugung (Posterior) zu erhalten.</p>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-center font-mono">
            P(A|B) = [P(B|A) * P(A)] / P(B)
        </div>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>P(A|B) - Posterior:</strong> Die Wahrscheinlichkeit der Hypothese A, nachdem wir die Daten B gesehen haben. (Was wir wissen wollen).</li>
            <li><strong>P(A) - Prior:</strong> Unsere anfängliche Überzeugung über die Hypothese A, *bevor* wir die Daten gesehen haben.</li>
            <li><strong>P(B|A) - Likelihood:</strong> Die Wahrscheinlichkeit, die Daten B zu beobachten, wenn unsere Hypothese A wahr wäre.</li>
            <li><strong>P(B) - Evidence:</strong> Die totale Wahrscheinlichkeit, die Daten B zu beobachten. Dient als Normierungsfaktor.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt15 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Tech-Unternehmen führt einen A/B-Test für einen neuen Button durch. Nach 1000 Besuchern hat Button A eine Klickrate von 10% und Button B eine von 12%.</p>
        <p><strong>Frequentistischer Ansatz:</strong> Man würde einen Hypothesentest durchführen und einen p-Wert erhalten, z.B. p=0.08. Die Schlussfolgerung wäre: &quot;Das Ergebnis ist nicht statistisch signifikant auf dem 5%-Niveau.&quot; Das ist oft unbefriedigend.</p>
        <p><strong>Bayes&apos;scher Ansatz:</strong> Man startet mit einem &quot;uninformierten Prior&quot; (z.B. Annahme, dass alle Klickraten gleich wahrscheinlich sind). Dann füttert man die Daten (100 Klicks bei A, 120 bei B) in das Bayes&apos;sche Modell. Das Ergebnis ist keine einzelne Ja/Nein-Entscheidung, sondern eine **Posterior-Verteilung** für die Klickraten von A und B.</p>
        <p><strong>Anwendung:</strong> Aus diesen Verteilungen kann man direkt nützliche Fragen beantworten, wie: &quot;Wie hoch ist die Wahrscheinlichkeit, dass B tatsächlich besser ist als A?&quot; Die Antwort könnte lauten: &quot;Es gibt eine 92%ige Wahrscheinlichkeit, dass B besser ist als A.&quot; Dies ist eine viel intuitivere und geschäftsrelevantere Aussage als der p-Wert.</p>
    </div>
);
const meisterklasseInhalt15 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Wahl des Priors: Segen und Fluch</h3>
        <p>Der grösste Unterschied und die grösste Kontroverse in der Bayes&apos;schen Statistik ist die Notwendigkeit, einen **Prior** festzulegen. Ein Prior repräsentiert unser Vorwissen oder unsere Annahmen, bevor wir die Daten sehen.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Informierte Priors:</strong> Wenn man aus früheren Studien weiss, dass eine Klickrate typischerweise zwischen 5% und 15% liegt, kann man dieses Wissen in den Prior einfliessen lassen. Das kann zu genaueren Ergebnissen führen, besonders bei kleinen Stichproben.</li>
            <li><strong>Uninformierte Priors:</strong> Wenn man kein Vorwissen hat, wählt man einen Prior, der alle Möglichkeiten als gleich wahrscheinlich ansieht.</li>
        </ul>
        <p>Die Wahl des Priors ist subjektiv und kann das Ergebnis beeinflussen. Kritiker sehen dies als einen Nachteil. Befürworter argumentieren, dass es explizit macht, welche Annahmen in eine Analyse einfliessen, anstatt sie in der Wahl des Testverfahrens zu &quot;verstecken&quot;.</p>
    </div>
);
const uebungenData15: UebungenData = {
    quiz: [
        { q: "Was aktualisiert die Bayes'sche Statistik?", a: ["Den p-Wert", "Unsere Überzeugung angesichts neuer Daten", "Die Stichprobengrösse"], correct: 1 },
        { q: "Der 'Prior' in der Bayes'schen Statistik repräsentiert...", a: ["die gesammelten Daten.", "das Endergebnis.", "unser Vorwissen oder unsere anfängliche Annahme."], correct: 2 },
    ],
    open: [
        { q: "Erkläre den fundamentalen Unterschied in der Interpretation eines frequentistischen 95%-Konfidenzintervalls und eines Bayes'schen 95%-Kredibilitätsintervalls.", solution: "Frequentistisches KI: &apos;Wenn wir das Experiment 100 Mal wiederholen, würden 95 der Intervalle den wahren Wert enthalten.&apos; (Aussage über das Verfahren). Bayes&apos;sches KI: &apos;Gegeben unsere Daten und unser Modell, gibt es eine 95% Wahrscheinlichkeit, dass der wahre Wert in diesem Intervall liegt.&apos; (Direkte probabilistische Aussage über den Parameter)." },
    ],
    kreativ: "Das Monty-Hall-Problem (Ziegenproblem) ist ein berühmtes Rätsel, das sich elegant mit dem Satz von Bayes lösen lässt. Versuche, die Lösung mit den Begriffen Prior, Likelihood und Posterior zu skizzieren."
};
const uebungenInhalt15 = <UebungenContent data={uebungenData15} />;

// --- INHALTE FÜR MODUL 16 ---
const grundwissenInhalt16 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die theoretischen Konzepte der Statistik werden erst durch die Anwendung mit Software wirklich lebendig und nützlich. Die beiden dominanten Sprachen für die Datenanalyse sind **R** und **Python**. Beide sind Open-Source und verfügen über riesige Ökosysteme von Paketen für praktisch jede statistische Aufgabe.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Der typische Datenanalyse-Workflow</h3>
        <p>Unabhängig vom Werkzeug folgt eine praktische Analyse meist diesen Schritten:</p>
        <ol className="list-decimal list-inside space-y-4 pl-2">
            <li><strong>Daten einlesen:</strong> Importieren von Daten aus verschiedenen Quellen (CSV, Excel, Datenbanken).</li>
            <li><strong>Daten bereinigen (Data Cleaning):</strong> Umgang mit fehlenden Werten, Korrektur von Fehlern, Umwandlung von Datentypen. Dies ist oft der zeitaufwändigste Schritt!</li>
            <li><strong>Explorative Datenanalyse (EDA):</strong> Berechnen von deskriptiven Statistiken und Erstellen von Visualisierungen (Histogramme, Scatterplots), um ein Gefühl für die Daten zu bekommen.</li>
            <li><strong>Modellierung:</strong> Anwenden von statistischen Tests oder Modellen (z.B. t-Test, Regression), um Hypothesen zu prüfen oder Vorhersagen zu treffen.</li>
            <li><strong>Kommunikation:</strong> Aufbereitung und Präsentation der Ergebnisse in verständlicher Form (z.B. in einem Report, Dashboard oder Jupyter/R Markdown Notebook).</li>
        </ol>
    </div>
);
const anwendbarkeitInhalt16 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Datenanalyst erhält eine CSV-Datei mit Kundendaten und dem Ziel, die Kundenabwanderung (Churn) zu analysieren.</p>
        <p><strong>Workflow in Python mit `pandas` und `scikit-learn`:</strong></p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Einlesen:</strong> `pd.read_csv(&apos;kunden.csv&apos;)` lädt die Daten in einen DataFrame.</li>
            <li><strong>Bereinigen:</strong> Mit Befehlen wie `.isnull().sum()` findet er fehlende Werte und füllt sie z.B. mit dem Mittelwert (`.fillna()`).</li>
            <li><strong>EDA:</strong> Er gruppiert die Daten mit `.groupby(&apos;churn&apos;)` und berechnet Mittelwerte, um zu sehen, ob abgewanderte Kunden z.B. höhere Monatsgebühren hatten. Mit `matplotlib` oder `seaborn` visualisiert er diese Unterschiede.</li>
            <li><strong>Modellierung:</strong> Er trainiert ein logistisches Regressionsmodell (`LogisticRegression` aus `scikit-learn`), um die Wahrscheinlichkeit der Abwanderung basierend auf Merkmalen wie Vertragsdauer und monatlichen Kosten vorherzusagen.</li>
            <li><strong>Kommunikation:</strong> Er fasst seine Ergebnisse, den Code und die Visualisierungen in einem Jupyter-Notebook zusammen und präsentiert dem Management die wichtigsten Treiber der Kundenabwanderung.</li>
        </ol>
    </div>
);

const meisterklasseInhalt16 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Reproduzierbare Analyse</h3>
        <p>Der Goldstandard in der praktischen Datenanalyse ist **Reproduzierbarkeit**. Das bedeutet, eine andere Person (oder man selbst in sechs Monaten) sollte in der Lage sein, den gesamten Analyseprozess vom Rohdatensatz bis zum Endergebnis exakt nachzuvollziehen und zum selben Resultat zu kommen.</p>
        <p>Werkzeuge wie **Jupyter Notebooks** oder **R Markdown** sind hierfür ideal, da sie Code, dessen Ausgaben (Tabellen, Grafiken) und erklärenden Text in einem einzigen Dokument vereinen. Dies schafft eine transparente und nachvollziehbare &quot;Geschichte&quot; der Analyse.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Jenseits von Excel</h3>
        <p>Während Excel für einfache Aufgaben nützlich ist, stösst es bei grösseren Datensätzen und komplexeren Analysen schnell an seine Grenzen. Die Verwendung von Code (Python/R) bietet entscheidende Vorteile:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Skalierbarkeit:</strong> Code kann problemlos mit Millionen von Datenzeilen umgehen.</li>
            <li><strong>Automatisierung:</strong> Wiederkehrende Analysen können per Knopfdruck erneut ausgeführt werden.</li>
            <li><strong>Komplexität:</strong> Zugang zu Tausenden von fortschrittlichen statistischen Modellen und Algorithmen.</li>
            <li><strong>Nachvollziehbarkeit:</strong> Jeder Analyseschritt ist im Code dokumentiert.</li>
        </ul>
    </div>
);
const uebungenData16: UebungenData = {
    quiz: [
        { q: "Welcher Schritt im Datenanalyse-Workflow ist oft der zeitaufwändigste?", a: ["Daten einlesen", "Daten bereinigen", "Modellierung"], correct: 1 },
        { q: "Die Python-Bibliothek, die hauptsächlich für die Datenmanipulation in DataFrames verwendet wird, heisst...", a: ["NumPy", "scikit-learn", "pandas"], correct: 2 },
    ],
    open: [
        { q: "Warum ist Reproduzierbarkeit in der Datenanalyse so wichtig? Nenne zwei Gründe.", solution: "1. Vertrauenswürdigkeit: Es beweist, dass die Ergebnisse nicht durch zufällige Klicks oder nicht nachvollziehbare Schritte entstanden sind. 2. Kollaboration & Effizienz: Kollegen können die Analyse verstehen, darauf aufbauen und sie für neue Daten wiederverwenden, ohne alles neu erfinden zu müssen." },
    ],
    kreativ: "Stell dir vor, du hast einen Datensatz über Superhelden (mit Variablen wie 'Stärke', 'Geschwindigkeit', 'Intelligenz', 'Seite' (gut/böse)). Skizziere einen kurzen, explorativen Analyseplan (3-4 Schritte), den du mit Python/pandas durchführen würdest."
};
const uebungenInhalt16 = <UebungenContent data={uebungenData16} />;



// --- MODUL-LISTE ---
const statisticsModules: StatisticsModule[] = [
    { id: 1, title: "Einführung & Grundbegriffe", relevance: "green", content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: "Datenerhebung & Studiendesign", relevance: "orange", content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: "Beschreibende Statistik", relevance: "green", content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: "Grundlagen der Wahrscheinlichkeit", relevance: "orange", content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: "Verteilungen", relevance: "red", content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
    { id: 6, title: "Die Normalverteilung", relevance: "green", content: { grundwissen: grundwissenInhalt6, anwendbarkeit: anwendbarkeitInhalt6, meisterklasse: meisterklasseInhalt6, uebungen: uebungenInhalt6 }},
    { id: 7, title: "Konfidenzintervalle", relevance: "green", content: { grundwissen: grundwissenInhalt7, anwendbarkeit: anwendbarkeitInhalt7, meisterklasse: meisterklasseInhalt7, uebungen: uebungenInhalt7 }},
    { id: 8, title: "Hypothesentests", relevance: "green", content: { grundwissen: grundwissenInhalt8, anwendbarkeit: anwendbarkeitInhalt8, meisterklasse: meisterklasseInhalt8, uebungen: uebungenInhalt8 }},
    { id: 9, title: "Chi-Quadrat-Tests", relevance: "orange", content: { grundwissen: grundwissenInhalt9, anwendbarkeit: anwendbarkeitInhalt9, meisterklasse: meisterklasseInhalt9, uebungen: uebungenInhalt9 }},
    { id: 10, title: "Lineare Regression & Korrelation", relevance: "green", content: { grundwissen: grundwissenInhalt10, anwendbarkeit: anwendbarkeitInhalt10, meisterklasse: meisterklasseInhalt10, uebungen: uebungenInhalt10 }},
    { id: 11, title: "ANOVA (Varianzanalyse)", relevance: "orange", content: { grundwissen: grundwissenInhalt11, anwendbarkeit: anwendbarkeitInhalt11, meisterklasse: meisterklasseInhalt11, uebungen: uebungenInhalt11 }},
    { id: 12, title: "Multiple Lineare Regression", relevance: "green", content: { grundwissen: grundwissenInhalt12, anwendbarkeit: anwendbarkeitInhalt12, meisterklasse: meisterklasseInhalt12, uebungen: uebungenInhalt12 }},
    { id: 13, title: "Logistische Regression", relevance: "green", content: { grundwissen: grundwissenInhalt13, anwendbarkeit: anwendbarkeitInhalt13, meisterklasse: meisterklasseInhalt13, uebungen: uebungenInhalt13 }},
    { id: 14, title: "Nicht-parametrische Tests", relevance: "orange", content: { grundwissen: grundwissenInhalt14, anwendbarkeit: anwendbarkeitInhalt14, meisterklasse: meisterklasseInhalt14, uebungen: uebungenInhalt14 }},
    { id: 15, title: "Bayes'sche Statistik", relevance: "orange", content: { grundwissen: grundwissenInhalt15, anwendbarkeit: anwendbarkeitInhalt15, meisterklasse: meisterklasseInhalt15, uebungen: uebungenInhalt15 }},
    { id: 16, title: "Praktische Datenanalyse mit Software", relevance: "green", content: { grundwissen: grundwissenInhalt16, anwendbarkeit: anwendbarkeitInhalt16, meisterklasse: meisterklasseInhalt16, uebungen: uebungenInhalt16 }},
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

  // --- NEU: LOGIK FÜR DIE BLÄTTERFUNKTION ---
    const lessonParts = ['grundwissen', 'anwendbarkeit', 'meisterklasse', 'uebungen'];
    const currentIndex = lessonParts.indexOf(type);

    const prevPart = currentIndex > 0 ? lessonParts[currentIndex - 1] : null;
    const nextPart = currentIndex < lessonParts.length - 1 ? lessonParts[currentIndex + 1] : null;

    // Achte auf die korrekte Modulnummer /modules/1/
    const prevLink = prevPart ? `/modules/1/${prevPart}-${moduleId}` : null;
    const nextLink = nextPart ? `/modules/1/${nextPart}-${moduleId}` : null;
// --- ENDE DER NEUEN LOGIK ---
  
  const contentKey = type as keyof typeof moduleData.content;
  const content = moduleData.content[contentKey] || "Inhalt nicht verfügbar.";
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${moduleData.title}`;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <Link href="/modules/1" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          {/* Text an Modul 1 angepasst */}
          <span>Zurück zur Übersicht Einführung & Forschung</span>
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {content}
        </div>
        
        {/* --- NEU: UI FÜR DIE BLÄTTERFUNKTION --- */}
        <div className="mt-12 flex justify-between items-center border-t dark:border-slate-700 pt-6">
          {prevLink ? (
            <Link href={prevLink} className="flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors rounded-md p-2 -m-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">Vorheriger Abschnitt</span>
            </Link>
          ) : (
            <div /> // Leeres div, damit der "Weiter"-Button rechts bleibt
          )}
          {nextLink ? (
            <Link href={nextLink} className="flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors rounded-md p-2 -m-2">
              <span className="font-semibold">Nächster Abschnitt</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
             <Link href="/modules/1" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              <span>Zurück zur Übersicht</span>
            </Link>
          )}
        </div>
        {/* --- ENDE DER NEUEN UI --- */}

      </div>
    </div>
  );
}