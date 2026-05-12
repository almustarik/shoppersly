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
  SlidersHorizontal,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { PageHeader } from "@/components/ui/page-header"
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton"

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
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "all">("all")
  const [paymentFilter, setPaymentFilter] = React.useState<PaymentStatus | "all">("all")
  const [courierFilter, setCourierFilter] = React.useState<Courier | "all">("all")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  const bulkBarRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && selectedCount > 0) {
        setRowSelection({})
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

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

  const filterControls = (
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
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full"
    >
      {/* Page Header */}
      <PageHeader title="Orders" count={mockOrders.length}>
        <Button
          render={<Link href="/orders/create" />}
          className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
        >
          <Plus className="size-4" />
          Create Order
        </Button>
      </PageHeader>

      {/* Tabs + Filters + Table */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as string); setRowSelection({}) }}>
        <div className="flex flex-col gap-4">
          <TabsList variant="line" className="w-full justify-start overflow-x-auto">
            {statusTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-1.5 transition-all duration-200"
              >
                {tab.label}
                {tabCounts[tab.value] != null && (
                  <span className="ml-0.5 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground">
                    {tabCounts[tab.value]}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Desktop filters */}
          <div className="hidden md:block">
            {filterControls}
          </div>

          {/* Mobile filter button + sheet */}
          <div className="flex md:hidden">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
                  />
                }
              >
                <SlidersHorizontal className="size-3.5" />
                Filters
                {hasActiveFilters && (
                  <span className="flex size-1.5 rounded-full bg-primary" />
                )}
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[80dvh] rounded-t-2xl p-0">
                <SheetHeader className="px-6 pt-6 pb-2">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your orders</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 px-6 pb-6">
                  {filterControls}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <DataTableSkeleton rows={8} columns={8} />
            ) : (
              <OrdersTable
                data={filteredOrders}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
              />
            )}
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
            role="toolbar"
            aria-label={`Bulk actions for ${selectedCount} selected orders`}
            ref={bulkBarRef}
          >
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent pointer-events-none" />
            <div className="relative flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-lg">
              <span className="text-sm font-medium tabular-nums mr-1">
                {selectedCount} selected
              </span>
              <div className="h-5 w-px bg-border" aria-hidden="true" />
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
                aria-label="Confirm selected orders"
              >
                <CheckCircle2 className="size-3.5" />
                Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
                aria-label="Pack selected orders"
              >
                <Package className="size-3.5" />
                Pack
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
                aria-label="Print labels for selected orders"
              >
                <Printer className="size-3.5" />
                <span className="hidden sm:inline">Print Labels</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 transition-colors duration-150 active:scale-[0.98]"
                aria-label="Assign courier to selected orders"
              >
                <Truck className="size-3.5" />
                <span className="hidden sm:inline">Assign Courier</span>
              </Button>
              <div className="h-5 w-px bg-border" aria-hidden="true" />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setRowSelection({})}
                className="transition-colors duration-150"
                aria-label="Dismiss selection"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
