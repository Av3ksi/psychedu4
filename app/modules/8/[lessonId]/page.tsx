'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
// NEU: ArrowRight importiert
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
interface PersonalityModule {
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
// (Alle Inhalts-Konstanten wie grundwissenInhalt1, anwendbarkeitInhalt1 etc. bleiben unverändert hier)

// Modul 1: Einführung & Psychodynamische Perspektive
const grundwissenInhalt1 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Persönlichkeit bezieht sich auf die langanhaltenden Züge und Muster, die eine Person dazu bringen, auf konsistente Weise zu denken, zu fühlen und sich zu verhalten. Es ist das, was uns einzigartig macht.</p> <h3 className="text-2xl font-semibold border-b pb-2">Freuds psychoanalytische Theorie</h3> <p>Sigmund Freud war der erste, der eine umfassende Persönlichkeitstheorie entwickelte. Sein zentraler Gedanke war, dass unbewusste Triebe, hauptsächlich sexuelle und aggressive, unsere Persönlichkeit formen.</p> <p>Er schlug drei interagierende Instanzen vor:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Es (Id):</strong> Das primitive, unbewusste Reservoir unserer Triebe. Es operiert nach dem **Lustprinzip** und strebt nach sofortiger Befriedigung.</li> <li><strong>Ich (Ego):</strong> Der rationale Teil unserer Persönlichkeit, der versucht, einen realistischen Kompromiss zwischen den Forderungen des Es und den Regeln der Aussenwelt zu finden. Es operiert nach dem **Realitätsprinzip**.</li> <li><strong>Über-Ich (Superego):</strong> Unser inneres Gewissen und moralischer Kompass. Es entwickelt sich durch die Verinnerlichung von sozialen Regeln und elterlichen Normen.</li> </ul> <p>Ein gesunder Mensch hat laut Freud ein starkes Ich, das die Konflikte zwischen Es und Über-Ich ausbalancieren kann.</p> </div> );
const anwendbarkeitInhalt1 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Abwehrmechanismen im Alltag</h3> <p className="text-lg leading-relaxed">Wenn das Ich Angst verspürt, weil es den Konflikt zwischen Es und Über-Ich nicht lösen kann, greift es auf unbewusste **Abwehrmechanismen** zurück. Wir alle nutzen sie, um uns vor unangenehmen Gefühlen zu schützen.</p> <ul className="list-disc list-inside space-y-4 pl-2"> <li><strong>Verdrängung:</strong> Angstauslösende Erinnerungen werden aus dem Bewusstsein verbannt. (Beispiel: Ein Opfer eines Unfalls kann sich nicht an die Details erinnern.)</li> <li><strong>Projektion:</strong> Eigene inakzeptable Wünsche oder Impulse werden auf andere übertragen. (Beispiel: Jemand, der selbst unehrlich ist, wirft anderen ständig vor, sie würden lügen.)</li> <li><strong>Rationalisierung:</strong> Man rechtfertigt ein Verhalten mit fadenscheinigen, aber akzeptabel klingenden Gründen. (Beispiel: &quot;Ich bin durch die Prüfung gefallen, weil der Professor mich nicht mag&quot;, anstatt &quot;Ich habe nicht gelernt&quot;.)</li> <li><strong>Sublimierung:</strong> Inakzeptable Triebe werden in sozial akzeptable Aktivitäten umgelenkt. (Beispiel: Eine Person mit starken Aggressionen wird ein erfolgreicher Chirurg oder Boxer.)</li> </ul> </div> );
const meisterklasseInhalt1 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Kritik an Freud und sein Vermächtnis</h3> <p>Freuds Theorien sind heute wissenschaftlich sehr umstritten:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Nicht falsifizierbar:</strong> Viele seiner Konzepte (wie das Unbewusste) sind so vage, dass sie wissenschaftlich kaum überprüfbar oder widerlegbar sind.</li> <li><strong>Überbetonung der Sexualität:</strong> Seine Fokussierung auf frühkindliche sexuelle Triebe wird von vielen als übertrieben angesehen.</li> <li><strong>Mangel an empirischen Belegen:</strong> Seine Theorien basieren hauptsächlich auf Fallstudien seiner (meist wohlhabenden, weiblichen, Wiener) Patientinnen und nicht auf systematischer Forschung.</li> </ul> <p><strong>Trotzdem ist sein Einfluss unbestreitbar:</strong> Freud hat die Psychologie popularisiert und Konzepte wie die Bedeutung der Kindheit, das Unbewusste und die Rolle von Abwehrmechanismen in unser kulturelles Vokabular eingeführt. Viele moderne psychodynamische Theorien bauen auf seinen Grundideen auf, auch wenn sie viele Details revidiert haben.</p> </div> );
const uebungenData1: UebungenData = { quiz: [ { q: "Welche Instanz operiert nach dem &apos;Lustprinzip&apos;?", a: ["Ich (Ego)", "Über-Ich (Superego)", "Es (Id)"], correct: 2 }, { q: "Wenn Sie einen inakzeptablen Impuls (z.B. Aggression) in eine sozial akzeptable Aktivität (z.B. Sport) umwandeln, nennt man das...", a: ["Projektion", "Sublimierung", "Verdrängung"], correct: 1 }, ], open: [ { q: "Erklären Sie den fundamentalen Konflikt zwischen Es, Ich und Über-Ich anhand eines Beispiels.", solution: "Beispiel: Sie stehen an der Kasse und sehen einen Schokoriegel (Es sagt: &apos;Ich will den sofort!&apos;). Ihr Über-Ich sagt: &apos;Stehlen ist falsch!&apos;. Ihr Ich vermittelt und entscheidet: &apos;Ich werde den Schokoriegel jetzt kaufen und nach dem Bezahlen essen.&apos;" }, ], kreativ: "Welchen Abwehrmechanismus verwendet eine Person, die nach einer schmerzhaften Trennung exzessiv zu arbeiten beginnt, um nicht darüber nachdenken zu müssen? Begründen Sie Ihre Antwort." };
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;
const grundwissenInhalt2 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Viele von Freuds Schülern entwickelten seine Ideen weiter, reduzierten aber die Bedeutung der Sexualität und betonten stattdessen soziale und kulturelle Faktoren.</p> <h3 className="text-2xl font-semibold border-b pb-2">Wichtige Neo-Freudianer</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Alfred Adler:</strong> Fokus auf den **Minderwertigkeitskomplex** und das angeborene Streben nach Überlegenheit.</li> <li><strong>Erik Erikson:</strong> Entwickelte die **psychosoziale Entwicklungstheorie**, die die Persönlichkeitsentwicklung über die gesamte Lebensspanne in acht Stufen beschreibt (z.B. &quot;Urvertrauen vs. Misstrauen&quot;).</li> <li><strong>Carl Jung:</strong> Führte die Konzepte des **kollektiven Unbewussten** und der **Archetypen** (universelle Symbole wie der Held, die Mutter) sowie die Dimensionen **Extraversion vs. Introversion** ein.</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Die Humanistische Perspektive</h3> <p>Als &quot;dritte Kraft&quot; in der Psychologie wandten sich Humanisten wie Abraham Maslow und Carl Rogers von der pessimistischen Sichtweise der Psychoanalyse ab. Sie betonten das angeborene Potenzial für Wachstum und Selbstverwirklichung des gesunden Menschen.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Abraham Maslow:</strong> Bekannt für seine **Bedürfnishierarchie**, an deren Spitze die **Selbstverwirklichung** steht – das Erreichen des vollen eigenen Potenzials.</li> <li><strong>Carl Rogers:</strong> Betonte die Bedeutung des **Selbstkonzepts**. Er unterschied zwischen dem **Real-Selbst** (wer wir wirklich sind) und dem **Ideal-Selbst** (wer wir sein möchten). **Kongruenz** zwischen diesen beiden ist entscheidend für psychische Gesundheit.</li> </ul> </div> );
const anwendbarkeitInhalt2 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Kongruenz und Inkongruenz nach Rogers</h3> <p className="text-lg leading-relaxed">Carl Rogers&apos; Konzept der Kongruenz hat grosse praktische Bedeutung für unser Wohlbefinden.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Kongruenz:</strong> Wenn unser Selbstbild (Real-Selbst) weitgehend mit dem übereinstimmt, was wir sein wollen (Ideal-Selbst), erleben wir Kongruenz. Dies führt zu einem hohen Selbstwertgefühl und einem Gefühl der Zufriedenheit.</li> <li><strong>Inkongruenz:</strong> Wenn eine grosse Kluft zwischen unserem Real- und Ideal-Selbst besteht, führt dies zu Unzufriedenheit, Angst und einem niedrigen Selbstwertgefühl.</li> </ul> <p><strong>Beispiel:</strong> Ein junger Mann hat das Ideal-Selbst, ein erfolgreicher Anwalt zu sein, um seine Eltern stolz zu machen. Sein Real-Selbst ist jedoch, dass er sich eigentlich für Kunst und Musik begeistert. Diese Inkongruenz führt zu Unzufriedenheit im Jurastudium. Ein Ziel der Rogers&apos;schen Therapie wäre es, ihm zu helfen, ein Ideal-Selbst zu entwickeln, das besser zu seinen wahren Interessen passt, oder Wege zu finden, sein Real-Selbst (seine künstlerischen Neigungen) mehr zu akzeptieren und auszuleben.</p> </div> );
const meisterklasseInhalt2 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Jungs kollektives Unbewusstes</h3> <p>Carl Jungs faszinierendster und gleichzeitig umstrittenster Beitrag ist die Idee des **kollektiven Unbewussten**. Im Gegensatz zu Freuds persönlichem Unbewussten, das aus verdrängten individuellen Erfahrungen besteht, ist das kollektive Unbewusste laut Jung ein universelles, von allen Menschen geteiltes Reservoir an latenten Erinnerungsspuren aus der Geschichte unserer Spezies.</p> <p>Der Inhalt dieses Unbewussten sind die **Archetypen** – universelle, angeborene Bilder und Symbole, die in den Mythen, Märchen und Religionen aller Kulturen auftauchen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Die Persona:</strong> Die &quot;Maske&quot;, die wir in der Öffentlichkeit tragen.</li> <li><strong>Der Schatten:</strong> Die dunkle, verdrängte Seite unserer Persönlichkeit.</li> <li><strong>Anima/Animus:</strong> Die weiblichen Aspekte in der männlichen Psyche und umgekehrt.</li> </ul> <p>Obwohl wissenschaftlich nicht beweisbar, hat Jungs Theorie einen enormen Einfluss auf die Literatur-, Kunst- und Filmwissenschaft, da sie ein mächtiges Werkzeug zur Analyse universeller menschlicher Themen bietet.</p> </div> );
const uebungenData2: UebungenData = { quiz: [ { q: "Das Konzept des &apos;kollektiven Unbewussten&apos; stammt von...", a: ["Adler", "Erikson", "Jung"], correct: 2 }, { q: "Wenn Ihr Real-Selbst und Ihr Ideal-Selbst stark voneinander abweichen, erleben Sie laut Rogers...", a: ["Kongruenz", "Inkongruenz", "Selbstverwirklichung"], correct: 1 }, ], open: [ { q: "Was ist laut Adler der &apos;Minderwertigkeitskomplex&apos; und wie treibt er uns an?", solution: "Adler glaubte, dass alle Menschen mit einem Gefühl der Minderwertigkeit geboren werden, da sie als Kinder klein und hilflos sind. Dieses Gefühl treibt uns unser Leben lang an, es zu überwinden und nach Überlegenheit, Kompetenz und Meisterschaft zu streben. Die Persönlichkeit ist demnach geformt durch die Art und Weise, wie wir mit diesem grundlegenden Gefühl umgehen." }, ], kreativ: "Beschreiben Sie einen bekannten Filmcharakter (z.B. Luke Skywalker, Harry Potter) anhand von Jungs Archetypen (z.B. der Held, der weise alte Mann, der Schatten)." };
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;
const grundwissenInhalt3 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Diese Ansätze sehen die Persönlichkeit nicht als Ergebnis innerer Konflikte, sondern als Produkt von Lernprozessen und biologischen Veranlagungen.</p> <h3 className="text-2xl font-semibold border-b pb-2">Behavioristische Perspektive</h3> <p>Strikte Behavioristen wie B.F. Skinner argumentierten, dass Persönlichkeit kein angeborenes Konstrukt ist. Stattdessen sind unsere &quot;Persönlichkeitszüge&quot; stabile Muster von Verhalten, die wir gelernt haben, weil sie in der Vergangenheit verstärkt (belohnt) wurden. Unsere Persönlichkeit ist demnach die Summe unserer Lerngeschichte.</p> <h3 className="text-2xl font-semibold border-b pb-2">Sozial-kognitive Perspektive (Bandura)</h3> <p>Albert Bandura erweiterte den Behaviorismus um kognitive Prozesse. Er stimmte zu, dass wir lernen, betonte aber auch die Rolle von Denken und Beobachtung.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Beobachtungslernen:</strong> Wir lernen, indem wir das Verhalten anderer und dessen Konsequenzen beobachten.</li> <li><strong>Selbstwirksamkeit (Self-Efficacy):</strong> Unser Glaube an unsere eigenen Fähigkeiten, bestimmte Aufgaben zu bewältigen. Eine hohe Selbstwirksamkeit beeinflusst, welche Herausforderungen wir annehmen.</li> <li><strong>Reziproker Determinismus:</strong> Persönlichkeit ist ein ständiges Wechselspiel zwischen kognitiven Faktoren (Gedanken, Überzeugungen), unserem Verhalten und der Umwelt. Jeder Faktor beeinflusst die anderen beiden.</li> </ul> </div> );
const anwendbarkeitInhalt3 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Selbstwirksamkeit im Alltag</h3> <p className="text-lg leading-relaxed">Ihr Glaube an Ihre Fähigkeit, erfolgreich zu sein, hat einen enormen Einfluss auf Ihr Leben.</p> <p>Stellen Sie sich zwei Studenten vor, die beide vor einer schwierigen Matheprüfung stehen.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Student A (hohe Selbstwirksamkeit):</strong> Denkt: &quot;Das ist schwer, aber wenn ich mich anstrenge, kann ich es schaffen.&quot; Er wird die Herausforderung annehmen, intensiv lernen und sich von Rückschlägen nicht entmutigen lassen.</li> <li><strong>Student B (niedrige Selbstwirksamkeit):</strong> Denkt: &quot;Ich war noch nie gut in Mathe, das schaffe ich sowieso nicht.&quot; Er wird die Aufgabe meiden, weniger lernen und bei der ersten Schwierigkeit aufgeben.</li> </ul> <p>Am Ende wird Student A wahrscheinlich erfolgreicher sein, nicht unbedingt weil er &quot;intelligenter&quot; ist, sondern weil sein Glaube an die eigene Fähigkeit sein Verhalten (Anstrengung, Ausdauer) positiv beeinflusst hat. Dies ist eine sich selbst erfüllende Prophezeiung.</p> </div> );
const meisterklasseInhalt3 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die biologische Perspektive: Temperament</h3> <p>Die biologische Perspektive argumentiert, dass Persönlichkeitsunterschiede zu einem grossen Teil auf angeborenen, genetisch bedingten Unterschieden im Temperament beruhen. Das **Temperament** ist die früh erscheinende, biologisch basierte Tendenz, auf eine bestimmte Weise zu fühlen und zu handeln.</p> <p>Forscher wie Thomas und Chess identifizierten drei grundlegende Temperamentstypen bei Säuglingen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Das einfache Kind:</strong> Positiv gestimmt, anpassungsfähig, regelmässiger Rhythmus.</li> <li><strong>Das schwierige Kind:</strong> Negativ gestimmt, reagiert schlecht auf Neues, unregelmässiger Rhythmus.</li> <li><strong>Das langsam auftauende Kind:</strong> Geringe Aktivität, leicht negativ, braucht Zeit, um sich an Neues anzupassen.</li> </ul> <p>Diese frühen Temperamentsunterschiede gelten als die biologische Grundlage, auf der die spätere Persönlichkeit durch Interaktion mit der Umwelt aufgebaut wird.</p> </div> );
const uebungenData3: UebungenData = { quiz: [ { q: "Banduras Konzept des Glaubens an die eigenen Fähigkeiten nennt man...", a: ["Selbstkonzept", "Selbstwirksamkeit", "Selbstwertgefühl"], correct: 1 }, { q: "Die angeborene, biologische Tendenz, auf eine bestimmte Weise zu handeln und zu fühlen, ist das...", a: ["Persönlichkeit", "Temperament", "Charakter"], correct: 1 }, ], open: [ { q: "Erkläre den Reziproken Determinismus mit einem Beispiel.", solution: "Beispiel: Eine Person mit der kognitiven Überzeugung &apos;Ich bin gesellig&apos; (Kognition) geht eher auf Partys (Verhalten). Auf den Partys trifft sie andere gesellige Menschen, die ihr positives Verhalten verstärken (Umwelt). Diese positive soziale Umwelt wiederum bestärkt ihre Überzeugung, gesellig zu sein." }, ], kreativ: "Wie könnte das Konzept der Selbstwirksamkeit in einer Therapie für Menschen mit sozialer Angst eingesetzt werden?" };
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;
const grundwissenInhalt4 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Eigenschaftstheoretiker versuchen, die Persönlichkeit durch die Identifizierung stabiler, charakteristischer Merkmale und Verhaltensweisen, sogenannter **Traits**, zu beschreiben. Anstatt das &quot;Warum&quot; (wie bei Freud) zu fragen, konzentrieren sie sich auf das &quot;Was&quot;.</p> <h3 className="text-2xl font-semibold border-b pb-2">Das Fünf-Faktoren-Modell (&quot;Big Five&quot;)</h3> <p>Das heute dominanteste Modell ist das Fünf-Faktoren-Modell. Es besagt, dass sich fast alle Persönlichkeitsunterschiede auf fünf breite Dimensionen zurückführen lassen. Ein nützliches Akronym dafür ist **OCEAN** (oder CANOE):</p> <ul className="list-disc list-inside space-y-4 pl-2"> <li><strong>O - Offenheit für Erfahrungen (Openness):</strong> Vorstellungskraft, Kreativität, Neugier vs. Bodenständigkeit, Konventionalität.</li> <li><strong>C - Gewissenhaftigkeit (Conscientiousness):</strong> Organisation, Disziplin, Sorgfalt vs. Unbekümmertheit, Nachlässigkeit.</li> <li><strong>E - Extraversion:</strong> Geselligkeit, Energie, positive Emotionalität vs. Introversion, Zurückhaltung.</li> <li><strong>A - Verträglichkeit (Agreeableness):</strong> Mitgefühl, Kooperationsbereitschaft, Freundlichkeit vs. Misstrauen, Kompetitivität.</li> <li><strong>N - Neurotizismus:</strong> Emotionale Instabilität, Ängstlichkeit, Launenhaftigkeit vs. Emotionale Stabilität, Gelassenheit.</li> </ul> <p>Jeder Mensch lässt sich auf jeder dieser fünf Dimensionen auf einem Kontinuum von hoch bis niedrig einordnen.</p> </div> );
const anwendbarkeitInhalt4 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die Big Five am Arbeitsplatz</h3> <p className="text-lg leading-relaxed">Das Fünf-Faktoren-Modell hat eine hohe Vorhersagekraft für beruflichen Erfolg und wird daher oft in der Personalauswahl eingesetzt.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Gewissenhaftigkeit</strong> ist der stärkste einzelne Prädiktor für allgemeinen Berufserfolg in fast allen Berufen. Gewissenhafte Menschen sind zuverlässig, organisiert und diszipliniert.</li> <li><strong>Extraversion</strong> ist ein guter Prädiktor für Erfolg in Berufen, die viel soziale Interaktion erfordern, wie z.B. im Vertrieb oder im Management.</li> <li><strong>Verträglichkeit</strong> ist wichtig für Berufe, die Teamarbeit und Kooperation erfordern.</li> <li><strong>Offenheit für Erfahrungen</strong> korreliert mit Kreativität und der Fähigkeit, sich an Veränderungen anzupassen.</li> <li>Ein hoher **Neurotizismus** (niedrige emotionale Stabilität) ist oft ein negativer Prädiktor für berufliche Zufriedenheit und Leistung, besonders in stressigen Umgebungen.</li> </ul> <p>Wenn Sie Ihre eigenen Big-Five-Werte kennen, kann Ihnen das helfen, eine berufliche Laufbahn zu wählen, die gut zu Ihrer Persönlichkeit passt.</p> </div> );
const meisterklasseInhalt4 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Person-Situation-Debatte</h3> <p>Eine der grössten Debatten in der Persönlichkeitspsychologie war die Person-Situation-Debatte, angestossen durch Walter Mischel. Er argumentierte, dass das Verhalten von Menschen über verschiedene Situationen hinweg viel weniger konsistent ist, als Trait-Theoretiker annehmen.</p> <p><strong>Beispiel:</strong> Jemand, der im Büro extrem gewissenhaft ist, kann zu Hause sehr chaotisch sein. Jemand, der unter Freunden sehr extravertiert ist, kann in einer grossen, fremden Gruppe sehr schüchtern sein.</p> <p><strong>Die moderne Synthese (Interaktionismus):</strong> Heute sind sich die meisten Psychologen einig, dass sowohl die Persönlichkeit (Traits) als auch die Situation das Verhalten beeinflussen. Die Wahrheit liegt in der Interaktion:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li>Starke Situationen (z.B. in einer Kirche, im Militär) lassen wenig Raum für individuelle Persönlichkeitsunterschiede und zwingen die meisten Menschen in ein ähnliches Verhalten.</li> <li>Schwache Situationen (z.B. auf einer Party, im Park) lassen viel Raum, in dem die individuelle Persönlichkeit zum Vorschein kommen kann.</li> </ul> <p>Unser Verhalten ist also immer ein Produkt dessen, wer wir sind **und** wo wir sind.</p> </div> );
const uebungenData4: UebungenData = { quiz: [ { q: "Welche Dimension gehört NICHT zu den &apos;Big Five&apos;?", a: ["Offenheit", "Ehrlichkeit", "Gewissenhaftigkeit"], correct: 1 }, { q: "Welcher &apos;Big Five&apos;-Trait ist der beste allgemeine Prädiktor für Berufserfolg?", a: ["Extraversion", "Verträglichkeit", "Gewissenhaftigkeit"], correct: 2 }, ], open: [ { q: "Beschreibe eine Person, die hoch in Extraversion und niedrig in Gewissenhaftigkeit ist. Welchen Beruf könnte sie haben?", solution: "Diese Person ist wahrscheinlich sehr gesellig, enthusiastisch und liebt es, im Mittelpunkt zu stehen, ist aber gleichzeitig unorganisiert, undiszipliniert und unzuverlässig bei Details. Ein Beruf im Event-Management oder als Entertainer könnte gut passen, wo ihre soziale Energie ein Vorteil ist, solange sie ein Team für die Detailplanung hat." }, ], kreativ: "Die Person-Situation-Debatte: Beschreibe eine &apos;starke&apos; und eine &apos;schwache&apos; Situation aus deinem eigenen Leben und wie dein Verhalten in beiden unterschiedlich war." };
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;
const grundwissenInhalt5 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Persönlichkeitstests sind standardisierte Instrumente, die entwickelt wurden, um Aspekte der Persönlichkeit einer Person zu messen. Man unterscheidet hauptsächlich zwei Arten von Tests:</p> <h3 className="text-2xl font-semibold border-b pb-2">Selbstberichtsverfahren</h3> <p>Dies sind typischerweise Fragebögen mit Multiple-Choice- oder skalierten Antworten (z.B. &quot;stimme voll zu&quot; bis &quot;stimme gar nicht zu&quot;). Sie sind einfach zu administrieren und auszuwerten.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Beispiel:</strong> Der **MMPI (Minnesota Multiphasic Personality Inventory)** ist einer der am weitesten verbreiteten klinischen Persönlichkeitstests. Er enthält Hunderte von Ja/Nein-Fragen und wird verwendet, um psychische Probleme zu screenen.</li> </ul> <p>Die grosse Herausforderung bei diesen Tests ist die soziale Erwünschtheit – die Tendenz von Menschen, sich in einem besseren Licht darzustellen.</p> <h3 className="text-2xl font-semibold border-b pb-2">Projektive Tests</h3> <p>Diese Tests basieren auf der psychodynamischen Annahme, dass Menschen ihre unbewussten Ängste, Wünsche und Konflikte auf mehrdeutiges Material projizieren. Die Interpretation ist stark subjektiv.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Rorschach-Test:</strong> Die Person interpretiert eine Serie von symmetrischen Tintenklecksen.</li> <li><strong>Thematischer Apperzeptionstest (TAT):</strong> Die Person erfindet Geschichten zu einer Reihe von mehrdeutigen Bildern.</li> </ul> </div> );
const anwendbarkeitInhalt5 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die &quot;Lügenskala&quot; im MMPI</h3> <p className="text-lg leading-relaxed">Wie gehen Tests wie der MMPI mit dem Problem der sozialen Erwünschtheit um? Sie haben eingebaute **Validitätsskalen**.</p> <p>Eine dieser Skalen ist die **Lügenskala (L-Skala)**. Sie enthält eine Reihe von Fragen über kleinere, sehr häufige menschliche Fehler, die fast jeder macht, aber ungern zugibt. Beispiele könnten sein:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li>&quot;Ich lese jeden Leitartikel in der Zeitung jeden Tag.&quot;</li> <li>&quot;Ich werde manchmal wütend.&quot; (Antwort &quot;Nein&quot; wäre verdächtig)</li> <li>&quot;Ich habe noch nie etwas getan, wofür ich mich schäme.&quot;</li> </ul> <p>Wenn eine Person zu viele dieser Fragen in einer übermässig tugendhaften Weise beantwortet (also alltägliche kleine Fehler leugnet), deutet dies darauf hin, dass sie versucht, sich absichtlich besser darzustellen, als sie ist. Ein hoher Wert auf der L-Skala macht das gesamte Testprofil ungültig oder zumindest fragwürdig.</p> </div> );
const meisterklasseInhalt5 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die Kontroverse um projektive Tests</h3> <p>Während projektive Tests in der Popkultur sehr präsent sind, ist ihre wissenschaftliche Anerkennung stark umstritten. Die Hauptkritikpunkte sind:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Geringe Reliabilität (Zuverlässigkeit):</strong> Zwei verschiedene Testleiter können bei derselben Person zu völlig unterschiedlichen Interpretationen kommen.</li> <li><strong>Geringe Validität (Gültigkeit):</strong> Es gibt kaum Belege dafür, dass diese Tests tatsächlich das messen, was sie zu messen vorgeben, oder dass sie zukünftiges Verhalten vorhersagen können.</li> </ul> <p>Moderne standardisierte Auswertungssysteme (wie das von Exner für den Rorschach-Test) haben versucht, die Reliabilität zu verbessern. Dennoch werden projektive Tests in der modernen, empirisch orientierten Psychologie nur noch selten als primäres Diagnoseinstrument eingesetzt. Sie können aber in der Therapie nützlich sein, um ins Gespräch zu kommen und Hypothesen über die innere Welt eines Klienten zu generieren (&quot;icebreaker&quot;).</p> </div> );
const uebungenData5: UebungenData = { quiz: [ { q: "Der Rorschach-Test ist ein Beispiel für einen...", a: ["Selbstberichtstest", "Projektiven Test", "Leistungstest"], correct: 1 }, { q: "Was ist ein Hauptproblem von Selbstberichtsfragebögen?", a: ["Soziale Erwünschtheit", "Zu hohe Kosten", "Komplexe Auswertung"], correct: 0 }, ], open: [ { q: "Warum ist die wissenschaftliche Gültigkeit (Validität) von projektiven Tests wie dem TAT umstritten?", solution: "Die Validität ist umstritten, weil die Interpretation der Geschichten stark vom jeweiligen Therapeuten abhängt (geringe Objektivität und Reliabilität). Es gibt zudem kaum empirische Belege dafür, dass die erzählten Geschichten tatsächlich die unbewussten Konflikte der Person widerspiegeln oder dass sie Vorhersagen über zukünftiges Verhalten erlauben." }, ], kreativ: "Stellen Sie sich vor, Sie müssten einen sehr einfachen &apos;Persönlichkeitstest&apos; mit nur einer einzigen Frage entwerfen, um möglichst viel über eine Person zu erfahren. Welche Frage würden Sie stellen und warum?" };
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;


