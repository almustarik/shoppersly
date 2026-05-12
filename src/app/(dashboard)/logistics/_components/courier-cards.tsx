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
          <article
            className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            tabIndex={0}
            aria-label={`${courier.name} courier — ${courier.connected ? "Connected" : "Disconnected"}`}
          >
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
                      className={`inline-block size-2 rounded-full ring-2 ring-card ${
                        courier.connected ? "bg-emerald-500" : "bg-slate-400"
                      }`}
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
                <Package
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="text-sm font-semibold tabular-nums">
                    {courier.activeShipments}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="size-3.5 text-emerald-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Today</p>
                  <p className="text-sm font-semibold tabular-nums">
                    {courier.deliveredToday}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp
                  className="size-3.5 text-indigo-600"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Success</p>
                  <p className="text-sm font-semibold tabular-nums">
                    {courier.successRate}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Time</p>
                  <p className="text-sm font-semibold tabular-nums">
                    {courier.avgDeliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      ))}
    </div>
  )
}
