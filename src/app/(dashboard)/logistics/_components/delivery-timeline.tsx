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
    <ol className="flex flex-col gap-0" aria-label="Delivery timeline">
      {steps.map((step, i) => (
        <motion.li
          key={step.label}
          className="flex gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: i * 0.03 }}
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                step.completed && step.current
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : step.completed
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-border bg-card text-muted-foreground/40"
              )}
              aria-label={
                step.current
                  ? "Current step"
                  : step.completed
                    ? "Completed"
                    : "Upcoming"
              }
            >
              {step.completed ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 flex-1 transition-colors duration-200",
                  step.completed ? "bg-primary" : "bg-border"
                )}
                style={{ minHeight: 24 }}
              />
            )}
          </div>

          <div className="pb-6">
            <p
              className={cn(
                "text-sm font-medium leading-7",
                step.current
                  ? "font-semibold text-primary"
                  : step.completed
                    ? "text-foreground"
                    : "text-muted-foreground"
              )}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-xs tabular-nums text-muted-foreground">
                {formatDate(step.date)}
              </p>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
