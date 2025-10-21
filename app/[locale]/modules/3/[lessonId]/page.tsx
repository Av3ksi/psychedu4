'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Check, X, Eye, EyeOff } from 'lucide-react';
import { ReactNode, useState, FC } from 'react';

// --- NEUE IMPORTE FÜR PREMIUM-CHECK ---
import { useSubscription } from '@/hooks/useSubscription';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslations } from 'next-intl';

// --- TYP-DEFINITIONEN ---
// ... (Dein Code für Typen, z.B. QuizQuestion, OpenQuestion)
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
interface ClinicalPsychologyModule {
  id: number;
  title: string;
  content: ModuleContent;
}

// --- HILFS-KOMPONENTEN ---
// ... (Dein Code für ToggleSolution und UebungenContent)
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


// --- INHALTE FÜR ALLE MODULE DER KLINISCHEN PSYCHOLOGIE ---
// ... (Dein gesamter Inhalt für grundwissenInhalt1, uebungenData1, etc. bleibt hier)
// Modul 1: Einführung
const grundwissenInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Klinische Psychologie ist ein Teilgebiet der Psychologie, das sich mit der Prävention, Diagnostik, Behandlung und Rehabilitation psychischer Störungen sowie mit der Förderung der psychischen Gesundheit befasst.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Was ist eine psychische Störung?</h3>
        <p>Laut der American Psychiatric Association ist eine psychische Störung ein Syndrom, das durch klinisch signifikante Störungen in den Kognitionen, der Emotionsregulation oder dem Verhalten einer Person gekennzeichnet ist. Diese Störungen sind Ausdruck einer Dysfunktion in den psychologischen, biologischen oder entwicklungsspezifischen Prozessen, die der psychischen Funktion zugrunde liegen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das Biopsychosoziale Modell</h3>
        <p>Dies ist das vorherrschende Modell zum Verständnis psychischer Störungen. Es besagt, dass psychische Störungen durch ein komplexes Zusammenspiel von drei Faktorengruppen entstehen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Biologische Faktoren:</strong> Genetische Veranlagung, Neurotransmitter-Ungleichgewichte, Gehirnanomalien.</li>
            <li><strong>Psychologische Faktoren:</strong> Kognitive Muster (z.B. negatives Denken), erlerntes Verhalten, Trauma, Stressbewältigungsstrategien.</li>
            <li><strong>Soziale und kulturelle Faktoren:</strong> Sozioökonomischer Status, soziale Unterstützung, kulturelle Normen, Diskriminierungserfahrungen.</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p><strong>Wichtig:</strong> Es gibt selten eine einzige &quot;Ursache&quot;. Meistens interagieren diese Faktoren miteinander (Vulnerabilitäts-Stress-Modell).</p></div>
    </div>
);
const anwendbarkeitInhalt1 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Jeder fühlt sich mal traurig oder hat Angst. Der entscheidende Unterschied zwischen Alltagsgefühlen und einer klinisch relevanten Störung liegt oft in den &quot;4 D&apos;s&quot;:</p>
        <ol className="list-decimal list-inside space-y-4 pl-2">
            <li><strong>Devianz (Abweichung):</strong> Das Verhalten weicht stark von kulturellen und statistischen Normen ab. (Ist aber allein kein Kriterium!)</li>
            <li><strong>Dysfunktion:</strong> Das Verhalten beeinträchtigt signifikant das tägliche Leben – bei der Arbeit, in der Schule oder in sozialen Beziehungen. Eine Person kann z.B. wegen ihrer Angst das Haus nicht mehr verlassen.</li>
            <li><strong>Leidensdruck (Distress):</strong> Die Person leidet subjektiv unter ihren Symptomen.</li>
            <li><strong>Gefährdung (Danger):</strong> Das Verhalten stellt eine Gefahr für die Person selbst (z.B. Suizidalität) oder für andere dar.</li>
        </ol>
        <p><strong>Anwendung im Alltag:</strong> Wenn Sie sich Sorgen um einen Freund machen, der oft traurig ist, können Sie diese Kriterien als Leitfaden nutzen. Fragen Sie sich: Behindert die Traurigkeit seinen Alltag (Dysfunktion)? Leidet er stark darunter (Leidensdruck)? Eine professionelle Diagnose kann nur ein Experte stellen, aber diese Kriterien helfen bei der Einschätzung, ob professionelle Hilfe ratsam wäre.</p>
    </div>
);
const meisterklasseInhalt1 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die historische Perspektive: Vom Übernatürlichen zum Wissenschaftlichen</h3>
        <p>Das Verständnis psychischer Störungen hat sich dramatisch gewandelt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Übernatürliche Modelle (Antike bis Mittelalter):</strong> Psychische Störungen wurden als Werk von Dämonen, Geistern oder Göttern gesehen. Behandlungen umfassten Exorzismen oder Trepanationen (Schädellöcher bohren).</li>
            <li><strong>Biologische Modelle (Antike Griechen & Renaissance):</strong> Hippokrates führte Störungen auf ein Ungleichgewicht der Körpersäfte zurück. Im 19. Jahrhundert wurde mit der Entdeckung, dass Syphilis zu Demenz führen kann, die biologische Perspektive gestärkt.</li>
            <li><strong>Psychologische Modelle (spätes 19. / 20. Jhd.):</strong> Freud betonte unbewusste Konflikte. Der Behaviorismus sah Störungen als erlerntes Fehlverhalten. Die kognitive Wende rückte dysfunktionale Denkmuster in den Fokus.</li>
        </ul>
        <p>Das heutige biopsychosoziale Modell ist eine Integration dieser Perspektiven und erkennt an, dass keine einzelne Sichtweise ausreicht, um die Komplexität psychischer Störungen vollständig zu erfassen.</p>
    </div>
);
const uebungenData1: UebungenData = {
    quiz: [
        { q: "Welches Modell ist heute vorherrschend zur Erklärung psychischer Störungen?", a: ["Das rein biologische Modell", "Das biopsychosoziale Modell", "Das übernatürliche Modell"], correct: 1 },
        { q: "Welches der '4 D's' bezieht sich auf die Beeinträchtigung des Alltagslebens?", a: ["Devianz", "Danger", "Dysfunktion"], correct: 2 },
    ],
    open: [
        { q: "Eine Person hat extreme Angst vor Spinnen, lebt aber in der Antarktis und sieht nie eine. Erfüllt sie die Kriterien für eine klinisch relevante Phobie? Begründe mit den '4 D's'.", solution: "Wahrscheinlich nicht. Obwohl ihr Verhalten (extreme Angst) von der Norm abweicht (Devianz) und sie vielleicht darunter leidet (Distress), fehlt die Dysfunktion. Da sie nie auf eine Spinne trifft, ist ihr tägliches Leben nicht beeinträchtigt. Würde sie nach Australien ziehen, würde die Dysfunktion eintreten und es wäre eine klinisch relevante Störung." },
    ],
    kreativ: "Stellen Sie sich eine fiktive Kultur vor, in der es als normal gilt, mit den Geistern der Ahnen zu sprechen. Wäre dies nach dem Kriterium der 'Devianz' ein Anzeichen für eine psychische Störung in dieser Kultur? Was lernen wir daraus über die Definition von 'normal'?"
};
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;

