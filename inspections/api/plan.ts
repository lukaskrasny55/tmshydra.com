import type { IncomingMessage, ServerResponse } from 'http'
import { prisma } from '../lib/prisma'

interface ApiRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>
}

interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse
  json(body: unknown): void
}

export interface PlanEvent {
  id: string
  type: 'obhliadka' | 'realizacia'
  date: string
  endDate: string | null
  inspectionId: string
  referenceNumber: string
  customerName: string
  technicianName: string | null
  label: string | null
}

function param(value: string | string[] | undefined): string | undefined {
  return typeof value === 'string' ? value : undefined
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const from = param(req.query.from)
  const to = param(req.query.to)
  const range = from && to ? { gte: new Date(from), lte: new Date(`${to}T23:59:59`) } : undefined

  const inspectionsWithVisit = await prisma.inspection.findMany({
    where: range ? { inspectionDate: range } : { inspectionDate: { not: null } },
    include: { customer: true, technician: true },
  })

  const alternativesWithRealization = await prisma.quoteAlternative.findMany({
    where: range
      ? {
          OR: [{ realizationStartDate: range }, { realizationEndDate: range }],
        }
      : { realizationStartDate: { not: null } },
    include: { inspection: { include: { customer: true, technician: true } } },
  })

  const events: PlanEvent[] = []

  for (const insp of inspectionsWithVisit) {
    if (!insp.inspectionDate) continue
    events.push({
      id: `obhliadka-${insp.id}`,
      type: 'obhliadka',
      date: insp.inspectionDate.toISOString(),
      endDate: null,
      inspectionId: insp.id,
      referenceNumber: insp.referenceNumber,
      customerName: insp.customer.name,
      technicianName: insp.technician?.name ?? null,
      label: null,
    })
  }

  for (const alt of alternativesWithRealization) {
    if (!alt.realizationStartDate) continue
    events.push({
      id: `realizacia-${alt.id}`,
      type: 'realizacia',
      date: alt.realizationStartDate.toISOString(),
      endDate: alt.realizationEndDate ? alt.realizationEndDate.toISOString() : null,
      inspectionId: alt.inspection.id,
      referenceNumber: alt.inspection.referenceNumber,
      customerName: alt.inspection.customer.name,
      technicianName: alt.inspection.technician?.name ?? null,
      label: alt.label,
    })
  }

  events.sort((a, b) => a.date.localeCompare(b.date))

  return res.status(200).json(events)
}
