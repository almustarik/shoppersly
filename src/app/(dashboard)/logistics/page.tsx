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
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
  },
  {
    label: "Pending Pickup",
    value: logisticsSummary.pendingPickup,
    icon: Clock,
    trend: "-2",
    trendUp: false,
    iconBg: "bg-[#FFFBEB]",
    iconColor: "text-[#F59E0B]",
  },
  {
    label: "Delivered Today",
    value: logisticsSummary.deliveredToday,
    icon: PackageCheck,
    trend: "+8",
    trendUp: true,
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#10B981]",
  },
  {
    label: "Returns",
    value: logisticsSummary.returns,
    icon: RotateCcw,
    trend: "-1",
    trendUp: false,
    iconBg: "bg-[#FFF1F2]",
    iconColor: "text-[#F43F5E]",
  },
]

export default function LogisticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Logistics</h1>
          <p className="text-sm text-muted-foreground">
            Track shipments and manage courier integrations
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
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
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-center gap-4">
                <div className={`flex size-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                  <card.icon className={`size-5 ${card.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[28px] font-bold tabular-nums">{card.value}</p>
                    <span className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
                      card.trendUp
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                    }`}>
                      {card.trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {card.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Courier Integrations</h2>
        <CourierCards couriers={couriers} />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Shipments</h2>
        <ShipmentsTable shipments={shipments} />
      </div>
    </div>
  )
}
