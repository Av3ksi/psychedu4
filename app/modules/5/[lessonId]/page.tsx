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
interface PerceptionModule {
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

// Modul 1: Einführung
const grundwissenInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Unsere Wahrnehmung der Welt ist keine passive Kopie der Realität. Sie ist ein aktiver Prozess, der aus zwei Teilen besteht:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Empfindung (Sensation):</strong> Der Prozess, bei dem unsere Sinnesrezeptoren (Augen, Ohren, Haut etc.) physikalische Energie aus der Umwelt empfangen und in neuronale Signale umwandeln. Dies ist ein Bottom-Up-Prozess.</li>
            <li><strong>Wahrnehmung (Perception):</strong> Der Prozess, bei dem unser Gehirn diese sensorischen Informationen organisiert, interpretiert und ihnen eine Bedeutung verleiht. Dies ist ein Top-Down-Prozess, der stark von unseren Erfahrungen, Erwartungen und unserem Wissen beeinflusst wird.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Psychophysik: Die Messung der Wahrnehmung</h3>
        <p>Die Psychophysik untersucht die Beziehung zwischen physikalischen Reizen und der psychischen Erfahrung, die sie hervorrufen. Zentrale Konzepte sind:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Absolutschwelle:</strong> Die minimale Intensität eines Reizes, die erforderlich ist, um ihn in 50% der Fälle wahrzunehmen.</li>
            <li><strong>Unterschiedsschwelle (Just Noticeable Difference, JND):</strong> Der kleinste Unterschied zwischen zwei Reizen, der in 50% der Fälle erkannt wird.</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p><strong>Webers Gesetz:</strong> Die Unterschiedsschwelle ist kein fester Wert, sondern proportional zur Intensität des Ausgangsreizes. Es ist leichter, den Unterschied zwischen 1kg und 2kg zu spüren als zwischen 100kg und 101kg.</p></div>
    </div>
);
const anwendbarkeitInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Konzepte der Wahrnehmungspsychologie sind überall im Produktdesign und Marketing zu finden.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Beispiel: Smartphone-Displays</h3>
        <p>Warum können Sie das Display Ihres Smartphones auch bei hellem Sonnenlicht noch ablesen? Die Hersteller nutzen das Wissen über die **Absolutschwelle** und **Unterschiedsschwellen**.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Helligkeit (Absolutschwelle):</strong> Die maximale Helligkeit des Displays muss hoch genug sein, um die Absolutschwelle für die Wahrnehmung von Pixeln auch bei starkem Umgebungslicht zu überschreiten.</li>
            <li><strong>Kontrast (Unterschiedsschwelle):</strong> Damit Sie Text und Bilder erkennen können, muss der Helligkeitsunterschied zwischen benachbarten Pixeln (z.B. schwarze Schrift auf weissem Grund) über der Unterschiedsschwelle liegen. Moderne Displays passen den Kontrast dynamisch an das Umgebungslicht an, um dies zu gewährleisten.</li>
        </ul>
    </div>
);
const meisterklasseInhalt1 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Signalentdeckungstheorie</h3>
        <p>Die klassische Schwellentheorie ist zu einfach. Ob wir einen schwachen Reiz (Signal) wahrnehmen, hängt nicht nur von seiner Intensität ab, sondern auch von psychologischen Faktoren wie unserer Erwartung, Motivation und Wachsamkeit. Die Signalentdeckungstheorie modelliert dies, indem sie zwischen zwei Aspekten unterscheidet:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Sensitivität (d&apos;):</strong> Die tatsächliche Fähigkeit, zwischen dem Signal und dem Hintergrundrauschen zu unterscheiden.</li>
            <li><strong>Antwortkriterium (Bias):</strong> Die Tendenz einer Person, eher &quot;Ja, ich habe es wahrgenommen&quot; oder &quot;Nein&quot; zu sagen. Ein liberales Kriterium führt zu vielen Treffern, aber auch zu vielen falschen Alarmen. Ein konservatives Kriterium vermeidet falsche Alarme, verpasst aber auch mehr Signale.</li>
        </ul>
        <p><strong>Anwendung:</strong> Dieses Modell ist entscheidend für die Bewertung der Leistung von z.B. Radiologen, die nach Tumoren auf Röntgenbildern suchen. Ein Fehler kann hier fatale Konsequenzen haben, und die Theorie hilft zu verstehen, ob ein Fehler auf mangelnde Sensitivität oder ein ungünstig gesetztes Antwortkriterium zurückzuführen ist.</p>
    </div>
);
const uebungenData1: UebungenData = {
    quiz: [
        { q: "Der Prozess, bei dem das Gehirn Sinneseindrücke interpretiert, heisst...", a: ["Empfindung (Sensation)", "Wahrnehmung (Perception)", "Transduktion"], correct: 1 },
        { q: "Die minimale Reizintensität, die in 50% der Fälle erkannt wird, ist die...", a: ["Unterschiedsschwelle", "Absolutschwelle", "Reizschwelle"], correct: 1 },
    ],
    open: [
        { q: "Erkläre den Unterschied zwischen Bottom-Up- und Top-Down-Verarbeitung im Kontext der Wahrnehmung.", solution: "Bottom-Up-Verarbeitung beginnt bei den Sinnesrezeptoren und arbeitet sich &apos;nach oben&apos; zum Gehirn. Es ist die datengesteuerte Analyse der sensorischen Informationen. Top-Down-Verarbeitung ist konzeptgesteuert; unser Gehirn nutzt unser Wissen, unsere Erwartungen und Erfahrungen, um die Sinneseindrücke zu interpretieren und ihnen Bedeutung zu geben." },
    ],
    kreativ: "Beschreibe eine Alltagssituation, in der deine Erwartungen (Top-Down-Prozess) deine Wahrnehmung (Bottom-Up-Daten) stark beeinflusst oder sogar getäuscht haben."
};
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;

