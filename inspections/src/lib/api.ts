import type {
  AdditionalService,
  CompanySettings,
  Customer,
  DocumentTemplate,
  DrainDownspout,
  GutterSystemItem,
  InspectionDetail,
  InspectionListItem,
  InspectionPhoto,
  InspectionSketch,
  InspectionStatus,
  MaterialComposition,
  MaterialProduct,
  PriceListItem,
  QuoteAlternative,
  QuoteLineItem,
  RoofAreaSection,
  RoofEdge,
  TechnicalSolutionItem,
  Technician,
} from '../types'

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error(errBody.error || 'Nepodarilo sa uložiť záznam.')
  }
  return (await res.json()) as T
}

async function patchJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error(errBody.error || 'Nepodarilo sa uložiť zmeny.')
  }
  return (await res.json()) as T
}

async function deleteRequest(url: string): Promise<void> {
  const res = await fetch(url, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error(errBody.error || 'Nepodarilo sa vymazať záznam.')
  }
}

export async function fetchInspections(params: { status?: InspectionStatus; q?: string } = {}) {
  const search = new URLSearchParams()
  if (params.status) search.set('status', params.status)
  if (params.q) search.set('q', params.q)
  const res = await fetch(`/api/inspections?${search.toString()}`)
  if (!res.ok) throw new Error('Nepodarilo sa načítať zákazky.')
  return (await res.json()) as InspectionListItem[]
}

export async function fetchInspection(id: string) {
  const res = await fetch(`/api/inspections/${id}`)
  if (!res.ok) throw new Error('Nepodarilo sa načítať obhliadku.')
  return (await res.json()) as InspectionDetail
}

export async function createInspection(data: {
  customerName: string
  customerPhone?: string
  customerEmail?: string
  customerAddress?: string
}) {
  const res = await fetch('/api/inspections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Nepodarilo sa vytvoriť zákazku.')
  }
  return (await res.json()) as InspectionListItem
}

export async function updateCustomer(id: string, data: Partial<Pick<Customer, 'name' | 'address' | 'siteAddress' | 'phone' | 'email' | 'buildingAdmin'>>) {
  return patchJSON<Customer>(`/api/customers/${id}`, data)
}

export async function updateInspection(
  id: string,
  data: Partial<{
    areaM2: number | null
    isInsulated: boolean | null
    currentStateDescription: string | null
    inspectionDate: string | null
    status: InspectionStatus
    technicianId: string | null
  }>,
) {
  return patchJSON<InspectionListItem>(`/api/inspections/${id}`, data)
}

export async function createRoofEdge(data: { inspectionId: string; label?: string; lengthM: number; atikaHeightCm?: number | null }) {
  return postJSON<RoofEdge>('/api/roof-edges', data)
}
export async function updateRoofEdge(id: string, data: Partial<{ label: string; lengthM: number; atikaHeightCm: number | null }>) {
  return patchJSON<RoofEdge>(`/api/roof-edges/${id}`, data)
}
export async function deleteRoofEdge(id: string) {
  return deleteRequest(`/api/roof-edges/${id}`)
}

export async function createGutterSystemItem(data: { inspectionId: string; itemType: string; quantity: number; unit?: string }) {
  return postJSON<GutterSystemItem>('/api/gutter-system-items', data)
}
export async function updateGutterSystemItem(id: string, data: Partial<{ itemType: string; quantity: number; unit: string }>) {
  return patchJSON<GutterSystemItem>(`/api/gutter-system-items/${id}`, data)
}
export async function deleteGutterSystemItem(id: string) {
  return deleteRequest(`/api/gutter-system-items/${id}`)
}

export async function createDrainDownspout(data: { inspectionId: string; label?: string; lengthM: number }) {
  return postJSON<DrainDownspout>('/api/drain-downspouts', data)
}
export async function updateDrainDownspout(id: string, data: Partial<{ label: string; lengthM: number }>) {
  return patchJSON<DrainDownspout>(`/api/drain-downspouts/${id}`, data)
}
export async function deleteDrainDownspout(id: string) {
  return deleteRequest(`/api/drain-downspouts/${id}`)
}

