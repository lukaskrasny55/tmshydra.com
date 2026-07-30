import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchPlan } from '../lib/api'
import type { PlanEvent } from '../types'

type Mode = 'week' | 'month'

const DAY_NAMES = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota']
const MONTH_NAMES = [
  'január', 'február', 'marec', 'apríl', 'máj', 'jún',
  'júl', 'august', 'september', 'október', 'november', 'december',
]

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function startOfWeek(d: Date): Date {
  const date = new Date(d)
  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day
  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)
  return date
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function addDays(d: Date, n: number): Date {
  const date = new Date(d)
  date.setDate(date.getDate() + n)
  return date
}

function rangeForMode(mode: Mode, anchor: Date): { from: Date; to: Date } {
  if (mode === 'week') {
    const from = startOfWeek(anchor)
    return { from, to: addDays(from, 6) }
  }
  return { from: startOfMonth(anchor), to: endOfMonth(anchor) }
}

function formatRangeLabel(mode: Mode, from: Date, to: Date): string {
  if (mode === 'month') {
    return `${MONTH_NAMES[from.getMonth()]} ${from.getFullYear()}`
  }
  const sameMonth = from.getMonth() === to.getMonth()
  const fromLabel = `${from.getDate()}.${sameMonth ? '' : ` ${from.getMonth() + 1}.`}`
  const toLabel = `${to.getDate()}. ${to.getMonth() + 1}. ${to.getFullYear()}`
  return `${fromLabel} – ${toLabel}`
}

export default function PlanPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('week')
  const [anchor, setAnchor] = useState(new Date())
  const [events, setEvents] = useState<PlanEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { from, to } = useMemo(() => rangeForMode(mode, anchor), [mode, anchor])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchPlan({ from: toISODate(from), to: toISODate(to) })
      .then((data) => {
        if (!cancelled) setEvents(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [from, to])

  const days = useMemo(() => {
    const list: Date[] = []
    const cursor = new Date(from)
    while (cursor <= to) {
      list.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    return list
  }, [from, to])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, PlanEvent[]>()
    for (const ev of events) {
      const start = new Date(ev.date)
      const end = ev.endDate ? new Date(ev.endDate) : start
      const cursor = new Date(start)
      cursor.setHours(0, 0, 0, 0)
      const endDay = new Date(end)
      endDay.setHours(0, 0, 0, 0)
      while (cursor <= endDay) {
        const key = toISODate(cursor)
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(ev)
        cursor.setDate(cursor.getDate() + 1)
      }
    }
    return map
  }, [events])

  const summary = useMemo(() => {
    const obhliadky = events.filter((e) => e.type === 'obhliadka').length
    const realizacie = events.filter((e) => e.type === 'realizacia').length
    return { obhliadky, realizacie }
  }, [events])

  function step(delta: number) {
    setAnchor((prev) => (mode === 'week' ? addDays(prev, delta * 7) : new Date(prev.getFullYear(), prev.getMonth() + delta, 1)))
  }

  const todayKey = toISODate(new Date())

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Zoznam zákaziek
          </Link>
        </div>
        <h1 className="text-xl font-semibold text-slate-900">Plán</h1>
        <div className="w-32" />
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('week')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                mode === 'week' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Týždeň
            </button>
            <button
              onClick={() => setMode('month')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                mode === 'month' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Mesiac
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => step(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            >
              ‹
            </button>
            <span className="text-sm font-medium text-slate-700 min-w-[11ch] text-center">
              {formatRangeLabel(mode, from, to)}
            </span>
            <button
              onClick={() => step(1)}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            >
              ›
            </button>
            <button
              onClick={() => setAnchor(new Date())}
              className="ml-1 px-3 py-1.5 rounded-md text-xs font-medium text-brand-600 hover:bg-brand-50"
            >
              Dnes
            </button>
          </div>
        </div>

        <div className="flex gap-3 text-sm">
          <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3">
            <div className="text-2xl font-semibold text-slate-900">{summary.obhliadky}</div>
            <div className="text-slate-500">obhliadok v tomto období</div>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3">
            <div className="text-2xl font-semibold text-slate-900">{summary.realizacie}</div>
            <div className="text-slate-500">realizácií v tomto období</div>
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        {loading ? (
          <div className="text-slate-500 text-sm py-8 text-center">Načítavam…</div>
        ) : (
          <div className="space-y-2">
            {days.map((day) => {
              const key = toISODate(day)
              const dayEvents = eventsByDay.get(key) ?? []
              const isToday = key === todayKey
              return (
                <div
                  key={key}
                  className={`bg-white border rounded-lg overflow-hidden ${isToday ? 'border-brand-400 ring-1 ring-brand-100' : 'border-slate-200'}`}
                >
                  <div className={`px-4 py-2 text-xs font-medium flex items-center justify-between ${isToday ? 'bg-brand-50 text-brand-700' : 'bg-slate-50 text-slate-500'}`}>
                    <span>
                      {DAY_NAMES[day.getDay()]} {day.getDate()}. {day.getMonth() + 1}.
                    </span>
                    {isToday && <span>dnes</span>}
                  </div>
                  {dayEvents.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-400">—</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {dayEvents.map((ev) => (
                        <button
                          key={`${key}-${ev.id}`}
                          onClick={() => navigate(`/inspections/${ev.inspectionId}`)}
                          className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                ev.type === 'obhliadka' ? 'bg-slate-100 text-slate-700' : 'bg-brand-100 text-brand-700'
                              }`}
                            >
                              {ev.type === 'obhliadka' ? 'Obhliadka' : `Realizácia${ev.label ? ` ${ev.label}` : ''}`}
                            </span>
                            <span className="truncate text-sm font-medium text-slate-900">{ev.customerName}</span>
                            <span className="shrink-0 text-xs text-slate-400">{ev.referenceNumber}</span>
                          </div>
                          {ev.technicianName && (
                            <span className="shrink-0 text-xs text-slate-500">{ev.technicianName}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
