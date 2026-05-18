import { BrandModelManager } from '@/components/dashboard/brand-model-manager'
import { getBrands, mockModels } from '@/lib/mock-data'

export const metadata = {
  title: 'Brands & Models | CarNews Thailand',
  description: 'จัดการแบรนด์และรุ่นรถยนต์',
}

export default function BrandsPage() {
  // TODO: Fetch brands and models from Supabase
  // TODO: Add auth guard
  const brands = getBrands()
  const models = mockModels

  return (
    <div className="p-4 md:p-6">
      <BrandModelManager brands={brands} models={models} />
    </div>
  )
}
