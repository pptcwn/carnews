import { cn } from '@/lib/utils'
import type { NewsStatus, LogStatus, RewriteStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: NewsStatus | LogStatus | RewriteStatus
  className?: string
}

const statusConfig: Record<NewsStatus | LogStatus | RewriteStatus, { label: string; className: string }> = {
  raw: {
    label: 'Raw',
    className: 'bg-muted text-muted-foreground',
  },
  rewritten: {
    label: 'Rewritten',
    className: 'bg-info/20 text-info',
  },
  review: {
    label: 'Review',
    className: 'bg-warning/20 text-warning-foreground',
  },
  published: {
    label: 'Published',
    className: 'bg-success/20 text-success',
  },
  success: {
    label: 'Success',
    className: 'bg-success/20 text-success',
  },
  error: {
    label: 'Error',
    className: 'bg-destructive/20 text-destructive',
  },
  warning: {
    label: 'Warning',
    className: 'bg-warning/20 text-warning-foreground',
  },
  duplicate: {
    label: 'Duplicate',
    className: 'bg-muted text-muted-foreground',
  },
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
