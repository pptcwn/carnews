import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface CategoryBadgeProps {
  category: Category
  className?: string
}

const categoryConfig: Record<Category, { className: string }> = {
  EV: {
    className: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  },
  SUV: {
    className: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  },
  Sedan: {
    className: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
  },
  Pickup: {
    className: 'bg-chart-5/20 text-chart-5 border-chart-5/30',
  },
  Hypercar: {
    className: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  },
  Coupe: {
    className: 'bg-primary/20 text-primary border-primary/30',
  },
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = categoryConfig[category]
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {category}
    </span>
  )
}
