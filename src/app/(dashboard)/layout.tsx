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
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </SidebarInset>
      <CommandPalette />
    </SidebarProvider>
  )
}