// ... (Restlicher Inhalt für Module 2-9) ...

// --- INHALTE FÜR MODUL 2: Diagnostik & Klassifikation ---
const grundwissenInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Um psychische Störungen zuverlässig zu identifizieren und zu kommunizieren, benötigen Kliniker ein standardisiertes System. Die beiden wichtigsten Klassifikationssysteme weltweit sind:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>DSM-5 (Diagnostic and Statistical Manual of Mental Disorders, 5th Edition):</strong> Herausgegeben von der American Psychiatric Association (APA). Hauptsächlich in Nordamerika und in der Forschung verwendet.</li>
            <li><strong>ICD-11 (International Classification of Diseases, 11th Revision):</strong> Herausgegeben von der Weltgesundheitsorganisation (WHO). Weltweit für die klinische Praxis und Gesundheitsstatistiken verwendet. Enthält alle Krankheiten, nicht nur psychische.</li>
        </ul>
        <p>Beide Systeme sind heute sehr ähnlich. Sie sind **kategorial**, d.h., sie definieren Störungen anhand einer Liste von Symptomkriterien. Eine Person erhält eine Diagnose, wenn sie eine bestimmte Anzahl der erforderlichen Symptome über einen bestimmten Zeitraum zeigt und dadurch klinisch signifikantes Leiden oder Beeinträchtigung erfährt.</p>
    </div>
);
const anwendbarkeitInhalt2 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Patient klagt über anhaltende Niedergeschlagenheit. Wie geht ein Kliniker vor, um eine Diagnose für eine **Major Depression** nach DSM-5 zu stellen?</p>
        <p>Der Kliniker prüft systematisch die Kriterien:</p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Hauptkriterium (A):</strong> Liegen mindestens 5 von 9 Symptomen (darunter zwingend depressive Verstimmung oder Interessenverlust) über einen Zeitraum von mindestens 2 Wochen vor?</li>
            <li><strong>Leidensdruck/Beeinträchtigung (B):</strong> Verursachen die Symptome klinisch signifikantes Leiden oder Beeinträchtigungen im sozialen, beruflichen oder anderen wichtigen Funktionsbereichen?</li>
            <li><strong>Ausschlusskriterien (C, D, E):</strong> Gehen die Symptome nicht auf die Einnahme von Substanzen oder einen medizinischen Krankheitsfaktor zurück? Gab es nie eine manische oder hypomanische Episode (was auf eine bipolare Störung hindeuten würde)?</li>
        </ol>
        <p>Nur wenn alle Kriterien erfüllt sind, kann die Diagnose &quot;Major Depression&quot; gestellt werden. Dieser strukturierte Prozess stellt sicher, dass Diagnosen nicht willkürlich, sondern nachvollziehbar und standardisiert sind, was für die Behandlungsplanung und die Kommunikation zwischen Fachleuten unerlässlich ist.</p>
    </div>
);
const meisterklasseInhalt2 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Kategorial vs. Dimensional: Die grosse Debatte</h3>
        <p>Der Hauptkritikpunkt an DSM und ICD ist ihr **kategorialer** Ansatz. Er behandelt Störungen wie Schalter, die entweder &quot;an&quot; (Störung liegt vor) oder &quot;aus&quot; (Störung liegt nicht vor) sind. Dies vereinfacht die Realität.</p>
        <p>Ein **dimensionaler** Ansatz würde psychische Probleme stattdessen auf Kontinua erfassen. Anstatt zu fragen, &quot;Hat die Person eine Depression?&quot;, würde man fragen: &quot;Wie stark ausgeprägt ist ihre depressive Symptomatik auf einer Skala von 0 bis 100?&quot;.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Vorteil Kategorial:</strong> Einfach in der Anwendung, nützlich für klinische Entscheidungen (z.B. Medikamentenverschreibung) und Versicherungsabrechnungen.</li>
            <li><strong>Vorteil Dimensional:</strong> Bildet die Realität besser ab (die meisten Symptome existieren auf einem Spektrum), reduziert Stigmatisierung durch &quot;Schubladendenken&quot; und erfasst subklinische Probleme besser.</li>
        </ul>
        <p>DSM-5 und ICD-11 haben begonnen, dimensionale Aspekte zu integrieren (z.B. die Angabe von Schweregraden), aber der grundlegende Ansatz bleibt kategorial. Die Zukunft der Diagnostik bewegt sich wahrscheinlich weiter in eine dimensionale Richtung.</p>
    </div>
);
const uebungenData2: UebungenData = {
    quiz: [
        { q: "Welches Diagnosesystem wird von der WHO herausgegeben und ist weltweit verbreitet?", a: ["DSM-5", "ICD-11", "PCL-5"], correct: 1 },
        { q: "Der Ansatz, Störungen als 'vorhanden' oder 'nicht vorhanden' zu klassifizieren, nennt man...", a: ["Dimensional", "Biopsychosozial", "Kategorial"], correct: 2 },
    ],
    open: [
        { q: "Nenne zwei Vorteile eines standardisierten diagnostischen Systems wie dem DSM-5.", solution: "1. Verbesserte Kommunikation: Kliniker und Forscher auf der ganzen Welt sprechen über dasselbe, wenn sie von &apos;Schizophrenie&apos; sprechen. 2. Erhöhte Zuverlässigkeit (Reliabilität): Verschiedene Kliniker kommen bei demselben Patienten mit höherer Wahrscheinlichkeit zur selben Diagnose." },
    ],
    kreativ: "Kritiker sagen, diagnostische 'Labels' können stigmatisierend sein. Befürworter sagen, sie können entlastend sein ('Endlich hat mein Leiden einen Namen'). Diskutiere kurz beide Seiten."
};
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;

