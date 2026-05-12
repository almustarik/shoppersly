"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { navigation, roleLabels } from "@/lib/constants"
import { useAppStore } from "@/store/app-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  ChevronsUpDown,
  LogOut,
  Bell,
  CreditCard as CreditCardIcon,
  User as UserIcon,
} from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const user = useAppStore((s) => s.user)

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-[60px] justify-center px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              tooltip="Shoppersly"
              aria-label="Shoppersly home"
              className="h-10 gap-2.5 hover:bg-transparent active:bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
            >
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-4" strokeWidth={1.75} />
              </div>
              <span className="truncate text-[15px] font-semibold text-foreground">
                Shoppersly
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-2 px-2">
        {navigation.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            <SidebarGroupLabel className="mb-0.5 h-7 px-3 text-[11px] uppercase tracking-widest text-muted-foreground/60">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-9 gap-2.5 rounded-lg px-2 text-[13.5px] font-medium text-sidebar-foreground transition-colors duration-150",
                        "hover:bg-muted/50 hover:text-sidebar-foreground",
                        "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2",
                        isActive && [
                          "bg-sidebar-accent text-sidebar-accent-foreground",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        ]
                      )}
                    >
                      <div
                        className={cn(
                          "absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-200",
                          isActive
                            ? "scale-y-100 opacity-100"
                            : "scale-y-0 opacity-0"
                        )}
                      />
                      <item.icon className="size-[18px] shrink-0 stroke-[1.75]" />
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge != null && (
                      <SidebarMenuBadge className="min-w-[18px] rounded-full bg-primary px-1 text-center text-[11px] font-medium text-primary-foreground transition-transform duration-200">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    aria-label="User menu"
                    className="h-12 gap-2.5 rounded-lg px-2 transition-colors duration-150 data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <div className="relative">
                  <Avatar className="size-9 rounded-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-px -right-px size-2.5 rounded-full bg-success ring-2 ring-card" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-[13.5px] font-semibold text-foreground">
                    {user.name}
                  </span>
                  <span className="truncate text-[11px] text-muted-foreground">
                    {roleLabels[user.role]}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/60" strokeWidth={1.75} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--anchor-width] min-w-56"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="relative">
                      <Avatar className="size-9 rounded-lg">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-px -right-px size-2.5 rounded-full bg-success ring-2 ring-card" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
