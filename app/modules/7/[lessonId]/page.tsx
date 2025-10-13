'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  // NEU: ArrowRight importiert
  ArrowLeft, ArrowRight, Check, X, Eye, EyeOff,
} from 'lucide-react';
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
interface BiologicalPsychologyModule {
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
        {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {isOpen ? 'Lösung verbergen' : 'Lösung anzeigen'}
      </button>
      {isOpen && (
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300">
        <p>{question.solution}</p>
      </div>
      )}
    </div>
  );
};

const UebungenContent: FC<{ data: UebungenData }> = ({ data }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(data.quiz.length).fill(null));
  const handleSelect = (quizIndex: number, answerIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[quizIndex] = answerIndex;
      return newAnswers;
    });
  };
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Single-Choice-Fragen</h3>
        <div className="space-y-6">
          {data.quiz.map((q, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold mb-3">{`${i + 1}. ${q.q}`}</p>
              <div className="space-y-2">
                {q.a.map((ans, j) => {
                  const isSelected = answers[i] === j;
                  const isCorrect = q.correct === j;
                  let buttonClass = 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600';
                  if (isSelected) {
                    buttonClass = isCorrect
                      ? 'bg-green-200 dark:bg-green-800 text-slate-900 dark:text-white'
                      : 'bg-red-200 dark:bg-red-800 text-slate-900 dark:text-white';
                  }
                  return (
                    <button
                      key={j}
                      onClick={() => handleSelect(i, j)}
                      className={`w-full text-left p-2 rounded-md transition-colors flex items-center justify-between ${buttonClass}`}
                    >
                      <span>{ans}</span>
                      {isSelected && (isCorrect
                        ? <Check className="w-5 h-5 text-green-700 dark:text-green-300" />
                        : <X className="w-5 h-5 text-red-700 dark:text-red-300" />)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Offene Fragen</h3>
        <div className="space-y-6">
          {data.open.map((q, i) => <ToggleSolution key={i} question={q} />)}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Kreativitätsfrage</h3>
        <div className="p-4 border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20">
          <p className="italic text-slate-700 dark:text-slate-300">{data.kreativ}</p>
        </div>
      </div>
    </div>
  );
};

// --- INHALTE FÜR ALLE MODULE ---
// (Alle Inhalts-Konstanten wie grundwissenInhalt1, anwendbarkeitInhalt1 etc. bleiben unverändert hier)

const grundwissenInhalt1 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Die Biologische Psychologie untersucht, wie unsere Biologie unser Verhalten beeinflusst. Ein fundamentaler Ausgangspunkt dafür ist die Genetik.</p> <h3 className="text-2xl font-semibold border-b pb-2">Grundbegriffe der Genetik</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Chromosomen:</strong> Lange Stränge aus genetischem Material (DNA), die sich im Zellkern befinden. Der Mensch hat 23 Chromosomenpaare.</li> <li><strong>Gene:</strong> Abschnitte auf der DNA, die die Anweisungen zur Herstellung von Proteinen enthalten. Proteine sind die Bausteine des Lebens und bestimmen unsere Merkmale.</li> <li><strong>Genotyp vs. Phänotyp:</strong> Der <strong>Genotyp</strong> ist die genetische Ausstattung eines Individuums. Der <strong>Phänotyp</strong> sind die tatsächlich beobachtbaren Merkmale (z.B. Haarfarbe, Grösse, aber auch Persönlichkeitszüge), die aus der Interaktion des Genotyps mit der Umwelt resultieren.</li> <li><strong>Allele:</strong> Verschiedene Versionen eines Gens. Sie können dominant oder rezessiv sein.</li> </ul> </div> );
const anwendbarkeitInhalt1 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Zwillings- und Adoptionsstudien: Anlage vs. Umwelt</h3> <p className="text-lg leading-relaxed">Wie können wir den Einfluss von Genen (Anlage) von dem der Erziehung (Umwelt) trennen? Die Verhaltensgenetik nutzt dafür natürliche Experimente:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Zwillingsstudien:</strong> Man vergleicht eineiige Zwillinge (teilen 100% ihrer Gene) mit zweieiigen Zwillingen (teilen ca. 50% ihrer Gene). Wenn eineiige Zwillinge sich in einem Merkmal (z.B. Intelligenz) ähnlicher sind als zweieiige Zwillinge, deutet dies auf einen starken genetischen Einfluss hin.</li> <li><strong>Adoptionsstudien:</strong> Man vergleicht adoptierte Kinder sowohl mit ihren biologischen Eltern (gemeinsame Gene) als auch mit ihren Adoptiveltern (gemeinsame Umwelt). Ähneln die Kinder in einem Merkmal eher ihren biologischen Eltern, spricht das für einen genetischen Einfluss.</li> </ul> <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"><p><strong>Erkenntnis:</strong> Fast alle komplexen menschlichen Merkmale, von der Persönlichkeit bis hin zum Risiko für psychische Störungen, sind das Ergebnis einer komplexen Interaktion aus <strong>beidem</strong> – Genen und Umwelt. Die Frage ist nicht &quot;Anlage ODER Umwelt?&quot;, sondern &quot;Wie interagieren Anlage UND Umwelt?&quot;.</p></div> </div> );
const meisterklasseInhalt1 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Epigenetik: Die Brücke zwischen Anlage und Umwelt</h3> <p>Die Epigenetik revolutioniert unser Verständnis der Gen-Umwelt-Interaktion. Sie beschreibt Mechanismen, durch die die Umwelt die <strong>Aktivität</strong> von Genen verändern kann, ohne die DNA-Sequenz selbst zu verändern.</p> <p>Man kann sich die DNA wie die Hardware eines Computers vorstellen und die Epigenetik wie die Software, die bestimmt, welche Programme laufen. Erfahrungen wie Stress, Ernährung oder Traumata können epigenetische &quot;Markierungen&quot; an der DNA hinterlassen. Diese Markierungen wirken wie Dimmer, die Gene &quot;hoch-&quot; oder &quot;herunterregulieren&quot; können.</p> <p><strong>Bedeutung:</strong> Das bedeutet, dass unsere Lebenserfahrungen unsere biologische Veranlagung aktiv formen und sogar an die nächste Generation weitergegeben werden können. Es ist die molekulare Brücke, die erklärt, wie Umwelteinflüsse &quot;unter die Haut gehen&quot; und unsere biologische Funktion langfristig verändern.</p> </div> );
const uebungenData1: UebungenData = { quiz: [ { q: 'Die beobachtbaren Merkmale einer Person nennt man...', a: ['Genotyp', 'Phänotyp', 'Allel'], correct: 1 }, { q: 'Die Epigenetik untersucht, wie die Umwelt die ... von Genen beeinflusst.', a: ['DNA-Sequenz', 'Gen-Aktivität', 'Anzahl der Chromosomen'], correct: 1 }, ], open: [ { q: 'Warum sind eineiige Zwillinge, die getrennt aufwachsen, für die Forschung so interessant?', solution: "Sie bieten das perfekte 'natürliche Experiment'. Da sie genetisch identisch sind (gleicher Genotyp), können alle Unterschiede in ihren beobachtbaren Merkmalen (Phänotyp) auf Umwelteinflüsse zurückgeführt werden. Ähnlichkeiten deuten hingegen auf einen starken genetischen Einfluss hin." }, ], kreativ: 'Diskutieren Sie die ethischen und sozialen Implikationen des Wissens, dass traumatische Erfahrungen epigenetische Veränderungen verursachen können, die potenziell vererbbar sind.', };
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;
const grundwissenInhalt2 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Das Nervensystem besteht aus zwei Haupttypen von Zellen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Neuronen:</strong> Die fundamentalen Informationsträger. Sie sind dafür verantwortlich, sensorische Informationen zu empfangen, Befehle an Muskeln zu senden und Informationen im Gehirn zu verarbeiten.</li> <li><strong>Gliazellen:</strong> Lange als reines &quot;Stützgewebe&quot; betrachtet, spielen sie eine entscheidende Rolle bei der Versorgung der Neuronen, der Bildung der Myelinscheide und der Aufrechterhaltung der Homöostase im Gehirn.</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Aufbau eines Neurons</h3> <p>Ein typisches Neuron besteht aus drei Hauptteilen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Soma (Zellkörper):</strong> Enthält den Zellkern und die lebenswichtigen Organellen.</li> <li><strong>Dendriten:</strong> Baumartige Verästelungen, die Signale von anderen Neuronen empfangen.</li> <li><strong>Axon:</strong> Ein langer Fortsatz, der Signale vom Soma weg zu anderen Neuronen, Muskeln oder Drüsen leitet. Viele Axone sind von einer <strong>Myelinscheide</strong> umgeben, einer Fettschicht, die die Signalübertragung massiv beschleunigt.</li> </ul> </div> );
const anwendbarkeitInhalt2 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Das Aktionspotenzial: Die Sprache der Neuronen</h3> <p className="text-lg leading-relaxed">Die Kommunikation innerhalb eines Neurons ist ein elektrischer Prozess. Ein <strong>Aktionspotenzial</strong> ist ein kurzer elektrischer Impuls, der am Axon entlang wandert. Es funktioniert nach dem <strong>Alles-oder-Nichts-Prinzip</strong>:</p> <p>Ein Neuron &quot;feuert&quot; entweder mit voller Stärke oder gar nicht, ähnlich wie ein Lichtschalter entweder an oder aus ist. Es gibt keine &quot;halben&quot; Aktionspotenziale. Die Intensität eines Reizes wird nicht durch die Stärke eines einzelnen Impulses kodiert, sondern durch die <strong>Frequenz</strong> (die Anzahl der Aktionspotenziale pro Sekunde).</p> <h3 className="text-2xl font-semibold border-b pb-2">Die Synapse: Kommunikation zwischen Neuronen</h3> <p>Die Lücke zwischen dem Axonende eines Neurons und dem Dendriten des nächsten nennt man <strong>synaptischen Spalt</strong>. Hier wird das elektrische Signal in ein chemisches umgewandelt: Das ankommende Aktionspotenzial veranlasst die Freisetzung von <strong>Neurotransmittern</strong> (chemische Botenstoffe) in den Spalt. Diese binden an Rezeptoren des empfangenden Neurons und lösen dort entweder eine Erregung (wahrscheinlicher, dass es feuert) oder eine Hemmung aus.</p> </div> );
const meisterklasseInhalt2 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Wie Psychopharmaka wirken: Agonisten und Antagonisten</h3> <p>Viele psychische Störungen sind mit einem Ungleichgewicht von Neurotransmittern verbunden. Psychopharmaka wirken, indem sie dieses System gezielt beeinflussen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Agonisten:</strong> Sind Substanzen, die die Wirkung eines Neurotransmitters <strong>verstärken</strong>. Sie können dies tun, indem sie die Produktion erhöhen, die Wiederaufnahme hemmen (wodurch der Neurotransmitter länger im synaptischen Spalt bleibt) oder den Rezeptor direkt imitieren. <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: Selektive Serotonin-Wiederaufnahmehemmer (SSRIs), die bei Depressionen eingesetzt werden, sind Agonisten für Serotonin.</em></li> <li><strong>Antagonisten:</strong> Sind Substanzen, die die Wirkung eines Neurotransmitters <strong>blockieren</strong> oder abschwächen. Sie tun dies typischerweise, indem sie sich an den Rezeptor binden, ohne ihn zu aktivieren, und so den Platz für den eigentlichen Neurotransmitter blockieren. <br/><em className="text-slate-600 dark:text-slate-400">Beispiel: Antipsychotika, die bei Schizophrenie eingesetzt werden, sind oft Antagonisten für Dopamin.</em></li> </ul> </div> );
const uebungenData2: UebungenData = { quiz: [ { q: 'Welcher Teil eines Neurons empfängt typischerweise Signale von anderen Neuronen?', a: ['Axon', 'Soma', 'Dendrit'], correct: 2 }, { q: 'Das ‘Alles-oder-Nichts’-Prinzip beschreibt...', a: ['die Freisetzung von Neurotransmittern.', 'das Aktionspotenzial.', 'die Funktion der Gliazellen.'], correct: 1 }, ], open: [ { q: 'Was ist die Funktion der Myelinscheide und was passiert, wenn sie beschädigt wird (wie bei Multipler Sklerose)?', solution: 'Die Myelinscheide ist eine isolierende Fettschicht um das Axon, die die Geschwindigkeit der elektrischen Signalübertragung drastisch erhöht. Bei Multipler Sklerose wird diese Schicht vom Immunsystem angegriffen und zerstört. Dies verlangsamt oder blockiert die Nervenimpulse, was zu einer Vielzahl von neurologischen Symptomen wie Muskelschwäche, Koordinationsproblemen und Sehstörungen führt.' }, ], kreativ: "Stellen Sie sich vor, Dopamin ist ein 'Schlüssel' und der Dopaminrezeptor ein 'Schloss'. Beschreiben Sie in dieser Analogie, was ein Dopamin-Agonist und was ein Dopamin-Antagonist tut.", };
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;
const grundwissenInhalt3 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Das Nervensystem ist das komplexe Kommunikationsnetzwerk unseres Körpers. Es wird grob in zwei Hauptteile unterteilt:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Zentrales Nervensystem (ZNS):</strong> Besteht aus dem Gehirn und dem Rückenmark. Es ist die Kommandozentrale, die alle ankommenden Informationen integriert und alle ausgehenden Befehle koordiniert.</li> <li><strong>Peripheres Nervensystem (PNS):</strong> Besteht aus allen Nerven ausserhalb von Gehirn und Rückenmark. Es verbindet das ZNS mit dem Rest des Körpers (Gliedmassen, Organe, Sinne).</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Unterteilung des Peripheren Nervensystems</h3> <p>Das PNS wird weiter unterteilt:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Somatisches Nervensystem:</strong> Steuert unsere <strong>willkürlichen</strong> Bewegungen und übermittelt sensorische Informationen von der Haut und den Muskeln an das ZNS. (Wenn Sie beschliessen, Ihren Arm zu heben, ist das somatisch).</li> <li><strong>Autonomes Nervensystem:</strong> Steuert unsere <strong>unwillkürlichen</strong> Körperfunktionen wie Herzschlag, Atmung, Verdauung und Drüsenaktivität.</li> </ul> </div> );
const anwendbarkeitInhalt3 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Das Autonome Nervensystem selbst besteht aus zwei gegensätzlichen Systemen, die wie Gaspedal und Bremse unseres Körpers wirken:</p> <h3 className="text-2xl font-semibold border-b pb-2">Sympathikus vs. Parasympathikus</h3> <ul className="list-disc list-inside space-y-4 pl-2"> <li> <strong>Sympathisches Nervensystem (Das Gaspedal):</strong> Bereitet den Körper auf Stresssituationen und hohe Anforderung vor – die <strong>&quot;Kampf-oder-Flucht&quot; (Fight-or-Flight)</strong> Reaktion. <br/><em className="text-slate-600 dark:text-slate-400">Wirkung: Beschleunigt den Herzschlag, erweitert die Pupillen, hemmt die Verdauung, setzt Energiereserven frei.</em> </li> <li> <strong>Parasympathisches Nervensystem (Die Bremse):</strong> Bringt den Körper in einen Zustand der Ruhe und Erholung – die <strong>&quot;Ruhe-und-Verdauung&quot; (Rest-and-Digest)</strong> Reaktion. <br/><em className="text-slate-600 dark:text-slate-400">Wirkung: Verlangsamt den Herzschlag, verengt die Pupillen, regt die Verdauung an, speichert Energie.</em> </li> </ul> <p><strong>Anwendung:</strong> Wenn Sie vor einer Prüfung nervös sind, spüren Sie die Aktivität Ihres Sympathikus (Herzrasen, feuchte Hände). Entspannungstechniken wie tiefes, langsames Atmen aktivieren gezielt den Parasympathikus und helfen dem Körper, sich wieder zu beruhigen.</p> </div> );
const meisterklasseInhalt3 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Reflexe: Die Abkürzung über das Rückenmark</h3> <p>Einige Reaktionen müssen so schnell ablaufen, dass sie nicht den vollen Weg zum Gehirn und zurück nehmen können. Hier kommt das Rückenmark ins Spiel.</p> <p>Ein <strong>Reflexbogen</strong> ist eine neuronale Schaltung, die eine extrem schnelle, unwillkürliche Reaktion auf einen Reiz ermöglicht. Beispiel: Sie fassen auf eine heisse Herdplatte.</p> <ol className="list-decimal list-inside space-y-3 pl-2"> <li>Sensorische Neuronen in Ihrer Hand senden ein Schmerzsignal.</li> <li>Das Signal läuft zum Rückenmark.</li> <li>Im Rückenmark wird das Signal über ein <strong>Interneuron</strong> direkt auf ein Motoneuron umgeschaltet.</li> <li>Das Motoneuron sendet einen sofortigen Befehl an Ihren Armmuskel, die Hand wegzuziehen.</li> </ol> <p>Erst <strong>nachdem</strong> Sie Ihre Hand bereits weggezogen haben, erreicht die Schmerzinformation das Gehirn und Ihnen wird der Schmerz bewusst. Diese Abkürzung über das Rückenmark ist ein überlebenswichtiger Schutzmechanismus, der schwere Verletzungen verhindert.</p> </div> );
const uebungenData3: UebungenData = { quiz: [ { q: 'Gehirn und Rückenmark bilden zusammen das...', a: ['Periphere Nervensystem', 'Somatische Nervensystem', 'Zentrale Nervensystem'], correct: 2 }, { q: "Welches System ist für die 'Kampf-oder-Flucht'-Reaktion verantwortlich?", a: ['Somatisches System', 'Sympathisches System', 'Parasympathisches System'], correct: 1 }, ], open: [ { q: 'Sie haben gerade eine grosse Mahlzeit gegessen und fühlen sich müde und entspannt. Welcher Teil Ihres autonomen Nervensystems ist gerade dominant und warum?', solution: "Der Parasympathikus. Er ist für die 'Ruhe-und-Verdauungs'-Funktionen zuständig. Er verlangsamt den Herzschlag und leitet Blut und Energie in den Verdauungstrakt, um die Nahrung zu verarbeiten, was zu einem Gefühl der Entspannung und Müdigkeit führt." }, ], kreativ: 'Beschreiben Sie die Kette von Ereignissen in Ihrem Nervensystem von dem Moment an, in dem Sie einen Ball auf sich zufliegen sehen, bis zu dem Moment, in dem Sie ihn fangen.', };
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;
const grundwissenInhalt4 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Das Gehirn ist das komplexeste Organ im menschlichen Körper und die Steuerzentrale für alle unsere Gedanken, Gefühle und Handlungen. Man kann es in drei Hauptbereiche unterteilen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Hinterhirn (Hirnstamm):</strong> Der älteste Teil, zuständig für überlebenswichtige Basisfunktionen (Atmung, Herzschlag, Schlaf). Enthält Medulla, Pons und das Kleinhirn (Cerebellum), das für Koordination und Gleichgewicht entscheidend ist.</li> <li><strong>Mittelhirn &amp; Limbisches System:</strong> Im Inneren des Gehirns gelegen. Das limbische System ist das Emotionszentrum (enthält Amygdala, Hippocampus, Hypothalamus).</li> <li><strong>Vorderhirn (Grosshirn/Cortex):</strong> Die äussere, stark gefaltete Schicht, die für höhere kognitive Funktionen wie Denken, Sprache und Planen zuständig ist. Es ist in zwei Hemisphären unterteilt.</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Die vier Lappen des Cortex</h3> <p>Jede Hemisphäre des Cortex wird in vier Lappen unterteilt:</p> <ol className="list-decimal list-inside space-y-3 pl-2"> <li><strong>Frontallappen:</strong> Sitz der Persönlichkeit, des abstrakten Denkens, der Planung, Impulskontrolle und der Sprachproduktion (Broca-Areal).</li> <li><strong>Parietallappen:</strong> Verarbeitet sensorische Informationen wie Berührung, Temperatur und Schmerz (somatosensorischer Kortex).</li> <li><strong>Temporallappen:</strong> Zuständig für das Hören (auditorischer Kortex) und das Sprachverständnis (Wernicke-Areal).</li> <li><strong>Okzipitallappen:</strong> Dient ausschliesslich der Verarbeitung visueller Informationen (visueller Kortex).</li> </ol> </div> );
const anwendbarkeitInhalt4 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Der Fall des Phineas Gage</h3> <p className="text-lg leading-relaxed">Einer der berühmtesten Fälle in der Geschichte der Neurowissenschaft ist der des Eisenbahnarbeiters Phineas Gage. Im Jahr 1848 durchbohrte bei einer Explosion eine Eisenstange seinen Schädel und zerstörte grosse Teile seines <strong>Frontallappens</strong>.</p> <p>Wie durch ein Wunder überlebte Gage, aber seine Persönlichkeit veränderte sich dramatisch. Der zuvor als zuverlässig, freundlich und besonnen beschriebene Mann wurde impulsiv, unzuverlässig, ungeduldig und unsozial. Seine Freunde sagten, er sei &quot;nicht mehr Gage&quot;.</p> <p><strong>Bedeutung:</strong> Der Fall Phineas Gage war einer der ersten und überzeugendsten Belege dafür, dass spezifische höhere kognitive Funktionen wie Persönlichkeit, soziale Urteilsfähigkeit und Impulskontrolle in einem bestimmten Hirnareal – dem Frontallappen – lokalisiert sind. Es zeigte eindrücklich die Verbindung zwischen Gehirnstruktur und Persönlichkeit.</p> </div> );
const meisterklasseInhalt4 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Lateralisierung: Linke vs. Rechte Gehirnhälfte</h3> <p>Die beiden Gehirnhälften (Hemisphären) sind nicht identisch, sondern haben spezialisierte Funktionen. Dieses Phänomen nennt man Lateralisierung.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Linke Hemisphäre:</strong> Dominiert bei den meisten Rechtshändern die Sprachproduktion und das Sprachverständnis, logisches Denken und mathematische Fähigkeiten.</li> <li><strong>Rechte Hemisphäre:</strong> Spezialisiert auf räumliche Wahrnehmung, Gesichtserkennung, nonverbale Kommunikation und die Verarbeitung von Emotionen.</li> </ul> <p>Die Hemisphären sind durch das <strong>Corpus Callosum (Balken)</strong> verbunden, ein dickes Bündel von Nervenfasern, das eine ständige Kommunikation zwischen beiden Seiten ermöglicht. Bei sogenannten <strong>Split-Brain-Patienten</strong>, bei denen der Balken durchtrennt wurde (eine veraltete Behandlungsmethode bei schwerer Epilepsie), kann man die getrennten Fähigkeiten der Hemisphären auf faszinierende Weise studieren.</p> <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg"><p><strong>Vorsicht vor Pop-Psychologie:</strong> Die Idee von reinen &quot;Linkshirn-&quot; oder &quot;Rechtshirn-Denkern&quot; ist eine starke Vereinfachung. Bei fast allen komplexen Aufgaben arbeiten beide Hemisphären eng zusammen.</p></div> </div> );
const uebungenData4: UebungenData = { quiz: [ { q: 'Welcher Lappen des Gehirns ist primär für das Sehen zuständig?', a: ['Frontallappen', 'Temporallappen', 'Okzipitallappen'], correct: 2 }, { q: 'Die Fallstudie von Phineas Gage zeigte die Bedeutung des ... für die Persönlichkeit.', a: ['Frontallappens', 'Parietallappens', 'Kleinhirns'], correct: 0 }, ], open: [ { q: 'Was ist der Unterschied zwischen dem Broca-Areal und dem Wernicke-Areal?', solution: 'Beide sind für die Sprache entscheidend, haben aber unterschiedliche Funktionen und liegen meist in der linken Hemisphäre. Das Broca-Areal (im Frontallappen) ist für die Sprachproduktion zuständig – das Bilden von Sätzen. Das Wernicke-Areal (im Temporallappen) ist für das Sprachverständnis zuständig – den Sinn von Wörtern zu verstehen.' }, ], kreativ: 'Stellen Sie sich vor, das Corpus Callosum würde bei einer Person nicht mehr funktionieren. Beschreiben Sie eine seltsame Situation, die im Alltag dieser Person auftreten könnte, basierend auf dem Wissen über Hemisphärenspezialisierung.', };
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;
const grundwissenInhalt5 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Das endokrine System ist ein zweites wichtiges Kommunikationssystem im Körper. Es besteht aus einer Reihe von Drüsen, die chemische Botenstoffe, sogenannte <strong>Hormone</strong>, direkt in den Blutkreislauf absondern.</p> <h3 className="text-2xl font-semibold border-b pb-2">Hormone vs. Neurotransmitter</h3> <p>Hormone wirken langsamer als die elektrischen Signale der Neuronen, aber ihre Wirkung ist oft weitreichender und langanhaltender. Während Neurotransmitter an einer spezifischen Synapse wirken, reisen Hormone durch den ganzen Körper und beeinflussen alle Zellen, die den passenden Rezeptor haben.</p> <h3 className="text-2xl font-semibold border-b pb-2">Wichtige Drüsen</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Hypophyse (Hirnanhangdrüse):</strong> Gilt als &quot;Meisterdrüse&quot;, da sie viele andere Drüsen steuert und Wachstumshormone produziert.</li> <li><strong>Schilddrüse:</strong> Reguliert den Stoffwechsel.</li> <li><strong>Nebennieren:</strong> Sitzen auf den Nieren und schütten in Stresssituationen Hormone wie Adrenalin und Cortisol aus.</li> <li><strong>Bauchspeicheldrüse:</strong> Reguliert den Blutzuckerspiegel durch Insulin und Glukagon.</li> <li><strong>Gonaden (Eierstöcke/Hoden):</strong> Produzieren Sexualhormone wie Östrogen und Testosteron.</li> </ul> </div> );
const anwendbarkeitInhalt5 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die biologische Stressreaktion</h3> <p className="text-lg leading-relaxed">Wenn Sie einer akuten Bedrohung ausgesetzt sind (z.B. ein Auto bremst direkt vor Ihnen), wird die <strong>&quot;Kampf-oder-Flucht&quot;-Reaktion</strong> sowohl vom Nervensystem als auch vom endokrinen System ausgelöst.</p> <ol className="list-decimal list-inside space-y-4 pl-2"> <li><strong>Schnelle Reaktion (Nervensystem):</strong> Der Sympathikus aktiviert die Nebennieren, die sofort <strong>Adrenalin (Epinephrin)</strong> ausschütten. Dies führt zu sofortigen körperlichen Veränderungen: Herzrasen, erhöhter Blutdruck, schnelle Atmung. Der Körper ist bereit für maximale Leistung.</li> <li><strong>Langsame Reaktion (Hormonsystem):</strong> Parallel dazu wird die <strong>HPA-Achse</strong> (Hypothalamus-Hypophysen-Nebennierenrinden-Achse) aktiviert. Der Hypothalamus signalisiert der Hypophyse, die wiederum die Nebennierenrinde anregt, <strong>Cortisol</strong> auszuschütten. Cortisol ist das &quot;Stresshormon&quot;, das dem Körper hilft, langanhaltenden Stress zu bewältigen, indem es Energie (Zucker) bereitstellt.</li> </ol> <p>Während die Adrenalin-Reaktion nach wenigen Minuten abklingt, kann chronischer Stress zu einem dauerhaft erhöhten Cortisolspiegel führen, was negative Folgen für das Immunsystem und die allgemeine Gesundheit haben kann.</p> </div> );
const meisterklasseInhalt5 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die Hypothalamus-Hypophysen-Achse: Die Brücke zwischen Gehirn und Körper</h3> <p>Wie hängen Gehirn und Hormonsystem zusammen? Die entscheidende Schnittstelle ist der <strong>Hypothalamus</strong>.</p> <p>Der Hypothalamus ist Teil des Gehirns (und des limbischen Systems) und fungiert als oberstes Steuerzentrum. Er erhält Informationen aus dem gesamten Körper und dem Gehirn über den Zustand des Organismus. Basierend darauf steuert er die <strong>Hypophyse</strong>, die direkt unter ihm sitzt.</p> <p>Die Hypophyse wiederum schüttet &quot;Steuerungshormone&quot; aus, die den meisten anderen Drüsen im Körper (Schilddrüse, Nebennieren, Gonaden) befehlen, ihre jeweiligen Hormone zu produzieren. Diese Kaskade – vom Gehirn über den Hypothalamus und die Hypophyse zu den Körperdrüsen – sorgt dafür, dass unser Körper auf unsere Gedanken, Gefühle und Umweltanforderungen hormonell reagieren kann. Sie ist die ultimative Verkörperung der Geist-Körper-Verbindung.</p> </div> );
const uebungenData5: UebungenData = { quiz: [ { q: "Welche Drüse gilt als 'Meisterdrüse' des endokrinen Systems?", a: ['Schilddrüse', 'Nebenniere', 'Hypophyse'], correct: 2 }, { q: "Welches Hormon ist hauptsächlich an der kurzfristigen 'Kampf-oder-Flucht'-Reaktion beteiligt?", a: ['Insulin', 'Adrenalin', 'Testosteron'], correct: 1 }, ], open: [ { q: 'Beschreiben Sie den Hauptunterschied in der Wirkungsweise von Neurotransmittern und Hormonen.', solution: 'Neurotransmitter wirken sehr schnell und lokal an einer spezifischen Synapse zwischen zwei Neuronen. Hormone werden in den Blutkreislauf abgegeben, wirken langsamer, reisen durch den ganzen Körper und können eine breite, langanhaltende Wirkung auf viele verschiedene Zielorgane haben.' }, ], kreativ: 'Chronischer Stress kann zu einem erhöhten Cortisolspiegel führen. Recherchieren Sie kurz zwei mögliche negative gesundheitliche Folgen eines dauerhaft hohen Cortisolspiegels.', };
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;

