'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  Activity,
  BarChart3,
  Share2,
  Car,
  Settings,
  Globe,
  Bot,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/dashboard/theme-toggle'

const mainMenuItems = [
  {
    title: 'Overview',
    titleTh: 'ภาพรวม',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'News Feed',
    titleTh: 'ข่าว Raw',
    url: '/dashboard/news',
    icon: Newspaper,
  },
  {
    title: 'Articles',
    titleTh: 'บทความ',
    url: '/dashboard/articles',
    icon: FileText,
  },
  {
    title: 'Workflow Logs',
    titleTh: 'Logs',
    url: '/dashboard/logs',
    icon: Activity,
  },
  {
    title: 'Analytics',
    titleTh: 'สถิติ',
    url: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Social',
    titleTh: 'โซเชียล',
    url: '/dashboard/social',
    icon: Share2,
  },
]

const settingsMenuItems = [
  {
    title: 'Brands & Models',
    titleTh: 'แบรนด์/รุ่น',
    url: '/dashboard/brands',
    icon: Car,
  },
  {
    title: 'Scrape Settings',
    titleTh: 'ตั้งค่า Scrape',
    url: '/dashboard/settings/scrape',
    icon: Settings,
  },
  {
    title: 'Source Management',
    titleTh: 'จัดการ Source',
    url: '/dashboard/settings/sources',
    icon: Globe,
  },
  {
    title: 'Telegram Bot',
    titleTh: 'Telegram Bot',
    url: '/dashboard/settings/telegram',
    icon: Bot,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            CN
          </div>
          <span className="font-semibold text-lg">CarNews</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.url ||
                      (item.url !== '/dashboard' && pathname.startsWith(item.url))
                    }
                    tooltip={item.titleTh}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.titleTh}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>ตั้งค่า</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url || pathname.startsWith(item.url)}
                    tooltip={item.titleTh}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.titleTh}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-xs text-muted-foreground">v1.0.0</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
