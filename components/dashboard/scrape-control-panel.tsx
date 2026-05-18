'use client'

import { useState } from 'react'
import {
  Play,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import type { NewsSource, ScrapeRun, ScrapeStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ScrapeControlPanelProps {
  sources: NewsSource[]
  recentRuns: ScrapeRun[]
}

const statusConfig: Record<ScrapeStatus, { label: string; icon: React.ElementType; className: string }> = {
  running: {
    label: 'Running',
    icon: Loader2,
    className: 'bg-info/20 text-info',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    className: 'bg-success/20 text-success',
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    className: 'bg-destructive/20 text-destructive',
  },
}

export function ScrapeControlPanel({ sources, recentRuns }: ScrapeControlPanelProps) {
  const [selectedSource, setSelectedSource] = useState<string>('')
  const [limit, setLimit] = useState([5])
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeResult, setScrapeResult] = useState<string | null>(null)
  const [liveTail, setLiveTail] = useState(false)

  const activeSources = sources.filter((s) => s.active)

  const handleScrape = async () => {
    if (!selectedSource) return

    // TODO: POST /api/scrape/trigger
    // TODO: call N8N_WEBHOOK_URL
    // TODO: subscribe to workflow_logs realtime by execution_id
    setIsScraping(true)
    setScrapeResult(null)
    const sourceName = activeSources.find((s) => String(s.id) === selectedSource)?.name ?? 'Source'
    const toastId = toast.loading(`กำลัง Scrape ${sourceName}...`, { description: `Limit: ${limit[0]} articles` })

    // Simulate scrape
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const result = `Scrape completed. Found ${limit[0]} articles, inserted 3, duplicates 1, errors 1.`
    setScrapeResult(result)
    setIsScraping(false)
    toast.success(`Scrape ${sourceName} สำเร็จ`, { id: toastId, description: `พบ ${limit[0]} รายการ บันทึก 3 ซ้ำ 1 เอร์เรอร์ 1` })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Scrape Settings</h1>
        <p className="text-sm text-muted-foreground">
          ตั้งค่าและ Trigger การ Scrape ข่าวด้วยตนเอง
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Manual Scrape Card */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Scrape</CardTitle>
            <CardDescription>
              เลือก Source และ Limit สำหรับการ Scrape
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Warning */}
            <Alert>
              <AlertTriangle className="size-4" />
              <AlertTitle>หมายเหตุ</AlertTitle>
              <AlertDescription>
                Manual Scrape จะเรียก n8n webhook และใช้ Firecrawl credits
              </AlertDescription>
            </Alert>

            {/* Source Selection */}
            <div className="space-y-2">
              <Label>Source</Label>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือก Source..." />
                </SelectTrigger>
                <SelectContent>
                  {activeSources.map((source) => (
                    <SelectItem key={source.id} value={String(source.id)}>
                      {source.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {activeSources.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  ไม่มี Source ที่ active
                </p>
              )}
            </div>

            {/* Limit Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Limit</Label>
                <span className="text-sm font-medium">{limit[0]} articles</span>
              </div>
              <Slider
                value={limit}
                onValueChange={setLimit}
                min={1}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            {/* Scrape Button */}
            <Button
              className="w-full"
              onClick={handleScrape}
              disabled={!selectedSource || isScraping}
            >
              {isScraping ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Play className="mr-2 size-4" />
                  Scrape Now
                </>
              )}
            </Button>

            {/* Result */}
            {scrapeResult && (
              <Alert className="bg-success/10 border-success/30">
                <CheckCircle className="size-4 text-success" />
                <AlertDescription>{scrapeResult}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Live Log Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Log</CardTitle>
                <CardDescription>
                  Log จาก workflow execution
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="live-tail" className="text-xs">Live Tail</Label>
                <Switch
                  id="live-tail"
                  checked={liveTail}
                  onCheckedChange={setLiveTail}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] rounded-lg bg-muted/50 font-mono text-xs">
              <div className="p-4 space-y-1">
                {mockLogs.map((log, index) => (
                  <div
                    key={index}
                    className={cn(
                      'py-0.5',
                      log.type === 'error' && 'text-destructive',
                      log.type === 'success' && 'text-success',
                      log.type === 'warning' && 'text-warning-foreground'
                    )}
                  >
                    <span className="text-muted-foreground">[{log.time}]</span>{' '}
                    {log.message}
                  </div>
                ))}
                {liveTail && (
                  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                    <RefreshCw className="size-3 animate-spin" />
                    Waiting for new logs...
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scrape Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scrape Runs</CardTitle>
          <CardDescription>
            ประวัติการ Scrape ล่าสุด
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRuns.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                ยังไม่มีประวัติการ Scrape
              </p>
            ) : (
              recentRuns.map((run) => (
                <RecentScrapeRunCard key={run.id} run={run} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RecentScrapeRunCard({ run }: { run: ScrapeRun }) {
  const config = statusConfig[run.status]
  const Icon = config.icon

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className={cn('flex size-10 items-center justify-center rounded-full', config.className)}>
          <Icon className={cn('size-5', run.status === 'running' && 'animate-spin')} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{run.source_name}</span>
            <Badge variant="outline" className="text-xs">
              Limit: {run.requested_limit}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(run.started_at).toLocaleString('th-TH')}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Found:</span>
          <span className="font-medium">{run.found_count}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-success">+{run.inserted_count}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Dup:</span>
          <span>{run.duplicate_count}</span>
        </div>
        {run.error_count > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <span className="text-destructive">Err: {run.error_count}</span>
          </div>
        )}
        <Badge className={cn('text-xs', config.className)}>
          {config.label}
        </Badge>
      </div>
    </div>
  )
}

const mockLogs = [
  { time: '07:00:05', type: 'info', message: '[n8n_carnews] Workflow started' },
  { time: '07:00:06', type: 'info', message: '[firecrawl] ดึงหน้ารวมข่าว...' },
  { time: '07:00:15', type: 'success', message: '[firecrawl] ดึงหน้ารวมข่าวสำเร็จ พบ 25 รายการ' },
  { time: '07:00:16', type: 'info', message: '[แยก URL] แยก URL สำเร็จ 5 รายการ' },
  { time: '07:00:25', type: 'success', message: '[firecrawl] ดึงเนื้อหา Toyota Camry 2026 สำเร็จ' },
  { time: '07:00:30', type: 'success', message: '[RPC] upsert brand: Toyota, model: Camry สำเร็จ' },
  { time: '07:00:35', type: 'success', message: '[Supabase] บันทึกข่าว Toyota Camry 2026 สำเร็จ id: 1' },
  { time: '07:00:50', type: 'success', message: '[firecrawl] ดึงเนื้อหา BYD Seal U สำเร็จ' },
  { time: '07:01:15', type: 'warning', message: '[Supabase] ข่าวซ้ำ: Honda Civic Type R มีอยู่แล้ว' },
  { time: '07:01:30', type: 'error', message: '[firecrawl] Timeout: ไม่สามารถเข้าถึงหน้าเว็บได้' },
  { time: '07:02:00', type: 'success', message: '[Telegram] ส่ง Telegram สำเร็จ 3 ข่าวใหม่' },
  { time: '07:02:05', type: 'info', message: '[n8n_carnews] Workflow completed' },
]
