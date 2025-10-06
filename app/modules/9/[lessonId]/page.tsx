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
// KORREKTE TYP-DEFINITION FÜR DIESES MODUL
interface PsychometricsModule {
  id: number;
  title: string;
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

// --- INHALTE FÜR ALLE MODULE ---

// Modul 1: Grundlagen
const grundwissenInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Psychometrie ist die Wissenschaft der Messung psychologischer Merkmale wie Wissen, Fähigkeiten, Einstellungen und Persönlichkeit. Damit diese Messung wissenschaftlichen Standards genügt, müssen Tests drei grundlegende Eigenschaften aufweisen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Standardisierung:</strong> Die Art und Weise, wie ein Test durchgeführt, ausgewertet und interpretiert wird, muss für alle Personen identisch sein. Dies stellt die Vergleichbarkeit der Ergebnisse sicher.</li>
            <li><strong>Normierung:</strong> Der Test wird an einer grossen, repräsentativen Stichprobe (der Normstichprobe) durchgeführt, um &quot;normale&quot; oder durchschnittliche Ergebnisse zu ermitteln. Die Leistung einer Einzelperson kann dann mit dieser Normgruppe verglichen werden.</li>
            <li><strong>Objektivität:</strong> Das Testergebnis muss unabhängig von der Person sein, die den Test durchführt oder auswertet.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt1 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Online-Quiz vs. psychometrischer Test</h3>
        <p className="text-lg leading-relaxed">Im Internet finden sich unzählige Persönlichkeits- oder IQ-Quiz. Warum sind diese keine echten psychometrischen Tests?</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Fehlende Standardisierung:</strong> Sie können das Quiz in jeder beliebigen Situation machen (abgelenkt, müde), was die Ergebnisse verzerrt.</li>
            <li><strong>Fehlende Normierung:</strong> Ihr Ergebnis (&quot;Sie sind ein kreativer Visionär!&quot;) wird nicht mit einer repräsentativen Vergleichsgruppe verglichen. Es ist unklar, was das Ergebnis im Vergleich zu anderen bedeutet.</li>
            <li><strong>Unklare Gütekriterien:</strong> Es gibt keine Informationen darüber, ob der Test zuverlässig (reliabel) oder gültig (valide) ist.</li>
        </ul>
        <p>Echte psychometrische Tests (z.B. ein klinischer Intelligenztest) hingegen werden unter streng standardisierten Bedingungen durchgeführt und die Ergebnisse auf Basis einer grossen Normstichprobe interpretiert, was eine aussagekräftige Einordnung der individuellen Leistung ermöglicht.</p>
    </div>
);
const meisterklasseInhalt1 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Klassische Testtheorie (KTT)</h3>
        <p>Die KTT ist das Fundament der meisten psychologischen Tests. Ihre zentrale Grundannahme ist einfach, aber fundamental:</p>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-center font-mono">
            Beobachteter Wert (X) = Wahrer Wert (T) + Messfehler (E)
        </div>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Beobachteter Wert:</strong> Das tatsächliche Ergebnis, das eine Person in einem Test erzielt (z.B. 110 IQ-Punkte).</li>
            <li><strong>Wahrer Wert:</strong> Das tatsächliche, aber unbekannte Ausmass des Merkmals bei der Person.</li>
            <li><strong>Messfehler:</strong> Zufällige Einflüsse, die das Ergebnis verzerren (Tagesform, Müdigkeit, Raten, unklare Fragen).</li>
        </ul>
        <p>Das Ziel jedes guten Tests ist es, den **Messfehler (E) so klein wie möglich zu halten**, damit der beobachtete Wert (X) eine möglichst genaue Schätzung des wahren Wertes (T) ist. Die Gütekriterien Reliabilität und Validität sind Methoden, um die Grösse dieses Messfehlers zu bewerten.</p>
    </div>
);
const uebungenData1: UebungenData = {
    quiz: [
        { q: "Wenn ein Test an einer grossen, repräsentativen Gruppe erprobt wird, um Vergleichswerte zu schaffen, nennt man das...", a: ["Standardisierung", "Normierung", "Objektivität"], correct: 1 },
        { q: "Die Klassische Testtheorie besagt, dass jeder Messwert aus einem wahren Wert und einem ... besteht.", a: ["Messfehler", "Bias", "Standardwert"], correct: 0 },
    ],
    open: [
        { q: "Warum ist die Standardisierung bei der Durchführung eines Tests so wichtig?", solution: "Ohne Standardisierung sind die Ergebnisse nicht vergleichbar. Wenn eine Person einen Test in einem ruhigen Raum mit viel Zeit macht und eine andere im Lärm unter Zeitdruck, ist unklar, ob ein Leistungsunterschied auf die Person oder die unterschiedlichen Testbedingungen zurückzuführen ist. Standardisierung stellt sicher, dass die Bedingungen für alle gleich sind." },
    ],
    kreativ: "Stellen Sie sich vor, Sie entwickeln einen Test zur Messung von &apos;Humor&apos;. Nennen Sie zwei mögliche Quellen für Messfehler, die das Ergebnis verfälschen könnten."
};
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;

