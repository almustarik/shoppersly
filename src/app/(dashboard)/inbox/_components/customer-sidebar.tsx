"use client"

import * as React from "react"
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Tag,
  X,
  Plus,
  StickyNote,
} from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Customer } from "@/mock/inbox-data"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const statusColors: Record<string, string> = {
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
}

interface CustomerSidebarProps {
  customer: Customer
  onClose: () => void
}

export function CustomerSidebar({ customer, onClose }: CustomerSidebarProps) {
  const [tags, setTags] = React.useState(customer.tags)
  const [notes, setNotes] = React.useState(customer.notes)
  const [isEditingNotes, setIsEditingNotes] = React.useState(false)

  React.useEffect(() => {
    setTags(customer.tags)
    setNotes(customer.notes)
    setIsEditingNotes(false)
  }, [customer.id, customer.tags, customer.notes])

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 280, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="flex h-full flex-col overflow-hidden border-l border-[#E2E8F0] bg-white"
    >
      <div className="flex flex-none items-center justify-between border-b border-[#E2E8F0] px-4 h-14">
        <h3 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
          Customer Info
        </h3>
        <button
          onClick={onClose}
          className="flex items-center justify-center size-7 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-5 p-4">
          {/* Profile */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center justify-center size-14 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-[14px] font-bold">
              {getInitials(customer.name)}
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#0F172A]">{customer.name}</h4>
              <p className="text-[12px] text-[#64748B]">
                {customer.isOnline ? (
                  <span className="text-[#10B981]">Online now</span>
                ) : (
                  "Offline"
                )}
              </p>
            </div>
          </div>

          <div className="h-px bg-[#F1F5F9]" />

          {/* Contact Info */}
          <div className="space-y-2.5">
            <h5 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
              Contact
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-[13px]">
                <Phone className="size-3.5 text-[#64748B]" />
                <span className="text-[#0F172A]/80">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px]">
                <Mail className="size-3.5 text-[#64748B]" />
                <span className="truncate text-[#0F172A]/80">
                  {customer.email}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px]">
                <MapPin className="size-3.5 text-[#64748B]" />
                <span className="text-[#0F172A]/80">{customer.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px]">
                <ExternalLink className="size-3.5 text-[#64748B]" />
                <a
                  href={customer.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[#4F46E5] hover:underline"
                >
                  {customer.channel === "facebook"
                    ? "Facebook Profile"
                    : "Instagram Profile"}
                </a>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#F1F5F9]" />

          {/* Stats - 2x2 grid */}
          <div className="space-y-2.5">
            <h5 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
              Statistics
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-[#E2E8F0] p-2.5 text-center">
                <ShoppingBag className="mx-auto size-4 text-[#4F46E5]" />
                <p className="mt-1 text-[16px] font-bold tabular-nums text-[#0F172A]">
                  {customer.totalOrders}
                </p>
                <p className="text-[10px] text-[#64748B]">Orders</p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] p-2.5 text-center">
                <DollarSign className="mx-auto size-4 text-[#10B981]" />
                <p className="mt-1 text-[16px] font-bold tabular-nums text-[#0F172A]">
                  {(customer.totalSpent / 1000).toFixed(1)}k
                </p>
                <p className="text-[10px] text-[#64748B]">Spent</p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] p-2.5 text-center">
                <TrendingUp className="mx-auto size-4 text-[#F59E0B]" />
                <p className="mt-1 text-[16px] font-bold tabular-nums text-[#0F172A]">
                  {(customer.avgOrderValue / 1000).toFixed(1)}k
                </p>
                <p className="text-[10px] text-[#64748B]">Avg</p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] p-2.5 text-center">
                <ShoppingBag className="mx-auto size-4 text-sky-500" />
                <p className="mt-1 text-[16px] font-bold tabular-nums text-[#0F172A]">
                  {customer.recentOrders.length}
                </p>
                <p className="text-[10px] text-[#64748B]">Recent</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#F1F5F9]" />

          {/* Recent Orders */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                Recent Orders
              </h5>
              <span className="text-[10px] text-[#64748B]">
                Last 3
              </span>
            </div>
            <div className="space-y-2">
              {customer.recentOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#0F172A]">
                      {order.id}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-semibold capitalize",
                        statusColors[order.status] || "bg-zinc-50 text-zinc-600 border-zinc-200"
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[12px] text-[#64748B]">
                    {order.items}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#64748B]">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-[12px] font-semibold text-[#0F172A] tabular-nums">
                      ৳{order.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#F1F5F9]" />

          {/* Tags */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                Tags
              </h5>
              <button className="flex items-center justify-center size-6 rounded-md text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors">
                <Plus className="size-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.length === 0 ? (
                <p className="text-[12px] text-[#64748B]">No tags yet</p>
              ) : (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] pl-2 pr-1 py-0.5 text-[11px] font-medium text-[#64748B]"
                  >
                    <Tag className="size-2.5" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-[#E2E8F0] transition-colors"
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="size-2.5" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="h-px bg-[#F1F5F9]" />

          {/* Notes */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider font-semibold text-[#64748B]">
                <StickyNote className="size-3" />
                Notes
              </h5>
              <button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                className="text-[10px] font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors"
              >
                {isEditingNotes ? "Save" : "Edit"}
              </button>
            </div>
            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-2.5 text-[12px] leading-relaxed text-[#0F172A] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                rows={3}
                placeholder="Add a note about this customer..."
              />
            ) : (
              <p className="text-[12px] leading-relaxed text-[#64748B]">
                {notes || "No notes yet. Click Edit to add one."}
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  )
}