// --- INHALTE FÜR MODUL 2: Visuelles System ---
const grundwissenInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Das Sehen ist unser dominantester Sinn. Es beginnt damit, dass Lichtwellen ins Auge eintreten und auf der Netzhaut (Retina) fokussiert werden.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Aufbau des Auges</h3>
        <p>Licht passiert die Hornhaut (Cornea), die Pupille und die Linse, bevor es die Netzhaut am Augenhintergrund erreicht. Dort befinden sich die Fotorezeptoren:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Stäbchen (Rods):</strong> Ca. 120 Millionen, hauptsächlich in der Peripherie der Netzhaut. Sie sind extrem lichtempfindlich und für das Sehen bei Nacht und die Wahrnehmung von Bewegung zuständig, können aber keine Farben unterscheiden.</li>
            <li><strong>Zapfen (Cones):</strong> Ca. 6 Millionen, konzentriert im Zentrum der Netzhaut (Fovea). Sie benötigen viel Licht, sind aber für das Farbensehen und das scharfe Detailsehen verantwortlich. Es gibt drei Typen: für kurzwelliges (blau), mittelwelliges (grün) und langwelliges (rot) Licht.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Vom Auge zum Gehirn</h3>
        <p>Die Signale der Fotorezeptoren werden über Bipolar- und Ganglienzellen gebündelt. Die Axone der Ganglienzellen bilden den Sehnerv, der das Auge am Blinden Fleck verlässt. Die Sehnerven kreuzen sich im Chiasma opticum, sodass Informationen aus dem linken Gesichtsfeld in der rechten Gehirnhälfte und umgekehrt verarbeitet werden. Das Hauptziel ist der visuelle Kortex im Okzipitallappen.</p>
    </div>
);
const anwendbarkeitInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Wenn Sie nachts einen schwachen Stern am Himmel sehen wollen, sollten Sie eine bestimmte Technik anwenden, die direkt aus der Anatomie des Auges abgeleitet ist.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Technik des peripheren Sehens</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Falscher Ansatz:</strong> Direkt auf den Stern blicken. Wenn Sie das tun, fällt das schwache Licht des Sterns genau auf Ihre Fovea, den zentralen Punkt der Netzhaut.</li>
            <li><strong>Problem:</strong> In der Fovea gibt es fast nur Zapfen, die für schwaches Licht unempfindlich sind. Der Stern scheint zu verschwinden.</li>
            <li><strong>Korrekter Ansatz:</strong> Schauen Sie leicht **neben** den Stern. Dadurch fällt das Licht auf die Peripherie Ihrer Netzhaut.</li>
            <li><strong>Warum das funktioniert:</strong> In der Peripherie befinden sich die Stäbchen. Diese sind extrem lichtempfindlich und perfekt dafür geeignet, das schwache Licht des Sterns zu detektieren. Sie werden den Stern als grauen Lichtpunkt klar erkennen können.</li>
        </ul>
        <p>Dieses Wissen über die Verteilung von Stäbchen und Zapfen wird von Astronomen und Piloten seit jeher genutzt.</p>
    </div>
);
const meisterklasseInhalt2 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Farbensehen: Trichromatische Theorie vs. Gegenfarbtheorie</h3>
        <p>Wie sehen wir Farben? Zwei Theorien erklären verschiedene Aspekte dieses Phänomens, und beide sind korrekt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Trichromatische Theorie (Young-Helmholtz):</strong> Besagt, dass wir drei verschiedene Arten von Zapfenrezeptoren haben, die jeweils auf Rot, Grün und Blau empfindlich reagieren. Jede Farbe, die wir sehen, ist eine Mischung der Aktivität dieser drei Zapfentypen. Diese Theorie erklärt das Farbensehen auf der **Ebene der Rezeptoren**. Sie erklärt gut, wie Farbenblindheit funktioniert (wenn ein Zapfentyp fehlt oder defekt ist).</li>
            <li><strong>Gegenfarbtheorie (Hering):</strong> Besagt, dass das visuelle System Farben in antagonistischen Paaren verarbeitet: Rot-Grün, Blau-Gelb und Schwarz-Weiss. Die Aktivierung einer Farbe in einem Paar hemmt die andere. Diese Theorie erklärt das Phänomen der **Nachbilder**: Wenn Sie lange auf eine grüne Fläche starren und dann auf eine weisse Wand blicken, sehen Sie ein rotes Nachbild. Dies geschieht auf der **Ebene der Ganglienzellen** und im Gehirn.</li>
        </ul>
        <p>Moderne Forschung zeigt, dass beide Theorien auf unterschiedlichen Stufen des visuellen Systems zutreffen und sich gegenseitig ergänzen.</p>
    </div>
);
const uebungenData2: UebungenData = {
    quiz: [
        { q: "Welche Fotorezeptoren sind für das Farbensehen verantwortlich?", a: ["Stäbchen", "Zapfen", "Ganglienzellen"], correct: 1 },
        { q: "Der Blinde Fleck im Auge ist der Punkt, an dem...", a: ["sich die Fovea befindet.", "der Sehnerv das Auge verlässt.", "die meisten Stäbchen sind."], correct: 1 },
    ],
    open: [
        { q: "Warum können wir nachts keine Farben sehen?", solution: "Nachts ist das Licht zu schwach, um die Zapfen zu aktivieren, die für das Farbensehen zuständig sind. Wir sehen hauptsächlich mit den Stäbchen, die sehr lichtempfindlich sind, aber keine Farbinformationen verarbeiten können. Daher erscheint die Welt nachts in Grautönen." },
    ],
    kreativ: "Starren Sie für 30 Sekunden auf ein helles, einfarbiges Objekt (z.B. ein grünes Post-it) und blicken Sie dann auf eine leere weisse Wand. Beschreiben Sie das Nachbild und erklären Sie es mit der Gegenfarbtheorie."
};
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;

