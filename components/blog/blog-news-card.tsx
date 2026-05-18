import Link from "next/link"
import { Clock } from "lucide-react"
import type { MockArticle } from "@/lib/blog-mock-data"
import { formatThaiDate } from "@/lib/blog-mock-data"
import { BrandBadge, CategoryBadge } from "./badges"

export function BlogNewsCard({ a, size = "md" }: { a: MockArticle; size?: "sm" | "md" | "lg" }) {
  const titleClass =
    size === "lg"
      ? "text-xl md:text-2xl"
      : size === "sm"
        ? "text-base"
        : "text-lg"

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
      <Link
        href={`/blog-preview/news/${a.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.cover_image_url}
          alt={a.ai_title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <BrandBadge brand={a.brand} />
          <CategoryBadge category={a.category} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3
          className={`font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors ${titleClass}`}
        >
          <Link href={`/blog-preview/news/${a.slug}`} className="line-clamp-3">
            {a.ai_title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.short_summary}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {formatThaiDate(a.published_date)}
          <span className="mx-1">·</span>
          <span>{a.source}</span>
        </div>
      </div>
    </article>
  )
}
