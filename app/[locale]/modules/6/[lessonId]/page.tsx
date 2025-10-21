'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {
  // NEU: ArrowRight importiert
  ArrowLeft, ArrowRight, Check, X, Eye, EyeOff,
} from 'lucide-react';
import { ReactNode, useState, FC } from 'react';

import { useSubscription } from '@/hooks/useSubscription';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslations } from 'next-intl';

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
interface EmotionMotivationModule {
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

const grundwissenInhalt1 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Motivation beschreibt die Wünsche oder Bedürfnisse, die unser Verhalten lenken und antreiben. Es ist das &quot;Warum&quot; hinter unseren Handlungen.</p> <h3 className="text-2xl font-semibold border-b pb-2">Intrinsische vs. Extrinsische Motivation</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Intrinsische Motivation:</strong> Entsteht aus inneren Faktoren. Wir tun etwas, weil es uns Freude bereitet, uns interessiert oder uns ein Gefühl der Erfüllung gibt. (Beispiel: Ein Buch lesen aus reiner Neugier).</li> <li><strong>Extrinsische Motivation:</strong> Entsteht aus äusseren Faktoren. Wir tun etwas, um eine Belohnung zu erhalten oder eine Bestrafung zu vermeiden. (Beispiel: Ein Buch lesen, um eine gute Note in einer Prüfung zu bekommen).</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Klassische Motivationstheorien</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Triebtheorie (Drive Theory):</strong> Besagt, dass Abweichungen von der Homöostase (dem biologischen Gleichgewicht) physiologische Bedürfnisse erzeugen. Diese Bedürfnisse führen zu psychologischen Trieben (z.B. Hunger, Durst), die uns motivieren, das Gleichgewicht wiederherzustellen.</li> <li><strong>Maslows Bedürfnishierarchie:</strong> Abraham Maslow schlug eine Hierarchie von Bedürfnissen in Pyramidenform vor. Grundlegende Bedürfnisse (wie physiologische und Sicherheitsbedürfnisse) müssen befriedigt sein, bevor höhere Bedürfnisse (soziale Bedürfnisse, Selbstwert, Selbstverwirklichung) motivierend wirken.</li> </ul> </div> );
const anwendbarkeitInhalt1 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Der Overjustification-Effekt</h3> <p className="text-lg leading-relaxed">Was passiert, wenn man eine Tätigkeit, die jemand bereits gerne macht (intrinsische Motivation), zusätzlich von aussen belohnt (extrinsische Motivation)?</p> <p>Studien zeigen, dass dies nach hinten losgehen kann. Der <strong>Overjustification-Effekt</strong> (Effekt der übermässigen Rechtfertigung) besagt, dass eine externe Belohnung die intrinsische Motivation einer Person untergraben kann. Die Person beginnt, ihr Verhalten als durch die Belohnung und nicht durch ihr eigenes Interesse gerechtfertigt zu sehen.</p> <p><strong>Beispiel:</strong> Ein Kind, das gerne aus Freude zeichnet, erhält von seinen Eltern für jede Zeichnung einen Franken. Plötzlich wird das Zeichnen zu einem &quot;Job&quot;. Wenn die Eltern aufhören, Geld zu geben, verliert das Kind oft auch die Lust am Zeichnen – die ursprüngliche intrinsische Freude wurde durch die extrinsische Belohnung &quot;gelöscht&quot;.</p> <p><strong>Anwendung im Management:</strong> Unerwartetes, verbales Lob ist oft effektiver zur Motivationssteigerung als vorhersehbare, materielle Boni, da es das Gefühl der Kompetenz stärkt, ohne die intrinsische Motivation zu untergraben.</p> </div> );
const meisterklasseInhalt1 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Selbstbestimmungstheorie (Deci &amp; Ryan)</h3> <p>Diese moderne Theorie erweitert das Konzept der intrinsischen Motivation. Sie postuliert, dass Menschen ein angeborenes Streben nach Wachstum haben, das auf drei universellen psychologischen Grundbedürfnissen basiert:</p> <ol className="list-decimal list-inside space-y-3 pl-2"> <li><strong>Autonomie:</strong> Das Bedürfnis, das eigene Leben selbst zu steuern und Entscheidungen im Einklang mit den eigenen Werten zu treffen.</li> <li><strong>Kompetenz:</strong> Das Bedürfnis, sich als fähig und wirksam bei der Bewältigung von Herausforderungen zu erleben.</li> <li><strong>Soziale Eingebundenheit (Relatedness):</strong> Das Bedürfnis, sich mit anderen verbunden zu fühlen, zugehörig zu sein und sich um andere zu kümmern.</li> </ol> <p>Ein Umfeld, das diese drei Bedürfnisse nährt, fördert optimale Motivation, Leistung und Wohlbefinden. Im Gegensatz zu Maslows Hierarchie müssen diese Bedürfnisse nicht in einer bestimmten Reihenfolge befriedigt werden, sondern sind alle gleichzeitig wichtig.</p> </div> );
const uebungenData1: UebungenData = { quiz: [ { q: 'Wenn Sie eine Aufgabe erledigen, weil Sie sie spannend finden, ist dies ein Beispiel für...', a: ['Extrinsische Motivation', 'Intrinsische Motivation', 'Triebreduktion'], correct: 1 }, { q: 'Welches Bedürfnis steht an der Spitze von Maslows Pyramide?', a: ['Sicherheit', 'Selbstwert', 'Selbstverwirklichung'], correct: 2 }, ], open: [ { q: 'Erkläre den Overjustification-Effekt anhand eines eigenen Beispiels.', solution: 'Beispiel: Jemand liebt es, in seiner Freizeit als Hobby für Freunde zu kochen. Er macht eine Kochausbildung und arbeitet als Koch in einem stressigen Restaurant. Die Bezahlung (extrinsisch) und der Druck ersetzen die ursprüngliche Freude (intrinsisch), und er verliert die Lust am Kochen, selbst in seiner Freizeit.' }, ], kreativ: 'Wie könnte ein Lehrer die drei psychologischen Grundbedürfnisse aus der Selbstbestimmungstheorie im Klassenzimmer fördern, um die Lernmotivation der Schüler zu steigern?', };
const uebungenInhalt1 = <UebungenContent data={uebungenData1} />;
const grundwissenInhalt2 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Unser Essverhalten wird durch ein komplexes Zusammenspiel von biologischen und psychologischen Faktoren gesteuert.</p> <h3 className="text-2xl font-semibold border-b pb-2">Biologische Mechanismen</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Homöostase:</strong> Der Körper strebt danach, ein stabiles Energieniveau aufrechtzuerhalten.</li> <li><strong>Hormone:</strong> Hunger- und Sättigungssignale werden durch Hormone reguliert. <strong>Ghrelin</strong> (&quot;Hungerhormon&quot;) wird bei leerem Magen ausgeschüttet. <strong>Leptin</strong> (&quot;Sättigungshormon&quot;) wird von Fettzellen freigesetzt und signalisiert dem Gehirn, dass genügend Energie vorhanden ist.</li> <li><strong>Hypothalamus:</strong> Eine Schlüsselregion im Gehirn, die diese Signale integriert und das Hunger- und Sättigungsgefühl steuert.</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Set-Point-Theorie</h3> <p>Diese Theorie besagt, dass jeder Mensch ein genetisch vorbestimmtes &quot;Sollgewicht&quot; oder einen &quot;Set-Point&quot; hat. Der Körper versucht aktiv, dieses Gewicht zu halten, indem er bei Gewichtsverlust den Stoffwechsel verlangsamt und das Hungergefühl steigert und bei Gewichtszunahme den Stoffwechsel beschleunigt.</p> </div> );
const anwendbarkeitInhalt2 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Warum Diäten oft scheitern</h3> <p className="text-lg leading-relaxed">Die Set-Point-Theorie bietet eine überzeugende Erklärung, warum es so schwer ist, Gewicht zu verlieren und es dauerhaft zu halten.</p> <p>Wenn eine Person eine kalorienreduzierte Diät beginnt und Gewicht verliert, interpretiert ihr Körper dies als eine Hungersnot. Er kämpft aktiv gegen den Gewichtsverlust an:</p> <ol className="list-decimal list-inside space-y-3 pl-2"> <li><strong>Der Stoffwechsel verlangsamt sich:</strong> Der Körper geht in den &quot;Energiesparmodus&quot; und verbrennt weniger Kalorien in Ruhe.</li> <li><strong>Das Hungergefühl steigt:</strong> Der Körper schüttet mehr Ghrelin aus, um die Nahrungsaufnahme zu fördern.</li> </ol> <p>Das Ergebnis ist das gefürchtete &quot;Diät-Plateau&quot;, bei dem der Gewichtsverlust trotz fortgesetzter Diät stagniert. Sobald die Person ihre Diät beendet, führt der immer noch verlangsamte Stoffwechsel zu einer schnellen Gewichtszunahme, oft über das Ausgangsgewicht hinaus (Jo-Jo-Effekt). Dies ist kein Zeichen von Willensschwäche, sondern eine starke biologische Reaktion.</p> </div> );
const meisterklasseInhalt2 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Psychologische und soziale Einflüsse auf das Essverhalten</h3> <p>Neben der Biologie steuern auch externe und psychologische Faktoren, was und wie viel wir essen:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Portionsgrösse:</strong> Wir neigen dazu, mehr zu essen, wenn uns grössere Portionen serviert werden, unabhängig von unserem tatsächlichen Hunger.</li> <li><strong>Sozialer Kontext:</strong> Wir essen oft mehr in Gesellschaft als allein.</li> <li><strong>&quot;Externals&quot; vs. &quot;Internals&quot;:</strong> Manche Menschen (Externals) lassen ihr Essverhalten stark von äusseren Reizen (z.B. Anblick von Essen, Tageszeit) leiten, während andere (Internals) sich mehr an inneren Hunger- und Sättigungssignalen orientieren.</li> <li><strong>Emotionales Essen:</strong> Viele Menschen essen als Reaktion auf negative Emotionen wie Stress, Langeweile oder Traurigkeit.</li> </ul> </div> );
const uebungenData2: UebungenData = { quiz: [ { q: 'Welches Hormon wird als ‘Sättigungshormon’ bezeichnet?', a: ['Ghrelin', 'Leptin', 'Insulin'], correct: 1 }, { q: 'Die Theorie, dass der Körper versucht, ein bestimmtes Gewicht zu halten, nennt man...', a: ['Triebtheorie', 'Homöostase-Theorie', 'Set-Point-Theorie'], correct: 2 }, ], open: [ { q: 'Erkläre mit der Set-Point-Theorie den Jo-Jo-Effekt nach einer Diät.', solution: 'Während einer Diät senkt der Körper den Stoffwechsel, um Energie zu sparen. Nach der Diät kehrt die Person zu normalen Essgewohnheiten zurück, aber der Stoffwechsel bleibt noch für eine Weile verlangsamt. Dadurch werden mehr Kalorien als Fett gespeichert, was zu einer schnellen Gewichtszunahme führt.' }, ], kreativ: 'Entwirf drei konkrete Strategien, um den Einfluss von externen Essensreizen im Alltag zu reduzieren.', };
const uebungenInhalt2 = <UebungenContent data={uebungenData2} />;
const grundwissenInhalt3 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Die wissenschaftliche Erforschung des menschlichen Sexualverhaltens war lange ein Tabu. Forscher wie Alfred Kinsey sowie William Masters und Virginia Johnson leisteten Pionierarbeit.</p> <h3 className="text-2xl font-semibold border-b pb-2">Die Kinsey-Berichte</h3> <p>In den 1940er und 50er Jahren führte Alfred Kinsey gross angelegte Umfragen zum Sexualverhalten durch. Seine Ergebnisse waren schockierend für die damalige Zeit und zeigten, dass Verhaltensweisen wie Masturbation oder homosexuelle Erfahrungen weitaus häufiger waren, als öffentlich zugegeben wurde. Er schlug auch vor, sexuelle Orientierung als Kontinuum zu betrachten (die Kinsey-Skala) und nicht als strikte Dichotomie.</p> <h3 className="text-2xl font-semibold border-b pb-2">Der sexuelle Reaktionszyklus (Masters &amp; Johnson)</h3> <p>Masters und Johnson beobachteten Tausende von sexuellen Akten im Labor und beschrieben einen vierphasigen Zyklus der physiologischen Erregung:</p> <ol className="list-decimal list-inside space-y-3 pl-2"> <li><strong>Erregungsphase:</strong> Beginn der sexuellen Erregung, Erektion beim Mann, Lubrikation bei der Frau.</li> <li><strong>Plateauphase:</strong> Die Erregung intensiviert sich weiter.</li> <li><strong>Orgasmusphase:</strong> Rhythmische Kontraktionen der Beckenmuskulatur und der Höhepunkt des sexuellen Lustempfindens.</li> <li><strong>Rückbildungsphase (Resolution):</strong> Der Körper kehrt in seinen unerregten Zustand zurück. Männer durchlaufen eine Refraktärperiode, in der ein weiterer Orgasmus nicht möglich ist.</li> </ol> </div> );
const anwendbarkeitInhalt3 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Sexuelle Orientierung und Geschlechtsidentität</h3> <p className="text-lg leading-relaxed">Es ist entscheidend, diese beiden Konzepte zu unterscheiden:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Sexuelle Orientierung:</strong> Bezieht sich auf das emotionale, romantische und sexuelle Angezogensein zu anderen Menschen (z.B. heterosexuell, homosexuell, bisexuell). Die Forschung deutet stark darauf hin, dass die sexuelle Orientierung eine biologische Grundlage hat und keine bewusste Wahl ist.</li> <li><strong>Geschlechtsidentität:</strong> Das tief empfundene, innere Gefühl einer Person, männlich, weiblich, beides oder keines von beidem zu sein. Sie kann mit dem bei der Geburt zugewiesenen Geschlecht übereinstimmen (cisgender) oder nicht (transgender).</li> </ul> <p>Das Verständnis dieser Unterscheidung ist grundlegend für einen respektvollen und informierten Umgang mit der Vielfalt menschlicher Identitäten und Beziehungen.</p> </div> );
const meisterklasseInhalt3 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Evolutionäre Perspektiven auf das Paarungsverhalten</h3> <p>Die evolutionäre Psychologie versucht, Unterschiede im Paarungsverhalten zwischen den Geschlechtern durch die unterschiedlichen &quot;reproduktiven Investitionen&quot; zu erklären.</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Theorie des elterlichen Investments (Parental Investment Theory):</strong> Frauen haben eine höhere minimale Investition in die Fortpflanzung (Schwangerschaft, Stillzeit). Sie sind daher evolutionär darauf &quot;programmiert&quot;, wählerischer bei der Partnerwahl zu sein und nach Partnern mit Ressourcen und Stabilität zu suchen.</li> <li><strong>Männliche Strategien:</strong> Männer haben eine geringere minimale Investition. Ihre evolutionär erfolgreiche Strategie könnte darin bestehen, ihre Gene möglichst weit zu verbreiten, was zu einer höheren Bereitschaft für kurzfristige sexuelle Beziehungen führen könnte.</li> </ul> <p><strong>Kritik:</strong> Diese Theorien sind umstritten. Sie können wichtige biologische Tendenzen erklären, laufen aber Gefahr, kulturell geformte Geschlechterrollen zu naturalisieren und zu rechtfertigen. Soziokulturelle Faktoren (z.B. Zugang zu Bildung und ökonomischer Macht) haben einen enormen Einfluss auf die Partnerwahl, der über rein biologische Erklärungen hinausgeht.</p> </div> );
const uebungenData3: UebungenData = { quiz: [ { q: 'Welche Phase kommt im sexuellen Reaktionszyklus nach der Plateauphase?', a: ['Erregungsphase', 'Rückbildungsphase', 'Orgasmusphase'], correct: 2 }, { q: 'Das innere Gefühl einer Person, männlich oder weiblich zu sein, nennt man...', a: ['Sexuelle Orientierung', 'Geschlechtsidentität', 'Geschlechterrolle'], correct: 1 }, ], open: [ { q: 'Was war der wichtigste Beitrag der Kinsey-Berichte?', solution: 'Die Kinsey-Berichte brachen ein gesellschaftliches Tabu und zeigten durch empirische Daten, dass eine grosse Diskrepanz zwischen dem öffentlichen moralischen Diskurs über Sex und dem tatsächlichen, privaten Sexualverhalten der Menschen bestand. Sie trugen massgeblich zur Normalisierung der wissenschaftlichen Sexualforschung bei.' }, ], kreativ: 'Diskutiere die Stärken und Schwächen der evolutionären Erklärung für geschlechtsspezifische Unterschiede in der Partnerwahl.', };
const uebungenInhalt3 = <UebungenContent data={uebungenData3} />;
const grundwissenInhalt4 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Eine Emotion ist ein komplexer, subjektiver Zustand, der oft als Reaktion auf eine Erfahrung auftritt und mit physiologischen und verhaltensmässigen Veränderungen einhergeht. Aber was kommt zuerst: das Gefühl oder die körperliche Reaktion?</p> <h3 className="text-2xl font-semibold border-b pb-2">Die klassischen Theorien</h3> <ul className="list-disc list-inside space-y-4 pl-2"> <li><strong>James-Lange-Theorie:</strong> Die intuitive Sichtweise ist falsch. Wir weinen nicht, weil wir traurig sind; wir sind traurig, weil wir weinen. Die Emotion ist die Wahrnehmung unserer eigenen physiologischen Reaktion auf einen Reiz. <br/> (Reiz → Physiologische Erregung → Emotion)</li> <li><strong>Cannon-Bard-Theorie:</strong> Physiologische Erregung und das emotionale Erleben treten <strong>gleichzeitig und unabhängig</strong> voneinander auf. Wenn wir einen Bären sehen, sendet der Thalamus gleichzeitig Signale an den Kortex (erzeugt Furcht) und an das sympathische Nervensystem (erzeugt Herzrasen). <br/> (Reiz → Physiologische Erregung + Emotion)</li> <li><strong>Schachter-Singer Zwei-Faktoren-Theorie:</strong> Emotionen haben zwei Zutaten: eine unspezifische physiologische Erregung und eine <strong>kognitive Bewertung</strong> (Label), die diese Erregung erklärt. Die Erregung allein ist nicht ausreichend. <br/> (Reiz → Physiologische Erregung → Kognitive Bewertung → Emotion)</li> </ul> </div> );
const anwendbarkeitInhalt4 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die Hängebrücken-Studie (Dutton &amp; Aron)</h3> <p className="text-lg leading-relaxed">Dieses berühmte Experiment ist eine perfekte Demonstration der Zwei-Faktoren-Theorie.</p> <p><strong>Der Aufbau:</strong> Männliche Versuchspersonen überquerten entweder eine wackelige, furchteinflössende Hängebrücke (hohe physiologische Erregung) oder eine stabile, sichere Brücke (niedrige Erregung). Am Ende der Brücke wurden sie von einer attraktiven Interviewerin angesprochen, die ihnen ihre Telefonnummer gab.</p> <p><strong>Das Ergebnis:</strong> Die Männer, die die furchteinflössende Brücke überquert hatten, riefen die Interviewerin signifikant häufiger an als die Männer von der sicheren Brücke.</p> <p><strong>Interpretation (Zwei-Faktoren-Theorie):</strong> Die Männer auf der Hängebrücke erlebten eine starke, aber unspezifische physiologische Erregung (Herzrasen, feuchte Hände). Sie führten diese Erregung fälschlicherweise nicht auf die Angst vor der Brücke zurück, sondern interpretierten sie als sexuelle Anziehung zur Interviewerin (<strong>Fehlattribution der Erregung</strong>). Dies zeigt, wie die kognitive Bewertung die Qualität unserer Emotionen bestimmt.</p> </div> );
const meisterklasseInhalt4 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Lazarus&apos; Kognitive Bewertungstheorie (Cognitive-Mediational Theory)</h3> <p>Richard Lazarus ging noch einen Schritt weiter als Schachter und Singer. Er argumentierte, dass eine Emotion nicht ohne eine vorhergehende kognitive Bewertung (Appraisal) des Reizes entstehen kann. Diese Bewertung findet oft unbewusst und blitzschnell statt.</p> <p><strong>Reihenfolge nach Lazarus:</strong> Reiz → Kognitive Bewertung → Emotion + Physiologische Erregung</p> <p>Der entscheidende Unterschied: Während bei Schachter-Singer die Erregung zuerst kommt und dann interpretiert wird, argumentiert Lazarus, dass die Interpretation des Reizes zuerst kommt und dann die Emotion und die Erregung auslöst. Wenn Sie einen Bären sehen, bewerten Sie ihn blitzschnell als Bedrohung, und *deshalb* fühlen Sie Furcht und Ihr Herz beginnt zu rasen.</p> <p>Diese Theorie betont die Subjektivität von Emotionen: Das gleiche Ereignis kann bei zwei Personen völlig unterschiedliche Emotionen auslösen, je nachdem, wie sie es individuell bewerten.</p> </div> );
const uebungenData4: UebungenData = { quiz: [ { q: 'Welche Theorie besagt ‘Ich habe Angst, weil ich zittere’?', a: ['Cannon-Bard-Theorie', 'James-Lange-Theorie', 'Zwei-Faktoren-Theorie'], correct: 1 }, { q: 'Die Hängebrücken-Studie ist ein klassisches Beispiel für...', a: ['Fehlattribution der Erregung', 'Katharsis', 'Homöostase'], correct: 0 }, ], open: [ { q: 'Erkläre den Hauptunterschied zwischen der Cannon-Bard-Theorie und der Schachter-Singer-Theorie.', solution: 'Bei Cannon-Bard treten physiologische Erregung und Emotion gleichzeitig und unabhängig auf. Bei Schachter-Singer ist die physiologische Erregung unspezifisch und benötigt eine zusätzliche kognitive Bewertung, um zu einer spezifischen Emotion zu werden. Die kognitive Bewertung ist der entscheidende zweite Faktor.' }, ], kreativ: 'Stellen Sie sich vor, Sie haben gerade einen starken Kaffee getrunken (hohe physiologische Erregung). Wie könnte dieselbe Erregung je nach Kontext (ein Horrorfilm vs. ein Wiedersehen mit einem guten Freund) zu völlig unterschiedlichen Emotionen führen? Erklären Sie dies mit der Zwei-Faktoren-Theorie.', };
const uebungenInhalt4 = <UebungenContent data={uebungenData4} />;
const grundwissenInhalt5 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Emotionen sind tief in der Biologie unseres Gehirns verankert. Das <strong>limbische System</strong>, eine Gruppe von miteinander verbundenen Strukturen tief im Gehirn, spielt hierbei eine zentrale Rolle.</p> <h3 className="text-2xl font-semibold border-b pb-2">Schlüsselstrukturen des limbischen Systems</h3> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Amygdala:</strong> Besteht aus zwei mandelförmigen Kernen und ist der wichtigste &quot;Knotenpunkt&quot; für die Verarbeitung von Emotionen, insbesondere von Furcht und der Erkennung von Bedrohungen. Sie verknüpft Emotionen mit Erinnerungen.</li> <li><strong>Hippocampus:</strong> Entscheidend für die Bildung neuer emotionaler Erinnerungen.</li> <li><strong>Hypothalamus:</strong> Aktiviert das sympathische Nervensystem als Reaktion auf emotionale Reize und steuert so die körperlichen Reaktionen (Herzrasen, Schwitzen).</li> </ul> </div> );
const anwendbarkeitInhalt5 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die zwei Wege der Furcht (LeDoux)</h3> <p className="text-lg leading-relaxed">Warum zucken wir zusammen, noch bevor wir bewusst wissen, was los ist? Joseph LeDoux entdeckte, dass Furcht-Signale im Gehirn zwei Wege parallel nehmen:</p> <ol className="list-decimal list-inside space-y-4 pl-2"> <li><strong>Der schnelle Pfad (Low Road):</strong> Ein sensorischer Reiz (z.B. eine schlangenähnliche Form am Boden) geht vom Thalamus <strong>direkt</strong> zur Amygdala. Die Amygdala löst sofort eine körperliche Angstreaktion aus (Erstarren, erhöhter Blutdruck), noch bevor wir den Reiz bewusst identifiziert haben. Dies ist ein schneller, aber ungenauer &quot;quick and dirty&quot;-Mechanismus, der unser Überleben sichert.</li> <li><strong>Der langsame Pfad (High Road):</strong> Gleichzeitig geht das Signal vom Thalamus zum <strong>visuellen Kortex</strong>. Dort wird der Reiz detailliert analysiert (&quot;Es ist nur ein gekrümmter Stock, keine Schlange&quot;). Diese Information wird dann an die Amygdala weitergeleitet.</li> </ol> <p>Wenn der Kortex &quot;Entwarnung&quot; gibt, beruhigt er die Amygdala und die Angstreaktion ebbt ab. Dieser doppelte Weg erklärt, warum wir oft erst körperlich reagieren und erst einen Moment später bewusst verstehen, warum.</p> </div> );
const meisterklasseInhalt5 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Emotionale Erinnerungen und PTBS</h3> <p>Die enge Verbindung zwischen Amygdala und Hippocampus erklärt, warum emotionale Ereignisse so viel tiefer und länger im Gedächtnis verankert sind als neutrale. Bei einem traumatischen Ereignis arbeitet die Amygdala auf Hochtouren und &quot;brennt&quot; die emotionale Bedeutung des Ereignisses ins Gedächtnis ein.</p> <p>Bei der <strong>Posttraumatischen Belastungsstörung (PTBS)</strong> scheint dieses System überaktiv zu sein. Die Amygdala reagiert überempfindlich auf Reize, die an das Trauma erinnern (Trigger), und löst massive Furchtreaktionen aus, als ob das Ereignis wieder in Echtzeit stattfinden würde. Der Hippocampus hat Schwierigkeiten, die Erinnerung korrekt im zeitlichen Kontext (&quot;das war damals&quot;) zu verorten, was zu den intrusiven Wiedererinnerungen (Flashbacks) führt.</p> </div> );
const uebungenData5: UebungenData = { quiz: [ { q: 'Welche Gehirnstruktur ist zentral für die Furchtverarbeitung?', a: ['Hippocampus', 'Hypothalamus', 'Amygdala'], correct: 2 }, { q: 'Der ‘schnelle Pfad’ der Furcht läuft vom Thalamus direkt zum...', a: ['Visuellen Kortex', 'Zur Amygdala', 'Zum Hippocampus'], correct: 1 }, ], open: [ { q: 'Erkläre, warum der ‘schnelle Pfad’ der Furcht aus evolutionärer Sicht sinnvoll ist.', solution: 'In einer Gefahrensituation (z.B. ein Rascheln im Gebüsch) ist es überlebenswichtiger, einmal zu viel mit einer Fluchtreaktion zu reagieren als einmal zu wenig. Der schnelle, ungenaue Pfad sorgt für eine sofortige Schutzreaktion, noch bevor das Gehirn den Reiz vollständig analysiert hat. Lieber einmal umsonst vor einem Stock erschrecken, als von einer Schlange gebissen zu werden.' }, ], kreativ: 'Wie könnte das Wissen über die zwei Wege der Furcht in der Therapie von Phobien genutzt werden?', };
const uebungenInhalt5 = <UebungenContent data={uebungenData5} />;
const grundwissenInhalt6 = ( <div className="space-y-8"> <p className="text-lg leading-relaxed">Emotionen sind nicht nur innere Zustände, sondern werden auch nach aussen kommuniziert, hauptsächlich durch den Gesichtsausdruck.</p> <h3 className="text-2xl font-semibold border-b pb-2">Die sieben Basisemotionen (Paul Ekman)</h3> <p>Der Forscher Paul Ekman zeigte in kulturübergreifenden Studien, dass es mindestens sieben Basisemotionen gibt, deren Gesichtsausdruck universell ist und von Menschen auf der ganzen Welt verstanden wird, sogar in Kulturen ohne Kontakt zur Aussenwelt:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li>Freude</li> <li>Überraschung</li> <li>Traurigkeit</li> <li>Furcht</li> <li>Ekel</li> <li>Wut</li> <li>Verachtung</li> </ul> <h3 className="text-2xl font-semibold border-b pb-2">Kulturelle Darstellungsregeln (Display Rules)</h3> <p>Obwohl der Ausdruck der Basisemotionen universell ist, lernen wir in unserer Kultur spezifische Regeln, wann, wo und wie stark wir diese Emotionen zeigen dürfen. Diese <strong>Display Rules</strong> erklären, warum es kulturelle Unterschiede im emotionalen Ausdruck gibt. (Beispiel: In vielen asiatischen Kulturen ist es unhöflich, negative Emotionen offen vor Autoritätspersonen zu zeigen).</p> </div> );
const anwendbarkeitInhalt6 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Mikroexpressionen: Versteckte Gefühle erkennen</h3> <p className="text-lg leading-relaxed">Wenn eine Person versucht, eine Emotion zu unterdrücken oder zu verbergen, kann das wahre Gefühl oft für einen winzigen Bruchteil einer Sekunde (ca. 1/15 bis 1/25 Sekunde) im Gesicht &quot;durchblitzen&quot;. Diese unwillkürlichen und sehr kurzen Ausdrücke nennt man <strong>Mikroexpressionen</strong>.</p> <p><strong>Anwendung:</strong> Die Fähigkeit, Mikroexpressionen zu erkennen, ist eine Schlüsselkompetenz für Berufe, in denen es auf das Verstehen nonverbaler Signale ankommt, z.B. für:</p> <ul className="list-disc list-inside space-y-3 pl-2"> <li><strong>Therapeuten:</strong> Um zu erkennen, ob ein Klient ein sensibles Thema anspricht, auch wenn er es verbal herunterspielt.</li> <li><strong>Verhandlungsführer:</strong> Um zu erkennen, ob ein Angebot beim Gegenüber auf versteckte Ablehnung oder Freude stösst.</li> <li><strong>Sicherheitsbeamte:</strong> Um verdächtiges Verhalten und nervöse Anspannung zu erkennen.</li> </ul> <p>Das Training zur Erkennung von Mikroexpressionen kann die emotionale Intelligenz und die Fähigkeit zur Empathie verbessern.</p> </div> );
const meisterklasseInhalt6 = ( <div className="space-y-8"> <h3 className="text-2xl font-semibold border-b pb-2">Die Facial-Feedback-Hypothese</h3> <p>Diese Hypothese kehrt die übliche Kausalität um und fragt: Kann unser Gesichtsausdruck unsere Emotionen beeinflussen?</p> <p>Die Theorie besagt: Ja. Die Aktivierung unserer Gesichtsmuskeln sendet sensorisches Feedback an das Gehirn, das wiederum unser emotionales Erleben beeinflusst. Ein Lächeln kann uns also tatsächlich ein wenig fröhlicher machen, und ein finsterer Blick kann unsere Stimmung verschlechtern.</p> <p><strong>Die &quot;Stift-im-Mund&quot;-Studie (Strack et al., 1988):</strong> In der klassischen Studie hielten Versuchspersonen einen Stift entweder nur mit den Lippen (was einen finsteren Blick erzeugt) oder nur mit den Zähnen (was die Lachmuskeln aktiviert), während sie Cartoons bewerteten. Die &quot;lächelnde&quot; Gruppe bewertete die Cartoons als signifikant lustiger.</p> <p><strong>Moderne Sicht:</strong> Obwohl die ursprüngliche Studie in Replikationen umstritten war, deuten viele neuere Studien darauf hin, dass der Effekt existiert, auch wenn er klein ist. Es ist ein faszinierendes Beispiel für die enge Wechselwirkung zwischen Körper und Geist (Embodiment).</p> </div> );
const uebungenData6: UebungenData = { quiz: [ { q: 'Welche der folgenden ist laut Ekman KEINE universelle Basisemotion?', a: ['Freude', 'Ekel', 'Schuld'], correct: 2 }, { q: 'Kulturell erlernte Regeln, wann man Emotionen zeigen darf, nennt man...', a: ['Display Rules', 'Emotionale Intelligenz', 'Mikroexpressionen'], correct: 0 }, ], open: [ { q: 'Erkläre die Facial-Feedback-Hypothese mit eigenen Worten.', solution: 'Die Hypothese besagt, dass unser emotionales Erleben nicht nur unseren Gesichtsausdruck verursacht, sondern dass umgekehrt auch unser Gesichtsausdruck unser Gefühl beeinflussen kann. Das Anspannen der Lachmuskeln sendet Signale ans Gehirn, die unsere Stimmung leicht heben können, während ein finsterer Blick sie senken kann.' }, ], kreativ: 'Achten Sie bei der nächsten Interaktion mit einer Person bewusst auf deren nonverbale Signale (Mimik, Gestik). Gab es Momente, in denen die nonverbalen Signale von dem abwichen, was die Person verbal sagte? Was könnte das bedeuten?', };
const uebungenInhalt6 = <UebungenContent data={uebungenData6} />;


