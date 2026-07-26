import type { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { prisma } from '../lib/prisma'

interface ApiRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>
}

interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse
  json(body: unknown): void
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATE_PATH = path.join(__dirname, '../templates/navrh-technickeho-riesenia.docx')

function decimalToComma(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value).replace('.', ',')
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const idParam = req.query.id
  const id = typeof idParam === 'string' ? idParam : undefined
  if (!id) {
    return res.status(400).json({ error: 'Chýba id cenovej alternatívy.' })
  }

  const alternative = await prisma.quoteAlternative.findUnique({
    where: { id },
    include: {
      inspection: { include: { customer: true, roofAreaSections: true } },
      materialComposition: { include: { featuredProduct: true } },
    },
  })

  if (!alternative) {
    return res.status(404).json({ error: 'Cenová alternatíva nebola nájdená.' })
  }

  const { customer, roofAreaSections, areaM2, currentStateDescription } = alternative.inspection
  const composition = alternative.materialComposition

  const areaLines: string[] = []
  if (areaM2 !== null) {
    areaLines.push(`Celková plocha strechy: ${decimalToComma(areaM2)} m².`)
  }
  if (roofAreaSections.length > 0) {
    const parts = roofAreaSections.map(
      (s) => `${s.label} (${decimalToComma(s.widthM)} × ${decimalToComma(s.heightM)} m = ${decimalToComma(s.areaM2)} m²)`,
    )
    areaLines.push(`Čiastkové plochy: ${parts.join(', ')}.`)
  }

  const data = {
    pracovisko: customer.siteAddress || customer.address || '',
    zakaznik_meno: customer.name,
    zakaznik_telefon: customer.phone ?? '',
    zakaznik_adresa: customer.address ?? '',
    alternativa_label: alternative.label,
    alternativa_popis: alternative.description ?? '',
    sucasny_stav: currentStateDescription ?? '',
    vymera_text: areaLines.length > 0 ? areaLines.join('\n') : '',
    skladba_vrstvy: composition ? composition.layersJson.map((polozka) => ({ polozka })) : [],
    postup_prac: composition?.workStepsTemplate ?? '',
    technicky_produkt_nazov: composition?.featuredProduct?.name ?? '',
    technicky_produkt_popis: composition?.featuredProduct?.description ?? '',
    zaruka_roky: alternative.warrantyYears !== null ? String(alternative.warrantyYears) : '',
  }

  const templateBuffer = fs.readFileSync(TEMPLATE_PATH)
  const zip = new PizZip(templateBuffer)
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => '',
  })

  doc.render(data)

  const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' })

  const filename = `Navrh-technickeho-riesenia-${alternative.label}-${alternative.inspection.referenceNumber.replace(/[^a-zA-Z0-9-]/g, '_')}.docx`

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.status(200)
  res.end(outputBuffer)
}
