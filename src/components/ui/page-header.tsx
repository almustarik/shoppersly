import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  count?: number
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  count,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex items-center gap-3">
        <h1 className="text-[28px] font-bold tracking-tight">{title}</h1>
        {count !== undefined && (
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium tabular-nums text-muted-foreground">
            {count.toLocaleString()}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children && (
        <div className="flex items-center gap-2">{children}</div>
      )}
    </div>
  )
}