// --- INHALTE FÜR MODUL 3: Auditives System ---
const grundwissenInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Hören ist der Prozess, bei dem wir Schallwellen – also Druckschwankungen in der Luft – wahrnehmen. Das Ohr ist ein bemerkenswertes Organ, das diese mechanischen Schwingungen in elektrische Nervenimpulse umwandelt.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Der Weg des Schalls durch das Ohr</h3>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Aussenohr:</strong> Die Ohrmuschel fängt die Schallwellen ein und leitet sie durch den Gehörgang zum Trommelfell.</li>
            <li><strong>Mittelohr:</strong> Das Trommelfell vibriert und versetzt die drei Gehörknöchelchen (Hammer, Amboss, Steigbügel) in Schwingung. Diese verstärken die Vibration und übertragen sie auf das ovale Fenster.</li>
            <li><strong>Innenohr:</strong> Die Schwingungen des ovalen Fensters versetzen die Flüssigkeit in der Cochlea (Hörschnecke) in Bewegung. Innerhalb der Cochlea befindet sich die Basilarmembran, auf der Tausende von winzigen Haarzellen sitzen. Die Bewegung der Flüssigkeit biegt diese Haarzellen.</li>
            <li><strong>Transduktion:</strong> Das Biegen der Haarzellen löst einen Nervenimpuls aus, der über den Hörnerv an das Gehirn (insbesondere den auditorischen Kortex im Temporallappen) weitergeleitet wird.</li>
        </ol>
    </div>
);
const anwendbarkeitInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Hörverlust ist ein weit verbreitetes Problem. Das Verständnis des Hörprozesses erklärt, wie moderne Technologien wie Cochlea-Implantate funktionieren.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Was ist ein Cochlea-Implantat?</h3>
        <p>Ein herkömmliches Hörgerät verstärkt lediglich den Schall und leitet ihn an ein funktionierendes Innenohr weiter. Ein Cochlea-Implantat ist eine viel radikalere Lösung für Menschen, deren **Haarzellen im Innenohr stark geschädigt oder nicht vorhanden** sind.</p>
        <p>Das Implantat umgeht die beschädigten Teile des Ohrs vollständig:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Ein externes Mikrofon nimmt den Schall auf.</li>
            <li>Ein Sprachprozessor wandelt den Schall in digitale Signale um.</li>
            <li>Diese Signale werden an einen internen Empfänger unter der Haut gesendet.</li>
            <li>Der Empfänger leitet die Signale an eine Elektrode weiter, die direkt in die Cochlea eingeführt wurde.</li>
            <li>Die Elektrode **stimuliert den Hörnerv direkt** mit elektrischen Impulsen und ahmt so die Funktion der fehlenden Haarzellen nach.</li>
        </ul>
        <p>Das Gehirn lernt dann, diese neuen elektrischen Signale als Klang zu interpretieren. Es ist ein beeindruckendes Beispiel dafür, wie Technologie die Funktion eines unserer komplexesten Sinnesorgane ersetzen kann.</p>
    </div>
);
const meisterklasseInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Wie kodieren wir die Tonhöhe? Ort vs. Frequenz</h3>
        <p>Wie unterscheidet unser Gehirn zwischen einem hohen und einem tiefen Ton? Zwei Theorien erklären dies, und wie beim Sehen treffen beide für unterschiedliche Frequenzbereiche zu:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Ortstheorie (Place Theory):</strong> Besagt, dass verschiedene Frequenzen unterschiedliche **Orte** auf der Basilarmembran in der Cochlea maximal stimulieren. Hohe Frequenzen stimulieren den Anfang der Membran (nahe dem ovalen Fenster), tiefe Frequenzen das Ende. Das Gehirn interpretiert die Tonhöhe basierend darauf, *welche* Haarzellen feuern. Diese Theorie erklärt das Hören hoher Töne sehr gut.</li>
            <li><strong>Frequenztheorie (Temporal Theory):</strong> Besagt, dass die gesamte Basilarmembran im Rhythmus der Schallwelle mitschwingt. Die Feuerrate der Neuronen im Hörnerv entspricht der Frequenz des Tons. Das Gehirn interpretiert die Tonhöhe basierend darauf, *wie schnell* die Neuronen feuern. Diese Theorie erklärt das Hören tiefer Töne sehr gut.</li>
        </ul>
    </div>
);
const uebungenData3: UebungenData = {
    quiz: [
        { q: "Wo findet die Transduktion von Schall in Nervenimpulse statt?", a: ["Im Trommelfell", "In den Gehörknöchelchen", "In der Cochlea (Haarzellen)"], correct: 2 },
        { q: "Welche Theorie besagt, dass die Tonhöhe durch den Ort der Stimulation auf der Basilarmembran kodiert wird?", a: ["Frequenztheorie", "Ortstheorie", "Gegenfarbtheorie"], correct: 1 },
    ],
    open: [
        { q: "Erkläre kurz, wie wir die Richtung einer Schallquelle lokalisieren können.", solution: "Wir nutzen zwei Hauptmechanismen: 1. Interaurale Zeitdifferenz: Ein Schall von links erreicht das linke Ohr einen winzigen Bruchteil einer Sekunde früher als das rechte. 2. Interaurale Intensitätsdifferenz: Der Kopf wirft einen &apos;Schallschatten&apos;, sodass der Schall am abgewandten Ohr etwas leiser ist. Das Gehirn berechnet aus diesen minimalen Unterschieden die Richtung." },
    ],
    kreativ: "Warum ist es in einem komplett schalltoten Raum so unangenehm? Was sagt das über die 'normale' Funktion unseres Gehörs aus?"
};
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;

