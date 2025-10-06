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
interface SocialPsychologyModule {
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

// --- INHALTE FÜR MODUL 1: Was ist Sozialpsychologie? ---
const grundwissenInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Sozialpsychologie ist das wissenschaftliche Studium davon, wie die Gedanken, Gefühle und Verhaltensweisen von Individuen durch die tatsächliche, vorgestellte oder implizite Anwesenheit anderer Menschen beeinflusst werden. Im Kern geht es um die Macht der sozialen Situation.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Situationismus vs. Dispositionismus</h3>
        <p>Dies ist die zentrale Debatte in der Sozialpsychologie:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Situationismus:</strong> Die Ansicht, dass unser Verhalten und unsere Handlungen durch unsere unmittelbare Umgebung und unser Umfeld bestimmt werden.</li>
            <li><strong>Dispositionismus:</strong> Die Ansicht, dass unser Verhalten durch innere Faktoren wie Persönlichkeitsmerkmale und Temperament bestimmt wird.</li>
        </ul>
        <p>Moderne Sozialpsychologen berücksichtigen beide Aspekte, aber in der westlichen Kultur neigen wir dazu, den dispositionellen Ansatz zu stark zu betonen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Der fundamentale Attributionsfehler</h3>
        <p>Dieser Denkfehler ist eine direkte Folge der Überbetonung des Dispositionismus. Wir neigen dazu, das Verhalten anderer Menschen auf ihre Persönlichkeit zurückzuführen (dispositionelle Attribution) und dabei den Einfluss der Situation (situationale Attribution) massiv zu unterschätzen.</p>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p><strong>Beispiel:</strong> Wenn jemand im Strassenverkehr aggressiv fährt, denken wir sofort: &quot;Was für ein rücksichtsloser Mensch!&quot; (Disposition). Wir ziehen selten in Betracht, dass die Person vielleicht einen medizinischen Notfall hat und auf dem Weg ins Krankenhaus ist (Situation).</p></div>
    </div>
);
const anwendbarkeitInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Stellen Sie sich vor, Sie nehmen an einem Quiz-Spiel teil. Der Quizmaster stellt schwierige Fragen, die er selbst entworfen hat. Natürlich weiss er alle Antworten. Die Kandidaten hingegen haben grosse Mühe.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Beobachtung</h3>
        <p>Als externer Beobachter neigen Sie wahrscheinlich dazu, den Quizmaster als hochintelligent und die Kandidaten als weniger intelligent einzuschätzen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die sozialpsychologische Analyse</h3>
        <p>Hier begehen Sie den <strong>fundamentalen Attributionsfehler</strong>. Sie attribuieren die Leistung der Personen auf ihre Intelligenz (Disposition) und ignorieren dabei völlig die mächtige Situation:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Die Situation des Quizmasters:</strong> Er hat einen enormen unfairen Vorteil. Er hat die Fragen selbst erstellt und kennt die Antworten. Seine Rolle diktiert, dass er wissend erscheint.</li>
            <li><strong>Die Situation der Kandidaten:</strong> Sie werden mit Fragen konfrontiert, die speziell dafür gemacht wurden, schwierig zu sein. Ihre Rolle diktiert, dass sie unwissend erscheinen.</li>
        </ul>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg"><p><strong>Für das Leben lernen:</strong> Wenn Sie das nächste Mal jemanden in einer bestimmten Rolle sehen (z.B. einen strengen Vorgesetzten, einen nervösen Bewerber), fragen Sie sich: &quot;Wie sehr formt die Situation gerade das Verhalten dieser Person?&quot;. Dies fördert Empathie und ein faireres Urteilsvermögen.</p></div>
    </div>
);
const meisterklasseInhalt1 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Actor-Observer Bias (Akteur-Beobachter-Verzerrung)</h3>
        <p>Der fundamentale Attributionsfehler ist nicht das ganze Bild. Er wird durch den Actor-Observer Bias modifiziert. Dieser besagt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Wenn wir das Verhalten **anderer** beurteilen, begehen wir den fundamentalen Attributionsfehler (wir sehen die Person).</li>
            <li>Wenn wir **unser eigenes** Verhalten erklären, neigen wir dazu, die Situation verantwortlich zu machen (wir sehen die Situation).</li>
        </ul>
        <p><strong>Beispiel:</strong> Wenn ein Kommilitone eine Prüfung nicht besteht, denken Sie: &quot;Er hat wohl nicht genug gelernt&quot; (Disposition). Wenn Sie selbst nicht bestehen, denken Sie: &quot;Die Fragen waren unfair und der Lärm hat mich abgelenkt&quot; (Situation).</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Self-Serving Bias (Selbstwertdienliche Verzerrung)</h3>
        <p>Diese Verzerrung schützt unseren Selbstwert. Wir attribuieren Erfolge auf uns selbst und schieben Misserfolge auf äussere Umstände.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Erfolg:</strong> &quot;Ich habe die Prüfung bestanden, weil ich klug bin und hart gearbeitet habe.&quot; (Dispositionelle Attribution)</li>
            <li><strong>Misserfolg:</strong> &quot;Ich bin durchgefallen, weil der Dozent mich nicht mag.&quot; (Situationale Attribution)</li>
        </ul>
    </div>
);
const uebungenData1: UebungenData = {
    quiz: [
        { q: "Die Tendenz, das Verhalten anderer auf ihre Persönlichkeit zurückzuführen, nennt man...", a: ["Situationismus", "Fundamentaler Attributionsfehler", "Self-Serving Bias"], correct: 1 },
        { q: "Wenn Sie Ihren Erfolg auf Ihre Fähigkeiten und Ihren Misserfolg auf Pech zurückführen, zeigen Sie...", a: ["Actor-Observer Bias", "Dispositionismus", "Self-Serving Bias"], correct: 2 },
    ],
    open: [
        { q: "Ein Kollege kommt zu spät zu einem wichtigen Meeting. Nennen Sie eine dispositionelle und eine situationale Attribution für sein Verhalten.", solution: "Dispositionell: &apos;Er ist unorganisiert und unzuverlässig.&apos; Situational: &apos;Er stand wahrscheinlich in einem unvorhergesehenen Stau oder hatte einen Notfall zu Hause.&apos;" },
    ],
    kreativ: "Beobachten Sie in den nächsten 24 Stunden eine Interaktion (im echten Leben oder in den Medien) und versuchen Sie, bewusst den fundamentalen Attributionsfehler bei sich selbst oder anderen zu erkennen. Beschreiben Sie die Situation."
};
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;