// --- INHALTE FÜR MODUL 3: Angst- und Zwangsstörungen ---
const grundwissenInhalt3 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Angst ist eine normale, adaptive Reaktion auf eine Bedrohung. Bei einer Angststörung ist die Angst jedoch übermässig, unrealistisch und beeinträchtigt das Leben der Person erheblich.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Wichtige Angststörungen</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Spezifische Phobie:</strong> Starke, irrationale Angst vor einem bestimmten Objekt oder einer Situation (z.B. Spinnen, Höhe, Fliegen).</li>
            <li><strong>Soziale Angststörung (Sozialphobie):</strong> Angst vor sozialen Situationen, in denen man von anderen negativ bewertet werden könnte.</li>
            <li><strong>Panikstörung:</strong> Wiederkehrende, unerwartete Panikattacken – plötzliche Anfälle intensiver Angst mit starken körperlichen Symptomen (Herzrasen, Atemnot).</li>
            <li><strong>Generalisierte Angststörung (GAS):</strong> Chronische, unkontrollierbare Sorgen über eine Vielzahl von Themen.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Zwangsstörung (OCD)</h3>
        <p>Obwohl im DSM-5 in einer eigenen Kategorie, ist sie eng mit den Angststörungen verwandt. Sie besteht aus zwei Komponenten:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Zwangsgedanken (Obsessions):</strong> Aufdringliche, wiederkehrende und unerwünschte Gedanken, die Angst oder Unbehagen auslösen (z.B. Angst vor Kontamination).</li>
            <li><strong>Zwangshandlungen (Compulsions):</strong> Wiederholte Verhaltensweisen oder mentale Akte, die die Person ausführt, um die durch die Zwangsgedanken ausgelöste Angst zu reduzieren (z.B. exzessives Händewaschen).</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Der Teufelskreis der Panikstörung</h3>
        <p>Das Verständnis dieses Modells ist entscheidend, um Panikattacken zu bewältigen:</p>
        <ol className="list-decimal list-inside space-y-4 pl-2">
            <li><strong>Auslöser:</strong> Eine harmlose Körperempfindung (z.B. leichtes Herzklopfen, weil man eine Treppe gestiegen ist).</li>
            <li><strong>Katastrophisierende Fehlinterpretation:</strong> Die Person interpretiert das Herzklopfen als Zeichen einer unmittelbaren Katastrophe (&quot;Ich bekomme einen Herzinfarkt!&quot;).</li>
            <li><strong>Angst & physiologische Reaktion:</strong> Diese Interpretation löst massive Angst aus, was das sympathische Nervensystem aktiviert. Adrenalin wird ausgeschüttet, das Herz schlägt noch schneller.</li>
            <li><strong>Verstärkung der Körperempfindung:</strong> Das nun tatsächlich rasende Herz bestätigt die ursprüngliche Fehlinterpretation (&quot;Siehst du, es wird schlimmer, ich sterbe!&quot;).</li>
        </ol>
        <p>Dieser Kreislauf schaukelt sich innerhalb von Minuten zu einer vollen Panikattacke hoch. Die Therapie (KVT) setzt genau bei Schritt 2 an: Sie lehrt Patienten, ihre Körperempfindungen nicht als katastrophal zu interpretieren, wodurch der Teufelskreis durchbrochen wird.</p>
    </div>
);
const meisterklasseInhalt3 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Rolle von Vermeidung</h3>
        <p>Das zentrale aufrechterhaltende Verhalten bei allen Angst- und Zwangsstörungen ist die **Vermeidung**. Eine Person mit Sozialphobie meidet Partys, eine Person mit einer Spinnenphobie meidet Keller, und eine Person mit Zwangsstörung führt ihre Rituale durch, um die Angst zu &quot;vermeiden&quot;.</p>
        <p>Das Problem: Kurzfristig reduziert Vermeidung die Angst, was als Belohnung wirkt (negative Verstärkung). Langfristig verhindert sie jedoch, dass die Person die korrigierende Erfahrung macht, dass die gefürchtete Situation gar nicht so schlimm ist und dass sie die Angst aushalten kann. Die Angst wird dadurch chronisch.</p>
        <p>Deshalb ist die **Expositionstherapie** (sich den gefürchteten Situationen stellen) die wirksamste Behandlungsmethode. Sie durchbricht den Kreislauf der Vermeidung und ermöglicht neues Lernen.</p>
    </div>
);
const uebungenData3: UebungenData = {
    quiz: [
        { q: "Wiederkehrende, unerwartete Panikattacken sind das Hauptmerkmal der...", a: ["Generalisierten Angststörung", "Panikstörung", "Spezifischen Phobie"], correct: 1 },
        { q: "Exzessives Händewaschen aus Angst vor Keimen ist ein Beispiel für eine...", a: ["Zwangsgedanke (Obsession)", "Zwangshandlung (Compulsion)", "Phobie"], correct: 1 },
    ],
    open: [
        { q: "Erkläre den Unterschied zwischen einer spezifischen Phobie und einer generalisierten Angststörung (GAS).", solution: "Bei einer spezifischen Phobie ist die Angst an ein konkretes, identifizierbares Objekt oder eine Situation gebunden (z.B. Flugzeuge). Bei der GAS ist die Angst 'frei flottierend' und bezieht sich auf viele verschiedene Lebensbereiche (Gesundheit, Finanzen, Arbeit), ohne einen spezifischen Auslöser." },
    ],
    kreativ: "Entwirf eine kleine Hierarchie für eine Expositionstherapie für jemanden mit einer milden Höhenangst, beginnend mit dem einfachsten Schritt."
};
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;

// --- INHALTE FÜR MODUL 4: Depressive und Bipolare Störungen ---
const grundwissenInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Stimmungsstörungen (affektive Störungen) sind durch schwere Störungen der Stimmung und der damit verbundenen Emotionen gekennzeichnet. Die beiden Hauptkategorien sind depressive und bipolare Störungen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Depressive Störungen</h3>
        <p>Das Kernmerkmal ist eine anhaltend gedrückte Stimmung und/oder der Verlust von Freude und Interesse (Anhedonie). Die häufigste Form ist die <strong>Major Depression</strong>. Weitere Symptome umfassen Veränderungen im Appetit oder Schlaf, Energieverlust, Schuldgefühle und Suizidgedanken.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Bipolare Störungen</h3>
        <p>Bipolare Störungen sind durch extreme Stimmungsschwankungen gekennzeichnet, die zwischen Phasen der Depression und Phasen der **Manie** oder **Hypomanie** wechseln.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Manie:</strong> Eine Periode von mindestens einer Woche mit abnorm gehobener, expansiver oder gereizter Stimmung, stark gesteigertem Antrieb, vermindertem Schlafbedürfnis, Grössenideen und riskantem Verhalten.</li>
            <li><strong>Hypomanie:</strong> Eine mildere Form der Manie, die mindestens vier Tage andauert, aber nicht zu einer schweren Beeinträchtigung der Funktionsfähigkeit führt.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt4 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Es ist entscheidend, eine unipolare Depression von einer bipolaren Störung zu unterscheiden, da die Behandlung sehr unterschiedlich ist. Ein häufiger Fehler ist die Fehldiagnose einer bipolaren Störung als reine Depression.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das Risiko der falschen Behandlung</h3>
        <p>Ein Patient stellt sich in einer depressiven Phase vor und berichtet von Niedergeschlagenheit und Antriebslosigkeit. Der Arzt diagnostiziert eine Major Depression und verschreibt ein Antidepressivum (z.B. einen SSRI).</p>
        <p>Wenn der Patient jedoch an einer bipolaren Störung leidet, kann das Antidepressivum die Stimmung &quot;umkippen&quot; lassen und eine **manische Episode auslösen** (ein sogenannter &quot;Switch&quot;). Dies kann gefährliche Folgen haben, wie exzessive Geldausgaben, riskantes Verhalten oder psychotische Symptome.</p>
        <p><strong>Anwendung:</strong> Ein guter Kliniker wird daher immer aktiv nach vergangenen Phasen von Hypomanie oder Manie fragen, auch wenn der Patient aktuell depressiv ist. Fragen wie &quot;Gab es jemals Zeiten, in denen Sie viel weniger Schlaf brauchten, aber trotzdem voller Energie waren?&quot; sind entscheidend für die korrekte Diagnose und die Wahl der richtigen Behandlung (Stimmungsstabilisatoren anstatt nur Antidepressiva).</p>
    </div>
);
const meisterklasseInhalt4 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Kognitive Triade der Depression (Aaron Beck)</h3>
        <p>Die kognitive Theorie ist eines der einflussreichsten Modelle zur Erklärung der Depression. Sie postuliert, dass Depression durch negative Denkmuster aufrechterhalten wird, die sich auf drei Bereiche beziehen (die kognitive Triade):</p>
        <ol className="list-decimal list-inside space-y-3 pl-2">
            <li><strong>Negative Sicht auf sich selbst:</strong> (&quot;Ich bin wertlos und unfähig.&quot;)</li>
            <li><strong>Negative Sicht auf die Welt/Umwelt:</strong> (&quot;Die Welt ist unfair und voller Hindernisse.&quot;)</li>
            <li><strong>Negative Sicht auf die Zukunft:</strong> (&quot;Es wird nie besser werden, meine Probleme sind unlösbar.&quot;)</li>
        </ol>
        <p>Diese negativen automatischen Gedanken führen zu den emotionalen (Traurigkeit) und verhaltensbezogenen (sozialer Rückzug) Symptomen der Depression. Die Kognitive Verhaltenstherapie (KVT) setzt direkt an diesen Denkmustern an, um sie zu identifizieren und zu verändern.</p>
    </div>
);
const uebungenData4: UebungenData = {
    quiz: [
        { q: "Welches Symptom ist charakteristisch für eine Manie, aber nicht für eine Depression?", a: ["Schlafstörungen", "Vermindertes Schlafbedürfnis bei gesteigerter Energie", "Konzentrationsprobleme"], correct: 1 },
        { q: "Der Verlust von Freude und Interesse wird als ... bezeichnet.", a: ["Anhedonie", "Alogie", "Apathie"], correct: 0 },
    ],
    open: [
        { q: "Warum ist es so wichtig, bei einem Patienten mit depressiven Symptomen immer auch nach manischen oder hypomanischen Episoden zu fragen?", solution: "Weil die Behandlung fundamental unterschiedlich ist. Die Gabe von Antidepressiva allein bei einer undiagnostizierten bipolaren Störung kann eine gefährliche manische Episode auslösen. Bipolare Störungen erfordern in der Regel Stimmungsstabilisatoren." },
    ],
    kreativ: "Formulieren Sie zu jedem Teil der kognitiven Triade nach Beck einen typischen negativen automatischen Gedanken, den eine Person mit Depression haben könnte."
};
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;

