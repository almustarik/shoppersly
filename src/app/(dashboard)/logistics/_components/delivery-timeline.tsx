"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { TimelineStep } from "@/mock/logistics-data"
import { cn } from "@/lib/utils"

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function DeliveryTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          className="flex gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: i * 0.03 }}
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                step.completed && step.current
                  ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                  : step.completed
                    ? "border-[#10B981] bg-[#10B981] text-white"
                    : "border-[#E2E8F0] bg-white text-muted-foreground/40"
              )}
            >
              {step.completed ? (
                <Check className="size-3.5" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 flex-1 min-h-6",
                  step.completed
                    ? "bg-[#10B981]"
                    : "bg-[#E2E8F0]"
                )}
              />
            )}
          </div>

          <div className="pb-6">
            <p
              className={cn(
                "text-sm font-medium leading-7",
                step.current
                  ? "text-[#4F46E5] font-semibold"
                  : step.completed
                    ? "text-foreground"
                    : "text-muted-foreground"
              )}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-xs text-muted-foreground">
                {formatDate(step.date)}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
