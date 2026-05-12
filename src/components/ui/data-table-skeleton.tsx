import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function StatsCardsSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        className
      )}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-10 rounded-xl" />
          </div>
          <Skeleton className="mt-4 h-8 w-28" />
          <Skeleton className="mt-3 h-5 w-32 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col rounded-xl bg-card ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <Skeleton className="h-5 w-36" />
        <div className="flex gap-1">
          <Skeleton className="h-6 w-10 rounded-md" />
          <Skeleton className="h-6 w-10 rounded-md" />
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
      </div>
      <div className="flex flex-1 items-end gap-1 px-4 pb-4 pt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${30 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function DataTableSkeleton({
  rows = 5,
  columns = 6,
  className,
}: {
  rows?: number
  columns?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="mt-4 px-0">
        <div className="overflow-hidden">
          <div className="bg-muted/40 px-4 py-2.5">
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className="h-3 flex-1" />
              ))}
            </div>
          </div>
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="border-b border-border/50 px-4 py-3 last:border-b-0">
              <div className="flex gap-4">
                {Array.from({ length: columns }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className={cn("h-4 flex-1", j === 0 && "max-w-20")}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
