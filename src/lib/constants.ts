import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Inbox,
  Megaphone,
  CreditCard,
  BarChart3,
  Truck,
  Settings,
  UserCog,
} from "lucide-react"
import type { NavGroup, UserRole } from "@/types"

export const navigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Commerce",
    items: [
      {
        title: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        badge: 12,
      },
      {
        title: "Products",
        href: "/products",
        icon: Package,
      },
      {
        title: "Customers",
        href: "/customers",
        icon: Users,
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        title: "Inbox",
        href: "/inbox",
        icon: Inbox,
        badge: 5,
      },
      {
        title: "Campaigns",
        href: "/campaigns",
        icon: Megaphone,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Payments",
        href: "/payments",
        icon: CreditCard,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Logistics",
        href: "/logistics",
        icon: Truck,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Team",
        href: "/settings/team",
        icon: UserCog,
      },
    ],
  },
]

export const roleLabels: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Administrator",
  manager: "Manager",
  agent: "Agent",
  viewer: "Viewer",
}

export const orderStatusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "Pending", variant: "outline" },
  confirmed: { label: "Confirmed", variant: "secondary" },
  processing: { label: "Processing", variant: "default" },
  shipped: { label: "Shipped", variant: "default" },
  delivered: { label: "Delivered", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  refunded: { label: "Refunded", variant: "destructive" },
}

export const paymentStatusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "Pending", variant: "outline" },
  paid: { label: "Paid", variant: "default" },
  failed: { label: "Failed", variant: "destructive" },
  refunded: { label: "Refunded", variant: "secondary" },
}
