'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WorkflowLog } from '@/lib/types'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WorkflowLogsTableProps {
  logs: WorkflowLog[]
  className?: string
}

export function WorkflowLogsTable({ logs, className }: WorkflowLogsTableProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
    })
  }

  const truncateUrl = (url: string | null) => {
    if (!url) return '-'
    try {
      const urlObj = new URL(url)
      const path = urlObj.pathname
      if (path.length > 30) {
        return '...' + path.slice(-30)
      }
      return path
    } catch {
      return url.slice(0, 30) + '...'
    }
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium">Workflow Logs</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Time</TableHead>
                <TableHead className="w-[120px]">Workflow</TableHead>
                <TableHead>Node</TableHead>
                <TableHead>Article URL</TableHead>
                <TableHead className="w-[90px]">Status</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[100px]">Execution ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    <div>{formatDate(log.created_at)}</div>
                    <div className="text-muted-foreground">{formatTime(log.created_at)}</div>
                  </TableCell>
                  <TableCell className="text-xs">{log.workflow_name}</TableCell>
                  <TableCell className="text-xs font-medium">{log.node_name}</TableCell>
                  <TableCell className="text-xs">
                    {log.article_url ? (
                      <a
                        href={log.article_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        title={log.article_url}
                      >
                        {truncateUrl(log.article_url)}
                        <ExternalLink className="size-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={log.status} />
                  </TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate" title={log.message}>
                    {log.message}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.execution_id.slice(0, 12)}...
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Mobile version - card list
interface WorkflowLogsCardsProps {
  logs: WorkflowLog[]
  className?: string
}

export function WorkflowLogsCards({ logs, className }: WorkflowLogsCardsProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('th-TH', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={cn('space-y-3', className)}>
      {logs.map((log) => (
        <Card key={log.id} className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-medium text-sm">{log.node_name}</p>
              <p className="text-xs text-muted-foreground">{log.workflow_name}</p>
            </div>
            <StatusBadge status={log.status} />
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {log.message}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(log.created_at)}</span>
            <span className="font-mono">{log.execution_id.slice(0, 8)}...</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