// --- INHALTE FÜR MODUL 2: Selbstdarstellung & Soziale Wahrnehmung ---
const grundwissenInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Soziale Wahrnehmung ist der Prozess, durch den wir versuchen, andere Menschen zu verstehen und zu kennen. Ein zentraler Aspekt davon ist das **Selbstkonzept**: unsere Gesamtheit an Überzeugungen und Gefühlen über uns selbst.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das Selbstkonzept und Selbstwertgefühl</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Selbst-Schema:</strong> Mentale Strukturen, die uns helfen, unsere Erfahrungen zu organisieren und zu leiten. (z.B. &quot;Ich bin sportlich&quot;).</li>
            <li><strong>Selbstwertgefühl (Self-Esteem):</strong> Unsere allgemeine positive oder negative Bewertung unserer selbst.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Soziale Vergleichstheorie (Festinger)</h3>
        <p>Wir lernen über unsere eigenen Fähigkeiten und Einstellungen, indem wir uns mit anderen Menschen vergleichen. Dabei gibt es zwei Richtungen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Aufwärtsgerichteter Vergleich:</strong> Wir vergleichen uns mit Menschen, die (vermeintlich) besser sind als wir. Das kann motivieren, aber auch das Selbstwertgefühl senken.</li>
            <li><strong>Abwärtsgerichteter Vergleich:</strong> Wir vergleichen uns mit Menschen, die (vermeintlich) schlechter sind. Das dient oft dem Schutz oder der Steigerung des eigenen Selbstwertgefühls.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Soziale Medien wie Instagram sind ein perfektes Anwendungsfeld für die Theorien der Selbstdarstellung und des sozialen Vergleichs.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Selbstdarstellung auf Instagram</h3>
        <p>Nutzer praktizieren **Impression Management**: Sie kontrollieren sorgfältig die Informationen, die sie über sich preisgeben, um bei anderen einen bestimmten Eindruck zu erwecken. Sie posten nur die besten Fotos, die aufregendsten Erlebnisse und die schmeichelhaftesten Momente. Dies ist eine Form der **Selbstverbesserung**.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Falle des aufwärtsgerichteten Vergleichs</h3>
        <p>Wenn wir durch unseren Feed scrollen, führen wir ständig **aufwärtsgerichtete soziale Vergleiche** durch. Wir sehen die sorgfältig kuratierten &quot;Highlight Reels&quot; anderer und vergleichen sie mit unserem eigenen, unspektakulären Alltag. Dies kann nachweislich zu einem geringeren Selbstwertgefühl, Neid und Unzufriedenheit führen, da wir den Eindruck gewinnen, unser Leben sei weniger aufregend oder erfolgreich als das der anderen.</p>
    </div>
);
const meisterklasseInhalt2 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Strategien des Impression Management</h3>
        <p>Menschen nutzen verschiedene Techniken, um den Eindruck, den andere von ihnen haben, zu steuern:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Einschmeicheln (Ingratiation):</strong> Komplimente machen oder Meinungen zustimmen, um sympathisch zu wirken.</li>
            <li><strong>Selbstanpreisung (Self-Promotion):</strong> Die eigenen Leistungen und Fähigkeiten hervorheben, um kompetent zu wirken.</li>
            <li><strong>Exemplifikation:</strong> Sich als moralisch integer und engagiert darstellen.</li>
            <li><strong>Einschüchterung (Intimidation):</strong> Macht und Autorität demonstrieren, um als gefährlich oder einflussreich wahrgenommen zu werden.</li>
            <li><strong>Hilfesuchen (Supplication):</strong> Schwäche und Hilfsbedürftigkeit zeigen, um Mitleid und Unterstützung zu erhalten.</li>
        </ul>
        <p>Die Fähigkeit, diese Strategien bei sich selbst und anderen zu erkennen, ist ein Schlüssel zur sozialen Kompetenz.</p>
    </div>
);
const uebungenData2: UebungenData = {
    quiz: [
        { q: "Sich mit jemandem zu vergleichen, der schlechter abschneidet, ist ein...", a: ["aufwärtsgerichteter Vergleich.", "abwärtsgerichteter Vergleich.", "horizontaler Vergleich."], correct: 1 },
        { q: "Das bewusste Steuern des Eindrucks, den wir auf andere machen, nennt man...", a: ["Selbst-Schema", "Sozialer Vergleich", "Impression Management"], correct: 2 },
    ],
    open: [
        { q: "Warum können soziale Medien wie Instagram das Selbstwertgefühl negativ beeinflussen? Erkläre es mit der Theorie des sozialen Vergleichs.", solution: "Soziale Medien fördern ständige aufwärtsgerichtete Vergleiche. Nutzer sehen die kuratierten, idealisierten Leben anderer (Urlaube, Erfolge) und vergleichen dies mit ihrer eigenen, oft unspektakulären Realität. Diese Diskrepanz kann zu dem Gefühl führen, das eigene Leben sei mangelhaft, was das Selbstwertgefühl senkt." },
    ],
    kreativ: "Beschreibe eine Situation aus einem Film oder einer Serie, in der eine Figur eine der fünf Strategien des Impression Managements (z.B. Einschmeicheln) offensichtlich anwendet."
};
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;

