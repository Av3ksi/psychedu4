'use client'
import { useEffect, useState } from 'react'
import { listModulesWithState, setModuleDone } from '@/utils/modules'
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { Lock } from 'lucide-react';

export default function ModulesPage() {
  const [items, setItems] = useState<{id:number; title:string; sort_order:number; done:boolean}[]>([])
  const [loading, setLoading] = useState(true)
  const { subscription, isLoading: isSubLoading } = useSubscription();

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await listModulesWithState()
      setItems(data)
      setLoading(false)
    })()
  }, [])

  if (loading || isSubLoading) return <div className="p-6">Lade Module…</div>

  const isPremium = subscription?.status === 'active';

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      {items.map((m, index) => {
        const isLocked = index > 0 && !isPremium;

        if (isLocked) {
          return (
            <div key={m.id} className="flex items-center gap-3 rounded-lg border p-3 bg-slate-100 dark:bg-slate-800 opacity-50">
              <Lock className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-500">{m.title}</span>
              <Link href="/profile" className="ml-auto text-sm text-primary hover:underline">
                Upgrade
              </Link>
            </div>
          );
        }

        return (
          <Link key={m.id} href={`/modules/${m.id}`} passHref>
            <div className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
              <input
                type="checkbox"
                checked={m.done}
                onChange={async (e) => {
                  e.preventDefault();
                  const next = e.target.checked
                  await setModuleDone(m.id, next)
                  setItems(prev => prev.map(x => x.id === m.id ? { ...x, done: next } : x))
                }}
              />
              <span className="font-medium">{m.title}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}