// --- INHALTE FÜR MODUL 5: Schizophrenie & Psychotische Störungen ---
const grundwissenInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Schizophrenie ist eine schwere psychische Störung, die das Denken, die Wahrnehmung, Emotionen und das Verhalten tiefgreifend beeinträchtigt. Sie wird oft fälschlicherweise mit einer &quot;gespaltenen Persönlichkeit&quot; verwechselt, was sie nicht ist. Es handelt sich um eine Störung des Realitätsbezugs.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Positiv- und Negativsymptome</h3>
        <p>Die Symptome werden oft in zwei Hauptkategorien unterteilt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Positivsymptome:</strong> Ein &quot;Zuviel&quot; an Erleben und Verhalten, das bei gesunden Menschen nicht vorkommt.
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li><strong>Wahnvorstellungen:</strong> Feste, unkorrigierbare Überzeugungen, die nicht der Realität entsprechen (z.B. Verfolgungswahn).</li>
                    <li><strong>Halluzinationen:</strong> Sinneswahrnehmungen ohne äusseren Reiz (am häufigsten das Hören von Stimmen).</li>
                    <li><strong>Desorganisierte Sprache und Denken.</strong></li>
                </ul>
            </li>
            <li><strong>Negativsymptome:</strong> Ein &quot;Zuwenig&quot; an normalem Erleben und Verhalten.
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li><strong>Affektverflachung:</strong> Reduzierter emotionaler Ausdruck.</li>
                    <li><strong>Alogie:</strong> Sprachverarmung.</li>
                    <li><strong>Avolition:</strong> Mangel an Motivation und Antrieb.</li>
                </ul>
            </li>
        </ul>
    </div>
);
const anwendbarkeitInhalt5 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Das Vulnerabilitäts-Stress-Modell ist der führende Erklärungsansatz für die Entstehung der Schizophrenie und vieler anderer psychischer Störungen. Es integriert biologische und umweltbedingte Faktoren.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die zwei Komponenten</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Vulnerabilität (Anfälligkeit):</strong> Eine angeborene oder früh erworbene biologische Prädisposition (z.B. genetische Faktoren, Komplikationen bei der Geburt). Diese Anfälligkeit allein führt aber noch nicht zur Erkrankung. Sie ist wie ein Fass, das bereits zu einem gewissen Grad gefüllt ist.</li>
            <li><strong>Stress:</strong> Belastende Lebensereignisse oder Umweltfaktoren (z.B. Drogenkonsum, sozialer Stress, familiäre Konflikte), die als Auslöser fungieren. Der Stress füllt das Fass weiter auf.</li>
        </ul>
        <p><strong>Die Erkrankung bricht aus, wenn die Kombination aus Vulnerabilität und Stress eine kritische Schwelle überschreitet – wenn das Fass überläuft.</strong></p>
        <p><strong>Anwendung in der Prävention:</strong> Dieses Modell zeigt, warum es so wichtig ist, bei Personen mit bekannter genetischer Vorbelastung (z.B. wenn ein Elternteil an Schizophrenie erkrankt ist) besonders auf die Reduzierung von Stressfaktoren zu achten (z.B. Vermeidung von Drogen, Stressmanagement-Training).</p>
    </div>
);
const meisterklasseInhalt5 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die Dopamin-Hypothese</h3>
        <p>Eine der prominentesten biologischen Theorien zur Schizophrenie ist die Dopamin-Hypothese. Sie besagt, dass die Symptome der Schizophrenie mit einer Überaktivität des Neurotransmitters Dopamin in bestimmten Gehirnregionen zusammenhängen.</p>
        <p><strong>Belege dafür:</strong></p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li>Antipsychotische Medikamente, die die Symptome lindern, wirken als Dopamin-Antagonisten (sie blockieren Dopamin-Rezeptoren).</li>
            <li>Drogen wie Amphetamine, die die Dopamin-Freisetzung stark erhöhen, können bei gesunden Menschen psychose-ähnliche Symptome hervorrufen.</li>
        </ul>
        <p><strong>Moderne Sicht:</strong> Die ursprüngliche Hypothese (&quot;zu viel Dopamin&quot;) ist heute differenzierter. Man geht davon aus, dass es in manchen Hirnregionen (z.B. im mesolimbischen System, was mit Positivsymptomen zusammenhängt) eine Überaktivität und in anderen (z.B. im präfrontalen Kortex, was mit Negativsymptomen zusammenhängt) eine Unteraktivität von Dopamin gibt.</p>
    </div>
);
const uebungenData5: UebungenData = {
    quiz: [
        { q: "Das Hören von Stimmen, die niemand sonst hört, ist ein Beispiel für ein...", a: ["Wahn", "Negativsymptom", "Halluzination"], correct: 2 },
        { q: "Welches ist ein typisches Negativsymptom der Schizophrenie?", a: ["Verfolgungswahn", "Affektverflachung", "Desorganisierte Sprache"], correct: 1 },
    ],
    open: [
        { q: "Erkläre das Vulnerabilitäts-Stress-Modell mit der Analogie eines Fasses.", solution: "Die Grösse des Fasses repräsentiert die biologische Vulnerabilität einer Person. Eine hohe Vulnerabilität bedeutet ein kleines Fass. Lebensstressoren (wie Wasser) füllen das Fass. Eine psychische Störung bricht aus, wenn das Fass überläuft. Bei einer Person mit einem kleinen Fass (hohe Vulnerabilität) braucht es nur wenig Stress, um es zum Überlaufen zu bringen." },
    ],
    kreativ: "Warum ist die Unterscheidung zwischen Positiv- und Negativsymptomen für die Behandlung und die Prognose der Schizophrenie wichtig?"
};
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;

