export type UserRole = "owner" | "admin" | "manager" | "agent" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  createdAt: string
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotal: number
  tax: number
  shipping: number
  total: number
  channel: string
  createdAt: string
  updatedAt: string
}

export type ProductCategory =
  | "Fashion"
  | "Electronics"
  | "Beauty"
  | "Home"
  | "Food"

export interface ProductVariant {
  id: string
  name: string
  type: "size" | "color"
  values: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  sku: string
  price: number
  compareAtPrice?: number
  costPrice?: number
  stock: number
  lowStockThreshold: number
  category: ProductCategory
  images: string[]
  variants: ProductVariant[]
  status: "active" | "draft" | "archived"
  totalSold: number
  revenue: number
  views: number
  createdAt: string
  updatedAt: string
}

export type CustomerSegment = "vip" | "regular" | "new" | "at-risk"

export interface CustomerOrder {
  id: string
  date: string
  total: number
  status: OrderStatus
  items: number
}

export interface CustomerActivity {
  id: string
  type: "order_placed" | "payment_received" | "delivered" | "message_sent" | "note_added" | "refund"
  description: string
  date: string
}

export interface CustomerNote {
  id: string
  content: string
  author: string
  date: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  address: string
  city: string
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string
  segment: CustomerSegment
  tags: string[]
  channel: string
  orders: CustomerOrder[]
  activities: CustomerActivity[]
  notes: CustomerNote[]
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface Campaign {
  id: string
  name: string
  status: "draft" | "active" | "paused" | "completed"
  channel: string
  reach: number
  engagement: number
  startDate: string
  endDate?: string
}

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  disabled?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}
