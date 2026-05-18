import {
  Newspaper,
  FileEdit,
  CheckCircle,
  AlertTriangle,
  ImageIcon,
} from 'lucide-react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { RecentScrapeRunCard } from '@/components/dashboard/recent-scrape-run-card'
import { WorkflowTimeline } from '@/components/dashboard/workflow-timeline'
import { BrandChart, CategoryChart, ErrorTrendChart } from '@/components/dashboard/charts'
import {
  mockKpiData,
  mockScrapeRuns,
  mockWorkflowLogs,
  mockBrandStats,
  mockCategoryStats,
  mockErrorTrend,
} from '@/lib/mock-data'

// TODO: fetch KPI data from Supabase
// TODO: subscribe to workflow_logs with Supabase Realtime

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Dashboard Overview"
        subtitle="ภาพรวมระบบข่าวรถยนต์อัตโนมัติ CarNews Thailand"
      />
      
      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <KpiCard
            title="ข่าวทั้งหมด"
            value={mockKpiData.totalNews}
            change={mockKpiData.totalNewsChange}
            description="บทความ"
            icon={<Newspaper className="size-4" />}
          />
          <KpiCard
            title="ข่าวรอ Rewrite"
            value={mockKpiData.pendingRewrite}
            change={mockKpiData.pendingRewriteChange}
            description="รายการ"
            icon={<FileEdit className="size-4" />}
          />
          <KpiCard
            title="Published แล้ว"
            value={mockKpiData.published}
            change={mockKpiData.publishedChange}
            description="บทความ"
            icon={<CheckCircle className="size-4" />}
          />
          <KpiCard
            title="Error วันนี้"
            value={mockKpiData.errorsToday}
            change={mockKpiData.errorsTodayChange}
            description="จาก 3 เมื่อวาน"
            icon={<AlertTriangle className="size-4" />}
          />
          <KpiCard
            title="รูปรอ Optimize"
            value={mockKpiData.pendingImages}
            change={mockKpiData.pendingImagesChange}
            description="รูป"
            icon={<ImageIcon className="size-4" />}
            className="col-span-2 md:col-span-1"
          />
        </div>

        {/* Recent Activity Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <RecentScrapeRunCard scrapeRun={mockScrapeRuns[0]} />
          <WorkflowTimeline logs={mockWorkflowLogs} maxItems={5} />
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <BrandChart data={mockBrandStats} />
          <CategoryChart data={mockCategoryStats} />
        </div>

        {/* Error Trend */}
        <div className="grid gap-4 lg:grid-cols-2">
          <ErrorTrendChart data={mockErrorTrend} />
        </div>
      </div>
    </>
  )
}
