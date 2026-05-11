"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Bell, Moon, Search, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/app-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/orders": "Orders",
  "/products": "Products",
  "/customers": "Customers",
  "/inbox": "Inbox",
  "/campaigns": "Campaigns",
  "/payments": "Payments",
  "/analytics": "Analytics",
  "/logistics": "Logistics",
  "/settings": "Settings",
  "/team": "Team",
}

export function Header() {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const { user, notifications, setCommandPaletteOpen } = useAppStore()

  const unreadCount = notifications.filter((n) => !n.read).length

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const pageTitle = breadcrumbMap[pathname] ?? "Dashboard"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <h1 className="text-sm font-medium">{pageTitle}</h1>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="hidden h-8 w-64 justify-start gap-2 text-muted-foreground md:flex"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="size-3.5" />
          <span className="text-xs">Search...</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <div className="relative">
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-center gap-2">
                    <span className="text-sm font-medium">{notification.title}</span>
                    {!notification.read && (
                      <Badge variant="default" className="ml-auto h-4 px-1 text-[10px]">
                        New
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.message}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Separator orientation="vertical" className="mx-1 h-4" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 pl-1.5"
              />
            }
          >
            <Avatar size="sm">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium md:inline-block">
              {user.name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
