import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import type { ScrapeRun } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RecentScrapeRunCardProps {
  scrapeRun: ScrapeRun
}

export function RecentScrapeRunCard({ scrapeRun }: RecentScrapeRunCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
    })
  }

  const getStatusIcon = () => {
    switch (scrapeRun.status) {
      case 'completed':
        return <CheckCircle2 className="size-4 text-success" />
      case 'running':
        return <Loader2 className="size-4 text-info animate-spin" />
      case 'failed':
        return <XCircle className="size-4 text-destructive" />
    }
  }

  const getStatusBadge = () => {
    const variants: Record<string, string> = {
      completed: 'bg-success/20 text-success',
      running: 'bg-info/20 text-info',
      failed: 'bg-destructive/20 text-destructive',
    }
    const labels: Record<string, string> = {
      completed: 'Completed',
      running: 'Running',
      failed: 'Failed',
    }
    return (
      <Badge variant="outline" className={cn('font-medium', variants[scrapeRun.status])}>
        {labels[scrapeRun.status]}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getStatusIcon()}
            Recent Scrape Run
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Source</p>
            <p className="font-medium">{scrapeRun.source_name}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Limit</p>
            <p className="font-medium">{scrapeRun.requested_limit} articles</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="rounded-lg bg-muted/50 p-2">
            <p className="text-lg font-bold">{scrapeRun.found_count}</p>
            <p className="text-xs text-muted-foreground">Found</p>
          </div>
          <div className="rounded-lg bg-success/10 p-2">
            <p className="text-lg font-bold text-success">{scrapeRun.inserted_count}</p>
            <p className="text-xs text-muted-foreground">Inserted</p>
          </div>
          <div className="rounded-lg bg-warning/10 p-2">
            <p className="text-lg font-bold text-warning">{scrapeRun.duplicate_count}</p>
            <p className="text-xs text-muted-foreground">Duplicate</p>
          </div>
          <div className="rounded-lg bg-destructive/10 p-2">
            <p className="text-lg font-bold text-destructive">{scrapeRun.error_count}</p>
            <p className="text-xs text-muted-foreground">Error</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>Started: {formatDate(scrapeRun.started_at)} {formatTime(scrapeRun.started_at)}</span>
          </div>
          {scrapeRun.finished_at && (
            <span>Finished: {formatTime(scrapeRun.finished_at)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
