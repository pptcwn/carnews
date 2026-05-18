import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: number | string
  change?: number
  description?: string
  icon: React.ReactNode
  className?: string
}

export function KpiCard({
  title,
  value,
  change,
  description,
  icon,
  className,
}: KpiCardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="size-3" />
    }
    return change > 0 ? (
      <TrendingUp className="size-3" />
    ) : (
      <TrendingDown className="size-3" />
    )
  }

  const getTrendColor = () => {
    if (change === undefined || change === 0) {
      return 'text-muted-foreground'
    }
    // For errors, negative is good
    if (title.toLowerCase().includes('error')) {
      return change < 0 ? 'text-success' : 'text-destructive'
    }
    return change > 0 ? 'text-success' : 'text-destructive'
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <div className="flex items-center gap-2 mt-1">
          {change !== undefined && (
            <span className={cn('flex items-center gap-0.5 text-xs', getTrendColor())}>
              {getTrendIcon()}
              {Math.abs(change).toFixed(1)}%
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
