'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, X } from "lucide-react"

const NAV = [
  { href: "/blog-preview", label: "หน้าแรก", exact: true },
  { href: "/blog-preview/brand/Toyota", label: "แบรนด์" },
  { href: "/blog-preview/category/EV", label: "EV" },
  { href: "/blog-preview/category/SUV", label: "SUV" },
  { href: "/blog-preview/category/Sedan", label: "Sedan" },
  { href: "/blog-preview/category/Pickup", label: "Pickup" },
]

export function BlogNavbar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16">
        <Link href="/blog-preview" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm">
            CN
          </span>
          <span className="text-base md:text-lg">
            CarNews <span className="text-primary">Thailand</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted ${
                isActive(n.href, n.exact)
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearch(true)}
            aria-label="ค้นหา"
            className="grid h-10 w-10 place-items-center rounded-md hover:bg-muted text-foreground/80"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="เมนู"
            className="md:hidden grid h-10 w-10 place-items-center rounded-md hover:bg-muted"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-6xl flex-col px-2 py-2">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-base font-medium hover:bg-muted ${
                  isActive(n.href, n.exact) ? "text-primary" : "text-foreground/90"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {search && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur p-4"
          onClick={() => setSearch(false)}
        >
          <div className="mx-auto max-w-2xl pt-20" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="ค้นหาข่าวรถยนต์ แบรนด์ หรือรุ่น..."
                className="flex-1 bg-transparent outline-none text-base"
              />
              <button
                onClick={() => setSearch(false)}
                aria-label="ปิด"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* TODO: Add real blog search in Round 3B */}
            <p className="mt-3 text-xs text-muted-foreground">
              กด ESC หรือคลิกพื้นที่ว่างเพื่อปิด · ระบบค้นหาจริงจะเปิดใช้ใน Round 3B
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
