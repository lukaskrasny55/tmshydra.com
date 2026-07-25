import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPriceListItem, deletePriceListItem, fetchPriceList, updatePriceListItem } from '../lib/api'
import EditableList from '../components/EditableList'
import type { PriceListItem } from '../types'

const CATEGORY_OPTIONS = [
  { value: 'material', label: 'Materiál' },
  { value: 'prace', label: 'Práce' },
]

export default function PriceListPage() {
  const [items, setItems] = useState<PriceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPriceList()
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
        <h1 className="text-xl font-semibold text-slate-900 mt-1">Cenník</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {loading ? (
          <div className="text-slate-500 text-sm py-8 text-center">Načítavam…</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <EditableList
              columns={[
                { key: 'itemKey', label: 'Kľúč položky', placeholder: 'napr. hydroizolacia_bitutop' },
                { key: 'unit', label: 'Jednotka', placeholder: 'm2 / m / ks' },
                { key: 'unitPrice', label: 'Cena (€)', type: 'number' },
                { key: 'category', label: 'Kategória', type: 'select', options: CATEGORY_OPTIONS },
              ]}
              items={items}
              onCreate={async (draft) => {
                const created = await createPriceListItem({
                  itemKey: String(draft.itemKey || ''),
                  unit: String(draft.unit || 'ks'),
                  unitPrice: Number(draft.unitPrice) || 0,
                  category: (draft.category as 'material' | 'prace') || 'material',
                })
                setItems((prev) => [...prev, created])
              }}
              onUpdate={async (id, key, value) => {
                const patch = key === 'unitPrice' ? { unitPrice: Number(value) || 0 } : { [key]: value }
                const updated = await updatePriceListItem(id, patch)
                setItems((prev) => prev.map((item) => (item.id === id ? updated : item)))
              }}
              onDelete={async (id) => {
                await deletePriceListItem(id)
                setItems((prev) => prev.filter((item) => item.id !== id))
              }}
            />
          </div>
        )}
      </main>
    </div>
  )
}
