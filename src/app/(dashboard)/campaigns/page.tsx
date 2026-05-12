"use client"

import { motion } from "framer-motion"
import {
  Megaphone,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampaignsList } from "./_components/campaigns-list"
import { CampaignMetrics } from "./_components/campaign-metrics"
import { UTMBuilder } from "./_components/utm-builder"
import {
  campaigns,
  dailyMetrics,
  campaignsSummary,
} from "@/mock/campaigns-data"

const summaryCards = [
  {
    label: "Active Campaigns",
    value: campaignsSummary.activeCampaigns.toString(),
    icon: Megaphone,
    trend: "+2",
    trendUp: true,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    label: "Total Spend",
    value: `৳${campaignsSummary.totalSpend.toLocaleString()}`,
    icon: DollarSign,
    trend: "+18%",
    trendUp: true,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "ROAS",
    value: `${campaignsSummary.roas}x`,
    icon: TrendingUp,
    trend: "+0.4x",
    trendUp: true,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Conversions",
    value: campaignsSummary.conversions.toString(),
    icon: Target,
    trend: "+12",
    trendUp: true,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            Campaigns
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your social commerce campaigns and track performance
          </p>
        </div>
        <Button className="gap-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/20">
          <Plus className="size-4" aria-hidden="true" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
          >
            <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <card.icon
                    className={`size-5 ${card.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-muted-foreground">
                    {card.label}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="text-2xl font-bold tabular-nums tracking-tight">
                      {card.value}
                    </p>
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
                        card.trendUp
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {card.trendUp ? (
                        <TrendingUp className="size-3" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="size-3" aria-hidden="true" />
                      )}
                      {card.trend}
                      <span className="sr-only">
                        {card.trendUp ? "increase" : "decrease"} from previous
                        period
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">All Campaigns</h2>
        <CampaignsList campaigns={campaigns} />
      </section>

      <CampaignMetrics data={dailyMetrics} />

      <UTMBuilder />
    </div>
  )
}
