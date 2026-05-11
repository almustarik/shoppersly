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
  ExternalLink,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { mockOrders, COURIER_LABELS, PAYMENT_METHOD_LABELS } from "@/mock/orders-data"
import { OrderStatusBadge, PaymentStatusBadge } from "../_components/order-status-badge"
import { OrderTimeline } from "../_components/order-timeline"

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export default function OrderDetailPage() {
  const params = useParams()
  const [newNote, setNewNote] = React.useState("")

  const order = mockOrders.find((o) => o.id === params.id)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <Button variant="outline" render={<Link href="/orders" />}>
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
      <motion.div {...fadeIn} className="flex flex-col gap-4">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
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
              <Button size="sm" className="gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Confirm
              </Button>
            )}
            {canPack && (
              <Button size="sm" className="gap-1.5">
                <Package className="size-3.5" />
                Pack
              </Button>
            )}
            {canShip && (
              <Button size="sm" className="gap-1.5">
                <Truck className="size-3.5" />
                Ship
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-1.5">
              <Printer className="size-3.5" />
              Print
            </Button>
            {canCancel && (
              <Button variant="destructive" size="sm" className="gap-1.5">
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
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.05 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Order Items */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="size-4 text-muted-foreground" />
                Order Items
                <Badge variant="secondary" className="ml-auto tabular-nums text-xs">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                        {item.qty}x
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold tabular-nums">
                        ৳{(item.price * item.qty).toLocaleString("en-BD")}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-xs text-muted-foreground tabular-nums">
                          ৳{item.price.toLocaleString("en-BD")} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2 px-4 py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">৳{order.subtotal.toLocaleString("en-BD")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="tabular-nums">৳{order.deliveryCharge.toLocaleString("en-BD")}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-emerald-600 tabular-nums">
                      -৳{order.discount.toLocaleString("en-BD")}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">৳{order.total.toLocaleString("en-BD")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="size-4 text-muted-foreground" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</p>
                  <p className="mt-1 text-sm font-medium">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
                  <div className="mt-1">
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</p>
                  <p className="mt-1 text-sm font-bold tabular-nums">৳{order.total.toLocaleString("en-BD")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="size-4 text-muted-foreground" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <OrderTimeline entries={[...order.timeline].reverse()} />
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="size-4 text-muted-foreground" />
                Notes & Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {order.notes.length > 0 ? (
                  order.notes.map((note, i) => (
                    <div
                      key={i}
                      className="rounded-lg border bg-muted/30 px-3 py-2 text-sm"
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
                    className="min-h-[60px]"
                  />
                  <Button size="icon" className="shrink-0 self-end" disabled={!newNote.trim()}>
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          {/* Customer Info */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
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
                    <p className="text-sm font-medium">{order.customer.phone}</p>
                    <div className="mt-1 flex gap-1">
                      <Button variant="outline" size="xs" className="gap-1">
                        <Copy className="size-3" />
                        Copy
                      </Button>
                      <Button variant="outline" size="xs" className="gap-1">
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
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Truck className="size-4 text-muted-foreground" />
                Delivery Info
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Courier
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {order.courier ? COURIER_LABELS[order.courier] : "Not assigned"}
                  </p>
                </div>
                {order.trackingId && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Tracking ID
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">
                        {order.trackingId}
                      </code>
                      <Button variant="ghost" size="icon-xs">
                        <Copy className="size-3" />
                      </Button>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Delivery Charge
                  </p>
                  <p className="mt-1 text-sm font-medium tabular-nums">
                    ৳{order.deliveryCharge.toLocaleString("en-BD")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Destination
                  </p>
                  <p className="mt-1 text-sm">
                    {order.customer.address}, {order.customer.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Meta */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Source</span>
                  <Badge variant="outline" className="capitalize text-xs">{order.source}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>{format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{format(new Date(order.updatedAt), "MMM d, yyyy h:mm a")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
