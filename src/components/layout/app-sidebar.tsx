"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { navigation, roleLabels } from "@/lib/constants"
import { useAppStore } from "@/store/app-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />} tooltip="Shoppersly">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Shoppersly</span>
                <span className="truncate text-xs text-muted-foreground">
                  Social Commerce OS
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.length === 1 ? (
                group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          isActive &&
                            "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary"
                        )}
                      >
                        <item.icon className={cn("size-4", isActive && "text-primary")} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge != null && (
                        <SidebarMenuBadge
                          className={cn(
                            "rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold text-primary"
                          )}
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )
                })
              ) : (
                <CollapsibleNavGroup
                  items={group.items}
                  pathname={pathname}
                />
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <Avatar size="sm" className="rounded-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {roleLabels[user.role]}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--anchor-width] min-w-56"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar size="sm" className="rounded-lg">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
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

function CollapsibleNavGroup({
  items,
  pathname,
}: {
  items: typeof navigation[number]["items"]
  pathname: string
}) {
  const hasActive = items.some((item) => pathname === item.href)

  return (
    <Collapsible defaultOpen={hasActive}>
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              render={<Link href={item.href} />}
              isActive={isActive}
              tooltip={item.title}
              className={cn(
                isActive &&
                  "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary"
              )}
            >
              <item.icon className={cn("size-4", isActive && "text-primary")} />
              <span>{item.title}</span>
            </SidebarMenuButton>
            {item.badge != null && (
              <SidebarMenuBadge
                className={cn(
                  "rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold text-primary"
                )}
              >
                {item.badge}
              </SidebarMenuBadge>
            )}
          </SidebarMenuItem>
        )
      })}
    </Collapsible>
  )
}
