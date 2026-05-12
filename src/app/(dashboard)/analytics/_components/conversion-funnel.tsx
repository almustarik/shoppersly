"use client"

import { motion } from "framer-motion"
import { conversionFunnel } from "@/mock/analytics-data"

const funnelWidths = ["100%", "75%", "55%", "35%", "22%"]
const funnelColors = [
  "bg-[#EEF2FF] border-[#C7D2FE]",
  "bg-[#E0E7FF] border-[#A5B4FC]",
  "bg-[#C7D2FE] border-[#818CF8]",
  "bg-[#A5B4FC] border-[#6366F1]",
  "bg-[#818CF8] border-[#4F46E5]",
]
const funnelTextColors = [
  "text-[#3730A3]",
  "text-[#3730A3]",
  "text-[#312E81]",
  "text-[#1E1B4B]",
  "text-white",
]

export function ConversionFunnel() {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold">Conversion Funnel</h3>
      </div>

      <div className="flex flex-col items-center gap-2 py-4">
        {conversionFunnel.map((stage, i) => {
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
                <p className="mb-1.5 text-xs text-muted-foreground">
                  ↓ {dropOff}% drop-off
                </p>
              )}
              <motion.div
                className={`relative flex items-center justify-center rounded-lg border px-4 py-3.5 ${funnelColors[i]}`}
                style={{ width: funnelWidths[i] }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <div className={`flex items-center gap-4 ${funnelTextColors[i]}`}>
                  <span className="text-sm font-semibold">{stage.stage}</span>
                  <span className="tabular-nums text-sm font-bold">
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="text-xs opacity-70">{stage.percentage}%</span>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
        <div className="text-center">
          <p className="text-[28px] font-bold tabular-nums text-[#4F46E5]">9.9%</p>
          <p className="text-xs text-muted-foreground">Overall Conversion</p>
        </div>
        <div className="text-center">
          <p className="text-[28px] font-bold tabular-nums text-[#10B981]">67.1%</p>
          <p className="text-xs text-muted-foreground">Checkout → Purchase</p>
        </div>
        <div className="text-center">
          <p className="text-[28px] font-bold tabular-nums text-[#8B5CF6]">41.5%</p>
          <p className="text-xs text-muted-foreground">View → Cart</p>
        </div>
      </div>
    </div>
  )
}
