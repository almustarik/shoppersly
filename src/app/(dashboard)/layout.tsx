import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Header } from "@/components/layout/header"
import { CommandPalette } from "@/components/layout/command-palette"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <Header />
        <main className="flex-1 scroll-smooth overflow-y-auto overflow-x-hidden px-4 py-6 md:px-5 md:py-8 lg:px-8">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </SidebarInset>
      <CommandPalette />
    </SidebarProvider>
  )
}
