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
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  shipmentStatusConfig,
  type Shipment,
  type ShipmentStatus,
  type CourierCode,
} from "@/mock/logistics-data"
import { DeliveryTimeline } from "./delivery-timeline"

const courierLabels: Record<CourierCode, { name: string; color: string }> = {
  pathao: { name: "Pathao", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  steadfast: { name: "Steadfast", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  redx: { name: "RedX", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  paperfly: { name: "Paperfly", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
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
    <Card>
      <div className="flex flex-col gap-4 p-4">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Area</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((shipment) => {
              const isExpanded = expandedRow === shipment.trackingId
              const statusCfg = shipmentStatusConfig[shipment.status]
              const courierCfg = courierLabels[shipment.courier]

              return (
                <motion.tr
                  key={shipment.trackingId}
                  className="group border-b transition-colors hover:bg-muted/50 cursor-pointer"
                  onClick={() =>
                    setExpandedRow(isExpanded ? null : shipment.trackingId)
                  }
                  layout
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
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                        courierCfg.color
                      )}
                    >
                      {courierCfg.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
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
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>

        {/* Expanded timeline panel */}
        <AnimatePresence>
          {expandedRow && (
            <motion.div
              key={expandedRow}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-lg border bg-muted/30 p-4"
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
                        <span className="font-semibold">
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
    </Card>
  )
}