// --- INHALTE FÜR MODUL 6: Persönlichkeitsstörungen ---
const grundwissenInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Eine Persönlichkeitsstörung ist ein überdauerndes, unflexibles und tiefgreifendes Muster von innerem Erleben und Verhalten, das merklich von den Erwartungen der jeweiligen Kultur abweicht, in der Jugend oder im frühen Erwachsenenalter beginnt und zu Leiden oder Beeinträchtigungen führt.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die drei Cluster</h3>
        <p>Das DSM-5 fasst die 10 Persönlichkeitsstörungen in drei Cluster zusammen:</p>
        <ul className="list-disc list-inside space-y-4 pl-2">
            <li><strong>Cluster A (Sonderbar, exzentrisch):</strong>
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li>Paranoide, Schizoide, Schizotypische Persönlichkeitsstörung.</li>
                </ul>
            </li>
            <li><strong>Cluster B (Dramatisch, emotional, launisch):</strong>
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li>Antisoziale, Borderline-, Histrionische, Narzisstische Persönlichkeitsstörung.</li>
                </ul>
            </li>
            <li><strong>Cluster C (Ängstlich, furchtsam):</strong>
                <ul className="list-disc list-inside pl-6 mt-2">
                    <li>Vermeidend-selbstunsichere, Dependente, Zwanghafte Persönlichkeitsstörung.</li>
                </ul>
            </li>
        </ul>
    </div>
);
const anwendbarkeitInhalt6 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die <strong>Borderline-Persönlichkeitsstörung (BPS)</strong> aus Cluster B ist eine der am häufigsten diagnostizierten und gleichzeitig am meisten missverstandenen Störungen.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Kernsymptome im Alltag</h3>
        <p>Menschen mit BPS erleben eine durchdringende Instabilität in verschiedenen Bereichen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Zwischenmenschliche Beziehungen:</strong> Intensive, aber sehr instabile Beziehungen, die zwischen extremer Idealisierung (&quot;Du bist der beste Mensch der Welt!&quot;) und extremer Entwertung (&quot;Ich hasse dich!&quot;) wechseln.</li>
            <li><strong>Selbstbild:</strong> Ein chronisch instabiles Selbstbild und Identitätsgefühl.</li>
            <li><strong>Affekte:</strong> Starke Stimmungsschwankungen, intensive Wut, Gefühle der Leere.</li>
            <li><strong>Impulsivität:</strong> Selbstschädigendes Verhalten wie Substanzmissbrauch, rücksichtsloses Fahren oder Suizidversuche.</li>
        </ul>
        <p>Das Verständnis dieser Muster ist für Angehörige und Therapeuten entscheidend, um das oft als manipulativ missverstandene Verhalten als Ausdruck extremer emotionaler Dysregulation und Angst vor dem Verlassenwerden zu erkennen.</p>
    </div>
);
const meisterklasseInhalt6 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Egosynton vs. Egodyston</h3>
        <p>Ein zentrales Merkmal, das Persönlichkeitsstörungen von vielen anderen Störungen (wie Angststörungen oder Depressionen) unterscheidet, ist, dass sie oft **egosynton** sind.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Egosynton:</strong> Die Person empfindet ihre Persönlichkeitszüge, Gedanken und Verhaltensweisen als Teil ihrer selbst, als &quot;Ich-konform&quot;. Sie sieht das Problem nicht bei sich, sondern bei den anderen oder der Welt. (z.B. eine narzisstische Person, die ihre Grandiosität als angemessen empfindet).</li>
            <li><strong>Egodyston:</strong> Die Person leidet unter ihren Symptomen und empfindet sie als fremd und störend. (z.B. eine Person mit einer Zwangsstörung, die ihre Waschzwänge als unsinnig und quälend erlebt).</li>
        </ul>
        <p>Diese Egosyntonie macht die Behandlung von Persönlichkeitsstörungen besonders schwierig, da die Betroffenen oft keine Krankheitseinsicht haben und keine Motivation verspüren, sich zu ändern.</p>
    </div>
);
const uebungenData6: UebungenData = {
    quiz: [
        { q: "Welches Cluster wird als 'dramatisch, emotional, launisch' beschrieben?", a: ["Cluster A", "Cluster B", "Cluster C"], correct: 1 },
        { q: "Eine Person, die ihre Symptome als Teil ihrer selbst ansieht und nicht als störend empfindet, zeigt...", a: ["Egosyntonie", "Egodystonie", "Affektverflachung"], correct: 0 },
    ],
    open: [
        { q: "Was ist der Hauptunterschied zwischen der zwanghaften Persönlichkeitsstörung (Cluster C) und der Zwangsstörung (OCD)?", solution: "Bei der Zwangsstörung (OCD) sind die Zwangsgedanken und -handlungen egodyston; die Person leidet darunter und findet sie unsinnig. Bei der zwanghaften Persönlichkeitsstörung sind die Züge (Perfektionismus, Ordnungsliebe, Kontrolle) egosynton; die Person sieht sie als richtig und nützlich an und leidet nicht unter den Zügen selbst, sondern eher unter den Konsequenzen (z.B. Ineffizienz)." },
    ],
    kreativ: "Wähle eine bekannte fiktive Figur (z.B. aus einem Film oder Buch) und argumentiere, warum sie Merkmale einer bestimmten Persönlichkeitsstörung (z.B. narzisstisch, antisozial) aufweisen könnte."
};
const uebungenInhalt6 = <UebungenContent data={uebungenData6} />;

