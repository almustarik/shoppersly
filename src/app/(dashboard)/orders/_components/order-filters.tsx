"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"
import type { Courier, OrderStatus, PaymentStatus } from "@/mock/orders-data"

interface OrderFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: OrderStatus | "all"
  onStatusFilterChange: (value: OrderStatus | "all") => void
  paymentFilter: PaymentStatus | "all"
  onPaymentFilterChange: (value: PaymentStatus | "all") => void
  courierFilter: Courier | "all"
  onCourierFilterChange: (value: Courier | "all") => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function OrderFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
  courierFilter,
  onCourierFilterChange,
  onReset,
  hasActiveFilters,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="relative w-full max-w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          role="searchbox"
          aria-label="Search orders"
          placeholder="Search orders, customers..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 rounded-lg pl-9 transition-colors duration-150"
        />
      </div>

      <Select
        value={statusFilter}
        onValueChange={(v) => onStatusFilterChange(v as OrderStatus | "all")}
      >
        <SelectTrigger
          className="h-9 w-[140px] rounded-lg transition-colors duration-150"
          aria-label="Filter by status"
        >
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="packed">Packed</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="returned">Returned</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={paymentFilter}
        onValueChange={(v) => onPaymentFilterChange(v as PaymentStatus | "all")}
      >
        <SelectTrigger
          className="h-9 w-[140px] rounded-lg transition-colors duration-150"
          aria-label="Filter by payment status"
        >
          <SelectValue placeholder="Payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
          <SelectItem value="partial">Partial</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={courierFilter}
        onValueChange={(v) => onCourierFilterChange(v as Courier | "all")}
      >
        <SelectTrigger
          className="h-9 w-[140px] rounded-lg transition-colors duration-150"
          aria-label="Filter by courier"
        >
          <SelectValue placeholder="Courier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Couriers</SelectItem>
          <SelectItem value="pathao">Pathao</SelectItem>
          <SelectItem value="steadfast">Steadfast</SelectItem>
          <SelectItem value="redx">RedX</SelectItem>
          <SelectItem value="paperfly">Paperfly</SelectItem>
        </SelectContent>
      </Select>

      <div
        className={`transition-opacity duration-200 ${hasActiveFilters ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-150 active:scale-[0.98]"
          aria-label="Reset all filters"
        >
          <X className="size-3.5" />
          Reset
        </Button>
      </div>
    </div>
  )
}
