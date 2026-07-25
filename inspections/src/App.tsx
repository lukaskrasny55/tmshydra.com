import { Route, Routes } from 'react-router-dom'
import InspectionsListPage from './pages/InspectionsListPage'
import InspectionDetailPage from './pages/InspectionDetailPage'
import CompanySettingsPage from './pages/CompanySettingsPage'
import PriceListPage from './pages/PriceListPage'
import TechniciansPage from './pages/TechniciansPage'
import MaterialCompositionsPage from './pages/MaterialCompositionsPage'
import MaterialProductsPage from './pages/MaterialProductsPage'
import DocumentTemplatesPage from './pages/DocumentTemplatesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InspectionsListPage />} />
      <Route path="/inspections/:id" element={<InspectionDetailPage />} />
      <Route path="/settings/company" element={<CompanySettingsPage />} />
      <Route path="/settings/price-list" element={<PriceListPage />} />
      <Route path="/settings/technicians" element={<TechniciansPage />} />
      <Route path="/settings/material-compositions" element={<MaterialCompositionsPage />} />
      <Route path="/settings/material-products" element={<MaterialProductsPage />} />
      <Route path="/settings/document-templates" element={<DocumentTemplatesPage />} />
    </Routes>
  )
}