// --- INHALTE FÜR MODUL 7: Psychodynamische Therapien ---
const grundwissenInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die psychodynamischen Therapien haben ihre Wurzeln in der **Psychoanalyse** von Sigmund Freud. Die Kernannahme ist, dass unbewusste Konflikte, oft aus der Kindheit, die Ursache für gegenwärtige psychische Probleme sind. Das Ziel der Therapie ist es, diese unbewussten Inhalte und verdrängten Gefühle ins Bewusstsein zu bringen und zu bearbeiten.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Zentrale Konzepte</h3>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Das Unbewusste:</strong> Ein riesiger Bereich der Psyche, der Gedanken, Wünsche und Erinnerungen enthält, die uns nicht direkt zugänglich sind, unser Verhalten aber stark beeinflussen.</li>
            <li><strong>Abwehrmechanismen:</strong> Unbewusste Strategien, die das Ich anwendet, um sich vor angstauslösenden Gedanken und Gefühlen zu schützen (z.B. Verdrängung, Projektion, Sublimierung).</li>
            <li><strong>Freie Assoziation:</strong> Eine Technik, bei der der Patient angehalten wird, alles auszusprechen, was ihm in den Sinn kommt, ohne Zensur.</li>
            <li><strong>Traumdeutung:</strong> Freud sah Träume als den &quot;Königsweg zum Unbewussten&quot;.</li>
        </ul>
    </div>
);
const anwendbarkeitInhalt7 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Ein Patient leidet unter unerklärlicher, extremer Wut auf seinen ansonsten sehr freundlichen Chef.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Die Rolle der Übertragung</h3>
        <p>In der psychodynamischen Therapie könnte dieses Phänomen als **Übertragung** interpretiert werden. Übertragung bedeutet, dass der Patient unbewusst Gefühle, Wünsche und Beziehungsmuster aus früheren wichtigen Beziehungen (insbesondere zu den Eltern) auf eine Person in der Gegenwart projiziert – in diesem Fall auf den Therapeuten oder den Chef.</p>
        <p><strong>Analyse:</strong> Der Therapeut würde die Hypothese aufstellen, dass der Patient ungelöste Wut auf eine Autoritätsfigur aus seiner Kindheit hat (z.B. einen strengen, fordernden Vater). Diese verdrängten Gefühle werden nun unbewusst auf den Chef &quot;übertragen&quot;, obwohl dieser objektiv betrachtet keinen Anlass dafür gibt.</p>
        <p><strong>Therapeutischer Nutzen:</strong> Indem der Therapeut diese Übertragung im geschützten Rahmen der Therapie thematisiert und deutet (&quot;Könnte es sein, dass die Wut, die Sie auf Ihren Chef spüren, Ihnen von woanders bekannt vorkommt?&quot;), kann der Patient den Ursprung seiner Gefühle verstehen und den alten Konflikt bearbeiten, anstatt ihn in der Gegenwart unbewusst auszuleben.</p>
    </div>
);
const meisterklasseInhalt7 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Moderne Psychodynamik vs. Klassische Psychoanalyse</h3>
        <p>Die klassische Psychoanalyse nach Freud (mehrmals pro Woche auf der Couch liegend) wird heute nur noch selten praktiziert. Moderne psychodynamische Therapien haben sich weiterentwickelt:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Frequenz und Dauer:</strong> Meist einmal pro Woche im Sitzen und sind oft zeitlich begrenzt.</li>
            <li><strong>Fokus:</strong> Weniger Fokus auf Triebe (Sexualität, Aggression) und mehr auf aktuelle zwischenmenschliche Beziehungen und das Selbstwertgefühl.</li>
            <li><strong>Therapeutenrolle:</strong> Der Therapeut ist aktiver und unterstützender als der klassische, abstinente Analytiker.</li>
        </ul>
        <p>Konzepte wie das Unbewusste, Abwehrmechanismen und Übertragung sind aber nach wie vor zentral. Moderne Ansätze wie die **Mentalisierungsbasierte Therapie (MBT)** oder die **Übertragungsfokussierte Psychotherapie (TFP)** sind empirisch gut validierte Behandlungen, z.B. für Persönlichkeitsstörungen.</p>
    </div>
);
const uebungenData7: UebungenData = {
    quiz: [
        { q: "Das Ziel psychodynamischer Therapien ist es, ... ins Bewusstsein zu bringen.", a: ["genetische Faktoren", "unbewusste Konflikte", "gelernte Verhaltensweisen"], correct: 1 },
        { q: "Wenn ein Patient Gefühle für seinen Vater auf den Therapeuten projiziert, nennt man das...", a: ["Projektion", "Übertragung", "Gegenübertragung"], correct: 1 },
    ],
    open: [
        { q: "Nenne und erkläre einen Abwehrmechanismus am Beispiel einer Person, die ihren Job verloren hat.", solution: "Beispiel Verleugnung: &apos;Es ist nicht so schlimm, ich wollte den Job sowieso nicht mehr.&apos; (Die Person weigert sich, die schmerzhafte Realität des Verlustes anzuerkennen). Beispiel Rationalisierung: &apos;Die Firma war sowieso schlecht geführt, die Kündigung ist eigentlich das Beste, was mir passieren konnte.&apos; (Die Person findet eine logisch klingende, aber vorgeschobene Erklärung, um die wahren Gefühle der Enttäuschung zu vermeiden)." },
    ],
    kreativ: "Freud nannte Träume den 'Königsweg zum Unbewussten'. Denken Sie an einen kürzlichen Traum und versuchen Sie eine kurze, spekulative Deutung im Sinne der Psychoanalyse."
};
const uebungenInhalt7 = <UebungenContent data={uebungenData7} />;