// --- INHALTE FÜR MODUL 4: Die Körpersinne ---
const grundwissenInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Somatosensorik umfasst eine Gruppe von Sinnen, die uns über unseren eigenen Körper und den direkten Kontakt mit der Umwelt informieren.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Hauptkomponenten</h3>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li><strong>Tastsinn (Taktile Wahrnehmung):</strong> Verschiedene Rezeptoren in der Haut reagieren auf Druck, Vibration und Textur.</li>
            <li><strong>Thermorezeption:</strong> Rezeptoren für Kälte und Wärme.</li>
            <li><strong>Nozizeption (Schmerzwahrnehmung):</strong> Freie Nervenendigungen, die auf potenziell schädliche Reize reagieren.</li>
            <li><strong>Propriozeption:</strong> Rezeptoren in Muskeln und Gelenken, die dem Gehirn kontinuierlich die Position und Bewegung unserer Gliedmassen melden. (Schliessen Sie die Augen und führen Sie den Finger zur Nase – das ist Propriozeption!).</li>
            <li><strong>Vestibulärer Sinn:</strong> Flüssigkeitsgefüllte Bogengänge im Innenohr, die Kopfbewegungen und die Schwerkraft registrieren und für unser Gleichgewicht entscheidend sind.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Schmerz ist mehr als nur ein einfaches Signal. Die **Gate-Control-Theorie** von Melzack und Wall erklärt, warum psychologische Faktoren unsere Schmerzwahrnehmung so stark beeinflussen können.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das &quot;Tor&quot; im Rückenmark</h3>
        <p>Die Theorie postuliert ein neurologisches &quot;Tor&quot; im Rückenmark, das Schmerzsignale auf ihrem Weg zum Gehirn entweder durchlässt oder blockiert.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>&quot;Tor öffnen&quot; (Schmerz wird verstärkt):</strong> Negative Emotionen wie Angst und Depression, aber auch das ständige Fokussieren auf den Schmerz, können das Tor öffnen und die Schmerzwahrnehmung intensivieren.</li>
            <li><strong>&quot;Tor schliessen&quot; (Schmerz wird gelindert):</strong> Positive Emotionen, Ablenkung (z.B. bei Sportlern, die verletzt weiterspielen) oder auch die Stimulation anderer Hautrezeptoren (z.B. das Reiben der schmerzenden Stelle) können das Tor schliessen und die Schmerzsignale blockieren.</li>
        </ul>
        <p><strong>Anwendung:</strong> Diese Theorie erklärt, warum Entspannungstechniken, Ablenkung (z.B. durch virtuelle Realität bei schmerzhaften medizinischen Prozeduren) und eine positive psychische Verfassung wirksame Methoden zur Schmerzbewältigung sind.</p>
    </div>
);
const meisterklasseInhalt4 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Phantomschmerz und Neuroplastizität</h3>
        <p>Phantomschmerz – das Empfinden von Schmerz in einer amputierten Gliedmasse – ist ein faszinierendes und quälendes Phänomen. Es liefert einen eindrücklichen Beweis für die **Neuroplastizität** des Gehirns, also seine Fähigkeit, sich neu zu organisieren.</p>
        <p>Nach einer Amputation erhalten die Areale im somatosensorischen Kortex, die früher für die Gliedmasse zuständig waren, keine Signale mehr. Benachbarte Kortexareale, z.B. die für das Gesicht, beginnen dann, in dieses &quot;leere&quot; Areal &quot;hineinzuwachsen&quot;.</p>
        <p><strong>Die Konsequenz:</strong> Wenn nun das Gesicht des Patienten berührt wird, kann dies gleichzeitig eine Empfindung in der Phantomhand auslösen. Diese widersprüchlichen Signale können vom Gehirn als Schmerz interpretiert werden. Eine berühmte Therapie hierfür ist die **Spiegeltherapie**, bei der der Patient seine gesunde Hand in einen Spiegel schaut, was dem Gehirn die visuelle Illusion vermittelt, die amputierte Hand sei wieder vorhanden und bewege sich normal, was den Schmerz lindern kann.</p>
    </div>
);
const uebungenData4: UebungenData = {
    quiz: [
        { q: "Welcher Sinn ist für unser Gleichgewicht verantwortlich?", a: ["Propriozeption", "Vestibulärer Sinn", "Nozizeption"], correct: 1 },
        { q: "Die Gate-Control-Theorie erklärt die Wahrnehmung von...", a: ["Temperatur", "Berührung", "Schmerz"], correct: 2 },
    ],
    open: [
        { q: "Warum spüren Sie einen Mückenstich oft erst, nachdem Sie die Mücke gesehen haben?", solution: "Dies illustriert die Gate-Control-Theorie und Top-Down-Einflüsse. Solange Ihre Aufmerksamkeit auf etwas anderes gerichtet ist, kann das &apos;Tor&apos; für das schwache Schmerzsignal geschlossen bleiben. Sobald Sie die Mücke sehen (visueller Input), lenkt Ihr Gehirn die Aufmerksamkeit auf die Stelle und &apos;öffnet&apos; das Tor, sodass Sie den Schmerz bewusst wahrnehmen." },
    ],
    kreativ: "Die Propriozeption ist der 'stille' Sinn. Beschreiben Sie drei alltägliche Aktivitäten, die ohne eine funktionierende Propriozeption fast unmöglich wären."
};
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;

