"use client"

import { use, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Users,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  CreditCard,
  Truck,
  MessageSquare,
  StickyNote,
  Plus,
  Crown,
  UserCheck,
  UserPlus,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { customers } from "@/mock/customers-data"
import type { CustomerSegment, OrderStatus } from "@/types"

const segmentConfig: Record<
  CustomerSegment,
  { label: string; icon: typeof Crown; className: string }
> = {
  vip: { label: "VIP", icon: Crown, className: "bg-amber-500/10 text-amber-700 ring-amber-500/20" },
  regular: { label: "Regular", icon: UserCheck, className: "bg-blue-500/10 text-blue-700 ring-blue-500/20" },
  new: { label: "New", icon: UserPlus, className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" },
  "at-risk": { label: "At-risk", icon: AlertCircle, className: "bg-red-500/10 text-red-700 ring-red-500/20" },
}

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-zinc-500/10 text-zinc-600 ring-zinc-500/20" },
  confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-700 ring-blue-500/20" },
  processing: { label: "Processing", className: "bg-amber-500/10 text-amber-700 ring-amber-500/20" },
  shipped: { label: "Shipped", className: "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20" },
  delivered: { label: "Delivered", className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-700 ring-red-500/20" },
  refunded: { label: "Refunded", className: "bg-orange-500/10 text-orange-700 ring-orange-500/20" },
}

const activityIcons = {
  order_placed: Package,
  payment_received: CreditCard,
  delivered: Truck,
  message_sent: MessageSquare,
  note_added: StickyNote,
  refund: DollarSign,
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const customer = customers.find((c) => c.id === id)
  const [noteText, setNoteText] = useState("")

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Users className="size-12 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold">Customer not found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The customer you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/customers" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-1.5" />
            Back to Customers
          </Button>
        </Link>
      </div>
    )
  }

  const seg = segmentConfig[customer.segment]
  const SegIcon = seg.icon

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <motion.div {...fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Link href="/customers">
            <Button variant="ghost" size="icon-sm" className="mt-1">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="size-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${seg.className}`}>
                  <SegIcon className="size-3" />
                  {seg.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Phone className="size-3.5" />
                  {customer.phone}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="size-3.5" />
                  {customer.email}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {customer.address}, {customer.city}
                </span>
              </div>
              {customer.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {customer.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-12 sm:ml-0">
          <Button variant="outline">
            <MessageSquare className="size-4 mr-1.5" />
            Message
          </Button>
          <Button>
            <ShoppingBag className="size-4 mr-1.5" />
            Create Order
          </Button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total Orders",
              value: customer.totalOrders.toString(),
              icon: ShoppingBag,
              color: "text-primary",
            },
            {
              label: "Total Spent",
              value: formatPrice(customer.totalSpent),
              icon: TrendingUp,
              color: "text-emerald-600",
            },
            {
              label: "Avg. Order Value",
              value: formatPrice(customer.averageOrderValue),
              icon: DollarSign,
              color: "text-blue-600",
            },
            {
              label: "Last Order",
              value: timeAgo(customer.lastOrderDate),
              icon: Calendar,
              color: "text-amber-600",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                      <stat.icon className={`size-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
        <Tabs defaultValue="orders">
          <TabsList variant="line">
            <TabsTrigger value="orders">
              <ShoppingBag className="size-4" />
              Orders ({customer.orders.length})
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Clock className="size-4" />
              Activity ({customer.activities.length})
            </TabsTrigger>
            <TabsTrigger value="notes">
              <StickyNote className="size-4" />
              Notes ({customer.notes.length})
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {customer.orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag className="size-10 text-muted-foreground/40 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No orders yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {customer.orders.map((order, i) => {
                      const statusCfg = orderStatusConfig[order.status]
                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                              <Package className="size-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                #{order.id.toUpperCase()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(order.date)} &middot; {order.items}{" "}
                                {order.items === 1 ? "item" : "items"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold">
                              {formatPrice(order.total)}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${statusCfg.className}`}
                            >
                              {statusCfg.label}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {customer.activities.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="size-10 text-muted-foreground/40 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No activity yet</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />
                    <div className="space-y-6">
                      {customer.activities.map((activity, i) => {
                        const Icon = activityIcons[activity.type]
                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="relative flex gap-3 pl-0"
                          >
                            <div className="relative z-10 flex size-[36px] shrink-0 items-center justify-center rounded-full bg-muted ring-4 ring-background">
                              <Icon className="size-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-sm">{activity.description}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {formatDateTime(activity.date)}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-4">
            <div className="space-y-4">
              {/* Add Note */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add a Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Write an internal note about this customer..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end">
                    <Button size="sm" disabled={!noteText.trim()}>
                      <Plus className="size-3.5 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Notes */}
              {customer.notes.length === 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <StickyNote className="size-10 text-muted-foreground/40 mb-3" />
                      <p className="text-sm font-medium text-muted-foreground">
                        No notes yet
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Add internal notes about this customer
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                customer.notes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed">{note.content}</p>
                        <Separator className="my-3" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-medium">{note.author}</span>
                          <span>{formatDate(note.date)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
