export type InspectionStatus = 'draft' | 'ready_for_quote' | 'sent' | 'archived'

export const STATUS_LABELS: Record<InspectionStatus, string> = {
  draft: 'Rozpracované',
  ready_for_quote: 'Pripravené na odoslanie',
  sent: 'Odoslané',
  archived: 'Archivované',
}

export interface Customer {
  id: string
  name: string
  address: string | null
  siteAddress: string | null
  phone: string | null
  email: string | null
  buildingAdmin: string | null
}

export interface CompanySettings {
  id: string
  ico: string | null
  dic: string | null
  iban: string | null
  bic: string | null
  address: string | null
  email: string | null
  phone: string | null
  logoUrl: string | null
}

export type PriceCategory = 'material' | 'prace'

export interface PriceListItem {
  id: string
  itemKey: string
  unit: string
  unitPrice: string
  category: PriceCategory
  validFrom: string
}

export interface RoofEdge {
  id: string
  label: string
  lengthM: string
  atikaHeightCm: string | null
}

export interface RoofAreaSection {
  id: string
  label: string
  widthM: string
  heightM: string
  areaM2: string
}

export interface TechnicalSolutionItem {
  id: string
  itemKey: string
  isChecked: boolean
  valueText: string | null
  notes: string | null
}

export interface DrainDownspout {
  id: string
  label: string
  lengthM: string
}

export interface GutterSystemItem {
  id: string
  itemType: string
  quantity: string
  unit: string
}

export interface AdditionalService {
  id: string
  description: string
  photoUrl: string | null
}

export interface Technician {
  id: string
  name: string
  email: string | null
}

export interface MaterialProduct {
  id: string
  name: string
  description: string
}

export interface MaterialComposition {
  id: string
  name: string
  layersJson: string[]
  workStepsTemplate: string | null
  warrantyYears: number | null
  featuredProductId: string | null
  featuredProduct: MaterialProduct | null
}

export interface DocumentTemplate {
  id: string
  key: string
  title: string
  content: string
}

export interface InspectionPhoto {
  id: string
  url: string
  caption: string | null
}

export interface InspectionSketch {
  id: string
  fileUrl: string | null
  sketchJson: unknown
}

export type LineItemSection = 'main' | 'nad_ramec'
export type LineItemSource = 'auto_calculated' | 'manual'

export interface QuoteLineItem {
  id: string
  description: string
  plannedQty: string | null
  previousQty: string | null
  actualQty: string | null
  wastePercent: string | null
  unit: string
  unitPriceSnapshot: string
  total: string
  section: LineItemSection
  source: LineItemSource
}

export interface QuoteAlternative {
  id: string
  label: string
  description: string | null
  discountPercent: string
  totalPrice: string | null
  issuedDate: string | null
  validUntil: string | null
  warrantyYears: number | null
  materialCompositionId: string | null
  materialComposition: MaterialComposition | null
  lineItems: QuoteLineItem[]
}

export interface InspectionListItem {
  id: string
  referenceNumber: string
  status: InspectionStatus
  inspectionDate: string | null
  areaM2: string | null
  createdAt: string
  updatedAt: string
  customer: Customer
}

export interface InspectionDetail extends InspectionListItem {
  currentStateDescription: string | null
  isInsulated: boolean | null
  technicianId: string | null
  technician: Technician | null
  photos: InspectionPhoto[]
  sketch: InspectionSketch | null
  roofEdges: RoofEdge[]
  roofAreaSections: RoofAreaSection[]
  technicalSolutionItems: TechnicalSolutionItem[]
  drainDownspouts: DrainDownspout[]
  gutterSystemItems: GutterSystemItem[]
  additionalServices: AdditionalService[]
  quoteAlternatives: QuoteAlternative[]
}