// --- INHALTE FÜR MODUL 3: Einstellungen & Überzeugung ---
const grundwissenInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Eine **Einstellung** ist eine Bewertung eines Objekts, einer Person oder einer Idee. Sie besteht aus drei Komponenten (ABC-Modell):</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Affektiv (Affective):</strong> Die Gefühle und Emotionen, die mit dem Objekt verbunden sind.</li>
            <li><strong>Verhaltensmässig (Behavioral):</strong> Die Art und Weise, wie wir uns gegenüber dem Objekt verhalten.</li>
            <li><strong>Kognitiv (Cognitive):</strong> Die Gedanken und Überzeugungen, die wir über das Objekt haben.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Kognitive Dissonanz (Festinger)</h3>
        <p>Wir streben nach Konsistenz zwischen unseren Einstellungen und unserem Verhalten. Wenn wir ein Verhalten zeigen, das im Widerspruch zu unseren Überzeugungen steht, entsteht ein unangenehmer Zustand der psychologischen Spannung, die **kognitive Dissonanz**. Um diese Spannung zu reduzieren, neigen wir dazu, unsere Einstellung zu ändern, damit sie wieder zum Verhalten passt.</p>
    </div>
);
const anwendbarkeitInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein klassisches Beispiel für kognitive Dissonanz ist das Verhalten von Rauchern.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Kognition 1 (Einstellung):</strong> &quot;Rauchen ist extrem ungesund und kann tödlich sein.&quot;</li>
            <li><strong>Kognition 2 (Verhalten):</strong> &quot;Ich rauche jeden Tag eine Schachtel Zigaretten.&quot;</li>
        </ul>
        <p>Dieser Widerspruch erzeugt Dissonanz. Um diese zu reduzieren, hat die Person mehrere Möglichkeiten:</p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Verhalten ändern:</strong> Mit dem Rauchen aufhören. (Am schwierigsten)</li>
            <li><strong>Kognition ändern:</strong> Die Einstellung zum Rauchen ändern, z.B. durch Bagatellisierung (&quot;Die Forschung ist doch nicht eindeutig&quot;) oder durch das Hinzufügen neuer Kognitionen (&quot;Rauchen hilft mir, mich zu entspannen, und Stress ist ja auch ungesund&quot;).</li>
        </ol>
        <p>Meistens ist es einfacher, die Einstellung zu ändern als das Verhalten, was erklärt, warum Menschen oft an schädlichen Gewohnheiten festhalten, obwohl sie es besser wissen.</p>
    </div>
);
const meisterklasseInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Elaboration-Likelihood-Modell (ELM) der Überzeugung</h3>
        <p>Dieses Modell beschreibt zwei Wege, auf denen eine Botschaft uns überzeugen kann:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Zentraler Weg (Central Route):</strong> Die Person ist motiviert und fähig, über die Argumente nachzudenken. Sie wird durch die Qualität und Logik der Argumente überzeugt. Die resultierende Einstellungsänderung ist stabil und langanhaltend.</li>
            <li><strong>Peripherer Weg (Peripheral Route):</strong> Die Person ist unmotiviert oder abgelenkt. Sie achtet nicht auf die Argumente, sondern lässt sich von oberflächlichen (peripheren) Reizen leiten, z.B. der Attraktivität des Sprechers, der Länge der Botschaft oder emotionalen Appellen. Die resultierende Einstellungsänderung ist oft oberflächlich und kurzlebig.</li>
        </ul>
        <p>Gute Werbekampagnen versuchen oft, beide Wege gleichzeitig anzusprechen.</p>
    </div>
);
const uebungenData3: UebungenData = {
    quiz: [
        { q: "Welche Komponente gehört NICHT zum ABC-Modell der Einstellungen?", a: ["Affektiv", "Behavioral", "Charismatisch"], correct: 2 },
        { q: "Kognitive Dissonanz ist...", a: ["ein angenehmer Zustand der Harmonie.", "ein unangenehmer Zustand psychologischer Spannung.", "die Unfähigkeit, eine Entscheidung zu treffen."], correct: 1 },
    ],
    open: [
        { q: "Sie kaufen ein teures Produkt und entdecken danach negative Bewertungen. Beschreiben Sie den Zustand der kognitiven Dissonanz und zwei Strategien, um ihn zu reduzieren.", solution: "Dissonanz entsteht durch den Konflikt &apos;Ich habe viel Geld für dieses gute Produkt ausgegeben&apos; und &apos;Andere sagen, das Produkt ist schlecht&apos;. Strategien zur Reduktion: 1. Abwertung der negativen Bewertungen (&apos;Die Leute hatten wohl keine Ahnung&apos;). 2. Aufwertung der positiven Aspekte (&apos;Aber es hat dieses eine tolle Feature, das die anderen nicht haben&apos;)." },
    ],
    kreativ: "Analysiere eine aktuelle Fernsehwerbung. Versucht sie, dich über den zentralen oder den peripheren Weg zu überzeugen? Begründe deine Antwort."
};
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;

