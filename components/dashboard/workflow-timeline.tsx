import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle, AlertCircle, Copy } from 'lucide-react'
import type { WorkflowLog } from '@/lib/types'
import { cn } from '@/lib/utils'

interface WorkflowTimelineProps {
  logs: WorkflowLog[]
  maxItems?: number
}

export function WorkflowTimeline({ logs, maxItems = 6 }: WorkflowTimelineProps) {
  const displayLogs = logs.slice(0, maxItems)

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="size-4 text-success" />
      case 'error':
        return <XCircle className="size-4 text-destructive" />
      case 'warning':
        return <AlertCircle className="size-4 text-warning" />
      case 'duplicate':
        return <Copy className="size-4 text-muted-foreground" />
      default:
        return <CheckCircle2 className="size-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-success/50'
      case 'error':
        return 'border-destructive/50'
      case 'warning':
        return 'border-warning/50'
      case 'duplicate':
        return 'border-muted-foreground/50'
      default:
        return 'border-border'
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Latest Workflow Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayLogs.map((log, index) => (
            <div
              key={log.id}
              className={cn(
                'flex items-start gap-3 pb-3',
                index !== displayLogs.length - 1 && 'border-b border-border/50'
              )}
            >
              <div className={cn('mt-0.5 p-1 rounded-full border', getStatusColor(log.status))}>
                {getStatusIcon(log.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{log.node_name}</p>
                <p className="text-xs text-muted-foreground truncate">{log.message}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(log.created_at)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