// --- INHALTE FÜR MODUL 5: Geschmack & Geruch ---
const grundwissenInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Geschmack (Gustatorik) und Geruch (Olfaktorik) sind unsere **chemischen Sinne**. Sie reagieren auf Moleküle in der Nahrung und in der Luft.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Der Geschmackssinn</h3>
        <p>Die Zunge ist mit Geschmacksknospen bedeckt, die Rezeptoren für fünf Grundgeschmacksrichtungen enthalten:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Süss:</strong> Detektiert energiereiche Zucker.</li>
            <li><strong>Salzig:</strong> Detektiert für den Körper essentielle Salze.</li>
            <li><strong>Sauer:</strong> Warnt vor potenziell unreifen oder verdorbenen Lebensmitteln.</li>
            <li><strong>Bitter:</strong> Warnt vor potenziellen Giften (viele giftige Alkaloide sind bitter).</li>
            <li><strong>Umami:</strong> Detektiert Aminosäuren (Proteine), oft als &quot;herzhaft&quot; oder &quot;fleischig&quot; beschrieben.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Der Geruchssinn</h3>
        <p>Geruchsmoleküle in der Luft binden an Geruchsrezeptoren in der Nasenhöhle. Der Mensch hat etwa 350 verschiedene Arten von Geruchsrezeptoren, kann aber durch deren kombinatorische Aktivierung Tausende verschiedener Gerüche unterscheiden. Einzigartig am Geruchssinn ist sein direkter Weg zum limbischen System (Amygdala, Hippocampus), dem Emotions- und Gedächtniszentrum des Gehirns.</p>
    </div>
);
const anwendbarkeitInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Haben Sie sich jemals gefragt, warum Essen bei einer starken Erkältung so langweilig und fad schmeckt?</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Geschmack vs. Flavour</h3>
        <p>Der Grund liegt in der Unterscheidung zwischen **Geschmack (Taste)** und dem, was wir im Englischen **Flavour** nennen (Aroma/Geschmackserlebnis).</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Geschmack:</strong> Ist nur das, was die Zunge wahrnimmt – die fünf Grundgeschmacksrichtungen (süss, salzig, sauer, bitter, umami).</li>
            <li><strong>Flavour:</strong> Ist das komplexe Gesamterlebnis, das sich aus der **Kombination von Geschmack und Geruch** zusammensetzt.</li>
        </ul>
        <p>Wenn wir kauen, werden Geruchsmoleküle aus der Nahrung freigesetzt und steigen über den Rachenraum in die Nasenhöhle auf (retronasale Olfaktion). Das Gehirn integriert diese Geruchsinformationen mit den Geschmacksinformationen von der Zunge zu einem einheitlichen Flavour-Erlebnis.</p>
        <p>Bei einer Erkältung ist die Nase verstopft, dieser retronasale Weg ist blockiert. Sie können immer noch schmecken, ob etwas süss oder salzig ist, aber die komplexen Aromen (z.B. von Erdbeere, Schokolade oder Kaffee), die hauptsächlich über den Geruchssinn wahrgenommen werden, fehlen. Das Essen schmeckt daher &quot;nach nichts&quot;.</p>
    </div>
);
const meisterklasseInhalt5 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Proust-Effekt: Die Macht der Geruchserinnerungen</h3>
        <p>Der Geruchssinn ist der einzige Sinn, dessen Signale nicht zuerst durch den Thalamus (die &quot;Schaltzentrale&quot; des Gehirns) geleitet werden. Stattdessen hat er eine direkte und evolutionär alte Verbindung zum **limbischen System**, insbesondere zur **Amygdala** (Emotionszentrum) und zum **Hippocampus** (Gedächtniszentrum).</p>
        <p>Diese einzigartige neuroanatomische Verknüpfung ist der Grund für den **Proust-Effekt**: die Fähigkeit von Gerüchen, extrem lebhafte, emotionale und detaillierte autobiografische Erinnerungen auszulösen. Der Geruch von frisch gebackenem Kuchen kann Sie augenblicklich in die Küche Ihrer Grossmutter zurückversetzen, mit allen damit verbundenen Gefühlen.</p>
        <p>Kein anderer Sinn hat eine so starke und unmittelbare Verbindung zu unseren tiefsten Erinnerungen und Emotionen.</p>
    </div>
);
const uebungenData5: UebungenData = {
    quiz: [
        { q: "Welche ist KEINE der fünf Grundgeschmacksrichtungen?", a: ["Süss", "Sauer", "Scharf"], correct: 2 },
        { q: "Welcher Sinn hat eine besonders direkte Verbindung zum Emotions- und Gedächtniszentrum des Gehirns?", a: ["Sehen", "Hören", "Riechen"], correct: 2 },
    ],
    open: [
        { q: "Erkläre den Unterschied zwischen Geschmack (Taste) und Flavour.", solution: "Geschmack bezieht sich nur auf die fünf Grundqualitäten, die von der Zunge detektiert werden (süss, salzig, sauer, bitter, umami). Flavour ist das reichhaltigere Gesamterlebnis, das durch die Integration von Geschmack, Geruch (retronasal), Textur und Temperatur im Gehirn entsteht." },
    ],
    kreativ: "Die Lebensmittelindustrie nutzt die Wahrnehmungspsychologie exzessiv. Nenne zwei Beispiele, wie ein Hersteller von Kartoffelchips (abgesehen vom Geschmack) das sensorische Erlebnis des Produkts verbessern könnte."
};
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;

