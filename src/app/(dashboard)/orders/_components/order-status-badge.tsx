import { cn } from "@/lib/utils"
import type { OrderStatus, PaymentStatus } from "@/mock/orders-data"

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  packed: {
    label: "Packed",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  returned: {
    label: "Returned",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
}

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus
  className?: string
}) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

const paymentConfig: Record<PaymentStatus, { label: string; className: string }> = {
  paid: {
    label: "Paid",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  unpaid: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  partial: {
    label: "Partial",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  refunded: {
    label: "Failed",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
}

export function PaymentStatusBadge({
  status,
  className,
}: {
  status: PaymentStatus
  className?: string
}) {
  const config = paymentConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
