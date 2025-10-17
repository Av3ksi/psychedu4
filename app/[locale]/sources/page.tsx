'use client';

import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function SourcesPage() {
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
          <h1 className="text-3xl font-bold mb-6">Quellenangabe und Lizenzinformationen</h1>
          
          <p>
            Die Lerninhalte auf Psychedu basieren massgeblich auf dem hervorragenden, frei verfügbaren Lehrbuch <strong>&quotPsychology&quot</strong> von OpenStax. Wir sind OpenStax zutiefst dankbar für die Bereitstellung dieser hochwertigen Bildungsressource, die es uns ermöglicht, psychologisches Wissen zugänglich zu machen.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Lizenz und Namensnennung</h2>
          <p>
            Das Originalwerk von OpenStax ist unter der{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Creative Commons Attribution License v4.0 (CC BY)
            </a>{' '}
            lizenziert. Gemäss den Lizenzbestimmungen geben wir die folgende, von OpenStax geforderte Namensnennung an:
          </p>

          <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600 dark:text-slate-400 not-italic">
            <h3 className="font-semibold text-slate-900 dark:text-white !mt-0">Zitierinformationen</h3>
            <ul className="list-none p-0 my-2">
              <li><strong>Autoren:</strong> Rose M. Spielman, William J. Jenkins, Marilyn D. Lovett</li>
              <li><strong>Herausgeber/Webseite:</strong> OpenStax</li>
              <li><strong>Buchtitel:</strong> Psychology 2e</li>
              <li><strong>Veröffentlichungsdatum:</strong> 22. Oktober 2020</li>
              <li><strong>Ort:</strong> Houston, Texas</li>
              <li><strong>Buch-URL:</strong> <a href="https://openstax.org/books/psychology-2e" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://openstax.org/books/psychology-2e/pages/1-introduction</a></li>
            </ul>
          </blockquote>

          <h2 className="text-2xl font-semibold mt-8">Vorgenommene Änderungen</h2>
          <p>
            Für die Psychedu-Plattform wurden die Inhalte aus &quotPsychology 2e&quot kuratiert, in eine modulare Struktur überführt, ins Deutsche übersetzt und durch interaktive Übungsformate ergänzt, um ein optimiertes Lernerlebnis zu schaffen. Wir ermutigen alle Nutzer, das vollständige Originalwerk, das kostenlos auf{' '}
            <a href="https://openstax.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openstax.org</a>{' '}
            zugänglich ist, ebenfalls zu konsultieren.
          </p>
        </div>
      </div>
    </div>
  );
}