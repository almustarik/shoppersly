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
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
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

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Users className="size-12 text-[#64748B]/30 mb-4" />
        <h2 className="text-lg font-semibold text-[#0F172A]">Customer not found</h2>
        <p className="text-[14px] text-[#64748B] mt-1">
          The customer you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/customers" className="mt-4">
          <Button variant="outline" className="border-[#E2E8F0]">
            <ArrowLeft className="size-4 mr-1.5" />
            Back to Customers
          </Button>
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
          <Link href="/customers">
            <button className="flex items-center justify-center size-9 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors mt-1">
              <ArrowLeft className="size-4" />
            </button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-lg font-bold shrink-0">
              {getInitials(customer.name)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold tracking-tight text-[#0F172A]">{customer.name}</h1>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${seg.className}`}>
                  {seg.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[13px] text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="size-3.5" />
                  {customer.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  {customer.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {customer.address}, {customer.city}
                </span>
              </div>
              {customer.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {customer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 text-[11px] font-medium text-[#64748B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-12 sm:ml-0">
          <Button variant="outline" className="border-[#E2E8F0]">
            <MessageSquare className="size-4 mr-1.5" />
            Message
          </Button>
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
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
                    <p className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">{stat.label}</p>
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
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="size-10 text-[#64748B]/30 mb-3" />
                  <p className="text-[14px] font-medium text-[#64748B]">No orders yet</p>
                </div>
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
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-[#F8FAFC]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <Package className="size-4 text-[#64748B]" />
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-[#0F172A]">
                              #{order.id.toUpperCase()}
                            </p>
                            <p className="text-[12px] text-[#64748B]">
                              {formatDate(order.date)} &middot; {order.items}{" "}
                              {order.items === 1 ? "item" : "items"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[14px] font-semibold text-[#0F172A] tabular-nums">
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
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Clock className="size-10 text-[#64748B]/30 mb-3" />
                  <p className="text-[14px] font-medium text-[#64748B]">No activity yet</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-[17px] top-2 bottom-2 w-px bg-[#E2E8F0]" />
                  <div className="space-y-6">
                    {customer.activities.map((activity, i) => {
                      const Icon = activityIcons[activity.type]
                      const dotColor = activityColors[activity.type] || "bg-[#64748B]"
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="relative flex gap-3 pl-0"
                        >
                          <div className={`relative z-10 flex size-[36px] shrink-0 items-center justify-center rounded-full ${dotColor} ring-4 ring-white`}>
                            <Icon className="size-4 text-white" />
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-[14px] text-[#0F172A]">{activity.description}</p>
                            <p className="text-[12px] text-[#64748B] mt-0.5">
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
              {/* Add Note */}
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B] mb-3">
                  Add a Note
                </h3>
                <Textarea
                  placeholder="Write an internal note about this customer..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="min-h-[80px] border-[#E2E8F0]"
                />
                <div className="flex justify-end mt-3">
                  <Button size="sm" disabled={!noteText.trim()} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
                    <Plus className="size-3.5 mr-1" />
                    Add Note
                  </Button>
                </div>
              </div>

              {/* Existing Notes */}
              {customer.notes.length === 0 ? (
                <div className="rounded-xl border border-[#E2E8F0] bg-white">
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <StickyNote className="size-10 text-[#64748B]/30 mb-3" />
                    <p className="text-[14px] font-medium text-[#64748B]">
                      No notes yet
                    </p>
                    <p className="text-[12px] text-[#64748B] mt-0.5">
                      Add internal notes about this customer
                    </p>
                  </div>
                </div>
              ) : (
                customer.notes.map((note, i) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
                      <p className="text-[14px] leading-relaxed text-[#0F172A]">{note.content}</p>
                      <div className="h-px bg-[#F1F5F9] my-3" />
                      <div className="flex items-center justify-between text-[12px] text-[#64748B]">
                        <span className="font-medium">{note.author}</span>
                        <span>{formatDate(note.date)}</span>
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
