'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Check, X, Eye, EyeOff } from 'lucide-react';
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

// --- HILFS-KOMPONENTEN ---

const ToggleSolution: FC<{ question: OpenQuestion }> = ({ question }) => {
    const [isOpen, setIsOpen] = useState(false);
    // !! Namespace für Modul 10 UI !!
    const t = useTranslations('module10.ui');
    return (
        <div className="border-t dark:border-slate-700 pt-4">
            <p className="font-semibold">{question.q}</p>
            <button onClick={() => setIsOpen(!isOpen)} className="text-sm text-primary hover:underline flex items-center gap-2 my-2">
                {isOpen ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                {isOpen ? t('hideSolution') : t('showSolution')}
            </button>
            {isOpen && (
              <div
                className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: question.solution }}
              />
            )}
        </div>
    );
};

const UebungenContent: FC<{ data: UebungenData, moduleNumber: number }> = ({ data, moduleNumber }) => {
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(data?.quiz?.length ?? 0).fill(null));
    const handleSelect = (quizIndex: number, answerIndex: number) => { setAnswers(prev => { const newAnswers = [...prev]; newAnswers[quizIndex] = answerIndex; return newAnswers; }); };
    // !! Namespace dynamisch für Modul 10 UI !!
    const t = useTranslations(`module${moduleNumber}.ui`);

    if (!data || !data.quiz || !data.open || !data.kreativ) {
        return <p>{t('loadingError')}</p>;
    }

    return (
        <div className="space-y-12">
            {/* Quiz Sektion */}
             <div><h3 className="text-2xl font-semibold border-b pb-2 mb-4">{t('quizTitle')}</h3><div className="space-y-6">{data.quiz.map((q, i) => (<div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><p className="font-semibold mb-3">{i+1}. {q.q}</p><div className="space-y-2">{q.a.map((ans, j) => {const isSelected = answers[i] === j; const isCorrect = q.correct === j; let buttonClass = 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'; if (isSelected) { buttonClass = isCorrect ? 'bg-green-200 dark:bg-green-800 text-slate-900 dark:text-white' : 'bg-red-200 dark:bg-red-800 text-slate-900 dark:text-white'; } return (<button key={j} onClick={() => handleSelect(i, j)} className={`w-full text-left p-2 rounded-md transition-colors flex items-center justify-between ${buttonClass}`}><span>{ans}</span>{isSelected && (isCorrect ? <Check className="w-5 h-5 text-green-700 dark:text-green-300" /> : <X className="w-5 h-5 text-red-700 dark:text-red-300" />)}</button>);})}</div></div>))}</div></div>

            {/* Offene Fragen Sektion */}
            <div><h3 className="text-2xl font-semibold border-b pb-2 mb-4">{t('openTitle')}</h3><div className="space-y-6">{data.open.map((q, i) => <ToggleSolution key={i} question={q} />)}</div></div>

            {/* Kreativfrage Sektion */}
            <div><h3 className="text-2xl font-semibold border-b pb-2 mb-4">{t('creativeTitle')}</h3><div className="p-4 border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20"><p className="italic text-slate-700 dark:text-slate-300">{data.kreativ}</p></div></div>
        </div>
    );
};


// --- HAUPTKOMPONENTE ---
export default function LessonDetailPage() {
  // --- 1. ALLE HOOKS ZUERST UND UNBEDINGT ---
  const params = useParams<{ lessonId: string }>();
  const { subscription, isLoading: isSubLoading } = useSubscription();
  const tPremium = useTranslations('premiumAccess');
  const tModulesOverview = useTranslations('modulesOverview');

  // Hole lessonId FRÜH, ABER NACH useParams
  const { lessonId } = params;

  // Bestimme die Modulnummer FRÜH, aber prüfe Gültigkeit erst später
  let moduleNumber: number | null = null;
  let type: string | null = null;
  let moduleIdStr: string | null = null; // Das ist die Lektionsnummer als String (z.B. '1', '8')
  let isValidId = false;
  if (lessonId && typeof lessonId === 'string' && lessonId.includes('-')) {
    [type, moduleIdStr] = lessonId.split('-');
    const parsedModuleId = parseInt(moduleIdStr, 10);
    // Prüfe, ob es Modul 10 ist und die Lektions-ID gültig ist (1-8)
    if (!isNaN(parsedModuleId) && parsedModuleId >= 1 && parsedModuleId <= 8) {
      moduleNumber = 10; // Fest auf Modul 10 setzen
      isValidId = true;
    }
  }

  // --- RUFE DEN MODUL-SPEZIFISCHEN HOOK JETZT HIER OBEN AUF ---
  // Verwende 'module10' oder einen Fallback
  const tModule = useTranslations(isValidId ? `module10` : 'module1'); // 'module1' als Fallback


  // --- 2. JETZT DIE PRÜFUNGEN UND FRÜHEN RETURNS ---
  if (!isValidId) {
    // Ungültige Lektions-ID für Modul 10
     return (
          <div className="max-w-4xl mx-auto p-6 md:p-8">
              <h1 className="text-2xl font-bold">{tModule('contentError.title')}</h1>
              <p>{tModule('contentError.description')}</p> {/* Zeige allgemeine Fehlermeldung */}
              <Link href="/modules/10" className="flex items-center gap-2 text-primary hover:underline mt-6">
                  <ArrowLeft className="w-5 h-5" />
                  <span>{tModule('backToOverview')}</span>
              </Link>
          </div>
      );
  }

  // Ladezustand
  if (isSubLoading) {
    return <LoadingSpinner />;
  }

  // --- 3. PREMIUM-CHECK ---
  const isPremium = subscription?.status === 'active';
  const requiresPremium = true; // Modul 10 ist Premium

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
              <span>{tModulesOverview('backLink')}</span>
          </Link>
      </div>
    );
  }

  // --- 4. INHALTE LADEN UND RENDERN ---
  let content: ReactNode;
  let lessonTitle: string;
  let contentAvailable = true;
  // Wir verwenden jetzt moduleIdStr (der String '1' bis '8') als Key in den JSON-Daten
  const lessonKey = moduleIdStr!; // Ist sicher gültig wegen isValidId Check

  try {
    lessonTitle = tModule(`lessons.${lessonKey}.title`);
    const contentKey = type as 'grundwissen' | 'anwendbarkeit' | 'meisterklasse' | 'uebungen';

    if (contentKey === 'uebungen') {
      const uebungenData: UebungenData = tModule.raw(`lessons.${lessonKey}.uebungen`);
      if (!uebungenData?.quiz || !uebungenData?.open || !uebungenData?.kreativ) throw new Error('Übungsdaten unvollständig');
      content = <UebungenContent data={uebungenData} moduleNumber={moduleNumber!} />;
    } else {
      const htmlContent = tModule.raw(`lessons.${lessonKey}.${contentKey}`);
      if (!htmlContent) throw new Error('HTML-Inhalt nicht gefunden');
      content = <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
  } catch (error) {
     console.error(`Inhalt konnte nicht geladen werden für Modul ${moduleNumber}, Lektion ${lessonKey}, Typ ${type}:`, error);
     contentAvailable = false;
     lessonTitle = tModule('contentError.title');
     content = <p>{tModule('contentError.description')}</p>;
  }


  if (!contentAvailable) {
      return (
          <div className="max-w-4xl mx-auto p-6 md:p-8">
              <h1 className="text-2xl font-bold">{lessonTitle}</h1>
              {content}
              {/* Link zurück zur Modul 10 Übersicht */}
              <Link href="/modules/10" className="flex items-center gap-2 text-primary hover:underline mt-6">
                  <ArrowLeft className="w-5 h-5" />
                  <span>{tModule('backToOverview')}</span>
              </Link>
          </div>
      );
  }

  // --- TITEL UND BLÄTTERFUNKTION ---
  const lessonParts = ['grundwissen', 'anwendbarkeit', 'meisterklasse', 'uebungen'];
  const currentIndex = lessonParts.indexOf(type!);
  const prevPart = currentIndex > 0 ? lessonParts[currentIndex - 1] : null;
  const nextPart = currentIndex < lessonParts.length - 1 ? lessonParts[currentIndex + 1] : null;
  // Link verwendet jetzt lessonKey (String '1'-'8')
  const prevLink = prevPart ? `/modules/10/${prevPart}-${lessonKey}` : null;
  const nextLink = nextPart ? `/modules/10/${nextPart}-${lessonKey}` : null;

  let pageTypeFormatted = type;
  if (type === 'grundwissen') {
    pageTypeFormatted = tModulesOverview('pageTitleGrundwissen');
  } else if (type === 'anwendbarkeit') {
    pageTypeFormatted = tModulesOverview('pageTitleAnwendbarkeit');
  } else if (type === 'meisterklasse') {
    pageTypeFormatted = tModulesOverview('pageTitleMeisterklasse');
  } else if (type === 'uebungen') {
    pageTypeFormatted = tModulesOverview('pageTitleUebungen');
  }
  const title = `${pageTypeFormatted}: ${lessonTitle}`;


  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        {/* Link zurück zur Modul 10 Übersicht */}
        <Link href="/modules/10" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-5 h-5" />
          <span>{tModule('backToOverview')}</span>
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {content}
        </div>

        {/* Navigation am Ende der Seite */}
        <div className="mt-12 flex justify-between items-center border-t dark:border-slate-700 pt-6">
          {prevLink ? (
            <Link href={prevLink} className="flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors rounded-md p-2 -m-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">{tModule('ui.prevSection')}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextLink ? (
            <Link href={nextLink} className="flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors rounded-md p-2 -m-2">
              <span className="font-semibold">{tModule('ui.nextSection')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
             <Link href="/modules/10" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              <span>{tModule('ui.backToOverviewButton')}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}