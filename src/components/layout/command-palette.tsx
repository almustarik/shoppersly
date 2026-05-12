"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  FileText,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  UserCog,
  Users,
} from "lucide-react"

import { useAppStore } from "@/store/app-store"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const pages = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Inbox", icon: Inbox, href: "/inbox" },
  { name: "Campaigns", icon: Megaphone, href: "/campaigns" },
  { name: "Payments", icon: CreditCard, href: "/payments" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Logistics", icon: Truck, href: "/logistics" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Team", icon: UserCog, href: "/team" },
]

const quickActions = [
  { name: "Create Order", icon: ShoppingCart, shortcut: "O" },
  { name: "Add Product", icon: Package, shortcut: "P" },
  { name: "Add Customer", icon: Users, shortcut: "C" },
  { name: "New Campaign", icon: Megaphone, shortcut: "N" },
  { name: "Generate Report", icon: FileText, shortcut: "R" },
]

const recentItems = [
  { name: "Order #1042 — Sarah Chen", icon: ShoppingCart, href: "/orders/1042" },
  { name: "Wireless Earbuds Pro", icon: Package, href: "/products/earbuds-pro" },
  { name: "Summer Sale Campaign", icon: Megaphone, href: "/campaigns/summer-sale" },
]

export function CommandPalette() {
  const router = useRouter()
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  function navigateTo(href: string) {
    setCommandPaletteOpen(false)
    router.push(href)
  }

  return (
    <CommandDialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      title="Command Palette"
      description="Search pages, actions, and recent items"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-3">
            <Search className="size-10 text-muted-foreground/20" strokeWidth={1.5} />
            <div>
              <p className="font-medium text-muted-foreground">No results found</p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Try a different search term
              </p>
            </div>
          </div>
        </CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.href}
              onSelect={() => navigateTo(page.href)}
              className="transition-colors duration-100"
            >
              <page.icon className="mr-2 size-4 text-muted-foreground" />
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem
              key={action.name}
              onSelect={() => setCommandPaletteOpen(false)}
              className="transition-colors duration-100"
            >
              <div className="mr-2 flex size-4 items-center justify-center">
                <Plus className="size-3 text-muted-foreground" />
              </div>
              <span>{action.name}</span>
              <CommandShortcut>&#8984;{action.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent">
          {recentItems.map((item) => (
            <CommandItem
              key={item.name}
              onSelect={() => navigateTo(item.href)}
              className="transition-colors duration-100"
            >
              <item.icon className="mr-2 size-4 text-muted-foreground" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

      <div className="flex items-center gap-3 border-t px-3 py-2" aria-hidden="true">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="inline-flex size-5 items-center justify-center rounded border bg-muted font-mono text-[10px]">↑</kbd>
          <kbd className="inline-flex size-5 items-center justify-center rounded border bg-muted font-mono text-[10px]">↓</kbd>
          <span className="ml-0.5">Navigate</span>
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="inline-flex h-5 items-center justify-center rounded border bg-muted px-1 font-mono text-[10px]">↵</kbd>
          <span className="ml-0.5">Select</span>
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="inline-flex h-5 items-center justify-center rounded border bg-muted px-1 font-mono text-[10px]">esc</kbd>
          <span className="ml-0.5">Close</span>
        </span>
      </div>
    </CommandDialog>
  )
}