// --- INHALTE FÜR MODUL 4: Konformität, Compliance & Gehorsam ---
const grundwissenInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Sozialer Einfluss ist eine der stärksten Kräfte, die unser Verhalten formen. Er beschreibt die Veränderung im Verhalten, die durch die Anwesenheit oder Handlungen anderer verursacht wird.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die drei Hauptformen</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Konformität:</strong> Die Tendenz, das eigene Verhalten oder die eigene Meinung an die einer Gruppe anzupassen, oft aufgrund von subtilem, ungesagtem Druck.</li>
            <li><strong>Compliance (Gefügigkeit):</strong> Man gibt einer direkten Bitte oder Aufforderung einer anderen Person nach.</li>
            <li><strong>Gehorsam (Obedience):</strong> Man folgt den Anweisungen einer Autoritätsperson.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Die klassischen Experimente</h3>
        <p>Drei Studien haben unser Verständnis von sozialem Einfluss revolutioniert:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Asch-Experiment (Konformität):</strong> Zeigte, dass Menschen bereit sind, eine offensichtlich falsche Antwort zu geben, nur weil alle anderen in der Gruppe dies auch tun.</li>
            <li><strong>Milgram-Experiment (Gehorsam):</strong> Demonstrierte auf schockierende Weise, dass normale Menschen bereit sind, einer Autoritätsperson zu gehorchen und anderen (scheinbar) schmerzhafte Elektroschocks zu verabreichen.</li>
            <li><strong>Stanford-Prison-Experiment (Zimbardo):</strong> Untersuchte die Macht von sozialen Rollen, indem Studenten zufällig zu &quot;Gefangenen&quot; und &quot;Wärtern&quot; gemacht wurden, was schnell zu eskalierendem Verhalten führte.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Das Milgram-Experiment hilft uns, schreckliche historische Ereignisse wie den Holocaust zu verstehen. Es widerlegt die einfache Annahme, dass die Täter einfach nur &quot;böse Menschen&quot; waren (Dispositionismus).</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die &quot;Banalität des Bösen&quot;</h3>
        <p>Milgrams Ergebnisse stützen die These der &quot;Banalität des Bösen&quot;. Sie legen nahe, dass nicht unbedingt Sadismus oder Hass die treibende Kraft waren, sondern ein extremer Gehorsam gegenüber einer als legitim wahrgenommenen Autorität. Normale Bürger, die in eine mächtige situative Dynamik geraten, sind fähig, schreckliche Taten zu begehen, indem sie die Verantwortung an die Autoritätsperson abgeben (&quot;Ich habe nur Befehle befolgt&quot;).</p>
        <p>Diese Erkenntnis ist zutiefst beunruhigend, aber entscheidend. Sie warnt uns, dass jeder unter dem richtigen situativen Druck zu Taten fähig sein könnte, die er sich niemals zugetraut hätte. Es ist eine Mahnung, Autoritäten immer kritisch zu hinterfragen.</p>
    </div>
);
const meisterklasseInhalt4 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Warum passen wir uns an? Zwei Gründe</h3>
        <p>Es gibt zwei Hauptmotive für Konformität:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Informativer sozialer Einfluss:</strong> Wir passen uns an, weil wir glauben, dass die Gruppe über korrektere Informationen verfügt als wir selbst. Wir wollen richtig liegen. Dies führt oft zu einer echten, privaten Akzeptanz der Gruppenmeinung.</li>
            <li><strong>Normativer sozialer Einfluss:</strong> Wir passen uns an, um von der Gruppe gemocht und akzeptiert zu werden und um Ablehnung oder Bestrafung zu vermeiden. Wir wollen dazugehören. Dies führt oft nur zu öffentlicher Compliance, ohne private Akzeptanz. Das Asch-Experiment ist ein klassisches Beispiel hierfür.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Faktoren, die den Gehorsam beeinflussen</h3>
        <p>Milgram variierte sein Experiment und fand heraus, dass der Gehorsam sank, wenn...</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>...die Autoritätsperson weniger legitim erschien (z.B. kein Laborkittel).</li>
            <li>...das Opfer räumlich näher war (im selben Raum).</li>
            <li>...andere anwesende &quot;Lehrer&quot; den Gehorsam verweigerten.</li>
        </ul>
    </div>
);
const uebungenData4: UebungenData = {
    quiz: [
        { q: "Welches Experiment untersuchte den Gehorsam gegenüber Autoritäten?", a: ["Asch-Experiment", "Milgram-Experiment", "Stanford-Prison-Experiment"], correct: 1 },
        { q: "Wenn Sie sich der Meinung einer Gruppe anschliessen, um gemocht zu werden, unterliegen Sie dem...", a: ["Informativen sozialen Einfluss", "Normativen sozialen Einfluss", "Dispositionellen Einfluss"], correct: 1 },
    ],
    open: [
        { q: "Was ist der wichtigste Unterschied zwischen Konformität und Gehorsam?", solution: "Konformität ist der Einfluss durch eine Gruppe von Gleichgestellten (Peers), der oft subtil und unausgesprochen ist. Gehorsam ist der Einfluss durch eine spezifische Autoritätsperson, der auf einer direkten Anweisung oder einem Befehl beruht." },
    ],
    kreativ: "Das Stanford-Prison-Experiment wurde stark kritisiert. Nennen Sie zwei mögliche ethische Probleme dieses Experiments."
};
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;

