'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertTriangle, ShieldAlert, Bot } from 'lucide-react'

// TODO: verify Telegram admin from telegram_admins
// TODO: log commands to telegram_command_logs
// TODO: use telegram_pending_actions
// TODO: rate limit by telegram_user_id
// TODO: implement /api/telegram/webhook

const mockBotStatus = {
  online: true,
  username: '@carnews_admin_bot',
  webhookUrl: 'https://carnews.vercel.app/api/telegram/webhook',
  webhookConnected: true,
  activeAdmins: 3,
  commandsToday: 14,
  lastSeen: '2026-05-19T09:55:00Z',
}

const mockAdmins = [
  { id: 1, telegram_user_id: '100001', username: '@pimchanok_admin', role: 'super_admin', active: true, last_used: '2026-05-19T09:55:00Z' },
  { id: 2, telegram_user_id: '100002', username: '@somchai_editor', role: 'editor', active: true, last_used: '2026-05-19T08:30:00Z' },
  { id: 3, telegram_user_id: '100003', username: '@nattapong_viewer', role: 'viewer', active: true, last_used: '2026-05-18T22:10:00Z' },
  { id: 4, telegram_user_id: '100004', username: '@old_admin', role: 'editor', active: false, last_used: '2026-04-01T10:00:00Z' },
]

const mockCommandLogs = [
  { id: 1, username: '@pimchanok_admin', command: '/status', result: 'success', message: 'Workflow status returned', created_at: '2026-05-19T09:55:00Z' },
  { id: 2, username: '@pimchanok_admin', command: '/scrape headlightmag 5', result: 'success', message: 'Scrape triggered: 5 articles', created_at: '2026-05-19T09:50:00Z' },
  { id: 3, username: '@somchai_editor', command: '/list raw', result: 'success', message: 'Returned 9 raw articles', created_at: '2026-05-19T08:30:00Z' },
  { id: 4, username: '@somchai_editor', command: '/rewrite 4', result: 'success', message: 'Rewrite queued for id: 4', created_at: '2026-05-19T08:28:00Z' },
  { id: 5, username: '@nattapong_viewer', command: '/stats', result: 'success', message: 'Daily stats returned', created_at: '2026-05-18T22:10:00Z' },
  { id: 6, username: '@unknown_user', command: '/scrape', result: 'denied', message: 'Unauthorized: user not in telegram_admins', created_at: '2026-05-18T20:00:00Z' },
]

const mockPendingActions = [
  { id: 1, requested_by: '@pimchanok_admin', action: 'approve_publish', target: 'Article #4 – Mazda CX-5 2026', status: 'pending', created_at: '2026-05-19T09:52:00Z' },
  { id: 2, requested_by: '@somchai_editor', action: 'approve_social', target: 'Social – BYD Seal U / TikTok', status: 'pending', created_at: '2026-05-19T08:35:00Z' },
]

