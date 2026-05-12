"use client"

import { motion } from "framer-motion"
import {
  Truck,
  PackageCheck,
  Clock,
  RotateCcw,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
    trend: "+5",
    trendUp: true,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    label: "Pending Pickup",
    value: logisticsSummary.pendingPickup,
    icon: Clock,
    trend: "-2",
    trendUp: false,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Delivered Today",
    value: logisticsSummary.deliveredToday,
    icon: PackageCheck,
    trend: "+8",
    trendUp: true,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Returns",
    value: logisticsSummary.returns,
    icon: RotateCcw,
    trend: "-1",
    trendUp: false,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
]

export default function LogisticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            Logistics
          </h1>
          <p className="text-sm text-muted-foreground">
            Track shipments and manage courier integrations
          </p>
        </div>
        <Button className="gap-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20">
          <Plus className="size-4" aria-hidden="true" />
          Request Pickup
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
          >
            <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <card.icon
                    className={`size-5 ${card.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-muted-foreground">
                    {card.label}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="text-2xl font-bold tabular-nums tracking-tight">
                      {card.value}
                    </p>
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
                        card.trendUp
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {card.trendUp ? (
                        <TrendingUp className="size-3" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="size-3" aria-hidden="true" />
                      )}
                      {card.trend}
                      <span className="sr-only">
                        {card.trendUp ? "increase" : "decrease"} from previous
                        period
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Courier Integrations</h2>
        <CourierCards couriers={couriers} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Shipments</h2>
        <ShipmentsTable shipments={shipments} />
      </section>
    </div>
  )
}
