'use client';

import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
// NEU: Importiere useTranslations
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  // NEU: Initialisiere die Übersetzungsfunktion für den Namespace 'aboutPage'
  const t = useTranslations('aboutPage');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          {/* Übersetze den Link-Text */}
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backLink')}</span>
          </Link>
        </div>

        {/* Dein bestehender Inhalts-Container */}
        <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-8 prose prose-lg dark:prose-invert max-w-none">
          {/* Übersetze die Titel und Absätze */}
          <h1 className="text-3xl font-bold mb-6">{t('mainTitle')}</h1>

          <h2 className="text-2xl font-semibold">{t('missionTitle')}</h2>
          <p>
            {t('missionParagraph1')}
          </p>
          <p>
            {t('missionParagraph2')}
          </p>

          <h2 className="text-2xl font-semibold mt-8">{t('historyTitle')}</h2>
          <p>
            {t('historyParagraph')}
          </p>

          <h2 className="text-2xl font-semibold mt-8">{t('philosophyTitle')}</h2>
          <ul>
            {/* Verwende t.rich für HTML-Inhalte */}
            <li>
              {t.rich('philosophyPoint1', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('philosophyPoint2', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('philosophyPoint3', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </li>
          </ul>
        </div>

        {/* --- NEUER BUTTON-ABSCHNITT --- */}
        <div className="mt-10 flex justify-center">
          <a
            href="/Impressum.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary no-underline"
          >
            {/* Verwendet den neuen JSON-Schlüssel */}
            {t('legalButton')}
          </a>
        </div>
        {/* --- ENDE NEUER BUTTON-ABSCHNITT --- */}

      </div>
    </div>
  );
}