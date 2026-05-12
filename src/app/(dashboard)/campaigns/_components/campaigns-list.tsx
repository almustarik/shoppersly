"use client"

import { motion } from "framer-motion"
import { MousePointerClick, Eye, ArrowUpRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import {
  campaignStatusConfig,
  platformConfig,
  type CampaignItem,
} from "@/mock/campaigns-data"

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  if (!data.length) return <div className="h-12 w-full" />

  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient
              id={`sparkFill-${color.replace("#", "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sparkFill-${color.replace("#", "")})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CampaignsList({
  campaigns,
}: {
  campaigns: CampaignItem[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((campaign, i) => {
        const statusCfg = campaignStatusConfig[campaign.status]
        const platformCfg = platformConfig[campaign.platform]
        const sparkColor =
          campaign.status === "active"
            ? "#4F46E5"
            : campaign.status === "paused"
              ? "#F59E0B"
              : "#94A3B8"

        return (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
          >
            <article className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-px hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <h4 className="line-clamp-1 text-sm font-semibold">
                  {campaign.name}
                </h4>
                <div className="flex shrink-0 gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-150",
                      platformCfg.className
                    )}
                    title={`Platform: ${platformCfg.label}`}
                  >
                    {platformCfg.label}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-150",
                      statusCfg.className
                    )}
                    title={`Status: ${statusCfg.label}`}
                  >
                    {statusCfg.label}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="tabular-nums text-muted-foreground">
                    ৳{campaign.spent.toLocaleString()} / ৳
                    {campaign.budget.toLocaleString()}
                  </span>
                  <span className="font-medium tabular-nums">
                    {campaign.budget > 0
                      ? Math.round(
                          (campaign.spent / campaign.budget) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${campaign.budget > 0 ? Math.min((campaign.spent / campaign.budget) * 100, 100) : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-3">
                <MiniSparkline data={campaign.sparkline} color={sparkColor} />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Eye className="size-3" aria-hidden="true" /> Reach
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {campaign.reach >= 1000
                      ? `${(campaign.reach / 1000).toFixed(0)}K`
                      : campaign.reach}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MousePointerClick className="size-3" aria-hidden="true" />{" "}
                    CTR
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {campaign.ctr}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <ArrowUpRight className="size-3" aria-hidden="true" /> ROAS
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {campaign.roas > 0 ? `${campaign.roas}x` : "—"}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="tabular-nums">
                  {campaign.conversions} conversion
                  {campaign.conversions !== 1 ? "s" : ""}
                </span>
                <span className="tabular-nums">
                  Revenue: ৳{campaign.revenue.toLocaleString()}
                </span>
              </div>
            </article>
          </motion.div>
        )
      })}
    </div>
  )
}