const permissionMatrix = [
  { command: '/status', super_admin: true, editor: true, viewer: true },
  { command: '/stats', super_admin: true, editor: true, viewer: true },
  { command: '/list', super_admin: true, editor: true, viewer: true },
  { command: '/scrape', super_admin: true, editor: false, viewer: false },
  { command: '/rewrite', super_admin: true, editor: true, viewer: false },
  { command: '/publish', super_admin: true, editor: false, viewer: false },
  { command: '/approve', super_admin: true, editor: false, viewer: false },
  { command: '/addadmin', super_admin: true, editor: false, viewer: false },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('th-TH', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TelegramBotPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Telegram Bot"
        subtitle="ตรวจสอบสถานะ Telegram Admin Bot และ command logs"
      />

      <main className="flex-1 p-4 md:p-6 space-y-6">

        {/* Security rules card */}
        <Alert className="border-warning/50 bg-warning/10">
          <ShieldAlert className="size-4 text-warning-foreground" />
          <AlertTitle className="text-warning-foreground font-semibold">Bot Security Rules</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-1 text-sm text-warning-foreground/90">
              <li>Bot is <strong>Mobile Admin Controller only</strong> — ไม่มีสิทธิ์ควบคุม infrastructure</li>
              <li>Bot <strong>must not SSH</strong> เข้าเครื่อง server ใดๆ</li>
              <li>Bot <strong>must not run raw SQL</strong> — ใช้ Supabase RPC เท่านั้น</li>
              <li>Bot <strong>must not edit .env</strong> หรือ config files</li>
              <li>Bot replies to <strong>private DM chat id</strong> — ไม่ตอบสนองในกลุ่มที่ไม่ได้ลงทะเบียน</li>
              <li>n8n notifications go to <strong>group chat</strong> — แยกจาก admin DM</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Status KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Bot Status</span>
              </div>
              <div className="flex items-center gap-2">
                {mockBotStatus.online ? (
                  <CheckCircle2 className="size-4 text-success" />
                ) : (
                  <XCircle className="size-4 text-destructive" />
                )}
                <span className="text-lg font-semibold">
                  {mockBotStatus.online ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{mockBotStatus.username}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">Webhook</span>
              </div>
              <div className="flex items-center gap-2">
                {mockBotStatus.webhookConnected ? (
                  <CheckCircle2 className="size-4 text-success" />
                ) : (
                  <XCircle className="size-4 text-destructive" />
                )}
                <span className="text-lg font-semibold">
                  {mockBotStatus.webhookConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">{mockBotStatus.webhookUrl}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">Active Admins</span>
              </div>
              <span className="text-2xl font-bold">{mockBotStatus.activeAdmins}</span>
              <p className="text-xs text-muted-foreground mt-1">
                จาก {mockAdmins.length} admins ทั้งหมด
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">Commands Today</span>
              </div>
              <span className="text-2xl font-bold">{mockBotStatus.commandsToday}</span>
              <p className="text-xs text-muted-foreground mt-1">
                Last seen {formatDate(mockBotStatus.lastSeen)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin roles table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admin Roles</CardTitle>
            <p className="text-xs text-muted-foreground">รายชื่อ Telegram admins และสิทธิ์การใช้งาน</p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Telegram ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-mono text-sm">{admin.username}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{admin.telegram_user_id}</TableCell>
                    <TableCell>
                      <Badge
                        variant={admin.role === 'super_admin' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {admin.active ? (
                        <Badge variant="outline" className="text-xs text-success border-success/50">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {formatDate(admin.last_used)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Command logs + Permission matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Command logs */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Command Logs</CardTitle>
              <p className="text-xs text-muted-foreground">คำสั่งล่าสุดที่รับมาจาก Telegram</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {mockCommandLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 px-4 py-3">
                    <div className="mt-0.5 shrink-0">
                      {log.result === 'success' ? (
                        <CheckCircle2 className="size-4 text-success" />
                      ) : log.result === 'denied' ? (
                        <XCircle className="size-4 text-destructive" />
                      ) : (
                        <AlertTriangle className="size-4 text-warning" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-primary">{log.command}</span>
                        <span className="text-xs text-muted-foreground">{log.username}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{log.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(log.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permission matrix */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Permission Matrix</CardTitle>
              <p className="text-xs text-muted-foreground">สิทธิ์การใช้คำสั่งแยกตาม role</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command</TableHead>
                    <TableHead className="text-center">Super Admin</TableHead>
                    <TableHead className="text-center">Editor</TableHead>
                    <TableHead className="text-center">Viewer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionMatrix.map((row) => (
                    <TableRow key={row.command}>
                      <TableCell className="font-mono text-xs">{row.command}</TableCell>
                      <TableCell className="text-center">
                        {row.super_admin ? (
                          <CheckCircle2 className="size-4 text-success mx-auto" />
                        ) : (
                          <XCircle className="size-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.editor ? (
                          <CheckCircle2 className="size-4 text-success mx-auto" />
                        ) : (
                          <XCircle className="size-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.viewer ? (
                          <CheckCircle2 className="size-4 text-success mx-auto" />
                        ) : (
                          <XCircle className="size-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Pending actions */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">รายการที่รอการ approve จาก admin</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {mockPendingActions.length} รายการ
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {mockPendingActions.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                ไม่มีรายการที่รอ approve
              </div>
            ) : (
              <div className="divide-y divide-border">
                {mockPendingActions.map((action) => (
                  <div key={action.id} className="flex items-center gap-3 px-4 py-3">
                    <AlertTriangle className="size-4 text-warning shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{action.target}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <Badge variant="outline" className="text-xs">{action.action}</Badge>
                        <span className="text-xs text-muted-foreground">by {action.requested_by}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="secondary" className="text-xs">
                        {action.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden md:block">
                        {formatDate(action.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