// Modul 2: Reliabilität
const grundwissenInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Reliabilität (Zuverlässigkeit) ist das Gütekriterium, das die **Genauigkeit und Konsistenz** einer Messung angibt. Ein reliabler Test liefert bei wiederholter Messung unter denselben Bedingungen ähnliche Ergebnisse.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Arten der Reliabilitätsprüfung</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Test-Retest-Reliabilität:</strong> Derselbe Test wird derselben Person zu zwei verschiedenen Zeitpunkten vorgelegt. Die Korrelation zwischen den beiden Ergebnissen gibt die Reliabilität an. (Gut für stabile Merkmale wie Persönlichkeit).</li>
            <li><strong>Interrater-Reliabilität:</strong> Zwei oder mehr unabhängige Beobachter (Rater) bewerten dasselbe Verhalten. Die Übereinstimmung zwischen ihren Bewertungen gibt die Reliabilität an. (Wichtig bei Verhaltensbeobachtungen oder der Auswertung offener Fragen).</li>
            <li><strong>Interne Konsistenz:</strong> Misst, wie gut die einzelnen Fragen (Items) eines Tests dasselbe Konstrukt messen. Eine gängige Methode ist **Cronbachs Alpha**. Man kann sich das so vorstellen, als ob man den Test in viele kleine Teile zerlegt und prüft, ob alle Teile in die gleiche Richtung messen.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt2 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Reliabilität im Alltag: Die Badezimmerwaage</h3>
        <p className="text-lg leading-relaxed">Stellen Sie sich vor, Sie wollen Ihr Gewicht messen.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Szenario 1 (Hohe Reliabilität):</strong> Sie steigen dreimal hintereinander auf Ihre Waage und sie zeigt an: 70.1 kg, 70.2 kg, 70.1 kg. Die Messungen sind sehr konsistent. Die Waage ist reliabel.</li>
            <li><strong>Szenario 2 (Niedrige Reliabilität):</strong> Sie steigen dreimal hintereinander auf die Waage und sie zeigt an: 68.5 kg, 71.3 kg, 69.4 kg. Die Messungen schwanken stark, obwohl sich Ihr wahres Gewicht nicht geändert hat. Diese Waage ist nicht reliabel (unzuverlässig) und daher nutzlos.</li>
        </ul>
        <p>Genau wie bei einer Waage erwarten wir von einem psychologischen Test, dass er nicht &quot;würfelt&quot;, sondern eine konsistente, zuverlässige Messung des interessierenden Merkmals liefert.</p>
    </div>
);
const meisterklasseInhalt2 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Was ist ein &quot;guter&quot; Reliabilitätswert?</h3>
        <p>Reliabilitätskoeffizienten (wie Cronbachs Alpha oder eine Korrelation) reichen von 0 bis 1. Ein Wert von 1 bedeutet perfekte Reliabilität (kein Messfehler), ein Wert von 0 bedeutet, dass das Ergebnis reiner Zufall ist.</p>
        <p>Die Faustregeln für die Bewertung sind kontextabhängig:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Für wichtige Individualdiagnosen (z.B. klinische Tests):</strong> Man fordert sehr hohe Reliabilitäten, typischerweise über .90.</li>
            <li><strong>Für Forschungszwecke (z.B. Gruppenvergleiche):</strong> Werte um .80 werden oft als gut angesehen.</li>
            <li><strong>Für neu entwickelte oder explorative Skalen:</strong> Werte um .70 können als akzeptabel gelten.</li>
        </ul>
        <p>Ein Test mit einer Reliabilität von .80 bedeutet nach der Klassischen Testtheorie, dass 80% der Varianz in den Testergebnissen auf wahre Unterschiede zwischen den Personen zurückgehen, während 20% auf zufälligen Messfehler zurückzuführen sind.</p>
    </div>
);
const uebungenData2: UebungenData = {
    quiz: [
        { q: "Welches Gütekriterium beschreibt die Messgenauigkeit und Konsistenz eines Tests?", a: ["Validität", "Objektivität", "Reliabilität"], correct: 2 },
        { q: "Wenn zwei Psychologen die Aggressivität eines Kindes im Spiel beobachten und ihre Bewertungen stark übereinstimmen, spricht das für eine hohe...", a: ["Test-Retest-Reliabilität", "Interrater-Reliabilität", "Interne Konsistenz"], correct: 1 },
    ],
    open: [
        { q: "Warum ist die Test-Retest-Reliabilität ungeeignet, um die Zuverlässigkeit eines Stimmungstests zu überprüfen?", solution: "Stimmung ist per Definition ein fluktuierender, instabiler Zustand. Wenn ein Stimmungstest heute und in einer Woche unterschiedliche Ergebnisse liefert, liegt das nicht unbedingt an einem unzuverlässigen Test, sondern daran, dass sich die wahre Stimmung der Person geändert hat. Für solche Zustandsmessungen ist die interne Konsistenz (z.B. Cronbachs Alpha) das bessere Mass." },
    ],
    kreativ: "Sie haben einen neuen Fragebogen zur Messung von &apos;Kreativität&apos; mit 10 Fragen entwickelt. Beschreiben Sie, wie Sie dessen interne Konsistenz und dessen Test-Retest-Reliabilität überprüfen würden."
};
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;

