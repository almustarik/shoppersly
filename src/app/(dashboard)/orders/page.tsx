"use client"

import * as React from "react"
import Link from "next/link"
import { type RowSelectionState } from "@tanstack/react-table"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  CheckCircle2,
  Package,
  Printer,
  Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { mockOrders, type OrderStatus } from "@/mock/orders-data"
import { OrderFilters } from "./_components/order-filters"
import { OrdersTable } from "./_components/orders-table"
import type { Courier, PaymentStatus } from "@/mock/orders-data"

const statusTabs: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "packed", label: "Packed" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "returned", label: "Returned" },
  { value: "cancelled", label: "Cancelled" },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "all">("all")
  const [paymentFilter, setPaymentFilter] = React.useState<PaymentStatus | "all">("all")
  const [courierFilter, setCourierFilter] = React.useState<Courier | "all">("all")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const filteredOrders = React.useMemo(() => {
    let result = mockOrders

    if (activeTab !== "all") {
      result = result.filter((o) => o.status === activeTab)
    }

    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter)
    }

    if (paymentFilter !== "all") {
      result = result.filter((o) => o.paymentStatus === paymentFilter)
    }

    if (courierFilter !== "all") {
      result = result.filter((o) => o.courier === courierFilter)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (o) =>
          o.orderId.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.phone.includes(q)
      )
    }

    return result
  }, [activeTab, statusFilter, paymentFilter, courierFilter, search])

  const tabCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: mockOrders.length }
    for (const order of mockOrders) {
      counts[order.status] = (counts[order.status] || 0) + 1
    }
    return counts
  }, [])

  const selectedCount = Object.keys(rowSelection).length
  const hasActiveFilters =
    statusFilter !== "all" || paymentFilter !== "all" || courierFilter !== "all" || search !== ""

  const resetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setPaymentFilter("all")
    setCourierFilter("all")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold tracking-tight">Orders</h1>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
            {mockOrders.length}
          </span>
        </div>
        <Button render={<Link href="/orders/create" />} className="gap-1.5">
          <Plus className="size-4" />
          Create Order
        </Button>
      </div>

      {/* Tabs + Filters + Table */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as string); setRowSelection({}) }}>
        <div className="flex flex-col gap-4">
          <TabsList variant="line" className="w-full justify-start overflow-x-auto">
            {statusTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                {tab.label}
                {tabCounts[tab.value] != null && (
                  <span className="ml-0.5 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground">
                    {tabCounts[tab.value]}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <OrderFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            paymentFilter={paymentFilter}
            onPaymentFilterChange={setPaymentFilter}
            courierFilter={courierFilter}
            onCourierFilterChange={setCourierFilter}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <TabsContent value={activeTab}>
            <OrdersTable
              data={filteredOrders}
              rowSelection={rowSelection}
              onRowSelectionChange={setRowSelection}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-6"
          >
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent pointer-events-none" />
            <div className="relative flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-card px-4 py-2.5 shadow-lg">
              <span className="text-sm font-medium mr-1">
                {selectedCount} selected
              </span>
              <div className="h-5 w-px bg-border" />
              <Button variant="outline" size="sm" className="gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Confirm
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Package className="size-3.5" />
                Pack
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Printer className="size-3.5" />
                Print Labels
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Truck className="size-3.5" />
                Assign Courier
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
