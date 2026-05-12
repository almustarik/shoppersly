import { StatsCardsSkeleton, DataTableSkeleton } from "@/components/ui/data-table-skeleton"

export default function CampaignsLoading() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <StatsCardsSkeleton className="lg:grid-cols-4" />
      <DataTableSkeleton />
    </div>
  )
}