// --- MODUL-LISTE (VOLLSTÄNDIG) ---
const emotionMotivationModules: EmotionMotivationModule[] = [
    { id: 1, title: 'Motivation: Theorien & Konzepte', content: { grundwissen: grundwissenInhalt1, anwendbarkeit: anwendbarkeitInhalt1, meisterklasse: meisterklasseInhalt1, uebungen: uebungenInhalt1 }},
    { id: 2, title: 'Hunger, Essen & Sättigung', content: { grundwissen: grundwissenInhalt2, anwendbarkeit: anwendbarkeitInhalt2, meisterklasse: meisterklasseInhalt2, uebungen: uebungenInhalt2 }},
    { id: 3, title: 'Sexualverhalten', content: { grundwissen: grundwissenInhalt3, anwendbarkeit: anwendbarkeitInhalt3, meisterklasse: meisterklasseInhalt3, uebungen: uebungenInhalt3 }},
    { id: 4, title: 'Emotionstheorien', content: { grundwissen: grundwissenInhalt4, anwendbarkeit: anwendbarkeitInhalt4, meisterklasse: meisterklasseInhalt4, uebungen: uebungenInhalt4 }},
    { id: 5, title: 'Die Biologie der Emotionen', content: { grundwissen: grundwissenInhalt5, anwendbarkeit: anwendbarkeitInhalt5, meisterklasse: meisterklasseInhalt5, uebungen: uebungenInhalt5 }},
    { id: 6, title: 'Ausdruck & Regulation von Emotionen', content: { grundwissen: grundwissenInhalt6, anwendbarkeit: anwendbarkeitInhalt6, meisterklasse: meisterklasseInhalt6, uebungen: uebungenInhalt6 }},
];

