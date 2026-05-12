"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RevenueAnalytics } from "./_components/revenue-analytics"
import { OrderAnalytics } from "./_components/order-analytics"
import { ProductAnalytics } from "./_components/product-analytics"
import { CustomerAnalytics } from "./_components/customer-analytics"
import { ConversionFunnel } from "./_components/conversion-funnel"

const ranges = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "Custom", value: "custom" },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState("30d")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Insights and performance metrics for your store
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white p-1">
          {ranges.map((r) => (
            <Button
              key={r.value}
              variant={dateRange === r.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange(r.value)}
              className={dateRange === r.value ? "" : "text-muted-foreground"}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <RevenueAnalytics />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03, duration: 0.25 }}
        >
          <OrderAnalytics />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.25 }}
        >
          <ProductAnalytics />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.09, duration: 0.25 }}
        >
          <CustomerAnalytics />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.25 }}
      >
        <ConversionFunnel />
      </motion.div>
    </div>
  )
}