// Modul 3: Validität
const grundwissenInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Validität (Gültigkeit) ist das wichtigste Gütekriterium. Es beantwortet die Frage: **Misst der Test tatsächlich das, was er zu messen vorgibt?** Ein Test kann perfekt reliabel sein, aber trotzdem nicht valide.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Arten der Validität</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Inhaltsvalidität:</strong> Gibt an, wie repräsentativ die Inhalte (Fragen) eines Tests für das zu messende Merkmal sind. (Beispiel: Eine Matheprüfung, die nur Additionsaufgaben enthält, hat eine geringe Inhaltsvalidität für das gesamte Schulfach Mathematik).</li>
            <li><strong>Kriteriumsvalidität:</strong> Bezieht sich auf den Zusammenhang zwischen dem Testergebnis und einem Aussenkriterium.
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li><strong>Übereinstimmungsvalidität (Concurrent):</strong> Test und Kriterium werden gleichzeitig erhoben. (z.B. Korrelation eines neuen Depressions-Fragebogens mit einer bereits etablierten klinischen Diagnose).</li>
                    <li><strong>Vorhersagevalidität (Predictive):</strong> Der Test wird verwendet, um ein zukünftiges Kriterium vorherzusagen. (z.B. Korrelation eines Studieneignungstests mit dem späteren Studienerfolg).</li>
                </ul>
            </li>
            <li><strong>Konstruktvalidität:</strong> Das &quot;Gesamtpaket&quot;. Es ist keine einzelne Kennzahl, sondern die Gesamtheit der Belege dafür, dass ein Test das theoretische Konstrukt (z.B. Intelligenz, Ängstlichkeit) tatsächlich erfasst.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Reliabilität vs. Validität: Die Zielscheiben-Analogie</h3>
        <p className="text-lg leading-relaxed">Stellen Sie sich einen Bogenschützen vor, der auf eine Zielscheibe schiesst. Das Zentrum der Scheibe ist der &quot;wahre Wert&quot;, den wir messen wollen.</p>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li><strong>Niedrige Reliabilität, niedrige Validität:</strong> Die Pfeile landen weit verstreut über die ganze Scheibe. Die Schüsse sind weder konsistent noch treffen sie das Ziel.</li>
            <li><strong>Hohe Reliabilität, niedrige Validität:</strong> Alle Pfeile landen sehr eng beieinander, aber in der oberen linken Ecke der Scheibe. Die Messung ist konsistent (reliabel), aber systematisch falsch (nicht valide). (Beispiel: Eine Waage, die konstant 5kg zu viel anzeigt).</li>
            <li><strong>Hohe Reliabilität, hohe Validität:</strong> Alle Pfeile landen eng beieinander im Zentrum der Scheibe. Die Messung ist konsistent UND korrekt. **Dies ist das Ziel jedes psychometrischen Tests.**</li>
        </ul>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Wichtige Erkenntnis:</strong> Eine Messung kann nicht valide sein, wenn sie nicht reliabel ist. Wenn die Pfeile überall landen, können sie nicht im Zentrum sein. Eine Messung kann aber sehr reliabel sein, ohne valide zu sein (sie misst etwas konsistent, aber das Falsche).</p></div>
    </div>
);
const meisterklasseInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Konstruktvalidität: Das nomologische Netzwerk</h3>
        <p>Die Konstruktvalidität ist das anspruchsvollste, aber auch wichtigste Konzept. Es geht darum, eine Theorie über das zu messende Konstrukt aufzustellen und dann empirisch zu prüfen, ob sich der Test so verhält, wie es die Theorie vorhersagt.</p>
        <p>Man spinnt ein &quot;nomologisches Netzwerk&quot; aus Hypothesen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Konvergente Validität:</strong> Der Test sollte hoch mit anderen Tests korrelieren, die dasselbe oder ein ähnliches Konstrukt messen. (Ein neuer Intelligenztest sollte hoch mit einem etablierten IQ-Test korrelieren).</li>
            <li><strong>Diskriminante Validität:</strong> Der Test sollte niedrig oder gar nicht mit Tests korrelieren, die andere, unabhängige Konstrukte messen. (Ein Intelligenztest sollte nicht hoch mit einem Test für Körpergrösse korrelieren).</li>
        </ul>
        <p>Je mehr dieser theoretisch abgeleiteten Zusammenhänge empirisch bestätigt werden können, desto stärker ist der Beleg für die Konstruktvalidität des Tests.</p>
    </div>
);
const uebungenData3: UebungenData = {
    quiz: [
        { q: "Das wichtigste Gütekriterium eines Tests ist die...", a: ["Reliabilität", "Validität", "Standardisierung"], correct: 1 },
        { q: "Wenn ein Eignungstest für Piloten gut vorhersagt, wer später ein guter Pilot wird, hat er eine hohe...", a: ["Inhaltsvalidität", "Vorhersagevalidität", "Interne Konsistenz"], correct: 1 },
    ],
    open: [
        { q: "Kann ein Test valide sein, wenn er nicht reliabel ist? Begründen Sie mit der Zielscheiben-Analogie.", solution: "Nein. Wenn ein Test nicht reliabel ist, sind die Messergebnisse zufällig und inkonsistent. In der Zielscheiben-Analogie bedeutet das, die Pfeile landen überall verstreut. Wenn sie überall verstreut sind, können sie nicht systematisch im Zentrum (dem wahren Wert) landen. Eine Messung muss also zuverlässig sein, bevor sie überhaupt gültig sein kann." },
    ],
    kreativ: "Sie entwickeln einen Fragebogen zur Messung von &apos;Smartphone-Sucht&apos;. Wie würden Sie vorgehen, um dessen konvergente und diskriminante Validität zu überprüfen?"
};
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;

