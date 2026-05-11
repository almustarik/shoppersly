import { cn } from "@/lib/utils"
import type { OrderStatus } from "@/mock/orders-data"

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  packed: {
    label: "Packed",
    className: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  },
  shipped: {
    label: "Shipped",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  returned: {
    label: "Returned",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
}

const dotColor: Record<OrderStatus, string> = {
  pending: "bg-amber-500",
  confirmed: "bg-blue-500",
  packed: "bg-violet-500",
  shipped: "bg-indigo-500",
  delivered: "bg-emerald-500",
  returned: "bg-orange-500",
  cancelled: "bg-red-500",
}

export function OrderStatusBadge({
  status,
  showDot = true,
  className,
}: {
  status: OrderStatus
  showDot?: boolean
  className?: string
}) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className
      )}
    >
      {showDot && (
        <span className={cn("size-1.5 rounded-full", dotColor[status])} />
      )}
      {config.label}
    </span>
  )
}

export function PaymentStatusBadge({
  status,
  className,
}: {
  status: "unpaid" | "paid" | "partial" | "refunded"
  className?: string
}) {
  const config = {
    unpaid: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    partial: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    refunded: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  const labels = {
    unpaid: "Unpaid",
    paid: "Paid",
    partial: "Partial",
    refunded: "Refunded",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config[status],
        className
      )}
    >
      {labels[status]}
    </span>
  )
}
