'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Terminal, Circle } from 'lucide-react'
import type { WorkflowLog } from '@/lib/types'
import { cn } from '@/lib/utils'

interface LogsLiveTailProps {
  logs: WorkflowLog[]
  isLive?: boolean
  maxLines?: number
  className?: string
}

export function LogsLiveTail({ 
  logs, 
  isLive = false, 
  maxLines = 8,
  className 
}: LogsLiveTailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const displayLogs = logs.slice(0, maxLines)

  useEffect(() => {
    if (scrollRef.current && isLive) {
      scrollRef.current.scrollTop = 0
    }
  }, [logs, isLive])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success'
      case 'error':
        return 'text-destructive'
      case 'warning':
        return 'text-warning'
      case 'duplicate':
        return 'text-muted-foreground'
      default:
        return 'text-foreground'
    }
  }

  const getStatusSymbol = (status: string) => {
    switch (status) {
      case 'success':
        return '[OK]'
      case 'error':
        return '[ERR]'
      case 'warning':
        return '[WARN]'
      case 'duplicate':
        return '[DUP]'
      default:
        return '[LOG]'
    }
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Terminal className="size-4" />
            Live Tail
          </CardTitle>
          {isLive && (
            <Badge variant="outline" className="gap-1.5 text-xs">
              <Circle className="size-2 fill-success text-success animate-pulse" />
              Live
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={scrollRef}
          className="bg-muted/50 rounded-lg p-3 font-mono text-xs h-[240px] overflow-y-auto scrollbar-thin"
        >
          {displayLogs.length > 0 ? (
            <div className="space-y-1.5">
              {displayLogs.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-muted-foreground shrink-0">
                    [{formatTime(log.created_at)}]
                  </span>
                  <span className={cn('shrink-0', getStatusColor(log.status))}>
                    {getStatusSymbol(log.status)}
                  </span>
                  <span className="text-primary shrink-0">
                    {log.node_name}:
                  </span>
                  <span className="text-foreground truncate">
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Waiting for logs...
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          แสดงล่าสุด {displayLogs.length} รายการ (Asia/Bangkok)
        </p>
      </CardContent>
    </Card>
  )
}