// --- HAUPTKOMPONENTE FÜR DIE DETAILSEITEN ---
export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);
  const moduleData = emotionMotivationModules.find((m) => m.id === moduleId);

   // --- NEUE PREMIUM-CHECK LOGIK ---
      const { subscription, isLoading: isSubLoading } = useSubscription();
      const tPremium = useTranslations('premiumAccess');
      const tModules = useTranslations('modulesOverview'); // Für den "Zurück"-Link
      
      // Ladezustand anzeigen
      if (isSubLoading) {
        return <LoadingSpinner />;
      }
    
      // Prüfen, ob Premium benötigt wird und ob der Nutzer Premium hat
      const isPremium = subscription?.status === 'active';
      // Modul 2 ist ein Premium-Modul. 
      // (Modul 1 wäre `requiresPremium = false`)
      const requiresPremium = true; 
    
      // Zugriff verweigern, wenn nötig
      if (requiresPremium && !isPremium) {
        return (
          <div className="max-w-3xl mx-auto p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">{tPremium('title')}</h1>
            <p className="mb-6">{tPremium('description')}</p>
            <Link href="/profile" className="px-6 py-2 bg-primary text-white rounded-lg">
              {tPremium('upgradeButton')}
            </Link>
            {/* Link zurück zur ALLGEMEINEN Modulübersicht */}
            <Link href="/modules" className="block flex items-center justify-center gap-2 text-primary hover:underline mt-6">
                  <ArrowLeft className="w-5 h-5" />
                  <span>{tModules('backLink')}</span>
              </Link>
          </div>
        );
      }

  // --- NEU: LOGIK FÜR DIE BLÄTTERFUNKTION ---
  const lessonParts = ['grundwissen', 'anwendbarkeit', 'meisterklasse', 'uebungen'];
  const currentIndex = lessonParts.indexOf(type);

  const prevPart = currentIndex > 0 ? lessonParts[currentIndex - 1] : null;
  const nextPart = currentIndex < lessonParts.length - 1 ? lessonParts[currentIndex + 1] : null;

  const prevLink = prevPart ? `/modules/6/${prevPart}-${moduleId}` : null;
  const nextLink = nextPart ? `/modules/6/${nextPart}-${moduleId}` : null;
  // --- ENDE DER NEUEN LOGIK ---

  if (!moduleData) {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold">Inhalt in Kürze verfügbar</h1>
            <p className="mt-4">Diese Lektion wird gerade erstellt. Bitte schauen Sie bald wieder vorbei!</p>
            <Link href="/modules/6" className="flex items-center gap-2 text-primary hover:underline mt-6">
                <ArrowLeft className="w-5 h-5" />
                <span>Zurück zur Übersicht der Emotions- &amp; Motivationspsychologie</span>
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
        <Link href="/modules/6" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Übersicht der Emotions- &amp; Motivationspsychologie</span>
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
             <Link href="/modules/6" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              <span>Zurück zur Übersicht</span>
            </Link>
          )}
        </div>
        {/* --- ENDE DER NEUEN UI --- */}

      </div>
    </div>
  );
}