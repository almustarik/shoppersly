"use client"

import { motion } from "framer-motion"
import {
  Truck,
  PackageCheck,
  Clock,
  RotateCcw,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CourierCards } from "./_components/courier-cards"
import { ShipmentsTable } from "./_components/shipments-table"
import {
  shipments,
  couriers,
  logisticsSummary,
} from "@/mock/logistics-data"

const summaryCards = [
  {
    label: "In Transit",
    value: logisticsSummary.inTransit,
    icon: Truck,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    label: "Pending Pickup",
    value: logisticsSummary.pendingPickup,
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    label: "Delivered Today",
    value: logisticsSummary.deliveredToday,
    icon: PackageCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    label: "Returns",
    value: logisticsSummary.returns,
    icon: RotateCcw,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
]

export default function LogisticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Logistics</h1>
          <p className="text-sm text-muted-foreground">
            Track shipments and manage courier integrations
          </p>
        </div>
        <Button size="lg">
          <Plus className="size-4" />
          Request Pickup
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4">
                <div className={`flex size-11 items-center justify-center rounded-lg ${card.bg}`}>
                  <card.icon className={`size-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Courier integration cards */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Courier Integrations</h2>
        <CourierCards couriers={couriers} />
      </div>

      {/* Shipments table */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Shipments</h2>
        <ShipmentsTable shipments={shipments} />
      </div>
    </div>
  )
}