// --- INHALTE FÜR MODUL 6: Wahrnehmungsorganisation ---
const grundwissenInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Unsere Sinnesorgane liefern uns ein Mosaik aus einzelnen Fragmenten – Lichtpunkte, Frequenzen, Druckpunkte. Die Wahrnehmungsorganisation ist der Prozess, bei dem unser Gehirn diese Fragmente zu sinnvollen, kohärenten Ganzen (Objekten, Personen, Szenen) zusammensetzt.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Gestaltpsychologie</h3>
        <p>Die Pioniere auf diesem Gebiet waren die Gestaltpsychologen, deren zentrales Motto lautete: **&quot;Das Ganze ist mehr als die Summe seiner Teile.&quot;** Sie formulierten eine Reihe von Prinzipien (Gestaltgesetze), nach denen unser Gehirn sensorische Informationen automatisch gruppiert:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Gesetz der Nähe:</strong> Elemente, die nahe beieinander liegen, werden als zusammengehörig wahrgenommen.</li>
            <li><strong>Gesetz der Ähnlichkeit:</strong> Ähnliche Elemente werden als zusammengehörig wahrgenommen.</li>
            <li><strong>Gesetz der guten Fortsetzung:</strong> Wir neigen dazu, Linien und Muster so wahrzunehmen, dass sie einen kontinuierlichen, glatten Verlauf bilden.</li>
            <li><strong>Gesetz der Geschlossenheit:</strong> Wir neigen dazu, unvollständige Figuren mental zu vervollständigen und als geschlossene Objekte wahrzunehmen.</li>
            <li><strong>Figur-Grund-Trennung:</strong> Unsere Wahrnehmung trennt automatisch ein Objekt (die Figur) von seinem Hintergrund.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Gutes User Interface (UI) und Grafikdesign basiert fast vollständig auf der intuitiven Anwendung der Gestaltgesetze. Designer nutzen sie, um Informationen schnell und verständlich zu strukturieren.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Beispiel: Eine Webseite</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Gesetz der Nähe:</strong> Ein Bild und die dazugehörige Bildunterschrift stehen nahe beieinander, während der Abstand zum nächsten Absatz grösser ist. Dadurch wissen wir sofort, dass sie zusammengehören. Schaltflächen in einer Navigationsleiste, die zusammengehören, sind gruppiert.</li>
            <li><strong>Gesetz der Ähnlichkeit:</strong> Alle klickbaren Links auf einer Seite haben die gleiche Farbe (z.B. blau). Dadurch gruppieren wir sie mental als &quot;interaktive Elemente&quot;.</li>
            <li><strong>Gesetz der Geschlossenheit:</strong> Ein Lade-Icon, das nur aus einem unvollständigen Kreis besteht, der sich dreht, wird von uns mühelos als sich bewegender Kreis wahrgenommen.</li>
        </ul>
        <p>Durch die bewusste Anwendung dieser Prinzipien können Designer die kognitive Last für den Benutzer reduzieren und die Bedienung einer Oberfläche intuitiv gestalten.</p>
    </div>
);
const meisterklasseInhalt6 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Wahrnehmungskonstanz: Die stabile Welt</h3>
        <p>Obwohl sich das Bild, das auf unsere Netzhaut projiziert wird, ständig ändert, nehmen wir die Welt als stabil und unveränderlich wahr. Dieses Phänomen nennt man Wahrnehmungskonstanz.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Grössenkonstanz:</strong> Eine Person, die sich von uns entfernt, wird auf unserer Netzhaut kleiner, aber wir nehmen sie nicht als &quot;schrumpfend&quot; wahr. Unser Gehirn korrigiert die Grösse basierend auf der wahrgenommenen Entfernung.</li>
            <li><strong>Formkonstanz:</strong> Eine sich öffnende Tür projiziert eine Serie von Trapez-Formen auf unsere Netzhaut, aber wir nehmen sie konstant als rechteckige Tür wahr.</li>
            <li><strong>Helligkeits- und Farbkonstanz:</strong> Ein weisses Blatt Papier erscheint uns weiss, egal ob wir es im hellen Sonnenlicht oder im schattigen Raum betrachten, obwohl die absolute Lichtmenge, die es reflektiert, dramatisch unterschiedlich ist.</li>
        </ul>
        <p>Diese Top-Down-Prozesse sind entscheidend dafür, dass wir in einer sich ständig ändernden sensorischen Umgebung eine stabile und vorhersagbare Welt erleben. Optische Täuschungen entstehen oft dann, wenn diese an sich nützlichen Mechanismen falsch angewendet werden.</p>
    </div>
);
const uebungenData6: UebungenData = {
    quiz: [
        { q: "Das Motto 'Das Ganze ist mehr als die Summe seiner Teile' stammt von der...", a: ["Behavioristischen Psychologie", "Gestaltpsychologie", "Psychophysik"], correct: 1 },
        { q: "Wenn Sie Buttons, die zusammengehören, auf einer Webseite nahe beieinander platzieren, nutzen Sie das Gesetz der...", a: ["Ähnlichkeit", "Geschlossenheit", "Nähe"], correct: 2 },
    ],
    open: [
        { q: "Beschreiben Sie das Prinzip der Figur-Grund-Trennung anhand eines Beispiels.", solution: "Wenn Sie diesen Text lesen, nehmen Sie die schwarzen Buchstaben als 'Figur' und den weissen Bildschirm als 'Hintergrund' wahr. Es ist für unser Gehirn fast unmöglich, dies umzukehren und den weissen Raum als Figur wahrzunehmen. Kippfiguren wie die 'Rubinsche Vase' spielen gezielt mit diesem Prinzip, da Figur und Grund mehrdeutig sind." },
    ],
    kreativ: "Suchen Sie das Logo einer bekannten Marke (z.B. FedEx, WWF, Amazon). Analysieren Sie, welche Gestaltprinzipien in dem Logo verwendet werden, um eine bestimmte Botschaft zu vermitteln oder die Wahrnehmung zu lenken."
};
const uebungenInhalt6 = <UebungenContent data={uebungenData6} />;