// --- MODUL-LISTE (VOLLSTÄNDIG) ---
const biologicalPsychologyModules: BiologicalPsychologyModule[] = [
    { id: 1, title: 'Menschliche Genetik &amp; Verhalten', content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: 'Die Zellen des Nervensystems', content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: 'Das Nervensystem: Aufbau &amp; Funktion', content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: 'Das Gehirn: Strukturen &amp; Areale', content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: 'Das Endokrine System', content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = biologicalPsychologyModules.find((m) => m.id === moduleId);
  
  // --- NEU: LOGIK FÜR DIE BLÄTTERFUNKTION ---
  const lessonParts = ['grundwissen', 'anwendbarkeit', 'meisterklasse', 'uebungen'];
  const currentIndex = lessonParts.indexOf(type);

  const prevPart = currentIndex > 0 ? lessonParts[currentIndex - 1] : null;
  const nextPart = currentIndex < lessonParts.length - 1 ? lessonParts[currentIndex + 1] : null;

  const prevLink = prevPart ? `/modules/7/${prevPart}-${moduleId}` : null;
  const nextLink = nextPart ? `/modules/7/${nextPart}-${moduleId}` : null;
  // --- ENDE DER NEUEN LOGIK ---

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/7" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Übersicht der Biologischen Psychologie</span>
            </Link>
        </div>
    );
  }
  
  const contentKey = type as keyof typeof moduleData.content;
  const content = moduleData.content[contentKey] || 'Inhalt nicht verfügbar.';
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${moduleData.title}`;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <Link href="/modules/7" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Übersicht der Biologischen Psychologie</span>
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
             <Link href="/modules/7" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              <span>Zurück zur Übersicht</span>
            </Link>
          )}
        </div>
        {/* --- ENDE DER NEUEN UI --- */}

      </div>
    </div>
  );
}