// --- INHALTE FÜR MODUL 8: Kognitive Verhaltenstherapie (KVT) ---
const grundwissenInhalt8 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Die Kognitive Verhaltenstherapie (KVT) ist heute eine der am weitesten verbreiteten und am besten erforschten Therapieformen. Ihre Grundannahme ist, dass nicht die Ereignisse selbst unsere Gefühle und unser Verhalten bestimmen, sondern die Art und Weise, wie wir diese Ereignisse **interpretieren** und bewerten.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Das kognitive Modell (ABC-Modell nach Ellis)</h3>
        <p>Es beschreibt den Zusammenhang zwischen:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>A (Activating Event):</strong> Der Auslöser, ein Ereignis in der Realität.</li>
            <li><strong>B (Beliefs):</strong> Unsere Gedanken, Bewertungen und Interpretationen über das Ereignis A.</li>
            <li><strong>C (Consequences):</strong> Die emotionalen und verhaltensbezogenen Konsequenzen, die sich aus B ergeben.</li>
        </ul>
        <p>Die KVT setzt bei **B** an: Indem wir unsere dysfunktionalen oder irrationalen Überzeugungen identifizieren und verändern, können wir unsere Gefühle und unser Verhalten (C) positiv beeinflussen, auch wenn wir das Ereignis (A) nicht ändern können.</p>
    </div>
);
const anwendbarkeitInhalt8 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Stellen Sie sich vor, Sie halten eine Präsentation und ein Zuhörer gähnt.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>A (Auslöser):</strong> Eine Person im Publikum gähnt.</li>
            <li><strong>B (Dysfunktionaler Gedanke):</strong> &quot;Ich bin ein furchtbarer Redner. Mein Vortrag ist langweilig und alle hassen ihn. Ich habe mich total blamiert.&quot; (Gedankenlesen, Übergeneralisierung).</li>
            <li><strong>C (Konsequenz):</strong> Sie werden extrem nervös, fangen an zu stottern, verlieren den Faden und fühlen sich elend.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Die kognitive Umstrukturierung</h3>
        <p>In der KVT lernen Sie, den Gedanken bei B in Frage zu stellen und eine realistischere Alternative zu formulieren:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>B (Funktionaler Gedanke):</strong> &quot;Die Person hat vielleicht letzte Nacht schlecht geschlafen. Gähnen ist oft unwillkürlich. Die anderen hören noch aufmerksam zu. Ich kann nicht wissen, was alle denken. Ich konzentriere mich jetzt wieder auf meinen Inhalt.&quot;</li>
            <li><strong>C (Neue Konsequenz):</strong> Ihre Nervosität lässt nach, Sie finden zu Ihrem Rhythmus zurück und können den Vortrag erfolgreich beenden.</li>
        </ul>
    </div>
);
const meisterklasseInhalt8 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Die &quot;Dritte Welle&quot; der Verhaltenstherapie</h3>
        <p>Während die klassische KVT darauf abzielt, negative Gedanken zu *verändern* oder zu *bekämpfen*, verfolgen neuere Ansätze, die als &quot;dritte Welle&quot; bezeichnet werden, eine andere Philosophie. Anstatt den Inhalt der Gedanken zu verändern, zielen sie darauf ab, die **Beziehung** zu den eigenen Gedanken zu verändern.</p>
        <p>Zwei wichtige Vertreter sind:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Akzeptanz- und Commitment-Therapie (ACT):</strong> Lehrt, unangenehme Gedanken und Gefühle als Teil der menschlichen Erfahrung zu akzeptieren (Akzeptanz), ohne sich von ihnen kontrollieren zu lassen. Man lernt, sie zu beobachten, ohne auf sie reagieren zu müssen, und sich stattdessen auf werteorientiertes Handeln zu konzentrieren (Commitment).</li>
            <li><strong>Achtsamkeitsbasierte Kognitive Therapie (MBCT):</strong> Kombiniert KVT mit Achtsamkeitsmeditation. Ziel ist es, eine nicht-wertende, beobachtende Haltung gegenüber den eigenen Gedanken einzunehmen und so aus dem Autopiloten negativer Gedankenspiralen auszusteigen, besonders zur Rückfallprophylaxe bei Depressionen.</li>
        </ul>
    </div>
);
const uebungenData8: UebungenData = {
    quiz: [
        { q: "Worauf zielt die KVT primär ab?", a: ["Die Kindheit zu analysieren", "Dysfunktionale Gedanken und Überzeugungen zu verändern", "Unbewusste Triebe aufzudecken"], correct: 1 },
        { q: "Im ABC-Modell steht 'B' für...", a: ["Behavior (Verhalten)", "Beliefs (Überzeugungen)", "Biology (Biologie)"], correct: 1 },
    ],
    open: [
        { q: "Identifiziere einen typischen Denkfehler (z.B. Schwarz-Weiss-Denken, Katastrophisieren) in der Aussage: 'Wenn ich diese Prüfung nicht mit einer 1.0 bestehe, bin ich ein kompletter Versager.'", solution: "Dies ist ein klares Beispiel für Schwarz-Weiss-Denken (oder Alles-oder-Nichts-Denken). Es gibt nur zwei Kategorien: perfekter Erfolg oder totaler Misserfolg. Alle Nuancen dazwischen (eine gute Note, bestanden zu haben etc.) werden ignoriert." },
    ],
    kreativ: "Nehmen Sie einen kleinen, alltäglichen negativen Gedanken, den Sie heute hatten. Schreiben Sie ihn auf und versuchen Sie, nach dem ABC-Modell eine alternative, hilfreichere Interpretation (ein neues 'B') zu formulieren."
};
const uebungenInhalt8 = <UebungenContent data={uebungenData8} />;

// --- INHALTE FÜR MODUL 9: Humanistische und Systemische Therapien ---
const grundwissenInhalt9 = (
    <div className="space-y-8">
        <p className="text-lg leading-relaxed">Neben den psychodynamischen und verhaltenstherapeutischen Ansätzen gibt es weitere wichtige Therapieschulen, die oft als &quot;dritte Kraft&quot; der Psychologie bezeichnet werden.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Humanistische Therapien (z.B. Gesprächspsychotherapie)</h3>
        <p>Begründet von Carl Rogers, basiert dieser Ansatz auf einem sehr positiven Menschenbild. Die Grundannahme ist, dass jeder Mensch eine angeborene **Aktualisierungstendenz** hat – den Wunsch, zu wachsen und sein volles Potenzial zu entfalten. Psychische Probleme entstehen, wenn dieses Wachstum durch negative Erfahrungen oder Bewertungen von aussen blockiert wird.</p>
        <p>Der Therapeut schafft eine unterstützende Umgebung, die durch drei Kernbedingungen gekennzeichnet ist:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Empathie:</strong> Einfühlsames Verstehen der Welt des Klienten.</li>
            <li><strong>Bedingungslose positive Wertschätzung:</strong> Akzeptanz des Klienten als Person, unabhängig von seinem Verhalten.</li>
            <li><strong>Kongruenz (Echtheit):</strong> Der Therapeut ist authentisch und transparent.</li>
        </ul>
        <h3 className="text-2xl font-semibold border-b pb-2">Systemische Therapie</h3>
        <p>Dieser Ansatz betrachtet das Individuum nicht isoliert, sondern als Teil eines **Systems** (meist der Familie). Probleme eines Einzelnen werden als Symptom einer Störung im Gesamtsystem verstanden. Das Ziel ist nicht, den &quot;Problemträger&quot; zu &quot;reparieren&quot;, sondern die Interaktions- und Kommunikationsmuster innerhalb des Systems zu verändern.</p>
    </div>
);
const anwendbarkeitInhalt9 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Anwendung des aktiven Zuhörens (Humanistisch)</h3>
        <p>Ein Freund erzählt Ihnen von einem Problem bei der Arbeit. Anstatt sofort Ratschläge zu geben, wenden Sie die Prinzipien der Gesprächsführung an:</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
            <li><strong>Paraphrasieren:</strong> Sie fassen das Gehörte in eigenen Worten zusammen. (&quot;Es hört sich so an, als ob du dich von deinem Chef nicht wertgeschätzt fühlst.&quot;)</li>
            <li><strong>Verbalisieren emotionaler Erlebnisinhalte:</strong> Sie spiegeln die vermuteten Gefühle. (&quot;Das klingt unglaublich frustrierend.&quot;)</li>
        </ul>
        <p>Durch diese Techniken fühlt sich Ihr Freund verstanden und wertgeschätzt. Er kann seine eigenen Gedanken und Gefühle besser sortieren und kommt oft von selbst auf eine Lösung – ganz im Sinne der humanistischen Idee der Selbstaktualisierung.</p>
        <h3 className="text-2xl font-semibold border-b pb-2">Anwendung des zirkulären Fragens (Systemisch)</h3>
        <p>In einer Familienberatung klagt eine Mutter, dass ihr Sohn sich zurückzieht. Anstatt den Sohn direkt zu fragen &quot;Warum ziehst du dich zurück?&quot;, stellt der systemische Therapeut eine zirkuläre Frage: &quot;Was glaubst du, denkt deine Mutter, wenn du dich in dein Zimmer zurückziehst?&quot; oder &quot;Was macht dein Vater, wenn deine Mutter und du streitet?&quot;. Diese Fragen regen zum Perspektivwechsel an und machen die Interaktionsmuster im System für alle sichtbar.</p>
    </div>
);
const meisterklasseInhalt9 = (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold border-b pb-2">Der Fokus auf den Prozess, nicht den Inhalt</h3>
        <p>Ein wesentliches Merkmal, das sowohl humanistische als auch systemische Therapien von der klassischen KVT unterscheidet, ist der Fokus auf den **Prozess** der Interaktion anstatt auf den reinen **Inhalt**.</p>
        <p>Ein KVT-Therapeut könnte sich auf den Inhalt eines negativen Gedankens konzentrieren und dessen Logik hinterfragen. Ein humanistischer Therapeut achtet darauf, *wie* der Klient über sich spricht (z.B. abwertend, unsicher) und spiegelt die dahinterliegenden Gefühle. Ein systemischer Therapeut achtet darauf, *was passiert*, wenn Person A etwas sagt – wie reagiert Person B darauf, und was macht Person C dann?</p>
        <p>Dieser prozessorientierte Ansatz geht davon aus, dass die Veränderung der Beziehungs- und Kommunikationsmuster oft wirksamer ist als die reine Bearbeitung der inhaltlichen Probleme.</p>
    </div>
);
const uebungenData9: UebungenData = {
    quiz: [
        { q: "Welche Therapieform basiert auf der Annahme, dass jeder Mensch eine angeborene 'Aktualisierungstendenz' hat?", a: ["Systemische Therapie", "KVT", "Humanistische Therapie"], correct: 2 },
        { q: "Die systemische Therapie betrachtet psychische Probleme primär als...", a: ["Symptom einer Störung im Familiensystem.", "Folge unbewusster Konflikte.", "Ergebnis von Denkfehlern."], correct: 0 },
    ],
    open: [
        { q: "Was sind die drei therapeutischen Grundhaltungen nach Carl Rogers?", solution: "1. Empathie (einfühlsames Verstehen), 2. Bedingungslose positive Wertschätzung (Akzeptanz), 3. Kongruenz (Echtheit)." },
    ],
    kreativ: "Beschreiben Sie einen typischen Familienkonflikt (z.B. über Hausaufgaben) aus einer rein individuellen Perspektive und dann aus einer systemischen Perspektive."
};
const uebungenInhalt9 = <UebungenContent data={uebungenData9} />;