// --- MODUL-LISTE (VOLLSTÄNDIG) ---
const personalityPsychologyModules: PersonalityModule[] = [
    { id: 1, title: "Einführung & Psychodynamische Perspektive", content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: "Neo-Freudianer & Humanistische Perspektive", content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: "Lerntheoretische & Biologische Ansätze", content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: "Eigenschaftstheorien (Trait-Theorien)", content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: "Persönlichkeitsmessung", content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = personalityPsychologyModules.find(m => m.id === moduleId);

  // --- NEU: LOGIK FÜR DIE BLÄTTERFUNKTION ---
  const lessonParts = ['grundwissen', 'anwendbarkeit', 'meisterklasse', 'uebungen'];
  const currentIndex = lessonParts.indexOf(type);

  const prevPart = currentIndex > 0 ? lessonParts[currentIndex - 1] : null;
  const nextPart = currentIndex < lessonParts.length - 1 ? lessonParts[currentIndex + 1] : null;

  const prevLink = prevPart ? `/modules/8/${prevPart}-${moduleId}` : null;
  const nextLink = nextPart ? `/modules/8/${nextPart}-${moduleId}` : null;
  // --- ENDE DER NEUEN LOGIK ---

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/8" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Übersicht der Persönlichkeitspsychologie</span>
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
        <Link href="/modules/8" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Übersicht der Persönlichkeitspsychologie</span>
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
             <Link href="/modules/8" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              <span>Zurück zur Übersicht</span>
            </Link>
          )}
        </div>
        {/* --- ENDE DER NEUEN UI --- */}

      </div>
    </div>
  );
}