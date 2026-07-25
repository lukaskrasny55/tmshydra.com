import { useState } from 'react'
import EditableList from '../EditableList'
import {
  createQuoteAlternative,
  createQuoteLineItem,
  deleteQuoteAlternative,
  deleteQuoteLineItem,
  updateQuoteLineItem,
} from '../../lib/api'
import type { InspectionDetail, QuoteAlternative } from '../../types'

interface Props {
  inspection: InspectionDetail
  onChange: (patch: Partial<InspectionDetail>) => void
}

const SECTION_OPTIONS = [
  { value: 'main', label: 'Hlavná časť' },
  { value: 'nad_ramec', label: 'Nad rámec' },
]

export default function QuoteTab({ inspection, onChange }: Props) {
  const alternatives = inspection.quoteAlternatives
  const [activeId, setActiveId] = useState<string | null>(alternatives[0]?.id ?? null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const active = alternatives.find((a) => a.id === activeId) ?? alternatives[0] ?? null

  function replaceAlternative(updated: QuoteAlternative) {
    onChange({ quoteAlternatives: alternatives.map((a) => (a.id === updated.id ? updated : a)) })
  }

  async function handleCreateAlternative(e: React.FormEvent) {
    e.preventDefault()
    if (!newLabel.trim()) return
    setCreating(true)
    setError(null)
    try {
      const created = await createQuoteAlternative({ inspectionId: inspection.id, label: newLabel.trim() })
      onChange({ quoteAlternatives: [...alternatives, created] })
      setActiveId(created.id)
      setNewLabel('')
      setShowNewForm(false)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setCreating(false)
    }
  }

  async function handleDeleteAlternative(id: string) {
    await deleteQuoteAlternative(id)
    const remaining = alternatives.filter((a) => a.id !== id)
    onChange({ quoteAlternatives: remaining })
    if (activeId === id) setActiveId(remaining[0]?.id ?? null)
  }

  async function handleGenerateFromChecklist() {
    if (!active) return
    setGenerating(true)
    setError(null)
    try {
      const drafts: { description: string; plannedQty: number }[] = []
      inspection.roofEdges.forEach((edge) => {
        drafts.push({ description: `Hrana strechy – ${edge.label}`, plannedQty: Number(edge.lengthM) })
      })
      inspection.gutterSystemItems.forEach((item) => {
        drafts.push({ description: `${item.itemType} (${item.unit})`, plannedQty: Number(item.quantity) })
      })
      inspection.drainDownspouts.forEach((d) => {
        drafts.push({ description: `Zvod – ${d.label}`, plannedQty: Number(d.lengthM) })
      })
      if (inspection.areaM2) {
        drafts.push({ description: 'Hydroizolácia strechy – plocha', plannedQty: Number(inspection.areaM2) })
      }

      let items = [...active.lineItems]
      for (const draft of drafts) {
        const created = await createQuoteLineItem({
          quoteAlternativeId: active.id,
          description: draft.description,
          plannedQty: draft.plannedQty,
          unitPriceSnapshot: 0,
          section: 'main',
          source: 'auto_calculated',
        })
        items = [...items, created]
      }
      replaceAlternative({ ...active, lineItems: items })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setGenerating(false)
    }
  }

  const total = active ? active.lineItems.reduce((sum, li) => sum + Number(li.total), 0) : 0

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center gap-2 flex-wrap">
        {alternatives.map((alt) => (
          <button
            key={alt.id}
            onClick={() => setActiveId(alt.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              active?.id === alt.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {alt.label}
          </button>
        ))}
        <button
          onClick={() => setShowNewForm((v) => !v)}
          className="px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          + Alternatíva
        </button>
      </div>

      {showNewForm && (
        <form onSubmit={handleCreateAlternative} className="bg-white border border-slate-200 rounded-lg p-4 flex gap-3 items-end max-w-sm">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Označenie (napr. A)</label>
            <input
              autoFocus
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={creating || !newLabel.trim()}
            className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium disabled:opacity-50"
          >
            {creating ? '…' : 'Založiť'}
          </button>
        </form>
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {!active ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-slate-500 text-sm text-center">
          Zatiaľ žiadna cenová alternatíva. Založ prvú tlačidlom „+ Alternatíva".
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Položky ponuky – alternatíva {active.label}</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateFromChecklist}
                disabled={generating}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50"
              >
                {generating ? 'Generujem…' : '↻ Generovať z checklistu'}
              </button>
              <button onClick={() => handleDeleteAlternative(active.id)} className="text-xs font-medium text-red-500 hover:text-red-700">
                Vymazať alternatívu
              </button>
            </div>
          </div>

          <EditableList
            columns={[
              { key: 'description', label: 'Popis', placeholder: 'Popis položky' },
              { key: 'plannedQty', label: 'Množstvo', type: 'number' },
              { key: 'unitPriceSnapshot', label: 'Jedn. cena (€)', type: 'number' },
              { key: 'wastePercent', label: 'Odpad (%)', type: 'number' },
              { key: 'total', label: 'Spolu (€)', type: 'number' },
              { key: 'section', label: 'Časť', type: 'select', options: SECTION_OPTIONS },
            ]}
            items={active.lineItems}
            onCreate={async (draft) => {
              const created = await createQuoteLineItem({
                quoteAlternativeId: active.id,
                description: String(draft.description || ''),
                plannedQty: Number(draft.plannedQty) || 0,
                unitPriceSnapshot: Number(draft.unitPriceSnapshot) || 0,
                wastePercent: Number(draft.wastePercent) || 0,
                section: (draft.section as 'main' | 'nad_ramec') || 'main',
              })
              replaceAlternative({ ...active, lineItems: [...active.lineItems, created] })
            }}
            onUpdate={async (id, key, value) => {
              const numericKeys = ['plannedQty', 'unitPriceSnapshot', 'wastePercent', 'total']
              const patch = numericKeys.includes(key) ? { [key]: Number(value) } : { [key]: value }
              const updated = await updateQuoteLineItem(id, patch)
              replaceAlternative({ ...active, lineItems: active.lineItems.map((li) => (li.id === id ? updated : li)) })
            }}
            onDelete={async (id) => {
              await deleteQuoteLineItem(id)
              replaceAlternative({ ...active, lineItems: active.lineItems.filter((li) => li.id !== id) })
            }}
          />

          <div className="flex justify-end pt-2 border-t border-slate-100">
            <div className="text-right">
              <div className="text-xs text-slate-500">Spolu</div>
              <div className="text-xl font-semibold text-slate-900">{total.toFixed(2)} €</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
