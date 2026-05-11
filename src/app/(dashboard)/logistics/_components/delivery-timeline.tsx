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
          transition={{ duration: 0.25, delay: i * 0.06 }}
        >
          {/* Connector line + dot */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                step.completed && step.current
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-muted-foreground/30 bg-background text-muted-foreground/40"
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
                    ? "bg-emerald-500"
                    : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-6">
            <p
              className={cn(
                "text-sm font-medium leading-7",
                step.current
                  ? "text-primary font-semibold"
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
