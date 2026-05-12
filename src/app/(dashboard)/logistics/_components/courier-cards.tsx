"use client"

import { motion } from "framer-motion"
import { Package, CheckCircle2, TrendingUp, Clock } from "lucide-react"
import type { CourierInfo } from "@/mock/logistics-data"

const courierLogos: Record<string, string> = {
  pathao: "P",
  steadfast: "S",
  redx: "R",
  paperfly: "F",
}

export function CourierCards({ couriers }: { couriers: CourierInfo[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {couriers.map((courier, i) => (
        <motion.div
          key={courier.code}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.03 }}
        >
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-xl text-base font-bold text-white"
                  style={{ backgroundColor: courier.color }}
                >
                  {courierLogos[courier.code]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{courier.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block size-2 rounded-full ${courier.connected ? "bg-[#10B981]" : "bg-slate-400"}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {courier.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Package className="size-3.5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="text-sm font-semibold tabular-nums">{courier.activeShipments}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#10B981]" />
                <div>
                  <p className="text-xs text-muted-foreground">Today</p>
                  <p className="text-sm font-semibold tabular-nums">{courier.deliveredToday}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-3.5 text-[#4F46E5]" />
                <div>
                  <p className="text-xs text-muted-foreground">Success</p>
                  <p className="text-sm font-semibold tabular-nums">{courier.successRate}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Time</p>
                  <p className="text-sm font-semibold">{courier.avgDeliveryTime}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
