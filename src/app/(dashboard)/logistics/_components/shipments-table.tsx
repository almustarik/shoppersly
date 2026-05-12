"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, ChevronUp, MapPin, Eye, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import { cn } from "@/lib/utils"
import {
  shipmentStatusConfig,
  type Shipment,
  type ShipmentStatus,
  type CourierCode,
} from "@/mock/logistics-data"
import { DeliveryTimeline } from "./delivery-timeline"

const courierLabels: Record<CourierCode, { name: string; color: string }> = {
  pathao: {
    name: "Pathao",
    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  steadfast: {
    name: "Steadfast",
    color: "border-blue-200 bg-blue-50 text-blue-700",
  },
  redx: { name: "RedX", color: "border-red-200 bg-red-50 text-red-700" },
  paperfly: {
    name: "Paperfly",
    color: "border-orange-200 bg-orange-50 text-orange-700",
  },
}

function formatShortDate(iso: string | null) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function ShipmentsTable({ shipments }: { shipments: Shipment[] }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [courierFilter, setCourierFilter] = useState<string>("all")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesSearch =
        !search ||
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.orderId.toLowerCase().includes(search.toLowerCase()) ||
        s.customer.toLowerCase().includes(search.toLowerCase()) ||
        s.area.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "all" || s.status === statusFilter

      const matchesCourier =
        courierFilter === "all" || s.courier === courierFilter

      return matchesSearch && matchesStatus && matchesCourier
    })
  }, [shipments, search, statusFilter, courierFilter])

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search tracking ID, order, customer, area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-lg pl-9 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20"
            aria-label="Search shipments"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={courierFilter}
            onValueChange={(v) => setCourierFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20 sm:w-[140px]">
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

          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v ?? "all")}
          >
            <SelectTrigger className="w-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20 sm:w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {(Object.keys(shipmentStatusConfig) as ShipmentStatus[]).map(
                (status) => (
                  <SelectItem key={status} value={status}>
                    {shipmentStatusConfig[status].label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Tracking ID
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Order
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Courier
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Pickup
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Delivery
              </TableHead>
              <TableHead className="whitespace-nowrap bg-muted/50 text-[12px] uppercase tracking-wider">
                Area
              </TableHead>
              <TableHead className="w-10 bg-muted/50">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((shipment) => {
              const isExpanded = expandedRow === shipment.trackingId
              const statusCfg = shipmentStatusConfig[shipment.status]
              const courierCfg = courierLabels[shipment.courier]

              return (
                <TableRow
                  key={shipment.trackingId}
                  className="group cursor-pointer border-border transition-colors duration-100 hover:bg-muted/50"
                  onClick={() =>
                    setExpandedRow(isExpanded ? null : shipment.trackingId)
                  }
                >
                  <TableCell className="max-w-[120px] truncate font-mono text-xs font-medium">
                    {shipment.trackingId}
                  </TableCell>
                  <TableCell className="max-w-[100px] truncate text-xs text-muted-foreground">
                    {shipment.orderId}
                  </TableCell>
                  <TableCell className="max-w-[140px] truncate font-medium">
                    {shipment.customer}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-150",
                        courierCfg.color
                      )}
                      title={`Courier: ${courierCfg.name}`}
                    >
                      {courierCfg.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        statusCfg.className
                      )}
                    >
                      {statusCfg.label}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
                    {formatShortDate(shipment.pickupDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
                    {formatShortDate(shipment.deliveryDate)}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex max-w-[120px] items-center gap-1 truncate text-xs text-muted-foreground">
                      <MapPin className="size-3 shrink-0" aria-hidden="true" />
                      {shipment.area}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 opacity-0 transition-all duration-150 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/20 group-hover:opacity-100"
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedRow(isExpanded ? null : shipment.trackingId)
                      }}
                    >
                      {isExpanded ? (
                        <ChevronUp className="size-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <AnimatePresence>
        {expandedRow && (
          <motion.div
            key={expandedRow}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-muted/30 p-4"
          >
            {(() => {
              const shipment = shipments.find(
                (s) => s.trackingId === expandedRow
              )
              if (!shipment) return null
              return (
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                  <div className="flex-1">
                    <h4 className="mb-3 text-sm font-semibold">
                      Delivery Timeline — {shipment.trackingId}
                    </h4>
                    <DeliveryTimeline steps={shipment.timeline} />
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount:</span>{" "}
                      <span className="font-semibold tabular-nums">
                        ৳{shipment.amount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      <span className="font-medium tabular-nums">
                        {shipment.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Area:</span>{" "}
                      <span className="font-medium">{shipment.area}</span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 && (
        <EmptyState
          icon={Package}
          title="No shipments found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      )}
    </section>
  )
}
