'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { WorkflowLogsTable, WorkflowLogsCards } from '@/components/dashboard/workflow-logs-table'
import { LogsLiveTail } from '@/components/dashboard/logs-live-tail'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockWorkflowLogs } from '@/lib/mock-data'
import { Search, RefreshCw, AlertTriangle, Activity, Hash } from 'lucide-react'

// TODO: subscribe to workflow_logs with Supabase Realtime

const nodeOptions = [
  'all',
  'firecrawl ดึงหน้ารวมข่าว',
  'แยก URL บทความ',
  'firecrawl ดึงเนื้อหาบทความ',
  'RPC upsert_brand_model',
  'Supabase บันทึก car_news',
  'Telegram แจ้งข่าวใหม่',
]

const statusOptions = ['all', 'success', 'error', 'warning', 'duplicate']

export default function WorkflowLogsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [nodeFilter, setNodeFilter] = useState('all')
  const [isLiveTail, setIsLiveTail] = useState(true)

  const filteredLogs = useMemo(() => {
    return mockWorkflowLogs.filter((log) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch =
          log.message.toLowerCase().includes(searchLower) ||
          log.node_name.toLowerCase().includes(searchLower) ||
          (log.article_url?.toLowerCase().includes(searchLower) ?? false)
        if (!matchesSearch) return false
      }

      // Status filter
      if (statusFilter !== 'all' && log.status !== statusFilter) return false

      // Node filter
      if (nodeFilter !== 'all' && log.node_name !== nodeFilter) return false

      return true
    })
  }, [search, statusFilter, nodeFilter])

  // Calculate summary stats
  const errorCount24h = mockWorkflowLogs.filter((log) => log.status === 'error').length
  const mostFailedNode = 'firecrawl ดึงเนื้อหาบทความ'
  const lastExecutionId = mockWorkflowLogs[0]?.execution_id ?? '-'

  return (
    <>
      <DashboardHeader
        title="Workflow Logs"
        subtitle="บันทึกการทำงานของ n8n workflow สำหรับ monitoring และ debugging"
      />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Error Summary Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="size-4" />
                Errors (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{errorCount24h}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="size-4" />
                Most Failed Node
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium truncate">{mostFailedNode}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Hash className="size-4" />
                Last Execution ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono">{lastExecutionId}</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ค้นหา URL, title, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={nodeFilter} onValueChange={setNodeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Node" />
              </SelectTrigger>
              <SelectContent>
                {nodeOptions.map((node) => (
                  <SelectItem key={node} value={node}>
                    {node === 'all' ? 'All Nodes' : node}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 px-3 border rounded-md">
              <Switch
                id="live-tail"
                checked={isLiveTail}
                onCheckedChange={setIsLiveTail}
              />
              <Label htmlFor="live-tail" className="text-sm">
                Live Tail
              </Label>
            </div>

            <Button variant="outline" size="icon">
              <RefreshCw className="size-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Live Tail Panel */}
        <LogsLiveTail logs={filteredLogs} isLive={isLiveTail} maxLines={8} />

        {/* Logs Table - Desktop */}
        <div className="hidden md:block">
          <WorkflowLogsTable logs={filteredLogs} />
        </div>

        {/* Logs Cards - Mobile */}
        <div className="md:hidden">
          <WorkflowLogsCards logs={filteredLogs} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          แสดง {filteredLogs.length} รายการจากทั้งหมด {mockWorkflowLogs.length} รายการ
        </p>
      </div>
    </>
  )
}