// --- INHALTE FÜR MODUL 7: Multimodale Wahrnehmung ---
const grundwissenInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Unsere Wahrnehmung ist selten auf einen einzigen Sinn beschränkt. **Multimodale Wahrnehmung** ist der normale Prozess, bei dem unser Gehirn Informationen aus verschiedenen Sinneskanälen (Sehen, Hören, Fühlen etc.) integriert, um ein robustes und einheitliches Bild der Welt zu erzeugen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Prinzipien der Integration</h3>
        <p>Das Gehirn kombiniert Signale am ehesten, wenn sie...</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>...zeitlich zusammenfallen (zeitliche Koinzidenz):</strong> Ein Knall und ein Lichtblitz werden als zusammengehörig wahrgenommen, wenn sie gleichzeitig auftreten.</li>
            <li><strong>...räumlich zusammenfallen (räumliche Koinzidenz):</strong> Wenn Sie eine Stimme hören und gleichzeitig sehen, wie sich an diesem Ort Lippen bewegen, ordnen Sie die Stimme den Lippen zu (Bauchredner-Effekt).</li>
            <li><strong>...semantisch übereinstimmen:</strong> Das Geräusch eines Miauens passt zum Bild einer Katze, aber nicht zu dem eines Hundes.</li>
        </ul>
        <p>Wenn Signale widersprüchlich sind, dominiert oft der zuverlässigste Sinn – meistens das Sehen.</p>
    </div>
);
const anwendbarkeitInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Der **McGurk-Effekt** ist ein verblüffendes und berühmtes Beispiel dafür, wie stark unsere visuelle Wahrnehmung unsere auditive Wahrnehmung beeinflussen kann. Er demonstriert die Integration von Sehen und Hören.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das Experiment</h3>
        <p>Versuchspersonen sehen ein Video von einer Person, die wiederholt die Silbe &quot;GA-GA&quot; artikuliert. Gleichzeitig wird aber über den Lautsprecher die Silbe &quot;BA-BA&quot; abgespielt.</p>
        <p><strong>Das verblüffende Ergebnis:</strong> Die meisten Menschen hören weder &quot;GA&quot; noch &quot;BA&quot;, sondern eine dritte Silbe: &quot;DA-DA&quot;. Ihr Gehirn versucht, den widersprüchlichen Input zu einem sinnvollen Ganzen zu verschmelzen.</p>
        <p>Wenn die Person dann die Augen schliesst und nur zuhört, hört sie klar und deutlich &quot;BA-BA&quot;. Sobald sie die Augen wieder öffnet, springt die Wahrnehmung sofort zurück zu &quot;DA-DA&quot;.</p>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Anwendung:</strong> Dies zeigt, dass das Verstehen von Sprache kein reiner Hörprozess ist. Wir nutzen Lippenlesen unbewusst viel stärker, als wir denken. Es erklärt auch, warum Videokonferenzen mit guter Bildqualität oft verständlicher sind als reine Telefonate und warum Untertitel in Filmen das Sprachverständnis so stark verbessern.</p></div>
    </div>
);
const meisterklasseInhalt7 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Synästhesie: Die Vermischung der Sinne</h3>
        <p>Synästhesie ist ein seltenes, aber faszinierendes neurologisches Phänomen, bei dem die Aktivierung eines Sinneskanals automatisch und unwillkürlich die Wahrnehmung in einem anderen Kanal auslöst. Es ist eine extreme Form der multimodalen Verknüpfung.</p>
        <p>Häufige Formen sind:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Graphem-Farb-Synästhesie:</strong> Buchstaben oder Zahlen werden konsistent mit bestimmten Farben wahrgenommen (z.B. &quot;Das A ist immer rot&quot;).</li>
            <li><strong>Chromästhesie:</strong> Töne oder Musik lösen die Wahrnehmung von Farben aus.</li>
            <li><strong>Lexikalisch-gustatorische Synästhesie:</strong> Bestimmte Wörter lösen ein Geschmackserlebnis aus.</li>
        </ul>
        <p>Synästhesie ist keine Krankheit, sondern eine besondere Art der Wahrnehmung. Die Forschung daran gibt uns tiefe Einblicke, wie das Gehirn normalerweise sensorische Informationen trennt und integriert und was passiert, wenn diese Trennung weniger strikt ist. Es wird vermutet, dass bei Synästheten eine stärkere neuronale Vernetzung zwischen benachbarten Hirnarealen für verschiedene Sinne besteht.</p>
    </div>
);
const uebungenData7: UebungenData = {
    quiz: [
        { q: "Der McGurk-Effekt ist ein Beispiel für die Interaktion zwischen...", a: ["Hören und Schmecken", "Sehen und Hören", "Fühlen und Sehen"], correct: 1 },
        { q: "Wenn eine Person Buchstaben immer in bestimmten Farben sieht, nennt man das...", a: ["Chromästhesie", "Synästhesie", "Akinetopsie"], correct: 1 },
    ],
    open: [
        { q: "Erkläre den 'Bauchredner-Effekt' (ventriloquism effect) mit den Prinzipien der multimodalen Wahrnehmung.", solution: "Der Bauchredner-Effekt tritt auf, weil unser Gehirn die Prinzipien der zeitlichen und räumlichen Koinzidenz anwendet. Wir hören die Stimme des Bauchredners (auditives Signal) und sehen gleichzeitig, wie sich der Mund der Puppe bewegt (visuelles Signal). Da die visuellen und auditiven Ereignisse am selben Ort und zur selben Zeit stattzufinden scheinen, integriert unser Gehirn sie zu einem einzigen Ereignis und lokalisiert die Schallquelle fälschlicherweise bei der Puppe." },
    ],
    kreativ: "Stellen Sie sich vor, Sie entwerfen ein immersives Virtual-Reality-Erlebnis. Nennen Sie drei Möglichkeiten, wie Sie gezielt die multimodale Wahrnehmung ansprechen würden, um die Immersion zu verstärken."
};
const uebungenInhalt7 = <UebungenContent data={uebungenData7} />;

// --- MODUL-LISTE (VOLLSTÄNDIG) ---
const perceptionPsychologyModules: PerceptionModule[] = [
    { id: 1, title: "Einführung: Empfindung & Wahrnehmung", content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: "Das Visuelle System", content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: "Das Auditive System", content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: "Die Körpersinne (Somatosensorik)", content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: "Die Chemischen Sinne: Geschmack & Geruch", content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
    { id: 6, title: "Wahrnehmungsorganisation & Gestaltprinzipien", content: { grundwissen: grundwissenInhalt6, anwendbarkeit: anwendbarkeitInhalt6, meisterklasse: meisterklasseInhalt6, uebungen: uebungenInhalt6 }},
    { id: 7, title: "Multimodale Wahrnehmung", content: { grundwissen: grundwissenInhalt7, anwendbarkeit: anwendbarkeitInhalt7, meisterklasse: meisterklasseInhalt7, uebungen: uebungenInhalt7 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = perceptionPsychologyModules.find(m => m.id === moduleId);

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/4" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Übersicht der Wahrnehmungspsychologie</span>
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
        <Link href="/modules/5" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Übersicht der Wahrnehmungspsychologie</span>
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