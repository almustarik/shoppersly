"use client"

import { motion } from "framer-motion"
import { MousePointerClick, Eye, ArrowUpRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  campaignStatusConfig,
  platformConfig,
  type CampaignItem,
} from "@/mock/campaigns-data"

function MiniSparkline({
  data,
  color,
}: {
  data: number[]
  color: string
}) {
  if (!data.length) return <div className="h-10 w-full" />

  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`sparkFill-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sparkFill-${color})`}
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
            ? "#6366f1"
            : campaign.status === "paused"
              ? "#f59e0b"
              : "#94a3b8"

        return (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1 text-sm">
                    {campaign.name}
                  </CardTitle>
                  <div className="flex shrink-0 gap-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium",
                        platformCfg.className
                      )}
                    >
                      {platformCfg.label}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium",
                        statusCfg.className
                      )}
                    >
                      {statusCfg.label}
                    </span>
                  </div>
                </div>

                {/* Budget bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      ৳{campaign.spent.toLocaleString()} / ৳{campaign.budget.toLocaleString()}
                    </span>
                    <span className="font-medium">
                      {campaign.budget > 0
                        ? Math.round((campaign.spent / campaign.budget) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${campaign.budget > 0 ? Math.min((campaign.spent / campaign.budget) * 100, 100) : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                {/* Sparkline */}
                <MiniSparkline data={campaign.sparkline} color={sparkColor} />

                {/* Metrics grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Eye className="size-3" /> Reach
                    </span>
                    <span className="text-sm font-semibold">
                      {campaign.reach >= 1000
                        ? `${(campaign.reach / 1000).toFixed(0)}K`
                        : campaign.reach}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MousePointerClick className="size-3" /> CTR
                    </span>
                    <span className="text-sm font-semibold">
                      {campaign.ctr}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <ArrowUpRight className="size-3" /> ROAS
                    </span>
                    <span className="text-sm font-semibold">
                      {campaign.roas > 0 ? `${campaign.roas}x` : "—"}
                    </span>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
                  <span>
                    {campaign.conversions} conversion{campaign.conversions !== 1 ? "s" : ""}
                  </span>
                  <span>
                    Revenue: ৳{campaign.revenue.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
