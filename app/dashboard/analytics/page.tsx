'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { BrandChart, CategoryChart, ErrorTrendChart } from '@/components/dashboard/charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  mockBrandStats,
  mockCategoryStats,
  mockErrorTrend,
  mockCarNews,
  mockRewrites,
  mockSocialContents,
} from '@/lib/mock-data'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// TODO: fetch analytics from Supabase
// TODO: fetch Umami analytics later
// TODO: calculate error rate from workflow_logs

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

function getRewriteStatusDistribution() {
  const total = mockCarNews.length
  const rewritten = mockCarNews.filter((n) => n.status === 'rewritten' || n.status === 'published').length
  const review = mockCarNews.filter((n) => n.status === 'review').length
  const raw = mockCarNews.filter((n) => n.status === 'raw').length
  return [
    { status: 'Published / Rewritten', count: rewritten },
    { status: 'Review', count: review },
    { status: 'Raw', count: raw },
  ]
}

function getSocialCompletionStats() {
  const platforms = ['facebook', 'instagram', 'tiktok', 'x', 'line'] as const
  return platforms.map((platform) => {
    const published = mockSocialContents.filter(
      (s) => s.platform === platform && s.status === 'published'
    ).length
    const draft = mockSocialContents.filter(
      (s) => s.platform === platform && s.status === 'draft'
    ).length
    return { platform, published, draft }
  })
}

const topArticles = mockCarNews
  .sort((a, b) => b.image_count - a.image_count)
  .slice(0, 5)

const rewriteStatusData = getRewriteStatusDistribution()
const socialCompletionData = getSocialCompletionStats()

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Analytics"
        subtitle="วิเคราะห์ประสิทธิภาพข่าว แบรนด์ หมวดหมู่ และ workflow errors"
      />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BrandChart data={mockBrandStats} />
          <CategoryChart data={mockCategoryStats} />
        </div>

        {/* Error trend full width */}
        <ErrorTrendChart data={mockErrorTrend} />

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rewrite status distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rewrite Status Distribution</CardTitle>
              <p className="text-xs text-muted-foreground">สัดส่วนสถานะการ rewrite บทความ</p>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={rewriteStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="count"
                      nameKey="status"
                      label={({ status, percent }) =>
                        `${status} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {rewriteStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {rewriteStatusData.map((item, index) => (
                  <div key={item.status} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className="inline-block size-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {item.status}: <span className="text-foreground font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social content completion */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Social Content Completion</CardTitle>
              <p className="text-xs text-muted-foreground">จำนวน social content ที่สร้างแล้วแยกตาม platform</p>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={socialCompletionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="platform"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="published" name="Published" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="draft" name="Draft" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top articles mock */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Articles (Mock)</CardTitle>
            <p className="text-xs text-muted-foreground">บทความที่มีจำนวนรูปภาพมากที่สุด (ใช้ image_count เป็น proxy)</p>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {topArticles.map((article, index) => (
                <div key={article.id} className="flex items-center gap-3 py-3">
                  <span className="text-sm font-mono text-muted-foreground w-5 shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{article.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {article.brand} · {article.model}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <Badge
                      variant={
                        article.status === 'published'
                          ? 'default'
                          : article.status === 'rewritten'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="text-xs"
                    >
                      {article.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.image_count} รูป</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
