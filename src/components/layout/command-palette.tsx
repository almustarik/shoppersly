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
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.href}
              onSelect={() => navigateTo(page.href)}
            >
              <page.icon className="mr-2 size-4 text-muted-foreground" />
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem key={action.name} onSelect={() => setCommandPaletteOpen(false)}>
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
            >
              <item.icon className="mr-2 size-4 text-muted-foreground" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
