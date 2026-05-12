"use client"

import { use, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
  Clock,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { EmptyState } from "@/components/ui/empty-state"
import { customers } from "@/mock/customers-data"
import type { CustomerSegment, OrderStatus } from "@/types"

const segmentConfig: Record<
  CustomerSegment,
  { label: string; className: string }
> = {
  vip: { label: "VIP", className: "bg-violet-50 text-violet-700 border-violet-200" },
  regular: { label: "Regular", className: "bg-sky-50 text-sky-700 border-sky-200" },
  new: { label: "New", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "at-risk": { label: "At-risk", className: "bg-rose-50 text-rose-700 border-rose-200" },
}

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-zinc-50 text-zinc-600 border-zinc-200" },
  confirmed: { label: "Confirmed", className: "bg-blue-50 text-blue-700 border-blue-200" },
  processing: { label: "Processing", className: "bg-amber-50 text-amber-700 border-amber-200" },
  shipped: { label: "Shipped", className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Cancelled", className: "bg-rose-50 text-rose-700 border-rose-200" },
  refunded: { label: "Refunded", className: "bg-orange-50 text-orange-700 border-orange-200" },
}

const activityIcons = {
  order_placed: Package,
  payment_received: CreditCard,
  delivered: Truck,
  message_sent: MessageSquare,
  note_added: StickyNote,
  refund: DollarSign,
}

const activityColors = {
  order_placed: "bg-[#4F46E5]",
  payment_received: "bg-[#10B981]",
  delivered: "bg-[#10B981]",
  message_sent: "bg-sky-500",
  note_added: "bg-amber-500",
  refund: "bg-rose-500",
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

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const customer = customers.find((c) => c.id === id)
  const [noteText, setNoteText] = useState("")
  const [tags, setTags] = useState<string[]>(customer?.tags ?? [])

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <EmptyState
          icon={Users}
          title="Customer not found"
          description="The customer you're looking for doesn't exist or has been removed."
        />
        <Link
          href="/customers"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 px-2 py-1"
        >
          <ArrowLeft className="size-4" />
          Back to Customers
        </Link>
      </div>
    )
  }

  const seg = segmentConfig[customer.segment]

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <Link
            href="/customers"
            className="flex items-center justify-center size-9 rounded-lg border border-[#E2E8F0] text-muted-foreground hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors duration-150 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            aria-label="Back to customers"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-lg font-bold shrink-0 ring-4 ring-muted">
              {getInitials(customer.name)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">{customer.name}</h1>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${seg.className}`} title={`Segment: ${seg.label}`}>
                  {seg.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[13px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="size-3.5" aria-hidden="true" />
                  {customer.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="size-3.5" aria-hidden="true" />
                  {customer.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {customer.address}, {customer.city}
                </span>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <AnimatePresence mode="popLayout">
                    {tags.map((tag) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        layout
                        className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] pl-2.5 pr-1 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="flex items-center justify-center size-4 rounded-full hover:bg-[#E2E8F0] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="size-2.5" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-12 sm:ml-0">
          <Button variant="outline" className="border-[#E2E8F0] transition-colors duration-150">
            <MessageSquare className="size-4 mr-1.5" />
            Message
          </Button>
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors duration-150">
            <ShoppingBag className="size-4 mr-1.5" />
            Create Order
          </Button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.03 }}
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total Orders",
              value: customer.totalOrders.toString(),
              icon: ShoppingBag,
              color: "text-[#4F46E5]",
              bg: "bg-[#4F46E5]/10",
            },
            {
              label: "Total Spent",
              value: formatPrice(customer.totalSpent),
              icon: TrendingUp,
              color: "text-[#10B981]",
              bg: "bg-[#10B981]/10",
            },
            {
              label: "Avg. Order Value",
              value: formatPrice(customer.averageOrderValue),
              icon: DollarSign,
              color: "text-sky-600",
              bg: "bg-sky-50",
            },
            {
              label: "Last Order",
              value: timeAgo(customer.lastOrderDate),
              icon: Calendar,
              color: "text-[#F59E0B]",
              bg: "bg-[#F59E0B]/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.03 }}
            >
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`size-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{stat.label}</p>
                    <p className="text-[18px] font-bold text-[#0F172A] tabular-nums">{stat.value}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.09 }}
      >
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
            <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
              {customer.orders.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="No orders yet"
                  description="This customer hasn't placed any orders."
                />
              ) : (
                <div className="divide-y divide-[#F1F5F9]">
                  {customer.orders.map((order, i) => {
                    const statusCfg = orderStatusConfig[order.status]
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-[#F8FAFC]/50 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-muted border border-[#E2E8F0]">
                            <Package className="size-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0F172A]">
                              #{order.id.toUpperCase()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(order.date)} &middot; {order.items}{" "}
                              {order.items === 1 ? "item" : "items"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-[#0F172A] tabular-nums">
                            {formatPrice(order.total)}
                          </span>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusCfg.className}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4">
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              {customer.activities.length === 0 ? (
                <EmptyState
                  icon={Clock}
                  title="No activity yet"
                  description="Activity will appear here once the customer starts interacting."
                />
              ) : (
                <div className="relative">
                  <div className="absolute left-[17px] top-2 bottom-2 w-px bg-[#E2E8F0]" aria-hidden="true" />
                  <div className="space-y-6">
                    {customer.activities.map((activity, i) => {
                      const Icon = activityIcons[activity.type]
                      const dotColor = activityColors[activity.type] || "bg-[#64748B]"
                      const isCurrent = i === 0
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="relative flex gap-3 pl-0"
                        >
                          <div className={`relative z-10 flex size-[36px] shrink-0 items-center justify-center rounded-full ${dotColor} ring-4 ${isCurrent ? "ring-[#4F46E5]/10" : "ring-white"}`}>
                            <Icon className="size-4 text-white" />
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm text-[#0F172A]">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                              {formatDateTime(activity.date)}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
                <Label htmlFor="customer-note" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3 block">
                  Add a Note
                </Label>
                <Textarea
                  id="customer-note"
                  placeholder="Write an internal note about this customer..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="min-h-[80px] rounded-lg border-[#E2E8F0] transition-colors duration-150"
                />
                <div className="flex justify-end mt-3">
                  <Button size="sm" disabled={!noteText.trim()} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors duration-150 disabled:opacity-50">
                    <Plus className="size-3.5 mr-1" />
                    Add Note
                  </Button>
                </div>
              </div>

              {customer.notes.length === 0 ? (
                <EmptyState
                  icon={StickyNote}
                  title="No notes yet"
                  description="Add internal notes about this customer to keep your team informed."
                  className="rounded-xl border border-[#E2E8F0] bg-white"
                />
              ) : (
                customer.notes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
                      <p className="text-sm leading-relaxed text-[#0F172A]">{note.content}</p>
                      <div className="h-px bg-[#F1F5F9] my-3" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{note.author}</span>
                        <span className="tabular-nums">{formatDate(note.date)}</span>
                      </div>
                    </div>
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
