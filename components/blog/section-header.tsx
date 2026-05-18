import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SectionHeaderProps {
  title: string
  accent?: string
  viewAllHref?: string
}

export function SectionHeader({ title, accent, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight">
        {accent && <span className="text-primary">{accent} </span>}
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          ดูทั้งหมด <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  )
}
