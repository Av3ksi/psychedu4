'use client';

import { useParams } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { useState } from 'react'; // Wichtig für die Interaktivität des Quiz

// --- INHALTE FÜR DEINE MODULE ---
// Hier kannst du die Inhalte für alle deine Module hinterlegen.
// Später kann man das auch in eine eigene Datei oder Datenbank auslagern.
const modulesContent: { [key: string]: any } = {
  '1': {
    title: 'Einführung in die Statistik',
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">
          Willkommen zu Modul 1! Die Statistik ist ein fundamentales Werkzeug in der Psychologie. Sie ermöglicht es uns, Daten aus Experimenten und Studien zu sammeln, zu analysieren, zu interpretieren und zu präsentieren. Ohne Statistik könnten wir keine fundierten Aussagen über menschliches Verhalten und Erleben treffen.
        </p>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Schlüsselkonzepte</h3>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong>Deskriptive Statistik:</strong> Beschreibt und fasst Daten zusammen. Beispiele sind der Mittelwert (Durchschnitt), der Median (zentraler Wert) oder die Standardabweichung (Streuung).
            </li>
            <li>
              <strong>Inferenzstatistik:</strong> Ermöglicht es, von einer kleinen Stichprobe auf eine grössere Population zu schliessen und Hypothesen zu testen. Beispiel: Testen, ob ein neues Medikament wirksamer ist als ein Placebo.
            </li>
            <li>
              <strong>Population vs. Stichprobe:</strong> Die Population ist die gesamte Gruppe, über die wir eine Aussage treffen wollen (z.B. alle Schweizer Studierenden), während die Stichprobe eine kleinere, ausgewählte Gruppe aus dieser Population ist, die wir tatsächlich untersuchen.
            </li>
          </ul>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-2">Kleines Quiz zum Testen</h3>
            <SimpleQuiz />
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-2">Zusammenfassung</h3>
            <p>
                In diesem Modul hast du die Grundlagen der Statistik kennengelernt und den Unterschied zwischen beschreibender und schliessender Statistik verstanden. Diese Konzepte sind die Basis für alle weiteren empirischen Methoden in der Psychologie.
            </p>
        </div>
      </div>
    )
  },
  '2': {
    title: 'Biologische Psychologie',
    content: <p>Inhalte für Modul 2 kommen hier hin...</p>
  },
  // Füge hier weitere Module hinzu...
};

// Eine kleine interaktive Quiz-Komponente
function SimpleQuiz() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 'inferenz';

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setIsCorrect(answer === correctAnswer);
    };

    return (
        <div className="p-4 border rounded-lg mt-4 bg-slate-50 dark:bg-slate-800">
            <p className="font-semibold mb-2">Frage: Welche Art von Statistik verwendest du, um von einer kleinen Testgruppe auf die Allgemeinheit zu schliessen?</p>
            <div className="space-y-2">
                <button onClick={() => handleAnswer('deskriptiv')} className={`block w-full text-left p-2 rounded-md ${selectedAnswer === 'deskriptiv' ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-slate-200 dark:bg-slate-700'}`}>A) Deskriptive Statistik</button>
                <button onClick={() => handleAnswer('inferenz')} className={`block w-full text-left p-2 rounded-md ${selectedAnswer === 'inferenz' ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-slate-200 dark:bg-slate-700'}`}>B) Inferenzstatistik</button>
            </div>
            {isCorrect === true && <p className="text-green-600 mt-2">Richtig! Sehr gut.</p>}
            {isCorrect === false && <p className="text-red-600 mt-2">Nicht ganz, versuche es noch einmal.</p>}
        </div>
    )
}


export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const { subscription, isLoading: isSubLoading } = useSubscription();

  if (isSubLoading) {
    return <LoadingSpinner />;
  }

  const status = subscription?.status;
  const moduleNumber = parseInt(moduleId as string, 10);
  let isLocked = true;

  if (moduleNumber === 1) {
    isLocked = false;
  } else if (status === 'active') {
    isLocked = false;
  }

  if (isLocked) {
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

  // Lade den Inhalt für das spezifische Modul
  const moduleData = modulesContent[moduleId as string] || { title: `Modul ${moduleId}`, content: <p>Für dieses Modul wurde noch kein Inhalt erstellt.</p> };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{moduleData.title}</h1>
      <div>{moduleData.content}</div>
    </div>
  );
}