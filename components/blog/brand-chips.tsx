import Link from "next/link"

const BRANDS = ["Toyota", "BYD", "Honda", "Mazda", "BMW", "Mercedes-Benz", "Porsche", "Mitsubishi"]
const CATS = ["EV", "SUV", "Sedan", "Pickup", "Hypercar", "Coupe"]

export function BrandChips({ active }: { active?: string }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
      <div className="flex gap-2 pb-1 min-w-max">
        {BRANDS.map((b) => {
          const isActive = active?.toLowerCase() === b.toLowerCase()
          return (
            <Link
              key={b}
              href={`/blog-preview/brand/${b}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:text-primary"
              }`}
            >
              {b}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function CategoryChips({ active }: { active?: string }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
      <div className="flex gap-2 pb-1 min-w-max">
        {CATS.map((c) => {
          const isActive = active?.toLowerCase() === c.toLowerCase()
          return (
            <Link
              key={c}
              href={`/blog-preview/category/${c}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
