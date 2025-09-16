'use client'
import { useEffect, useState } from 'react'
import { canTakeExam } from '@/utils/modules'
import { useRouter } from 'next/navigation'

export default function ExamPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const ok = await canTakeExam()
      setAllowed(ok)
      if (!ok) router.replace('/modules')
    })()
  }, [router])

  if (allowed === null) return <div className="p-6">Prüfungszugang wird geprüft…</div>
  if (!allowed) return null

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Grosse Prüfung</h1>
      {/* Hier dein Prüfungs-UI / Link / Komponenten */}
      <p>Viel Erfolg! 🎓</p>
    </div>
  )
}
