import type { MockArticle } from "@/lib/blog-mock-data"
import { BlogNewsCard } from "./blog-news-card"

export function BlogNewsGrid({ articles }: { articles: MockArticle[] }) {
  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center text-muted-foreground">
        ยังไม่มีข่าวในหมวดนี้
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <BlogNewsCard key={a.news_id} a={a} />
      ))}
    </div>
  )
}
