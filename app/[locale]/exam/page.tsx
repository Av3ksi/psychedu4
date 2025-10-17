'use client'
import { useEffect, useState } from 'react'
import { canTakeExam } from '@/utils/modules'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Eine kleine Hilfskomponente für die Tabellenzeilen, um Code zu sparen
const CriteriaRow = ({ criterion, description }: { criterion: string, description: string }) => (
  <tr className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 align-top">{criterion}</td>
    <td className="p-4 text-slate-600 dark:text-slate-400">{description}</td>
  </tr>
);


export default function ExamPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const ok = await canTakeExam()
      setAllowed(ok)
      // Wenn der Zugriff nicht erlaubt ist, leiten wir den Nutzer mit einer Meldung zurück
      if (ok === false) { 
          alert("Du hast noch nicht alle Module abgeschlossen, um die Prüfung zu starten.");
          router.replace('/modules');
      }
    })()
  }, [router])

  // Ladezustand, während der Zugriff geprüft wird
  if (allowed === null) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-4 text-lg">Prüfungszugang wird geprüft…</span>
        </div>
    );
  }
  
  // Fallback, falls die Weiterleitung fehlschlägt
  if (!allowed) {
    return null;
  }

  // Die eigentliche Prüfungsseite, wenn der Zugriff erlaubt ist
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <Link href="/modules" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zur Modulübersicht</span>
          </Link>
        </div>

        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Deine Abschlussprüfung</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Herzlichen Glückwunsch zum Abschluss aller Module! Deine Prüfung besteht aus zwei Teilen: einer schriftlichen Degree-Arbeit und einer mündlichen Präsentation.
          </p>
        </header>

        {/* Teil 1: Schriftliche Arbeit */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 border-b border-primary/20 pb-4">Teil 1: Schriftliche Degree-Arbeit</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 mb-8">
            <p>
              Verfasse eine wissenschaftliche Arbeit zu einem psychologischen Thema deiner Wahl. Ziel ist es zu zeigen, dass du ein Thema eigenständig analysieren und verständlich aufbereiten kannst. Mögliche Formate sind der Entwurf eines Experiments, eine Feldstudie oder eine kleine Meta-Analyse.
            </p>
            <h3 className="text-xl font-semibold">Formale Anforderungen:</h3>
            <ul>
                <li><strong>Umfang:</strong> 10-30 Seiten (reiner Text, exkl. Verzeichnisse und Anhang).</li>
                <li><strong>Struktur:</strong> Inhaltsverzeichnis, klare Gliederung, Fazit.</li>
                <li><strong>Verständlichkeit:</strong> Die Arbeit sollte so geschrieben sein, dass eine Person ab 16 Jahren mit Interesse am Thema sie verstehen kann.</li>
                <li><strong>Quellen:</strong> Alle verwendeten Quellen müssen nach dem APA-Standard korrekt angegeben werden.</li>
            </ul>
          </div>
          <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-4 text-sm font-semibold uppercase text-slate-700 dark:text-slate-300 w-1/3">Bewertungskriterium</th>
                  <th className="p-4 text-sm font-semibold uppercase text-slate-700 dark:text-slate-300">Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                <CriteriaRow criterion="Struktur & Gliederung" description="Klare und logische Gliederung mit Inhaltsverzeichnis. Ein roter Faden ist durch die gesamte Arbeit erkennbar." />
                <CriteriaRow criterion="Inhaltliche Tiefe" description="Eigenständige und kritische Auseinandersetzung mit dem Thema. Die Analyse geht über eine reine Zusammenfassung hinaus." />
                <CriteriaRow criterion="Verständlichkeit & Sprache" description="Präzise und klare Sprache. Komplexe Sachverhalte werden so erklärt, dass sie auch für Laien nachvollziehbar sind." />
                <CriteriaRow criterion="Wissenschaftliches Arbeiten" description="Korrekte und durchgängige Zitation nach APA-Standard. Quellen sind nachvollziehbar und korrekt angegeben." />
                <CriteriaRow criterion="Formale Anforderungen" description="Einhaltung der Längenvorgabe und ein sauberes, professionelles Layout." />
              </tbody>
            </table>
          </div>
        </section>

        {/* Teil 2: Präsentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 border-b border-primary/20 pb-4">Teil 2: Mündliche Präsentation</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 mb-8">
              <p>
                  Präsentiere die Kernaussagen deiner Arbeit in einem kurzen, aufgezeichneten Vortrag. Stell dir vor, du hältst einen TED-Talk: fesselnd, verständlich und auf den Punkt gebracht.
              </p>
              <h3 className="text-xl font-semibold">Formale Anforderungen:</h3>
              <ul>
                  <li><strong>Länge:</strong> 10-15 Minuten.</li>
                  <li><strong>Format:</strong> Videoaufnahme, bei der du gut zu sehen und zu hören bist.</li>
              </ul>
          </div>
           <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-4 text-sm font-semibold uppercase text-slate-700 dark:text-slate-300 w-1/3">Bewertungskriterium</th>
                  <th className="p-4 text-sm font-semibold uppercase text-slate-700 dark:text-slate-300">Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                <CriteriaRow criterion="Inhalt & Storytelling" description="Die Präsentation hat eine klare Kernbotschaft und einen fesselnden erzählerischen Aufbau (roter Faden)." />
                <CriteriaRow criterion="Sprechweise & Stimme" description="Deutliche Aussprache, angemessenes Tempo und Lautstärke. Lebendige Betonung und bewusster Einsatz von Pausen." />
                <CriteriaRow criterion="Körpersprache & Auftreten" description="Sichere Körperhaltung, gezielter Einsatz von Gestik und Mimik. Direkter Blickkontakt in die Kamera." />
                <CriteriaRow criterion="Visuelle Gestaltung" description="(Falls Folien verwendet werden) Klares, ansprechendes Design, das die mündlichen Aussagen unterstützt, nicht ersetzt." />
                <CriteriaRow criterion="Gesamteindruck" description="Die Präsentation wirkt souverän, authentisch und hinterlässt einen professionellen, inspirierenden Eindruck." />
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="text-center p-8 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Einreichung</h2>
            <p className="text-slate-700 dark:text-slate-300">
                Wenn du bereit bist, sende deine Abschlussarbeit (als PDF) und den Link zu deinem Präsentationsvideo an unsere E-Mail-Adresse. Vergiss nicht, du hast soviele Versuche wie du brauchst. Wir machen keine Einschränkungen! Wir wünschen dir viel Erfolg!
            </p>
        </section>
      </div>
    </div>
  )
}