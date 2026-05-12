"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, ChevronUp, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
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
import { cn } from "@/lib/utils"
import {
  shipmentStatusConfig,
  type Shipment,
  type ShipmentStatus,
  type CourierCode,
} from "@/mock/logistics-data"
import { DeliveryTimeline } from "./delivery-timeline"

const courierLabels: Record<CourierCode, { name: string; color: string }> = {
  pathao: { name: "Pathao", color: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  steadfast: { name: "Steadfast", color: "border-blue-200 bg-blue-50 text-blue-700" },
  redx: { name: "RedX", color: "border-red-200 bg-red-50 text-red-700" },
  paperfly: { name: "Paperfly", color: "border-orange-200 bg-orange-50 text-orange-700" },
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
    <div className="rounded-xl border border-[#E2E8F0] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#E2E8F0] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tracking ID, order, customer, area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Select value={courierFilter} onValueChange={(v) => setCourierFilter(v ?? "all")}>
            <SelectTrigger className="w-[140px]">
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

          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-[160px]">
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

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Tracking ID</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Order</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Customer</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Courier</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Status</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Pickup</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Delivery</TableHead>
            <TableHead className="bg-[#F8FAFC] text-[12px] uppercase tracking-wider">Area</TableHead>
            <TableHead className="w-8 bg-[#F8FAFC]" />
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
                className="cursor-pointer border-[#E2E8F0] transition-colors hover:bg-[#F8FAFC]"
                onClick={() =>
                  setExpandedRow(isExpanded ? null : shipment.trackingId)
                }
              >
                <TableCell className="font-mono text-xs font-medium">
                  {shipment.trackingId}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {shipment.orderId}
                </TableCell>
                <TableCell className="font-medium">
                  {shipment.customer}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      courierCfg.color
                    )}
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
                <TableCell className="text-xs text-muted-foreground">
                  {formatShortDate(shipment.pickupDate)}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatShortDate(shipment.deliveryDate)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {shipment.area}
                  </span>
                </TableCell>
                <TableCell>
                  {isExpanded ? (
                    <ChevronUp className="size-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-4 text-muted-foreground" />
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <AnimatePresence>
        {expandedRow && (
          <motion.div
            key={expandedRow}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#E2E8F0] bg-[#F8FAFC] p-4"
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
                      <span className="font-medium">{shipment.phone}</span>
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
        <div className="py-8 text-center text-sm text-muted-foreground">
          No shipments found matching your filters.
        </div>
      )}
    </div>
  )
}