// --- INHALTE FÜR MODUL 5: Vorurteile & Diskriminierung ---
const grundwissenInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Obwohl sie oft synonym verwendet werden, beschreiben diese drei Begriffe unterschiedliche, aber zusammenhängende Konzepte, die auf dem ABC-Modell der Einstellungen basieren:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Stereotyp (Kognitiv):</strong> Eine verallgemeinernde Überzeugung oder Annahme über eine Gruppe von Menschen. Stereotype können positiv, negativ oder neutral sein, sind aber fast immer eine Übergeneralisierung. (z.B. &quot;Alle Professoren sind zerstreut&quot;).</li>
            <li><strong>Vorurteil (Affektiv):</strong> Eine (meist negative) Einstellung und emotionale Reaktion gegenüber einer Person, die allein auf ihrer Zugehörigkeit zu einer bestimmten Gruppe basiert. (z.B. eine Abneigung gegen Fans eines rivalisierenden Sportteams).</li>
            <li><strong>Diskriminierung (Verhaltensmässig):</strong> Eine ungerechtfertigte negative oder schädliche Handlung gegenüber einer Person aufgrund ihrer Gruppenzugehörigkeit.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein häufiges und subtiles Beispiel für Vorurteile und Diskriminierung findet sich in Bewerbungsprozessen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Studie mit den Lebensläufen</h3>
        <p>In einer berühmten Studie wurden identische Lebensläufe an Arbeitgeber verschickt, die sich nur in einem Detail unterschieden: dem Namen des Bewerbers. Ein Teil der Lebensläufe trug einen typisch weiss klingenden Namen, der andere Teil einen typisch afroamerikanisch klingenden Namen.</p>
        <p><strong>Das Ergebnis:</strong> Lebensläufe mit weiss klingenden Namen erhielten 50% mehr Rückrufe für ein Vorstellungsgespräch als die identischen Lebensläufe mit afroamerikanisch klingenden Namen. Dies zeigt, wie unbewusste Stereotype und Vorurteile (Affekt) zu einem konkreten diskriminierenden Verhalten (Verhalten) führen, auch wenn die Personaler von sich selbst behaupten würden, nicht voreingenommen zu sein.</p>
    </div>
);
const meisterklasseInhalt5 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Kontakthypothese: Vorurteile abbauen</h3>
        <p>Eine der wichtigsten Theorien zur Reduzierung von Vorurteilen ist die Kontakthypothese. Sie besagt, dass der direkte Kontakt zwischen Mitgliedern verschiedener Gruppen Vorurteile abbauen kann, aber nur unter bestimmten Bedingungen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Gleicher Status:</strong> Beide Gruppen müssen im Kontakt den gleichen Status haben.</li>
            <li><strong>Gemeinsame Ziele:</strong> Die Gruppen müssen zusammenarbeiten, um ein übergeordnetes Ziel zu erreichen.</li>
            <li><strong>Intergruppen-Kooperation:</strong> Die Zusammenarbeit muss ohne Konkurrenz stattfinden.</li>
            <li><strong>Institutionelle Unterstützung:</strong> Der Kontakt muss von Autoritäten (Gesetze, Vorgesetzte) unterstützt werden.</li>
        </ul>
        <p>Ein klassisches Beispiel ist das &quot;Jigsaw Classroom&quot;, in dem Schüler verschiedener Ethnien gezwungen sind, zusammenzuarbeiten, um eine Aufgabe zu lösen, da jeder nur einen Teil der Informationen besitzt.</p>
    </div>
);
const uebungenData5: UebungenData = {
    quiz: [
        { q: "Die Überzeugung 'Alle Anwälte sind unehrlich' ist ein Beispiel für ein...", a: ["Vorurteil", "Stereotyp", "Diskriminierung"], correct: 1 },
        { q: "Eine Firma weigert sich, Frauen für eine Führungsposition einzustellen. Dies ist ein Beispiel für...", a: ["Vorurteil", "Stereotyp", "Diskriminierung"], correct: 2 },
    ],
    open: [
        { q: "Erkläre den Unterschied zwischen impliziten und expliziten Vorurteilen.", solution: "Explizite Vorurteile sind Einstellungen, die uns bewusst sind und die wir offen zugeben würden. Implizite Vorurteile sind unbewusste, automatische Assoziationen, die unser Verhalten beeinflussen können, auch wenn wir bewusst anderer Meinung sind." },
    ],
    kreativ: "Entwirf ein kurzes Szenario für ein soziales Experiment, das die Bedingungen der Kontakthypothese erfüllt, um Vorurteile zwischen zwei rivalisierenden Fangruppen abzubauen."
};
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;

