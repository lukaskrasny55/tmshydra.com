import type { IncomingMessage, ServerResponse } from 'http'
import { prisma } from '../lib/prisma.js'

interface ApiRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>
  body: any
}

interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse
  json(body: unknown): void
}

// Receives leads from tmshydra.com (kalkulačka, kontaktný formulár,
// rezervačný kalendár) via api/send-email.js's best-effort forward, so they
// show up here without anyone retyping them by hand.
//
// Auth: shared-secret bearer token checked in middleware.ts (see the
// '/api/web-inquiry' branch there) — this is a server-to-server call from
// tmshydra.com, no browser session/cookie exists for it.
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, address, message, date, time, source } = req.body || {}

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Meno je povinné.' })
  }

  const trimmedName = name.trim()
  const trimmedEmail = typeof email === 'string' ? email.trim() : ''
  const trimmedPhone = typeof phone === 'string' && phone.trim() ? phone.trim() : null
  const trimmedAddress = typeof address === 'string' && address.trim() ? address.trim() : null
  const trimmedMessage = typeof message === 'string' && message.trim() ? message.trim() : null
  const isBooking = typeof date === 'string' && date.trim().length > 0

  const webInquiry = await prisma.webInquiry.create({
    data: {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      address: trimmedAddress,
      message: trimmedMessage,
      source: typeof source === 'string' && source.trim() ? source.trim() : (isBooking ? 'booking' : 'web'),
    },
  })

  if (!isBooking) {
    // No preferred date was given — surface it as a same-day reminder in the
    // planner instead of leaving it invisible until someone thinks to check
    // for new web inquiries separately.
    await prisma.calendarEvent.create({
      data: {
        title: `Nový dopyt z webu: ${trimmedName}`,
        date: new Date(),
        notes: [
          trimmedPhone ? `Tel: ${trimmedPhone}` : null,
          trimmedEmail ? `Email: ${trimmedEmail}` : null,
          trimmedMessage ? `Správa: ${trimmedMessage}` : null,
        ]
          .filter(Boolean)
          .join('\n') || null,
      },
    })
    return res.status(201).json({ webInquiryId: webInquiry.id })
  }

  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(201).json({ webInquiryId: webInquiry.id, warning: 'Invalid date, inspection not created.' })
  }

  const customer = await prisma.customer.create({
    data: {
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail || null,
      address: trimmedAddress,
      siteAddress: trimmedAddress,
    },
  })

  const year = new Date().getFullYear()
  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year + 1, 0, 1)
  const countThisYear = await prisma.inspection.count({
    where: { createdAt: { gte: yearStart, lt: yearEnd } },
  })
  const referenceNumber = `OBH-${String(countThisYear + 1).padStart(3, '0')}/${year}`

  const inspection = await prisma.inspection.create({
    data: {
      customerId: customer.id,
      webInquiryId: webInquiry.id,
      referenceNumber,
      status: 'draft',
      inspectionDate: parsedDate,
      inspectionTime: typeof time === 'string' && time.trim() ? time.trim() : null,
      currentStateDescription: trimmedMessage,
    },
    include: { customer: true },
  })

  return res.status(201).json({ webInquiryId: webInquiry.id, inspectionId: inspection.id })
}
