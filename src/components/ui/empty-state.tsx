"use client"

import { type LucideIcon, PackageOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center gap-3 py-16",
        className
      )}
      role="status"
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-6 text-muted-foreground/40" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mx-auto mt-1 max-w-[320px] text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
