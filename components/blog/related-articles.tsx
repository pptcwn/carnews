import type { MockArticle } from "@/lib/blog-mock-data"
import { PUBLISHED_ARTICLES } from "@/lib/blog-mock-data"
import { BlogNewsCard } from "./blog-news-card"

export function RelatedArticles({ current }: { current: MockArticle }) {
  const related = PUBLISHED_ARTICLES.filter(
    (a) => a.news_id !== current.news_id && (a.brand === current.brand || a.category === current.category)
  ).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="mb-5 text-xl md:text-2xl font-bold tracking-tight">ข่าวที่เกี่ยวข้อง</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((a) => (
          <BlogNewsCard key={a.news_id} a={a} size="sm" />
        ))}
      </div>
    </section>
  )
}
