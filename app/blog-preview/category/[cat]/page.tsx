// TODO: Convert this preview to Astro app later
// TODO: Query Supabase car_news_rewrites where rewrite_status = published
// TODO: Add OG/Twitter meta tags in Round 3B
// TODO: Add real blog search in Round 3B
import type { Metadata } from "next"
import { articlesByCategory } from "@/lib/blog-mock-data"
import { BlogNewsGrid } from "@/components/blog/blog-news-grid"
import { BrandChips } from "@/components/blog/brand-chips"

const DESCRIPTIONS: Record<string, string> = {
  EV: "รวมข่าวรถยนต์ไฟฟ้า (EV) ทุกแบรนด์ในไทย ทั้งสเปคแบตเตอรี่ ระยะวิ่ง การชาร์จ และราคาคาดการณ์",
  SUV: "ข่าว SUV รุ่นใหม่จากทุกค่าย ทั้งรถยนต์น้ำมัน ไฮบริด และ EV ครบในที่เดียว",
  Sedan: "ข่าวรถยนต์ Sedan รุ่นใหม่ ราคาในไทย ออปชั่น และเปรียบเทียบสเปครุ่นยอดนิยม",
  Pickup: "ข่าวรถกระบะรุ่นใหม่ในไทย ทั้ง Toyota Hilux, Isuzu D-Max, Ford Ranger และอื่นๆ",
  Hypercar: "รวมข่าว Hypercar และรถสปอร์ตประสิทธิภาพสูงจากทั่วโลก",
  Coupe: "ข่าวรถยนต์ Coupe สมรรถนะสูง ดีไซน์สปอร์ต พร้อมราคาในไทย",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>
}): Promise<Metadata> {
  const { cat } = await params
  return {
    title: `ข่าวรถ ${cat} ล่าสุด — CarNews Thailand`,
    description: DESCRIPTIONS[cat] ?? `รวมข่าวรถยนต์หมวด ${cat}`,
    openGraph: {
      title: `ข่าวรถ ${cat}`,
      url: `/blog-preview/category/${cat}`,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>
}) {
  const { cat } = await params
  const articles = articlesByCategory(cat)
  const popularBrands = Array.from(new Set(articles.map((a) => a.brand))).slice(0, 6)
  const desc = DESCRIPTIONS[cat] ?? `รวมข่าวรถยนต์หมวด ${cat}`

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10 space-y-8">
      {/* Category Hero */}
      <section className="rounded-2xl border border-border bg-foreground p-6 md:p-12 text-background">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">หมวดหมู่</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">ข่าวรถ {cat}</h1>
        <p className="mt-3 max-w-2xl text-background/80">{desc}</p>
      </section>

      {/* Popular brands in this category */}
      {popularBrands.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">แบรนด์ยอดนิยมในหมวด {cat}</h2>
          <BrandChips />
          <p className="text-xs text-muted-foreground">
            มีบทความจาก: {popularBrands.join(" · ")}
          </p>
        </section>
      )}

      {/* News Grid */}
      <section>
        <h2 className="mb-5 text-xl md:text-2xl font-bold tracking-tight">
          ข่าวล่าสุดในหมวดนี้
        </h2>
        <BlogNewsGrid articles={articles} />
      </section>
    </main>
  )
}