// --- INHALTE FÜR MODUL 6: Aggression ---
const grundwissenInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Aggression ist jedes Verhalten, das darauf abzielt, einem anderen Lebewesen, das motiviert ist, diese Behandlung zu vermeiden, Schaden oder Schmerz zuzufügen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Zwei Arten von Aggression</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Feindselige Aggression (Hostile Aggression):</strong> Entsteht aus Gefühlen wie Wut und Ärger. Das Ziel ist es, Schmerz zuzufügen. (Beispiel: Eine Schlägerei aus Wut).</li>
            <li><strong>Instrumentelle Aggression:</strong> Dient als Mittel zum Zweck, um ein anderes Ziel zu erreichen. Der Schmerz des anderen ist nicht das Hauptziel. (Beispiel: Ein Auftragsmord, um Geld zu erhalten).</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Ursachen von Aggression</h3>
        <p>Aggression ist multikausal. Wichtige Theorien umfassen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Biologische Faktoren:</strong> Genetische Prädispositionen, hormonelle Einflüsse (Testosteron) und neuronale Strukturen (Amygdala).</li>
            <li><strong>Frustrations-Aggressions-Hypothese:</strong> Frustration (das Gefühl, an der Erreichung eines Ziels gehindert zu werden) erhöht die Wahrscheinlichkeit von aggressivem Verhalten.</li>
            <li><strong>Soziales Lernen (Bandura):</strong> Wir lernen aggressives Verhalten, indem wir andere beobachten und nachahmen (siehe Bobo-Doll-Experiment).</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Eine der am heissesten diskutierten Fragen ist, ob der Konsum von gewalttätigen Medien (Filme, Videospiele) zu realer Aggression führt.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Der &quot;Waffeneffekt&quot; (Weapons Effect)</h3>
        <p>Ein klassisches Experiment von Berkowitz & LePage zeigte, dass allein die Anwesenheit eines aggressiven Reizes in der Umgebung die Wahrscheinlichkeit von aggressivem Verhalten erhöhen kann. In ihrem Experiment gaben Versuchspersonen, die zuvor verärgert worden waren, einem anderen Teilnehmer mehr Elektroschocks, wenn eine Waffe (im Vergleich zu einem Tennisschläger) beiläufig im Raum lag.</p>
        <p><strong>Übertragung auf Medien:</strong> Dieses Prinzip legt nahe, dass der ständige Kontakt mit gewalttätigen Inhalten aggressive Gedanken, Gefühle und Skripte leichter zugänglich macht (&quot;priming&quot;). Während ein direkter kausaler Link (&quot;Videospiel gespielt, danach Straftat begangen&quot;) stark vereinfacht ist, zeigt die Forschung, dass medialer Gewaltkonsum ein Risikofaktor ist, der die Hemmschwelle für Aggression senken und zu einer Desensibilisierung führen kann.</p>
    </div>
);
const meisterklasseInhalt6 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Katharsis-Hypothese: Ein widerlegter Mythos</h3>
        <p>Die Idee der Katharsis besagt, dass man aggressive Energie abbauen kann, indem man sie auf eine &quot;sichere&quot; Weise auslebt (z.B. auf einen Boxsack einschlagen oder ein aggressives Videospiel spielen). Diese Idee ist in der Populärpsychologie weit verbreitet, aber von der wissenschaftlichen Forschung **weitgehend widerlegt**.</p>
        <p>Studien zeigen immer wieder das Gegenteil: Das Ausleben von Aggression führt tendenziell zu **mehr** Aggression, nicht zu weniger. Es wirkt wie eine Übung oder Verstärkung für aggressive Verhaltensmuster und senkt die Hemmschwelle für zukünftige Aggressionen.</p>
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg"><p><strong>Fazit:</strong> Sich &quot;abreagieren&quot; ist in der Regel eine schlechte Strategie zum Umgang mit Wut. Effektivere Methoden sind Ablenkung, Entspannungsübungen oder das konstruktive Lösen des zugrundeliegenden Problems.</p></div>
    </div>
);
const uebungenData6: UebungenData = {
    quiz: [
        { q: "Ein Raubüberfall ist ein typisches Beispiel für...", a: ["Feindselige Aggression", "Instrumentelle Aggression", "Frustrations-Aggression"], correct: 1 },
        { q: "Die Theorie, dass wir Aggression durch Beobachtung lernen, stammt von...", a: ["Milgram", "Festinger", "Bandura"], correct: 2 },
    ],
    open: [
        { q: "Widerlege die Katharsis-Hypothese mit einem Alltagsbeispiel.", solution: "Jemand ist wütend auf seinen Chef, geht nach Hause und schreit seinen Partner an, um &apos;Dampf abzulassen&apos;. Anstatt sich danach besser zu fühlen, hat er nun einen neuen Konflikt geschaffen, ist wahrscheinlich immer noch wütend auf den Chef und hat aggressives Verhalten als &apos;Lösung&apos; praktiziert, was die Wahrscheinlichkeit erhöht, es wieder zu tun." },
    ],
    kreativ: "Entwirf drei konkrete, wissenschaftlich fundierte Massnahmen, die eine Schule ergreifen könnte, um Aggression und Mobbing unter Schülern zu reduzieren."
};
const uebungenInhalt6 = <UebungenContent data={uebungenData6} />;

