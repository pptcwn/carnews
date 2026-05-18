// TODO: Convert this preview to Astro app later
// TODO: Query Supabase car_news_rewrites where rewrite_status = published
// TODO: Join car_news for brand/model/category/cover_image_url
// TODO: Add OG/Twitter meta tags in Round 3B
// TODO: Add RSS and sitemap in Round 3B
import type { Metadata } from "next"
import { PUBLISHED_ARTICLES, CATEGORIES } from "@/lib/blog-mock-data"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogNewsGrid } from "@/components/blog/blog-news-grid"
import { BlogNewsCard } from "@/components/blog/blog-news-card"
import { SectionHeader } from "@/components/blog/section-header"
import { BrandChips } from "@/components/blog/brand-chips"
import { NewsletterCTA } from "@/components/blog/newsletter-cta"

export const metadata: Metadata = {
  title: "CarNews Thailand — ข่าวรถยนต์ใหม่ ราคา และรีวิวล่าสุดในไทย",
  description:
    "อัปเดตข่าวรถยนต์ทุกวันจาก CarNews Thailand รวมข่าว Toyota, BYD, Honda, BMW, Mercedes-Benz, Porsche และอีกมากมาย",
}

export default function BlogHomePage() {
  const [hero, ...rest] = PUBLISHED_ARTICLES
  const latest = rest.slice(0, 6)

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10 space-y-12">
      {hero && <BlogHero a={hero} />}

      <section>
        <SectionHeader title="ข่าวล่าสุด" />
        <BlogNewsGrid articles={latest} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">เลือกตามแบรนด์</h2>
        <BrandChips />
      </section>

      {CATEGORIES.filter((c) => ["EV", "SUV", "Sedan", "Pickup"].includes(c)).map((cat) => {
        const items = PUBLISHED_ARTICLES.filter((a) => a.category === cat).slice(0, 3)
        if (items.length === 0) return null
        return (
          <section key={cat}>
            <SectionHeader
              title={`รถ ${cat}`}
              accent="หมวด"
              viewAllHref={`/blog-preview/category/${cat}`}
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <BlogNewsCard key={a.news_id} a={a} />
              ))}
            </div>
          </section>
        )
      })}

      <NewsletterCTA />
    </main>
  )
}
