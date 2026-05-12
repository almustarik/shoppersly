"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { format } from "date-fns"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Truck,
  Printer,
  XCircle,
  Phone,
  MapPin,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Send,
  Copy,
  Check,
  ExternalLink,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { mockOrders, COURIER_LABELS, PAYMENT_METHOD_LABELS } from "@/mock/orders-data"
import { OrderStatusBadge, PaymentStatusBadge } from "../_components/order-status-badge"
import { OrderTimeline } from "../_components/order-timeline"

const stagger = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="xs"
      className="gap-1 transition-colors duration-150 active:scale-[0.98]"
      onClick={handleCopy}
      aria-label={label ?? `Copy ${text}`}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

function CopyIconButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      className="transition-colors duration-150"
      aria-label={label ?? `Copy ${text}`}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </Button>
  )
}

export default function OrderDetailPage() {
  const params = useParams()
  const [newNote, setNewNote] = React.useState("")

  const order = mockOrders.find((o) => o.id === params.id)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <Button
          variant="outline"
          render={<Link href="/orders" />}
          className="transition-colors duration-150 active:scale-[0.98]"
        >
          Back to Orders
        </Button>
      </div>
    )
  }

  const initials = order.customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  const canConfirm = order.status === "pending"
  const canPack = order.status === "confirmed"
  const canShip = order.status === "packed"
  const canCancel = ["pending", "confirmed"].includes(order.status)

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      {/* Back + Header */}
      <motion.div
        {...stagger}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4"
      >
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">#{order.orderId}</h1>
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {canConfirm && (
              <Button
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
              >
                <CheckCircle2 className="size-3.5" />
                Confirm
              </Button>
            )}
            {canPack && (
              <Button
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
              >
                <Package className="size-3.5" />
                Pack
              </Button>
            )}
            {canShip && (
              <Button
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
              >
                <Truck className="size-3.5" />
                Ship
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
            >
              <Printer className="size-3.5" />
              Print
            </Button>
            {canCancel && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50 transition-colors duration-150 active:scale-[0.98]"
              >
                <XCircle className="size-3.5" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Order Items + Payment */}
        <motion.div
          {...stagger}
          transition={{ duration: 0.25, delay: 0.03 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Order Items */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ShoppingBag className="size-4" />
                  Order Items
                </h3>
                <Badge variant="secondary" className="tabular-nums text-xs">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="divide-y divide-border/50">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-xs font-medium text-muted-foreground border">
                        {item.qty}x
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.variant}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-sm font-medium tabular-nums">
                        ৳{(item.price * item.qty).toLocaleString("en-BD")}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-xs text-muted-foreground tabular-nums mt-0.5">
                          ৳{item.price.toLocaleString("en-BD")} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums font-medium">৳{order.subtotal.toLocaleString("en-BD")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="tabular-nums font-medium">৳{order.deliveryCharge.toLocaleString("en-BD")}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-emerald-600 tabular-nums font-medium">
                      -৳{order.discount.toLocaleString("en-BD")}
                    </span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">৳{order.total.toLocaleString("en-BD")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CreditCard className="size-4" />
                Payment Information
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Method</p>
                  <p className="mt-1.5 text-sm font-medium">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
                  <div className="mt-1.5">
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</p>
                  <p className="mt-1.5 text-sm font-bold tabular-nums">৳{order.total.toLocaleString("en-BD")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MessageSquare className="size-4" />
                Order Timeline
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <OrderTimeline entries={[...order.timeline].reverse()} currentStatus={order.status} />
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MessageSquare className="size-4" />
                Notes & Comments
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="space-y-3">
                {order.notes.length > 0 ? (
                  order.notes.map((note, i) => (
                    <div
                      key={i}
                      className="rounded-lg border bg-muted/30 px-3 py-2.5 text-sm"
                    >
                      {note}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No notes yet</p>
                )}
                <div className="flex gap-2 pt-2">
                  <Textarea
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[80px] rounded-lg transition-colors duration-150"
                    aria-label="Add a note"
                  />
                  <Button
                    size="icon"
                    className="shrink-0 self-end transition-colors duration-150 active:scale-[0.98]"
                    disabled={!newNote.trim()}
                    aria-label="Send note"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div
          {...stagger}
          transition={{ duration: 0.25, delay: 0.06 }}
          className="flex flex-col gap-6"
        >
          {/* Customer Info */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="size-4" />
                Customer
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customer.orderCount} order{order.customer.orderCount > 1 ? "s" : ""} placed
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-mono text-[13px] font-medium">{order.customer.phone}</p>
                    <div className="mt-1 flex gap-1">
                      <CopyButton text={order.customer.phone} label="Copy phone number" />
                      <Button
                        variant="outline"
                        size="xs"
                        className="gap-1 transition-colors duration-150 active:scale-[0.98]"
                        aria-label="Call customer"
                      >
                        <ExternalLink className="size-3" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{order.customer.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer.zone ? `${order.customer.zone}, ` : ""}
                      {order.customer.city}
                    </p>
                  </div>
                </div>
                {order.customer.email && (
                  <div className="flex items-start gap-2.5">
                    <Send className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <p className="text-sm">{order.customer.email}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Truck className="size-4" />
                Delivery Info
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Courier
                  </p>
                  <p className="mt-1.5 text-sm font-medium">
                    {order.courier ? COURIER_LABELS[order.courier] : "Not assigned"}
                  </p>
                </div>
                {order.trackingId && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tracking ID
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <code className="rounded-md bg-muted/50 border px-2 py-0.5 font-mono text-[13px]">
                        {order.trackingId}
                      </code>
                      <CopyIconButton text={order.trackingId} label="Copy tracking ID" />
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Delivery Charge
                  </p>
                  <p className="mt-1.5 text-sm font-medium tabular-nums">
                    ৳{order.deliveryCharge.toLocaleString("en-BD")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Destination
                  </p>
                  <p className="mt-1.5 text-sm">
                    {order.customer.address}, {order.customer.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Meta */}
          <Card className="border rounded-xl shadow-none">
            <CardHeader className="p-6 pb-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Order Details
              </h3>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Source</span>
                  <Badge variant="outline" className="capitalize text-xs">{order.source}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="tabular-nums">{format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="tabular-nums">{format(new Date(order.updatedAt), "MMM d, yyyy h:mm a")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
