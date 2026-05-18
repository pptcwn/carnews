// TODO: Convert this preview to Astro app later
// TODO: Query Supabase car_news_rewrites where rewrite_status = published
// TODO: Join car_news for brand/model/category/cover_image_url
// TODO: Redirect draft/review articles to 404
// TODO: Add JSON-LD NewsArticle in Round 3B
// TODO: Add OG/Twitter meta tags in Round 3B
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import {
  findArticleBySlug,
  buildArticleBody,
  formatThaiDate,
} from "@/lib/blog-mock-data"
import { BrandBadge, CategoryBadge, Tag } from "@/components/blog/badges"
import { BlogShareButtons } from "@/components/blog/blog-share-buttons"
import { RelatedArticles } from "@/components/blog/related-articles"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const a = findArticleBySlug(slug)
  if (!a || a.rewrite_status !== "published") {
    return { title: "ไม่พบบทความ — CarNews Thailand" }
  }
  return {
    title: a.seo_title,
    description: a.seo_description,
    openGraph: {
      title: a.seo_title,
      description: a.seo_description,
      images: [a.cover_image_url],
      url: `/blog-preview/news/${a.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const a = findArticleBySlug(slug)

  // Draft/review articles must not be accessible on public pages
  if (!a || a.rewrite_status !== "published") {
    notFound()
  }

  const body = buildArticleBody(a)
  const url = `https://carnews.th/blog-preview/news/${a.slug}`

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      <Link
        href="/blog-preview"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> กลับสู่หน้าหลัก
      </Link>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <BrandBadge brand={a.brand} />
        <span className="text-xs text-muted-foreground">{a.model}</span>
        <CategoryBadge category={a.category} />
      </div>

      <h1 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight">
        {a.ai_title}
      </h1>
      <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
        {a.short_summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground border-y border-border py-3">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> {formatThaiDate(a.published_date)}
        </span>
        <span>
          โดย <span className="font-medium text-foreground">CarNews Thailand Editorial</span>
        </span>
        <a
          href={a.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline ml-auto"
        >
          ที่มา: {a.source} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.cover_image_url}
          alt={a.ai_title}
          className="w-full rounded-xl border border-border object-cover aspect-[16/9]"
        />
        <figcaption className="mt-2 text-xs text-muted-foreground text-center">
          ภาพ: {a.source}
        </figcaption>
      </figure>

      <div className="my-6">
        <BlogShareButtons url={url} title={a.ai_title} />
      </div>

      <div className="prose-article" dangerouslySetInnerHTML={{ __html: body }} />

      {a.gallery_images.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">ภาพประกอบ</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {a.gallery_images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${a.ai_title} ${i + 1}`}
                className="aspect-square w-full rounded-lg border border-border object-cover hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          แท็ก
        </h2>
        <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
          <div className="flex gap-2 min-w-max pb-1">
            {a.tags.map((t) => (
              <Tag key={t} tag={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-5">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
          CN
        </div>
        <div>
          <p className="font-semibold">CarNews Thailand Editorial</p>
          <p className="text-sm text-muted-foreground">
            ทีมบรรณาธิการข่าวรถยนต์ของ CarNews Thailand รายงานข่าวอัปเดตประจำวัน
          </p>
        </div>
      </section>

      {/* SEO/OG Preview reference card */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          SEO / OG Preview (Reference)
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.cover_image_url} alt="" className="aspect-[1.91/1] w-full object-cover" />
          <div className="p-4">
            <p className="text-xs uppercase text-muted-foreground">carnews.th</p>
            <p className="mt-1 font-semibold leading-snug line-clamp-2">{a.seo_title}</p>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.seo_description}</p>
            <p className="mt-2 text-xs text-muted-foreground break-all">Canonical: {url}</p>
          </div>
        </div>
      </section>

      <RelatedArticles current={a} />
    </main>
  )
}