// Modul 4: Intelligenzmessung
const grundwissenInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Intelligenz ist eines der am meisten untersuchten, aber auch umstrittensten Konstrukte in der Psychologie. Es bezieht sich allgemein auf die Fähigkeit zu lernen, zu schlussfolgern und sich an neue Situationen anzupassen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Geschichte der Intelligenzmessung</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Alfred Binet:</strong> Entwickelte Anfang des 20. Jahrhunderts den ersten Intelligenztest, um französische Schulkinder mit Lernschwierigkeiten zu identifizieren.</li>
            <li><strong>William Stern:</strong> Entwickelte aus Binets Arbeit die Formel für den **Intelligenzquotienten (IQ)**: (Intelligenzalter / Lebensalter) * 100.</li>
            <li><strong>David Wechsler:</strong> Entwickelte die heute am weitesten verbreiteten IQ-Tests (WAIS für Erwachsene, WISC für Kinder). Er führte den **Abweichungs-IQ** ein: Der IQ wird nicht mehr über die Formel berechnet, sondern durch den Vergleich der individuellen Leistung mit der Leistung der altersgleichen Normstichprobe.</li>
        </ul>
        <p>Nach moderner Definition hat ein IQ-Test einen Mittelwert von **100** und eine Standardabweichung von **15**. Das bedeutet, ca. 68% aller Menschen haben einen IQ zwischen 85 und 115.</p>
    </div>
);
const anwendbarkeitInhalt4 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Struktur eines modernen IQ-Tests (z.B. WAIS-IV)</h3>
        <p className="text-lg leading-relaxed">Ein moderner Test wie der Wechsler-Intelligenztest für Erwachsene (WAIS) misst nicht nur eine allgemeine Intelligenz (Gesamt-IQ), sondern liefert auch differenzierte Werte für vier Hauptindizes:</p>
        <ol className="list-decimal list-inside space-y-4 pl-2">
            <li><strong>Sprachverständnis:</strong> Misst verbales Wissen und schlussfolgerndes Denken. (Untertests z.B. Wortschatz-Test, Gemeinsamkeiten finden).</li>
            <li><strong>Wahrnehmungslogisches Denken:</strong> Misst non-verbale, logische und räumliche Fähigkeiten. (Untertests z.B. Matrizen-Test, Mosaik-Test).</li>
            <li><strong>Arbeitsgedächtnis:</strong> Misst die Fähigkeit, Informationen kurzzeitig zu speichern und zu manipulieren. (Untertests z.B. Zahlen nachsprechen, Kopfrechnen).</li>
            <li><strong>Verarbeitungsgeschwindigkeit:</strong> Misst die Geschwindigkeit und Genauigkeit der visuellen Informationsverarbeitung. (Untertests z.B. Zahlen-Symbol-Test).</li>
        </ol>
        <p>Die Analyse des Profils dieser vier Indizes kann einem Kliniker viel mehr verraten als der Gesamt-IQ allein. Grosse Diskrepanzen zwischen den Indizes können auf spezifische Lernstörungen oder neurologische Probleme hinweisen.</p>
    </div>
);
const meisterklasseInhalt4 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Der Flynn-Effekt und die Grenzen des IQ</h3>
        <p>Der **Flynn-Effekt**, benannt nach James Flynn, beschreibt die Beobachtung, dass die durchschnittlichen IQ-Werte in vielen Teilen der Welt über das 20. Jahrhundert hinweg stetig angestiegen sind (ca. 3 Punkte pro Jahrzehnt). Die Gründe sind umstritten, aber verbesserte Ernährung, Bildung und eine komplexere Umwelt spielen wahrscheinlich eine Rolle.</p>
        <p>Dies führt zu wichtigen kritischen Überlegungen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Relativität des IQ:</strong> Der Flynn-Effekt zeigt, dass der IQ kein absolutes Mass für &quot;Klugheit&quot; ist, sondern immer relativ zur jeweiligen Normstichprobe. Deshalb müssen IQ-Tests regelmässig neu normiert werden.</li>
            <li><strong>Was misst der IQ?</strong> Ein IQ-Test misst gut die Fähigkeit zum logisch-abstrakten Denken, die in westlichen Schul- und Berufssystemen wichtig ist. Er misst aber nicht andere wichtige Aspekte wie soziale Intelligenz, emotionale Intelligenz, Kreativität oder praktische Weisheit.</li>
        </ul>
    </div>
);
const uebungenData4: UebungenData = {
    quiz: [
        { q: "Ein durchschnittlicher IQ in einem modernen Test beträgt...", a: ["120", "100", "15"], correct: 1 },
        { q: "Der stetige Anstieg der durchschnittlichen IQ-Werte im 20. Jahrhundert wird als ... bezeichnet.", a: ["Wechsler-Effekt", "Binet-Effekt", "Flynn-Effekt"], correct: 2 },
    ],
    open: [
        { q: "Ein 10-jähriges Kind löst die Aufgaben eines durchschnittlichen 12-Jährigen in einem alten Intelligenztest. Berechnen Sie seinen IQ nach der historischen Formel von Stern.", solution: "IQ = (Intelligenzalter / Lebensalter) * 100 = (12 / 10) * 100 = 120." },
    ],
    kreativ: "Diskutieren Sie die Aussage: &apos;IQ-Tests sind nur ein Mass dafür, wie gut jemand in IQ-Tests ist&apos;."
};
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;