export async function createTechnicalSolutionItem(data: { inspectionId: string; itemKey: string; isChecked?: boolean; valueText?: string; notes?: string }) {
  return postJSON<TechnicalSolutionItem>('/api/technical-solution-items', data)
}
export async function updateTechnicalSolutionItem(id: string, data: Partial<{ itemKey: string; isChecked: boolean; valueText: string | null; notes: string | null }>) {
  return patchJSON<TechnicalSolutionItem>(`/api/technical-solution-items/${id}`, data)
}
export async function deleteTechnicalSolutionItem(id: string) {
  return deleteRequest(`/api/technical-solution-items/${id}`)
}

export async function createQuoteAlternative(data: { inspectionId: string; label: string }) {
  return postJSON<QuoteAlternative>('/api/quote-alternatives', data)
}
export async function deleteQuoteAlternative(id: string) {
  return deleteRequest(`/api/quote-alternatives/${id}`)
}
export async function updateQuoteAlternative(
  id: string,
  data: Partial<{
    label: string
    discountPercent: number
    description: string | null
    issuedDate: string | null
    validUntil: string | null
    warrantyYears: number | null
    materialCompositionId: string | null
  }>,
) {
  return patchJSON<QuoteAlternative>(`/api/quote-alternatives/${id}`, data)
}

export async function createQuoteLineItem(data: {
  quoteAlternativeId: string
  description: string
  plannedQty?: number
  unitPriceSnapshot?: number
  wastePercent?: number
  unit?: string
  section?: 'main' | 'nad_ramec'
  source?: 'auto_calculated' | 'manual'
}) {
  return postJSON<QuoteLineItem>('/api/quote-line-items', data)
}
export async function updateQuoteLineItem(
  id: string,
  data: Partial<{ description: string; plannedQty: number; unitPriceSnapshot: number; wastePercent: number; unit: string; section: 'main' | 'nad_ramec'; total: number }>,
) {
  return patchJSON<QuoteLineItem>(`/api/quote-line-items/${id}`, data)
}
export async function deleteQuoteLineItem(id: string) {
  return deleteRequest(`/api/quote-line-items/${id}`)
}

export async function createInspectionPhoto(data: { inspectionId: string; url: string; caption?: string }) {
  return postJSON<InspectionPhoto>('/api/inspection-photos', data)
}
export async function updateInspectionPhoto(id: string, data: { caption: string | null }) {
  return patchJSON<InspectionPhoto>(`/api/inspection-photos/${id}`, data)
}
export async function deleteInspectionPhoto(id: string) {
  return deleteRequest(`/api/inspection-photos/${id}`)
}

export async function saveInspectionSketch(data: { inspectionId: string; fileUrl: string }) {
  return postJSON<InspectionSketch>('/api/inspection-sketch', data)
}
export async function deleteInspectionSketch(inspectionId: string) {
  return deleteRequest(`/api/inspection-sketch?inspectionId=${inspectionId}`)
}

export async function createRoofAreaSection(data: { inspectionId: string; label?: string; widthM: number; heightM: number }) {
  return postJSON<RoofAreaSection>('/api/roof-area-sections', data)
}
export async function updateRoofAreaSection(id: string, data: Partial<{ label: string; widthM: number; heightM: number }>) {
  return patchJSON<RoofAreaSection>(`/api/roof-area-sections/${id}`, data)
}
export async function deleteRoofAreaSection(id: string) {
  return deleteRequest(`/api/roof-area-sections/${id}`)
}

export async function createAdditionalService(data: { inspectionId: string; description: string; photoUrl?: string }) {
  return postJSON<AdditionalService>('/api/additional-services', data)
}
export async function updateAdditionalService(id: string, data: Partial<{ description: string; photoUrl: string | null }>) {
  return patchJSON<AdditionalService>(`/api/additional-services/${id}`, data)
}
export async function deleteAdditionalService(id: string) {
  return deleteRequest(`/api/additional-services/${id}`)
}

