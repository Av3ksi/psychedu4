'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zur Startseite</span>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-8 prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6">Über Psychedu</h1>
          
          <h2 className="text-2xl font-semibold">Unsere Mission: Bildung neu denken</h2>
          <p>
            Das traditionelle Universitätssystem ist oft von hohen Kosten, starren Strukturen und ineffizienten Lernzyklen geprägt, die in jährlichen, stressigen Prüfungsphasen gipfeln. Wichtiges Wissen für die spätere Berufspraxis geht dabei häufig verloren.
          </p>
          <p>
            Psychedu wurde aus der Überzeugung geboren, dass es einen besseren Weg geben muss. Unsere Mission ist es, eine praxisorientierte, flexible und sinnstiftende Alternative zu schaffen, die dir das Wesentliche eines Psychologie-Abschlusses kompakt und zugänglich vermittelt.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Die Geschichte hinter Psychedu</h2>
          <p>
            Psychedu ist das Ergebnis eines einjährigen Projekts, das von einer einzigen Person aus der Schweiz ins Leben gerufen wurde. Als Student der Psychologie und Wirtschaft erlebte unser Gründer selbst die Frustrationen des klassischen Systems. Angetrieben von dem Wunsch, das Lernen effizienter, relevanter und inspirierender zu gestalten, entstand die Vision für diese Plattform: Ein Ort, an dem Bildung nicht nur dem Abschluss dient, sondern einen echten, anwendbaren Wert für deine Zukunft schafft.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Unsere Philosophie</h2>
          <ul>
            <li><strong>Zugänglich:</strong> Wir glauben, dass hochwertige Bildung nicht an überhöhten Preisen scheitern darf.</li>
            <li><strong>Effizient:</strong> Wir konzentrieren uns auf das, was wirklich zählt – das gesamte Wissen eines Bachelor-Studiums, kompakt und verständlich aufbereitet.</li>
            <li><strong>Praxisorientiert:</strong> Wir verbinden Theorie mit Anwendung, um dich optimal auf deine berufliche Zukunft vorzubereiten.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}