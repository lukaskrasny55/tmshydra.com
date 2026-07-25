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
    const { itemKey, isChecked, valueText, notes } = req.body || {}
    const data: Record<string, unknown> = {}
    if (itemKey !== undefined) data.itemKey = String(itemKey).trim()
    if (isChecked !== undefined) data.isChecked = Boolean(isChecked)
    if (valueText !== undefined) data.valueText = typeof valueText === 'string' && valueText.trim() ? valueText.trim() : null
    if (notes !== undefined) data.notes = typeof notes === 'string' && notes.trim() ? notes.trim() : null

    try {
      const item = await prisma.technicalSolutionItem.update({ where: { id }, data })
      return res.status(200).json(item)
    } catch {
      return res.status(404).json({ error: 'Záznam nebol nájdený.' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.technicalSolutionItem.delete({ where: { id } })
      return res.status(204).end()
    } catch {
      return res.status(404).json({ error: 'Záznam nebol nájdený.' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
