import { useState } from 'react'
import EditableList from '../EditableList'
import {
  createQuoteAlternative,
  createQuoteLineItem,
  deleteQuoteAlternative,
  deleteQuoteLineItem,
  updateQuoteAlternative,
  updateQuoteLineItem,
} from '../../lib/api'
import type { InspectionDetail, LineItemSection, QuoteAlternative, QuoteLineItem } from '../../types'

interface Props {
  inspection: InspectionDetail
  onChange: (patch: Partial<InspectionDetail>) => void
}

const LINE_ITEM_COLUMNS = [
  { key: 'description', label: 'Popis', placeholder: 'Popis položky' },
  { key: 'plannedQty', label: 'Naplánované', type: 'number' as const },
  { key: 'previousQty', label: 'Predchádzajúci', type: 'number' as const },
  { key: 'actualQty', label: 'Aktuálne', type: 'number' as const },
  { key: 'unitPriceSnapshot', label: 'Jedn. cena (€)', type: 'number' as const },
  { key: 'wastePercent', label: 'Stratné (%)', type: 'number' as const },
  { key: 'total', label: 'Celkom (€)', type: 'number' as const },
]

function sectionTotals(items: QuoteLineItem[], discountPercent: number) {
  const subtotal = items.reduce((sum, li) => sum + Number(li.total), 0)
  const discountAmount = Math.round(subtotal * (discountPercent / 100) * 100) / 100
  const totalAfterDiscount = Math.round((subtotal - discountAmount) * 100) / 100
  return { subtotal, discountAmount, totalAfterDiscount }
}

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

  async function handleDiscountBlur(value: string) {
    if (!active) return
    const percent = Number(value)
    if (Number.isNaN(percent) || percent === Number(active.discountPercent)) return
    const updated = await updateQuoteAlternative(active.id, { discountPercent: percent })
    replaceAlternative({ ...active, discountPercent: updated.discountPercent })
  }

  async function handleGenerateFromChecklist() {
    if (!active) return
    setGenerating(true)
    setError(null)
    try {
      const drafts: { description: string; plannedQty: number; section: LineItemSection }[] = []
      inspection.roofEdges.forEach((edge) => {
        drafts.push({ description: `Hrana strechy – ${edge.label}`, plannedQty: Number(edge.lengthM), section: 'main' })
      })
      if (inspection.areaM2) {
        drafts.push({ description: 'Hydroizolácia strechy – plocha', plannedQty: Number(inspection.areaM2), section: 'main' })
      }
      inspection.gutterSystemItems.forEach((item) => {
        drafts.push({ description: `${item.itemType} (${item.unit})`, plannedQty: Number(item.quantity), section: 'nad_ramec' })
      })
      inspection.drainDownspouts.forEach((d) => {
        drafts.push({ description: `Zvod – ${d.label}`, plannedQty: Number(d.lengthM), section: 'nad_ramec' })
      })

      let items = [...active.lineItems]
      for (const draft of drafts) {
        const created = await createQuoteLineItem({
          quoteAlternativeId: active.id,
          description: draft.description,
          plannedQty: draft.plannedQty,
          unitPriceSnapshot: 0,
          section: draft.section,
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

  function makeSectionHandlers(section: LineItemSection) {
    if (!active) return null
    return {
      onCreate: async (draft: Record<string, string | boolean>) => {
        const created = await createQuoteLineItem({
          quoteAlternativeId: active.id,
          description: String(draft.description || ''),
          plannedQty: Number(draft.plannedQty) || 0,
          unitPriceSnapshot: Number(draft.unitPriceSnapshot) || 0,
          wastePercent: Number(draft.wastePercent) || 0,
          section,
        })
        replaceAlternative({ ...active, lineItems: [...active.lineItems, created] })
      },
      onUpdate: async (id: string, key: string, value: string | boolean) => {
        const numericKeys = ['plannedQty', 'previousQty', 'actualQty', 'unitPriceSnapshot', 'wastePercent', 'total']
        const patch = numericKeys.includes(key) ? { [key]: Number(value) } : { [key]: value }
        const updated = await updateQuoteLineItem(id, patch)
        replaceAlternative({ ...active, lineItems: active.lineItems.map((li) => (li.id === id ? updated : li)) })
      },
      onDelete: async (id: string) => {
        await deleteQuoteLineItem(id)
        replaceAlternative({ ...active, lineItems: active.lineItems.filter((li) => li.id !== id) })
      },
    }
  }

  const discountPercent = active ? Number(active.discountPercent) : 0
  const mainItems = active ? active.lineItems.filter((li) => li.section === 'main') : []
  const nadRamecItems = active ? active.lineItems.filter((li) => li.section === 'nad_ramec') : []
  const mainTotals = sectionTotals(mainItems, discountPercent)
  const nadRamecTotals = sectionTotals(nadRamecItems, discountPercent)
  const grandSubtotal = mainTotals.subtotal + nadRamecTotals.subtotal
  const grandDiscountAmount = Math.round(grandSubtotal * (discountPercent / 100) * 100) / 100
  const grandTotal = Math.round((grandSubtotal - grandDiscountAmount) * 100) / 100

  const mainHandlers = makeSectionHandlers('main')
  const nadRamecHandlers = makeSectionHandlers('nad_ramec')

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

      {!active || !mainHandlers || !nadRamecHandlers ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-slate-500 text-sm text-center">
          Zatiaľ žiadna cenová alternatíva. Založ prvú tlačidlom „+ Alternatíva".
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Cenová ponuka – alternatíva {active.label}</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-600">
                Zľava (%)
                <input
                  type="number"
                  defaultValue={active.discountPercent}
                  onBlur={(e) => handleDiscountBlur(e.target.value)}
                  className="w-16 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
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

          <section className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Hydroizolačné a zatepľovacie práce</h3>
            <EditableList columns={LINE_ITEM_COLUMNS} items={mainItems} {...mainHandlers} />
            <SectionSummary {...mainTotals} discountPercent={discountPercent} />
          </section>

          <section className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Tesárske a klampiarske práce (nad rámec)</h3>
            <EditableList columns={LINE_ITEM_COLUMNS} items={nadRamecItems} {...nadRamecHandlers} />
            <SectionSummary {...nadRamecTotals} discountPercent={discountPercent} />
          </section>

          <div className="bg-slate-900 text-white rounded-lg p-6 flex justify-end">
            <div className="text-right space-y-1">
              <div className="text-xs text-slate-300">Spolu {grandSubtotal.toFixed(2)} € · Zľava {discountPercent}% (−{grandDiscountAmount.toFixed(2)} €)</div>
              <div className="text-2xl font-semibold">Celkom na úhradu: {grandTotal.toFixed(2)} €</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionSummary({
  subtotal,
  discountAmount,
  totalAfterDiscount,
  discountPercent,
}: {
  subtotal: number
  discountAmount: number
  totalAfterDiscount: number
  discountPercent: number
}) {
  return (
    <div className="flex justify-end pt-2 border-t border-slate-100">
      <div className="text-right text-sm space-y-0.5">
        <div className="text-slate-500">Spolu: {subtotal.toFixed(2)} €</div>
        <div className="text-slate-500">
          Zľava {discountPercent}%: −{discountAmount.toFixed(2)} €
        </div>
        <div className="font-semibold text-slate-900">Celkom na úhradu: {totalAfterDiscount.toFixed(2)} €</div>
      </div>
    </div>
  )
}
