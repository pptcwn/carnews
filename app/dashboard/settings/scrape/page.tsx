import { ScrapeControlPanel } from '@/components/dashboard/scrape-control-panel'
import { getNewsSources, getScrapeRuns } from '@/lib/mock-data'

export const metadata = {
  title: 'Scrape Settings | CarNews Thailand',
  description: 'ตั้งค่าและ Trigger การ Scrape ข่าว',
}

export default function ScrapeSettingsPage() {
  // TODO: Fetch sources and scrape runs from Supabase
  // TODO: Add auth guard
  const sources = getNewsSources()
  const recentRuns = getScrapeRuns()

  return (
    <div className="p-4 md:p-6">
      <ScrapeControlPanel sources={sources} recentRuns={recentRuns} />
    </div>
  )
}
