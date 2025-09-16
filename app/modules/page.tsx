'use client'
import { useEffect, useState } from 'react'
import { listModulesWithState, setModuleDone } from '@/utils/modules'

export default function ModulesPage() {
  const [items, setItems] = useState<{id:number; title:string; sort_order:number; done:boolean}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await listModulesWithState()
      setItems(data)
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="p-6">Lade Module…</div>

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      {items.map(m => (
        <label key={m.id} className="flex items-center gap-3 rounded-lg border p-3">
          <input
            type="checkbox"
            checked={m.done}
            onChange={async (e) => {
              const next = e.target.checked
              await setModuleDone(m.id, next)
              setItems(prev => prev.map(x => x.id === m.id ? { ...x, done: next } : x))
            }}
          />
          <span className="font-medium">{m.title}</span>
        </label>
      ))}
    </div>
  )
}