// Modul 5: Testkonstruktion & Ethische Aspekte
const grundwissenInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Entwicklung eines guten psychometrischen Tests ist ein langer und aufwendiger Prozess. Er folgt typischerweise mehreren Schritten:</p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Planung:</strong> Definition des zu messenden Konstrukts und der Zielgruppe.</li>
            <li><strong>Itemkonstruktion:</strong> Erstellung eines grossen Pools von potenziellen Fragen (Items).</li>
            <li><strong>Erste Erprobung:</strong> Der Itempool wird einer ersten Stichprobe vorgelegt.</li>
            <li><strong>Itemanalyse:</strong> Statistische Analyse der einzelnen Items. Fragen, die zu schwer, zu leicht sind oder nicht gut zum Rest des Tests passen (schlechte Trennschärfe), werden aussortiert.</li>
            <li><strong>Überarbeitung und Endfassung:</strong> Zusammenstellung der finalen Testversion.</li>
            <li><strong>Normierung:</strong> Durchführung des finalen Tests an einer grossen, repräsentativen Stichprobe zur Erstellung von Normwerten.</li>
        </ol>
    </div>
);
const anwendbarkeitInhalt5 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Kultureller Bias in Tests</h3>
        <p className="text-lg leading-relaxed">Ein grosses Problem bei der Testkonstruktion ist die Gefahr des **kulturellen Bias**. Das bedeutet, dass ein Test systematisch Mitglieder bestimmter kultureller oder sozialer Gruppen benachteiligt, weil die Testinhalte oder -formate das Wissen und die Erfahrungen der Mehrheitskultur voraussetzen.</p>
        <p><strong>Historisches Beispiel:</strong> Frühe amerikanische IQ-Tests enthielten Fragen wie: &quot;Was macht man bei einem Kratzer am Finger?&quot; Die &quot;richtige&quot; Antwort war &quot;Jod auftragen&quot;. Ein Einwandererkind aus einem armen Land, das vielleicht gelernt hatte, die Wunde auszudrücken oder mit einem Tuch abzubinden, würde hier als &quot;weniger intelligent&quot; eingestuft, obwohl es sich um eine Frage des kulturellen Wissens, nicht der Intelligenz handelt.</p>
        <p>Moderne Testkonstrukteure bemühen sich sehr, solche offensichtlichen und subtilen Verzerrungen zu vermeiden, z.B. durch den Einsatz von non-verbalen, abstrakten Aufgaben (wie Matrizen-Tests) oder durch statistische Analysen, die prüfen, ob ein Item in verschiedenen demografischen Gruppen unterschiedlich gut gelöst wird.</p>
    </div>
);
const meisterklasseInhalt5 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Ethische Verantwortung beim Testen</h3>
        <p>Psychologen, die Tests anwenden, unterliegen strengen ethischen Richtlinien. Der Einsatz von Tests ist keine harmlose Spielerei, sondern ein Eingriff, der grosse Konsequenzen für das Leben von Menschen haben kann (z.B. bei Einstellungsentscheidungen, Sorgerechtsstreitigkeiten oder klinischen Diagnosen).</p>
        <p>Zu den wichtigsten ethischen Grundsätzen gehören:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Kompetenz:</strong> Der Anwender muss für den spezifischen Test qualifiziert sein und seine Grenzen kennen.</li>
            <li><strong>Einwilligung nach Aufklärung (Informed Consent):</strong> Die Testperson muss über den Zweck des Tests und die Verwendung der Ergebnisse aufgeklärt werden und zustimmen.</li>
            <li><strong>Vertraulichkeit:</strong> Die Testergebnisse sind streng vertraulich und dürfen nur mit Zustimmung der Person weitergegeben werden.</li>
            <li><strong>Verantwortungsvolle Interpretation:</strong> Ein Testergebnis darf niemals isoliert betrachtet werden. Es muss immer im Kontext der gesamten Person, ihrer Lebensgeschichte und der Testsituation interpretiert werden. Ein einzelner Zahlenwert (wie der IQ) kann niemals einen Menschen vollständig beschreiben.</li>
        </ul>
    </div>
);
const uebungenData5: UebungenData = {
    quiz: [
        { q: "Das statistische Aussortieren von schlechten Fragen in der Testentwicklung nennt man...", a: ["Normierung", "Standardisierung", "Itemanalyse"], correct: 2 },
        { q: "Wenn ein Test systematisch eine bestimmte kulturelle Gruppe benachteiligt, spricht man von...", a: ["Messfehler", "Geringer Reliabilität", "Kulturellem Bias"], correct: 2 },
    ],
    open: [
        { q: "Warum sollte ein einzelner IQ-Wert niemals die alleinige Grundlage für eine wichtige Lebensentscheidung (z.B. eine Schulwahl) sein?", solution: "Weil ein IQ-Wert immer nur eine Schätzung des &apos;wahren&apos; Werts ist und mit einem Messfehler behaftet ist. Zudem misst er nur einen Ausschnitt der menschlichen Fähigkeiten (logisch-abstraktes Denken) und ignoriert andere wichtige Bereiche wie Kreativität, soziale oder emotionale Intelligenz. Eine so wichtige Entscheidung sollte immer auf einer breiten Basis von Informationen (Schulnoten, Lehrerurteile, Interessen, Persönlichkeit) beruhen." },
    ],
    kreativ: "Entwerfen Sie eine Testfrage für einen Intelligenztest, die Ihrer Meinung nach einen starken kulturellen Bias zugunsten von jungen, technikaffinen Menschen aus Westeuropa hat."
};
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;

// --- MODUL-LISTE (VOLLSTÄNDIG) ---
// KORRIGIERTER TYP: PsychometricsModule[]
const psychometricsModules: PsychometricsModule[] = [
    { id: 1, title: "Grundlagen der Psychometrie", content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: "Gütekriterien: Reliabilität", content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: "Gütekriterien: Validität", content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: "Intelligenzmessung", content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: "Testkonstruktion & Ethische Aspekte", content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = psychometricsModules.find(m => m.id === moduleId);

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/9" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Übersicht der Psychologischen Diagnostik</span>
            </Link>
        </div>
    );
  }
  
  const contentKey = type as keyof typeof moduleData.content;
  const content = moduleData.content[contentKey] || "Inhalt nicht verfügbar.";
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${moduleData.title}`;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <Link href="/modules/9" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Übersicht der Psychologischen Diagnostik</span>
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