// app/[locale]/sources/page.tsx
'use client';

import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SourcesPage() {
  const t = useTranslations('sourcesPage');
  const openstaxUrl = "https://openstax.org/books/psychology-2e/pages/1-introduction";
  const openstaxOrgUrl = "https://openstax.org";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backLink')}</span>
          </Link>
        </div>

        {/* --- HIER IST DIE ÄNDERUNG: 'prose'-Klassen wurden entfernt --- */}
        <div className="bg-white dark:bg-neutral-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow p-8">
          
          {/* Manuelle Tailwind-Klassen für Abstände und Schriftgrößen hinzugefügt */}
          <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{t('heading')}</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">{t('intro')}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-white">{t('licenseTitle')}</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            {t.rich('licenseIntro', {
              strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
            })}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-4 text-slate-900 dark:text-white">{t('citationTitle')}</h3>
          <ul className="list-disc pl-5 space-y-2 text-lg text-slate-700 dark:text-slate-300">
            <li>
              {t.rich('citationAuthors', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('citationPublisher', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('citationBookTitle', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('citationDate', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('citationLocation', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('citationUrl', {
                strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
              })}
              {/* Manuelles Styling für den Link */}
              <a href={openstaxUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all ml-1">{openstaxUrl}</a>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-white">{t('changesTitle')}</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            {t.rich('changesBody', {
              strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
              // Manuelles Styling für den Link
              link: (chunks) => <a href={openstaxOrgUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{chunks}</a>
            })}
          </p>
        </div>
      </div>
    </div>
  );
}