// --- MODUL-LISTE (VOLLSTÄNDIG) ---
const clinicalPsychologyModules: ClinicalPsychologyModule[] = [
    { id: 1, title: "Einführung in die Klinische Psychologie", content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: "Diagnostik & Klassifikation (DSM-5 / ICD-11)", content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: "Angst- und Zwangsstörungen", content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: "Depressive und Bipolare Störungen", content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: "Schizophrenie-Spektrum und andere psychotische Störungen", content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
    { id: 6, title: "Persönlichkeitsstörungen", content: { grundwissen: grundwissenInhalt6, anwendbarkeit: anwendbarkeitInhalt6, meisterklasse: meisterklasseInhalt6, uebungen: uebungenInhalt6 }},
    { id: 7, title: "Psychodynamische Therapien", content: { grundwissen: grundwissenInhalt7, anwendbarkeit: anwendbarkeitInhalt7, meisterklasse: meisterklasseInhalt7, uebungen: uebungenInhalt7 }},
    { id: 8, title: "Kognitive Verhaltenstherapie (KVT)", content: { grundwissen: grundwissenInhalt8, anwendbarkeit: anwendbarkeitInhalt8, meisterklasse: meisterklasseInhalt8, uebungen: uebungenInhalt8 }},
    { id: 9, title: "Humanistische und Systemische Therapien", content: { grundwissen: grundwissenInhalt9, anwendbarkeit: anwendbarkeitInhalt9, meisterklasse: meisterklasseInhalt9, uebungen: uebungenInhalt9 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  // --- ALLE HOOKS AN DEN ANFANG ---
  const { lessonId } = useParams<{ lessonId: string }>();
  const { subscription, isLoading: isSubLoading } = useSubscription();
  const tPremium = useTranslations('premiumAccess');
  const tModules = useTranslations('modulesOverview'); // Für den "Zurück"-Link
  
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = clinicalPsychologyModules.find(m => m.id === moduleId);

  // --- START DER BEDINGTEN LOGIK (NACH DEN HOOKS) ---
  if (isSubLoading) {
    return <LoadingSpinner />;
  }

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/3" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Übersicht der Klinischen Psychologie</span>
            </Link>
        </div>
    );
  }

  // --- PREMIUM-CHECK HINZUGEFÜGT ---
  const isPremium = subscription?.status === 'active';
  const requiresPremium = true; // Annahme: Modul 3 ist auch Premium

  if (requiresPremium && !isPremium) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">{tPremium('title')}</h1>
        <p className="mb-6">{tPremium('description')}</p>
        <Link href="/profile" className="px-6 py-2 bg-primary text-white rounded-lg">
          {tPremium('upgradeButton')}
        </Link>
        <Link href="/modules" className="block flex items-center justify-center gap-2 text-primary hover:underline mt-6">
              <ArrowLeft className="w-5 h-5" />
              <span>{tModules('backLink')}</span>
          </Link>
      </div>
    );
  }

  // --- LOGIK FÜR DIE BLÄTTERFUNKTION ---
  const lessonParts = ['grundwissen', 'anwendbarkeit', 'meisterklasse', 'uebungen'];
  const currentIndex = lessonParts.indexOf(type);
  const prevPart = currentIndex > 0 ? lessonParts[currentIndex - 1] : null;
  const nextPart = currentIndex < lessonParts.length - 1 ? lessonParts[currentIndex + 1] : null;
  const prevLink = prevPart ? `/modules/3/${prevPart}-${moduleId}` : null;
  const nextLink = nextPart ? `/modules/3/${nextPart}-${moduleId}` : null;
  
  const contentKey = type as keyof typeof moduleData.content;
  const content = moduleData.content[contentKey] || "Inhalt nicht verfügbar.";
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${moduleData.title}`;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <Link href="/modules/3" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Übersicht der Klinischen Psychologie</span>
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {content}
        </div>

        <div className="mt-12 flex justify-between items-center border-t dark:border-slate-700 pt-6">
          {prevLink ? (
            <Link href={prevLink} className="flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors rounded-md p-2 -m-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">Vorheriger Abschnitt</span>
            </Link>
          ) : (
            <div />
          )}
          {nextLink ? (
            <Link href={nextLink} className="flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors rounded-md p-2 -m-2">
              <span className="font-semibold">Nächster Abschnitt</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
             <Link href="/modules/3" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              <span>Zurück zur Übersicht</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}