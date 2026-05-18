import Link from "next/link"

export function BrandBadge({ brand }: { brand: string }) {
  return (
    <Link
      href={`/blog-preview/brand/${brand}`}
      className="inline-flex items-center rounded-md bg-foreground px-2.5 py-0.5 text-xs font-semibold text-background hover:bg-primary transition-colors"
    >
      {brand}
    </Link>
  )
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <Link
      href={`/blog-preview/category/${category}`}
      className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {category}
    </Link>
  )
}

export function Tag({ tag }: { tag: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors cursor-pointer">
      #{tag}
    </span>
  )
}
