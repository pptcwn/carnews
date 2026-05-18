import { SourceManagementTable } from '@/components/dashboard/source-management-table'
import { getNewsSources } from '@/lib/mock-data'

export const metadata = {
  title: 'Source Management | CarNews Thailand',
  description: 'จัดการแหล่งข่าวสำหรับ Scraping',
}

export default function SourceManagementPage() {
  // TODO: Fetch sources from Supabase
  // TODO: Add auth guard
  const sources = getNewsSources()

  return (
    <div className="p-4 md:p-6">
      <SourceManagementTable sources={sources} />
    </div>
  )
}
