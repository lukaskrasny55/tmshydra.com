import type { IncomingMessage, ServerResponse } from 'http'
import { prisma } from '../../lib/prisma'

interface ApiRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>
  body: any
}

interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse
  json(body: unknown): void
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const idParam = req.query.id
  const id = typeof idParam === 'string' ? idParam : undefined
  if (!id) return res.status(400).json({ error: 'Chýba id.' })

  if (req.method === 'PATCH') {
    const { label, discountPercent } = req.body || {}
    const data: Record<string, unknown> = {}
    if (label !== undefined) data.label = String(label).trim()
    if (discountPercent !== undefined) {
      const percent = Number(discountPercent)
      if (Number.isNaN(percent)) return res.status(400).json({ error: 'Zľava musí byť číslo.' })
      data.discountPercent = percent
    }

    try {
      const alternative = await prisma.quoteAlternative.update({ where: { id }, data })
      return res.status(200).json(alternative)
    } catch {
      return res.status(404).json({ error: 'Alternatíva nebola nájdená.' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.quoteAlternative.delete({ where: { id } })
      return res.status(204).end()
    } catch {
      return res.status(404).json({ error: 'Alternatíva nebola nájdená.' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
