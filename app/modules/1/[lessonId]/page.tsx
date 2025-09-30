'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// --- Genaue Typ-Definitionen für unsere Daten ---
// 'QuizItem' wurde entfernt, da es nicht verwendet wird.
interface ModuleContent {
  grundwissen: string;
  anwendbarkeit: string;
  lehrersein: string;
  uebungen: string;
}

interface StatisticsModule {
  id: number;
  title: string;
  relevance: string;
  content: ModuleContent;
}
// --- ENDE DER DEFINITIONEN ---


const statisticsModules: StatisticsModule[] = [
    { id: 1, title: "Einführung & Grundbegriffe", relevance: "green", content: { grundwissen: "Hier steht die ausführliche Theorie zum Thema Grundbegriffe...", anwendbarkeit: "Hier stehen die ausführlichen Beispiele zur Anwendbarkeit...", lehrersein: "Hier steht der ausführliche Text zur Meisterklasse...", uebungen: "Hier kommen die interaktiven Übungen hin..." }},
    { id: 2, title: "Datenerhebung & Studiendesign", relevance: "orange", content: { grundwissen: "...", anwendbarkeit: "...", lehrersein: "...", uebungen: "..." }},
    // ... füge hier die VOLLSTÄNDIGEN Inhalte für alle 16 Module ein
];

export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();

  const [type, moduleIdStr] = lessonId.split('-');
  const moduleId = parseInt(moduleIdStr, 10);

  const moduleData = statisticsModules.find(m => m.id === moduleId);

  if (!moduleData) {
    return <div>Lektion nicht gefunden.</div>;
  }
  
  const contentKey = type as keyof ModuleContent;
  const content = moduleData.content[contentKey] || "Inhalt nicht verfügbar.";
  
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${moduleData.title}`;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="sticky top-20 z-10 py-4 bg-slate-50 dark:bg-[#0B1120]">
        <Link href="/modules/1" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>Zurück zur Statistik-Übersicht</span>
        </Link>
      </div>

      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>{content}</p>
        </div>
      </div>
    </div>
  );
}