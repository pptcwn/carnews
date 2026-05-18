import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { MobileBottomNav } from '@/components/dashboard/mobile-bottom-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        {children}
      </SidebarInset>
      <MobileBottomNav />
    </SidebarProvider>
  )
}
