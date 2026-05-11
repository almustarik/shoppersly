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
  Package,
} from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
  delivered: "bg-emerald-500/10 text-emerald-700",
  shipped: "bg-blue-500/10 text-blue-700",
  processing: "bg-amber-500/10 text-amber-700",
  cancelled: "bg-red-500/10 text-red-700",
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
      animate={{ width: 300, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="flex h-full flex-col overflow-hidden border-l border-border bg-card"
    >
      <div className="flex flex-none items-center justify-between border-b border-border px-4 py-2.5">
        <h3 className="text-sm font-semibold text-foreground">
          Customer Info
        </h3>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="size-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-5 p-4">
          {/* Profile */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{customer.name}</h4>
              <p className="text-xs text-muted-foreground">
                {customer.isOnline ? (
                  <span className="text-emerald-600">Online now</span>
                ) : (
                  "Offline"
                )}
              </p>
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="size-3.5 text-muted-foreground" />
                <span className="text-foreground/80">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="size-3.5 text-muted-foreground" />
                <span className="truncate text-foreground/80">
                  {customer.email}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="size-3.5 text-muted-foreground" />
                <span className="text-foreground/80">{customer.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <ExternalLink className="size-3.5 text-muted-foreground" />
                <a
                  href={customer.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-primary hover:underline"
                >
                  {customer.channel === "facebook"
                    ? "Facebook Profile"
                    : "Instagram Profile"}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Statistics
            </h5>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <ShoppingBag className="mx-auto size-4 text-primary" />
                <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
                  {customer.totalOrders}
                </p>
                <p className="text-[10px] text-muted-foreground">Orders</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <DollarSign className="mx-auto size-4 text-emerald-600" />
                <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
                  {(customer.totalSpent / 1000).toFixed(1)}k
                </p>
                <p className="text-[10px] text-muted-foreground">Spent</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <TrendingUp className="mx-auto size-4 text-amber-600" />
                <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
                  {(customer.avgOrderValue / 1000).toFixed(1)}k
                </p>
                <p className="text-[10px] text-muted-foreground">Avg</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recent Orders */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Recent Orders
              </h5>
              <span className="text-[10px] text-muted-foreground">
                Last 3
              </span>
            </div>
            <div className="space-y-2">
              {customer.recentOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-border/50 bg-background p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      {order.id}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-4 text-[10px] capitalize",
                        statusColors[order.status]
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {order.items}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      ৳{order.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h5>
              <Button variant="ghost" size="icon-xs" aria-label="Add tag">
                <Plus className="size-3.5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.length === 0 ? (
                <p className="text-xs text-muted-foreground">No tags yet</p>
              ) : (
                tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 pr-1 text-xs"
                  >
                    <Tag className="size-2.5" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10"
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="size-2.5" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <StickyNote className="size-3" />
                Notes
              </h5>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                aria-label="Edit notes"
              >
                <span className="text-[10px]">
                  {isEditingNotes ? "Save" : "Edit"}
                </span>
              </Button>
            </div>
            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-lg border border-input bg-background p-2 text-xs leading-relaxed outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                rows={3}
                placeholder="Add a note about this customer..."
              />
            ) : (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {notes || "No notes yet. Click Edit to add one."}
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  )
}