// --- INHALTE FÜR MODUL 7: Prosoziales Verhalten ---
const grundwissenInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Prosoziales Verhalten ist jede Handlung, die darauf abzielt, einer anderen Person zu helfen. **Altruismus** ist eine spezielle Form davon: der Wunsch, einem anderen zu helfen, selbst wenn es für den Helfer mit Kosten verbunden ist und ohne Erwartung einer Gegenleistung.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Warum helfen Menschen?</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Evolutionäre Psychologie:</strong> Wir helfen Verwandten (Kin Selection), um die Weitergabe unserer Gene zu sichern. Wir helfen auch anderen in der Erwartung, dass sie uns später helfen werden (Reziprozitätsnorm).</li>
            <li><strong>Sozialer Austausch:</strong> Wir führen eine unbewusste Kosten-Nutzen-Analyse durch. Helfen maximiert unseren sozialen &quot;Gewinn&quot; (Anerkennung, gutes Gefühl) und minimiert den &quot;Verlust&quot; (Gefahr, Zeitaufwand).</li>
            <li><strong>Empathie-Altruismus-Hypothese (Batson):</strong> Wenn wir Empathie für eine Person empfinden, helfen wir ihr aus rein altruistischen Gründen, unabhängig von unserem eigenen Nutzen.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Der Bystander-Effekt (Zuschauereffekt)</h3>
        <p>Das wohl berühmteste Phänomen der Sozialpsychologie: Je grösser die Anzahl der Zuschauer (Bystander) in einer Notsituation, desto geringer ist die Wahrscheinlichkeit, dass irgendjemand von ihnen eingreift und hilft.</p>
    </div>
);
const anwendbarkeitInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Stellen Sie sich vor, in einer belebten Fussgängerzone bricht eine Person zusammen. Viele Menschen gehen vorbei, niemand hilft sofort.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die psychologischen Prozesse dahinter</h3>
        <p>Der Bystander-Effekt wird durch mehrere Mechanismen angetrieben:</p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Pluralistische Ignoranz:</strong> Jeder schaut zu den anderen, um die Situation zu deuten. Da niemand etwas tut, schliessen alle daraus, dass es wohl kein echter Notfall ist. (&quot;Wenn es ernst wäre, würde ja jemand helfen.&quot;).</li>
            <li><strong>Verantwortungsdiffusion:</strong> Jeder Einzelne fühlt sich weniger verantwortlich zu helfen, weil die Verantwortung auf die gesamte Gruppe verteilt ist. (&quot;Warum gerade ich? Es sind doch so viele andere da.&quot;).</li>
            <li><strong>Bewertungsangst:</strong> Die Angst, sich vor den anderen zu blamieren, wenn man falsch eingreift oder etwas ungeschickt macht.</li>
        </ol>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"><p><strong>Wie man es überwindet:</strong> Wenn Sie selbst Hilfe benötigen, bekämpfen Sie diese Effekte aktiv! Sprechen Sie eine Person direkt an: <strong>&quot;Sie da, in der blauen Jacke, bitte rufen Sie einen Krankenwagen!&quot;</strong>. Das durchbricht die pluralistische Ignoranz und weist die Verantwortung klar zu.</p></div>
    </div>
);
const meisterklasseInhalt7 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die 5 Schritte zur Hilfeleistung (Latané & Darley)</h3>
        <p>Damit eine Person in einer Notsituation hilft, muss sie fünf aufeinanderfolgende Hürden überwinden. An jeder dieser Hürden kann der Hilfeprozess scheitern:</p>
        <ol className="list-decimal list-inside space-y-4 pl-2">
            <li><strong>Ereignis bemerken:</strong> Bin ich abgelenkt oder in Eile?</li>
            <li><strong>Ereignis als Notfall interpretieren:</strong> Hier schlägt die pluralistische Ignoranz zu.</li>
            <li><strong>Verantwortung übernehmen:</strong> Hier schlägt die Verantwortungsdiffusion zu.</li>
            <li><strong>Wissen, wie man hilft:</strong> Habe ich die nötigen Fähigkeiten (z.B. Erste Hilfe)?</li>
            <li><strong>Entscheidung zu handeln:</strong> Habe ich Angst vor den Konsequenzen (Bewertungsangst, Gefahr)?</li>
        </ol>
        <p>Nur wenn alle fünf Schritte erfolgreich durchlaufen werden, wird tatsächlich geholfen. Das Modell erklärt eindrücklich, warum Hilfeleistung oft ausbleibt, auch wenn gute Absichten vorhanden sind.</p>
    </div>
);
const uebungenData7: UebungenData = {
    quiz: [
        { q: "Der Bystander-Effekt besagt, dass die Wahrscheinlichkeit zu helfen...", a: ["steigt, je mehr Leute anwesend sind.", "sinkt, je mehr Leute anwesend sind.", "unabhängig von der Anzahl der Leute ist."], correct: 1 },
        { q: "Die Theorie, die besagt, dass wir Empathie empfinden und deshalb helfen, ist die...", a: ["Sozialer-Austausch-Theorie", "Empathie-Altruismus-Hypothese", "Frustrations-Aggressions-Hypothese"], correct: 1 },
    ],
    open: [
        { q: "Jemand bittet Sie auf der Strasse um eine kleine Spende. Sie geben etwas, weil Sie sich danach gut fühlen und weil andere Leute zusehen. Welche zwei Theorien des Helfens könnten dieses Verhalten erklären?", solution: "1. Sozialer-Austausch-Theorie: Der &apos;Gewinn&apos; (gutes Gefühl, soziale Anerkennung) überwiegt die &apos;Kosten&apos; (das gespendete Geld). 2. Normativer sozialer Einfluss: Sie spenden, um vor den anderen Zuschauern nicht als geizig dazustehen." },
    ],
    kreativ: "Entwirf eine kleine Kampagne (z.B. ein Poster oder einen kurzen Social-Media-Clip), die Menschen über den Bystander-Effekt aufklärt und ihnen eine klare Handlungsanweisung gibt, wie sie ihn überwinden können."
};
const uebungenInhalt7 = <UebungenContent data={uebungenData7} />;

// --- MODUL-LISTE (VOLLSTÄNDIG) ---
const socialPsychologyModules: SocialPsychologyModule[] = [
    { id: 1, title: "Was ist Sozialpsychologie?", content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: "Selbstdarstellung & Soziale Wahrnehmung", content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: "Einstellungen & Überzeugung", content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: "Konformität, Compliance & Gehorsam", content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: "Vorurteile & Diskriminierung", content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
    { id: 6, title: "Aggression", content: { grundwissen: grundwissenInhalt6, anwendbarkeit: anwendbarkeitInhalt6, meisterklasse: meisterklasseInhalt6, uebungen: uebungenInhalt6 }},
    { id: 7, title: "Prosoziales Verhalten", content: { grundwissen: grundwissenInhalt7, anwendbarkeit: anwendbarkeitInhalt7, meisterklasse: meisterklasseInhalt7, uebungen: uebungenInhalt7 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = socialPsychologyModules.find(m => m.id === moduleId);

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/2" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Sozialpsychologie-Übersicht</span>
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
        <Link href="/modules/2" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Sozialpsychologie-Übersicht</span>
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