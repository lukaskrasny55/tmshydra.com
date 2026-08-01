import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createChecklistItemCatalog, fetchChecklistItemCatalog, updateChecklistItemCatalog } from '../lib/api'
import EditableList from '../components/EditableList'
import type { ChecklistItemCatalog } from '../types'

const CATEGORY_OPTIONS = [
  { value: 'material', label: 'Materiál' },
  { value: 'prace', label: 'Práce' },
  { value: 'ine', label: 'Iné' },
]

const SOURCE_LABELS: Record<string, string> = {
  system_default: 'pôvodná',
  custom_added: 'vlastná',
}

export default function ChecklistCatalogPage() {
  const [items, setItems] = useState<ChecklistItemCatalog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchChecklistItemCatalog()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
          ← Zoznam zákaziek
        </Link>
        <h1 className="text-xl font-semibold text-slate-900 mt-1">Položky checklistu</h1>
        <p className="text-sm text-slate-500 mt-1">
          Deaktivovaná položka zmizne z checklistu pre nové obhliadky, ale staré ponuky, ktoré ju použili, zostanú nezmenené.
        </p>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {loading ? (
          <div className="text-slate-500 text-sm py-8 text-center">Načítavam…</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <EditableList
              columns={[
                { key: 'name', label: 'Názov', placeholder: 'napr. Oprava komínového lemovania' },
                { key: 'unit', label: 'Jednotka', placeholder: 'm / m² / bm / ks' },
                { key: 'defaultUnitPrice', label: 'Cena (€)', type: 'number' },
                { key: 'category', label: 'Kategória', type: 'select', options: CATEGORY_OPTIONS },
                { key: 'isActive', label: 'Aktívna', type: 'checkbox' },
                { key: 'sourceLabel', label: 'Pôvod', type: 'readonly' },
              ]}
              items={items.map((item) => ({ ...item, sourceLabel: SOURCE_LABELS[item.source] ?? item.source }))}
              onCreate={async (draft) => {
                const created = await createChecklistItemCatalog({
                  name: String(draft.name || ''),
                  unit: String(draft.unit || 'ks'),
                  defaultUnitPrice: Number(draft.defaultUnitPrice) || 0,
                  category: (draft.category as 'material' | 'prace' | 'ine') || 'material',
                })
                setItems((prev) => [...prev, created])
              }}
              onUpdate={async (id, key, value) => {
                const patch = key === 'defaultUnitPrice' ? { defaultUnitPrice: Number(value) || 0 } : { [key]: value }
                const updated = await updateChecklistItemCatalog(id, patch)
                setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)))
              }}
            />
          </div>
        )}
      </main>
    </div>
  )
}
