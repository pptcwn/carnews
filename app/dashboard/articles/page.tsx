import { ArticlesDataTable } from '@/components/dashboard/articles-data-table'
import { mockCarNews } from '@/lib/mock-data'

export const metadata = {
  title: 'Articles | CarNews Thailand',
  description: 'จัดการบทความข่าวรถยนต์',
}

export default function ArticlesPage() {
  // TODO: Fetch articles from Supabase
  // TODO: Add auth guard
  const articles = mockCarNews

  return (
    <div className="p-4 md:p-6">
      <ArticlesDataTable articles={articles} />
    </div>
  )
}
