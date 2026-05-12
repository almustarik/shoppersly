"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Bell, Moon, Search, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/app-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const segmentLabels: Record<string, string> = {
  orders: "Orders",
  products: "Products",
  customers: "Customers",
  inbox: "Inbox",
  campaigns: "Campaigns",
  payments: "Payments",
  analytics: "Analytics",
  logistics: "Logistics",
  settings: "Settings",
  team: "Team",
}

function useBreadcrumbs(pathname: string) {
  if (pathname === "/") return [{ label: "Home", href: "/", current: true }]

  const segments = pathname.split("/").filter(Boolean)
  const crumbs: { label: string; href: string; current: boolean }[] = [
    { label: "Home", href: "/", current: false },
  ]

  let path = ""
  segments.forEach((segment, i) => {
    path += `/${segment}`
    crumbs.push({
      label: segmentLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1),
      href: path,
      current: i === segments.length - 1,
    })
  })

  return crumbs
}

export function Header() {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const { user, notifications, setCommandPaletteOpen } = useAppStore()

  const hasUnread = notifications.some((n) => !n.read)
  const breadcrumbs = useBreadcrumbs(pathname)

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger className="-ml-1 size-9 rounded-lg" />
      <Separator orientation="vertical" className="mr-1 h-4" />

      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-muted-foreground/40 select-none">/</span>
            )}
            {crumb.current ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden h-9 w-full max-w-[400px] items-center gap-2 rounded-lg border-0 bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
        >
          <Search className="size-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1 text-left text-[13px]">
            Search orders, products, customers...
          </span>
          <kbd className="pointer-events-none ml-2 inline-flex h-5 items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[11px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="size-9 rounded-lg md:hidden"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="size-[18px]" strokeWidth={1.75} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="size-9 rounded-lg" />
            }
          >
            <div className="relative">
              <Bell className="size-[18px]" strokeWidth={1.75} />
              {hasUnread && (
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-destructive animate-pulse" />
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
                <DropdownMenuItem
                  key={notification.id}
                  className="flex-col items-start gap-1 p-3"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="text-sm font-medium">
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="ml-auto size-1.5 rounded-full bg-primary" />
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
          className="size-9 rounded-lg"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Sun
            className="size-[18px] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
            strokeWidth={1.75}
          />
          <Moon
            className="absolute size-[18px] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
            strokeWidth={1.75}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Separator orientation="vertical" className="mx-1 h-4" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-lg pl-1.5"
              />
            }
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-px -right-px size-2.5 rounded-full border-2 border-card bg-success" />
            </div>
            <span className="hidden text-[13px] font-medium md:inline-block">
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
