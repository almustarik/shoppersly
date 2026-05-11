"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { conversionFunnel } from "@/mock/analytics-data"

const funnelColors = [
  "from-indigo-500 to-indigo-600",
  "from-violet-500 to-violet-600",
  "from-purple-500 to-purple-600",
  "from-fuchsia-500 to-fuchsia-600",
  "from-pink-500 to-pink-600",
]

export function ConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1 py-4">
          {conversionFunnel.map((stage, i) => {
            const widthPercent = 30 + (stage.percentage / 100) * 70
            const dropOff =
              i > 0
                ? (
                    ((conversionFunnel[i - 1].count - stage.count) /
                      conversionFunnel[i - 1].count) *
                    100
                  ).toFixed(1)
                : null

            return (
              <div key={stage.stage} className="flex w-full flex-col items-center">
                {dropOff && (
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-red-400">
                      <path d="M6 2 L6 10 M3 7 L6 10 L9 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{dropOff}% drop-off</span>
                  </div>
                )}
                <motion.div
                  className={`relative flex items-center justify-center rounded-lg bg-gradient-to-r ${funnelColors[i]} py-3 text-white shadow-sm`}
                  style={{ width: `${widthPercent}%` }}
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="text-xs opacity-80">{stage.percentage}%</span>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">9.9%</p>
            <p className="text-xs text-muted-foreground">Overall Conversion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">67.1%</p>
            <p className="text-xs text-muted-foreground">Checkout → Purchase</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">41.5%</p>
            <p className="text-xs text-muted-foreground">View → Cart</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
