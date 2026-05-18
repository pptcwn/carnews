import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { MockArticle } from "@/lib/blog-mock-data"
import { formatThaiDate } from "@/lib/blog-mock-data"
import { BrandBadge, CategoryBadge } from "./badges"

export function BlogHero({ a }: { a: MockArticle }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid md:grid-cols-2">
        <Link
          href={`/blog-preview/news/${a.slug}`}
          className="relative block aspect-[16/10] md:aspect-auto md:h-full bg-muted overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.cover_image_url} alt={a.ai_title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent md:hidden" />
        </Link>
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              ● Featured
            </span>
            <BrandBadge brand={a.brand} />
            <CategoryBadge category={a.category} />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight">
            <Link href={`/blog-preview/news/${a.slug}`} className="hover:text-primary transition-colors">
              {a.ai_title}
            </Link>
          </h1>
          <p className="text-base text-muted-foreground line-clamp-3">{a.short_summary}</p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatThaiDate(a.published_date)}
          </div>
          <Link
            href={`/blog-preview/news/${a.slug}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            อ่านข่าวนี้
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
