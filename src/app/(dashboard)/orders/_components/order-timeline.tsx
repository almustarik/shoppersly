import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { OrderTimelineEntry } from "@/mock/orders-data"
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  PackageCheck,
  RotateCcw,
  XCircle,
  MessageSquare,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  confirmed: CheckCircle2,
  packed: Package,
  shipped: Truck,
  delivered: PackageCheck,
  returned: RotateCcw,
  cancelled: XCircle,
  note: MessageSquare,
}

const colorMap: Record<string, string> = {
  pending: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
  confirmed: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
  packed: "text-violet-500 bg-violet-50 dark:bg-violet-950/40",
  shipped: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
  delivered: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
  returned: "text-orange-500 bg-orange-50 dark:bg-orange-950/40",
  cancelled: "text-red-500 bg-red-50 dark:bg-red-950/40",
  note: "text-gray-500 bg-gray-50 dark:bg-gray-800",
}

const lineColor: Record<string, string> = {
  pending: "bg-amber-200 dark:bg-amber-800",
  confirmed: "bg-blue-200 dark:bg-blue-800",
  packed: "bg-violet-200 dark:bg-violet-800",
  shipped: "bg-indigo-200 dark:bg-indigo-800",
  delivered: "bg-emerald-200 dark:bg-emerald-800",
  returned: "bg-orange-200 dark:bg-orange-800",
  cancelled: "bg-red-200 dark:bg-red-800",
  note: "bg-gray-200 dark:bg-gray-700",
}

export function OrderTimeline({
  entries,
  className,
}: {
  entries: OrderTimelineEntry[]
  className?: string
}) {
  return (
    <div className={cn("relative space-y-0", className)}>
      {entries.map((entry, index) => {
        const Icon = iconMap[entry.status] ?? Clock
        const isLast = index === entries.length - 1

        return (
          <div key={`${entry.status}-${index}`} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[15px] top-[32px] h-[calc(100%-20px)] w-0.5",
                  lineColor[entry.status] ?? "bg-gray-200"
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
                colorMap[entry.status] ?? "text-gray-500 bg-gray-50"
              )}
            >
              <Icon className="size-4" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-medium text-foreground">{entry.label}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{format(new Date(entry.timestamp), "MMM d, yyyy 'at' h:mm a")}</span>
                {entry.actor && (
                  <>
                    <span className="size-0.5 rounded-full bg-muted-foreground/50" />
                    <span>{entry.actor}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
