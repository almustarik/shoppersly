import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { OrderTimelineEntry } from "@/mock/orders-data"

const dotColor: Record<string, string> = {
  pending: "bg-amber-500",
  confirmed: "bg-sky-500",
  packed: "bg-violet-500",
  shipped: "bg-indigo-500",
  delivered: "bg-emerald-500",
  returned: "bg-orange-500",
  cancelled: "bg-rose-500",
  note: "bg-gray-400",
}

export function OrderTimeline({
  entries,
  className,
}: {
  entries: OrderTimelineEntry[]
  className?: string
}) {
  return (
    <div className={cn("relative", className)}>
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1

        return (
          <div key={`${entry.status}-${index}`} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <div className="absolute left-[5px] top-[14px] h-[calc(100%-8px)] w-px bg-[#E2E8F0]" />
            )}
            <div className="relative z-10 mt-1.5 flex shrink-0">
              <span
                className={cn(
                  "size-[11px] rounded-full ring-2 ring-white",
                  dotColor[entry.status] ?? "bg-gray-400"
                )}
              />
            </div>
            <div className="flex-1 -mt-0.5">
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