export async function fetchCompanySettings() {
  const res = await fetch('/api/company-settings')
  if (!res.ok) throw new Error('Nepodarilo sa načítať firemné údaje.')
  return (await res.json()) as CompanySettings | null
}
export async function updateCompanySettings(data: Partial<Omit<CompanySettings, 'id'>>) {
  return patchJSON<CompanySettings>('/api/company-settings', data)
}

export async function fetchPriceList() {
  const res = await fetch('/api/price-list')
  if (!res.ok) throw new Error('Nepodarilo sa načítať cenník.')
  return (await res.json()) as PriceListItem[]
}
export async function createPriceListItem(data: { itemKey: string; unit?: string; unitPrice: number; category: 'material' | 'prace'; validFrom?: string }) {
  return postJSON<PriceListItem>('/api/price-list', data)
}
export async function updatePriceListItem(id: string, data: Partial<{ itemKey: string; unit: string; unitPrice: number; category: 'material' | 'prace'; validFrom: string }>) {
  return patchJSON<PriceListItem>(`/api/price-list/${id}`, data)
}
export async function deletePriceListItem(id: string) {
  return deleteRequest(`/api/price-list/${id}`)
}

export async function fetchTechnicians() {
  const res = await fetch('/api/technicians')
  if (!res.ok) throw new Error('Nepodarilo sa načítať technikov.')
  return (await res.json()) as Technician[]
}
export async function createTechnician(data: { name: string; email?: string }) {
  return postJSON<Technician>('/api/technicians', data)
}
export async function updateTechnician(id: string, data: Partial<{ name: string; email: string | null }>) {
  return patchJSON<Technician>(`/api/technicians/${id}`, data)
}
export async function deleteTechnician(id: string) {
  return deleteRequest(`/api/technicians/${id}`)
}

export async function fetchMaterialCompositions() {
  const res = await fetch('/api/material-compositions')
  if (!res.ok) throw new Error('Nepodarilo sa načítať skladby.')
  return (await res.json()) as MaterialComposition[]
}
export async function createMaterialComposition(data: { name: string; layers?: string[]; workStepsTemplate?: string; warrantyYears?: number | null }) {
  return postJSON<MaterialComposition>('/api/material-compositions', data)
}
export async function updateMaterialComposition(
  id: string,
  data: Partial<{ name: string; layers: string[]; workStepsTemplate: string | null; warrantyYears: number | null; featuredProductId: string | null }>,
) {
  return patchJSON<MaterialComposition>(`/api/material-compositions/${id}`, data)
}
export async function deleteMaterialComposition(id: string) {
  return deleteRequest(`/api/material-compositions/${id}`)
}

export async function fetchMaterialProducts() {
  const res = await fetch('/api/material-products')
  if (!res.ok) throw new Error('Nepodarilo sa načítať produkty.')
  return (await res.json()) as MaterialProduct[]
}
export async function createMaterialProduct(data: { name: string; description: string }) {
  return postJSON<MaterialProduct>('/api/material-products', data)
}
export async function updateMaterialProduct(id: string, data: Partial<{ name: string; description: string }>) {
  return patchJSON<MaterialProduct>(`/api/material-products/${id}`, data)
}
export async function deleteMaterialProduct(id: string) {
  return deleteRequest(`/api/material-products/${id}`)
}

export async function fetchDocumentTemplates() {
  const res = await fetch('/api/document-templates')
  if (!res.ok) throw new Error('Nepodarilo sa načítať šablóny.')
  return (await res.json()) as DocumentTemplate[]
}
export async function createDocumentTemplate(data: { key: string; title: string; content?: string }) {
  return postJSON<DocumentTemplate>('/api/document-templates', data)
}
export async function updateDocumentTemplate(id: string, data: Partial<{ key: string; title: string; content: string }>) {
  return patchJSON<DocumentTemplate>(`/api/document-templates/${id}`, data)
}
export async function deleteDocumentTemplate(id: string) {
  return deleteRequest(`/api/document-templates/${id}`)
}
