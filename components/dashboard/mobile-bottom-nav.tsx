'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  Share2,
  MoreHorizontal,
  Activity,
  BarChart3,
  Car,
  Settings,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const primaryItems = [
  {
    title: 'Dashboard',
    titleTh: 'หน้าหลัก',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'News',
    titleTh: 'ข่าว',
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
    title: 'Social',
    titleTh: 'โซเชียล',
    url: '/dashboard/social',
    icon: Share2,
  },
]

const moreItems = [
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
    title: 'Brands & Models',
    titleTh: 'แบรนด์/รุ่น',
    url: '/dashboard/brands',
    icon: Car,
  },
  {
    title: 'Settings',
    titleTh: 'ตั้งค่า',
    url: '/dashboard/settings/scrape',
    icon: Settings,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return pathname === url
    }
    return pathname.startsWith(url)
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden">
        <div className="flex items-center justify-around py-2">
          {primaryItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 min-w-[64px]',
                isActive(item.url)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="size-5" />
              <span className="text-xs">{item.titleTh}</span>
            </Link>
          ))}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 min-w-[64px]',
              isMoreOpen
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <MoreHorizontal className="size-5" />
            <span className="text-xs">เพิ่มเติม</span>
          </button>
        </div>
      </nav>

      <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
        <SheetContent side="bottom" className="h-auto rounded-t-xl">
          <SheetHeader className="sr-only">
            <SheetTitle>เมนูเพิ่มเติม</SheetTitle>
            <SheetDescription>เมนูเพิ่มเติมสำหรับการจัดการระบบ</SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            {moreItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                onClick={() => setIsMoreOpen(false)}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-lg transition-colors',
                  isActive(item.url)
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="size-6" />
                <span className="text-xs text-center">{item.titleTh}</span>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
