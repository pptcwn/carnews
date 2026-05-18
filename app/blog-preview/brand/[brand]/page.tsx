// TODO: Convert this preview to Astro app later
// TODO: Query Supabase car_news_rewrites where rewrite_status = published
// TODO: Add OG/Twitter meta tags in Round 3B
import type { Metadata } from "next"
import { articlesByBrand, formatThaiDate } from "@/lib/blog-mock-data"
import { BlogNewsGrid } from "@/components/blog/blog-news-grid"
import { CategoryChips } from "@/components/blog/brand-chips"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand } = await params
  return {
    title: `ข่าวรถยนต์ ${brand} — CarNews Thailand`,
    description: `รวมข่าวรถยนต์ ${brand} ทุกรุ่น ราคาในไทย สเปค และวันเปิดตัวล่าสุด`,
    openGraph: {
      title: `ข่าว ${brand} ล่าสุด`,
      url: `/blog-preview/brand/${brand}`,
    },
  }
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params
  const articles = articlesByBrand(brand)
  const latest = articles[0]
  const popularCat = mostCommon(articles.map((a) => a.category))

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10 space-y-8">
      {/* Brand Hero */}
      <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">แบรนด์</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          ข่าวรถยนต์ {brand}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          รวมข่าวรถยนต์ {brand} ทุกรุ่น ราคาในไทย สเปค ออปชั่น และวันเปิดตัวล่าสุด อัปเดตโดยทีมบรรณาธิการ
          CarNews Thailand
        </p>
        {/* Brand Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 md:max-w-lg">
          <Stat label="ข่าวที่เผยแพร่" value={String(articles.length)} />
          <Stat
            label="อัปเดตล่าสุด"
            value={latest ? formatThaiDate(latest.published_date) : "—"}
          />
          <Stat label="หมวดยอดนิยม" value={popularCat ?? "—"} />
        </div>
      </section>

      {/* SEO description block */}
      <section className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          CarNews Thailand รวบรวมข่าว{brand}ทุกรุ่นจากแหล่งที่เชื่อถือได้
          ครอบคลุมทั้งการเปิดตัวรุ่นใหม่ การปรับโฉม ราคาในตลาดไทย และสเปคเทคนิคครบถ้วน
          อัปเดตเนื้อหาทุกวันโดยทีมบรรณาธิการมืออาชีพ
        </p>
      </section>

      {/* Category Chips */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">หมวดหมู่</h2>
        <CategoryChips />
      </section>

      {/* News Grid */}
      <section>
        <h2 className="mb-5 text-xl md:text-2xl font-bold tracking-tight">
          ข่าว {brand} ทั้งหมด
        </h2>
        <BlogNewsGrid articles={articles} />
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold truncate">{value}</p>
    </div>
  )
}

function mostCommon<T extends string>(arr: T[]): T | null {
  if (!arr.length) return null
  const counts = new Map<T, number>()
  arr.forEach((x) => counts.set(x, (counts.get(x) ?? 0) + 1))
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
}
